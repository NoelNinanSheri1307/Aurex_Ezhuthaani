import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class XPBadge extends StatelessWidget {
  final int xp;
  final bool isCompact;

  const XPBadge({super.key, required this.xp, this.isCompact = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isCompact ? 8 : 14,
        vertical: isCompact ? 4 : 8,
      ),
      decoration: BoxDecoration(
        color: AppColors.amber.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: AppColors.amber.withValues(alpha: 0.4), width: 1.2),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.bolt_rounded, color: AppColors.amberLight, size: isCompact ? 15 : 18),
          const SizedBox(width: 4),
          Text(
            '$xp XP',
            style: AppTypography.titleMedium.copyWith(
              color: AppColors.amberLight,
              fontSize: isCompact ? 12 : 15,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

class StreakBadge extends StatelessWidget {
  final int streak;
  final bool isCompact;

  const StreakBadge({super.key, required this.streak, this.isCompact = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isCompact ? 8 : 14,
        vertical: isCompact ? 4 : 8,
      ),
      decoration: BoxDecoration(
        color: AppColors.rose.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: AppColors.rose.withValues(alpha: 0.4), width: 1.2),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.local_fire_department_rounded, color: AppColors.roseLight, size: isCompact ? 15 : 18),
          const SizedBox(width: 4),
          Text(
            isCompact ? '$streak d' : '$streak Days',
            style: AppTypography.titleMedium.copyWith(
              color: AppColors.roseLight,
              fontSize: isCompact ? 12 : 15,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}

class LevelBadge extends StatelessWidget {
  final int level;

  const LevelBadge({super.key, required this.level});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.sky.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: AppColors.sky.withValues(alpha: 0.4), width: 1.2),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.auto_awesome_rounded, color: AppColors.skyLight, size: 16),
          const SizedBox(width: 5),
          Text(
            'Lvl $level',
            style: AppTypography.caption.copyWith(
              color: AppColors.skyLight,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
