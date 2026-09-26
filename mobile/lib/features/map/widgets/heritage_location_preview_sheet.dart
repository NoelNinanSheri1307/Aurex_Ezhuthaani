import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/animated_button.dart';
import '../../../core/widgets/glass_card.dart';
import '../../../data/models/cultural_item_model.dart';

class HeritageLocationPreviewSheet extends StatelessWidget {
  final CulturalItemModel item;
  final bool isDiscovered;
  final VoidCallback onDiscover;
  final VoidCallback onClose;

  const HeritageLocationPreviewSheet({
    super.key,
    required this.item,
    required this.isDiscovered,
    required this.onDiscover,
    required this.onClose,
  });

  Color _getCategoryColor(String category) {
    final cat = category.toLowerCase();
    if (cat.contains('architecture')) {
      return const Color(0xFFF59E0B);
    } else if (cat.contains('inscription')) {
      return const Color(0xFF38BDF8);
    } else if (cat.contains('temple') || cat.contains('place')) {
      return const Color(0xFF10B981);
    } else if (cat.contains('art')) {
      return const Color(0xFFA855F7);
    } else if (cat.contains('food')) {
      return const Color(0xFFF97316);
    } else if (cat.contains('festival')) {
      return const Color(0xFFEC4899);
    }
    return AppColors.amber;
  }

  @override
  Widget build(BuildContext context) {
    final categoryColor = _getCategoryColor(item.category);
    final periodText = item.period ?? item.era ?? item.dateLabel;
    final locationText = item.locationName ?? item.region;
    final didYouKnow = item.historicalSignificance ?? item.scriptLanguage ?? item.literaryTradition;

    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
        border: Border.all(color: AppColors.border, width: 1.2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.6),
            blurRadius: 30,
            offset: const Offset(0, -6),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Drag indicator handle
              Center(
                child: Container(
                  width: 36,
                  height: 4,
                  margin: const EdgeInsets.only(bottom: 14),
                  decoration: BoxDecoration(
                    color: AppColors.textMuted.withValues(alpha: 0.4),
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),

              // Category & Period Pill Row
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: categoryColor.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: categoryColor.withValues(alpha: 0.4)),
                    ),
                    child: Text(
                      item.category.toUpperCase(),
                      style: AppTypography.caption.copyWith(
                        color: categoryColor,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 0.6,
                      ),
                    ),
                  ),
                  if (periodText != null) ...[
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceElevated,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Text(
                        periodText,
                        style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                      ),
                    ),
                  ],
                  const Spacer(),
                  // Close cross
                  IconButton(
                    icon: const Icon(Icons.close, color: AppColors.textMuted, size: 20),
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    onPressed: onClose,
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Titles
              Text(
                item.titleTa,
                style: AppTypography.tamilTitle.copyWith(fontSize: 22, height: 1.25),
              ),
              const SizedBox(height: 2),
              Text(
                item.titleEn,
                style: AppTypography.titleMedium.copyWith(color: AppColors.textSecondary),
              ),

              // Region / Location name
              if (locationText != null) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(Icons.location_on, color: AppColors.roseLight, size: 16),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        locationText,
                        style: AppTypography.caption.copyWith(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
              const SizedBox(height: 14),

              // Story Summary
              Text(
                item.summaryTa.isNotEmpty ? item.summaryTa : item.summaryEn,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textPrimary.withValues(alpha: 0.9),
                  height: 1.5,
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),

              // Did you know? section
              if (didYouKnow != null && didYouKnow.isNotEmpty) ...[
                const SizedBox(height: 14),
                GlassCard(
                  padding: const EdgeInsets.all(12),
                  borderRadius: 14,
                  backgroundColor: AppColors.surfaceElevated.withValues(alpha: 0.7),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(Icons.lightbulb_outline_rounded, color: AppColors.amberLight, size: 20),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'அறிந்ததுண்டா? · Did you know?',
                              style: AppTypography.caption.copyWith(
                                color: AppColors.amberLight,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              didYouKnow,
                              style: AppTypography.caption.copyWith(
                                color: AppColors.textSecondary,
                                height: 1.35,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: 16),

              // Gamification & Action CTAs
              Row(
                children: [
                  // Discovered status / button
                  if (!isDiscovered)
                    Expanded(
                      flex: 4,
                      child: ElevatedButton.icon(
                        icon: const Icon(Icons.stars_rounded, color: Colors.black, size: 18),
                        label: const Text(
                          'கண்டறி (+25 XP)',
                          style: TextStyle(
                            fontFamily: 'NotoSansTamil',
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                            color: Colors.black,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.amber,
                          elevation: 4,
                          padding: const EdgeInsets.symmetric(vertical: 13),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        onPressed: onDiscover,
                      ),
                    )
                  else
                    Expanded(
                      flex: 4,
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        decoration: BoxDecoration(
                          color: AppColors.emerald.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: AppColors.emeraldLight.withValues(alpha: 0.5)),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.check_circle_rounded, color: AppColors.emeraldLight, size: 18),
                            SizedBox(width: 6),
                            Text(
                              'கண்டறியப்பட்டது · Discovered',
                              style: TextStyle(
                                fontFamily: 'NotoSansTamil',
                                color: AppColors.emeraldLight,
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                  const SizedBox(width: 10),

                  // Explore Full Details button
                  Expanded(
                    flex: 5,
                    child: AnimatedButton(
                      label: 'Explore · ஆராய்க',
                      onPressed: () {
                        context.push('/culture/${item.slug}', extra: item);
                      },
                      gradient: AppColors.skyGradient,
                      icon: Icons.arrow_forward_rounded,
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
}
