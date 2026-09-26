import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';
import '../../../data/models/cultural_item_model.dart';

class HeritageMarkerWidget extends StatelessWidget {
  final CulturalItemModel item;
  final bool isDiscovered;
  final bool isSelected;
  final bool isFeatured;
  final bool showLabel;
  final VoidCallback onTap;

  const HeritageMarkerWidget({
    super.key,
    required this.item,
    required this.isDiscovered,
    required this.isSelected,
    this.isFeatured = false,
    this.showLabel = false,
    required this.onTap,
  });

  IconData _getCategoryIcon(String category, String contentType) {
    final cat = category.toLowerCase();
    final type = contentType.toLowerCase();

    if (cat.contains('architecture') || type.contains('architecture')) {
      return Icons.account_balance_rounded;
    } else if (cat.contains('inscription') || type.contains('inscription')) {
      return Icons.history_edu_rounded;
    } else if (cat.contains('temple') || cat.contains('place') || type.contains('place')) {
      return Icons.temple_hindu_rounded;
    } else if (cat.contains('art') || type.contains('art')) {
      return Icons.theater_comedy_rounded;
    } else if (cat.contains('food') || type.contains('food')) {
      return Icons.restaurant_rounded;
    } else if (cat.contains('festival') || type.contains('festival')) {
      return Icons.celebration_rounded;
    } else if (cat.contains('language') || cat.contains('tradition') || type.contains('tradition')) {
      return Icons.auto_stories_rounded;
    } else if (cat.contains('people') || type.contains('people')) {
      return Icons.person_pin_circle_rounded;
    }
    return Icons.shield_moon_rounded;
  }

  Color _getCategoryColor(String category) {
    final cat = category.toLowerCase();
    if (cat.contains('architecture')) {
      return const Color(0xFFF59E0B); // Warm Gold
    } else if (cat.contains('inscription')) {
      return const Color(0xFF38BDF8); // Sky Blue
    } else if (cat.contains('temple') || cat.contains('place')) {
      return const Color(0xFF10B981); // Emerald
    } else if (cat.contains('art')) {
      return const Color(0xFFA855F7); // Royal Purple
    } else if (cat.contains('food')) {
      return const Color(0xFFF97316); // Spice Orange
    } else if (cat.contains('festival')) {
      return const Color(0xFFEC4899); // Festive Pink
    } else if (cat.contains('language') || cat.contains('tradition')) {
      return const Color(0xFF14B8A6); // Teal
    }
    return AppColors.amber;
  }

  @override
  Widget build(BuildContext context) {
    final categoryColor = _getCategoryColor(item.category);
    final icon = _getCategoryIcon(item.category, item.contentType);
    final double pinSize = isSelected ? 42.0 : (isFeatured ? 36.0 : 32.0);

    return Semantics(
      label: '${item.titleTa}, ${item.titleEn}. ${isDiscovered ? "Discovered" : "Undiscovered"} heritage site',
      button: true,
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: AnimatedScale(
          scale: isSelected ? 1.15 : 1.0,
          duration: const Duration(milliseconds: 220),
          curve: Curves.easeOutBack,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
                // Pin head with badge
                Stack(
                  alignment: Alignment.center,
                  clipBehavior: Clip.none,
                  children: [
                    // Outer glow if selected
                    if (isSelected)
                      Container(
                        width: pinSize + 12,
                        height: pinSize + 12,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: categoryColor.withValues(alpha: 0.28),
                          boxShadow: [
                            BoxShadow(
                              color: categoryColor.withValues(alpha: 0.55),
                              blurRadius: 12,
                              spreadRadius: 2,
                            ),
                          ],
                        ),
                      ),

                    // Pin circle container
                    Container(
                      width: pinSize,
                      height: pinSize,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: isDiscovered
                            ? LinearGradient(
                                colors: [
                                  categoryColor,
                                  categoryColor.withValues(alpha: 0.8),
                                ],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              )
                            : const LinearGradient(
                                colors: [
                                  Color(0xFF1E293B),
                                  Color(0xFF0F172A),
                                ],
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                              ),
                        border: Border.all(
                          color: isSelected
                              ? Colors.white
                              : (isDiscovered
                                  ? Colors.white.withValues(alpha: 0.9)
                                  : categoryColor.withValues(alpha: 0.75)),
                          width: isSelected ? 2.4 : (isDiscovered ? 1.8 : 1.4),
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: isSelected
                                ? categoryColor.withValues(alpha: 0.5)
                                : Colors.black.withValues(alpha: 0.4),
                            blurRadius: isSelected ? 8 : 4,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Center(
                        child: Icon(
                          icon,
                          size: pinSize * 0.50,
                          color: isDiscovered
                              ? Colors.white
                              : (isSelected ? Colors.white : categoryColor),
                        ),
                      ),
                    ),

                    // Discovered star badge
                    if (isDiscovered)
                      Positioned(
                        right: -1,
                        top: -1,
                        child: Container(
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                            color: AppColors.emerald,
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white, width: 1.2),
                          ),
                          child: const Icon(Icons.check, size: 8, color: Colors.white),
                        ),
                      ),

                    // Featured monument star
                    if (isFeatured && !isDiscovered)
                      Positioned(
                        top: -3,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 3, vertical: 1),
                          decoration: BoxDecoration(
                            color: AppColors.amber,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: const Icon(Icons.star_rounded, size: 8, color: Colors.black),
                        ),
                      ),
                  ],
                ),

                // Triangular stem pointer
                CustomPaint(
                  size: const Size(6, 4),
                  painter: _PinStemPainter(
                    color: isSelected
                        ? Colors.white
                        : (isDiscovered ? categoryColor : const Color(0xFF1E293B)),
                  ),
                ),

                // Name label pill
                if (isSelected || showLabel)
                  Flexible(
                    child: Container(
                      margin: const EdgeInsets.only(top: 2),
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1.5),
                      decoration: BoxDecoration(
                        color: AppColors.surface.withValues(alpha: 0.92),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: categoryColor.withValues(alpha: isSelected ? 0.9 : 0.4),
                          width: 1,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.45),
                            blurRadius: 4,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Text(
                        item.titleTa,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: 'NotoSansTamil',
                          color: isSelected ? Colors.white : AppColors.textSecondary,
                          fontSize: 9.0,
                          height: 1.1,
                          fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      );
  }
}

class _PinStemPainter extends CustomPainter {
  final Color color;
  _PinStemPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    final path = Path()
      ..moveTo(0, 0)
      ..lineTo(size.width, 0)
      ..lineTo(size.width / 2, size.height)
      ..close();
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant _PinStemPainter oldDelegate) => oldDelegate.color != color;
}
