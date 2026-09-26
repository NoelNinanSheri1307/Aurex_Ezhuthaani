class UserModel {
  final int id;
  final String name;
  final String email;
  final int xp;
  final int level;
  final int streak;
  final int bestStreak;
  final Map<String, int> progress;
  final List<String> unlockedStages;
  final List<String> completedStages;

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.xp,
    required this.level,
    required this.streak,
    required this.bestStreak,
    required this.progress,
    required this.unlockedStages,
    required this.completedStages,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    final rawProgress = json['progress'] as Map<String, dynamic>? ?? {};
    final progressMap = rawProgress.map((k, v) => MapEntry(k, (v as num).toInt()));

    final rawUnlocked = json['unlocked_stages'] as List<dynamic>? ?? [];
    final rawCompleted = json['completed_stages'] as List<dynamic>? ?? [];

    return UserModel(
      id: json['id'] as int? ?? 0,
      name: json['name'] as String? ?? '',
      email: json['email'] as String? ?? '',
      xp: json['xp'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      streak: json['streak'] as int? ?? 0,
      bestStreak: json['best_streak'] as int? ?? 0,
      progress: progressMap,
      unlockedStages: rawUnlocked.map((e) => e.toString()).toList(),
      completedStages: rawCompleted.map((e) => e.toString()).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'xp': xp,
      'level': level,
      'streak': streak,
      'best_streak': bestStreak,
      'progress': progress,
      'unlocked_stages': unlockedStages,
      'completed_stages': completedStages,
    };
  }

  UserModel copyWith({
    int? id,
    String? name,
    String? email,
    int? xp,
    int? level,
    int? streak,
    int? bestStreak,
    Map<String, int>? progress,
    List<String>? unlockedStages,
    List<String>? completedStages,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      xp: xp ?? this.xp,
      level: level ?? this.level,
      streak: streak ?? this.streak,
      bestStreak: bestStreak ?? this.bestStreak,
      progress: progress ?? this.progress,
      unlockedStages: unlockedStages ?? this.unlockedStages,
      completedStages: completedStages ?? this.completedStages,
    );
  }
}

class AuthResponse {
  final String token;
  final UserModel user;

  const AuthResponse({required this.token, required this.user});

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      token: json['token'] as String? ?? '',
      user: UserModel.fromJson(json['user'] as Map<String, dynamic>? ?? {}),
    );
  }
}
