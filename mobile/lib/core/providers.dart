import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/models/achievement_model.dart';
import '../data/models/badge_model.dart';
import '../data/models/social_model.dart';
import '../data/repositories/achievement_repository.dart';
import '../data/repositories/ai_repository.dart';
import '../data/repositories/auth_repository.dart';
import '../data/repositories/badge_repository.dart';
import '../data/repositories/content_repository.dart';
import '../data/repositories/curriculum_repository.dart';
import '../data/repositories/daily_engagement_repository.dart';
import '../data/repositories/daily_repository.dart';
import '../data/repositories/social_repository.dart';
import '../data/repositories/speaking_repository.dart';
import '../data/repositories/thirukkural_repository.dart';
import '../data/repositories/flashcard_repository.dart';
import '../data/models/speaking_scenario_model.dart';
import '../data/models/flashcard_model.dart';
import '../data/services/pronunciation_evaluation_service.dart';
import '../data/services/speech_recognition_service.dart';
import '../data/services/tts_service.dart';
import 'network/dio_client.dart';
import 'storage/secure_storage_service.dart';

final secureStorageProvider = Provider<SecureStorageService>((ref) {
  return SecureStorageService();
});

final dioClientProvider = Provider<DioClient>((ref) {
  final storage = ref.watch(secureStorageProvider);
  return DioClient(
    storageService: storage,
    onUnauthorized: () {
      // Handle logout or auth refresh
    },
  );
});

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  final storage = ref.watch(secureStorageProvider);
  return AuthRepository(dio, storage);
});

final curriculumRepositoryProvider = Provider<CurriculumRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return CurriculumRepository(dio);
});

final dailyRepositoryProvider = Provider<DailyRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return DailyRepository(dio);
});

final dailyEngagementRepositoryProvider = Provider<DailyEngagementRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return DailyEngagementRepository(dio);
});

final achievementRepositoryProvider = Provider<AchievementRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return AchievementRepository(dio);
});

final socialRepositoryProvider = Provider<SocialRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return SocialRepository(dio);
});

final contentRepositoryProvider = Provider<ContentRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return ContentRepository(dio);
});

final thirukkuralRepositoryProvider = Provider<ThirukkuralRepository>((ref) {
  return ThirukkuralRepository();
});

final aiRepositoryProvider = Provider<AIRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return AIRepository(dio);
});

final ttsServiceProvider = Provider<TtsService>((ref) {
  final dio = ref.watch(dioClientProvider);
  final service = TtsService(dio);
  ref.onDispose(() => service.dispose());
  return service;
});

final achievementsProvider = FutureProvider.autoDispose<List<AchievementModel>>((ref) {
  final repo = ref.watch(achievementRepositoryProvider);
  return repo.getAchievements();
});

final friendsProvider = FutureProvider.autoDispose<List<FriendModel>>((ref) {
  final repo = ref.watch(socialRepositoryProvider);
  return repo.getFriends();
});

final friendRequestsProvider = FutureProvider.autoDispose<FriendRequestsContainerModel>((ref) {
  final repo = ref.watch(socialRepositoryProvider);
  return repo.getFriendRequests();
});

final socialFeedProvider = FutureProvider.autoDispose<List<SocialActivityModel>>((ref) {
  final repo = ref.watch(socialRepositoryProvider);
  return repo.getSocialFeed();
});

final badgeRepositoryProvider = Provider<BadgeRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return BadgeRepository(dio);
});

final myBadgesProvider = FutureProvider.autoDispose<List<BadgeModel>>((ref) {
  final repo = ref.watch(badgeRepositoryProvider);
  return repo.getMyBadges();
});

final allBadgesProvider = FutureProvider.autoDispose<List<BadgeModel>>((ref) {
  final repo = ref.watch(badgeRepositoryProvider);
  return repo.getAllBadges();
});

final badgeProgressProvider = FutureProvider.autoDispose<BadgeProgressSummary>((ref) {
  final repo = ref.watch(badgeRepositoryProvider);
  return repo.getBadgeProgress();
});

final userBadgesProvider = FutureProvider.autoDispose.family<List<BadgeModel>, int>((ref, userId) {
  final repo = ref.watch(badgeRepositoryProvider);
  return repo.getUserBadges(userId);
});

// Speaking & Interactive Conversation (பேசலாம்!)
final speakingRepositoryProvider = Provider<SpeakingRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return SpeakingRepository(dio);
});

final pronunciationEvaluationServiceProvider = Provider<PronunciationEvaluationService>((ref) {
  return PronunciationEvaluationService();
});

final speechRecognitionServiceProvider = Provider<SpeechRecognitionService>((ref) {
  final dio = ref.watch(dioClientProvider);
  final service = SpeechRecognitionService(dio);
  ref.onDispose(() => service.dispose());
  return service;
});

final speakingScenariosProvider = FutureProvider.autoDispose<List<SpeakingScenarioModel>>((ref) {
  final repo = ref.watch(speakingRepositoryProvider);
  return repo.getScenarios();
});

final speakingStatsProvider = FutureProvider.autoDispose<SpeakingStatsModel>((ref) {
  final repo = ref.watch(speakingRepositoryProvider);
  return repo.getSpeakingStats();
});

final quickPracticeChallengesProvider = FutureProvider.autoDispose<List<QuickPracticeModel>>((ref) {
  final repo = ref.watch(speakingRepositoryProvider);
  return repo.getQuickPracticeChallenges();
});

// Flashcards (சொல் அட்டைகள்)
final flashcardRepositoryProvider = Provider<FlashcardRepository>((ref) {
  final dio = ref.watch(dioClientProvider);
  return FlashcardRepository(dio);
});

final flashcardCategoriesProvider = FutureProvider.autoDispose<List<FlashcardCategoryModel>>((ref) {
  final repo = ref.watch(flashcardRepositoryProvider);
  return repo.getCategories();
});

final flashcardDeckProvider = FutureProvider.autoDispose.family<FlashcardDeckModel, String>((ref, categoryId) {
  final repo = ref.watch(flashcardRepositoryProvider);
  return repo.getDeck(categoryId);
});

