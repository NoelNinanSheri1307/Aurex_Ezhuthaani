import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/gamification/level_system.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../core/widgets/xp_streak_badge.dart';

class LeaderboardScreen extends ConsumerStatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  ConsumerState<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends ConsumerState<LeaderboardScreen> {
  String _type = 'global'; // 'global' or 'friends'

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('leaderboard.title'.tr(), style: AppTypography.titleLarge),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
      ),
      body: Column(
        children: [
          // Segmented Switcher (Global vs Friends)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: _buildSegmentButton(
                      id: 'global',
                      label: 'leaderboard.global_tab'.tr(),
                      selected: _type == 'global',
                    ),
                  ),
                  Expanded(
                    child: _buildSegmentButton(
                      id: 'friends',
                      label: 'leaderboard.friends_tab'.tr(),
                      selected: _type == 'friends',
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Leaderboard List
          Expanded(
            child: FutureBuilder<List<Map<String, dynamic>>>(
              key: ValueKey(_type),
              future: ref.read(dailyRepositoryProvider).getLeaderboard(type: _type),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return LoadingView(message: 'leaderboard.loading'.tr());
                }
                if (snapshot.hasError) {
                  return ErrorView(message: snapshot.error.toString());
                }

                final leaders = snapshot.data ?? [];
                if (leaders.isEmpty) {
                  return EmptyStateView(
                    title: _type == 'friends'
                        ? 'leaderboard.empty_friends_title'.tr()
                        : 'leaderboard.empty_global_title'.tr(),
                    message: _type == 'friends'
                        ? 'leaderboard.empty_friends_msg'.tr()
                        : 'leaderboard.empty_global_msg'.tr(),
                    icon: _type == 'friends' ? Icons.people_outline : Icons.emoji_events_outlined,
                  );
                }

                return ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                  itemCount: leaders.length,
                  separatorBuilder: (_, _) => const SizedBox(height: 10),
                  itemBuilder: (context, index) {
                    final leader = leaders[index];
                    final rank = index + 1;
                    final userId = leader['id'] as int?;
                    final name = leader['name'] as String? ?? 'User';
                    final xp = leader['xp'] as int? ?? 0;
                    final streak = leader['streak'] as int? ?? 0;
                    final level = leader['level'] as int? ?? LevelSystem.levelForXp(xp);

                    Color rankColor = AppColors.textMuted;
                    if (rank == 1) rankColor = AppColors.amberLight;
                    if (rank == 2) rankColor = Colors.grey.shade300;
                    if (rank == 3) rankColor = const Color(0xFFCD7F32); // Bronze

                    return FadeSlideTransition(
                      delay: Duration(milliseconds: index * 35),
                      child: InkWell(
                        onTap: userId != null ? () => context.push('/user/$userId') : null,
                        borderRadius: BorderRadius.circular(18),
                        child: GlassCard(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                          borderRadius: 18,
                          child: Row(
                            children: [
                              Container(
                                width: 38,
                                height: 38,
                                decoration: BoxDecoration(
                                  color: rank <= 3
                                      ? rankColor.withValues(alpha: 0.2)
                                      : AppColors.surfaceElevated,
                                  shape: BoxShape.circle,
                                  border: rank <= 3
                                      ? Border.all(color: rankColor, width: 1.5)
                                      : null,
                                ),
                                child: Center(
                                  child: rank <= 3
                                      ? Icon(Icons.emoji_events_rounded, color: rankColor, size: 20)
                                      : Text(
                                          '$rank',
                                          style: AppTypography.titleMedium.copyWith(
                                            color: AppColors.textSecondary,
                                          ),
                                        ),
                                ),
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Text(name, style: AppTypography.titleMedium.copyWith(fontSize: 15)),
                                        const SizedBox(width: 6),
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                                          decoration: BoxDecoration(
                                            color: AppColors.surfaceLight,
                                            borderRadius: BorderRadius.circular(6),
                                          ),
                                          child: Text(
                                            'Lv $level',
                                            style: const TextStyle(
                                              fontSize: 10,
                                              fontWeight: FontWeight.bold,
                                              color: AppColors.amberLight,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Text('leaderboard.streak_days'.tr(args: [streak.toString()]), style: AppTypography.caption.copyWith(color: AppColors.roseLight)),
                                  ],
                                ),
                              ),
                              XPBadge(xp: xp, isCompact: true),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSegmentButton({
    required String id,
    required String label,
    required bool selected,
  }) {
    return InkWell(
      onTap: () => setState(() => _type = id),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: selected ? AppColors.surfaceLight : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: selected ? FontWeight.bold : FontWeight.w500,
            color: selected ? AppColors.textPrimary : AppColors.textMuted,
          ),
        ),
      ),
    );
  }
}
