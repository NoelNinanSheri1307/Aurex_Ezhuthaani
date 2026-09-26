class DailyDashboardModel {
  final String date;
  final DailyProgressSummary progress;
  final StreakSummary streak;
  final List<DailyMissionModel> missions;
  final DailyBonusModel dailyBonus;

  const DailyDashboardModel({
    required this.date,
    required this.progress,
    required this.streak,
    required this.missions,
    required this.dailyBonus,
  });

  factory DailyDashboardModel.fromJson(Map<String, dynamic> json) {
    final rawMissions = json['missions'] as List<dynamic>? ?? [];
    return DailyDashboardModel(
      date: json['date'] as String? ?? '',
      progress: DailyProgressSummary.fromJson(json['progress'] as Map<String, dynamic>? ?? {}),
      streak: StreakSummary.fromJson(json['streak'] as Map<String, dynamic>? ?? {}),
      missions: rawMissions.map((m) => DailyMissionModel.fromJson(m as Map<String, dynamic>)).toList(),
      dailyBonus: DailyBonusModel.fromJson(json['daily_bonus'] as Map<String, dynamic>? ?? {}),
    );
  }
}

class DailyProgressSummary {
  final int completed;
  final int total;
  final int xpEarned;
  final int xpGainedNow;

  const DailyProgressSummary({
    required this.completed,
    required this.total,
    required this.xpEarned,
    required this.xpGainedNow,
  });

  factory DailyProgressSummary.fromJson(Map<String, dynamic> json) {
    return DailyProgressSummary(
      completed: json['completed'] as int? ?? 0,
      total: json['total'] as int? ?? 4,
      xpEarned: json['xp_earned'] as int? ?? 0,
      xpGainedNow: json['xp_gained_now'] as int? ?? 0,
    );
  }
}

class StreakSummary {
  final int current;
  final int best;

  const StreakSummary({required this.current, required this.best});

  factory StreakSummary.fromJson(Map<String, dynamic> json) {
    return StreakSummary(
      current: json['current'] as int? ?? 0,
      best: json['best'] as int? ?? 0,
    );
  }
}

class DailyMissionModel {
  final int id;
  final String type;
  final String title;
  final String description;
  final String targetId;
  final int progress;
  final int target;
  final bool completed;
  final String? completedAt;
  final int xpReward;
  final String actionUrl;

  const DailyMissionModel({
    required this.id,
    required this.type,
    required this.title,
    required this.description,
    required this.targetId,
    required this.progress,
    required this.target,
    required this.completed,
    this.completedAt,
    required this.xpReward,
    required this.actionUrl,
  });

  factory DailyMissionModel.fromJson(Map<String, dynamic> json) {
    return DailyMissionModel(
      id: json['id'] as int? ?? 0,
      type: json['type'] as String? ?? 'lesson',
      title: json['title'] as String? ?? '',
      description: json['description'] as String? ?? '',
      targetId: json['target_id'] as String? ?? '',
      progress: json['progress'] as int? ?? 0,
      target: json['target'] as int? ?? 1,
      completed: json['completed'] as bool? ?? false,
      completedAt: json['completed_at'] as String?,
      xpReward: json['xp_reward'] as int? ?? 15,
      actionUrl: json['action_url'] as String? ?? '/journey',
    );
  }
}

class DailyBonusModel {
  final int xpReward;
  final bool completed;

  const DailyBonusModel({required this.xpReward, required this.completed});

  factory DailyBonusModel.fromJson(Map<String, dynamic> json) {
    return DailyBonusModel(
      xpReward: json['xp_reward'] as int? ?? 20,
      completed: json['completed'] as bool? ?? false,
    );
  }
}
