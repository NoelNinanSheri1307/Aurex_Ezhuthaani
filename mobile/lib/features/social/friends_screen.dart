import 'dart:async';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/gamification/level_system.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../data/models/badge_model.dart';
import '../../data/models/social_model.dart';

class FriendsScreen extends ConsumerStatefulWidget {
  const FriendsScreen({super.key});

  @override
  ConsumerState<FriendsScreen> createState() => _FriendsScreenState();
}

class _FriendsScreenState extends ConsumerState<FriendsScreen>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;
  final TextEditingController _searchCtrl = TextEditingController();
  Timer? _debounceTimer;

  bool _isSearching = false;
  List<UserSearchResultModel> _searchResults = [];
  String _searchError = '';
  List<UserSearchResultModel> _suggestedUsers = [];
  bool _isLoadingSuggestions = false;
  int _discoverCategory = 0; // 0: All, 1: On Streak, 2: Top Learners
  int? _currentUserId;
  final Set<int> _pendingActionUserIds = {};

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _loadCurrentUserId();
    _loadSuggestedUsers();
  }

  Future<void> _loadCurrentUserId() async {
    final uid = await ref.read(secureStorageProvider).getUserId();
    if (mounted) {
      setState(() => _currentUserId = uid);
      if (_suggestedUsers.isNotEmpty && uid != null) {
        setState(() {
          _suggestedUsers = _suggestedUsers.where((u) => u.id != uid).toList();
        });
      }
    }
  }

  Future<void> _loadSuggestedUsers() async {
    setState(() => _isLoadingSuggestions = true);
    try {
      final repo = ref.read(socialRepositoryProvider);
      final results = await repo.searchUsers('');
      if (mounted) {
        setState(() {
          _suggestedUsers = _currentUserId != null
              ? results.where((u) => u.id != _currentUserId).toList()
              : results;
          _isLoadingSuggestions = false;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _isLoadingSuggestions = false);
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchCtrl.dispose();
    _debounceTimer?.cancel();
    super.dispose();
  }

  void _onSearchChanged(String query) {
    _debounceTimer?.cancel();
    final trimmed = query.trim();
    if (trimmed.isEmpty) {
      setState(() {
        _searchResults = [];
        _isSearching = false;
        _searchError = '';
      });
      return;
    }

    _debounceTimer = Timer(const Duration(milliseconds: 350), () async {
      setState(() {
        _isSearching = true;
        _searchError = '';
      });
      try {
        final repo = ref.read(socialRepositoryProvider);
        final results = await repo.searchUsers(trimmed);
        if (mounted) {
          setState(() {
            _searchResults = _currentUserId != null
                ? results.where((u) => u.id != _currentUserId).toList()
                : results;
            _isSearching = false;
          });
        }
      } catch (e) {
        if (mounted) {
          setState(() {
            _isSearching = false;
            _searchError = 'தேடலில் பிழை ஏற்பட்டது';
          });
        }
      }
    });
  }

  Future<void> _sendFriendRequest(int targetUserId, [String targetUsername = '']) async {
    if (_pendingActionUserIds.contains(targetUserId)) return;
    setState(() => _pendingActionUserIds.add(targetUserId));

    debugPrint('[FRIEND_ACTION]\ntarget_user_id=$targetUserId\ntarget_username=$targetUsername\naction=add_friend');
    try {
      final repo = ref.read(socialRepositoryProvider);
      final res = await repo.sendFriendRequest(targetUserId);
      final status = res['status'] as String? ?? 'SENT';
      debugPrint('[FRIEND_RESPONSE]\nstatus=$status\nresponse=$res');

      if (mounted) {
        final isAccepted = status == 'ACCEPTED';
        final isAlreadyFriends = status == 'ALREADY_FRIENDS';
        final newStatus = (isAccepted || isAlreadyFriends) ? 'FRIENDS' : 'REQUEST_SENT';

        // 1. Immediately update local card state so UI button reflects actual backend state
        setState(() {
          _suggestedUsers = _suggestedUsers.map((u) {
            return u.id == targetUserId ? u.copyWith(friendStatus: newStatus) : u;
          }).toList();

          _searchResults = _searchResults.map((u) {
            return u.id == targetUserId ? u.copyWith(friendStatus: newStatus) : u;
          }).toList();
        });

        // 2. Friendly feedback
        final snackMsg = isAccepted
            ? 'நட்புக் கோரிக்கை ஏற்கப்பட்டது! நீங்கள் இப்போது நண்பர்கள் 🎉'
            : (isAlreadyFriends
                ? 'நீங்கள் ஏற்கனவே நண்பர்கள்!'
                : 'நட்புக் கோரிக்கை அனுப்பப்பட்டது! ✓');

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(snackMsg),
            backgroundColor: AppColors.emerald,
            duration: const Duration(seconds: 3),
          ),
        );

        // 3. Invalidate caches so friends & requests refresh
        ref.invalidate(friendRequestsProvider);
        if (isAccepted || isAlreadyFriends) {
          ref.invalidate(friendsProvider);
        }

        // 4. Reload suggested users from backend in background to keep data fresh
        _loadSuggestedUsers();
        if (_searchCtrl.text.trim().isNotEmpty) {
          _onSearchChanged(_searchCtrl.text);
        }
      }
    } catch (e) {
      debugPrint('[FRIEND_RESPONSE]\nstatus=ERROR\nresponse=$e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('பிழை: $e'),
            backgroundColor: AppColors.rose,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _pendingActionUserIds.remove(targetUserId));
      }
    }
  }

  Future<void> _acceptRequest(int requestId) async {
    try {
      final repo = ref.read(socialRepositoryProvider);
      await repo.acceptFriendRequest(requestId);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('நட்புக் கோரிக்கை ஏற்கப்பட்டது! 🎉'),
            backgroundColor: AppColors.emerald,
          ),
        );
        ref.invalidate(friendsProvider);
        ref.invalidate(friendRequestsProvider);
        _loadSuggestedUsers();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('பிழை: $e'),
            backgroundColor: AppColors.rose,
          ),
        );
      }
    }
  }

  Future<void> _rejectRequest(int requestId) async {
    try {
      final repo = ref.read(socialRepositoryProvider);
      await repo.rejectFriendRequest(requestId);
      if (mounted) {
        ref.invalidate(friendRequestsProvider);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('பிழை: $e'),
            backgroundColor: AppColors.rose,
          ),
        );
      }
    }
  }

  Future<void> _removeFriend(int friendId, String name) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surfaceElevated,
        title: const Text('நண்பரை நீக்கவா?'),
        content: Text('$name என்பவரை உங்கள் நண்பர்கள் பட்டியலிலிருந்து நீக்க விரும்புகிறீர்களா?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('இல்லை', style: TextStyle(color: AppColors.textMuted)),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, true),
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.rose),
            child: const Text('நீக்கு'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      try {
        final repo = ref.read(socialRepositoryProvider);
        await repo.removeFriend(friendId);
        ref.invalidate(friendsProvider);
        ref.invalidate(friendRequestsProvider);
        _loadSuggestedUsers();
      } catch (e) {
        if (mounted) {
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
        title: Text(
          'social.friends_title'.tr(),
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: AppColors.background,
        elevation: 0,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.emerald,
          indicatorWeight: 3,
          labelColor: AppColors.emeraldLight,
          unselectedLabelColor: AppColors.textSecondary,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
          tabs: [
            Tab(text: 'social.friends_title'.tr()),
            Tab(text: 'social.requests_tab'.tr()),
            Tab(text: 'social.discover_tab'.tr()),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildFriendsTab(),
          _buildRequestsTab(),
          _buildDiscoverTab(),
        ],
      ),
    );
  }

  // TAB 1: Friends List
  Widget _buildFriendsTab() {
    final friendsAsync = ref.watch(friendsProvider);

    return friendsAsync.when(
      loading: () => const Center(child: CircularProgressIndicator(color: AppColors.emerald)),
      error: (err, stack) => Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 44, color: AppColors.rose),
            const SizedBox(height: 10),
            const Text('நண்பர்களை ஏற்றுவதில் பிழை'),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => ref.refresh(friendsProvider),
              child: const Text('மீண்டும் முயல்க'),
            ),
          ],
        ),
      ),
      data: (friends) {
        final activeFriends = _currentUserId != null
            ? friends.where((f) => f.id != _currentUserId).toList()
            : friends;

        if (activeFriends.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppColors.emerald.withValues(alpha: 0.15),
                    ),
                    child: const Center(
                      child: Text('👥', style: TextStyle(fontSize: 34)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'social.no_friends_title'.tr(),
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'social.no_friends_desc'.tr(),
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 13, color: AppColors.textMuted),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    onPressed: () => _tabController.animateTo(2),
                    icon: const Icon(Icons.person_add),
                    label: Text('social.find_friends_btn'.tr()),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.emerald,
                      foregroundColor: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () async => ref.refresh(friendsProvider.future),
          color: AppColors.emerald,
          backgroundColor: AppColors.surface,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            itemCount: activeFriends.length,
            separatorBuilder: (ctx, i) => const SizedBox(height: 10),
            itemBuilder: (ctx, index) {
              final friend = activeFriends[index];
              return _buildFriendCard(friend);
            },
          ),
        );
      },
    );
  }

  Widget _buildFriendCard(FriendModel friend) {
    final title = LevelSystem.levelTitle(friend.level);

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => context.push('/user/${friend.id}'),
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.surfaceElevated,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.border),
          ),
          child: Row(
            children: [
              // Avatar with Level Ring
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: AppColors.emeraldGradient,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      friend.name.isNotEmpty ? friend.name[0].toUpperCase() : '?',
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: -2,
                    right: -2,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                      decoration: BoxDecoration(
                        color: AppColors.surface,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.amber, width: 1),
                      ),
                      child: Text(
                        'Lv ${friend.level}',
                        style: const TextStyle(
                          fontSize: 9,
                          fontWeight: FontWeight.bold,
                          color: AppColors.amberLight,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 14),

              // Name & Stats
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      friend.name,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'நிலை ${friend.level} • $title',
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.emeraldLight,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Wrap(
                      spacing: 10,
                      runSpacing: 4,
                      children: [
                        Text(
                          '⚡ ${friend.xp} XP',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: AppColors.amberLight,
                          ),
                        ),
                        Text(
                          '🔥 ${friend.streak}d streak',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: AppColors.roseLight,
                          ),
                        ),
                        if (friend.badgesCount > 0)
                          Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              ...friend.badgesPreview.map((iconKey) => Padding(
                                padding: const EdgeInsets.only(right: 3),
                                child: ClipOval(
                                  child: Image.asset(
                                    BadgeIconMapper.getBadgeAsset(iconKey),
                                    width: 14,
                                    height: 14,
                                    fit: BoxFit.cover,
                                    errorBuilder: (_, _, _) => Icon(
                                      BadgeIconMapper.getIcon(iconKey),
                                      size: 13,
                                      color: AppColors.amber,
                                    ),
                                  ),
                                ),
                              )),
                              const SizedBox(width: 2),
                              Text(
                                '${friend.badgesCount} badges',
                                style: const TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.amberLight,
                                ),
                              ),
                            ],
                          )
                        else if (friend.achievementsCount > 0)
                          Text(
                            '🏆 ${friend.achievementsCount} badges',
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: AppColors.amberLight,
                            ),
                          ),
                        if (friend.likesCount > 0)
                          Text(
                            '❤️ ${friend.likesCount}',
                            style: const TextStyle(
                              fontSize: 11,
                              color: AppColors.roseLight,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                      ],
                    ),
                    if (friend.recentActivity != null && friend.recentActivity!.isNotEmpty) ...[
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceLight.withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          '“${friend.recentActivity}”',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 10, color: AppColors.textMuted, fontStyle: FontStyle.italic),
                        ),
                      ),
                    ],
                  ],
                ),
              ),

              // Actions menu
              PopupMenuButton<String>(
                icon: const Icon(Icons.more_vert, color: AppColors.textMuted),
                color: AppColors.surfaceElevated,
                onSelected: (val) {
                  if (val == 'profile') {
                    context.push('/user/${friend.id}');
                  } else if (val == 'remove') {
                    _removeFriend(friend.id, friend.name);
                  }
                },
                itemBuilder: (ctx) => [
                  const PopupMenuItem(
                    value: 'profile',
                    child: Text('சுயவிவரம் பார்க்க'),
                  ),
                  const PopupMenuItem(
                    value: 'remove',
                    child: Text('நண்பரை நீக்குக', style: TextStyle(color: AppColors.rose)),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  // TAB 2: Friend Requests
  Widget _buildRequestsTab() {
    final requestsAsync = ref.watch(friendRequestsProvider);

    return requestsAsync.when(
      loading: () => const Center(child: CircularProgressIndicator(color: AppColors.emerald)),
      error: (err, stack) => Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 44, color: AppColors.rose),
            const SizedBox(height: 10),
            const Text('கோரிக்கைகளை ஏற்றுவதில் பிழை'),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => ref.refresh(friendRequestsProvider),
              child: const Text('மீண்டும் முயல்க'),
            ),
          ],
        ),
      ),
      data: (container) {
        final incoming = container.incoming;
        final outgoing = container.outgoing;

        if (incoming.isEmpty && outgoing.isEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 68,
                    height: 68,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: AppColors.surfaceElevated,
                    ),
                    child: const Center(
                      child: Text('📬', style: TextStyle(fontSize: 32)),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'கோரிக்கைகள் எதுவும் இல்லை',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'புதிய நண்பர்களைத் தேடிக் கோரிக்கைகளை அனுப்புங்கள்!',
                    style: TextStyle(fontSize: 12, color: AppColors.textMuted),
                  ),
                ],
              ),
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: () async => ref.refresh(friendRequestsProvider.future),
          color: AppColors.emerald,
          backgroundColor: AppColors.surface,
          child: ListView(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            children: [
              if (incoming.isNotEmpty) ...[
                Text(
                  'வந்த கோரிக்கைகள் (${incoming.length})',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: AppColors.emeraldLight,
                  ),
                ),
                const SizedBox(height: 10),
                ...incoming.map((req) => _buildIncomingRequestCard(req)),
                const SizedBox(height: 20),
              ],
              if (outgoing.isNotEmpty) ...[
                Text(
                  'அனுப்பிய கோரிக்கைகள் (${outgoing.length})',
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 10),
                ...outgoing.map((req) => _buildOutgoingRequestCard(req)),
              ],
            ],
          ),
        );
      },
    );
  }

  Widget _buildIncomingRequestCard(FriendRequestModel req) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.emerald.withValues(alpha: 0.3)),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 22,
            backgroundColor: AppColors.emerald,
            child: Text(
              req.name.isNotEmpty ? req.name[0].toUpperCase() : '?',
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  req.name,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                Text(
                  'நிலை ${req.level}  •  ${req.xp} XP',
                  style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.check_circle, color: AppColors.emeraldLight, size: 28),
            onPressed: () => _acceptRequest(req.requestId),
            tooltip: 'ஏற்கவும்',
          ),
          IconButton(
            icon: const Icon(Icons.cancel, color: AppColors.rose, size: 28),
            onPressed: () => _rejectRequest(req.requestId),
            tooltip: 'நிராகரிக்கவும்',
          ),
        ],
      ),
    );
  }

  Widget _buildOutgoingRequestCard(FriendRequestModel req) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 20,
            backgroundColor: AppColors.surfaceLight,
            child: Text(
              req.name.isNotEmpty ? req.name[0].toUpperCase() : '?',
              style: const TextStyle(color: AppColors.textSecondary, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  req.name,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const Text(
                  'காத்திருப்பில் உள்ளது... (Pending)',
                  style: TextStyle(fontSize: 11, color: AppColors.amberLight),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // TAB 3: Discover / Search
  Widget _buildDiscoverTab() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      child: Column(
        children: [
          // Search Input Field
          TextField(
            controller: _searchCtrl,
            onChanged: _onSearchChanged,
            style: const TextStyle(color: AppColors.textPrimary),
            decoration: InputDecoration(
              hintText: 'பெயரால் பயனரைத் தேடுக...',
              hintStyle: const TextStyle(color: AppColors.textMuted),
              prefixIcon: const Icon(Icons.search, color: AppColors.emeraldLight),
              suffixIcon: _searchCtrl.text.isNotEmpty
                  ? IconButton(
                      icon: const Icon(Icons.clear, color: AppColors.textMuted),
                      onPressed: () {
                        _searchCtrl.clear();
                        _onSearchChanged('');
                      },
                    )
                  : null,
              filled: true,
              fillColor: AppColors.surfaceElevated,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: const BorderSide(color: AppColors.border),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: const BorderSide(color: AppColors.border),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
                borderSide: const BorderSide(color: AppColors.emerald, width: 1.5),
              ),
            ),
          ),

          const SizedBox(height: 16),

          // Search States
          if (_isSearching)
            const Padding(
              padding: EdgeInsets.all(32),
              child: CircularProgressIndicator(color: AppColors.emerald),
            )
          else if (_searchError.isNotEmpty)
            Padding(
              padding: const EdgeInsets.all(24),
              child: Text(_searchError, style: const TextStyle(color: AppColors.rose)),
            )
          else if (_searchCtrl.text.trim().isEmpty)
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: [
                        _buildCategoryChip(0, '👥 அனைத்துப் பரிந்துரைகள்'),
                        const SizedBox(width: 8),
                        _buildCategoryChip(1, '🔥 On a Streak'),
                        const SizedBox(width: 8),
                        _buildCategoryChip(2, '⭐ Top Learners'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 14),
                  if (_isLoadingSuggestions)
                    const Center(
                      child: Padding(
                        padding: EdgeInsets.all(32),
                        child: CircularProgressIndicator(color: AppColors.emerald),
                      ),
                    )
                  else if (_filteredSuggestedUsers.isEmpty)
                    const Center(
                      child: Padding(
                        padding: EdgeInsets.all(24),
                        child: Text('பயனர்கள் இல்லை', style: TextStyle(color: AppColors.textMuted)),
                      ),
                    )
                  else
                    Expanded(
                      child: ListView.separated(
                        itemCount: _filteredSuggestedUsers.length,
                        separatorBuilder: (ctx, i) => const SizedBox(height: 10),
                        itemBuilder: (ctx, index) {
                          final user = _filteredSuggestedUsers[index];
                          return _buildSearchResultCard(user);
                        },
                      ),
                    ),
                ],
              ),
            )
          else if (_searchResults.isEmpty)
            Expanded(
              child: Center(
                child: Text(
                  '"${_searchCtrl.text}" என்ற பெயரில் யாரும் இல்லை',
                  style: const TextStyle(color: AppColors.textMuted),
                ),
              ),
            )
          else
            Expanded(
              child: ListView.separated(
                itemCount: _searchResults.length,
                separatorBuilder: (ctx, i) => const SizedBox(height: 10),
                itemBuilder: (ctx, index) {
                  final user = _searchResults[index];
                  return _buildSearchResultCard(user);
                },
              ),
            ),
        ],
      ),
    );
  }

  List<UserSearchResultModel> get _filteredSuggestedUsers {
    List<UserSearchResultModel> list = _suggestedUsers;
    if (_currentUserId != null) {
      list = list.where((u) => u.id != _currentUserId).toList();
    }
    if (_discoverCategory == 1) {
      return list.where((u) => u.streak > 0).toList();
    } else if (_discoverCategory == 2) {
      return list.where((u) => u.level >= 2 || u.xp >= 100).toList();
    }
    return list;
  }

  Widget _buildCategoryChip(int index, String label) {
    final isSelected = _discoverCategory == index;
    return GestureDetector(
      onTap: () => setState(() => _discoverCategory = index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.emerald.withValues(alpha: 0.25) : AppColors.surfaceElevated,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isSelected ? AppColors.emeraldLight : AppColors.border,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
            color: isSelected ? AppColors.emeraldLight : AppColors.textSecondary,
          ),
        ),
      ),
    );
  }

  Widget _buildSearchResultCard(UserSearchResultModel user) {
    final title = LevelSystem.levelTitle(user.level);
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => context.push('/user/${user.id}'),
            child: CircleAvatar(
              radius: 22,
              backgroundColor: AppColors.sky,
              child: Text(
                user.name.isNotEmpty ? user.name[0].toUpperCase() : '?',
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: GestureDetector(
              onTap: () => context.push('/user/${user.id}'),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    user.name,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'நிலை ${user.level} • $title',
                    style: const TextStyle(fontSize: 11, color: AppColors.emeraldLight, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        '⚡ ${user.xp} XP',
                        style: const TextStyle(fontSize: 11, color: AppColors.amberLight, fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(width: 10),
                      Text(
                        '🔥 ${user.streak}d',
                        style: const TextStyle(fontSize: 11, color: AppColors.roseLight, fontWeight: FontWeight.w600),
                      ),
                      if (user.likesCount > 0) ...[
                        const SizedBox(width: 10),
                        Text(
                          '❤️ ${user.likesCount}',
                          style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
          ),
          _buildFriendStatusAction(user),
        ],
      ),
    );
  }

  Widget _buildFriendStatusAction(UserSearchResultModel user) {
    switch (user.friendStatus) {
      case 'FRIENDS':
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(
            color: AppColors.emerald.withValues(alpha: 0.15),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.check, size: 14, color: AppColors.emeraldLight),
              SizedBox(width: 4),
              Text(
                'நண்பர்',
                style: TextStyle(fontSize: 11, color: AppColors.emeraldLight, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        );
      case 'REQUEST_SENT':
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(
            color: AppColors.surfaceLight,
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Text(
            'அனுப்பப்பட்டது',
            style: TextStyle(fontSize: 11, color: AppColors.textMuted),
          ),
        );
      case 'REQUEST_RECEIVED':
        return ElevatedButton(
          onPressed: () => _tabController.animateTo(1),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.amber,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            minimumSize: Size.zero,
          ),
          child: const Text('ஏற்கவும்', style: TextStyle(fontSize: 11, color: Colors.black)),
        );
      default:
        final isBusy = _pendingActionUserIds.contains(user.id);
        return ElevatedButton.icon(
          onPressed: isBusy ? null : () => _sendFriendRequest(user.id, user.name),
          icon: isBusy
              ? const SizedBox(
                  width: 14,
                  height: 14,
                  child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                )
              : const Icon(Icons.person_add, size: 14),
          label: Text(isBusy ? '...' : 'சேர்', style: const TextStyle(fontSize: 12)),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.emerald,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        );
    }
  }
}
