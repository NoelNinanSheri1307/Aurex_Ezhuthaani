import 'package:latlong2/latlong.dart';
import '../../../data/models/cultural_item_model.dart';
import '../models/india_map_feature.dart';

class HeritageClusteringService {
  // Iconic monuments that define world-renowned Tamil heritage
  static const Set<String> primarySlugs = {
    'brihadisvara-temple',
    'raja-raja-chola-brihadisvara',
    'madurai-meenakshi-temple',
    'mamallapuram-monuments',
    'pallava-rock-cut-architecture',
    'keezhadi-inscribed-potsherds',
    'keezhadi-vaigai-urban-inscribed-potsherds',
    'thiruvalluvar-statue',
    'thiruvalluvar-statue-kanyakumari',
    'thiruvalluvar-the-thirukkural',
    'gangaikondacholapuram-inscription',
    'gangaikondacholapuram-rajendra-chola-i-victory-prasasti',
    'uttiramerur-kudavolai-inscription',
    'srirangam-temple',
    'srirangam-maravarman-sundara-pandya-i-copper-plates',
  };

  static MarkerPriority getPriority(CulturalItemModel item) {
    if (primarySlugs.contains(item.slug.toLowerCase())) {
      return MarkerPriority.primary;
    }
    final cat = item.category.toLowerCase();
    if (cat.contains('architecture') || cat.contains('inscription') || cat.contains('places')) {
      return MarkerPriority.secondary;
    }
    return MarkerPriority.tertiary;
  }

  /// Groups locations into 5 distinct geographic regions for clean zoom levels.
  static List<HeritageCluster> buildRegionalClusters(List<CulturalItemModel> items) {
    final Map<String, List<CulturalItemModel>> regionalBuckets = {
      'chennai': [],
      'thanjavur': [],
      'madurai': [],
      'trichy': [],
      'south': [],
    };

    for (final item in items) {
      if (item.latitude == null || item.longitude == null) continue;
      final lat = item.latitude!;
      final lng = item.longitude!;

      if (lat >= 12.2) {
        regionalBuckets['chennai']!.add(item);
      } else if (lat >= 10.4 && lat <= 12.0 && lng >= 78.8) {
        regionalBuckets['thanjavur']!.add(item);
      } else if (lat >= 10.4 && lat <= 12.0 && lng < 78.8) {
        regionalBuckets['trichy']!.add(item);
      } else if (lat >= 9.2 && lat < 10.4) {
        regionalBuckets['madurai']!.add(item);
      } else {
        regionalBuckets['south']!.add(item);
      }
    }

    final List<HeritageCluster> clusters = [];

    void addCluster(String id, String titleEn, String titleTa, LatLng fallbackCenter, List<CulturalItemModel> bucket) {
      if (bucket.isEmpty) return;
      double sumLat = 0, sumLng = 0;
      for (final item in bucket) {
        sumLat += item.latitude!;
        sumLng += item.longitude!;
      }
      final center = LatLng(sumLat / bucket.length, sumLng / bucket.length);
      clusters.add(
        HeritageCluster(
          id: id,
          titleEn: titleEn,
          titleTa: titleTa,
          center: center,
          items: bucket,
        ),
      );
    }

    addCluster('chennai', 'Chennai & Pallava Coast', 'சென்னை & தொண்டைமண்டலம்', const LatLng(12.98, 80.22), regionalBuckets['chennai']!);
    addCluster('thanjavur', 'Thanjavur & Chola Delta', 'தஞ்சாவூர் & சோழ மண்டலம்', const LatLng(10.82, 79.20), regionalBuckets['thanjavur']!);
    addCluster('madurai', 'Madurai & Pandyan Land', 'மதுரை & பாண்டிய நாடு', const LatLng(9.92, 78.14), regionalBuckets['madurai']!);
    addCluster('trichy', 'Tiruchirappalli & Central', 'திருச்சிராப்பள்ளி & நடுநாடு', const LatLng(10.84, 78.68), regionalBuckets['trichy']!);
    addCluster('south', 'Tirunelveli & Deep South', 'திருநெல்வேலி & தென் தமிழகம்', const LatLng(8.65, 77.65), regionalBuckets['south']!);

    return clusters;
  }
}
