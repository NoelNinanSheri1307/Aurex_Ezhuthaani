import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/gamification/level_system.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/widgets/level_progress_card.dart';
import '../../data/models/badge_model.dart';
import '../../data/models/social_model.dart';

class UserProfileScreen extends ConsumerStatefulWidget {
  final int userId;

  const UserProfileScreen({super.key, required this.userId});

  @override
  ConsumerState<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends ConsumerState<UserProfileScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _heartController;
  late final Animation<double> _heartScale;

  UserProfileModel? _profile;
  bool _isLoading = true;
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    _heartController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 250),
    );
    _heartScale = Tween<double>(begin: 1.0, end: 1.35).animate(
      CurvedAnimation(parent: _heartController, curve: Curves.easeInOut),
    );

    _fetchProfile();
  }

  @override
  void dispose() {
    _heartController.dispose();
    super.dispose();
  }

  Future<void> _fetchProfile() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });
    try {
      final repo = ref.read(socialRepositoryProvider);
      final profile = await repo.getUserProfile(widget.userId);
      if (mounted) {
        setState(() {
          _profile = profile;
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _errorMessage = e.toString();
        });
      }
    }
  }

  Future<void> _toggleLike() async {
    if (_profile == null) return;
    final currentlyLiked = _profile!.hasLiked;
    final originalCount = _profile!.likesCount;
    final newCount = currentlyLiked
        ? (originalCount - 1).clamp(0, 999999)
        : originalCount + 1;

    // 1. Immediate optimistic UI update
    setState(() {
      _profile = _profile!.copyWith(
        hasLiked: !currentlyLiked,
        likesCount: newCount,
      );
    });

    if (!currentlyLiked) {
      _heartController.forward().then((_) => _heartController.reverse());
    }

    try {
      final repo = ref.read(socialRepositoryProvider);
      if (currentlyLiked) {
        final count = await repo.unlikeProfile(widget.userId);
        if (mounted) {
          setState(() {
            _profile = _profile!.copyWith(
              hasLiked: false,
              likesCount: count,
            );
          });
        }
      } else {
        final count = await repo.likeProfile(widget.userId);
        if (mounted) {
          setState(() {
            _profile = _profile!.copyWith(
              hasLiked: true,
              likesCount: count,
            );
          });
        }
      }
      // Targeted cache invalidation without reloading the whole screen
      ref.invalidate(friendsProvider);
      ref.invalidate(socialFeedProvider);
    } catch (e) {
      // Revert state and count on failure, show friendly snackbar
      if (mounted) {
        setState(() {
          _profile = _profile!.copyWith(
            hasLiked: currentlyLiked,
            likesCount: originalCount,
          );
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('விருப்பத்தைப் புதுப்பிக்க முடியவில்லை: $e'),
            backgroundColor: AppColors.rose,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    }
  }

  Future<void> _handleFriendAction() async {
    if (_profile == null) return;
    final repo = ref.read(socialRepositoryProvider);
    final prevStatus = _profile!.friendStatus;

    if (prevStatus == 'NONE') {
      debugPrint('[FRIEND_ACTION]\ntarget_user_id=${widget.userId}\ntarget_username=${_profile?.name ?? ""}\naction=add_friend');
      try {
        final res = await repo.sendFriendRequest(widget.userId);
        final status = res['status'] as String? ?? 'SENT';
        debugPrint('[FRIEND_RESPONSE]\nstatus=$status\nresponse=$res');

        final isAccepted = status == 'ACCEPTED' || status == 'ALREADY_FRIENDS';
        final newStatus = isAccepted ? 'FRIENDS' : 'REQUEST_SENT';

        if (mounted) {
          setState(() {
            _profile = _profile!.copyWith(friendStatus: newStatus);
          });
          final snackMsg = isAccepted
              ? 'நட்புக் கோரிக்கை ஏற்கப்பட்டது! நீங்கள் இப்போது நண்பர்கள் 🎉'
              : (status == 'ALREADY_FRIENDS'
                  ? 'நீங்கள் ஏற்கனவே நண்பர்கள்!'
                  : 'நட்புக் கோரிக்கை அனுப்பப்பட்டது! ✓');
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(snackMsg),
              backgroundColor: AppColors.emerald,
              duration: const Duration(seconds: 2),
            ),
          );
        }
        ref.invalidate(friendRequestsProvider);
        ref.invalidate(friendsProvider);
      } catch (e) {
        debugPrint('[FRIEND_RESPONSE]\nstatus=ERROR\nresponse=$e');
        if (mounted) {
          setState(() {
            _profile = _profile!.copyWith(friendStatus: prevStatus);
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('பிழை: $e'), backgroundColor: AppColors.rose),
          );
        }
      }
    } else if (prevStatus == 'FRIENDS') {
      setState(() {
        _profile = _profile!.copyWith(friendStatus: 'NONE');
      });
      try {
        await repo.removeFriend(widget.userId);
        ref.invalidate(friendsProvider);
        ref.invalidate(friendRequestsProvider);
      } catch (e) {
        if (mounted) {
          setState(() {
            _profile = _profile!.copyWith(friendStatus: prevStatus);
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('பிழை: $e'), backgroundColor: AppColors.rose),
          );
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('சுயவிவரம் • Profile', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: AppColors.background,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchProfile,
          ),
        ],
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(
        child: CircularProgressIndicator(color: AppColors.emerald),
      );
    }

    if (_errorMessage.isNotEmpty || _profile == null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: AppColors.rose),
              const SizedBox(height: 12),
              const Text('சுயவிவரத்தை ஏற்றுவதில் பிழை'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _fetchProfile,
                child: const Text('மீண்டும் முயல்க'),
              ),
            ],
          ),
        ),
      );
    }

    final p = _profile!;
    final levelTitle = LevelSystem.levelTitle(p.level);

    return RefreshIndicator(
      onRefresh: _fetchProfile,
      color: AppColors.emerald,
      backgroundColor: AppColors.surface,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
        children: [
          // Header Profile Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: AppColors.border),
            ),
            child: Column(
              children: [
                // Avatar with Level Ring
                Stack(
                  alignment: Alignment.center,
                  children: [
                    Container(
                      width: 90,
                      height: 90,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: AppColors.emeraldGradient,
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.emerald.withValues(alpha: 0.3),
                            blurRadius: 20,
                            spreadRadius: 2,
                          ),
                        ],
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        p.name.isNotEmpty ? p.name[0].toUpperCase() : '?',
                        style: const TextStyle(
                          fontSize: 38,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.surface,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: AppColors.amber, width: 1.5),
                        ),
                        child: Text(
                          'Lv ${p.level}',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: AppColors.amberLight,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),

                // Name & Title
                Text(
                  p.name,
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  levelTitle,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppColors.emeraldLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 16),

                // Actions: Like Heart Button & Friend Action Button
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Like button
                    InkWell(
                      onTap: _toggleLike,
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                        decoration: BoxDecoration(
                          color: p.hasLiked
                              ? AppColors.rose.withValues(alpha: 0.15)
                              : AppColors.surfaceElevated,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: p.hasLiked ? AppColors.rose : AppColors.border,
                          ),
                        ),
                        child: Row(
                          children: [
                            ScaleTransition(
                              scale: _heartScale,
                              child: Icon(
                                p.hasLiked ? Icons.favorite : Icons.favorite_border,
                                color: p.hasLiked ? AppColors.rose : AppColors.textSecondary,
                                size: 20,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              '${p.likesCount}',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: p.hasLiked ? AppColors.rose : AppColors.textPrimary,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    if (p.friendStatus != 'SELF') ...[
                      const SizedBox(width: 12),
                      _buildFriendActionButton(p.friendStatus),
                    ],
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          // Stats 4-Grid
          Row(
            children: [
              Expanded(child: _buildStatTile('⚡ மொத்தம்', '${p.xp} XP', AppColors.amber)),
              const SizedBox(width: 10),
              Expanded(child: _buildStatTile('⭐ நிலை', 'நிலை ${p.level}', AppColors.sky)),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(child: _buildStatTile('🔥 தொடர்', '${p.streak} நாட்கள்', AppColors.rose)),
              const SizedBox(width: 10),
              Expanded(child: _buildStatTile('🏆 உச்ச சாதனை', '${p.bestStreak} நாட்கள்', AppColors.emerald)),
            ],
          ),

          const SizedBox(height: 16),

          // Reusable Level Progress Card
          LevelProgressCard(xp: p.xp),

          const SizedBox(height: 24),

          // Badges Section
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'பெற்ற பதக்கங்கள் · Badges',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              Text(
                '${p.badges.isNotEmpty ? p.badges.length : p.achievements.length} பதக்கங்கள்',
                style: const TextStyle(fontSize: 12, color: AppColors.amberLight),
              ),
            ],
          ),
          const SizedBox(height: 12),
          if (p.badges.isEmpty && p.achievements.isEmpty)
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border),
              ),
              alignment: Alignment.center,
              child: const Text(
                'இன்னும் பதக்கங்கள் பெறப்படவில்லை',
                style: TextStyle(color: AppColors.textMuted, fontSize: 13),
              ),
            )
          else if (p.badges.isNotEmpty)
            SizedBox(
              height: 108,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: p.badges.length,
                separatorBuilder: (ctx, i) => const SizedBox(width: 10),
                itemBuilder: (ctx, i) {
                  final badge = p.badges[i];
                  final rarity = BadgeRarity.fromString(badge['rarity'] as String?);
                  final rarityColor = rarity.color;
                  return Container(
                    width: 96,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceElevated,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: rarityColor.withValues(alpha: 0.5)),
                      boxShadow: [
                        BoxShadow(
                          color: rarityColor.withValues(alpha: 0.15),
                          blurRadius: 10,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ClipOval(
                          child: Image.asset(
                            BadgeIconMapper.getBadgeAsset(badge['key'] as String? ?? badge['id'] as String?),
                            width: 36,
                            height: 36,
                            fit: BoxFit.cover,
                            errorBuilder: (_, _, _) => Icon(
                              BadgeIconMapper.getIcon(badge['icon'] as String?),
                              size: 32,
                              color: rarityColor,
                            ),
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          badge['name_tamil'] as String? ?? (badge['name'] as String? ?? ''),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: rarityColor,
                          ),
                        ),
                        Text(
                          badge['name'] as String? ?? '',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 9,
                            color: AppColors.textMuted,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            )
          else
            SizedBox(
              height: 100,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: p.achievements.length,
                separatorBuilder: (ctx, i) => const SizedBox(width: 10),
                itemBuilder: (ctx, i) {
                  final ach = p.achievements[i];
                  return Container(
                    width: 90,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceElevated,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.amber.withValues(alpha: 0.3)),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          ach['icon'] as String? ?? '🏆',
                          style: const TextStyle(fontSize: 28),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          ach['title_ta'] as String? ?? (ach['title'] as String? ?? ''),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

          const SizedBox(height: 24),

          // Recent Activities Section
          const Text(
            'சமீபத்திய செயல்பாடுகள்',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 12),
          if (p.recentActivities.isEmpty)
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.border),
              ),
              alignment: Alignment.center,
              child: const Text(
                'சமீபத்திய செயல்பாடுகள் எதுவும் இல்லை',
                style: TextStyle(color: AppColors.textMuted, fontSize: 13),
              ),
            )
          else
            ...p.recentActivities.map((act) => _buildActivityCard(act)),
        ],
      ),
    );
  }

  Widget _buildFriendActionButton(String status) {
    if (status == 'FRIENDS') {
      return ElevatedButton.icon(
        onPressed: _handleFriendAction,
        icon: const Icon(Icons.check, size: 16),
        label: const Text('நண்பர் ✓'),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.emeraldDark,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
      );
    } else if (status == 'REQUEST_SENT') {
      return ElevatedButton(
        onPressed: null,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.surfaceLight,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        child: const Text('அனுப்பப்பட்டது'),
      );
    } else {
      return ElevatedButton.icon(
        onPressed: _handleFriendAction,
        icon: const Icon(Icons.person_add, size: 16),
        label: const Text('நண்பராக்கு'),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.emerald,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
      );
    }
  }

  Widget _buildStatTile(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textMuted)),
          const SizedBox(height: 4),
          Text(
            value,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActivityCard(SocialActivityModel act) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border.withValues(alpha: 0.5)),
      ),
      child: Row(
        children: [
          Text(
            _activityIcon(act.activityType),
            style: const TextStyle(fontSize: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  act.titleTa.isNotEmpty ? act.titleTa : act.title,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                if (act.details != null && act.details!.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(
                    act.details!,
                    style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _activityIcon(String type) {
    switch (type) {
      case 'ACHIEVEMENT':
        return '🏆';
      case 'LEVEL_UP':
        return '👑';
      case 'STREAK':
        return '🔥';
      case 'CROSSWORD':
        return '🧩';
      case 'QUIZ':
        return '🎯';
      default:
        return '📖';
    }
  }
}
