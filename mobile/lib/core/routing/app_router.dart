import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../data/models/cultural_item_model.dart';
import '../../features/ai/ai_tutor_screen.dart';
import '../../features/auth/auth_provider.dart';
import '../../features/auth/login_screen.dart';
import '../../features/auth/signup_screen.dart';
import '../../features/achievements/achievements_screen.dart';
import '../../features/badges/badges_screen.dart';
import '../../features/crossword/crossword_screen.dart';
import '../../features/culture/culture_detail_screen.dart';
import '../../features/culture/culture_explorer_screen.dart';
import '../../features/daily/daily_quiz_screen.dart';
import '../../features/daily/daily_screen.dart';
import '../../features/home/home_screen.dart';
import '../../features/leaderboard/leaderboard_screen.dart';
import '../../features/social/friends_screen.dart';
import '../../features/social/user_profile_screen.dart';
import '../../features/learning/journey_screen.dart';
import '../../features/lessons/lesson_screen.dart';
import '../../features/map/heritage_map_screen.dart';
import '../../features/notes/notes_screen.dart';
import '../../features/profile/profile_screen.dart';
import '../../features/settings/settings_screen.dart';
import '../../features/quiz/quiz_screen.dart';
import '../../features/saved/saved_screen.dart';
import '../../features/thirukkural/thirukkural_screen.dart';
import '../../features/speak/scenario_selection_screen.dart';
import '../../features/speak/conversation_screen.dart';
import '../../features/speak/quick_practice_screen.dart';
import '../../features/flashcards/flashcards_overview_screen.dart';
import '../../features/flashcards/flashcard_practice_screen.dart';
import '../widgets/app_bottom_bar.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authNotifierProvider);

  return GoRouter(
    initialLocation: '/home',
    redirect: (BuildContext context, GoRouterState state) {
      final isAuth = authState.isAuthenticated;
      final isInitialOrLoading = authState.status == AuthStatus.initial ||
          authState.status == AuthStatus.loading;
      final isLoggingIn =
          state.matchedLocation == '/login' || state.matchedLocation == '/signup';

      if (isInitialOrLoading) {
        return null;
      }

      if (!isAuth && !isLoggingIn) {
        return '/login';
      }

      if (isAuth && isLoggingIn) {
        return '/home';
      }

      return null;
    },
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return AppBottomBar(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/home',
                builder: (context, state) => const HomeScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/journey',
                builder: (context, state) => const JourneyScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/daily',
                builder: (context, state) => const DailyScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/culture',
                builder: (context, state) => const CultureExplorerScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/thirukkural',
                builder: (context, state) => const ThirukkuralScreen(),
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignupScreen(),
      ),
      GoRoute(
        path: '/lesson/:id',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return LessonScreen(lessonId: id);
        },
      ),
      GoRoute(
        path: '/quiz/:id',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return QuizScreen(stageId: id);
        },
      ),
      GoRoute(
        path: '/culture/:slug',
        builder: (context, state) {
          final slug = state.pathParameters['slug'] ?? '';
          final item = state.extra as CulturalItemModel?;
          return CultureDetailScreen(slug: slug, initialItem: item);
        },
      ),
      GoRoute(
        path: '/map',
        builder: (context, state) => const HeritageMapScreen(),
      ),
      GoRoute(
        path: '/ai',
        builder: (context, state) => const AITutorScreen(),
      ),
      GoRoute(
        path: '/leaderboard',
        builder: (context, state) => const LeaderboardScreen(),
      ),
      GoRoute(
        path: '/saved',
        builder: (context, state) => const SavedScreen(),
      ),
      GoRoute(
        path: '/notes',
        builder: (context, state) => const NotesScreen(),
      ),
      GoRoute(
        path: '/daily-quiz',
        builder: (context, state) => const DailyQuizScreen(),
      ),
      GoRoute(
        path: '/crossword',
        builder: (context, state) => const CrosswordScreen(),
      ),
      GoRoute(
        path: '/achievements',
        builder: (context, state) => const AchievementsScreen(),
      ),
      GoRoute(
        path: '/badges',
        builder: (context, state) => const BadgesScreen(),
      ),
      GoRoute(
        path: '/friends',
        builder: (context, state) => const FriendsScreen(),
      ),
      GoRoute(
        path: '/user/:id',
        builder: (context, state) {
          final idStr = state.pathParameters['id'] ?? '0';
          final id = int.tryParse(idStr) ?? 0;
          return UserProfileScreen(userId: id);
        },
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
      GoRoute(
        path: '/speak',
        builder: (context, state) => const ScenarioSelectionScreen(),
      ),
      GoRoute(
        path: '/speak/conversation/:id',
        builder: (context, state) {
          final scenarioId = state.pathParameters['id'] ?? 'restaurant_dosa';
          return ConversationScreen(scenarioIdOrKey: scenarioId);
        },
      ),
      GoRoute(
        path: '/speak/practice',
        builder: (context, state) => const QuickPracticeScreen(),
      ),
      GoRoute(
        path: '/flashcards',
        builder: (context, state) => const FlashcardsOverviewScreen(),
      ),
      GoRoute(
        path: '/flashcards/:category',
        builder: (context, state) {
          final categoryId = state.pathParameters['category'] ?? 'greetings';
          return FlashcardPracticeScreen(categoryId: categoryId);
        },
      ),
    ],
  );
});
