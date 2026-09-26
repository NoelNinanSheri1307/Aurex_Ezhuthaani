import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/note_model.dart';

class NotesScreen extends ConsumerStatefulWidget {
  const NotesScreen({super.key});

  @override
  ConsumerState<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends ConsumerState<NotesScreen> {
  List<NoteModel> _notes = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchNotes();
  }

  Future<void> _fetchNotes() async {
    try {
      final repo = ref.read(contentRepositoryProvider);
      final notes = await repo.getNotes();
      if (mounted) {
        setState(() {
          _notes = notes;
          _isLoading = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _deleteNote(int id) async {
    await ref.read(contentRepositoryProvider).deleteNote(id);
    _fetchNotes();
  }

  void _showNewNoteDialog() {
    final titleController = TextEditingController();
    final bodyController = TextEditingController();

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('notes.add_note'.tr(), style: AppTypography.titleMedium),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              style: AppTypography.bodyLarge,
              decoration: InputDecoration(hintText: 'notes.note_title'.tr()),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: bodyController,
              maxLines: 4,
              style: AppTypography.bodyLarge,
              decoration: InputDecoration(hintText: 'notes.note_content'.tr()),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('common.cancel'.tr(), style: const TextStyle(color: AppColors.textMuted)),
          ),
          ElevatedButton(
            onPressed: () async {
              if (bodyController.text.trim().isNotEmpty) {
                await ref.read(contentRepositoryProvider).createNote(
                  NoteModel(
                    id: 0,
                    contentType: 'general',
                    contentId: 'general_${DateTime.now().millisecondsSinceEpoch}',
                    title: titleController.text.trim().isNotEmpty ? titleController.text.trim() : null,
                    body: bodyController.text.trim(),
                  ),
                );
                if (ctx.mounted) Navigator.pop(ctx);
                _fetchNotes();
              }
            },
            child: Text('common.save'.tr()),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('notes.title'.tr(), style: AppTypography.titleLarge),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppColors.emerald,
        onPressed: _showNewNoteDialog,
        child: const Icon(Icons.add_rounded, color: Colors.white),
      ),
      body: _isLoading
          ? LoadingView(message: 'common.loading'.tr())
          : _notes.isEmpty
              ? EmptyStateView(
                  title: 'notes.empty_notes'.tr(),
                  message: 'notes.empty_notes_desc'.tr(),
                  icon: Icons.note_alt_outlined,
                )
              : SafeArea(
                  child: ListView.separated(
                    padding: const EdgeInsets.all(20),
                    itemCount: _notes.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 12),
                    itemBuilder: (context, idx) {
                      final note = _notes[idx];
                      return GlassCard(
                        padding: const EdgeInsets.all(18),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                if (note.title != null)
                                  Expanded(
                                    child: Text(
                                      note.title!,
                                      style: AppTypography.titleMedium.copyWith(fontSize: 16),
                                    ),
                                  ),
                                IconButton(
                                  icon: const Icon(Icons.delete_outline_rounded, color: AppColors.roseLight, size: 20),
                                  onPressed: () => _deleteNote(note.id),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(note.body, style: AppTypography.bodyMedium),
                          ],
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
