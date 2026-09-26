import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/cultural_item_model.dart';

class SelectedCategoryNotifier extends Notifier<String> {
  @override
  String build() => 'Culture';

  void setCategory(String category) {
    state = category;
  }
}

final selectedCategoryProvider =
    NotifierProvider<SelectedCategoryNotifier, String>(SelectedCategoryNotifier.new);


class CultureExplorerScreen extends ConsumerStatefulWidget {
  const CultureExplorerScreen({super.key});

  @override
  ConsumerState<CultureExplorerScreen> createState() => _CultureExplorerScreenState();
}

class _CultureExplorerScreenState extends ConsumerState<CultureExplorerScreen> {
  final _searchController = TextEditingController();
  List<CulturalItemModel> _items = [];
  bool _isLoading = true;
  String? _error;

  final List<String> _categories = [
    'Culture',
    'History',
    'Literature',
    'Inscriptions',
    'Knowledge',
  ];

  String _getCategoryLabel(String cat) {
    switch (cat) {
      case 'Culture':
        return 'culture.cat_culture'.tr();
      case 'History':
        return 'culture.cat_history'.tr();
      case 'Literature':
        return 'culture.cat_literature'.tr();
      case 'Inscriptions':
        return 'culture.cat_inscriptions'.tr();
      case 'Knowledge':
        return 'culture.cat_knowledge'.tr();
      default:
        return cat;
    }
  }

  @override
  void initState() {
    super.initState();
    _fetchItems();
  }

  Future<void> _fetchItems() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    final repo = ref.read(contentRepositoryProvider);
    final category = ref.read(selectedCategoryProvider);
    final query = _searchController.text.trim();

    try {
      List<CulturalItemModel> res;
      switch (category) {
        case 'History':
          res = await repo.getHistoryItems(q: query.isNotEmpty ? query : null);
          break;
        case 'Literature':
          res = await repo.getLiteratureItems(q: query.isNotEmpty ? query : null);
          break;
        case 'Inscriptions':
          res = await repo.getInscriptions(q: query.isNotEmpty ? query : null);
          break;
        case 'Knowledge':
          res = await repo.getCultureItems(q: query.isNotEmpty ? query : null);
          break;
        case 'Culture':
        default:
          res = await repo.getCultureItems(q: query.isNotEmpty ? query : null);
      }
      if (mounted) {
        setState(() {
          _items = res;
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

  @override
  Widget build(BuildContext context) {
    final selectedCat = ref.watch(selectedCategoryProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('culture.title'.tr(), style: AppTypography.titleLarge),
        actions: [
          IconButton(
            icon: const Icon(Icons.map_rounded, color: AppColors.skyLight),
            onPressed: () => context.push('/map'),
            tooltip: 'culture.interactive_map'.tr(),
          ),
          IconButton(
            icon: const Icon(Icons.bookmark_border_rounded, color: AppColors.amberLight),
            onPressed: () => context.push('/saved'),
            tooltip: 'culture.saved_items'.tr(),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Input
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              child: TextField(
                controller: _searchController,
                style: AppTypography.bodyLarge,
                decoration: InputDecoration(
                  hintText: 'culture.search_hint'.tr(),
                  prefixIcon: const Icon(Icons.search_rounded, color: AppColors.textMuted),
                  suffixIcon: _searchController.text.isNotEmpty
                      ? IconButton(
                          icon: const Icon(Icons.clear_rounded, color: AppColors.textMuted),
                          onPressed: () {
                            _searchController.clear();
                            _fetchItems();
                          },
                        )
                      : null,
                ),
                onSubmitted: (_) => _fetchItems(),
              ),
            ),

            // Category Chips Selector
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              child: Row(
                children: _categories.map((cat) {
                  final isSelected = cat == selectedCat;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: ScaleOnPress(
                      onTap: () {
                        ref.read(selectedCategoryProvider.notifier).setCategory(cat);
                        _fetchItems();
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? AppColors.emerald : AppColors.surface,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: isSelected ? AppColors.emeraldLight : AppColors.border,
                          ),
                        ),
                        child: Text(
                          _getCategoryLabel(cat),
                          style: AppTypography.titleMedium.copyWith(
                            fontSize: 13,
                            color: isSelected ? Colors.white : AppColors.textSecondary,
                          ),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            const SizedBox(height: 8),

            // Content List
            Expanded(
              child: _isLoading
                  ? LoadingView(message: 'culture.loading_heritage'.tr())
                  : _error != null
                      ? ErrorView(message: _error!, onRetry: _fetchItems)
                      : _items.isEmpty
                          ? EmptyStateView(
                              title: 'culture.no_items_found'.tr(),
                              message: 'culture.no_items_desc'.tr(),
                              icon: Icons.history_edu_rounded,
                            )
                          : ListView.builder(
                              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                              itemCount: _items.length,
                              itemBuilder: (context, index) {
                                final item = _items[index];
                                return _buildCulturalCard(context, item);
                              },
                            ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCulturalCard(BuildContext context, CulturalItemModel item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      child: ScaleOnPress(
        onTap: () => context.push(
          '/culture/${item.slug}',
          extra: item,
        ),
        child: GlassCard(
          padding: const EdgeInsets.all(18),
          borderRadius: 20,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.purple.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      item.category.toUpperCase(),
                      style: AppTypography.caption.copyWith(
                        color: AppColors.purpleLight,
                        fontWeight: FontWeight.bold,
                        fontSize: 10,
                      ),
                    ),
                  ),
                  if (item.period != null || item.era != null)
                    Text(
                      item.period ?? item.era!,
                      style: AppTypography.caption.copyWith(color: AppColors.textMuted),
                    ),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                item.titleTa,
                style: AppTypography.tamilTitle.copyWith(fontSize: 18),
              ),
              const SizedBox(height: 2),
              Text(
                item.titleEn,
                style: AppTypography.titleMedium.copyWith(fontSize: 14, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 8),
              Text(
                item.summaryEn,
                style: AppTypography.bodyMedium,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              if (item.locationName != null) ...[
                const SizedBox(height: 10),
                Row(
                  children: [
                    const Icon(Icons.location_on_outlined, color: AppColors.skyLight, size: 14),
                    const SizedBox(width: 4),
                    Text(
                      item.locationName!,
                      style: AppTypography.caption.copyWith(color: AppColors.skyLight),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
