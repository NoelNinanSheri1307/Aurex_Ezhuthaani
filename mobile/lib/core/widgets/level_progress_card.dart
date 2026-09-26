import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

import '../gamification/level_system.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';
import 'glass_card.dart';

/// Reusable polished card displaying user's current level, Tamil title,
/// XP within level range, animated progress bar, and XP required for next level.
class LevelProgressCard extends StatelessWidget {
  final int xp;
  final bool isCompact;
  final VoidCallback? onTap;

  const LevelProgressCard({
    super.key,
    required this.xp,
    this.isCompact = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final safeXp = xp < 0 ? 0 : xp;
    final level = LevelSystem.levelForXp(safeXp);
    final nextLevel = level + 1;
    final titleTa = LevelSystem.levelTitle(level);
    final titleEn = LevelSystem.levelSubtitle(level);
    final targetXp = LevelSystem.nextLevelMinXp(safeXp);
    final remainingXp = LevelSystem.xpNeededForNextLevel(safeXp);
    final progress = LevelSystem.levelProgress(safeXp);
    final percent = (progress * 100).toInt();

    final content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Header: Level badge + Titles
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                gradient: AppColors.emeraldGradient,
                borderRadius: BorderRadius.circular(10),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.emerald.withValues(alpha: 0.35),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Text(
                '${'common.level'.tr()} $level',
                style: AppTypography.caption.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.5,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    titleTa,
                    style: AppTypography.tamilTitle.copyWith(
                      fontSize: isCompact ? 13 : 15,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    titleEn,
                    style: AppTypography.caption.copyWith(
                      color: AppColors.textMuted,
                      fontSize: 10,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            // Percentage pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.border),
              ),
              child: Text(
                '$percent%',
                style: AppTypography.caption.copyWith(
                  fontWeight: FontWeight.w700,
                  color: AppColors.emeraldLight,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),

        // XP Count Row: e.g. "420 XP / 490 XP"
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                const Icon(Icons.bolt_rounded, size: 16, color: AppColors.amberLight),
                const SizedBox(width: 4),
                Text(
                  '$safeXp XP',
                  style: AppTypography.titleMedium.copyWith(
                    color: AppColors.amberLight,
                    fontWeight: FontWeight.w700,
                    fontSize: 13,
                  ),
                ),
                Text(
                  ' / $targetXp XP',
                  style: AppTypography.caption.copyWith(
                    color: AppColors.textMuted,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
            Text(
              'common.xp_to_next'.tr(args: ['$remainingXp', '$nextLevel']),
              style: AppTypography.caption.copyWith(
                color: AppColors.emeraldLight,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),

        // Animated Smooth Progress Bar
        ClipRRect(
          borderRadius: BorderRadius.circular(6),
          child: TweenAnimationBuilder<double>(
            duration: const Duration(milliseconds: 600),
            curve: Curves.easeOutCubic,
            tween: Tween<double>(begin: 0.0, end: progress),
            builder: (context, val, _) {
              return Stack(
                children: [
                  Container(
                    height: 8,
                    width: double.infinity,
                    color: AppColors.surfaceLight,
                  ),
                  FractionallySizedBox(
                    widthFactor: val.clamp(0.0, 1.0),
                    child: Container(
                      height: 8,
                      decoration: const BoxDecoration(
                        gradient: AppColors.emeraldGradient,
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ],
    );

    final card = GlassCard(
      padding: EdgeInsets.all(isCompact ? 12 : 16),
      child: content,
    );

    if (onTap != null) {
      return GestureDetector(
        onTap: onTap,
        child: card,
      );
    }
    return card;
  }
}
