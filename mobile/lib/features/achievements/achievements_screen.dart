import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../data/models/achievement_model.dart';
import '../../data/models/badge_model.dart';

class AchievementsScreen extends ConsumerStatefulWidget {
  const AchievementsScreen({super.key});

  @override
  ConsumerState<AchievementsScreen> createState() => _AchievementsScreenState();
}

class _AchievementsScreenState extends ConsumerState<AchievementsScreen> {
  String _filter = 'all'; // 'all', 'unlocked', 'locked'

  @override
  Widget build(BuildContext context) {
    final achievementsAsync = ref.watch(achievementsProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(
          'achievements.title'.tr(),
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: AppColors.background,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () => ref.refresh(achievementsProvider),
          ),
        ],
      ),
      body: achievementsAsync.when(
        loading: () => const Center(
          child: CircularProgressIndicator(color: AppColors.amber),
        ),
        error: (err, stack) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, size: 48, color: AppColors.rose),
                const SizedBox(height: 12),
                Text(
                  'achievements.error_loading'.tr(),
                  style: const TextStyle(color: AppColors.textPrimary, fontSize: 16),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  err.toString(),
                  style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () => ref.refresh(achievementsProvider),
                  child: Text('common.retry'.tr()),
                ),
              ],
            ),
          ),
        ),
        data: (achievements) {
          final unlockedCount =
              achievements.where((a) => a.completed).length;
          final totalCount = achievements.length;
          final ratio = totalCount == 0 ? 0.0 : unlockedCount / totalCount;

          final filtered = achievements.where((a) {
            if (_filter == 'unlocked') return a.completed;
            if (_filter == 'locked') return !a.completed;
            return true;
          }).toList();

          return RefreshIndicator(
            onRefresh: () async => ref.refresh(achievementsProvider.future),
            color: AppColors.amber,
            backgroundColor: AppColors.surface,
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
              children: [
                // Header Progress Card
                _buildSummaryCard(unlockedCount, totalCount, ratio),
                const SizedBox(height: 20),

                // Filter Tabs
                _buildFilterRow(unlockedCount, totalCount - unlockedCount),
                const SizedBox(height: 16),

                // Badge Grid / List
                if (filtered.isEmpty)
                  Container(
                    padding: const EdgeInsets.all(32),
                    alignment: Alignment.center,
                    child: Text(
                      _filter == 'unlocked'
                          ? 'achievements.empty_unlocked'.tr()
                          : 'achievements.empty_locked'.tr(),
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: AppColors.textSecondary),
                    ),
                  )
                else
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                      childAspectRatio: 0.82,
                    ),
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      return _buildBadgeCard(filtered[index]);
                    },
                  ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildSummaryCard(int unlocked, int total, double ratio) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: AppColors.amber.withValues(alpha: 0.3)),
        boxShadow: [
          BoxShadow(
            color: AppColors.amber.withValues(alpha: 0.1),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
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
                  valueColor: const AlwaysStoppedAnimation<Color>(
                    AppColors.amber,
                  ),
                ),
              ),
              Text(
                '${(ratio * 100).toInt()}%',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(width: 18),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'achievements.badges_collection'.tr(),
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'achievements.unlocked_count'.tr(args: [unlocked.toString(), total.toString()]),
                  style: const TextStyle(
                    fontSize: 13,
                    color: AppColors.amberLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'achievements.keep_learning_msg'.tr(),
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.textMuted,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterRow(int unlockedCount, int lockedCount) {
    return Row(
      children: [
        _filterChip('all', 'achievements.all_filter'.tr(), null),
        const SizedBox(width: 8),
        _filterChip('unlocked', 'achievements.unlocked_tab'.tr(), unlockedCount),
        const SizedBox(width: 8),
        _filterChip('locked', 'achievements.locked_tab'.tr(), lockedCount),
      ],
    );
  }

  Widget _filterChip(String key, String label, int? count) {
    final selected = _filter == key;
    return InkWell(
      onTap: () => setState(() => _filter = key),
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? AppColors.amber : AppColors.surfaceElevated,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected ? AppColors.amber : AppColors.border,
          ),
        ),
        child: Row(
          children: [
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: selected ? FontWeight.bold : FontWeight.w500,
                color: selected ? Colors.black87 : AppColors.textSecondary,
              ),
            ),
            if (count != null) ...[
              const SizedBox(width: 4),
              Text(
                '($count)',
                style: TextStyle(
                  fontSize: 11,
                  color: selected ? Colors.black87 : AppColors.textMuted,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildBadgeCard(AchievementModel badge) {
    final isUnlocked = badge.completed;
    final isTamil = context.locale.languageCode == 'ta';
    final displayTitle = isTamil && badge.titleTa.isNotEmpty
        ? badge.titleTa
        : (badge.title.isNotEmpty ? badge.title : badge.titleTa);
    final displayDesc = isTamil && badge.descriptionTa.isNotEmpty
        ? badge.descriptionTa
        : (badge.description.isNotEmpty ? badge.description : badge.descriptionTa);

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => _showBadgeDetailSheet(badge),
        borderRadius: BorderRadius.circular(18),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: isUnlocked ? AppColors.surfaceElevated : const Color(0xFF131A26),
            borderRadius: BorderRadius.circular(18),
            border: Border.all(
              color: isUnlocked
                  ? AppColors.amber.withValues(alpha: 0.4)
                  : AppColors.border.withValues(alpha: 0.4),
              width: isUnlocked ? 1.5 : 1,
            ),
            boxShadow: isUnlocked
                ? [
                    BoxShadow(
                      color: AppColors.amber.withValues(alpha: 0.12),
                      blurRadius: 12,
                      offset: const Offset(0, 2),
                    ),
                  ]
                : null,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Badge Icon with glow or lock
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 54,
                    height: 54,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isUnlocked
                          ? AppColors.amber.withValues(alpha: 0.18)
                          : AppColors.surfaceLight.withValues(alpha: 0.3),
                      border: Border.all(
                        color: isUnlocked ? AppColors.amber : Colors.white12,
                        width: 1.5,
                      ),
                    ),
                    alignment: Alignment.center,
                    child: Icon(
                      BadgeIconMapper.getIcon(badge.icon),
                      size: 26,
                      color: isUnlocked ? AppColors.amber : AppColors.textMuted,
                    ),
                  ),
                  if (!isUnlocked)
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.all(3),
                        decoration: const BoxDecoration(
                          color: AppColors.surface,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.lock,
                          size: 12,
                          color: AppColors.textMuted,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 8),

              // Title
              Text(
                displayTitle,
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: isUnlocked
                      ? AppColors.textPrimary
                      : AppColors.textSecondary.withValues(alpha: 0.7),
                ),
              ),
              const SizedBox(height: 2),

              // Subtitle / Description
              Text(
                displayDesc,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 10,
                  color: AppColors.textMuted,
                  height: 1.2,
                ),
              ),

              const Spacer(),

              // XP Reward or Progress
              if (isUnlocked)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 3,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.emerald.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.check_circle, size: 11, color: AppColors.emeraldLight),
                      const SizedBox(width: 4),
                      Text(
                        '+${badge.xpReward} XP',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: AppColors.emeraldLight,
                        ),
                      ),
                    ],
                  ),
                )
              else
                Column(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: badge.progressRatio,
                        minHeight: 4,
                        backgroundColor: AppColors.surfaceLight,
                        valueColor: const AlwaysStoppedAnimation<Color>(
                          AppColors.sky,
                        ),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${badge.progress} / ${badge.requirementValue}',
                      style: const TextStyle(
                        fontSize: 9,
                        color: AppColors.textMuted,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }

  void _showBadgeDetailSheet(AchievementModel badge) {
    final isTamil = context.locale.languageCode == 'ta';
    final displayTitle = isTamil && badge.titleTa.isNotEmpty
        ? badge.titleTa
        : (badge.title.isNotEmpty ? badge.title : badge.titleTa);
    final displayDesc = isTamil && badge.descriptionTa.isNotEmpty
        ? badge.descriptionTa
        : (badge.description.isNotEmpty ? badge.description : badge.descriptionTa);

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surfaceElevated,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.fromLTRB(24, 20, 24, 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.surfaceLight,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 20),
              Container(
                width: 76,
                height: 76,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: badge.completed
                      ? AppColors.amber.withValues(alpha: 0.2)
                      : AppColors.surfaceLight,
                  border: Border.all(
                    color: badge.completed ? AppColors.amber : AppColors.border,
                    width: 2,
                  ),
                ),
                alignment: Alignment.center,
                child: Icon(
                  BadgeIconMapper.getIcon(badge.icon),
                  size: 40,
                  color: badge.completed ? AppColors.amber : AppColors.textMuted,
                ),
              ),
              const SizedBox(height: 14),
              Text(
                displayTitle,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                displayDesc,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 14,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 18),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      badge.completed ? 'achievements.status_unlocked'.tr() : 'achievements.status_locked'.tr(),
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: badge.completed ? AppColors.emeraldLight : AppColors.amberLight,
                      ),
                    ),
                    Text(
                      'achievements.reward_xp'.tr(args: [badge.xpReward.toString()]),
                      style: const TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.surfaceLight,
                    foregroundColor: AppColors.textPrimary,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  child: Text('common.close'.tr()),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
