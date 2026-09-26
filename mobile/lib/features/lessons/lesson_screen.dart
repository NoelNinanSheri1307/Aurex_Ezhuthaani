import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/animated_button.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/curriculum_model.dart';
import '../../data/models/note_model.dart';
import '../auth/auth_provider.dart';
import '../learning/journey_provider.dart';
import 'tracing_canvas.dart';

class LessonScreen extends ConsumerStatefulWidget {
  final String lessonId;

  const LessonScreen({super.key, required this.lessonId});

  @override
  ConsumerState<LessonScreen> createState() => _LessonScreenState();
}

class _LessonScreenState extends ConsumerState<LessonScreen> {
  bool _isSubmitting = false;

  void _showNoteDialog(String title) {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surface,
        title: Text('notes.add_note'.tr(), style: AppTypography.titleMedium),
        content: TextField(
          controller: controller,
          maxLines: 4,
          style: AppTypography.bodyLarge,
          decoration: InputDecoration(
            hintText: 'notes.note_content'.tr(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('common.cancel'.tr(), style: const TextStyle(color: AppColors.textMuted)),
          ),
          ElevatedButton(
            onPressed: () async {
              if (controller.text.trim().isNotEmpty) {
                await ref.read(contentRepositoryProvider).createNote(
                  NoteModel(
                    id: 0,
                    contentType: 'lesson',
                    contentId: widget.lessonId,
                    title: title,
                    body: controller.text.trim(),
                  ),
                );
                if (ctx.mounted) Navigator.pop(ctx);
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('notes.note_saved'.tr())),
                  );
                }
              }
            },
            child: Text('common.save'.tr()),
          ),
        ],
      ),
    );
  }

  Future<void> _completeLesson(LessonModel lesson) async {
    setState(() => _isSubmitting = true);
    try {
      final res = await ref.read(curriculumRepositoryProvider).completeLesson(
            lessonId: widget.lessonId,
            score: 100,
          );

      await ref.read(authNotifierProvider.notifier).refreshUser();

      if (mounted) {
        _showSuccessSheet(
          xpGained: res['xp_gained'] as int? ?? lesson.xp,
          streak: res['streak'] as int? ?? 1,
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to record progress: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  void _showSuccessSheet({required int xpGained, required int streak}) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface,
      isDismissible: false,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(28.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 72,
                height: 72,
                decoration: const BoxDecoration(
                  gradient: AppColors.emeraldGradient,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_circle_rounded, color: Colors.white, size: 44),
              ),
              const SizedBox(height: 18),
              Text('lesson.lesson_complete'.tr(), style: AppTypography.titleLarge),
              const SizedBox(height: 6),
              Text('lesson.well_done'.tr(), style: AppTypography.bodyMedium, textAlign: TextAlign.center),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: AppColors.amber.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text('+$xpGained XP', style: AppTypography.titleMedium.copyWith(color: AppColors.amberLight)),
                  ),
                  const SizedBox(width: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: AppColors.rose.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text('$streak ${'common.days'.tr()} ${'common.streak'.tr()} 🔥', style: AppTypography.titleMedium.copyWith(color: AppColors.roseLight)),
                  ),
                ],
              ),
              const SizedBox(height: 28),
              AnimatedButton(
                label: 'common.continue'.tr(),
                onPressed: () {
                  Navigator.pop(ctx);
                  context.pop();
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final curriculumAsync = ref.watch(curriculumFutureProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close_rounded, color: AppColors.textPrimary),
          onPressed: () => context.pop(),
        ),
      ),
      body: curriculumAsync.when(
        loading: () => const LoadingView(message: 'Loading lesson details...'),
        error: (e, _) => ErrorView(message: e.toString()),
        data: (curriculum) {
          LessonModel? matchedLesson;
          for (final stage in curriculum.stages) {
            for (final l in stage.lessons) {
              if (l.id == widget.lessonId) {
                matchedLesson = l;
                break;
              }
            }
          }

          if (matchedLesson == null) {
            return const ErrorView(message: 'Lesson could not be found.');
          }

          final lesson = matchedLesson;
          final letterSymbol = lesson.titleTa.isNotEmpty ? lesson.titleTa.split(' ').first : 'அ';

          return SafeArea(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: FadeSlideTransition(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Header Bar with TTS button and Note button
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.emerald.withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            '+${lesson.xp} XP',
                            style: AppTypography.caption.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.bold),
                          ),
                        ),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.note_add_outlined, color: AppColors.textSecondary),
                              onPressed: () => _showNoteDialog(lesson.title),
                              tooltip: 'Add personal note',
                            ),
                            IconButton(
                              icon: const Icon(Icons.volume_up_rounded, color: AppColors.emeraldLight),
                              onPressed: () => ref.read(ttsServiceProvider).speak(lesson.titleTa),
                              tooltip: 'Listen to pronunciation',
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Lesson Title
                    Text(lesson.titleTa, style: AppTypography.tamilTitle.copyWith(fontSize: 26)),
                    const SizedBox(height: 4),
                    Text(lesson.title, style: AppTypography.bodyLarge.copyWith(color: AppColors.textSecondary)),
                    const SizedBox(height: 24),

                    // Tracing & Character Interactive Area
                    TracingCanvas(
                      character: letterSymbol,
                      onCompleted: () {
                        ref.read(ttsServiceProvider).speak(letterSymbol);
                      },
                    ),
                    const SizedBox(height: 24),

                    // Cultural / Grammar explanation card
                    GlassCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.lightbulb_outline_rounded, color: AppColors.amberLight, size: 20),
                              const SizedBox(width: 8),
                              Text('Tamil Learning Insight', style: AppTypography.titleMedium),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Text(
                            'Tamil is one of the oldest living classical languages in the world. Practice drawing the stroke with fluid curves to build muscle memory.',
                            style: AppTypography.bodyMedium,
                          ),
                          const SizedBox(height: 14),
                          ScaleOnPress(
                            onTap: () => ref.read(ttsServiceProvider).speak(lesson.titleTa),
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceElevated,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.play_circle_filled_rounded, color: AppColors.emeraldLight, size: 20),
                                  const SizedBox(width: 8),
                                  Text('Hear Pronunciation: "${lesson.titleTa}"', style: AppTypography.caption.copyWith(color: Colors.white)),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Complete Lesson Action Button
                    AnimatedButton(
                      label: 'common.finish'.tr(),
                      onPressed: () => _completeLesson(lesson),
                      isLoading: _isSubmitting,
                      icon: Icons.check_circle_rounded,
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
