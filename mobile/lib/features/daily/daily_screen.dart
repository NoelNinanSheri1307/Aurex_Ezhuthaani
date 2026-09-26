import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../core/widgets/xp_streak_badge.dart';
import '../../data/models/daily_mission_model.dart';
import '../auth/auth_provider.dart';
import 'daily_provider.dart';

class DailyScreen extends ConsumerWidget {
  const DailyScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dailyAsync = ref.watch(dailyDashboardFutureProvider);
    final authState = ref.watch(authNotifierProvider);
    final user = authState.user;

    if (!authState.isAuthenticated) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          title: Text('daily.title'.tr(), style: AppTypography.titleLarge),
        ),
        body: _buildSignInPrompt(context),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('daily.title'.tr(), style: AppTypography.titleLarge),
        actions: [
          if (user != null) ...[
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: StreakBadge(streak: user.streak, isCompact: true),
            ),
          ],
        ],
      ),
      body: dailyAsync.when(
        loading: () => LoadingView(message: 'daily.loading_quests'.tr()),
        error: (e, _) {
          final errStr = e.toString().toLowerCase();
          if (errStr.contains('sign in') || errStr.contains('401') || errStr.contains('authorization')) {
            return _buildSignInPrompt(context);
          }
          return ErrorView(
            message: e.toString(),
            onRetry: () => ref.refresh(dailyDashboardFutureProvider),
          );
        },
        data: (dashboard) {
          final progress = dashboard.progress;
          final missions = dashboard.missions;
          final bonus = dashboard.dailyBonus;

          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(dailyDashboardFutureProvider);
              await ref.read(authNotifierProvider.notifier).refreshUser();
            },
            color: AppColors.amber,
            backgroundColor: AppColors.surface,
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: FadeSlideTransition(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Overview Streak & Progress Card
                    GlassCard(
                      padding: const EdgeInsets.all(22),
                      child: Row(
                        children: [
                          Container(
                            width: 68,
                            height: 68,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: AppColors.amber.withValues(alpha: 0.12),
                              border: Border.all(color: AppColors.amber, width: 2),
                            ),
                            child: ClipOval(
                              child: Image.asset(
                                progress.completed == progress.total
                                    ? 'assets/images/mascotwinning.png'
                                    : 'assets/images/mascotwithschoolbag.png',
                                fit: BoxFit.contain,
                                errorBuilder: (_, _, _) => Center(
                                  child: Text(
                                    '${progress.completed}/${progress.total}',
                                    style: AppTypography.titleLarge.copyWith(color: AppColors.amber),
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 18),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('daily.goals_progress'.tr(), style: AppTypography.titleMedium),
                                const SizedBox(height: 4),
                                Text(
                                  progress.completed == progress.total
                                      ? 'daily.all_cleared'.tr()
                                      : 'daily.missions_left'.tr(args: [(progress.total - progress.completed).toString()]),
                                  style: AppTypography.caption,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Featured Daily Challenges (Daily Quiz & Crossword)
                    Text(
                      'daily.featured_challenges'.tr(),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 12),

                    // 1. Daily Quiz Card
                    ScaleOnPress(
                      onTap: () => context.push('/daily-quiz'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF1E293B), Color(0xFF141F32)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.amber.withValues(alpha: 0.4)),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.amber.withValues(alpha: 0.1),
                              blurRadius: 14,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 50,
                              height: 50,
                              decoration: BoxDecoration(
                                color: AppColors.amber.withValues(alpha: 0.18),
                                shape: BoxShape.circle,
                              ),
                              alignment: Alignment.center,
                              child: const Text('🎯', style: TextStyle(fontSize: 26)),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        'daily.daily_quiz'.tr(),
                                        style: const TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.textPrimary,
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: AppColors.amber.withValues(alpha: 0.2),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: const Text(
                                          '+50 XP',
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.amberLight,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 3),
                                  Text(
                                    'daily.daily_quiz_sub'.tr(),
                                    style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppColors.amberLight),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),

                    // 2. Daily Crossword Card
                    ScaleOnPress(
                      onTap: () => context.push('/crossword'),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF1E293B), Color(0xFF172828)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.emerald.withValues(alpha: 0.4)),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.emerald.withValues(alpha: 0.1),
                              blurRadius: 14,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 50,
                              height: 50,
                              decoration: BoxDecoration(
                                color: AppColors.emerald.withValues(alpha: 0.18),
                                shape: BoxShape.circle,
                              ),
                              alignment: Alignment.center,
                              child: const Text('🧩', style: TextStyle(fontSize: 26)),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        'daily.crossword'.tr(),
                                        style: const TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.textPrimary,
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                        decoration: BoxDecoration(
                                          color: AppColors.emerald.withValues(alpha: 0.2),
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: const Text(
                                          '+60 XP',
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.bold,
                                            color: AppColors.emeraldLight,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 3),
                                  Text(
                                    'daily.crossword_desc'.tr(),
                                    style: const TextStyle(fontSize: 12, color: AppColors.textMuted),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppColors.emeraldLight),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Daily Bonus Card
                    Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        gradient: bonus.completed ? AppColors.emeraldGradient : AppColors.cardGradient,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: bonus.completed ? AppColors.emeraldLight : AppColors.amber.withValues(alpha: 0.4),
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            bonus.completed ? Icons.verified_rounded : Icons.star_rounded,
                            color: bonus.completed ? Colors.white : AppColors.amberLight,
                            size: 28,
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  bonus.completed
                                      ? 'daily.bonus_claimed'.tr()
                                      : 'daily.bonus_streak'.tr(args: [bonus.xpReward.toString()]),
                                  style: AppTypography.titleMedium.copyWith(fontSize: 14),
                                ),
                                Text(
                                  bonus.completed
                                      ? 'daily.streak_maintained'.tr()
                                      : 'daily.finish_all_missions'.tr(),
                                  style: AppTypography.caption,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),

                    Text('daily.todays_quests'.tr(), style: AppTypography.titleMedium),
                    const SizedBox(height: 12),

                    // Missions List
                    ...missions.map((mission) => _buildMissionCard(context, ref, mission)),
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildMissionCard(BuildContext context, WidgetRef ref, DailyMissionModel mission) {
    IconData iconData = Icons.school_rounded;
    Color iconColor = AppColors.emerald;

    switch (mission.type) {
      case 'vocabulary':
        iconData = Icons.translate_rounded;
        iconColor = AppColors.purple;
        break;
      case 'writing':
        iconData = Icons.edit_note_rounded;
        iconColor = AppColors.sky;
        break;
      case 'quiz':
        iconData = Icons.quiz_rounded;
        iconColor = AppColors.amber;
        break;
      default:
        iconData = Icons.school_rounded;
        iconColor = AppColors.emerald;
    }

    final fraction = (mission.progress / mission.target).clamp(0.0, 1.0);

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      child: GlassCard(
        padding: const EdgeInsets.all(18),
        borderRadius: 20,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: iconColor.withValues(alpha: 0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(iconData, color: iconColor, size: 22),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(mission.title, style: AppTypography.titleMedium.copyWith(fontSize: 15)),
                      Text(mission.description, style: AppTypography.caption),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: mission.completed
                        ? AppColors.emerald.withValues(alpha: 0.15)
                        : AppColors.surfaceElevated,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    '+${mission.xpReward} XP',
                    style: AppTypography.caption.copyWith(
                      color: mission.completed ? AppColors.emeraldLight : AppColors.amberLight,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: fraction,
                      minHeight: 6,
                      backgroundColor: AppColors.surfaceLight,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        mission.completed ? AppColors.emerald : iconColor,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  '${mission.progress}/${mission.target}',
                  style: AppTypography.caption.copyWith(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Align(
              alignment: Alignment.centerRight,
              child: mission.completed
                  ? Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.check_circle_rounded, color: AppColors.emeraldLight, size: 16),
                        const SizedBox(width: 4),
                        Text('daily.claimed'.tr(), style: AppTypography.caption.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.bold)),
                      ],
                    )
                  : ScaleOnPress(
                      onTap: () {
                        if (mission.type == 'quiz') {
                          context.push('/daily-quiz');
                        } else {
                          context.go('/journey');
                        }
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                        decoration: BoxDecoration(
                          color: iconColor.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: iconColor.withValues(alpha: 0.3)),
                        ),
                        child: Text(
                          'daily.start_quest'.tr(),
                          style: AppTypography.caption.copyWith(color: iconColor, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSignInPrompt(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 24),
        child: FadeSlideTransition(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.emerald.withValues(alpha: 0.2),
                      blurRadius: 32,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Image.asset(
                  'assets/images/mascotwithschoolbag.png',
                  width: 150,
                  height: 150,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) => const Icon(
                    Icons.lock_person_rounded,
                    size: 80,
                    color: AppColors.emeraldLight,
                  ),
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'daily.title'.tr(),
                textAlign: TextAlign.center,
                style: AppTypography.tamilTitle.copyWith(fontSize: 20),
              ),
              const SizedBox(height: 8),
              Text(
                'daily.sign_in_prompt_desc'.tr(),
                textAlign: TextAlign.center,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.textSecondary,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => context.push('/login'),
                  icon: const Icon(Icons.login_rounded),
                  label: Text(
                    'auth.login'.tr(),
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.emerald,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 4,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () => context.push('/signup'),
                child: Text(
                  'auth.signup'.tr(),
                  style: const TextStyle(color: AppColors.emeraldLight, fontSize: 14),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
