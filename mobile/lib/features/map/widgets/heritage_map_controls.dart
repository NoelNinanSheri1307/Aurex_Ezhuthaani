import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class HeritageMapControls extends StatelessWidget {
  final VoidCallback onFocusTamilNadu;
  final VoidCallback onRecenterIndia;
  final VoidCallback onZoomIn;
  final VoidCallback onZoomOut;
  final VoidCallback? onOpenJourneys;

  const HeritageMapControls({
    super.key,
    required this.onFocusTamilNadu,
    required this.onRecenterIndia,
    required this.onZoomIn,
    required this.onZoomOut,
    this.onOpenJourneys,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        // Focus Tamil Nadu button
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onFocusTamilNadu,
            borderRadius: BorderRadius.circular(18),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
              decoration: BoxDecoration(
                color: const Color(0xF20F172A),
                borderRadius: BorderRadius.circular(18),
                border: Border.all(
                  color: AppColors.amber.withValues(alpha: 0.8),
                  width: 1.3,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.45),
                    blurRadius: 10,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.auto_awesome_rounded,
                    color: AppColors.amberLight,
                    size: 14,
                  ),
                  SizedBox(width: 5),
                  Text(
                    'தமிழ்நாடு · Focus TN',
                    style: TextStyle(
                      fontFamily: 'NotoSansTamil',
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),

        // Journeys Button (Optional)
        if (onOpenJourneys != null) ...[
          _buildCircleButton(
            icon: Icons.explore_rounded,
            color: AppColors.amberLight,
            tooltip: 'வரலாற்றுப் பயணங்கள் · Journeys',
            onTap: onOpenJourneys!,
          ),
          const SizedBox(height: 8),
        ],

        // Recenter + Zoom In/Out compact pill
        Container(
          decoration: BoxDecoration(
            color: const Color(0xF20F172A),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: Colors.white.withValues(alpha: 0.12),
              width: 1.0,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.45),
                blurRadius: 10,
                offset: const Offset(0, 3),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Recenter India
              IconButton(
                icon: const Icon(
                  Icons.public_rounded,
                  color: AppColors.skyLight,
                  size: 19,
                ),
                tooltip: 'முழு இந்தியா · Recenter India',
                constraints: const BoxConstraints(minWidth: 38, minHeight: 38),
                padding: EdgeInsets.zero,
                onPressed: onRecenterIndia,
              ),
              Container(
                height: 1,
                width: 22,
                color: Colors.white.withValues(alpha: 0.1),
              ),
              // Zoom In
              IconButton(
                icon: const Icon(
                  Icons.add_rounded,
                  color: AppColors.textPrimary,
                  size: 20,
                ),
                tooltip: 'அருகில் காண்க · Zoom In',
                constraints: const BoxConstraints(minWidth: 38, minHeight: 38),
                padding: EdgeInsets.zero,
                onPressed: onZoomIn,
              ),
              Container(
                height: 1,
                width: 22,
                color: Colors.white.withValues(alpha: 0.1),
              ),
              // Zoom Out
              IconButton(
                icon: const Icon(
                  Icons.remove_rounded,
                  color: AppColors.textPrimary,
                  size: 20,
                ),
                tooltip: 'தொலைவில் காண்க · Zoom Out',
                constraints: const BoxConstraints(minWidth: 38, minHeight: 38),
                padding: EdgeInsets.zero,
                onPressed: onZoomOut,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCircleButton({
    required IconData icon,
    required Color color,
    required String tooltip,
    required VoidCallback onTap,
  }) {
    return Container(
      width: 38,
      height: 38,
      decoration: BoxDecoration(
        color: const Color(0xF20F172A),
        shape: BoxShape.circle,
        border: Border.all(
          color: color.withValues(alpha: 0.6),
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.4),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: IconButton(
        icon: Icon(icon, color: color, size: 18),
        tooltip: tooltip,
        padding: EdgeInsets.zero,
        onPressed: onTap,
      ),
    );
  }
}
