import 'package:flutter/material.dart';
import '../animations/scale_on_press.dart';
import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

class AnimatedButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final bool isLoading;
  final LinearGradient gradient;
  final IconData? icon;
  final double height;
  final double? width;

  const AnimatedButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.gradient = AppColors.emeraldGradient,
    this.icon,
    this.height = 56,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return ScaleOnPress(
      onTap: isLoading ? null : onPressed,
      child: Container(
        height: height,
        width: width ?? double.infinity,
        decoration: BoxDecoration(
          gradient: onPressed == null || isLoading
              ? const LinearGradient(colors: [AppColors.surfaceElevated, AppColors.surfaceElevated])
              : gradient,
          borderRadius: BorderRadius.circular(18),
          boxShadow: onPressed == null || isLoading
              ? []
              : [
                  BoxShadow(
                    color: gradient.colors.first.withValues(alpha: 0.35),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
        ),
        child: Center(
          child: isLoading
              ? const SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.5,
                    color: Colors.white,
                  ),
                )
              : Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (icon != null) ...[
                      Icon(icon, color: Colors.white, size: 20),
                      const SizedBox(width: 8),
                    ],
                    Text(
                      label,
                      style: AppTypography.titleMedium.copyWith(color: Colors.white),
                    ),
                  ],
                ),
        ),
      ),
    );
  }
}
