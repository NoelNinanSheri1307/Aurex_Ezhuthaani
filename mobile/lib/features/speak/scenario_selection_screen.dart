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
import '../../data/models/speaking_scenario_model.dart';

class ScenarioSelectionScreen extends ConsumerStatefulWidget {
  const ScenarioSelectionScreen({super.key});

  @override
  ConsumerState<ScenarioSelectionScreen> createState() => _ScenarioSelectionScreenState();
}

class _ScenarioSelectionScreenState extends ConsumerState<ScenarioSelectionScreen> {
  String _selectedCategory = 'all';

  List<Map<String, String>> get _categories => [
    {'id': 'all', 'label': 'speak.cat_all'.tr(), 'icon': '🌟'},
    {'id': 'food', 'label': 'speak.cat_food'.tr(), 'icon': '🍽️'},
    {'id': 'travel', 'label': 'speak.cat_travel'.tr(), 'icon': '🚕'},
    {'id': 'daily_life', 'label': 'speak.cat_daily'.tr(), 'icon': '🛒'},
    {'id': 'social', 'label': 'speak.cat_social'.tr(), 'icon': '🤝'},
    {'id': 'health', 'label': 'speak.cat_health'.tr(), 'icon': '🏥'},
  ];

  @override
  Widget build(BuildContext context) {
    final scenariosAsync = ref.watch(speakingScenariosProvider);
    final statsAsync = ref.watch(speakingStatsProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'speak.title'.tr(),
              style: AppTypography.titleLarge.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              'speak.subtitle'.tr(),
              style: AppTypography.caption.copyWith(
                color: AppColors.emeraldLight,
                fontSize: 11,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'speak.quick_practice'.tr(),
            icon: const Icon(Icons.bolt, color: AppColors.amberLight),
            onPressed: () => context.push('/speak/practice'),
          ),
        ],
      ),
      body: RefreshIndicator(
        color: AppColors.emerald,
        backgroundColor: AppColors.surfaceElevated,
        onRefresh: () async {
          ref.invalidate(speakingScenariosProvider);
          ref.invalidate(speakingStatsProvider);
        },
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
          slivers: [
            // Top Stats Summary
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: statsAsync.when(
                  data: (stats) => _buildStatsRow(stats),
                  loading: () => const SizedBox(height: 72, child: Center(child: CircularProgressIndicator())),
                  error: (_, _) => const SizedBox.shrink(),
                ),
              ),
            ),

