import 'package:flutter/material.dart';
import 'package:latlong2/latlong.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';

class HeritageJourney {
  final String id;
  final String titleTa;
  final String titleEn;
  final String subtitle;
  final LatLng center;
  final double zoom;
  final IconData icon;
  final Color color;

  const HeritageJourney({
    required this.id,
    required this.titleTa,
    required this.titleEn,
    required this.subtitle,
    required this.center,
    required this.zoom,
    required this.icon,
    required this.color,
  });
}

final List<HeritageJourney> kHeritageJourneys = [
  const HeritageJourney(
    id: 'chola_delta',
    titleTa: 'சோழ நாடு & காவிரி டெல்டா',
    titleEn: 'Chola Heartland & Kaveri Delta',
    subtitle: 'தஞ்சை, கங்கைகொண்ட சோழபுரம், பூம்புகார்',
    center: LatLng(10.7870, 79.1378),
    zoom: 8.8,
    icon: Icons.account_balance_rounded,
    color: Color(0xFFF59E0B),
  ),
  const HeritageJourney(
    id: 'pandya_sangam',
    titleTa: 'பாண்டிய நாடு & சங்க இலக்கியம்',
    titleEn: 'Pandya Realm & Sangam Madurai',
    subtitle: 'மதுரை, கீழடி, மாங்குளம் கல்வெட்டுகள்',
    center: LatLng(9.9195, 78.1193),
    zoom: 9.2,
    icon: Icons.auto_stories_rounded,
    color: Color(0xFF10B981),
  ),
  const HeritageJourney(
    id: 'pallava_coast',
    titleTa: 'தொண்டை நாடு & பல்லவக் கடற்கரை',
    titleEn: 'Pallava Shore & Tondai Nadu',
    subtitle: 'மாமல்லபுரம், உத்திரமேரூர் குடவோலை',
    center: LatLng(12.6269, 80.1927),
    zoom: 9.0,
    icon: Icons.waves_rounded,
    color: Color(0xFF38BDF8),
  ),
  const HeritageJourney(
    id: 'kongu_trade',
    titleTa: 'கொங்கு நாடு & வணிகப் பெருவழி',
    titleEn: 'Kongu Ancient Trade Routes',
    subtitle: 'கொடுமணல் மணி வணிகம் & நொய்யல்',
    center: LatLng(11.1075, 77.5878),
    zoom: 9.2,
    icon: Icons.diamond_outlined,
    color: Color(0xFFA855F7),
  ),
  const HeritageJourney(
    id: 'southern_coast',
    titleTa: 'தென்பாண்டி & கன்னியாகுமரி',
    titleEn: 'Southern Heritage & Kanyakumari',
    subtitle: 'திருவள்ளுவர் சிலை, கட்டபொம்மன், நெல்லை',
    center: LatLng(8.7139, 77.7567),
    zoom: 8.8,
    icon: Icons.fort_rounded,
    color: Color(0xFFFB7185),
  ),
];

class HeritageJourneySelectorSheet extends StatelessWidget {
  final String? activeJourneyId;
  final ValueChanged<HeritageJourney> onSelectJourney;

  const HeritageJourneySelectorSheet({
    super.key,
    required this.activeJourneyId,
    required this.onSelectJourney,
  });

  static Future<void> show(
    BuildContext context, {
    required String? activeJourneyId,
    required ValueChanged<HeritageJourney> onSelectJourney,
  }) {
    return showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (ctx) => HeritageJourneySelectorSheet(
        activeJourneyId: activeJourneyId,
        onSelectJourney: (j) {
          Navigator.pop(ctx);
          onSelectJourney(j);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 30),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
        border: Border.all(color: AppColors.border, width: 1.2),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.6),
            blurRadius: 24,
            offset: const Offset(0, -6),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
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
            Row(
              children: [
                const Icon(Icons.explore_rounded, color: AppColors.amberLight, size: 24),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'வரலாற்றுப் பயணங்கள்',
                      style: AppTypography.tamilTitle.copyWith(fontSize: 18),
                    ),
                    Text(
                      'Tamil Regional Heritage Journeys',
                      style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            ...kHeritageJourneys.map((j) {
              final isSelected = activeJourneyId == j.id;
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                decoration: BoxDecoration(
                  color: isSelected
                      ? j.color.withValues(alpha: 0.15)
                      : AppColors.surfaceElevated.withValues(alpha: 0.6),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isSelected ? j.color : AppColors.border,
                    width: isSelected ? 1.8 : 1.0,
                  ),
                ),
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  leading: Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: j.color.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                      border: Border.all(color: j.color.withValues(alpha: 0.6)),
                    ),
                    child: Icon(j.icon, color: j.color, size: 22),
                  ),
                  title: Text(
                    j.titleTa,
                    style: const TextStyle(
                      fontFamily: 'NotoSansTamil',
                      color: AppColors.textPrimary,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        j.titleEn,
                        style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        j.subtitle,
                        style: TextStyle(
                          color: j.color.withValues(alpha: 0.85),
                          fontSize: 11,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                  trailing: Icon(
                    isSelected ? Icons.check_circle_rounded : Icons.chevron_right_rounded,
                    color: isSelected ? j.color : AppColors.textMuted,
                  ),
                  onTap: () => onSelectJourney(j),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
