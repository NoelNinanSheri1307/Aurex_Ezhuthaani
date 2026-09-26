import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/cultural_item_model.dart';
import '../../data/models/note_model.dart';

class CultureDetailScreen extends ConsumerStatefulWidget {
  final String slug;
  final CulturalItemModel? initialItem;

  const CultureDetailScreen({
    super.key,
    required this.slug,
    this.initialItem,
  });

  @override
  ConsumerState<CultureDetailScreen> createState() => _CultureDetailScreenState();
}

class _CultureDetailScreenState extends ConsumerState<CultureDetailScreen> {
  CulturalItemModel? _item;
  bool _isLoading = true;
  bool _isSaved = false;

  @override
  void initState() {
    super.initState();
    _item = widget.initialItem;
    _fetchDetail();
  }

  Future<void> _fetchDetail() async {
    try {
      final repo = ref.read(contentRepositoryProvider);
      final detail = await repo.getCultureDetail(widget.slug);
      if (mounted) {
        setState(() {
          _item = detail;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  Future<void> _toggleBookmark() async {
    final repo = ref.read(contentRepositoryProvider);
    setState(() => _isSaved = !_isSaved);

    try {
      if (_isSaved) {
        await repo.saveItem('/api/saved/culture', {'slug': widget.slug});
      } else {
        await repo.unsaveItem('/api/saved/culture/${widget.slug}');
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(_isSaved ? 'culture.bookmarked'.tr() : 'culture.bookmark_removed'.tr())),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update bookmark: $e')),
        );
      }
    }
  }

  void _showNoteDialog() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('culture.add_note'.tr(), style: AppTypography.titleMedium),
        content: TextField(
          controller: controller,
          maxLines: 4,
          style: AppTypography.bodyLarge,
          decoration: InputDecoration(
            hintText: 'culture.note_hint'.tr(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('common.cancel'.tr(), style: const TextStyle(color: AppColors.textMuted)),
          ),
          ElevatedButton(
            onPressed: () async {
              if (controller.text.trim().isNotEmpty && _item != null) {
                await ref.read(contentRepositoryProvider).createNote(
                  NoteModel(
                    id: 0,
                    contentType: _item!.contentType,
                    contentId: _item!.slug,
                    title: _item!.titleEn,
                    body: controller.text.trim(),
                  ),
                );
                if (ctx.mounted) Navigator.pop(ctx);
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('culture.note_saved'.tr())),
                  );
                }
              }
            },
            child: Text('culture.save_note'.tr()),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading && _item == null) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(),
        body: LoadingView(message: 'culture.loading_archives'.tr()),
      );
    }

    if (_item == null) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(),
        body: ErrorView(message: 'culture.not_found'.tr()),
      );
    }

    final item = _item!;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
        actions: [
          IconButton(
            icon: Icon(
              _isSaved ? Icons.bookmark_rounded : Icons.bookmark_border_rounded,
              color: _isSaved ? AppColors.amberLight : AppColors.textPrimary,
            ),
            onPressed: _toggleBookmark,
            tooltip: 'Bookmark',
          ),
          IconButton(
            icon: const Icon(Icons.note_add_outlined, color: AppColors.textPrimary),
            onPressed: _showNoteDialog,
            tooltip: 'Add note',
          ),
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: AppColors.emeraldLight),
            onPressed: () => ref.read(ttsServiceProvider).speak('${item.titleTa}. ${item.summaryTa}'),
            tooltip: 'Listen to narration',
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: FadeSlideTransition(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Category Chip & Era
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                      decoration: BoxDecoration(
                        color: AppColors.purple.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Text(
                        item.category.toUpperCase(),
                        style: AppTypography.caption.copyWith(color: AppColors.purpleLight, fontWeight: FontWeight.bold),
                      ),
                    ),
                    if (item.period != null || item.era != null)
                      Text(
                        item.period ?? item.era!,
                        style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                      ),
                  ],
                ),
                const SizedBox(height: 14),

                // Tamil Title
                Text(item.titleTa, style: AppTypography.tamilTitle.copyWith(fontSize: 26)),
                const SizedBox(height: 4),
                // English Title
                Text(item.titleEn, style: AppTypography.titleLarge.copyWith(color: AppColors.textSecondary, fontSize: 18)),
                const SizedBox(height: 20),

                // Summary Quote Card
                GlassCard(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('culture.overview'.tr(), style: AppTypography.caption.copyWith(color: AppColors.amberLight, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      Text(item.summaryTa, style: AppTypography.tamilBody),
                      const SizedBox(height: 8),
                      const Divider(color: AppColors.border),
                      const SizedBox(height: 8),
                      Text(item.summaryEn, style: AppTypography.bodyMedium),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Main Deep Historical Content
                if (item.contentEn != null || item.contentTa != null) ...[
                  Text('culture.historical_narrative'.tr(), style: AppTypography.titleMedium),
                  const SizedBox(height: 10),
                  Text(
                    item.contentEn ?? item.contentTa ?? '',
                    style: AppTypography.bodyLarge.copyWith(color: AppColors.textPrimary, height: 1.7),
                  ),
                  const SizedBox(height: 24),
                ],

                // Metadata Card
                GlassCard(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('culture.artifact_metadata'.tr(), style: AppTypography.titleMedium.copyWith(fontSize: 15)),
                      const SizedBox(height: 12),
                      if (item.author != null) _buildMetaRow('culture.author'.tr(), item.author!),
                      if (item.region != null) _buildMetaRow('culture.region'.tr(), item.region!),
                      if (item.script != null) _buildMetaRow('culture.script'.tr(), item.script!),
                      if (item.locationName != null) _buildMetaRow('culture.location'.tr(), item.locationName!),
                      _buildMetaRow('culture.source'.tr(), item.sourceName),
                      if (item.license != null) _buildMetaRow('culture.license'.tr(), item.license!),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Related Items Section
                if (item.related.isNotEmpty) ...[
                  Text('culture.related_heritage'.tr(), style: AppTypography.titleMedium),
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 110,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: item.related.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 12),
                      itemBuilder: (context, idx) {
                        final rel = item.related[idx];
                        return ScaleOnPress(
                          onTap: () => context.push('/culture/${rel.slug}'),
                          child: Container(
                            width: 170,
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceElevated,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(color: AppColors.border),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  rel.titleTa,
                                  style: AppTypography.tamilTitle.copyWith(fontSize: 14),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  rel.titleEn,
                                  style: AppTypography.caption,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMetaRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 130,
            child: Text(label, style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
          ),
          Expanded(
            child: Text(value, style: AppTypography.bodyMedium.copyWith(fontSize: 13)),
          ),
        ],
      ),
    );
  }
}
