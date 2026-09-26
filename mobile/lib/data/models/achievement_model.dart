class AchievementModel {
  final String id;
  final String title;
  final String titleTa;
  final String description;
  final String descriptionTa;
  final String icon;
  final String category;
  final int xpReward;
  final int requirementValue;
  final int progress;
  final bool completed;
  final String? unlockedAt;

  const AchievementModel({
    required this.id,
    required this.title,
    required this.titleTa,
    required this.description,
    required this.descriptionTa,
    required this.icon,
    required this.category,
    required this.xpReward,
    required this.requirementValue,
    required this.progress,
    required this.completed,
    this.unlockedAt,
  });

  double get progressRatio {
    if (requirementValue <= 0) return 0.0;
    return (progress / requirementValue).clamp(0.0, 1.0);
  }

  factory AchievementModel.fromJson(Map<String, dynamic> json) {
    return AchievementModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      titleTa: json['title_ta'] as String? ?? '',
      description: json['description'] as String? ?? '',
      descriptionTa: json['description_ta'] as String? ?? '',
      icon: json['icon'] as String? ?? 'trophy',
      category: json['category'] as String? ?? 'learning',
      xpReward: json['xp_reward'] as int? ?? 50,
      requirementValue: json['requirement_value'] as int? ?? 1,
      progress: json['progress'] as int? ?? 0,
      completed: json['completed'] as bool? ?? false,
      unlockedAt: json['unlocked_at'] as String?,
    );
  }
}
