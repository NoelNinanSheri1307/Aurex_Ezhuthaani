import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../../../data/models/cultural_item_model.dart';

/// Represents an Indian state/UT administrative boundary polygon.
class IndiaMapFeature {
  final String name;
  final bool isTamilNadu;
  final List<List<LatLng>> polygons;
  final LatLng center;
  final LatLngBounds bounds;

  const IndiaMapFeature({
    required this.name,
    required this.isTamilNadu,
    required this.polygons,
    required this.center,
    required this.bounds,
  });
}

/// Represents a clustered group of heritage sites for a geographic region.
class HeritageCluster {
  final String id;
  final String titleEn;
  final String titleTa;
  final LatLng center;
  final List<CulturalItemModel> items;

  const HeritageCluster({
    required this.id,
    required this.titleEn,
    required this.titleTa,
    required this.center,
    required this.items,
  });

  int get count => items.length;
}

enum MarkerPriority {
  primary,
  secondary,
  tertiary,
}
