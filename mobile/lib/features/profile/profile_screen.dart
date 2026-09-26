import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/level_progress_card.dart';
import '../../core/widgets/xp_streak_badge.dart';
import '../../data/models/badge_model.dart';
import '../auth/auth_provider.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authNotifierProvider);
    final user = authState.user;

    final name = user?.name.isNotEmpty == true ? user!.name : 'Learner';
    final email = user?.email ?? '';
    final xp = user?.xp ?? 0;
    final level = user?.level ?? 1;
    final streak = user?.streak ?? 0;
    final bestStreak = user?.bestStreak ?? 0;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('profile.title'.tr(), style: AppTypography.titleLarge),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined, color: AppColors.textSecondary),
            onPressed: () => context.push('/settings'),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            children: [
              // User Avatar & Stats Header
              GlassCard(
                padding: const EdgeInsets.all(24),
                child: Column(
                  children: [
                    Container(
                      width: 84,
                      height: 84,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: AppColors.emerald, width: 2.5),
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.emerald.withValues(alpha: 0.25),
                            blurRadius: 16,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: ClipOval(
                        child: Image.asset(
                          'assets/images/mascotlanding.png',
                          fit: BoxFit.cover,
                          errorBuilder: (_, _, _) => CircleAvatar(
                            radius: 40,
                            backgroundColor: AppColors.emerald.withValues(alpha: 0.2),
                            child: Text(
                              name.isNotEmpty ? name[0].toUpperCase() : 'U',
                              style: AppTypography.displayMedium.copyWith(color: AppColors.emeraldLight, fontSize: 32),
                            ),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 14),
                    Text(name, style: AppTypography.titleLarge),
                    const SizedBox(height: 2),
                    Text(email, style: AppTypography.caption),
                    const SizedBox(height: 16),
                    LevelBadge(level: level),
                    const SizedBox(height: 20),
                    const Divider(color: AppColors.border),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Expanded(child: _buildStatCol('profile.total_xp'.tr(), '$xp', Icons.bolt_rounded, AppColors.amberLight)),
                        Expanded(child: _buildStatCol('profile.current_streak'.tr(), '$streak d', Icons.local_fire_department_rounded, AppColors.roseLight)),
                        Expanded(child: _buildStatCol('profile.best_streak'.tr(), '$bestStreak d', Icons.workspace_premium_rounded, AppColors.skyLight)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Reusable Level Progress Card
              LevelProgressCard(
                xp: xp,
                onTap: () => context.push('/leaderboard'),
              ),
              const SizedBox(height: 16),

              // Badges Showcase
              _buildBadgesShowcase(context, ref),
              const SizedBox(height: 20),

              // Action Tiles
              GlassCard(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Column(
                  children: [
                    _buildNavTile(
                      icon: Icons.settings_rounded,
                      color: AppColors.emeraldLight,
                      title: 'profile.settings_tile'.tr(),
                      subtitle: 'profile.settings_subtitle'.tr(),
                      onTap: () => context.push('/settings'),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    _buildNavTile(
                      icon: Icons.military_tech_rounded,
                      color: AppColors.amber,
                      title: 'profile.badges_achievements'.tr(),
                      subtitle: 'profile.badges_subtitle'.tr(),
                      onTap: () => context.push('/badges'),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    _buildNavTile(
                      icon: Icons.bookmark_rounded,
                      color: AppColors.amberLight,
                      title: 'profile.saved_bookmarks'.tr(),
                      subtitle: 'profile.saved_subtitle'.tr(),
                      onTap: () => context.push('/saved'),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    _buildNavTile(
                      icon: Icons.note_alt_rounded,
                      color: AppColors.skyLight,
                      title: 'profile.study_notes'.tr(),
                      subtitle: 'profile.study_notes_subtitle'.tr(),
                      onTap: () => context.push('/notes'),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    _buildNavTile(
                      icon: Icons.emoji_events_rounded,
                      color: AppColors.purpleLight,
                      title: 'profile.leaderboard_tile'.tr(),
                      subtitle: 'profile.leaderboard_subtitle'.tr(),
                      onTap: () => context.push('/leaderboard'),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    _buildNavTile(
                      icon: Icons.auto_awesome_rounded,
                      color: AppColors.emeraldLight,
                      title: 'profile.ai_tutor_tile'.tr(),
                      subtitle: 'profile.ai_tutor_subtitle'.tr(),
                      onTap: () => context.push('/ai'),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Logout Button
              ScaleOnPress(
                onTap: () async {
                  await ref.read(authNotifierProvider.notifier).logout();
                  if (context.mounted) {
                    context.go('/login');
                  }
                },
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    color: AppColors.rose.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: AppColors.rose.withValues(alpha: 0.4)),
                  ),
                  child: Center(
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.logout_rounded, color: AppColors.roseLight, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          'profile.sign_out'.tr(),
                          style: AppTypography.titleMedium.copyWith(color: AppColors.roseLight),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatCol(String label, String value, IconData icon, Color color) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: color, size: 22),
        const SizedBox(height: 4),
        Text(value, style: AppTypography.titleMedium),
        FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(
            label,
            maxLines: 1,
            style: AppTypography.caption.copyWith(fontSize: 10),
          ),
        ),
      ],
    );
  }

  Widget _buildNavTile({
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.transparent,
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.15),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        title: Text(title, style: AppTypography.titleMedium.copyWith(fontSize: 14)),
        subtitle: Text(subtitle, style: AppTypography.caption),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14, color: AppColors.textMuted),
        onTap: onTap,
      ),
    );
  }

  Widget _buildBadgesShowcase(BuildContext context, WidgetRef ref) {
    final badgesAsync = ref.watch(myBadgesProvider);

    return badgesAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, _) => const SizedBox.shrink(),
      data: (badges) {
        final unlocked = badges.where((b) => b.isUnlocked).toList();
        final previewBadges = unlocked.take(4).toList();

        return Container(
          width: double.infinity,
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(22),
            border: Border.all(
              color: AppColors.amber.withValues(alpha: 0.35),
              width: 1.2,
            ),
            boxShadow: [
              BoxShadow(
                color: AppColors.amber.withValues(alpha: 0.08),
                blurRadius: 18,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Row(
                      children: [
                        const Icon(Icons.military_tech_rounded, color: AppColors.amber, size: 22),
                        const SizedBox(width: 8),
                        Flexible(
                          child: Text(
                            'profile.badges_showcase'.tr(),
                            style: AppTypography.titleMedium.copyWith(
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                  InkWell(
                    onTap: () => context.push('/badges'),
                    borderRadius: BorderRadius.circular(8),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      child: Row(
                        children: [
                          Text(
                            '${unlocked.length} / ${badges.length}',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: AppColors.amberLight,
                            ),
                          ),
                          const SizedBox(width: 4),
                          const Icon(Icons.arrow_forward_ios_rounded, size: 12, color: AppColors.amberLight),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              if (previewBadges.isEmpty)
                Text(
                  'பாடங்கள் மற்றும் புதிர்களை முடித்து பதக்கங்களை வெல்லுங்கள்!\nComplete lessons and puzzles to earn collectible badges.',
                  style: AppTypography.caption.copyWith(color: AppColors.textMuted),
                )
              else
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: previewBadges.map((badge) {
                    final color = badge.rarity.color;
                    return InkWell(
                      onTap: () => context.push('/badges'),
                      borderRadius: BorderRadius.circular(16),
                      child: Column(
                        children: [
                          BadgeArtWidget(
                            badge: badge,
                            size: 52,
                            showLockWhenLocked: false,
                          ),
                          const SizedBox(height: 6),
                          SizedBox(
                            width: 64,
                            child: Text(
                              badge.nameTamil,
                              textAlign: TextAlign.center,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: color,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
            ],
          ),
        );
      },
    );
  }
}
