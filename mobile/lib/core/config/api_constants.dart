import 'dart:io' show Platform;
import 'package:flutter/foundation.dart';

class ApiConstants {
  // Configurable base URL via --dart-define=API_URL=...
  static const String _envUrl = String.fromEnvironment('API_URL');
  static String? customBaseUrl;

  static const List<String> fallbackUrls = [
    'http://192.168.14.29:8000',
    'https://reasonably-pics-scan-nut.trycloudflare.com',
    'http://169.254.232.97:8000',
  ];

  static String get baseUrl {
    if (customBaseUrl != null && customBaseUrl!.isNotEmpty) {
      return customBaseUrl!;
    }
    if (_envUrl.isNotEmpty) {
      return _envUrl;
    }
    if (kIsWeb) {
      return 'http://localhost:8000';
    }
    if (Platform.isAndroid) {
      // 10.0.2.2 is the Android Emulator alias to host machine localhost
      return 'http://10.0.2.2:8000';
    }
    if (Platform.isIOS) {
      // Allows physical iPhone on LAN, Cloudflare tunnel, and simulator
      return 'http://192.168.14.29:8000';
    }
    // Desktop fallback
    return 'http://127.0.0.1:8000';
  }

  // Endpoints
  static const String health = '/health';
  static const String ttsStatus = '/api/tts/status';
  static const String ttsSynthesize = '/api/tts/synthesize';
  static const String curriculum = '/api/curriculum';

  // Auth & Profile
  static const String register = '/api/auth/register';
  static const String login = '/api/auth/login';
  static const String me = '/api/me';
  static const String leaderboard = '/api/leaderboard';

  // Learning & Quizzes
  static String completeLesson(String lessonId) => '/api/lessons/$lessonId/complete';
  static String submitQuiz(String stageId) => '/api/quiz/$stageId/submit';

  // Daily Missions
  static const String daily = '/api/daily';
  static const String dailyProgress = '/api/daily/progress';

  // Culture, History, Literature, Inscriptions, Knowledge
  static const String cultureCategories = '/api/culture/categories';
  static const String culture = '/api/culture';
  static String cultureDetail(String slug) => '/api/culture/$slug';

  static const String historyEras = '/api/history/eras';
  static const String history = '/api/history';
  static String historyDetail(String slug) => '/api/history/$slug';

  static const String literatureCategories = '/api/literature/categories';
  static const String literature = '/api/literature';
  static String literatureDetail(String slug) => '/api/literature/$slug';

  static const String knowledgeCategories = '/api/knowledge/categories';
  static const String knowledge = '/api/knowledge';
  static String knowledgeDetail(String slug) => '/api/knowledge/$slug';

  static const String scriptHistory = '/api/script-history';
  static String scriptHistoryDetail(String slug) => '/api/script-history/$slug';

  static const String inscriptionPeriods = '/api/inscriptions/periods';
  static const String inscriptions = '/api/inscriptions';
  static String inscriptionDetail(String slug) => '/api/inscriptions/$slug';

  static const String mapLocations = '/api/map/locations';

  // Bookmarks & Saved
  static const String savedWords = '/api/saved';
  static String unsaveWord(String wordId) => '/api/saved/$wordId';

  static const String savedCulture = '/api/saved/culture';
  static String unsaveCulture(String slug) => '/api/saved/culture/$slug';

  static const String savedHistory = '/api/saved/history';
  static String unsaveHistory(String slug) => '/api/saved/history/$slug';

  static const String savedLiterature = '/api/saved/literature';
  static String unsaveLiterature(String slug) => '/api/saved/literature/$slug';

  static const String savedKnowledge = '/api/saved/knowledge';
  static String unsaveKnowledge(String slug) => '/api/saved/knowledge/$slug';

  static const String savedScriptHistory = '/api/saved/script-history';
  static String unsaveScriptHistory(String slug) => '/api/saved/script-history/$slug';

  static const String savedInscriptions = '/api/saved/inscriptions';
  static String unsaveInscription(String slug) => '/api/saved/inscriptions/$slug';

  // Notes
  static const String notes = '/api/notes';
  static String noteDetail(int noteId) => '/api/notes/$noteId';

  // AI Tutor
  static const String aiConversations = '/api/ai/conversations';
  static String aiConversationDetail(int convId) => '/api/ai/conversations/$convId';
  static String aiMessages(int convId) => '/api/ai/conversations/$convId/messages';

  // Speaking & Interactive Conversation (பேசலாம்!)
  static const String speakingScenarios = '/api/speak/scenarios';
  static String speakingScenarioDetail(String idOrKey) => '/api/speak/scenarios/$idOrKey';
  static String speakingStart(String idOrKey) => '/api/speak/scenarios/$idOrKey/start';
  static String speakingTurn(String idOrKey) => '/api/speak/scenarios/$idOrKey/turn';
  static String speakingHint(String idOrKey) => '/api/speak/scenarios/$idOrKey/hint';
  static String speakingComplete(String idOrKey) => '/api/speak/scenarios/$idOrKey/complete';
  static const String speakingQuickPractice = '/api/speak/quick-practice';
  static const String speakingQuickPracticeSubmit = '/api/speak/quick-practice/submit';
  static const String speakingStats = '/api/speak/stats';
  static const String speakingTranscribe = '/api/speak/transcribe';

  // Flashcards (சொல் அட்டைகள்)
  static const String flashcardCategories = '/api/flashcards/categories';
  static String flashcardDeck(String categoryId) => '/api/flashcards/deck/$categoryId';
  static const String flashcardComplete = '/api/flashcards/session/complete';
}
