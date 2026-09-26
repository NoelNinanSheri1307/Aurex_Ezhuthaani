class DailyQuizQuestionModel {
  final String id;
  final String questionTa;
  final String questionEn;
  final List<String> options;
  final int? answer;
  final String? explanation;

  const DailyQuizQuestionModel({
    required this.id,
    required this.questionTa,
    required this.questionEn,
    required this.options,
    this.answer,
    this.explanation,
  });

  factory DailyQuizQuestionModel.fromJson(Map<String, dynamic> json) {
    final rawOpts = json['options'] as List<dynamic>? ?? [];
    return DailyQuizQuestionModel(
      id: json['id'] as String? ?? '',
      questionTa: json['question_ta'] as String? ?? '',
      questionEn: json['question_en'] as String? ?? '',
      options: rawOpts.map((o) => o.toString()).toList(),
      answer: json['answer'] as int?,
      explanation: json['explanation'] as String?,
    );
  }
}

class DailyQuizAttemptModel {
  final int score;
  final int total;
  final int xpAwarded;
  final String completedAt;

  const DailyQuizAttemptModel({
    required this.score,
    required this.total,
    required this.xpAwarded,
    required this.completedAt,
  });

  factory DailyQuizAttemptModel.fromJson(Map<String, dynamic> json) {
    return DailyQuizAttemptModel(
      score: json['score'] as int? ?? 0,
      total: json['total'] as int? ?? 5,
      xpAwarded: json['xp_awarded'] as int? ?? 0,
      completedAt: json['completed_at'] as String? ?? '',
    );
  }
}

class DailyQuizModel {
  final int id;
  final String date;
  final String title;
  final String titleTa;
  final int xpReward;
  final List<DailyQuizQuestionModel> questions;
  final bool completed;
  final DailyQuizAttemptModel? attempt;

  const DailyQuizModel({
    required this.id,
    required this.date,
    required this.title,
    required this.titleTa,
    required this.xpReward,
    required this.questions,
    required this.completed,
    this.attempt,
  });

  factory DailyQuizModel.fromJson(Map<String, dynamic> json) {
    final rawQ = json['questions'] as List<dynamic>? ?? [];
    return DailyQuizModel(
      id: json['id'] as int? ?? 0,
      date: json['date'] as String? ?? '',
      title: json['title'] as String? ?? 'Daily Tamil Quiz',
      titleTa: json['title_ta'] as String? ?? 'தினசரி தமிழ் வினாடி வினா',
      xpReward: json['xp_reward'] as int? ?? 30,
      questions: rawQ.map((q) => DailyQuizQuestionModel.fromJson(q as Map<String, dynamic>)).toList(),
      completed: json['completed'] as bool? ?? false,
      attempt: json['attempt'] != null ? DailyQuizAttemptModel.fromJson(json['attempt'] as Map<String, dynamic>) : null,
    );
  }
}

class DailyQuizSubmitResultModel {
  final bool alreadyCompleted;
  final int score;
  final int total;
  final int xpGained;
  final int xp;
  final int streak;
  final int level;
  final List<Map<String, dynamic>> achievementsUnlocked;

  const DailyQuizSubmitResultModel({
    required this.alreadyCompleted,
    required this.score,
    required this.total,
    required this.xpGained,
    required this.xp,
    required this.streak,
    required this.level,
    required this.achievementsUnlocked,
  });

  factory DailyQuizSubmitResultModel.fromJson(Map<String, dynamic> json) {
    final rawAchs = json['achievements_unlocked'] as List<dynamic>? ?? [];
    return DailyQuizSubmitResultModel(
      alreadyCompleted: json['already_completed'] as bool? ?? false,
      score: json['score'] as int? ?? 0,
      total: json['total'] as int? ?? 5,
      xpGained: json['xp_gained'] as int? ?? 0,
      xp: json['xp'] as int? ?? 0,
      streak: json['streak'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      achievementsUnlocked: rawAchs.map((a) => a as Map<String, dynamic>).toList(),
    );
  }
}
