import 'package:flutter/foundation.dart';

@immutable
class ScenarioMessage {
  final String tamil;
  final String english;
  final String phonetic;

  const ScenarioMessage({
    required this.tamil,
    required this.english,
    required this.phonetic,
  });

  factory ScenarioMessage.fromJson(Map<String, dynamic> json) {
    return ScenarioMessage(
      tamil: json['tamil']?.toString() ?? '',
      english: json['english']?.toString() ?? '',
      phonetic: json['phonetic']?.toString() ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'tamil': tamil,
    'english': english,
    'phonetic': phonetic,
  };
}

@immutable
class ScenarioReply {
  final String tamil;
  final String english;
  final String phonetic;

  const ScenarioReply({
    required this.tamil,
    required this.english,
    required this.phonetic,
  });

  factory ScenarioReply.fromJson(Map<String, dynamic> json) {
    return ScenarioReply(
      tamil: json['tamil']?.toString() ?? '',
      english: json['english']?.toString() ?? '',
      phonetic: json['phonetic']?.toString() ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'tamil': tamil,
    'english': english,
    'phonetic': phonetic,
  };
}

@immutable
class ScenarioVocabularyItem {
  final String tamil;
  final String phonetic;
  final String english;

  const ScenarioVocabularyItem({
    required this.tamil,
    required this.phonetic,
    required this.english,
  });

  factory ScenarioVocabularyItem.fromJson(Map<String, dynamic> json) {
    return ScenarioVocabularyItem(
      tamil: json['tamil']?.toString() ?? '',
      phonetic: json['phonetic']?.toString() ?? '',
      english: json['english']?.toString() ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'tamil': tamil,
    'phonetic': phonetic,
    'english': english,
  };
}

@immutable
class ScenarioStageModel {
  final int stageOrder;
  final String title;
  final String titleTamil;
  final String goal;
  final String goalTamil;
  final ScenarioMessage characterInitialMessage;
  final List<ScenarioReply> suggestedReplies;
  final List<String> hints;
  final List<String> expectedKeywords;

  const ScenarioStageModel({
    required this.stageOrder,
    required this.title,
    required this.titleTamil,
    required this.goal,
    required this.goalTamil,
    required this.characterInitialMessage,
    required this.suggestedReplies,
    required this.hints,
    required this.expectedKeywords,
  });

