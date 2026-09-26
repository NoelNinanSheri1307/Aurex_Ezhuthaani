import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/badge_model.dart';

class BadgesScreen extends ConsumerStatefulWidget {
  const BadgesScreen({super.key});

  @override
  ConsumerState<BadgesScreen> createState() => _BadgesScreenState();
}

class _BadgesScreenState extends ConsumerState<BadgesScreen> {
  String _selectedCategory = 'all';

  final List<Map<String, String>> _categories = const [
    {'id': 'all', 'label': 'All', 'labelTa': 'அனைத்தும்', 'icon': '🏆'},
    {'id': 'learning', 'label': 'Learning', 'labelTa': 'கற்றல்', 'icon': '🌱'},
    {'id': 'streak', 'label': 'Streak', 'labelTa': 'தொடர்ச்சி', 'icon': '🔥'},
    {'id': 'crossword', 'label': 'Crossword', 'labelTa': 'புதிர்', 'icon': '🧩'},
    {'id': 'kural', 'label': 'Kural', 'labelTa': 'திருக்குறள்', 'icon': '📜'},
    {'id': 'heritage', 'label': 'Heritage', 'labelTa': 'மரபு', 'icon': '🏛️'},
    {'id': 'quiz', 'label': 'Quiz', 'labelTa': 'வினாடி வினா', 'icon': '🧠'},
    {'id': 'social', 'label': 'Social', 'labelTa': 'தோழமை', 'icon': '👥'},
    {'id': 'milestone', 'label': 'Milestones', 'labelTa': 'மைல்கல்', 'icon': '⭐'},
  ];

