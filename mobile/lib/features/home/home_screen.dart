import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/gamification/level_system.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/gradient_card.dart';
import '../../core/widgets/level_progress_card.dart';
import '../../core/widgets/streak_card.dart';
import '../../core/widgets/xp_streak_badge.dart';
import '../../data/models/thirukkural_model.dart';
import '../auth/auth_provider.dart';
import '../mascot/mascot_widget.dart';
import '../social/social_feed_widget.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  KuralModel? _dailyKural;
  bool _isLoadingKural = true;

  @override
  void initState() {
    super.initState();
    _loadDailyKural();
  }

  Future<void> _loadDailyKural() async {
    try {
      final kural = await ref.read(thirukkuralRepositoryProvider).getKuralOfTheDay();
      if (mounted) {
        setState(() {
          _dailyKural = kural;
          _isLoadingKural = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _isLoadingKural = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authNotifierProvider);
    final user = authState.user;

    final name = user?.name.isNotEmpty == true ? user!.name : 'Learner';
    final xp = user?.xp ?? 0;
    final streak = user?.streak ?? 0;
    final level = user?.level ?? LevelSystem.levelForXp(xp);
    final levelTitle = LevelSystem.levelTitle(level);

    return Scaffold(
      backgroundColor: AppColors.background,
      floatingActionButton: ScaleOnPress(
        onTap: () => context.push('/ai'),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          decoration: BoxDecoration(
            gradient: AppColors.purpleGradient,
            borderRadius: BorderRadius.circular(30),
            boxShadow: [
              BoxShadow(
                color: AppColors.purple.withValues(alpha: 0.4),
                blurRadius: 18,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 20),
              const SizedBox(width: 8),
              Text(
                'home.ai_tutor'.tr(),
                style: AppTypography.titleMedium.copyWith(color: Colors.white, fontSize: 14),
              ),
            ],
          ),
        ),
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: () async {
            await ref.read(authNotifierProvider.notifier).refreshUser();
            await _loadDailyKural();
            ref.invalidate(socialFeedProvider);
          },
          color: AppColors.emerald,
          backgroundColor: AppColors.surface,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top App Bar Greeting Row
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 50),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: 42,
                        height: 42,
                        margin: const EdgeInsets.only(right: 12),
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: AppColors.emerald.withValues(alpha: 0.6),
                            width: 1.5,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.emerald.withValues(alpha: 0.25),
                              blurRadius: 10,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: ClipOval(
                          child: Image.asset(
                            'assets/images/icon.png',
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              'home.greeting'.tr(args: [name]),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: AppTypography.titleLarge.copyWith(
                                fontSize: 18,
                                color: AppColors.emeraldLight,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              levelTitle,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          ScaleOnPress(
                            onTap: () => context.push('/leaderboard'),
                            child: XPBadge(xp: xp, isCompact: true),
                          ),
                          const SizedBox(width: 6),
                          ScaleOnPress(
                            onTap: () => context.push('/daily'),
                            child: StreakBadge(streak: streak, isCompact: true),
                          ),
                          const SizedBox(width: 6),
                          ScaleOnPress(
                            onTap: () => context.push('/profile'),
                            child: CircleAvatar(
                              radius: 17,
                              backgroundColor: AppColors.surfaceElevated,
                              child: Text(
                                name.isNotEmpty ? name[0].toUpperCase() : 'U',
                                style: AppTypography.titleMedium.copyWith(
                                  color: AppColors.emeraldLight,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Animated Mascot Hero Section (Ezhuthaani Elephant)
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 80),
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    alignment: Alignment.center,
                    child: const MascotWidget(
                      size: 125,
                      showSpeechBubble: true,
                      interactive: true,
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Streak Flame Card
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 100),
                  child: StreakCard(
                    currentStreak: streak,
                    bestStreak: streak > 0 ? streak + 2 : 0,
                    completedToday: streak > 0,
                    onTap: () => context.push('/daily'),
                  ),
                ),
                const SizedBox(height: 16),

                // Level Progress Card
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 110),
                  child: LevelProgressCard(
                    xp: xp,
                    onTap: () => context.push('/leaderboard'),
                  ),
                ),
                const SizedBox(height: 20),

                // Main Hero: Continue Learning Journey Card
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 120),
                  child: GradientCard(
                    gradient: AppColors.heroGradient,
                    borderRadius: 24,
                    onTap: () => context.go('/journey'),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                              decoration: BoxDecoration(
                                color: AppColors.emerald.withValues(alpha: 0.2),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: AppColors.emeraldLight.withValues(alpha: 0.5)),
                              ),
                              child: Text(
                                'home.resume_learning'.tr(),
                                style: AppTypography.caption.copyWith(
                                  color: AppColors.emeraldLight,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 1,
                                ),
                              ),
                            ),
                            LevelBadge(level: level),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'home.fundamentals'.tr(),
                          style: AppTypography.displayMedium.copyWith(fontSize: 22),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'home.master_vowels'.tr(),
                          style: AppTypography.bodyMedium,
                        ),
                        const SizedBox(height: 20),
                        Row(
                          children: [
                            Expanded(
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: LinearProgressIndicator(
                                  value: LevelSystem.levelProgress(xp),
                                  minHeight: 8,
                                  backgroundColor: AppColors.surfaceLight,
                                  valueColor: const AlwaysStoppedAnimation<Color>(AppColors.emerald),
                                ),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Text(
                              '${(LevelSystem.levelProgress(xp) * 100).toInt()}%',
                              style: AppTypography.caption.copyWith(
                                color: AppColors.emeraldLight,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 18),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'home.xp_reward'.tr(args: ['20']),
                              style: AppTypography.caption.copyWith(color: AppColors.amberLight),
                            ),
                            Row(
                              children: [
                                Text('home.resume'.tr(), style: AppTypography.titleMedium.copyWith(color: Colors.white, fontSize: 14)),
                                const SizedBox(width: 4),
                                const Icon(Icons.arrow_forward_rounded, color: Colors.white, size: 16),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // Interactive Speak Tamil (🗣️ பேசலாம்!) Hero Banner
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 130),
                  child: ScaleOnPress(
                    onTap: () => context.push('/speak'),
                    child: Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Color(0xFF065F46), Color(0xFF047857), Color(0xFF0F766E)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(22),
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.emeraldDark.withValues(alpha: 0.4),
                            blurRadius: 16,
                            offset: const Offset(0, 6),
                          ),
                        ],
                        border: Border.all(
                          color: AppColors.emeraldLight.withValues(alpha: 0.35),
                          width: 1.2,
                        ),
                      ),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: const Text('🗣️', style: TextStyle(fontSize: 32)),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Flexible(
                                      child: Text(
                                        'home.speak_tamil_banner'.tr(),
                                        style: AppTypography.titleMedium.copyWith(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 15,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  'home.speak_tamil_desc'.tr(),
                                  style: TextStyle(
                                    color: Colors.white.withValues(alpha: 0.9),
                                    fontSize: 11,
                                    height: 1.2,
                                  ),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 6),
                                Row(
                                  children: [
                                    const Icon(Icons.bolt, color: AppColors.amberLight, size: 14),
                                    const SizedBox(width: 4),
                                    Flexible(
                                      child: Text(
                                        '+80 XP • 8 காட்சிகள் (8 Scenarios)',
                                        style: const TextStyle(
                                          color: AppColors.amberLight,
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.arrow_forward_ios_rounded, color: Colors.white, size: 16),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // 4-Card Quick Action Hub
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 140),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'home.quick_practice'.tr(),
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: _buildActionTile(
                              context,
                              title: 'flashcards.title'.tr(),
                              subtitle: 'flashcards.decks'.tr(),
                              badge: '+60 XP',
                              icon: '🎴',
                              color: AppColors.emerald,
                              onTap: () => context.push('/flashcards'),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildActionTile(
                              context,
                              title: 'daily.daily_quiz'.tr(),
                              subtitle: 'common.start'.tr(),
                              badge: '+50 XP',
                              icon: '🎯',
                              color: AppColors.amber,
                              onTap: () => context.push('/daily-quiz'),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: _buildActionTile(
                              context,
                              title: 'daily.crossword'.tr(),
                              subtitle: 'daily.play_crossword'.tr(),
                              badge: '+60 XP',
                              icon: '🧩',
                              color: AppColors.emerald,
                              onTap: () => context.push('/crossword'),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildActionTile(
                              context,
                              title: 'achievements.title'.tr(),
                              subtitle: 'common.level'.tr(),
                              badge: '+XP',
                              icon: '🏆',
                              color: AppColors.purple,
                              onTap: () => context.push('/achievements'),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: _buildActionTile(
                              context,
                              title: 'social.friends'.tr(),
                              subtitle: 'social.title'.tr(),
                              badge: 'Social',
                              icon: '👥',
                              color: AppColors.sky,
                              onTap: () => context.push('/friends'),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildActionTile(
                              context,
                              title: 'nav.speak'.tr(),
                              subtitle: 'speak.say_naturally'.tr(),
                              badge: 'Audio',
                              icon: '🗣️',
                              color: AppColors.rose,
                              onTap: () => context.push('/speak'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Social Friend Feed Widget
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 160),
                  child: const SocialFeedWidget(maxItems: 4),
                ),
                const SizedBox(height: 24),

                // Daily Thirukkural Feature Card
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 180),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.menu_book_rounded, color: AppColors.amberLight, size: 20),
                              const SizedBox(width: 8),
                              Text('home.daily_kural_title'.tr(), style: AppTypography.titleMedium),
                            ],
                          ),
                          TextButton(
                            onPressed: () => context.go('/thirukkural'),
                            child: Text(
                              'home.view_kural'.tr(),
                              style: AppTypography.caption.copyWith(color: AppColors.amberLight),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      GlassCard(
                        padding: const EdgeInsets.all(20),
                        child: _isLoadingKural || _dailyKural == null
                            ? const Center(
                                child: Padding(
                                  padding: EdgeInsets.all(12.0),
                                  child: CircularProgressIndicator(color: AppColors.amber, strokeWidth: 2),
                                ),
                              )
                            : Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                        decoration: BoxDecoration(
                                          color: AppColors.amber.withValues(alpha: 0.15),
                                          borderRadius: BorderRadius.circular(12),
                                          border: Border.all(color: AppColors.amber.withValues(alpha: 0.3)),
                                        ),
                                        child: Text(
                                          'KURAL #${_dailyKural!.number}',
                                          style: AppTypography.caption.copyWith(
                                            color: AppColors.amberLight,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ),
                                      IconButton(
                                        icon: const Icon(Icons.volume_up_rounded, color: AppColors.amberLight, size: 20),
                                        onPressed: () {
                                          final text = '${_dailyKural!.line1} ${_dailyKural!.line2}';
                                          ref.read(ttsServiceProvider).speak(text);
                                        },
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  Text(
                                    _dailyKural!.line1,
                                    style: AppTypography.tamilKural,
                                  ),
                                  Text(
                                    _dailyKural!.line2,
                                    style: AppTypography.tamilKural,
                                  ),
                                  const SizedBox(height: 12),
                                  const Divider(color: AppColors.border),
                                  const SizedBox(height: 8),
                                  Text(
                                    _dailyKural!.translation,
                                    style: AppTypography.bodyMedium.copyWith(fontStyle: FontStyle.italic),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    _dailyKural!.mv,
                                    style: AppTypography.bodyMedium.copyWith(color: AppColors.textSecondary, fontSize: 12),
                                  ),
                                ],
                              ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Explore Tamil Cultural Heritage Carousel
                FadeSlideTransition(
                  delay: const Duration(milliseconds: 200),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('culture.title'.tr(), style: AppTypography.titleMedium),
                          TextButton(
                            onPressed: () => context.go('/culture'),
                            child: Text(
                              'common.view_all'.tr(),
                              style: AppTypography.caption.copyWith(color: AppColors.emeraldLight),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        height: 140,
                        child: ListView(
                          scrollDirection: Axis.horizontal,
                          children: [
                            _buildHeritageCategoryCard(
                              context,
                              title: 'Art & Architecture',
                              subtitle: 'Brihadisvara & Chola Bronzes',
                              color: AppColors.emerald,
                              icon: Icons.temple_hindu_rounded,
                              onTap: () => context.go('/culture'),
                            ),
                            const SizedBox(width: 12),
                            _buildHeritageCategoryCard(
                              context,
                              title: 'History & Dynasties',
                              subtitle: 'Sangam, Chola, Pandya',
                              color: AppColors.purple,
                              icon: Icons.history_edu_rounded,
                              onTap: () => context.go('/culture'),
                            ),
                            const SizedBox(width: 12),
                            _buildHeritageCategoryCard(
                              context,
                              title: 'Rock Inscriptions',
                              subtitle: 'Tamil-Brahmi & Vatteluttu',
                              color: AppColors.sky,
                              icon: Icons.auto_stories_rounded,
                              onTap: () => context.go('/culture'),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionTile(
    BuildContext context, {
    required String title,
    required String subtitle,
    required String badge,
    required String icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return ScaleOnPress(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
        decoration: BoxDecoration(
          color: AppColors.surfaceElevated,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withValues(alpha: 0.3)),
        ),
        child: Row(
          children: [
            Text(icon, style: const TextStyle(fontSize: 20)),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Text(
                    subtitle,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 10,
                      color: AppColors.textMuted,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                badge,
                style: TextStyle(
                  fontSize: 9,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeritageCategoryCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required Color color,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return ScaleOnPress(
      onTap: onTap,
      child: Container(
        width: 200,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [color.withValues(alpha: 0.2), AppColors.surface],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: color.withValues(alpha: 0.3)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.2),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 20),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: AppTypography.titleMedium.copyWith(fontSize: 14)),
                const SizedBox(height: 2),
                Text(subtitle, style: AppTypography.caption.copyWith(fontSize: 10)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
