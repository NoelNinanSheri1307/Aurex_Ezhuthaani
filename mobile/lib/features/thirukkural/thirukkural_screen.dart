import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/thirukkural_model.dart';

class ThirukkuralScreen extends ConsumerStatefulWidget {
  const ThirukkuralScreen({super.key});

  @override
  ConsumerState<ThirukkuralScreen> createState() => _ThirukkuralScreenState();
}

class _ThirukkuralScreenState extends ConsumerState<ThirukkuralScreen> {
  final _searchController = TextEditingController();
  List<KuralModel> _kurals = [];
  KuralModel? _activeKural;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadKurals();
  }

  Future<void> _loadKurals() async {
    final repo = ref.read(thirukkuralRepositoryProvider);
    final all = await repo.getAllKurals();
    final today = await repo.getKuralOfTheDay();
    if (mounted) {
      setState(() {
        _kurals = all;
        _activeKural = today;
        _isLoading = false;
      });
    }
  }

  void _onSearch(String query) async {
    final repo = ref.read(thirukkuralRepositoryProvider);
    final results = await repo.searchKurals(query);
    setState(() {
      _kurals = results;
      if (results.isNotEmpty) _activeKural = results.first;
    });
  }

  void _getRandomKural() async {
    final repo = ref.read(thirukkuralRepositoryProvider);
    final random = await repo.getRandomKural();
    setState(() {
      _activeKural = random;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('kural.title'.tr(), style: AppTypography.titleLarge),
        actions: [
          IconButton(
            icon: const Icon(Icons.shuffle_rounded, color: AppColors.amberLight),
            onPressed: _getRandomKural,
            tooltip: 'kural.random'.tr(),
          ),
        ],
      ),
      body: _isLoading
          ? LoadingView(message: 'kural.loading'.tr())
          : SafeArea(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: FadeSlideTransition(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Search by Kural number or keyword
                      TextField(
                        controller: _searchController,
                        style: AppTypography.bodyLarge,
                        decoration: InputDecoration(
                          hintText: 'kural.search_hint'.tr(),
                          prefixIcon: const Icon(Icons.search_rounded, color: AppColors.textMuted),
                          suffixIcon: _searchController.text.isNotEmpty
                              ? IconButton(
                                  icon: const Icon(Icons.clear_rounded, color: AppColors.textMuted),
                                  onPressed: () {
                                    _searchController.clear();
                                    _loadKurals();
                                  },
                                )
                              : null,
                        ),
                        onSubmitted: _onSearch,
                      ),
                      const SizedBox(height: 20),

                      // Mascot Companion Banner
                      Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                          ),
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: AppColors.amber.withValues(alpha: 0.3)),
                        ),
                        child: Row(
                          children: [
                            Image.asset(
                              'assets/images/mascotteaching.png',
                              width: 52,
                              height: 52,
                              fit: BoxFit.contain,
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'kural.learn_kural'.tr(),
                                    style: AppTypography.tamilTitle.copyWith(
                                      fontSize: 15,
                                      color: AppColors.amberLight,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'kural.learn_kural_desc'.tr(),
                                    style: AppTypography.caption.copyWith(color: AppColors.textMuted),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Featured / Active Kural Card
                      if (_activeKural != null) ...[
                        GlassCard(
                          padding: const EdgeInsets.all(22),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                                    decoration: BoxDecoration(
                                      color: AppColors.amber.withValues(alpha: 0.15),
                                      borderRadius: BorderRadius.circular(16),
                                      border: Border.all(color: AppColors.amber.withValues(alpha: 0.4)),
                                    ),
                                    child: Text(
                                      'kural.couplet_no'.tr(args: [_activeKural!.number.toString()]),
                                      style: AppTypography.titleMedium.copyWith(color: AppColors.amberLight, fontSize: 13),
                                    ),
                                  ),
                                  Row(
                                    children: [
                                      IconButton(
                                        icon: const Icon(Icons.volume_up_rounded, color: AppColors.amberLight),
                                        onPressed: () {
                                          final text = '${_activeKural!.line1} ${_activeKural!.line2}';
                                          ref.read(ttsServiceProvider).speak(text);
                                        },
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(height: 16),

                              // Couplet Verses
                              Text(_activeKural!.line1, style: AppTypography.tamilKural.copyWith(fontSize: 18)),
                              const SizedBox(height: 4),
                              Text(_activeKural!.line2, style: AppTypography.tamilKural.copyWith(fontSize: 18)),
                              const SizedBox(height: 16),
                              const Divider(color: AppColors.border),
                              const SizedBox(height: 12),

                              // English Translation
                              Text('kural.english_translation'.tr(), style: AppTypography.caption.copyWith(color: AppColors.amberLight, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 4),
                              Text(_activeKural!.translation, style: AppTypography.bodyMedium.copyWith(color: Colors.white, fontStyle: FontStyle.italic)),
                              const SizedBox(height: 14),

                              // Mu. Varadarajan Explanation
                              if (_activeKural!.mv.isNotEmpty) ...[
                                Text('kural.mv_explanation'.tr(), style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                                const SizedBox(height: 4),
                                Text(_activeKural!.mv, style: AppTypography.bodyMedium),
                                const SizedBox(height: 12),
                              ],

                              // Solomon Pappaiah Explanation
                              if (_activeKural!.sp.isNotEmpty) ...[
                                Text('kural.sp_explanation'.tr(), style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                                const SizedBox(height: 4),
                                Text(_activeKural!.sp, style: AppTypography.bodyMedium),
                                const SizedBox(height: 12),
                              ],

                              // Full English Exposition
                              if (_activeKural!.explanation.isNotEmpty) ...[
                                Text('kural.philosophical_meaning'.tr(), style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                                const SizedBox(height: 4),
                                Text(_activeKural!.explanation, style: AppTypography.bodyMedium.copyWith(color: AppColors.textSecondary)),
                              ],
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                      ],

                      // Quick Browser
                      Text('kural.browse_verses'.tr(), style: AppTypography.titleMedium),
                      const SizedBox(height: 12),
                      ListView.separated(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: _kurals.take(30).length,
                        separatorBuilder: (_, _) => const SizedBox(height: 10),
                        itemBuilder: (context, idx) {
                          final k = _kurals[idx];
                          final isSelected = _activeKural?.number == k.number;

                          return ScaleOnPress(
                            onTap: () => setState(() => _activeKural = k),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                              decoration: BoxDecoration(
                                color: isSelected ? AppColors.amber.withValues(alpha: 0.15) : AppColors.surface,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: isSelected ? AppColors.amberLight : AppColors.border,
                                ),
                              ),
                              child: Row(
                                children: [
                                  Container(
                                    width: 36,
                                    height: 36,
                                    decoration: BoxDecoration(
                                      color: isSelected ? AppColors.amber : AppColors.surfaceElevated,
                                      shape: BoxShape.circle,
                                    ),
                                    child: Center(
                                      child: Text(
                                        '${k.number}',
                                        style: AppTypography.caption.copyWith(
                                          fontWeight: FontWeight.bold,
                                          color: isSelected ? Colors.white : AppColors.textSecondary,
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 14),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(k.line1, style: AppTypography.tamilTitle.copyWith(fontSize: 14), maxLines: 1, overflow: TextOverflow.ellipsis),
                                        Text(k.translation, style: AppTypography.caption, maxLines: 1, overflow: TextOverflow.ellipsis),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 32),
                    ],
                  ),
                ),
              ),
            ),
    );
  }
}
