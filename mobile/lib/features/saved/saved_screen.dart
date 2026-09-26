import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/config/api_constants.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';

class SavedScreen extends ConsumerStatefulWidget {
  const SavedScreen({super.key});

  @override
  ConsumerState<SavedScreen> createState() => _SavedScreenState();
}

class _SavedScreenState extends ConsumerState<SavedScreen> {
  List<Map<String, dynamic>> _savedCulture = [];
  List<Map<String, dynamic>> _savedWords = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchSaved();
  }

  Future<void> _fetchSaved() async {
    try {
      final repo = ref.read(contentRepositoryProvider);
      final culture = await repo.getSavedItems(ApiConstants.savedCulture);
      final words = await repo.getSavedItems(ApiConstants.savedWords);
      if (mounted) {
        setState(() {
          _savedCulture = culture;
          _savedWords = words;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _unsaveCulture(String slug) async {
    await ref.read(contentRepositoryProvider).unsaveItem(ApiConstants.unsaveCulture(slug));
    _fetchSaved();
  }

  Future<void> _unsaveWord(String wordId) async {
    await ref.read(contentRepositoryProvider).unsaveItem(ApiConstants.unsaveWord(wordId));
    _fetchSaved();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          title: Text('saved.title'.tr(), style: AppTypography.titleLarge),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
            onPressed: () => context.pop(),
          ),
          bottom: TabBar(
            indicatorColor: AppColors.emerald,
            labelColor: AppColors.emeraldLight,
            unselectedLabelColor: AppColors.textMuted,
            tabs: [
              Tab(text: 'saved.tab_culture'.tr()),
              Tab(text: 'saved.tab_words'.tr()),
            ],
          ),
        ),
        body: _isLoading
            ? LoadingView(message: 'common.loading'.tr())
            : TabBarView(
                children: [
                  // Tab 1: Culture & Heritage
                  _savedCulture.isEmpty
                      ? EmptyStateView(
                          title: 'saved.empty_culture_title'.tr(),
                          message: 'saved.empty_culture_desc'.tr(),
                          icon: Icons.bookmark_border_rounded,
                        )
                      : ListView.separated(
                          padding: const EdgeInsets.all(20),
                          itemCount: _savedCulture.length,
                          separatorBuilder: (_, _) => const SizedBox(height: 12),
                          itemBuilder: (context, idx) {
                            final item = _savedCulture[idx];
                            final slug = item['slug'] as String? ?? '';
                            return GlassCard(
                              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Expanded(
                                    child: GestureDetector(
                                      onTap: () => context.push('/culture/$slug'),
                                      child: Text(
                                        slug.replaceAll('_', ' ').toUpperCase(),
                                        style: AppTypography.titleMedium.copyWith(fontSize: 14),
                                      ),
                                    ),
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.delete_outline_rounded, color: AppColors.roseLight, size: 20),
                                    onPressed: () => _unsaveCulture(slug),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),

                  // Tab 2: Vocabulary Words
                  _savedWords.isEmpty
                      ? EmptyStateView(
                          title: 'saved.empty_words_title'.tr(),
                          message: 'saved.empty_words_desc'.tr(),
                          icon: Icons.translate_rounded,
                        )
                      : ListView.separated(
                          padding: const EdgeInsets.all(20),
                          itemCount: _savedWords.length,
                          separatorBuilder: (_, _) => const SizedBox(height: 12),
                          itemBuilder: (context, idx) {
                            final item = _savedWords[idx];
                            final wordId = item['word_id'] as String? ?? '';
                            return GlassCard(
                              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(wordId, style: AppTypography.tamilTitle.copyWith(fontSize: 18)),
                                  IconButton(
                                    icon: const Icon(Icons.delete_outline_rounded, color: AppColors.roseLight, size: 20),
                                    onPressed: () => _unsaveWord(wordId),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                ],
              ),
      ),
    );
  }
}