  @override
  Widget build(BuildContext context) {
    final badgesAsync = ref.watch(myBadgesProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('achievements.title'.tr()),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            tooltip: 'common.retry'.tr(),
            onPressed: () => ref.refresh(myBadgesProvider),
          ),
        ],
      ),
      body: badgesAsync.when(
        loading: () => LoadingView(message: 'common.loading'.tr()),
        error: (err, _) => ErrorView(
          message: 'achievements.error_loading'.tr(),
          onRetry: () => ref.refresh(myBadgesProvider),
        ),
        data: (badges) {
          final unlockedCount = badges.where((b) => b.isUnlocked).length;
          final totalCount = badges.length;
          final ratio = totalCount > 0 ? (unlockedCount / totalCount) : 0.0;

          final filtered = badges.where((b) {
            if (_selectedCategory == 'all') return true;
            return b.category.toLowerCase() == _selectedCategory.toLowerCase();
          }).toList();

          return RefreshIndicator(
            onRefresh: () async => ref.refresh(myBadgesProvider.future),
            color: AppColors.emerald,
            backgroundColor: AppColors.surface,
            child: CustomScrollView(
              physics: const AlwaysScrollableScrollPhysics(
                parent: BouncingScrollPhysics(),
              ),
              slivers: [
                // Top Progress Card
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
                    child: _buildOverallProgressCard(unlockedCount, totalCount, ratio),
                  ),
                ),

                // Category Filter Tabs
                SliverToBoxAdapter(
                  child: SizedBox(
                    height: 44,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      itemCount: _categories.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 8),
                      itemBuilder: (context, i) {
                        final cat = _categories[i];
                        final isSelected = cat['id'] == _selectedCategory;
                        final isTa = context.locale.languageCode == 'ta';
                        final catLabel = isTa ? cat['labelTa']! : cat['label']!;
                        return ChoiceChip(
                          label: Text('${cat['icon']} $catLabel'),
                          selected: isSelected,
                          onSelected: (_) {
                            setState(() => _selectedCategory = cat['id']!);
                          },
                          selectedColor: AppColors.emerald,
                          backgroundColor: AppColors.surfaceLight,
                          labelStyle: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: isSelected ? Colors.white : AppColors.textSecondary,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                            side: BorderSide(
                              color: isSelected
                                  ? AppColors.emerald
                                  : AppColors.border.withValues(alpha: 0.5),
                            ),
                          ),
                          showCheckmark: false,
                        );
                      },
                    ),
                  ),
                ),

                const SliverToBoxAdapter(child: SizedBox(height: 16)),

                // Badges Grid
                if (filtered.isEmpty)
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 48, horizontal: 24),
                      child: Center(
                        child: Column(
                          children: [
                            const Icon(Icons.shield_outlined, size: 48, color: AppColors.textMuted),
                            const SizedBox(height: 12),
                            Text(
                              'achievements.no_badges_category'.tr(),
                              style: AppTypography.titleMedium.copyWith(color: AppColors.textSecondary),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                  )
                else
                  SliverPadding(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 32),
                    sliver: SliverGrid(
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        mainAxisSpacing: 14,
                        crossAxisSpacing: 14,
                        childAspectRatio: 0.74,
                      ),
                      delegate: SliverChildBuilderDelegate(
                        (context, index) {
                          final badge = filtered[index];
                          return _buildBadgeCard(badge);
                        },
                        childCount: filtered.length,
                      ),
                    ),
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildOverallProgressCard(int unlocked, int total, double ratio) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.amber.withValues(alpha: 0.35), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: AppColors.amber.withValues(alpha: 0.12),
            blurRadius: 24,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Row(
        children: [
          // Circular Progress
          Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                width: 72,
                height: 72,
                child: CircularProgressIndicator(
                  value: ratio,
                  strokeWidth: 7,
                  backgroundColor: AppColors.surfaceLight,
                  valueColor: const AlwaysStoppedAnimation<Color>(AppColors.amber),
                ),
              ),
              Text(
                '${(ratio * 100).toInt()}%',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(width: 18),

          // Progress text
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.military_tech_rounded, color: AppColors.amber, size: 20),
                    const SizedBox(width: 6),
                    Text(
                      'achievements.badges_collection'.tr(),
                      style: AppTypography.titleMedium.copyWith(
                        color: AppColors.textPrimary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  'achievements.unlocked_count'.tr(args: [unlocked.toString(), total.toString()]),
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    color: AppColors.amberLight,
                  ),
                ),
                const SizedBox(height: 4),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: ratio,
                    minHeight: 5,
                    backgroundColor: AppColors.surfaceLight,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.emerald),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadgeCard(BadgeModel badge) {
    final isUnlocked = badge.isUnlocked;
    final rarityColor = badge.rarity.color;

    return GestureDetector(
      onTap: () => _showBadgeDetailSheet(badge),
      child: Container(
        decoration: BoxDecoration(
          color: isUnlocked
              ? const Color(0xFF0F172A).withValues(alpha: 0.9)
              : AppColors.surface.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isUnlocked
                ? rarityColor.withValues(alpha: 0.7)
                : AppColors.border.withValues(alpha: 0.5),
            width: isUnlocked ? 1.8 : 1,
          ),
          boxShadow: isUnlocked
              ? [
                  BoxShadow(
                    color: rarityColor.withValues(alpha: 0.22),
                    blurRadius: 18,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Top Rarity & Lock Status Row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Rarity Tag
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                  decoration: BoxDecoration(
                    color: rarityColor.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    badge.rarity.displayName.toUpperCase(),
                    style: TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.w800,
                      color: rarityColor,
                      letterSpacing: 0.4,
                    ),
                  ),
                ),
                // Lock / Unlock Indicator
                Icon(
                  isUnlocked ? Icons.check_circle_rounded : Icons.lock_rounded,
                  size: 16,
                  color: isUnlocked ? AppColors.emerald : AppColors.textMuted,
                ),
              ],
            ),
            const Spacer(),

            // Badge Artwork
            BadgeArtWidget(
              badge: badge,
              size: 58,
              showLockWhenLocked: false,
            ),
            const Spacer(),

            // Badge Tamil Name
            Text(
              badge.nameTamil,
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: AppTypography.titleMedium.copyWith(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: isUnlocked ? AppColors.textPrimary : AppColors.textMuted,
              ),
            ),
            const SizedBox(height: 2),

            // Badge English Name
            Text(
              badge.name,
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: AppTypography.caption.copyWith(
                fontSize: 11,
                color: isUnlocked ? AppColors.textSecondary : AppColors.textMuted,
              ),
            ),
            const SizedBox(height: 8),

            // Bottom Progress or XP Tag
            if (isUnlocked)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: AppColors.amber.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '+${badge.xpReward} XP',
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w800,
                    color: AppColors.amber,
                  ),
                ),
              )
            else ...[
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: badge.progressRatio,
                  minHeight: 5,
                  backgroundColor: AppColors.surfaceLight,
                  valueColor: AlwaysStoppedAnimation<Color>(rarityColor),
                ),
              ),
              const SizedBox(height: 3),
              Text(
                '${badge.progress} / ${badge.progressTarget}',
                style: const TextStyle(fontSize: 10, color: AppColors.textMuted),
              ),
            ],
          ],
        ),
      ),
    );
  }

  void _showBadgeDetailSheet(BadgeModel badge) {
    final isUnlocked = badge.isUnlocked;
    final rarityColor = badge.rarity.color;

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) {
        return GlassCard(
          padding: const EdgeInsets.fromLTRB(24, 16, 24, 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Grab handle
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 20),

              // Companion Mascot
              Image.asset(
                badge.isUnlocked
                    ? 'assets/images/mascotwinning.png'
                    : 'assets/images/mascotstudying.png',
                width: 60,
                height: 60,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 12),

              // Large Badge Art
              BadgeArtWidget(
                badge: badge,
                size: 84,
                showLockWhenLocked: false,
              ),
              const SizedBox(height: 14),

              // Rarity Tag
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                decoration: BoxDecoration(
                  color: rarityColor.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: rarityColor.withValues(alpha: 0.4)),
                ),
                child: Text(
                  '${badge.rarity.displayNameTa} · ${badge.rarity.displayName.toUpperCase()}',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: rarityColor,
                  ),
                ),
              ),
              const SizedBox(height: 12),

              // Tamil Title
              Text(
                badge.nameTamil,
                textAlign: TextAlign.center,
                style: AppTypography.titleLarge.copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 2),

              // English Title
              Text(
                badge.name,
                textAlign: TextAlign.center,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 12),

              // Description
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight.withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
                ),
                child: Column(
                  children: [
                    if (badge.descriptionTamil.isNotEmpty) ...[
                      Text(
                        badge.descriptionTamil,
                        textAlign: TextAlign.center,
                        style: AppTypography.bodyMedium.copyWith(color: AppColors.textPrimary),
                      ),
                      const SizedBox(height: 4),
                    ],
                    Text(
                      badge.description,
                      textAlign: TextAlign.center,
                      style: AppTypography.caption.copyWith(color: AppColors.textMuted),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Status Box
              if (isUnlocked) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                  decoration: BoxDecoration(
                    color: AppColors.emerald.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppColors.emerald.withValues(alpha: 0.4)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.check_circle_rounded, color: AppColors.emerald, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'achievements.badge_unlocked_xp'.tr(args: [badge.xpReward.toString()]),
                        style: const TextStyle(
                          color: AppColors.emerald,
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ),
              ] else ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceLight,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('achievements.progress'.tr(), style: AppTypography.caption),
                          Text(
                            '${badge.progress} / ${badge.progressTarget}',
                            style: AppTypography.caption.copyWith(
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(6),
                        child: LinearProgressIndicator(
                          value: badge.progressRatio,
                          minHeight: 8,
                          backgroundColor: AppColors.surface,
                          valueColor: AlwaysStoppedAnimation<Color>(rarityColor),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'achievements.remaining_needed'.tr(args: [(badge.progressTarget - badge.progress).toString()]),
                        style: TextStyle(
                          fontSize: 11,
                          color: rarityColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
