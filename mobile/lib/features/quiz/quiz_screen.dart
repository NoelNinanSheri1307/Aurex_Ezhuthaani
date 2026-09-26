import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/animated_button.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/curriculum_model.dart';
import '../auth/auth_provider.dart';
import '../learning/journey_provider.dart';

class QuizScreen extends ConsumerStatefulWidget {
  final String stageId;

  const QuizScreen({super.key, required this.stageId});

  @override
  ConsumerState<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends ConsumerState<QuizScreen> {
  int _currentIndex = 0;
  final List<int> _selectedAnswers = [];
  int? _currentSelection;
  bool _isSubmitting = false;

  void _onOptionSelected(int index) {
    setState(() {
      _currentSelection = index;
    });
  }

  void _nextQuestion(List<QuizQuestionModel> questions) {
    if (_currentSelection == null) return;

    _selectedAnswers.add(_currentSelection!);
    _currentSelection = null;

    if (_currentIndex < questions.length - 1) {
      setState(() {
        _currentIndex++;
      });
    } else {
      _submitQuiz();
    }
  }

  Future<void> _submitQuiz() async {
    setState(() => _isSubmitting = true);
    try {
      final result = await ref.read(curriculumRepositoryProvider).submitQuiz(
            stageId: widget.stageId,
            answers: _selectedAnswers,
          );

      await ref.read(authNotifierProvider.notifier).refreshUser();

      if (mounted) {
        _showResultDialog(result);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to submit quiz: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  void _showResultDialog(QuizResultModel result) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) {
        final passed = result.passed;
        return AlertDialog(
          backgroundColor: AppColors.surface,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 76,
                height: 76,
                decoration: BoxDecoration(
                  gradient: passed ? AppColors.emeraldGradient : AppColors.amberGradient,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  passed ? Icons.emoji_events_rounded : Icons.replay_rounded,
                  color: Colors.white,
                  size: 42,
                ),
              ),
              const SizedBox(height: 18),
              Text(
                passed ? 'quiz.milestone_cleared'.tr() : 'quiz.keep_practicing'.tr(),
                style: AppTypography.titleLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'quiz.score_text'.tr(args: [result.score.toString()]),
                style: AppTypography.bodyMedium,
                textAlign: TextAlign.center,
              ),
              if (result.badge != null) ...[
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.amber.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.amber.withValues(alpha: 0.4)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.stars_rounded, color: AppColors.amberLight, size: 20),
                      const SizedBox(width: 8),
                      Text('quiz.badge_awarded'.tr(args: [result.badge!]), style: AppTypography.titleMedium.copyWith(color: AppColors.amberLight, fontSize: 13)),
                    ],
                  ),
                ),
              ],
              if (result.xpGained > 0) ...[
                const SizedBox(height: 10),
                Text('lesson.xp_earned'.tr(args: [result.xpGained.toString()]), style: AppTypography.caption.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.bold)),
              ],
              const SizedBox(height: 24),
              AnimatedButton(
                label: passed ? 'quiz.next_stage_unlocked'.tr() : 'quiz.try_again'.tr(),
                onPressed: () {
                  Navigator.pop(ctx);
                  context.pop();
                },
                gradient: passed ? AppColors.emeraldGradient : AppColors.amberGradient,
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
        loading: () => LoadingView(message: 'quiz.preparing_questions'.tr()),
        error: (e, _) => ErrorView(message: e.toString()),
        data: (curriculum) {
          final stage = curriculum.stages.firstWhere(
            (s) => s.id == widget.stageId,
            orElse: () => curriculum.stages.first,
          );
          final questions = stage.quiz.questions;

          if (questions.isEmpty) {
            return ErrorView(message: 'quiz.no_questions'.tr());
          }

          final currentQ = questions[_currentIndex];
          final progress = (_currentIndex + 1) / questions.length;

          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Quiz Progress Bar & Header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'quiz.question'.tr(args: [
                          (_currentIndex + 1).toString(),
                          questions.length.toString(),
                        ]),
                        style: AppTypography.titleMedium,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.sky.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          'quiz.pass_score'.tr(args: [stage.quiz.passScore.toString()]),
                          style: AppTypography.caption.copyWith(color: AppColors.skyLight, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: progress,
                      minHeight: 8,
                      backgroundColor: AppColors.surfaceLight,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppColors.sky),
                    ),
                  ),
                  const SizedBox(height: 32),

                  // Question Card
                  GlassCard(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(stage.nameTa, style: AppTypography.caption.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.bold)),
                            IconButton(
                              icon: const Icon(Icons.volume_up_rounded, color: AppColors.skyLight),
                              onPressed: () => ref.read(ttsServiceProvider).speak(currentQ.q),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          currentQ.q,
                          style: AppTypography.tamilTitle.copyWith(fontSize: 22, height: 1.4),
                        ),
                        if (currentQ.hint != null) ...[
                          const SizedBox(height: 12),
                          Text(
                            'quiz.hint'.tr(args: [currentQ.hint!]),
                            style: AppTypography.caption.copyWith(color: AppColors.amberLight),
                          ),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Options
                  Expanded(
                    child: ListView.separated(
                      itemCount: currentQ.options.length,
                      separatorBuilder: (_, _) => const SizedBox(height: 12),
                      itemBuilder: (context, optIdx) {
                        final option = currentQ.options[optIdx];
                        final isSelected = _currentSelection == optIdx;

                        return ScaleOnPress(
                          onTap: () => _onOptionSelected(optIdx),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 180),
                            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
                            decoration: BoxDecoration(
                              color: isSelected ? AppColors.sky.withValues(alpha: 0.2) : AppColors.surface,
                              borderRadius: BorderRadius.circular(18),
                              border: Border.all(
                                color: isSelected ? AppColors.skyLight : AppColors.border,
                                width: isSelected ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 32,
                                  height: 32,
                                  decoration: BoxDecoration(
                                    color: isSelected ? AppColors.sky : AppColors.surfaceElevated,
                                    shape: BoxShape.circle,
                                  ),
                                  child: Center(
                                    child: Text(
                                      String.fromCharCode(65 + optIdx),
                                      style: AppTypography.titleMedium.copyWith(
                                        color: isSelected ? Colors.white : AppColors.textSecondary,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Text(
                                    option,
                                    style: AppTypography.tamilBody.copyWith(
                                      fontSize: 16,
                                      color: isSelected ? Colors.white : AppColors.textPrimary,
                                      fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  // Next / Finish button
                  AnimatedButton(
                    label: _currentIndex == questions.length - 1 ? 'quiz.submit_quiz'.tr() : 'quiz.next_question'.tr(),
                    onPressed: _currentSelection == null ? null : () => _nextQuestion(questions),
                    isLoading: _isSubmitting,
                    gradient: AppColors.skyGradient,
                    icon: Icons.arrow_forward_rounded,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