  factory ScenarioStageModel.fromJson(Map<String, dynamic> json) {
    final repliesList = (json['suggested_replies'] as List<dynamic>?)
            ?.map((e) => ScenarioReply.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];
    final hintsList = (json['hints'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .toList() ??
        [];
    final keywordsList = (json['expected_keywords'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .toList() ??
        [];

    final initialMsgMap = json['character_initial_message'] as Map<String, dynamic>? ?? {};

    return ScenarioStageModel(
      stageOrder: json['stage_order'] as int? ?? 1,
      title: json['title']?.toString() ?? '',
      titleTamil: json['title_tamil']?.toString() ?? '',
      goal: json['goal']?.toString() ?? '',
      goalTamil: json['goal_tamil']?.toString() ?? '',
      characterInitialMessage: ScenarioMessage.fromJson(initialMsgMap),
      suggestedReplies: repliesList,
      hints: hintsList,
      expectedKeywords: keywordsList,
    );
  }
}

@immutable
class SpeakingScenarioModel {
  final String id;
  final String key;
  final String title;
  final String titleTamil;
  final String description;
  final String descriptionTamil;
  final String category;
  final String difficulty;
  final String characterName;
  final String characterRole;
  final String characterAvatar;
  final String learnerRole;
  final String objective;
  final String objectiveTamil;
  final String estimatedDuration;
  final int xpReward;
  final int stagesCount;
  final int vocabularyCount;
  final bool isCompleted;
  final int bestScore;
  final int stars;
  final List<ScenarioStageModel> stages;
  final List<ScenarioVocabularyItem> vocabulary;

  const SpeakingScenarioModel({
    required this.id,
    required this.key,
    required this.title,
    required this.titleTamil,
    required this.description,
    required this.descriptionTamil,
    required this.category,
    required this.difficulty,
    required this.characterName,
    required this.characterRole,
    required this.characterAvatar,
    required this.learnerRole,
    required this.objective,
    required this.objectiveTamil,
    required this.estimatedDuration,
    required this.xpReward,
    required this.stagesCount,
    required this.vocabularyCount,
    required this.isCompleted,
    required this.bestScore,
    required this.stars,
    this.stages = const [],
    this.vocabulary = const [],
  });

  factory SpeakingScenarioModel.fromJson(Map<String, dynamic> json) {
    final stagesRaw = json['stages'] as List<dynamic>?;
    final vocabRaw = json['vocabulary'] as List<dynamic>?;

    final stages = stagesRaw != null
        ? stagesRaw.map((e) => ScenarioStageModel.fromJson(e as Map<String, dynamic>)).toList()
        : <ScenarioStageModel>[];

    final vocab = vocabRaw != null
        ? vocabRaw.map((e) => ScenarioVocabularyItem.fromJson(e as Map<String, dynamic>)).toList()
        : <ScenarioVocabularyItem>[];

    final userStats = json['user_stats'] as Map<String, dynamic>?;

    return SpeakingScenarioModel(
      id: json['id']?.toString() ?? '',
      key: json['key']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      titleTamil: json['title_tamil']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      descriptionTamil: json['description_tamil']?.toString() ?? '',
      category: json['category']?.toString() ?? 'daily_life',
      difficulty: json['difficulty']?.toString() ?? 'beginner',
      characterName: json['character_name']?.toString() ?? '',
      characterRole: json['character_role']?.toString() ?? '',
      characterAvatar: json['character_avatar']?.toString() ?? 'waiter',
      learnerRole: json['learner_role']?.toString() ?? '',
      objective: json['objective']?.toString() ?? '',
      objectiveTamil: json['objective_tamil']?.toString() ?? '',
      estimatedDuration: json['estimated_duration']?.toString() ?? '3-5 min',
      xpReward: json['xp_reward'] as int? ?? 80,
      stagesCount: json['stages_count'] as int? ?? stages.length,
      vocabularyCount: json['vocabulary_count'] as int? ?? vocab.length,
      isCompleted: (json['is_completed'] as bool?) ?? (userStats?['is_completed'] as bool? ?? false),
      bestScore: (json['best_score'] as int?) ?? (userStats?['best_score'] as int? ?? 0),
      stars: (json['stars'] as int?) ?? (userStats?['stars'] as int? ?? 0),
      stages: stages,
      vocabulary: vocab,
    );
  }
}

@immutable
class WordScoreModel {
  final String word;
  final String target;
  final String spoken;
  final int score;
  final String status; // perfect, good, needs_work

  const WordScoreModel({
    required this.word,
    required this.score,
    required this.status,
    String? target,
    String? spoken,
  })  : target = target ?? word,
        spoken = spoken ?? word;

  factory WordScoreModel.fromJson(Map<String, dynamic> json) {
    final w = json['word']?.toString() ?? json['target']?.toString() ?? '';
    return WordScoreModel(
      word: w,
      target: json['target']?.toString() ?? w,
      spoken: json['spoken']?.toString() ?? json['word']?.toString() ?? '',
      score: json['score'] as int? ?? 0,
      status: json['status']?.toString() ?? 'good',
    );
  }
}

@immutable
class PhonemeFeedbackModel {
  final String letter;
  final String name;
  final String tip;
  final String tipTamil;

  const PhonemeFeedbackModel({
    required this.letter,
    required this.name,
    required this.tip,
    required this.tipTamil,
  });

  factory PhonemeFeedbackModel.fromJson(Map<String, dynamic> json) {
    return PhonemeFeedbackModel(
      letter: json['letter']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      tip: json['tip']?.toString() ?? '',
      tipTamil: json['tip_tamil']?.toString() ?? '',
    );
  }
}

@immutable
class PronunciationReportModel {
  final int? score;
  final int accuracy;
  final String feedback;
  final List<WordScoreModel> wordScores;
  final List<PhonemeFeedbackModel> phonemeFeedback;
  final String recognizedText;
  final bool isAvailable;

  const PronunciationReportModel({
    required this.score,
    required this.accuracy,
    required this.feedback,
    required this.wordScores,
    required this.phonemeFeedback,
    required this.recognizedText,
    this.isAvailable = true,
  });

  factory PronunciationReportModel.fromJson(Map<String, dynamic> json) {
    final words = (json['word_scores'] as List<dynamic>?)
            ?.map((e) => WordScoreModel.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];

    final phonemes = (json['phoneme_feedback'] as List<dynamic>?)
            ?.map((e) => PhonemeFeedbackModel.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];

    final rawScore = json['score'];
    final int? parsedScore = rawScore != null ? (rawScore as num).toInt() : null;

    return PronunciationReportModel(
      score: parsedScore,
      accuracy: json['accuracy'] as int? ?? (parsedScore ?? 0),
      feedback: json['feedback']?.toString() ?? '',
      wordScores: words,
      phonemeFeedback: phonemes,
      recognizedText: json['recognized_text']?.toString() ?? '',
      isAvailable: (json['is_available'] as bool?) ?? (parsedScore != null),
    );
  }
}

@immutable
class TurnResponseModel {
  final int sessionId;
  final ScenarioMessage characterReply;
  final PronunciationReportModel pronunciationReport;
  final bool advanceStage;
  final bool isRelevant;
  final bool stageComplete;
  final int currentStageOrder;
  final int totalStages;
  final bool isConversationComplete;
  final String feedbackTamil;
  final String feedbackEnglish;
  final String? retryPromptTamil;
  final String? retryPromptEnglish;
  final String detectedIntent;
  final String provider;
  final List<ScenarioReply> nextSuggestedReplies;
  final Map<String, dynamic> stageInfo;

  const TurnResponseModel({
    required this.sessionId,
    required this.characterReply,
    required this.pronunciationReport,
    required this.advanceStage,
    this.isRelevant = true,
    this.stageComplete = true,
    required this.currentStageOrder,
    required this.totalStages,
    required this.isConversationComplete,
    required this.feedbackTamil,
    required this.feedbackEnglish,
    this.retryPromptTamil,
    this.retryPromptEnglish,
    this.detectedIntent = '',
    this.provider = 'unknown',
    required this.nextSuggestedReplies,
    required this.stageInfo,
  });

  factory TurnResponseModel.fromJson(Map<String, dynamic> json) {
    final replyMap = json['character_reply'] as Map<String, dynamic>? ?? {};
    final pronMap = json['pronunciation_report'] as Map<String, dynamic>? ?? {};

    final replies = (json['next_suggested_replies'] as List<dynamic>?)
            ?.map((e) => ScenarioReply.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];

    final prov = json['provider']?.toString() ??
        json['response_source']?.toString() ??
        json['source']?.toString() ??
        'unknown';

    return TurnResponseModel(
      sessionId: json['session_id'] as int? ?? 0,
      characterReply: ScenarioMessage.fromJson(replyMap),
      pronunciationReport: PronunciationReportModel.fromJson(pronMap),
      advanceStage: json['advance_stage'] as bool? ?? false,
      isRelevant: json['is_relevant'] as bool? ?? true,
      stageComplete: json['stage_complete'] as bool? ?? (json['advance_stage'] as bool? ?? false),
      currentStageOrder: json['current_stage_order'] as int? ?? 1,
      totalStages: json['total_stages'] as int? ?? 3,
      isConversationComplete: json['is_conversation_complete'] as bool? ?? false,
      feedbackTamil: json['feedback_tamil']?.toString() ?? '',
      feedbackEnglish: json['feedback_english']?.toString() ?? '',
      retryPromptTamil: json['retry_prompt_tamil']?.toString(),
      retryPromptEnglish: json['retry_prompt_english']?.toString(),
      detectedIntent: json['detected_intent']?.toString() ?? '',
      provider: prov,
      nextSuggestedReplies: replies,
      stageInfo: (json['stage_info'] as Map<String, dynamic>?) ?? {},
    );
  }
}


@immutable
class SpeakingCompletionResult {
  final int sessionId;
  final String scenarioId;
  final String scenarioTitle;
  final String scenarioTitleTamil;
  final int overallScore;
  final int pronunciationScore;
  final int conversationScore;
  final int vocabularyScore;
  final int goalCompletion;
  final int turnsCount;
  final int hintsUsed;
  final int xpAwarded;
  final int userTotalXp;
  final int newLevel;
  final List<dynamic> newBadges;
  final int stars;

  const SpeakingCompletionResult({
    required this.sessionId,
    required this.scenarioId,
    required this.scenarioTitle,
    required this.scenarioTitleTamil,
    required this.overallScore,
    required this.pronunciationScore,
    required this.conversationScore,
    required this.vocabularyScore,
    required this.goalCompletion,
    required this.turnsCount,
    required this.hintsUsed,
    required this.xpAwarded,
    required this.userTotalXp,
    required this.newLevel,
    required this.newBadges,
    required this.stars,
  });

  factory SpeakingCompletionResult.fromJson(Map<String, dynamic> json) {
    return SpeakingCompletionResult(
      sessionId: json['session_id'] as int? ?? 0,
      scenarioId: json['scenario_id']?.toString() ?? '',
      scenarioTitle: json['scenario_title']?.toString() ?? '',
      scenarioTitleTamil: json['scenario_title_tamil']?.toString() ?? '',
      overallScore: json['overall_score'] as int? ?? 0,
      pronunciationScore: json['pronunciation_score'] as int? ?? 0,
      conversationScore: json['conversation_score'] as int? ?? 0,
      vocabularyScore: json['vocabulary_score'] as int? ?? 0,
      goalCompletion: json['goal_completion'] as int? ?? 100,
      turnsCount: json['turns_count'] as int? ?? 0,
      hintsUsed: json['hints_used'] as int? ?? 0,
      xpAwarded: json['xp_awarded'] as int? ?? 0,
      userTotalXp: json['user_total_xp'] as int? ?? 0,
      newLevel: json['new_level'] as int? ?? 1,
      newBadges: (json['new_badges'] as List<dynamic>?) ?? [],
      stars: json['stars'] as int? ?? 1,
    );
  }
}

@immutable
class QuickPracticeModel {
  final String id;
  final String category;
  final String title;
  final String titleTamil;
  final String targetPhraseTamil;
  final String targetPhraseEnglish;
  final String phoneticGuide;
  final String difficulty;
  final int xpReward;

  const QuickPracticeModel({
    required this.id,
    required this.category,
    required this.title,
    required this.titleTamil,
    required this.targetPhraseTamil,
    required this.targetPhraseEnglish,
    required this.phoneticGuide,
    required this.difficulty,
    required this.xpReward,
  });

  factory QuickPracticeModel.fromJson(Map<String, dynamic> json) {
    return QuickPracticeModel(
      id: json['id']?.toString() ?? '',
      category: json['category']?.toString() ?? 'daily',
      title: json['title']?.toString() ?? '',
      titleTamil: json['title_tamil']?.toString() ?? '',
      targetPhraseTamil: json['target_phrase_tamil']?.toString() ?? '',
      targetPhraseEnglish: json['target_phrase_english']?.toString() ?? '',
      phoneticGuide: json['phonetic_guide']?.toString() ?? '',
      difficulty: json['difficulty']?.toString() ?? 'beginner',
      xpReward: json['xp_reward'] as int? ?? 20,
    );
  }
}

@immutable
class QuickPracticeSubmitResult {
  final String challengeId;
  final int score;
  final int xpAwarded;
  final List<WordScoreModel> wordScores;
  final List<PhonemeFeedbackModel> phonemeFeedback;
  final String feedback;
  final String recognizedText;
  final int userTotalXp;
  final int newLevel;
  final List<dynamic> newBadges;

  const QuickPracticeSubmitResult({
    required this.challengeId,
    required this.score,
    required this.xpAwarded,
    required this.wordScores,
    required this.phonemeFeedback,
    required this.feedback,
    required this.recognizedText,
    required this.userTotalXp,
    required this.newLevel,
    required this.newBadges,
  });

  factory QuickPracticeSubmitResult.fromJson(Map<String, dynamic> json) {
    final words = (json['word_scores'] as List<dynamic>?)
            ?.map((e) => WordScoreModel.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];

    final phonemes = (json['phoneme_feedback'] as List<dynamic>?)
            ?.map((e) => PhonemeFeedbackModel.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];

    return QuickPracticeSubmitResult(
      challengeId: json['challenge_id']?.toString() ?? '',
      score: json['score'] as int? ?? 0,
      xpAwarded: json['xp_awarded'] as int? ?? 0,
      wordScores: words,
      phonemeFeedback: phonemes,
      feedback: json['feedback']?.toString() ?? '',
      recognizedText: json['recognized_text']?.toString() ?? '',
      userTotalXp: json['user_total_xp'] as int? ?? 0,
      newLevel: json['new_level'] as int? ?? 1,
      newBadges: (json['new_badges'] as List<dynamic>?) ?? [],
    );
  }
}

@immutable
class SpeakingStatsModel {
  final int totalConversations;
  final int averageOverallScore;
  final int averagePronunciationScore;
  final int scenariosCompleted;
  final int totalScenarios;
  final int speakingBadgesCount;
  final List<Map<String, dynamic>> speakingBadges;

  const SpeakingStatsModel({
    required this.totalConversations,
    required this.averageOverallScore,
    required this.averagePronunciationScore,
    required this.scenariosCompleted,
    required this.totalScenarios,
    required this.speakingBadgesCount,
    required this.speakingBadges,
  });

  factory SpeakingStatsModel.fromJson(Map<String, dynamic> json) {
    final badgesList = (json['speaking_badges'] as List<dynamic>?)
            ?.map((e) => Map<String, dynamic>.from(e as Map))
            .toList() ??
        [];

    return SpeakingStatsModel(
      totalConversations: json['total_conversations'] as int? ?? 0,
      averageOverallScore: json['average_overall_score'] as int? ?? 0,
      averagePronunciationScore: json['average_pronunciation_score'] as int? ?? 0,
      scenariosCompleted: json['scenarios_completed'] as int? ?? 0,
      totalScenarios: json['total_scenarios'] as int? ?? 8,
      speakingBadgesCount: json['speaking_badges_count'] as int? ?? 0,
      speakingBadges: badgesList,
    );
  }
}
