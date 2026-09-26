class CrosswordCellModel {
  final int r;
  final int c;
  final String char;
  final int? num;
  final bool isBlocked;

  const CrosswordCellModel({
    required this.r,
    required this.c,
    required this.char,
    this.num,
    required this.isBlocked,
  });

  factory CrosswordCellModel.fromJson(Map<String, dynamic> json) {
    return CrosswordCellModel(
      r: json['r'] as int? ?? 0,
      c: json['c'] as int? ?? 0,
      char: json['char'] as String? ?? '',
      num: json['num'] as int?,
      isBlocked: json['b'] as bool? ?? false,
    );
  }
}

class CrosswordClueModel {
  final int num;
  final String clueTa;
  final String clueEn;
  final int r;
  final int c;
  final int length;
  final String answer;

  const CrosswordClueModel({
    required this.num,
    required this.clueTa,
    required this.clueEn,
    required this.r,
    required this.c,
    required this.length,
    required this.answer,
  });

  factory CrosswordClueModel.fromJson(Map<String, dynamic> json) {
    return CrosswordClueModel(
      num: json['num'] as int? ?? 1,
      clueTa: json['clue_ta'] as String? ?? '',
      clueEn: json['clue_en'] as String? ?? '',
      r: json['r'] as int? ?? 0,
      c: json['c'] as int? ?? 0,
      length: json['length'] as int? ?? 0,
      answer: json['answer'] as String? ?? '',
    );
  }
}

class CrosswordAttemptModel {
  final int timeSeconds;
  final int xpAwarded;
  final String completedAt;

  const CrosswordAttemptModel({
    required this.timeSeconds,
    required this.xpAwarded,
    required this.completedAt,
  });

  factory CrosswordAttemptModel.fromJson(Map<String, dynamic> json) {
    return CrosswordAttemptModel(
      timeSeconds: json['time_seconds'] as int? ?? 0,
      xpAwarded: json['xp_awarded'] as int? ?? 0,
      completedAt: json['completed_at'] as String? ?? '',
    );
  }
}

class CrosswordPuzzleModel {
  final int id;
  final String date;
  final String title;
  final String titleTa;
  final int gridSize;
  final List<List<CrosswordCellModel>> cells;
  final List<CrosswordClueModel> cluesAcross;
  final List<CrosswordClueModel> cluesDown;
  final int xpReward;
  final bool completed;
  final CrosswordAttemptModel? attempt;

  const CrosswordPuzzleModel({
    required this.id,
    required this.date,
    required this.title,
    required this.titleTa,
    required this.gridSize,
    required this.cells,
    required this.cluesAcross,
    required this.cluesDown,
    required this.xpReward,
    required this.completed,
    this.attempt,
  });

  factory CrosswordPuzzleModel.fromJson(Map<String, dynamic> json) {
    final rawCells = json['cells'] as List<dynamic>? ?? [];
    final cellsList = rawCells.map((row) {
      final rowList = row as List<dynamic>? ?? [];
      return rowList.map((c) => CrosswordCellModel.fromJson(c as Map<String, dynamic>)).toList();
    }).toList();

    final rawAcross = json['clues_across'] as List<dynamic>? ?? [];
    final rawDown = json['clues_down'] as List<dynamic>? ?? [];

    return CrosswordPuzzleModel(
      id: json['id'] as int? ?? 0,
      date: json['date'] as String? ?? '',
      title: json['title'] as String? ?? 'Daily Tamil Crossword',
      titleTa: json['title_ta'] as String? ?? 'தினசரி குறுக்கெழுத்துப் புதிர்',
      gridSize: json['grid_size'] as int? ?? 5,
      cells: cellsList,
      cluesAcross: rawAcross.map((a) => CrosswordClueModel.fromJson(a as Map<String, dynamic>)).toList(),
      cluesDown: rawDown.map((d) => CrosswordClueModel.fromJson(d as Map<String, dynamic>)).toList(),
      xpReward: json['xp_reward'] as int? ?? 40,
      completed: json['completed'] as bool? ?? false,
      attempt: json['attempt'] != null ? CrosswordAttemptModel.fromJson(json['attempt'] as Map<String, dynamic>) : null,
    );
  }
}

class CrosswordSubmitResultModel {
  final bool alreadyCompleted;
  final bool isCorrect;
  final int errors;
  final int xpGained;
  final int xp;
  final int level;
  final List<Map<String, dynamic>> achievementsUnlocked;

  const CrosswordSubmitResultModel({
    required this.alreadyCompleted,
    required this.isCorrect,
    required this.errors,
    required this.xpGained,
    required this.xp,
    required this.level,
    required this.achievementsUnlocked,
  });

  factory CrosswordSubmitResultModel.fromJson(Map<String, dynamic> json) {
    final rawAchs = json['achievements_unlocked'] as List<dynamic>? ?? [];
    return CrosswordSubmitResultModel(
      alreadyCompleted: json['already_completed'] as bool? ?? false,
      isCorrect: json['is_correct'] as bool? ?? false,
      errors: json['errors'] as int? ?? 0,
      xpGained: json['xp_gained'] as int? ?? 0,
      xp: json['xp'] as int? ?? 0,
      level: json['level'] as int? ?? 1,
      achievementsUnlocked: rawAchs.map((a) => a as Map<String, dynamic>).toList(),
    );
  }
}
