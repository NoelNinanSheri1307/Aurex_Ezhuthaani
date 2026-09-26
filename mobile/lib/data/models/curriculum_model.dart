class CurriculumModel {
  final String app;
  final String mascot;
  final List<StageModel> stages;

  const CurriculumModel({
    required this.app,
    required this.mascot,
    required this.stages,
  });

  factory CurriculumModel.fromJson(Map<String, dynamic> json) {
    final rawStages = json['stages'] as List<dynamic>? ?? [];
    return CurriculumModel(
      app: json['app'] as String? ?? 'Ezhuthaani',
      mascot: json['mascot'] as String? ?? 'elephant',
      stages: rawStages.map((s) => StageModel.fromJson(s as Map<String, dynamic>)).toList(),
    );
  }
}

class StageModel {
  final String id;
  final int order;
  final String name;
  final String nameTa;
  final String subtitle;
  final String icon;
  final String color;
  final String blurb;
  final MilestoneModel milestone;
  final List<LessonModel> lessons;
  final QuizModel quiz;

  const StageModel({
    required this.id,
    required this.order,
    required this.name,
    required this.nameTa,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.blurb,
    required this.milestone,
    required this.lessons,
    required this.quiz,
  });

  factory StageModel.fromJson(Map<String, dynamic> json) {
    final rawLessons = json['lessons'] as List<dynamic>? ?? [];
    return StageModel(
      id: json['id'] as String? ?? '',
      order: json['order'] as int? ?? 0,
      name: json['name'] as String? ?? '',
      nameTa: json['name_ta'] as String? ?? '',
      subtitle: json['subtitle'] as String? ?? '',
      icon: json['icon'] as String? ?? 'book',
      color: json['color'] as String? ?? '#10B981',
      blurb: json['blurb'] as String? ?? '',
      milestone: MilestoneModel.fromJson(json['milestone'] as Map<String, dynamic>? ?? {}),
      lessons: rawLessons.map((l) => LessonModel.fromJson(l as Map<String, dynamic>)).toList(),
      quiz: QuizModel.fromJson(json['quiz'] as Map<String, dynamic>? ?? {}),
    );
  }
}

class MilestoneModel {
  final String title;
  final String titleTa;
  final String badge;
  final String desc;

  const MilestoneModel({
    required this.title,
    required this.titleTa,
    required this.badge,
    required this.desc,
  });

  factory MilestoneModel.fromJson(Map<String, dynamic> json) {
    return MilestoneModel(
      title: json['title'] as String? ?? '',
      titleTa: json['title_ta'] as String? ?? '',
      badge: json['badge'] as String? ?? '',
      desc: json['desc'] as String? ?? '',
    );
  }
}

class LessonModel {
  final String id;
  final String type;
  final String title;
  final String titleTa;
  final int xp;
  final dynamic content;

  const LessonModel({
    required this.id,
    required this.type,
    required this.title,
    required this.titleTa,
    required this.xp,
    required this.content,
  });

  factory LessonModel.fromJson(Map<String, dynamic> json) {
    return LessonModel(
      id: json['id'] as String? ?? '',
      type: json['type'] as String? ?? 'read',
      title: json['title'] as String? ?? '',
      titleTa: json['title_ta'] as String? ?? '',
      xp: json['xp'] as int? ?? 15,
      content: json['content'],
    );
  }
}

class QuizModel {
  final int passScore;
  final List<QuizQuestionModel> questions;

  const QuizModel({
    required this.passScore,
    required this.questions,
  });

  factory QuizModel.fromJson(Map<String, dynamic> json) {
    final rawQ = json['questions'] as List<dynamic>? ?? [];
    return QuizModel(
      passScore: json['pass_score'] as int? ?? 70,
      questions: rawQ.map((q) => QuizQuestionModel.fromJson(q as Map<String, dynamic>)).toList(),
    );
  }
}

class QuizQuestionModel {
  final String type;
  final String q;
  final List<String> options;
  final int answer;
  final String? hint;

  const QuizQuestionModel({
    required this.type,
    required this.q,
    required this.options,
    required this.answer,
    this.hint,
  });

  factory QuizQuestionModel.fromJson(Map<String, dynamic> json) {
    final rawOpts = json['options'] as List<dynamic>? ?? [];
    return QuizQuestionModel(
      type: json['type'] as String? ?? 'mcq',
      q: json['q'] as String? ?? '',
      options: rawOpts.map((o) => o.toString()).toList(),
      answer: json['answer'] as int? ?? 0,
      hint: json['hint'] as String?,
    );
  }
}

class QuizResultModel {
  final int score;
  final bool passed;
  final int xpGained;
  final String? badge;
  final List<String> unlockedNext;

  const QuizResultModel({
    required this.score,
    required this.passed,
    required this.xpGained,
    this.badge,
    required this.unlockedNext,
  });

  factory QuizResultModel.fromJson(Map<String, dynamic> json) {
    final rawUnlocked = json['unlocked_next'] as List<dynamic>? ?? [];
    return QuizResultModel(
      score: json['score'] as int? ?? 0,
      passed: json['passed'] as bool? ?? false,
      xpGained: json['xp_gained'] as int? ?? 0,
      badge: json['badge'] as String?,
      unlockedNext: rawUnlocked.map((e) => e.toString()).toList(),
    );
  }
}
