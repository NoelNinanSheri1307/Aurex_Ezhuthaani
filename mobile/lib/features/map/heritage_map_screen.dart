import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:latlong2/latlong.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/cultural_item_model.dart';

import 'models/india_map_feature.dart';
import 'services/india_geo_service.dart';
import 'services/heritage_clustering_service.dart';
import 'widgets/heritage_cluster_marker_widget.dart';
import 'widgets/heritage_discovery_panel.dart';
import 'widgets/heritage_journey_selector.dart';
import 'widgets/heritage_location_preview_sheet.dart';
import 'widgets/heritage_map_controls.dart';
import 'widgets/heritage_marker_widget.dart';

class HeritageMapScreen extends ConsumerStatefulWidget {
  const HeritageMapScreen({super.key});

  @override
  ConsumerState<HeritageMapScreen> createState() => _HeritageMapScreenState();
}

class _HeritageMapScreenState extends ConsumerState<HeritageMapScreen>
    with TickerProviderStateMixin {
  final MapController _mapController = MapController();
  AnimationController? _cameraAnimController;

  // Geographic bounds for full India mainland + islands
  static final LatLngBounds _kIndiaBounds = LatLngBounds(
    const LatLng(6.5, 68.0),
    const LatLng(37.5, 97.5),
  );
  static const LatLng _kIndiaCenter = LatLng(21.8, 82.5);
  static const double _kIndiaZoom = 4.3;

  // Geographic bounds for Tamil Nadu focus
  static const LatLng _kTamilNaduCenter = LatLng(10.85, 78.65);
  static const double _kTamilNaduZoom = 7.1;

  // State data
  List<IndiaMapFeature> _indiaFeatures = [];
  List<CulturalItemModel> _allLocations = [];
  List<CulturalItemModel> _filteredLocations = [];
  Set<String> _discoveredSlugs = {};
  CulturalItemModel? _selectedLocation;
  String? _selectedStateName;

  bool _isLoading = true;
  String? _error;
  String _selectedCategory = 'All';
  HeritageJourney? _activeJourney;
  double _currentZoom = _kIndiaZoom;

  // Milestone monuments
  static const Set<String> _featuredSlugs = {
    'brihadisvara-temple',
    'raja-raja-chola-brihadisvara',
    'madurai-meenakshi-temple',
    'mamallapuram-monuments',
    'pallava-rock-cut-architecture',
    'keezhadi-inscribed-potsherds',
    'keezhadi-vaigai-urban-inscribed-potsherds',
    'thiruvalluvar-statue',
    'thiruvalluvar-the-thirukkural',
    'gangaikondacholapuram-inscription',
    'gangaikondacholapuram-rajendra-chola-i-victory-prasasti',
    'uttiramerur-kudavolai-inscription',
  };

  @override
  void initState() {
    super.initState();
    _loadDiscoveredState();
    _loadMapAndHeritageData();
  }

  @override
  void dispose() {
    _cameraAnimController?.dispose();
    _mapController.dispose();
    super.dispose();
  }

  Future<void> _loadDiscoveredState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final saved = prefs.getStringList('discovered_heritage_slugs') ?? [];
      if (mounted) {
        setState(() {
          _discoveredSlugs = saved.toSet();
        });
      }
    } catch (_) {}
  }

  Future<void> _saveDiscovered(String slug) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _discoveredSlugs.add(slug);
      await prefs.setStringList('discovered_heritage_slugs', _discoveredSlugs.toList());
      if (mounted) {
        setState(() {});
      }
    } catch (_) {}
  }

  Future<void> _loadMapAndHeritageData() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      // Load both India vector boundaries and 41 heritage locations in parallel
      final geoFuture = IndiaGeoService.loadIndiaFeatures();
      final repo = ref.read(contentRepositoryProvider);
      final itemsFuture = repo.getMapLocations();

      final results = await Future.wait([geoFuture, itemsFuture]);
      final features = results[0] as List<IndiaMapFeature>;
      final items = results[1] as List<CulturalItemModel>;

      if (mounted) {
        setState(() {
          _indiaFeatures = features;
          _allLocations = items.where((i) => i.latitude != null && i.longitude != null).toList();
          _applyFilters();
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  void _applyFilters() {
    if (_selectedCategory == 'All') {
      _filteredLocations = List.from(_allLocations);
    } else {
      _filteredLocations = _allLocations.where((loc) {
        final cat = loc.category.toLowerCase();
        final type = loc.contentType.toLowerCase();
        final sel = _selectedCategory.toLowerCase();

        if (sel == 'architecture') {
          return cat.contains('architecture') || type.contains('architecture');
        } else if (sel == 'inscriptions') {
          return cat.contains('inscription') || type.contains('inscription');
        } else if (sel == 'history') {
          return cat.contains('history') || type.contains('history');
        } else if (sel == 'temples') {
          return cat.contains('temple') || cat.contains('place') || type.contains('place');
        } else if (sel == 'arts') {
          return cat.contains('art') || type.contains('art') || cat.contains('festival');
        } else if (sel == 'traditions') {
          return cat.contains('tradition') || cat.contains('language') || cat.contains('people');
        } else if (sel == 'food') {
          return cat.contains('food') || type.contains('food');
        }
        return cat.contains(sel) || type.contains(sel);
      }).toList();
    }
  }

  void _onCategorySelected(String category) {
    setState(() {
      _selectedCategory = category;
      _activeJourney = null;
      _applyFilters();
    });
  }

  void _onJourneySelected(HeritageJourney journey) {
    setState(() {
      _activeJourney = journey;
      _selectedCategory = 'All';
      _applyFilters();
    });

    _animateCameraTo(journey.center, 7.8);
  }

  void _animateCameraTo(LatLng targetCenter, double targetZoom) {
    _cameraAnimController?.dispose();

    final LatLng startCenter = _mapController.camera.center;
    final double startZoom = _mapController.camera.zoom;

    _cameraAnimController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 550),
    );

    final curved = CurvedAnimation(
      parent: _cameraAnimController!,
      curve: Curves.easeInOutCubic,
    );

    final latTween = Tween<double>(begin: startCenter.latitude, end: targetCenter.latitude);
    final lngTween = Tween<double>(begin: startCenter.longitude, end: targetCenter.longitude);
    final zoomTween = Tween<double>(begin: startZoom, end: targetZoom);

    _cameraAnimController!.addListener(() {
      final t = curved.value;
      _mapController.move(
        LatLng(latTween.transform(t), lngTween.transform(t)),
        zoomTween.transform(t),
      );
    });

    _cameraAnimController!.forward();
  }

  void _focusTamilNadu() {
    setState(() {
      _selectedStateName = 'Tamil Nadu';
    });
    _animateCameraTo(_kTamilNaduCenter, _kTamilNaduZoom);
  }

  void _recenterIndia() {
    setState(() {
      _selectedLocation = null;
      _activeJourney = null;
      _selectedStateName = null;
    });
    _animateCameraTo(_kIndiaCenter, _kIndiaZoom);
  }

  void _zoomIn() {
    final currentZoom = _mapController.camera.zoom;
    if (currentZoom < 13.5) {
      _animateCameraTo(_mapController.camera.center, (currentZoom + 1.2).clamp(3.5, 14.0));
    }
  }

  void _zoomOut() {
    final currentZoom = _mapController.camera.zoom;
    if (currentZoom > 3.6) {
      _animateCameraTo(_mapController.camera.center, (currentZoom - 1.2).clamp(3.5, 14.0));
    }
  }

  void _selectMarker(CulturalItemModel loc) {
    setState(() {
      _selectedLocation = loc;
    });

    _animateCameraTo(LatLng(loc.latitude!, loc.longitude!), 9.2);

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (ctx) {
        return HeritageLocationPreviewSheet(
          item: loc,
          isDiscovered: _discoveredSlugs.contains(loc.slug),
          onDiscover: () {
            Navigator.pop(ctx);
            _handleDiscoverLocation(loc);
          },
          onClose: () {
            Navigator.pop(ctx);
            setState(() => _selectedLocation = null);
          },
        );
      },
    ).whenComplete(() {
      if (mounted) {
        setState(() => _selectedLocation = null);
      }
    });
  }

  void _handleDiscoverLocation(CulturalItemModel loc) {
    _saveDiscovered(loc.slug);
    _showCelebrationDialog(loc);
  }

  void _showCelebrationDialog(CulturalItemModel loc) {
    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: Colors.transparent,
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(28),
            border: Border.all(color: AppColors.amber.withValues(alpha: 0.6), width: 1.5),
            boxShadow: [
              BoxShadow(
                color: AppColors.amber.withValues(alpha: 0.35),
                blurRadius: 30,
                spreadRadius: 2,
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 68,
                height: 68,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.amber.withValues(alpha: 0.2),
                  border: Border.all(color: AppColors.amber, width: 2),
                ),
                child: const Icon(
                  Icons.auto_awesome_rounded,
                  size: 36,
                  color: AppColors.amberLight,
                ),
              ),
              const SizedBox(height: 14),
              const Text(
                'மரபுச் சின்னம் கண்டறியப்பட்டது!',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: 'NotoSansTamil',
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'New Heritage Site Discovered!',
                style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.surfaceElevated,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    Text(
                      loc.titleTa,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontFamily: 'NotoSansTamil',
                        color: AppColors.amberLight,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      loc.titleEn,
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.emerald.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.emeraldLight),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.bolt, color: AppColors.emeraldLight, size: 20),
                    SizedBox(width: 4),
                    Text(
                      '+25 XP Earned',
                      style: TextStyle(
                        color: AppColors.emeraldLight,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () => Navigator.pop(ctx),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.amber,
                  foregroundColor: Colors.black,
                  minimumSize: const Size.fromHeight(44),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: const Text('தொடர்க · Continue', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final discoveredCount = _discoveredSlugs.length;
    final totalCount = _allLocations.isNotEmpty ? _allLocations.length : 41;
    final progressFraction = totalCount > 0 ? (discoveredCount / totalCount).clamp(0.0, 1.0) : 0.0;

    return Scaffold(
      backgroundColor: const Color(0xFF090E18),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return Stack(
            children: [
              // 1. PROFESSIONAL GEOGRAPHIC VECTOR MAP (FLUTTER_MAP)
              if (_isLoading)
                _buildLoadingRadarView()
              else if (_error != null)
                ErrorView(message: _error!, onRetry: _loadMapAndHeritageData)
              else
                SizedBox.expand(
                  child: FlutterMap(
                    mapController: _mapController,
                    options: MapOptions(
                      initialCenter: _kIndiaCenter,
                      initialZoom: _kIndiaZoom,
                      minZoom: 3.5,
                      maxZoom: 14.0,
                      initialCameraFit: CameraFit.bounds(
                        bounds: _kIndiaBounds,
                        padding: const EdgeInsets.only(top: 80, bottom: 90, left: 20, right: 20),
                      ),
                      onPositionChanged: (camera, hasGesture) {
                        if ((_currentZoom - camera.zoom).abs() > 0.15) {
                          setState(() {
                            _currentZoom = camera.zoom;
                          });
                        }
                      },
                      onMapReady: () {
                        _mapController.move(_kIndiaCenter, _kIndiaZoom);
                        setState(() {
                          _currentZoom = _kIndiaZoom;
                        });
                      },
                      interactionOptions: const InteractionOptions(
                        flags: InteractiveFlag.all,
                      ),
                    ),
                    children: [
                      // Vector Polygon Boundaries for India States
                      PolygonLayer(
                        polygons: _buildIndiaPolygons(),
                      ),

                      // Restrained, Zoom-Dependent Markers & Clusters
                      MarkerLayer(
                        markers: _buildZoomDependentMarkers(),
                      ),
                    ],
                  ),
                ),

              // 2. MAP OVERLAY: Subtle ocean geographic labels for Atlas feel
              if (!_isLoading && _error == null && _currentZoom < 6.0)
                _buildAtlasGeographicDecorations(),

              // 3. TOP FLOATING APP BAR & CATEGORY FILTER CHIPS
              SafeArea(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _buildHeaderBar(discoveredCount, totalCount, progressFraction),
                    const SizedBox(height: 6),
                    _buildCategoryFilterBar(),
                    if (_activeJourney != null) _buildActiveJourneyBanner(),
                  ],
                ),
              ),

              // 4. FLOATING MAP ACTION BUTTONS (Focus TN, Recenter, Zoom + / -)
              Positioned(
                right: 14,
                bottom: 80,
                child: HeritageMapControls(
                  onFocusTamilNadu: _focusTamilNadu,
                  onRecenterIndia: _recenterIndia,
                  onZoomIn: _zoomIn,
                  onZoomOut: _zoomOut,
                  onOpenJourneys: () => HeritageJourneySelectorSheet.show(
                    context,
                    activeJourneyId: _activeJourney?.id,
                    onSelectJourney: _onJourneySelected,
                  ),
                ),
              ),

              // 5. COLLAPSIBLE BOTTOM DISCOVERY PANEL (Non-obstructive)
              if (!_isLoading && _error == null)
                Positioned(
                  left: 0,
                  right: 0,
                  bottom: 0,
                  child: HeritageDiscoveryPanel(
                    discoveredCount: discoveredCount,
                    totalCount: totalCount,
                    allLocations: _allLocations,
                    discoveredSlugs: _discoveredSlugs,
                    onSelectLocation: _selectMarker,
                    onSelectCategory: _onCategorySelected,
                  ),
                ),
            ],
          );
        },
      ),
    );
  }

  /// Builds state boundaries with distinguished Tamil Nadu cultural highlight
  List<Polygon> _buildIndiaPolygons() {
    final List<Polygon> list = [];

    for (final feature in _indiaFeatures) {
      final isTN = feature.isTamilNadu;
      final isSel = _selectedStateName != null &&
          _selectedStateName!.toLowerCase() == feature.name.toLowerCase();

      // Stylized visual styling for Educational Atlas
      final Color fillColor;
      final Color borderColor;
      final double strokeWidth;

      if (isTN) {
        // Tamil Nadu: slightly warmer slate fill + warm gold outline
        fillColor = const Color(0xFF202C40);
        borderColor = const Color(0xFFFBBF24);
        strokeWidth = 2.2;
      } else if (isSel) {
        fillColor = const Color(0xFF1E3A5F);
        borderColor = AppColors.skyLight;
        strokeWidth = 1.6;
      } else {
        // Other Indian states: dark slate fill + clear contrast border
        fillColor = const Color(0xFF131D2E);
        borderColor = const Color(0xFF2D3F59);
        strokeWidth = 1.0;
      }

      for (final ring in feature.polygons) {
        list.add(
          Polygon(
            points: ring,
            color: fillColor,
            borderColor: borderColor,
            borderStrokeWidth: strokeWidth,
          ),
        );
      }
    }

    return list;
  }

  /// Zoom-dependent information hierarchy as requested by User Prompt:
  /// Level 1 (< 5.8): Full India Overview with a single prominent Tamil Nadu Cultural Focus Badge
  /// Level 2 (5.8 to 7.0): South India with 5 regional cluster markers (no overlapping pins)
  /// Level 3 (7.0 to 8.5): Tamil Nadu with Primary iconic monuments + regional clusters
  /// Level 4 (>= 8.5): All 41 individual heritage pins with category icons and clean labels
  List<Marker> _buildZoomDependentMarkers() {
    final List<Marker> markers = [];

    // LEVEL 1: INDIA OVERVIEW (< 5.8)
    if (_currentZoom < 5.8) {
      // 1. Single prominent Tamil Nadu Cultural Atlas Badge (Center of TN)
      markers.add(
        Marker(
          point: _kTamilNaduCenter,
          width: 205,
          height: 64,
          alignment: Alignment.center,
          child: GestureDetector(
            onTap: _focusTamilNadu,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: const Color(0xF20F172A),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: AppColors.amber.withValues(alpha: 0.9),
                  width: 1.5,
                ),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.amber.withValues(alpha: 0.3),
                    blurRadius: 10,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 28,
                    height: 28,
                    decoration: BoxDecoration(
                      color: AppColors.amber.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.account_balance_rounded,
                      size: 15,
                      color: AppColors.amberLight,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text(
                          'தமிழ்நாடு · Tamil Nadu',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontFamily: 'NotoSansTamil',
                            color: Colors.white,
                            fontSize: 10.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          '${_allLocations.length} Heritage Sites · தொட்டுக் காண்க',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontFamily: 'NotoSansTamil',
                            color: AppColors.amberLight,
                            fontSize: 9,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(
                    Icons.arrow_forward_ios_rounded,
                    size: 11,
                    color: AppColors.amberLight,
                  ),
                ],
              ),
            ),
          ),
        ),
      );

      return markers;
    }

    // LEVEL 2: SOUTH INDIA ZOOM (5.8 to 7.0)
    if (_currentZoom < 7.0) {
      final clusters = HeritageClusteringService.buildRegionalClusters(_filteredLocations);
      for (final cluster in clusters) {
        markers.add(
          Marker(
            point: cluster.center,
            width: 84,
            height: 64,
            alignment: Alignment.center,
            child: HeritageClusterMarkerWidget(
              cluster: cluster,
              onTap: () => _animateCameraTo(cluster.center, 8.6),
            ),
          ),
        );
      }
      return markers;
    }

    // LEVEL 3: TAMIL NADU ZOOM (7.0 to 8.5)
    if (_currentZoom < 8.5) {
      // Show PRIMARY sites individually + regional clusters for the rest
      for (final loc in _filteredLocations) {
        final priority = HeritageClusteringService.getPriority(loc);
        final isSel = _selectedLocation?.slug == loc.slug;
        final isDisc = _discoveredSlugs.contains(loc.slug);
        final isFeat = _featuredSlugs.contains(loc.slug);

        if (priority == MarkerPriority.primary || isSel) {
          markers.add(
            Marker(
              point: LatLng(loc.latitude!, loc.longitude!),
              width: 84,
              height: 64,
              alignment: Alignment.center,
              child: HeritageMarkerWidget(
                item: loc,
                isDiscovered: isDisc,
                isSelected: isSel,
                isFeatured: isFeat,
                showLabel: isSel || isFeat,
                onTap: () => _selectMarker(loc),
              ),
            ),
          );
        }
      }

      // Also render regional cluster badges for the remaining sites
      final clusters = HeritageClusteringService.buildRegionalClusters(
        _filteredLocations.where((l) => HeritageClusteringService.getPriority(l) != MarkerPriority.primary).toList(),
      );
      for (final cluster in clusters) {
        if (cluster.count > 0) {
          markers.add(
            Marker(
              point: cluster.center,
              width: 84,
              height: 64,
              alignment: Alignment.center,
              child: HeritageClusterMarkerWidget(
                cluster: cluster,
                onTap: () => _animateCameraTo(cluster.center, 9.2),
              ),
            ),
          );
        }
      }
      return markers;
    }

    // LEVEL 4: HERITAGE SITE DETAIL LEVEL (>= 8.5)
    for (final loc in _filteredLocations) {
      final isSel = _selectedLocation?.slug == loc.slug;
      final isDisc = _discoveredSlugs.contains(loc.slug);
      final isFeat = _featuredSlugs.contains(loc.slug);

      markers.add(
        Marker(
          point: LatLng(loc.latitude!, loc.longitude!),
          width: 84,
          height: 64,
          alignment: Alignment.center,
          child: HeritageMarkerWidget(
            item: loc,
            isDiscovered: isDisc,
            isSelected: isSel,
            isFeatured: isFeat,
            showLabel: true,
            onTap: () => _selectMarker(loc),
          ),
        ),
      );
    }

    return markers;
  }

  /// Subtle ocean watermark labels at low zoom
  Widget _buildAtlasGeographicDecorations() {
    return IgnorePointer(
      child: Stack(
        children: [
          Positioned(
            left: 30,
            bottom: 220,
            child: Text(
              'ARABIAN SEA',
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.14),
                letterSpacing: 3.5,
                fontSize: 10,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Positioned(
            right: 35,
            bottom: 250,
            child: Text(
              'BAY OF BENGAL',
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.14),
                letterSpacing: 3.5,
                fontSize: 10,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 120,
            child: Center(
              child: Text(
                'INDIAN OCEAN',
                style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.12),
                  letterSpacing: 4.5,
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeaderBar(int discoveredCount, int totalCount, double progressFraction) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 14, vertical: 2),
      child: GlassCard(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        borderRadius: 18,
        backgroundColor: const Color(0xEB0F172A),
        child: Row(
          children: [
            // Back button
            IconButton(
              icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 17),
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
              onPressed: () => context.pop(),
            ),
            const SizedBox(width: 8),

            // Title
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'மரபு வரைபடம்',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontFamily: 'NotoSansTamil',
                      color: AppColors.textPrimary,
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Tamil Cultural Atlas · India Context',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: AppTypography.caption.copyWith(color: AppColors.textSecondary, fontSize: 10),
                  ),
                ],
              ),
            ),

            // Compact Discovery Progress Pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.amber.withValues(alpha: 0.4)),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.emoji_events_rounded, color: AppColors.amberLight, size: 14),
                  const SizedBox(width: 5),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        '$discoveredCount / $totalCount',
                        style: const TextStyle(
                          color: AppColors.amberLight,
                          fontWeight: FontWeight.bold,
                          fontSize: 10.5,
                        ),
                      ),
                      Container(
                        width: 38,
                        height: 2.5,
                        margin: const EdgeInsets.only(top: 2),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceLight,
                          borderRadius: BorderRadius.circular(2),
                        ),
                        child: FractionallySizedBox(
                          alignment: Alignment.centerLeft,
                          widthFactor: progressFraction,
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppColors.amberLight,
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryFilterBar() {
    final categories = [
      {'key': 'All', 'labelTa': 'அனைத்தும்', 'labelEn': 'All'},
      {'key': 'temples', 'labelTa': 'திருத்தலங்கள்', 'labelEn': 'Temples'},
      {'key': 'inscriptions', 'labelTa': 'கல்வெட்டுகள்', 'labelEn': 'Inscriptions'},
      {'key': 'architecture', 'labelTa': 'கட்டிடக்கலை', 'labelEn': 'Architecture'},
      {'key': 'history', 'labelTa': 'வரலாறு', 'labelEn': 'History'},
      {'key': 'arts', 'labelTa': 'கலை', 'labelEn': 'Arts'},
      {'key': 'traditions', 'labelTa': 'மரபு', 'labelEn': 'Traditions'},
      {'key': 'food', 'labelTa': 'உணவு', 'labelEn': 'Food'},
    ];

    return SizedBox(
      height: 32,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 14),
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        separatorBuilder: (_, _) => const SizedBox(width: 6),
        itemBuilder: (context, index) {
          final cat = categories[index];
          final isSelected = _selectedCategory == cat['key'];

          return GestureDetector(
            onTap: () => _onCategorySelected(cat['key']!),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: isSelected
                    ? AppColors.amber
                    : const Color(0xEB0F172A),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: isSelected ? AppColors.amberLight : AppColors.border,
                  width: isSelected ? 1.4 : 1.0,
                ),
                boxShadow: isSelected
                    ? [
                        BoxShadow(
                          color: AppColors.amber.withValues(alpha: 0.35),
                          blurRadius: 6,
                          offset: const Offset(0, 2),
                        ),
                      ]
                    : null,
              ),
              child: Text(
                '${cat['labelTa']!} · ${cat['labelEn']!}',
                style: TextStyle(
                  fontFamily: 'NotoSansTamil',
                  color: isSelected ? Colors.black : AppColors.textSecondary,
                  fontSize: 10.5,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildActiveJourneyBanner() {
    return Container(
      margin: const EdgeInsets.fromLTRB(14, 6, 14, 0),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: _activeJourney!.color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: _activeJourney!.color.withValues(alpha: 0.5)),
      ),
      child: Row(
        children: [
          Icon(_activeJourney!.icon, size: 16, color: _activeJourney!.color),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  _activeJourney!.titleTa,
                  style: const TextStyle(
                    fontFamily: 'NotoSansTamil',
                    color: AppColors.textPrimary,
                    fontWeight: FontWeight.bold,
                    fontSize: 11.5,
                  ),
                ),
                Text(
                  _activeJourney!.subtitle,
                  style: TextStyle(color: _activeJourney!.color, fontSize: 9.5),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.close, size: 15, color: AppColors.textMuted),
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            onPressed: () {
              setState(() => _activeJourney = null);
              _recenterIndia();
            },
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingRadarView() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.amber.withValues(alpha: 0.1),
              border: Border.all(color: AppColors.amber.withValues(alpha: 0.4), width: 2),
            ),
            child: const Center(
              child: SizedBox(
                width: 38,
                height: 38,
                child: CircularProgressIndicator(
                  strokeWidth: 2.8,
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.amberLight),
                ),
              ),
            ),
          ),
          const SizedBox(height: 18),
          const Text(
            'இந்திய & தமிழக மரபு வரைபடம் தயாராகிறது...',
            style: TextStyle(
              fontFamily: 'NotoSansTamil',
              color: AppColors.textPrimary,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Loading India & Tamil Nadu Cultural Atlas',
            style: AppTypography.caption.copyWith(color: AppColors.textSecondary, fontSize: 11),
          ),
        ],
      ),
    );
  }
}
