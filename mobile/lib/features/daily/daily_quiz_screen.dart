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
import '../../data/models/daily_quiz_model.dart';
import '../auth/auth_provider.dart';
import '../mascot/mascot_controller.dart';
import '../mascot/mascot_state.dart';

class DailyQuizScreen extends ConsumerStatefulWidget {
  const DailyQuizScreen({super.key});

  @override
  ConsumerState<DailyQuizScreen> createState() => _DailyQuizScreenState();
}

class _DailyQuizScreenState extends ConsumerState<DailyQuizScreen> {
  DailyQuizModel? _quiz;
  bool _isLoading = true;
  String? _error;

  int _currentIndex = 0;
  final List<int> _selectedAnswers = [];
  int? _currentSelection;
  bool _isSubmitting = false;
  DailyQuizSubmitResultModel? _result;

  @override
  void initState() {
    super.initState();
    _fetchQuiz();
  }

  Future<void> _fetchQuiz() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final repo = ref.read(dailyEngagementRepositoryProvider);
      final quiz = await repo.getDailyQuizToday();
      if (mounted) {
        setState(() {
          _quiz = quiz;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  void _onOptionSelected(int index) {
    HapticFeedback.lightImpact();
    setState(() {
      _currentSelection = index;
    });
  }

  void _nextQuestion(List<DailyQuizQuestionModel> questions) {
    if (_currentSelection == null) return;

    final isCorrect = _currentSelection == questions[_currentIndex].answer;
    if (isCorrect) {
      ref.read(mascotProvider.notifier).trigger(MascotState.quizCorrect);
    } else {
      ref.read(mascotProvider.notifier).trigger(MascotState.quizWrong);
    }

    _selectedAnswers.add(_currentSelection!);
    _currentSelection = null;

    if (_currentIndex < questions.length - 1) {
      setState(() {
        _currentIndex++;
      });
    } else {
      _submitQuiz();
    }
  }

  Future<void> _submitQuiz() async {
    if (_isSubmitting) return;
    setState(() => _isSubmitting = true);

    try {
      final repo = ref.read(dailyEngagementRepositoryProvider);
      final res = await repo.submitDailyQuiz(_selectedAnswers);

      HapticFeedback.mediumImpact();
      if (mounted) {
        setState(() {
          _result = res;
          _isSubmitting = false;
        });
        await ref.read(authNotifierProvider.notifier).refreshUser();
        ref.read(mascotProvider.notifier).trigger(MascotState.dailyComplete);
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: AppColors.rose,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        backgroundColor: AppColors.background,
        body: LoadingView(message: 'quiz.preparing_questions'.tr()),
      );
    }

    if (_error != null) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          title: Text('daily.daily_quiz'.tr(), style: AppTypography.titleLarge),
        ),
        body: ErrorView(
          message: _error!,
          onRetry: _fetchQuiz,
        ),
      );
    }

    final quiz = _quiz!;

    // Already completed state from initial fetch
    if (quiz.completed && _result == null) {
      return _buildAlreadyCompletedView(quiz);
    }

    // Result view right after submitting
    if (_result != null) {
      return _buildResultView(_result!);
    }

    final questions = quiz.questions;
    final currentQ = questions[_currentIndex];
    final progress = (_currentIndex + 1) / questions.length;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(quiz.titleTa, style: AppTypography.titleMedium.copyWith(fontSize: 16)),
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(6),
          child: LinearProgressIndicator(
            value: progress,
            backgroundColor: AppColors.surface,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.emerald),
            minHeight: 4,
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Question Progress Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'quiz.question'.tr(args: [
                      (_currentIndex + 1).toString(),
                      questions.length.toString(),
                    ]),
                    style: AppTypography.caption.copyWith(color: AppColors.textMuted, fontSize: 13),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.amber.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      '+${quiz.xpReward} XP',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.amberLight,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Question Card
              FadeSlideTransition(
                key: ValueKey('question_$_currentIndex'),
                child: GlassCard(
                  padding: const EdgeInsets.all(22),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        currentQ.questionTa,
                        style: AppTypography.tamilTitle.copyWith(fontSize: 20, height: 1.4),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        currentQ.questionEn,
                        style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Options
              Expanded(
                child: ListView.separated(
                  itemCount: currentQ.options.length,
                  separatorBuilder: (_, _) => const SizedBox(height: 12),
                  itemBuilder: (context, optIdx) {
                    final option = currentQ.options[optIdx];
                    final isSelected = _currentSelection == optIdx;

                    return ScaleOnPress(
                      onTap: () => _onOptionSelected(optIdx),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppColors.emerald.withValues(alpha: 0.18)
                              : AppColors.surface,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected ? AppColors.emeraldLight : AppColors.border,
                            width: isSelected ? 2 : 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 28,
                              height: 28,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: isSelected ? AppColors.emerald : Colors.transparent,
                                border: Border.all(
                                  color: isSelected ? AppColors.emeraldLight : AppColors.textMuted,
                                ),
                              ),
                              child: isSelected
                                  ? const Icon(Icons.check, size: 18, color: Colors.white)
                                  : null,
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Text(
                                option,
                                style: AppTypography.bodyLarge.copyWith(
                                  color: isSelected ? Colors.white : AppColors.textPrimary,
                                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Action Button
              AnimatedButton(
                label: _currentIndex < questions.length - 1
                    ? 'quiz.next_question'.tr()
                    : 'quiz.submit_quiz'.tr(),
                icon: _currentIndex < questions.length - 1
                    ? Icons.arrow_forward_rounded
                    : Icons.check_circle_outline_rounded,
                isLoading: _isSubmitting,
                onPressed: _currentSelection != null
                    ? () => _nextQuestion(questions)
                    : null,
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAlreadyCompletedView(DailyQuizModel quiz) {
    final attempt = quiz.attempt;
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(quiz.titleTa, style: AppTypography.titleMedium),
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.stars_rounded, size: 72, color: AppColors.amberLight),
              const SizedBox(height: 20),
              Text(
                'quiz.quiz_completed'.tr(),
                style: AppTypography.tamilTitle.copyWith(fontSize: 22),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'daily.completed_today'.tr(),
                style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              if (attempt != null) ...[
                GlassCard(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildMetricTile('common.score'.tr(), '${attempt.score} / ${attempt.total}'),
                      _buildMetricTile('common.reward'.tr(), '+${attempt.xpAwarded} XP'),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: 32),
              AnimatedButton(
                label: 'common.back'.tr(),
                icon: Icons.home_rounded,
                onPressed: () => context.pop(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildResultView(DailyQuizSubmitResultModel res) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.celebration_rounded, size: 72, color: AppColors.amberLight),
              const SizedBox(height: 20),
              Text(
                'quiz.quiz_completed'.tr(),
                style: AppTypography.tamilTitle.copyWith(fontSize: 24),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'quiz.final_score'.tr(args: [res.score.toString(), res.total.toString()]),
                style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              GlassCard(
                padding: const EdgeInsets.all(20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildMetricTile('common.score'.tr(), '${res.score} / ${res.total}'),
                    _buildMetricTile('common.reward'.tr(), '+${res.xpGained} XP'),
                    _buildMetricTile('common.streak'.tr(), '🔥 ${res.streak}'),
                  ],
                ),
              ),
              if (res.achievementsUnlocked.isNotEmpty) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.amber.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.amberLight.withValues(alpha: 0.4)),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.emoji_events_rounded, color: AppColors.amberLight, size: 28),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          '${'achievements.unlocked'.tr()}: ${res.achievementsUnlocked.first['title_ta']}',
                          style: AppTypography.titleMedium.copyWith(fontSize: 14, color: AppColors.amberLight),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: 32),
              AnimatedButton(
                label: 'common.continue'.tr(),
                icon: Icons.check_circle_outline_rounded,
                onPressed: () => context.pop(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMetricTile(String label, String value) {
    return Column(
      children: [
        Text(value, style: AppTypography.titleLarge.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.w700)),
        const SizedBox(height: 4),
        Text(label, style: AppTypography.caption.copyWith(color: AppColors.textMuted, fontSize: 11)),
      ],
    );
  }
}
