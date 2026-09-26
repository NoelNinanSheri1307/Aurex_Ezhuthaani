import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../data/models/cultural_item_model.dart';

class HeritageDiscoveryPanel extends StatefulWidget {
  final int discoveredCount;
  final int totalCount;
  final List<CulturalItemModel> allLocations;
  final Set<String> discoveredSlugs;
  final ValueChanged<CulturalItemModel> onSelectLocation;
  final ValueChanged<String> onSelectCategory;

  const HeritageDiscoveryPanel({
    super.key,
    required this.discoveredCount,
    required this.totalCount,
    required this.allLocations,
    required this.discoveredSlugs,
    required this.onSelectLocation,
    required this.onSelectCategory,
  });

  @override
  State<HeritageDiscoveryPanel> createState() => _HeritageDiscoveryPanelState();
}

class _HeritageDiscoveryPanelState extends State<HeritageDiscoveryPanel> {
  bool _isExpanded = false;

  static const List<Map<String, String>> _featuredTargets = [
    {
      'slug': 'brihadisvara-temple',
      'fallbackSlug': 'raja-raja-chola-brihadisvara',
      'titleTa': 'தஞ்சைப் பெரிய கோயில்',
      'titleEn': 'Brihadisvara Temple',
      'tag': 'சோழர் பெருமை',
    },
    {
      'slug': 'madurai-meenakshi-temple',
      'fallbackSlug': 'madurai-meenakshi',
      'titleTa': 'மதுரை மீனாட்சி அம்மன்',
      'titleEn': 'Meenakshi Temple',
      'tag': 'பாண்டியர் கலை',
    },
    {
      'slug': 'mamallapuram-monuments',
      'fallbackSlug': 'pallava-rock-cut-architecture',
      'titleTa': 'மாமல்லபுரம் சிற்பங்கள்',
      'titleEn': 'Mamallapuram',
      'tag': 'பல்லவர் சிற்பம்',
    },
    {
      'slug': 'keezhadi-inscribed-potsherds',
      'fallbackSlug': 'keezhadi-vaigai-urban-inscribed-potsherds',
      'titleTa': 'கீழடி அகழாய்வு மையம்',
      'titleEn': 'Keezhadi Site',
      'tag': 'சங்க கால நகரம்',
    },
  ];

  @override
  Widget build(BuildContext context) {
    final progressFraction = widget.totalCount > 0
        ? (widget.discoveredCount / widget.totalCount).clamp(0.0, 1.0)
        : 0.0;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 260),
      curve: Curves.easeOutCubic,
      margin: const EdgeInsets.fromLTRB(14, 0, 14, 16),
      decoration: BoxDecoration(
        color: const Color(0xF20F172A),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: AppColors.amber.withValues(alpha: 0.35),
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.55),
            blurRadius: 18,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header Bar (Always visible, acts as toggle)
          InkWell(
            onTap: () => setState(() => _isExpanded = !_isExpanded),
            borderRadius: BorderRadius.circular(22),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Row(
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: AppColors.amber.withValues(alpha: 0.15),
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppColors.amber.withValues(alpha: 0.5),
                        width: 1.2,
                      ),
                    ),
                    child: const Icon(
                      Icons.auto_awesome_rounded,
                      size: 16,
                      color: AppColors.amberLight,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text(
                          'தமிழ்நாட்டு மரபுத் தேடல்',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontFamily: 'NotoSansTamil',
                            color: Colors.white,
                            fontSize: 12.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 1),
                        Text(
                          '${widget.discoveredCount} / ${widget.totalCount} கண்டறியப்பட்டது · Atlas',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: AppTypography.caption.copyWith(
                            color: AppColors.textSecondary,
                            fontSize: 9.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Small progress ring or badge
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceElevated,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: AppColors.amber.withValues(alpha: 0.3),
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.emoji_events_rounded,
                          color: AppColors.amberLight,
                          size: 13,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '${(progressFraction * 100).toInt()}%',
                          style: const TextStyle(
                            color: AppColors.amberLight,
                            fontWeight: FontWeight.bold,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 6),
                  Icon(
                    _isExpanded
                        ? Icons.keyboard_arrow_down_rounded
                        : Icons.keyboard_arrow_up_rounded,
                    color: AppColors.textSecondary,
                    size: 22,
                  ),
                ],
              ),
            ),
          ),

          // Expanded Content
          if (_isExpanded) ...[
            Container(
              height: 1,
              color: AppColors.border.withValues(alpha: 0.6),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Progress indicator bar
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'மரபுப் பயணம் முன்னேற்றம் (Atlas Progress)',
                        style: AppTypography.caption.copyWith(
                          color: AppColors.textSecondary,
                          fontSize: 10.5,
                        ),
                      ),
                      Text(
                        '${widget.discoveredCount * 25} XP Earned',
                        style: const TextStyle(
                          color: AppColors.emeraldLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: progressFraction,
                      minHeight: 5,
                      backgroundColor: AppColors.surfaceLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        AppColors.amberLight,
                      ),
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Featured Quick Jump Destinations
                  const Text(
                    'முக்கிய மரபுச் சின்னங்கள் · Featured Sites',
                    style: TextStyle(
                      fontFamily: 'NotoSansTamil',
                      color: AppColors.textPrimary,
                      fontSize: 11.5,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),

                  SizedBox(
                    height: 80,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: _featuredTargets.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 8),
                      itemBuilder: (context, idx) {
                        final target = _featuredTargets[idx];
                        // Find matching item in allLocations
                        CulturalItemModel? match;
                        for (final item in widget.allLocations) {
                          if (item.slug == target['slug'] ||
                              item.slug == target['fallbackSlug']) {
                            match = item;
                            break;
                          }
                        }

                        final isFound = match != null &&
                            widget.discoveredSlugs.contains(match.slug);

                        return InkWell(
                          onTap: () {
                            if (match != null) {
                              widget.onSelectLocation(match);
                            }
                          },
                          borderRadius: BorderRadius.circular(14),
                          child: Container(
                            width: 152,
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceElevated,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: isFound
                                    ? AppColors.emerald.withValues(alpha: 0.6)
                                    : AppColors.amber.withValues(alpha: 0.3),
                                width: 1.1,
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        target['tag']!,
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(
                                          fontFamily: 'NotoSansTamil',
                                          color: isFound
                                              ? AppColors.emeraldLight
                                              : AppColors.amberLight,
                                          fontSize: 9.5,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                    if (isFound)
                                      const Icon(
                                        Icons.check_circle_rounded,
                                        size: 12,
                                        color: AppColors.emeraldLight,
                                      ),
                                  ],
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  target['titleTa']!,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    fontFamily: 'NotoSansTamil',
                                    color: Colors.white,
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                Text(
                                  target['titleEn']!,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    color: AppColors.textSecondary,
                                    fontSize: 9.5,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
