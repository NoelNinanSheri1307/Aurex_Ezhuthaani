import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../core/widgets/xp_streak_badge.dart';
import '../../data/models/flashcard_model.dart';
import '../auth/auth_provider.dart';

class FlashcardsOverviewScreen extends ConsumerWidget {
  const FlashcardsOverviewScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categoriesAsync = ref.watch(flashcardCategoriesProvider);
    final authState = ref.watch(authNotifierProvider);
    final user = authState.user;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'flashcards.title'.tr(),
              style: AppTypography.titleLarge.copyWith(fontSize: 18),
            ),
            Text(
              'flashcards.subtitle'.tr(),
              style: AppTypography.caption.copyWith(color: AppColors.textMuted),
            ),
          ],
        ),
        actions: [
          if (user != null)
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: XPBadge(xp: user.xp, isCompact: true),
            ),
        ],
      ),
      body: categoriesAsync.when(
        loading: () => LoadingView(message: 'flashcards.loading'.tr()),
        error: (err, _) => ErrorView(
          message: err.toString(),
          onRetry: () => ref.refresh(flashcardCategoriesProvider),
        ),
        data: (categories) {
          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(flashcardCategoriesProvider);
              await ref.read(authNotifierProvider.notifier).refreshUser();
            },
            color: AppColors.emerald,
            backgroundColor: AppColors.surface,
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              children: [
                // Hero Banner
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 50),
                  child: Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF0F766E), Color(0xFF0D9488), Color(0xFF065F46)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF0F766E).withValues(alpha: 0.35),
                          blurRadius: 18,
                          offset: const Offset(0, 6),
                        ),
                      ],
                      border: Border.all(
                        color: AppColors.emeraldLight.withValues(alpha: 0.3),
                        width: 1.2,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(14),
                              ),
                              child: const Text('🎴', style: TextStyle(fontSize: 28)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'flashcards.hero_title'.tr(),
                                    style: AppTypography.titleMedium.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'flashcards.hero_subtitle'.tr(),
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 11,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Wrap(
                          spacing: 8,
                          runSpacing: 6,
                          children: [
                            _buildHeroStatChip(
                              icon: Icons.style_rounded,
                              label: 'flashcards.cards_count'.tr(args: [
                                categories.fold<int>(0, (sum, c) => sum + c.cardCount).toString(),
                              ]),
                            ),
                            _buildHeroStatChip(
                              icon: Icons.bolt_rounded,
                              label: '+10 XP / Card',
                              highlight: true,
                            ),
                            _buildHeroStatChip(
                              icon: Icons.volume_up_rounded,
                              label: 'flashcards.tts_audio'.tr(),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Section Title
                Text(
                  'flashcards.decks'.tr(),
                  style: AppTypography.titleMedium.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 12),

                // Category List
                ...categories.asMap().entries.map((entry) {
                  final index = entry.key;
                  final category = entry.value;
                  return FadeSlideTransition(
                    delay: Duration(milliseconds: 100 + (index * 60)),
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 14),
                      child: _buildCategoryCard(context, category),
                    ),
                  );
                }),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildHeroStatChip({
    required IconData icon,
    required String label,
    bool highlight = false,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: highlight
            ? AppColors.amber.withValues(alpha: 0.25)
            : Colors.white.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: highlight ? AppColors.amberLight : Colors.white.withValues(alpha: 0.2),
          width: 0.8,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 13,
            color: highlight ? AppColors.amberLight : Colors.white,
          ),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(
              color: highlight ? AppColors.amberLight : Colors.white,
              fontSize: 11,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(BuildContext context, FlashcardCategoryModel category) {
    Color cardColor;
    try {
      final hex = category.color.replaceAll('#', '');
      cardColor = Color(int.parse('0xFF$hex'));
    } catch (_) {
      cardColor = AppColors.emerald;
    }

    return ScaleOnPress(
      onTap: () => context.push('/flashcards/${category.id}'),
      child: GlassCard(
        padding: const EdgeInsets.all(18),
        borderRadius: 20,
        child: Row(
          children: [
            // Icon Container
            Container(
              width: 54,
              height: 54,
              decoration: BoxDecoration(
                color: cardColor.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: cardColor.withValues(alpha: 0.35),
                  width: 1.2,
                ),
              ),
              child: Center(
                child: Text(
                  category.icon,
                  style: const TextStyle(fontSize: 26),
                ),
              ),
            ),
            const SizedBox(width: 16),

            // Text Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          category.titleTa,
                          style: AppTypography.titleMedium.copyWith(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.amber.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '+${category.xpReward} XP',
                          style: const TextStyle(
                            color: AppColors.amberLight,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 3),
                  Text(
                    category.titleEn,
                    style: AppTypography.caption.copyWith(
                      color: AppColors.textMuted,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Icon(Icons.layers_rounded, size: 13, color: cardColor),
                      const SizedBox(width: 4),
                      Text(
                        'flashcards.cards_count'.tr(args: [category.cardCount.toString()]),
                        style: TextStyle(
                          color: cardColor,
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),

            // Arrow
            const Icon(
              Icons.arrow_forward_ios_rounded,
              color: AppColors.textMuted,
              size: 15,
            ),
          ],
        ),
      ),
    );
  }
}
