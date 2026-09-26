class FriendModel {
  final int id;
  final String name;
  final int xp;
  final int level;
  final int streak;
  final int bestStreak;
  final int likesCount;
  final bool hasLiked;
  final int achievementsCount;
  final int badgesCount;
  final List<String> badgesPreview;
  final String? recentActivity;
  final String? lastActive;

  const FriendModel({
    required this.id,
    required this.name,
    required this.xp,
    required this.level,
    required this.streak,
    required this.bestStreak,
    required this.likesCount,
    this.hasLiked = false,
    this.achievementsCount = 0,
    this.badgesCount = 0,
    this.badgesPreview = const [],
    this.recentActivity,
    this.lastActive,
  });

  factory FriendModel.fromJson(Map<String, dynamic> json) {
    final preview = (json['badges_preview'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .toList() ??
        const [];

    return FriendModel(
      id: json['id'] as int? ?? 0,
      name: json['name'] as String? ?? 'Friend',
      xp: json['xp'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      streak: json['streak'] as int? ?? 0,
      bestStreak: json['best_streak'] as int? ?? 0,
      likesCount: json['likes_count'] as int? ?? 0,
      hasLiked: json['has_liked'] as bool? ?? false,
      achievementsCount: json['achievements_count'] as int? ?? 0,
      badgesCount: json['badges_count'] as int? ?? 0,
      badgesPreview: preview,
      recentActivity: json['recent_activity'] as String?,
      lastActive: json['last_active'] as String?,
    );
  }
}

class FriendRequestModel {
  final int requestId;
  final int userId;
  final String name;
  final int xp;
  final int level;
  final int streak;
  final String createdAt;

  const FriendRequestModel({
    required this.requestId,
    required this.userId,
    required this.name,
    required this.xp,
    required this.level,
    required this.streak,
    required this.createdAt,
  });

  factory FriendRequestModel.fromJson(Map<String, dynamic> json) {
    return FriendRequestModel(
      requestId: json['request_id'] as int? ?? 0,
      userId: json['user_id'] as int? ?? 0,
      name: json['name'] as String? ?? 'User',
      xp: json['xp'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      streak: json['streak'] as int? ?? 0,
      createdAt: json['created_at'] as String? ?? '',
    );
  }
}

class FriendRequestsContainerModel {
  final List<FriendRequestModel> incoming;
  final List<FriendRequestModel> outgoing;

  const FriendRequestsContainerModel({
    required this.incoming,
    required this.outgoing,
  });

  factory FriendRequestsContainerModel.fromJson(Map<String, dynamic> json) {
    final rawInc = json['incoming'] as List<dynamic>? ?? [];
    final rawOut = json['outgoing'] as List<dynamic>? ?? [];
    return FriendRequestsContainerModel(
      incoming: rawInc.map((i) => FriendRequestModel.fromJson(i as Map<String, dynamic>)).toList(),
      outgoing: rawOut.map((o) => FriendRequestModel.fromJson(o as Map<String, dynamic>)).toList(),
    );
  }
}

class UserSearchResultModel {
  final int id;
  final String name;
  final int xp;
  final int level;
  final int streak;
  final int bestStreak;
  final int likesCount;
  final bool hasLiked;
  final String friendStatus; // "NONE", "REQUEST_SENT", "REQUEST_RECEIVED", "FRIENDS"

  const UserSearchResultModel({
    required this.id,
    required this.name,
    required this.xp,
    required this.level,
    required this.streak,
    this.bestStreak = 0,
    required this.likesCount,
    this.hasLiked = false,
    required this.friendStatus,
  });

  factory UserSearchResultModel.fromJson(Map<String, dynamic> json) {
    return UserSearchResultModel(
      id: json['id'] as int? ?? 0,
      name: json['name'] as String? ?? 'User',
      xp: json['xp'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      streak: json['streak'] as int? ?? 0,
      bestStreak: json['best_streak'] as int? ?? 0,
      likesCount: json['likes_count'] as int? ?? 0,
      hasLiked: json['has_liked'] as bool? ?? false,
      friendStatus: json['friend_status'] as String? ?? 'NONE',
    );
  }

  UserSearchResultModel copyWith({
    int? id,
    String? name,
    int? xp,
    int? level,
    int? streak,
    int? bestStreak,
    int? likesCount,
    bool? hasLiked,
    String? friendStatus,
  }) {
    return UserSearchResultModel(
      id: id ?? this.id,
      name: name ?? this.name,
      xp: xp ?? this.xp,
      level: level ?? this.level,
      streak: streak ?? this.streak,
      bestStreak: bestStreak ?? this.bestStreak,
      likesCount: likesCount ?? this.likesCount,
      hasLiked: hasLiked ?? this.hasLiked,
      friendStatus: friendStatus ?? this.friendStatus,
    );
  }
}

class SocialActivityModel {
  final int id;
  final int userId;
  final String userName;
  final int userLevel;
  final String activityType;
  final String title;
  final String titleTa;
  final String? details;
  final String createdAt;

  const SocialActivityModel({
    required this.id,
    required this.userId,
    required this.userName,
    required this.userLevel,
    required this.activityType,
    required this.title,
    required this.titleTa,
    this.details,
    required this.createdAt,
  });

  factory SocialActivityModel.fromJson(Map<String, dynamic> json) {
    return SocialActivityModel(
      id: json['id'] as int? ?? 0,
      userId: json['user_id'] as int? ?? 0,
      userName: json['user_name'] as String? ?? 'Learner',
      userLevel: json['user_level'] as int? ?? 1,
      activityType: json['activity_type'] as String? ?? 'LEARNING',
      title: json['title'] as String? ?? '',
      titleTa: json['title_ta'] as String? ?? '',
      details: json['details'] as String?,
      createdAt: json['created_at'] as String? ?? '',
    );
  }
}

class InAppNotificationModel {
  final int id;
  final String type;
  final String title;
  final String body;
  final bool read;
  final String createdAt;

  const InAppNotificationModel({
    required this.id,
    required this.type,
    required this.title,
    required this.body,
    required this.read,
    required this.createdAt,
  });

  factory InAppNotificationModel.fromJson(Map<String, dynamic> json) {
    return InAppNotificationModel(
      id: json['id'] as int? ?? 0,
      type: json['type'] as String? ?? 'GENERAL',
      title: json['title'] as String? ?? '',
      body: json['body'] as String? ?? '',
      read: json['read'] as bool? ?? false,
      createdAt: json['created_at'] as String? ?? '',
    );
  }
}

class UserProfileModel {
  final int id;
  final String name;
  final int xp;
  final int level;
  final int streak;
  final int bestStreak;
  final int likesCount;
  final bool hasLiked;
  final String friendStatus; // "SELF", "FRIENDS", "REQUEST_SENT", "REQUEST_RECEIVED", "NONE"
  final String? createdAt;
  final int badgesCount;
  final List<Map<String, dynamic>> badges;
  final List<Map<String, dynamic>> achievements;
  final List<SocialActivityModel> recentActivities;

  const UserProfileModel({
    required this.id,
    required this.name,
    required this.xp,
    required this.level,
    required this.streak,
    required this.bestStreak,
    required this.likesCount,
    required this.hasLiked,
    required this.friendStatus,
    this.createdAt,
    this.badgesCount = 0,
    this.badges = const [],
    required this.achievements,
    required this.recentActivities,
  });

  factory UserProfileModel.fromJson(Map<String, dynamic> json) {
    final rawBadges = json['badges'] as List<dynamic>? ?? [];
    final rawAchs = json['achievements'] as List<dynamic>? ?? [];
    final rawActs = json['recent_activities'] as List<dynamic>? ?? [];
    return UserProfileModel(
      id: json['id'] as int? ?? 0,
      name: json['name'] as String? ?? 'User',
      xp: json['xp'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      streak: json['streak'] as int? ?? 0,
      bestStreak: json['best_streak'] as int? ?? 0,
      likesCount: json['likes_count'] as int? ?? 0,
      hasLiked: json['has_liked'] as bool? ?? false,
      friendStatus: json['friend_status'] as String? ?? 'NONE',
      createdAt: json['created_at'] as String?,
      badgesCount: json['badges_count'] as int? ?? rawBadges.length,
      badges: rawBadges.map((b) => b as Map<String, dynamic>).toList(),
      achievements: rawAchs.map((a) => a as Map<String, dynamic>).toList(),
      recentActivities: rawActs.map((act) => SocialActivityModel.fromJson(act as Map<String, dynamic>)).toList(),
    );
  }

  UserProfileModel copyWith({
    int? id,
    String? name,
    int? xp,
    int? level,
    int? streak,
    int? bestStreak,
    int? likesCount,
    bool? hasLiked,
    String? friendStatus,
    String? createdAt,
    int? badgesCount,
    List<Map<String, dynamic>>? badges,
    List<Map<String, dynamic>>? achievements,
    List<SocialActivityModel>? recentActivities,
  }) {
    return UserProfileModel(
      id: id ?? this.id,
      name: name ?? this.name,
      xp: xp ?? this.xp,
      level: level ?? this.level,
      streak: streak ?? this.streak,
      bestStreak: bestStreak ?? this.bestStreak,
      likesCount: likesCount ?? this.likesCount,
      hasLiked: hasLiked ?? this.hasLiked,
      friendStatus: friendStatus ?? this.friendStatus,
      createdAt: createdAt ?? this.createdAt,
      badgesCount: badgesCount ?? this.badgesCount,
      badges: badges ?? this.badges,
      achievements: achievements ?? this.achievements,
      recentActivities: recentActivities ?? this.recentActivities,
    );
  }
}
