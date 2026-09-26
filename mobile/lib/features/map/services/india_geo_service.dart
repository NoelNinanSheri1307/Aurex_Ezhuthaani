import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../data/india_states_geojson.dart';
import '../models/india_map_feature.dart';

class IndiaGeoService {
  static List<IndiaMapFeature>? _cachedFeatures;

  /// Loads and parses the India states GeoJSON bundled in assets.
  static Future<List<IndiaMapFeature>> loadIndiaFeatures() async {
    if (_cachedFeatures != null && _cachedFeatures!.isNotEmpty) {
      return _cachedFeatures!;
    }

    try {
      String jsonString = kIndiaStatesGeoJson;
      if (jsonString.isEmpty) {
        try {
          jsonString = await rootBundle.loadString('assets/data/india_states.geojson');
        } catch (_) {}
      }
      final data = json.decode(jsonString) as Map<String, dynamic>;
      final featuresList = data['features'] as List<dynamic>? ?? [];

      final List<IndiaMapFeature> result = [];

      for (final feat in featuresList) {
        final properties = feat['properties'] as Map<String, dynamic>? ?? {};
        final name = (properties['st_nm'] as String? ?? 'Unknown').trim();
        final geometry = feat['geometry'] as Map<String, dynamic>? ?? {};
        final geomType = geometry['type'] as String? ?? '';
        final coords = geometry['coordinates'] as List<dynamic>? ?? [];

        final List<List<LatLng>> rings = [];
        double minLat = 90.0, maxLat = -90.0;
        double minLng = 180.0, maxLng = -180.0;
        double sumLat = 0.0, sumLng = 0.0;
        int totalPoints = 0;

        void processRing(List<dynamic> ringCoords) {
          final List<LatLng> ring = [];
          for (final pt in ringCoords) {
            if (pt is List && pt.length >= 2) {
              final lng = (pt[0] as num).toDouble();
              final lat = (pt[1] as num).toDouble();
              ring.add(LatLng(lat, lng));

              if (lat < minLat) minLat = lat;
              if (lat > maxLat) maxLat = lat;
              if (lng < minLng) minLng = lng;
              if (lng > maxLng) maxLng = lng;

              sumLat += lat;
              sumLng += lng;
              totalPoints++;
            }
          }
          if (ring.isNotEmpty) {
            rings.add(ring);
          }
        }

        if (geomType == 'Polygon') {
          for (final ringCoords in coords) {
            if (ringCoords is List) {
              processRing(ringCoords);
            }
          }
        } else if (geomType == 'MultiPolygon') {
          for (final polyCoords in coords) {
            if (polyCoords is List) {
              for (final ringCoords in polyCoords) {
                if (ringCoords is List) {
                  processRing(ringCoords);
                }
              }
            }
          }
        }

        if (rings.isNotEmpty && totalPoints > 0) {
          final center = LatLng(sumLat / totalPoints, sumLng / totalPoints);
          final bounds = LatLngBounds(
            LatLng(minLat, minLng),
            LatLng(maxLat, maxLng),
          );

          final isTamilNadu = name.toLowerCase().contains('tamil nadu');

          result.add(
            IndiaMapFeature(
              name: name,
              isTamilNadu: isTamilNadu,
              polygons: rings,
              center: center,
              bounds: bounds,
            ),
          );
        }
      }

      _cachedFeatures = result;
      return result;
    } catch (e) {
      // In case of error, return empty list
      return [];
    }
  }
}
