import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../core/widgets/xp_streak_badge.dart';
import '../../data/models/curriculum_model.dart';
import '../auth/auth_provider.dart';
import 'journey_provider.dart';

class JourneyScreen extends ConsumerStatefulWidget {
  const JourneyScreen({super.key});

  @override
  ConsumerState<JourneyScreen> createState() => _JourneyScreenState();
}

class _JourneyScreenState extends ConsumerState<JourneyScreen> {
  String? _expandedStageId;

  @override
  Widget build(BuildContext context) {
    final curriculumAsync = ref.watch(curriculumFutureProvider);
    final authState = ref.watch(authNotifierProvider);
    final user = authState.user;

    final unlockedStages = user?.unlockedStages.toSet() ?? {'adippadai'};
    final completedStages = user?.completedStages.toSet() ?? {};
    final progressMap = user?.progress ?? {};

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('journey.title'.tr(), style: AppTypography.titleLarge),
        actions: [
          if (user != null) ...[
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: XPBadge(xp: user.xp, isCompact: true),
            ),
          ],
        ],
      ),
      body: curriculumAsync.when(
        loading: () => LoadingView(message: 'common.loading'.tr()),
        error: (err, _) => ErrorView(
          message: err.toString(),
          onRetry: () => ref.refresh(curriculumFutureProvider),
        ),
        data: (curriculum) {
          final stages = curriculum.stages;

          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(curriculumFutureProvider);
              await ref.read(authNotifierProvider.notifier).refreshUser();
            },
            color: AppColors.emerald,
            backgroundColor: AppColors.surface,
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              itemCount: stages.length + 1,
              itemBuilder: (context, index) {
                if (index == 0) {
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 20),
                    child: ScaleOnPress(
                      onTap: () => context.push('/flashcards'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF065F46), Color(0xFF0F766E)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.emerald.withValues(alpha: 0.3),
                              blurRadius: 12,
                              offset: const Offset(0, 4),
                            ),
                          ],
                          border: Border.all(
                            color: AppColors.emeraldLight.withValues(alpha: 0.3),
                            width: 1,
                          ),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(14),
                              ),
                              child: const Text('🎴', style: TextStyle(fontSize: 24)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        'flashcards.title'.tr(),
                                        style: AppTypography.titleMedium.copyWith(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 14,
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: AppColors.amber,
                                          borderRadius: BorderRadius.circular(6),
                                        ),
                                        child: const Text(
                                          '+60 XP',
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontSize: 9,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    'flashcards.subtitle'.tr(),
                                    style: TextStyle(
                                      color: Colors.white.withValues(alpha: 0.85),
                                      fontSize: 11,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(Icons.arrow_forward_ios_rounded, color: Colors.white, size: 14),
                          ],
                        ),
                      ),
                    ),
                  );
                }

                final stage = stages[index - 1];
                final isUnlocked = unlockedStages.contains(stage.id) || (index - 1) == 0;
                final isCompleted = completedStages.contains(stage.id);
                final isCurrent = isUnlocked && !isCompleted;
                final isExpanded = _expandedStageId == stage.id || (_expandedStageId == null && isCurrent);

                return _buildStageTimelineNode(
                  context,
                  stage: stage,
                  isUnlocked: isUnlocked,
                  isCompleted: isCompleted,
                  isCurrent: isCurrent,
                  isExpanded: isExpanded,
                  progressMap: progressMap,
                  isLast: index - 1 == stages.length - 1,
                );
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildStageTimelineNode(
    BuildContext context, {
    required StageModel stage,
    required bool isUnlocked,
    required bool isCompleted,
    required bool isCurrent,
    required bool isExpanded,
    required Map<String, int> progressMap,
    required bool isLast,
  }) {
    Color nodeColor = AppColors.surfaceLight;
    if (isCompleted) {
      nodeColor = AppColors.emerald;
    } else if (isCurrent) {
      nodeColor = AppColors.amber;
    }

    return Column(
      children: [
        // Stage Header Card
        ScaleOnPress(
          onTap: isUnlocked
              ? () {
                  setState(() {
                    _expandedStageId = isExpanded ? null : stage.id;
                  });
                }
              : null,
          child: Container(
            margin: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(
              gradient: isCurrent
                  ? const LinearGradient(
                      colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    )
                  : null,
              color: isCurrent ? null : AppColors.surface,
              borderRadius: BorderRadius.circular(22),
              border: Border.all(
                color: isCurrent
                    ? AppColors.amber.withValues(alpha: 0.6)
                    : isCompleted
                        ? AppColors.emerald.withValues(alpha: 0.4)
                        : AppColors.border,
                width: isCurrent ? 1.8 : 1,
              ),
              boxShadow: isCurrent
                  ? [
                      BoxShadow(
                        color: AppColors.amber.withValues(alpha: 0.2),
                        blurRadius: 20,
                        offset: const Offset(0, 8),
                      ),
                    ]
                  : [],
            ),
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                // Circular Official Stage Badge Artwork
                Stack(
                  alignment: Alignment.center,
                  children: [
                    Container(
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: isCompleted
                              ? AppColors.emerald
                              : (isUnlocked ? nodeColor : AppColors.border),
                          width: 2,
                        ),
                        boxShadow: isUnlocked
                            ? [
                                BoxShadow(
                                  color: nodeColor.withValues(alpha: 0.25),
                                  blurRadius: 10,
                                ),
                              ]
                            : null,
                      ),
                      child: ClipOval(
                        child: ColorFiltered(
                          colorFilter: !isUnlocked
                              ? const ColorFilter.matrix(<double>[
                                  0.2126, 0.7152, 0.0722, 0, 0,
                                  0.2126, 0.7152, 0.0722, 0, 0,
                                  0.2126, 0.7152, 0.0722, 0, 0,
                                  0,      0,      0,      0.4, 0,
                                ])
                              : const ColorFilter.mode(Colors.transparent, BlendMode.multiply),
                          child: Image.asset(
                            _getStageBadgeAsset(stage.order),
                            width: 56,
                            height: 56,
                            fit: BoxFit.cover,
                            errorBuilder: (_, _, _) => Center(
                              child: Text(
                                '${stage.order}',
                                style: AppTypography.titleLarge.copyWith(color: nodeColor),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    if (isCompleted)
                      Positioned(
                        right: 0,
                        bottom: 0,
                        child: Container(
                          padding: const EdgeInsets.all(2),
                          decoration: const BoxDecoration(
                            color: Color(0xFF0F172A),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.check_circle_rounded,
                            color: AppColors.emerald,
                            size: 16,
                          ),
                        ),
                      )
                    else if (!isUnlocked)
                      Positioned(
                        right: 0,
                        bottom: 0,
                        child: Container(
                          padding: const EdgeInsets.all(2),
                          decoration: const BoxDecoration(
                            color: Color(0xFF0F172A),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.lock_rounded,
                            color: AppColors.textMuted,
                            size: 14,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(width: 16),

                // Stage Info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            stage.nameTa,
                            style: AppTypography.tamilTitle.copyWith(fontSize: 18),
                          ),
                          const SizedBox(width: 8),
                          if (isCurrent)
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppColors.amber.withValues(alpha: 0.2),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                'journey.in_progress'.tr().toUpperCase(),
                                style: AppTypography.caption.copyWith(
                                  color: AppColors.amberLight,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 9,
                                ),
                              ),
                            ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        stage.name,
                        style: AppTypography.titleMedium.copyWith(fontSize: 14, color: AppColors.textPrimary),
                      ),
                      Text(
                        stage.subtitle,
                        style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                      ),
                    ],
                  ),
                ),

                if (isUnlocked)
                  Icon(
                    isExpanded ? Icons.keyboard_arrow_up_rounded : Icons.keyboard_arrow_down_rounded,
                    color: AppColors.textMuted,
                  ),
              ],
            ),
          ),
        ),

        // Expanded Lesson Drawer
        if (isUnlocked && isExpanded) ...[
          Container(
            padding: const EdgeInsets.only(left: 26, right: 8, top: 4, bottom: 16),
            child: Column(
              children: [
                ...stage.lessons.map((lesson) {
                  final score = progressMap[lesson.id];
                  final isDone = score != null && score > 0;

                  return Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    child: ScaleOnPress(
                      onTap: () => context.push('/lesson/${lesson.id}'),
                      child: GlassCard(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        borderRadius: 16,
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: isDone
                                    ? AppColors.emerald.withValues(alpha: 0.15)
                                    : AppColors.surfaceElevated,
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                isDone ? Icons.check_rounded : Icons.play_arrow_rounded,
                                color: isDone ? AppColors.emeraldLight : AppColors.amberLight,
                                size: 18,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    lesson.titleTa,
                                    style: AppTypography.tamilTitle.copyWith(fontSize: 14),
                                  ),
                                  Text(
                                    lesson.title,
                                    style: AppTypography.bodyMedium.copyWith(fontSize: 12),
                                  ),
                                ],
                              ),
                            ),
                            Text(
                              '+${lesson.xp} XP',
                              style: AppTypography.caption.copyWith(
                                color: AppColors.amberLight,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                }),

                // Milestone Quiz Button
                const SizedBox(height: 10),
                ScaleOnPress(
                  onTap: () => context.push('/quiz/${stage.id}'),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: isCompleted ? AppColors.emeraldGradient : AppColors.skyGradient,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: [
                        BoxShadow(
                          color: (isCompleted ? AppColors.emerald : AppColors.sky).withValues(alpha: 0.3),
                          blurRadius: 14,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.workspace_premium_rounded, color: Colors.white, size: 24),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                isCompleted ? 'journey.completed'.tr() : 'quiz.title'.tr(),
                                style: AppTypography.titleMedium.copyWith(color: Colors.white, fontSize: 14),
                              ),
                              Text(
                                stage.milestone.title,
                                style: AppTypography.caption.copyWith(color: Colors.white70),
                              ),
                            ],
                          ),
                        ),
                        Text(
                          isCompleted ? 'journey.review_stage'.tr() : 'journey.start_stage'.tr(),
                          style: AppTypography.caption.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],

        // Timeline Connecting Line between stages
        if (!isLast)
          Container(
            height: 24,
            width: 3,
            margin: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(
              color: isCompleted ? AppColors.emerald.withValues(alpha: 0.6) : AppColors.border,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
      ],
    );
  }

  String _getStageBadgeAsset(int order) {
    switch (order) {
      case 1:
        return 'assets/images/Badge1Thodakkam.png';
      case 2:
        return 'assets/images/Badge2EzhuthuArivu.png';
      case 3:
        return 'assets/images/Badge3KaiEzhuthu.png';
      case 4:
        return 'assets/images/Badge4SolVangi.png';
      case 5:
        return 'assets/images/Badge5VaakyaAmaippu.png';
      case 6:
        return 'assets/images/Badge6VasippuThiran.png';
      case 7:
      default:
        return 'assets/images/Badge7.png';
    }
  }
}
