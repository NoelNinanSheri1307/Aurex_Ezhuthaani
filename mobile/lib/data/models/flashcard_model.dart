class FlashcardCategoryModel {
  final String id;
  final String titleTa;
  final String titleEn;
  final String descriptionTa;
  final String descriptionEn;
  final String icon;
  final String color;
  final int cardCount;
  final int xpReward;

  const FlashcardCategoryModel({
    required this.id,
    required this.titleTa,
    required this.titleEn,
    required this.descriptionTa,
    required this.descriptionEn,
    required this.icon,
    required this.color,
    required this.cardCount,
    required this.xpReward,
  });

  factory FlashcardCategoryModel.fromJson(Map<String, dynamic> json) {
    return FlashcardCategoryModel(
      id: json['id'] as String? ?? '',
      titleTa: json['title_ta'] as String? ?? '',
      titleEn: json['title_en'] as String? ?? '',
      descriptionTa: json['description_ta'] as String? ?? '',
      descriptionEn: json['description_en'] as String? ?? '',
      icon: json['icon'] as String? ?? '🎴',
      color: json['color'] as String? ?? '#10B981',
      cardCount: (json['card_count'] as num?)?.toInt() ?? 6,
      xpReward: (json['xp_reward'] as num?)?.toInt() ?? 60,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title_ta': titleTa,
        'title_en': titleEn,
        'description_ta': descriptionTa,
        'description_en': descriptionEn,
        'icon': icon,
        'color': color,
        'card_count': cardCount,
        'xp_reward': xpReward,
      };
}

class FlashcardModel {
  final String id;
  final String categoryId;
  final String wordTa;
  final String wordEn;
  final String transliteration;
  final String exampleTa;
  final String exampleEn;
  final String pronunciationTip;

  const FlashcardModel({
    required this.id,
    required this.categoryId,
    required this.wordTa,
    required this.wordEn,
    required this.transliteration,
    required this.exampleTa,
    required this.exampleEn,
    required this.pronunciationTip,
  });

  factory FlashcardModel.fromJson(Map<String, dynamic> json) {
    return FlashcardModel(
      id: json['id'] as String? ?? '',
      categoryId: json['category_id'] as String? ?? '',
      wordTa: json['word_ta'] as String? ?? '',
      wordEn: json['word_en'] as String? ?? '',
      transliteration: json['transliteration'] as String? ?? '',
      exampleTa: json['example_ta'] as String? ?? '',
      exampleEn: json['example_en'] as String? ?? '',
      pronunciationTip: json['pronunciation_tip'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'category_id': categoryId,
        'word_ta': wordTa,
        'word_en': wordEn,
        'transliteration': transliteration,
        'example_ta': exampleTa,
        'example_en': exampleEn,
        'pronunciation_tip': pronunciationTip,
      };
}

class FlashcardDeckModel {
  final FlashcardCategoryModel? category;
  final List<FlashcardModel> cards;

  const FlashcardDeckModel({
    this.category,
    required this.cards,
  });

  factory FlashcardDeckModel.fromJson(Map<String, dynamic> json) {
    return FlashcardDeckModel(
      category: json['category'] != null
          ? FlashcardCategoryModel.fromJson(json['category'] as Map<String, dynamic>)
          : null,
      cards: (json['cards'] as List<dynamic>?)
              ?.map((c) => FlashcardModel.fromJson(c as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }
}

class FlashcardSessionResultModel {
  final String categoryId;
  final int xpAwarded;
  final int userTotalXp;
  final int newLevel;
  final int streak;
  final int knownCount;
  final int totalCount;
  final List<dynamic> newBadges;

  const FlashcardSessionResultModel({
    required this.categoryId,
    required this.xpAwarded,
    required this.userTotalXp,
    required this.newLevel,
    required this.streak,
    required this.knownCount,
    required this.totalCount,
    this.newBadges = const [],
  });

  factory FlashcardSessionResultModel.fromJson(Map<String, dynamic> json) {
    return FlashcardSessionResultModel(
      categoryId: json['category_id'] as String? ?? '',
      xpAwarded: (json['xp_awarded'] as num?)?.toInt() ?? 0,
      userTotalXp: (json['user_total_xp'] as num?)?.toInt() ?? 0,
      newLevel: (json['new_level'] as num?)?.toInt() ?? 1,
      streak: (json['streak'] as num?)?.toInt() ?? 1,
      knownCount: (json['known_count'] as num?)?.toInt() ?? 0,
      totalCount: (json['total_count'] as num?)?.toInt() ?? 0,
      newBadges: json['new_badges'] as List<dynamic>? ?? [],
    );
  }
}