            // Quick Practice Banner
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                child: _buildQuickPracticeBanner(context),
              ),
            ),

            // Category Filter Bar
            SliverToBoxAdapter(
              child: SizedBox(
                height: 48,
                child: ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                  scrollDirection: Axis.horizontal,
                  itemCount: _categories.length,
                  separatorBuilder: (_, _) => const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    final cat = _categories[index];
                    final isSelected = _selectedCategory == cat['id'];
                    return ScaleOnPress(
                      onTap: () {
                        setState(() {
                          _selectedCategory = cat['id']!;
                        });
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                        decoration: BoxDecoration(
                          color: isSelected ? AppColors.emerald : AppColors.surfaceElevated,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isSelected ? AppColors.emeraldLight : AppColors.border,
                          ),
                        ),
                        child: Row(
                          children: [
                            Text(cat['icon']!, style: const TextStyle(fontSize: 13)),
                            const SizedBox(width: 6),
                            Text(
                              cat['label']!,
                              style: TextStyle(
                                color: isSelected ? Colors.white : AppColors.textSecondary,
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 8)),

            // Scenarios List
            scenariosAsync.when(
              data: (scenarios) {
                final filtered = _selectedCategory == 'all'
                    ? scenarios
                    : scenarios.where((s) => s.category == _selectedCategory).toList();

                if (filtered.isEmpty) {
                  return SliverFillRemaining(
                    child: Center(
                      child: Text(
                        'speak.no_scenarios'.tr(),
                        textAlign: TextAlign.center,
                        style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                      ),
                    ),
                  );
                }

                return SliverPadding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final scenario = filtered[index];
                        return FadeSlideTransition(
                          delay: Duration(milliseconds: index * 60),
                          child: Padding(
                            padding: const EdgeInsets.only(bottom: 14),
                            child: _buildScenarioCard(context, scenario),
                          ),
                        );
                      },
                      childCount: filtered.length,
                    ),
                  ),
                );
              },
              loading: () => const SliverFillRemaining(
                child: Center(
                  child: CircularProgressIndicator(color: AppColors.emerald),
                ),
              ),
              error: (err, stack) => SliverFillRemaining(
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error_outline, color: AppColors.rose, size: 48),
                      const SizedBox(height: 12),
                      Text(
                        '${'common.error'.tr()}: $err',
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: AppColors.textSecondary),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => ref.invalidate(speakingScenariosProvider),
                        style: ElevatedButton.styleFrom(backgroundColor: AppColors.emerald),
                        child: Text('common.retry'.tr()),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 32)),
          ],
        ),
      ),
    );
  }

  Widget _buildStatsRow(SpeakingStatsModel stats) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Expanded(
            child: _buildStatItem(
              icon: Icons.chat_bubble_outline,
              iconColor: AppColors.skyLight,
              value: '${stats.totalConversations}',
              label: 'speak.stat_spoken'.tr(),
            ),
          ),
          Container(width: 1, height: 32, color: AppColors.border),
          Expanded(
            child: _buildStatItem(
              icon: Icons.mic_none,
              iconColor: AppColors.emeraldLight,
              value: '${stats.averagePronunciationScore}%',
              label: 'speak.stat_accuracy'.tr(),
            ),
          ),
          Container(width: 1, height: 32, color: AppColors.border),
          Expanded(
            child: _buildStatItem(
              icon: Icons.military_tech_outlined,
              iconColor: AppColors.amberLight,
              value: '${stats.speakingBadgesCount}',
              label: 'speak.stat_badges'.tr(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem({
    required IconData icon,
    required Color iconColor,
    required String value,
    required String label,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: Row(
        children: [
          Icon(icon, color: iconColor, size: 20),
          const SizedBox(width: 6),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  value,
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.textPrimary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                FittedBox(
                  fit: BoxFit.scaleDown,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    label,
                    maxLines: 1,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 10,
                      height: 1.1,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickPracticeBanner(BuildContext context) {
    return ScaleOnPress(
      onTap: () => context.push('/speak/practice'),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF8B5CF6), Color(0xFF6D28D9)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: AppColors.purple.withValues(alpha: 0.3),
              blurRadius: 14,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: const Text('⚡', style: TextStyle(fontSize: 26)),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'speak.quick_challenge'.tr(),
                          style: AppTypography.titleMedium.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.amber,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          'speak.seconds_30'.tr(),
                          style: const TextStyle(
                            color: Colors.black,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 3),
                  Text(
                    'speak.quick_challenge_desc'.tr(),
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.85),
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, color: Colors.white, size: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildScenarioCard(BuildContext context, SpeakingScenarioModel scenario) {
    Color badgeColor;
    if (scenario.difficulty == 'beginner') {
      badgeColor = AppColors.emerald;
    } else if (scenario.difficulty == 'intermediate') {
      badgeColor = AppColors.amber;
    } else {
      badgeColor = AppColors.rose;
    }

    return GlassCard(
      borderRadius: 18,
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
            // Header Row: Character info + difficulty
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                _buildAvatar(scenario.characterAvatar),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              scenario.titleTamil,
                              style: AppTypography.titleMedium.copyWith(
                                color: AppColors.textPrimary,
                                fontWeight: FontWeight.bold,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: badgeColor.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(color: badgeColor.withValues(alpha: 0.4)),
                            ),
                            child: Text(
                              scenario.difficulty.toUpperCase(),
                              style: TextStyle(
                                color: badgeColor,
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        scenario.title,
                        style: const TextStyle(
                          color: AppColors.textSecondary,
                          fontSize: 12,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${'speak.character'.tr()}: ${scenario.characterName} (${scenario.characterRole})',
                        style: TextStyle(
                          color: AppColors.skyLight.withValues(alpha: 0.9),
                          fontSize: 11,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 12),

            // Objective
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.surface.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.flag_outlined, size: 16, color: AppColors.amberLight),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      scenario.objectiveTamil,
                      style: const TextStyle(
                        color: AppColors.textSecondary,
                        fontSize: 11,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 14),

            // Bottom action row: XP, stages, completion stars & action button
            Row(
              children: [
                Expanded(
                  child: Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    spacing: 6,
                    runSpacing: 4,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.emerald.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.bolt, size: 13, color: AppColors.emeraldLight),
                            const SizedBox(width: 3),
                            Text(
                              '+${scenario.xpReward} XP',
                              style: const TextStyle(
                                color: AppColors.emeraldLight,
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Text(
                        '⏱️ ${scenario.estimatedDuration}',
                        style: const TextStyle(
                          color: AppColors.textMuted,
                          fontSize: 11,
                        ),
                      ),
                      if (scenario.isCompleted)
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: List.generate(
                            3,
                            (i) => Icon(
                              i < scenario.stars ? Icons.star : Icons.star_border,
                              color: AppColors.amberLight,
                              size: 14,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                ScaleOnPress(
                  onTap: () => context.push('/speak/conversation/${scenario.key}'),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                    decoration: BoxDecoration(
                      gradient: AppColors.emeraldGradient,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.emerald.withValues(alpha: 0.3),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.record_voice_over, color: Colors.white, size: 14),
                        const SizedBox(width: 5),
                        Text(
                          scenario.isCompleted ? 'speak.speak_again'.tr() : 'speak.start_speaking'.tr(),
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      );
  }

  Widget _buildAvatar(String avatarKey) {
    String emoji = '👤';
    Color bgColor = AppColors.purple;

    if (avatarKey.contains('waiter')) {
      emoji = '👨‍🍳';
      bgColor = AppColors.amber;
    } else if (avatarKey.contains('driver')) {
      emoji = '🛺';
      bgColor = AppColors.emerald;
    } else if (avatarKey.contains('shopkeeper')) {
      emoji = '🏪';
      bgColor = AppColors.sky;
    } else if (avatarKey.contains('barista')) {
      emoji = '☕';
      bgColor = const Color(0xFFB45309);
    } else if (avatarKey.contains('student')) {
      emoji = '🎓';
      bgColor = AppColors.purple;
    } else if (avatarKey.contains('clerk')) {
      emoji = '🚆';
      bgColor = const Color(0xFF0284C7);
    } else if (avatarKey.contains('doctor')) {
      emoji = '👩‍⚕️';
      bgColor = AppColors.rose;
    } else if (avatarKey.contains('neighbor')) {
      emoji = '🏡';
      bgColor = AppColors.emerald;
    }

    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        color: bgColor.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: bgColor.withValues(alpha: 0.5), width: 1.5),
      ),
      child: Center(
        child: Text(emoji, style: const TextStyle(fontSize: 24)),
      ),
    );
  }
}
