import 'dart:math';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/animated_button.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/flashcard_model.dart';
import '../auth/auth_provider.dart';
import '../mascot/mascot_controller.dart';
import '../mascot/mascot_state.dart';

class FlashcardPracticeScreen extends ConsumerStatefulWidget {
  final String categoryId;

  const FlashcardPracticeScreen({
    super.key,
    required this.categoryId,
  });

  @override
  ConsumerState<FlashcardPracticeScreen> createState() => _FlashcardPracticeScreenState();
}

class _FlashcardPracticeScreenState extends ConsumerState<FlashcardPracticeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _flipController;
  late Animation<double> _flipAnimation;

  List<FlashcardModel> _activeCards = [];
  final List<FlashcardModel> _knownCards = [];
  final List<FlashcardModel> _reviewCards = [];

  int _currentIndex = 0;
  bool _isFlipped = false;
  bool _isActionLocked = false;
  bool _isCompleted = false;

  FlashcardSessionResultModel? _sessionResult;
  FlashcardCategoryModel? _category;

  @override
  void initState() {
    super.initState();
    _flipController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 380),
    );
    _flipAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _flipController, curve: Curves.easeInOutBack),
    );
  }

  @override
  void dispose() {
    _flipController.dispose();
    super.dispose();
  }

  void _flipCard() {
    if (_isFlipped) {
      _flipController.reverse();
    } else {
      _flipController.forward();
    }
    setState(() => _isFlipped = !_isFlipped);
    HapticFeedback.selectionClick();
  }

  void _onSpeak(String text) {
    HapticFeedback.lightImpact();
    ref.read(ttsServiceProvider).speak(text);
  }

  void _handleCardAnswer({required bool known}) {
    if (_isActionLocked || _currentIndex >= _activeCards.length) return;
    setState(() => _isActionLocked = true);

    final currentCard = _activeCards[_currentIndex];
    HapticFeedback.mediumImpact();

    if (known) {
      _knownCards.add(currentCard);
      ref.read(mascotProvider.notifier).trigger(MascotState.quizCorrect);
    } else {
      _reviewCards.add(currentCard);
      ref.read(mascotProvider.notifier).trigger(MascotState.quizWrong);
    }

    // Flip back if currently showing the back
    if (_isFlipped) {
      _flipController.reverse();
      _isFlipped = false;
    }

    Future.delayed(const Duration(milliseconds: 220), () {
      if (!mounted) return;
      if (_currentIndex < _activeCards.length - 1) {
        setState(() {
          _currentIndex++;
          _isActionLocked = false;
        });
      } else {
        _finishSession();
      }
    });
  }

  Future<void> _finishSession() async {
    setState(() {
      _isCompleted = true;
    });

    final xpEarned = _knownCards.length * 10;
    try {
      final repo = ref.read(flashcardRepositoryProvider);
      final result = await repo.completeSession(
        categoryId: widget.categoryId,
        knownCount: _knownCards.length,
        totalCount: _activeCards.length,
        xpEarned: xpEarned,
      );

      if (mounted) {
        setState(() {
          _sessionResult = result;
        });
        await ref.read(authNotifierProvider.notifier).refreshUser();
        ref.read(mascotProvider.notifier).trigger(MascotState.dailyComplete);
      }
    } catch (_) {}
  }

  void _retryMissedCards() {
    if (_reviewCards.isEmpty) return;
    setState(() {
      _activeCards = List.from(_reviewCards);
      _knownCards.clear();
      _reviewCards.clear();
      _currentIndex = 0;
      _isCompleted = false;
      _isActionLocked = false;
      _isFlipped = false;
      _sessionResult = null;
    });
    if (_flipController.value != 0) {
      _flipController.reset();
    }
  }

  @override
  Widget build(BuildContext context) {
    final deckAsync = ref.watch(flashcardDeckProvider(widget.categoryId));

    return Scaffold(
      backgroundColor: AppColors.background,
      body: deckAsync.when(
        loading: () => LoadingView(message: 'flashcards.loading'.tr()),
        error: (err, _) => ErrorView(
          message: err.toString(),
          onRetry: () => ref.refresh(flashcardDeckProvider(widget.categoryId)),
        ),
        data: (deck) {
          if (_activeCards.isEmpty && !_isCompleted) {
            _activeCards = List.from(deck.cards);
            _category = deck.category;
          }

          if (_isCompleted) {
            return _buildCompletionView();
          }

          if (_activeCards.isEmpty) {
            return Center(
              child: Text(
                'flashcards.no_cards_deck'.tr(),
                style: AppTypography.bodyMedium,
              ),
            );
          }

          final currentCard = _activeCards[_currentIndex];
          final progress = (_currentIndex + 1) / _activeCards.length;
          final titleTa = _category?.titleTa ?? 'சொல் அட்டை';

          return SafeArea(
            child: Column(
              children: [
                // Top Progress & Navigation Header
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  child: Row(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.close_rounded, color: AppColors.textPrimary),
                        onPressed: () => context.pop(),
                      ),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              titleTa,
                              style: AppTypography.titleMedium.copyWith(
                                fontWeight: FontWeight.bold,
                                fontSize: 14,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 6),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(6),
                              child: LinearProgressIndicator(
                                value: progress,
                                minHeight: 6,
                                backgroundColor: AppColors.surfaceElevated,
                                valueColor: const AlwaysStoppedAnimation<Color>(AppColors.emerald),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 14),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceElevated,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '${_currentIndex + 1}/${_activeCards.length}',
                          style: const TextStyle(
                            color: AppColors.emeraldLight,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Main Flashcard Area
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                    child: AnimatedBuilder(
                      animation: _flipAnimation,
                      builder: (context, child) {
                        final angle = _flipAnimation.value * pi;
                        final isUnder = _flipAnimation.value >= 0.5;

                        return Transform(
                          transform: Matrix4.identity()
                            ..setEntry(3, 2, 0.0012)
                            ..rotateY(angle),
                          alignment: Alignment.center,
                          child: isUnder
                              ? Transform(
                                  transform: Matrix4.identity()..rotateY(pi),
                                  alignment: Alignment.center,
                                  child: _buildCardBack(currentCard),
                                )
                              : _buildCardFront(currentCard),
                        );
                      },
                    ),
                  ),
                ),

                // Bottom Action Buttons
                _buildActionButtons(),
                const SizedBox(height: 14),
              ],
            ),
          );
        },
      ),
    );
  }

  // --- Front of the Flashcard ---
  Widget _buildCardFront(FlashcardModel card) {
    return ScaleOnPress(
      onTap: _flipCard,
      child: GlassCard(
        borderRadius: 28,
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Category & Audio Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: AppColors.emerald.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: AppColors.emeraldLight.withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.touch_app_rounded, size: 14, color: AppColors.emeraldLight),
                      const SizedBox(width: 4),
                      Text(
                        'flashcards.tap_to_flip'.tr(),
                        style: AppTypography.caption.copyWith(
                          color: AppColors.emeraldLight,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton.filledTonal(
                  icon: const Icon(Icons.volume_up_rounded, color: AppColors.emeraldLight, size: 24),
                  onPressed: () => _onSpeak(card.wordTa),
                  style: IconButton.styleFrom(
                    backgroundColor: AppColors.emerald.withValues(alpha: 0.15),
                  ),
                ),
              ],
            ),
            const Spacer(),

            // Large Tamil Word
            Center(
              child: Text(
                card.wordTa,
                style: AppTypography.displayLarge.copyWith(
                  fontSize: 42,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                  height: 1.2,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 12),

            // Transliteration
            Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight.withValues(alpha: 0.4),
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Text(
                  card.transliteration,
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.skyLight,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
            const Spacer(),

            // Pronunciation Tip Chip
            if (card.pronunciationTip.isNotEmpty)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.surfaceElevated.withValues(alpha: 0.7),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppColors.border.withValues(alpha: 0.4),
                  ),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.lightbulb_outline_rounded, size: 16, color: AppColors.amberLight),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        card.pronunciationTip,
                        style: AppTypography.caption.copyWith(
                          color: AppColors.textMuted,
                          fontSize: 11,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }

  // --- Back of the Flashcard ---
  Widget _buildCardBack(FlashcardModel card) {
    return ScaleOnPress(
      onTap: _flipCard,
      child: GlassCard(
        borderRadius: 28,
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top Bar
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: AppColors.sky.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: AppColors.skyLight.withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: Text(
                    'flashcards.meaning'.tr(),
                    style: AppTypography.caption.copyWith(
                      color: AppColors.skyLight,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton.filledTonal(
                  icon: const Icon(Icons.volume_up_rounded, color: AppColors.skyLight, size: 24),
                  onPressed: () => _onSpeak(card.exampleTa.isNotEmpty ? card.exampleTa : card.wordTa),
                  style: IconButton.styleFrom(
                    backgroundColor: AppColors.sky.withValues(alpha: 0.15),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // English Meaning
            Center(
              child: Text(
                card.wordEn,
                style: AppTypography.titleLarge.copyWith(
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  color: AppColors.emeraldLight,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 6),
            Center(
              child: Text(
                card.wordTa,
                style: AppTypography.tamilTitle.copyWith(
                  fontSize: 18,
                  color: AppColors.textMuted,
                ),
              ),
            ),
            const Divider(color: AppColors.border, height: 28),

            // Example Sentence Section
            if (card.exampleTa.isNotEmpty) ...[
              Text(
                'flashcards.example_sentence'.tr(),
                style: AppTypography.caption.copyWith(
                  color: AppColors.textMuted,
                  fontWeight: FontWeight.bold,
                  fontSize: 11,
                ),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight.withValues(alpha: 0.35),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppColors.border.withValues(alpha: 0.5),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Text(
                            card.exampleTa,
                            style: AppTypography.bodyMedium.copyWith(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                              height: 1.3,
                            ),
                          ),
                        ),
                        InkWell(
                          onTap: () => _onSpeak(card.exampleTa),
                          borderRadius: BorderRadius.circular(20),
                          child: const Padding(
                            padding: EdgeInsets.all(4),
                            child: Icon(Icons.volume_down_rounded, size: 20, color: AppColors.amberLight),
                          ),
                        ),
                      ],
                    ),
                    if (card.exampleEn.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Text(
                        card.exampleEn,
                        style: AppTypography.caption.copyWith(
                          color: AppColors.textMuted,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ],
            const Spacer(),

            // Tap hint
            Center(
              child: Text(
                'flashcards.tap_flip_back'.tr(),
                style: AppTypography.caption.copyWith(color: AppColors.textMuted, fontSize: 11),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // --- Bottom Action Buttons ---
  Widget _buildActionButtons() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Row(
        children: [
          // Review / Missed Button
          Expanded(
            child: ScaleOnPress(
              onTap: _isActionLocked ? null : () => _handleCardAnswer(known: false),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: AppColors.rose.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: AppColors.rose.withValues(alpha: 0.4),
                    width: 1.2,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.refresh_rounded, color: AppColors.roseLight, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'flashcards.review_action'.tr(),
                      style: AppTypography.titleMedium.copyWith(
                        color: AppColors.roseLight,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),

          // Known / Correct Button
          Expanded(
            child: ScaleOnPress(
              onTap: _isActionLocked ? null : () => _handleCardAnswer(known: true),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  gradient: AppColors.emeraldGradient,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.emerald.withValues(alpha: 0.35),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.check_circle_rounded, color: Colors.white, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'flashcards.i_know_action'.tr(),
                      style: AppTypography.titleMedium.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // --- Completion Celebration View ---
  Widget _buildCompletionView() {
    final total = _activeCards.length;
    final known = _knownCards.length;
    final review = _reviewCards.length;
    final xpEarned = _sessionResult?.xpAwarded ?? (known * 10);
    final streak = _sessionResult?.streak ?? 1;

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Spacer(),
            // Celebration Trophy
            FadeSlideTransition(
              delay: const Duration(milliseconds: 50),
              child: const Icon(
                Icons.celebration_rounded,
                size: 72,
                color: AppColors.amberLight,
              ),
            ),
            const SizedBox(height: 16),

            // Tamil Heading
            FadeSlideTransition(
              delay: const Duration(milliseconds: 100),
              child: Text(
                'flashcards.session_complete'.tr(),
                style: AppTypography.tamilTitle.copyWith(fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 6),
            FadeSlideTransition(
              delay: const Duration(milliseconds: 140),
              child: Text(
                'flashcards.session_complete_sub'.tr(),
                style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 24),

            // Stat Cards
            FadeSlideTransition(
              delay: const Duration(milliseconds: 180),
              child: GlassCard(
                padding: const EdgeInsets.all(20),
                borderRadius: 22,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildMetricTile(
                      label: 'flashcards.known_stat'.tr(),
                      value: '$known / $total',
                      color: AppColors.emeraldLight,
                    ),
                    Container(width: 1, height: 36, color: AppColors.border),
                    _buildMetricTile(
                      label: 'flashcards.earned_stat'.tr(),
                      value: '+$xpEarned XP',
                      color: AppColors.amberLight,
                    ),
                    if (review > 0) ...[
                      Container(width: 1, height: 36, color: AppColors.border),
                      _buildMetricTile(
                        label: 'flashcards.review_stat'.tr(),
                        value: '$review',
                        color: AppColors.roseLight,
                      ),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Streak Indicator
            FadeSlideTransition(
              delay: const Duration(milliseconds: 220),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: AppColors.amber.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppColors.amberLight.withValues(alpha: 0.3),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('🔥', style: TextStyle(fontSize: 18)),
                    const SizedBox(width: 8),
                    Text(
                      'flashcards.streak_active'.tr(args: [streak.toString()]),
                      style: AppTypography.titleMedium.copyWith(
                        color: AppColors.amberLight,
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const Spacer(),

            // Review Missed Cards Button (if any)
            if (review > 0) ...[
              FadeSlideTransition(
                delay: const Duration(milliseconds: 260),
                child: AnimatedButton(
                  label: 'flashcards.review_missed_btn'.tr(args: [review.toString()]),
                  icon: Icons.replay_rounded,
                  onPressed: _retryMissedCards,
                ),
              ),
              const SizedBox(height: 12),
            ],

            // Finish Button
            FadeSlideTransition(
              delay: const Duration(milliseconds: 300),
              child: AnimatedButton(
                label: 'flashcards.finish_btn'.tr(),
                icon: Icons.check_circle_outline_rounded,
                onPressed: () => context.pop(),
              ),
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  Widget _buildMetricTile({
    required String label,
    required String value,
    required Color color,
  }) {
    return Column(
      children: [
        Text(
          value,
          style: AppTypography.titleLarge.copyWith(
            color: color,
            fontWeight: FontWeight.bold,
            fontSize: 20,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: AppTypography.caption.copyWith(
            color: AppColors.textMuted,
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}
