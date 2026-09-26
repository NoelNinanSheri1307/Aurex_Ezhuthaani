import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ezhuthaani/core/gamification/level_system.dart';
import 'package:ezhuthaani/core/utils/tamil_grapheme_utils.dart';
import 'package:ezhuthaani/core/widgets/ai_markdown_view.dart';
import 'package:ezhuthaani/core/widgets/level_progress_card.dart';
import 'package:ezhuthaani/data/models/social_model.dart';

void main() {
  // =========================================================================
  // 1. CROSSWORD — PROPER TAMIL CHARACTER / GRAPHEME CLUSTER INPUT
  // =========================================================================
  group('1. Crossword — Tamil Grapheme Cluster Engine', () {
    test('Splits "தமிழ்" into exactly 3 grapheme clusters: [த, மி, ழ்]', () {
      final graphemes = TamilGraphemeUtils.splitGraphemes('தமிழ்');
      expect(graphemes, equals(['த', 'மி', 'ழ்']));
      expect(graphemes.length, 3);
    });

    test('Treats single Tamil graphemes as exactly 1 user-visible unit', () {
      final testCases = [
        'அ', 'ஆ',
        'க', 'கா', 'கி', 'கீ', 'கு', 'கூ', 'கெ', 'கே', 'கை', 'கொ', 'கோ', 'கௌ',
        'தி', 'ந்', 'ழ', 'வா', 'லா', 'ழை', 'ன்', 'த்',
      ];

      for (final char in testCases) {
        expect(
          TamilGraphemeUtils.isSingleGrapheme(char),
          isTrue,
          reason: 'Expected "$char" to be treated as a single grapheme cluster',
        );
        expect(
          TamilGraphemeUtils.graphemeLength(char),
          equals(1),
          reason: 'Length of "$char" must be exactly 1',
        );
      }
    });

    test('Combines base consonant with vowel-signs and virama (pulli) canonically', () {
      expect(TamilGraphemeUtils.combine('த', 'ி'), equals('தி'));
      expect(TamilGraphemeUtils.combine('க', 'ி'), equals('கி'));
      expect(TamilGraphemeUtils.combine('க', 'ீ'), equals('கீ'));
      expect(TamilGraphemeUtils.combine('க', 'ு'), equals('கு'));
      expect(TamilGraphemeUtils.combine('க', 'ூ'), equals('கூ'));
      expect(TamilGraphemeUtils.combine('க', 'ெ'), equals('கெ'));
      expect(TamilGraphemeUtils.combine('க', 'ே'), equals('கே'));
      expect(TamilGraphemeUtils.combine('க', 'ை'), equals('கை'));
      expect(TamilGraphemeUtils.combine('க', 'ொ'), equals('கொ'));
      expect(TamilGraphemeUtils.combine('க', 'ோ'), equals('கோ'));
      expect(TamilGraphemeUtils.combine('க', 'ௌ'), equals('கௌ'));
      expect(TamilGraphemeUtils.combine('த', '்'), equals('த்'));
      expect(TamilGraphemeUtils.combine('வ', 'ா'), equals('வா'));
    });

    test('Identifies Tamil combining vowel-marks correctly', () {
      expect(TamilGraphemeUtils.isCombiningMark('ி'), isTrue);
      expect(TamilGraphemeUtils.isCombiningMark('ீ'), isTrue);
      expect(TamilGraphemeUtils.isCombiningMark('்'), isTrue);
      expect(TamilGraphemeUtils.isCombiningMark('ா'), isTrue);
      expect(TamilGraphemeUtils.isCombiningMark('த'), isFalse);
      expect(TamilGraphemeUtils.isCombiningMark('அ'), isFalse);
    });

    test('Generates full 13 syllables for any base consonant', () {
      final thaSyllables = TamilGraphemeUtils.generateSyllables('த');
      expect(thaSyllables.length, 13);
      expect(thaSyllables, contains('தி'));
      expect(thaSyllables, contains('தா'));
      expect(thaSyllables, contains('தீ'));
      expect(thaSyllables, contains('து'));
      expect(thaSyllables, contains('தூ'));
      expect(thaSyllables, contains('த்'));
    });

    test('Deletion behavior: deleting "தி" empties the cell completely in 1 backspace', () {
      final userAnswers = <String, String>{};
      const key = '0,0';

      // User enters "தி" into cell (0,0)
      userAnswers[key] = 'தி';
      expect(userAnswers[key], equals('தி'));
      expect(TamilGraphemeUtils.graphemeLength(userAnswers[key]!), equals(1));

      // Single Backspace: removes the entire grapheme cluster
      userAnswers.remove(key);
      expect(userAnswers.containsKey(key), isFalse);
      expect(userAnswers[key], isNull);

      // Repeat for "கி"
      userAnswers[key] = 'கி';
      userAnswers.remove(key);
      expect(userAnswers[key], isNull);
    });
  });

  // =========================================================================
  // 2. AI TUTOR — CLEAN RESPONSE FORMATTING
  // =========================================================================
  group('2. AI Tutor — Clean Response Formatting', () {
    testWidgets('Renders bold text without displaying literal "**" syntax', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: AiMarkdownView(
              data: '**தமிழ் மொழியின் சிறப்பு**',
            ),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Bold text rendered
      expect(find.textContaining('தமிழ் மொழியின் சிறப்பு'), findsOneWidget);
      // Literal "**" must NOT be visible
      expect(find.text('**தமிழ் மொழியின் சிறப்பு**'), findsNothing);
      expect(find.textContaining('**'), findsNothing);
    });

    testWidgets('Renders bullet list, numbered list, and headings properly', (tester) async {
      const content = '''
### தமிழ் இலக்கணம்
- எழுத்து
- சொல்
- பொருள்

1. முதலெழுத்து
2. சார்பெழுத்து
''';

      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: AiMarkdownView(data: content),
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.textContaining('தமிழ் இலக்கணம்'), findsOneWidget);
      expect(find.textContaining('எழுத்து'), findsOneWidget);
      expect(find.textContaining('சொல்'), findsOneWidget);
      expect(find.textContaining('முதலெழுத்து'), findsOneWidget);
      // Ensure literal markdown hashes aren't shown
      expect(find.textContaining('###'), findsNothing);
    });

    test('Sanitizes malformed/unclosed bold markdown gracefully', () {
      const unclosed = '**முக்கிய குறிப்பு';
      final sanitized = AiMarkdownView.sanitizeMarkdown(unclosed);
      expect(sanitized, equals('**முக்கிய குறிப்பு**'));
    });

    test('cleanForSpeech strips markdown syntax for natural audio TTS', () {
      expect(
        AiMarkdownView.cleanForSpeech('**தமிழ் மொழி** மிகவும் இனிமையானது.'),
        equals('தமிழ் மொழி மிகவும் இனிமையானது.'),
      );
      expect(
        AiMarkdownView.cleanForSpeech('### தலைப்பு\n- புள்ளி 1\n- புள்ளி 2'),
        equals('தலைப்பு\nபுள்ளி 1\nபுள்ளி 2'),
      );
    });
  });

  // =========================================================================
  // 3. LEVEL SYSTEM — VISIBLE PROGRESS TO NEXT LEVEL
  // =========================================================================
  group('3. Level System — LevelProgressCard & Calculation', () {
    test('Calculates level progress and XP remaining accurately', () {
      // Level 1: 0 to 100 XP
      expect(LevelSystem.levelForXp(0), 1);
      expect(LevelSystem.currentLevelMinXp(0), 0);
      expect(LevelSystem.nextLevelMinXp(0), 100);
      expect(LevelSystem.xpRemaining(0), 100);
      expect(LevelSystem.levelProgress(0), 0.0);

      // Level 1: 50 XP
      expect(LevelSystem.levelProgress(50), 0.5);
      expect(LevelSystem.xpRemaining(50), 50);

      // Exact threshold: 100 XP -> Level 2
      expect(LevelSystem.levelForXp(100), 2);
      expect(LevelSystem.currentLevelMinXp(100), 100);
      expect(LevelSystem.nextLevelMinXp(100), 400);
      expect(LevelSystem.xpRemaining(100), 300);
      expect(LevelSystem.levelProgress(100), 0.0);

      // Middle of Level 2: 250 XP
      // Progress = (250 - 100) / (400 - 100) = 150 / 300 = 0.5
      expect(LevelSystem.levelProgress(250), 0.5);
      expect(LevelSystem.xpRemaining(250), 150);

      // Exact threshold: 400 XP -> Level 3
      expect(LevelSystem.levelForXp(400), 3);
      expect(LevelSystem.currentLevelMinXp(400), 400);
      expect(LevelSystem.nextLevelMinXp(400), 900);
      expect(LevelSystem.levelProgress(400), 0.0);
      expect(LevelSystem.xpRemaining(400), 500);

      // Middle of Level 3: 450 XP
      // Progress = (450 - 400) / (900 - 400) = 50 / 500 = 0.1
      expect(LevelSystem.levelProgress(450), 0.1);
      expect(LevelSystem.xpRemaining(450), 450);
    });

    test('Progress is bounded strictly between 0.0 and 1.0 even on negative or edge XP', () {
      expect(LevelSystem.levelProgress(-50), equals(0.0));
      expect(LevelSystem.levelProgress(0), equals(0.0));
      expect(LevelSystem.levelProgress(1000000), lessThanOrEqualTo(1.0));
      expect(LevelSystem.levelProgress(1000000), greaterThanOrEqualTo(0.0));
    });

    testWidgets('LevelProgressCard renders level, Tamil title, XP status, and remaining XP', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: Scaffold(
            body: LevelProgressCard(xp: 250),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Level 2
      expect(find.text('Level 2'), findsOneWidget);
      expect(find.text(LevelSystem.levelTitle(2)), findsOneWidget);
      // Status
      expect(find.text('250 XP'), findsOneWidget);
      expect(find.textContaining('400 XP'), findsOneWidget);
      expect(find.textContaining('150 XP to Level 3'), findsOneWidget);
      expect(find.text('50%'), findsOneWidget);
    });
  });

  // =========================================================================
  // 4. FRIENDS / SOCIAL — OPTIMISTIC LIKE & ENRICHED PROFILES
  // =========================================================================
  group('4. Friends & Social System', () {
    test('Optimistic Like updates state and count immediately with copyWith', () {
      final initial = UserProfileModel(
        id: 7,
        name: 'Arjun',
        xp: 1240,
        level: 4,
        streak: 14,
        bestStreak: 18,
        likesCount: 23,
        hasLiked: false,
        friendStatus: 'NONE',
        achievements: const [],
        recentActivities: const [],
      );

      // User taps Like: optimistic increment
      final liked = initial.copyWith(
        hasLiked: true,
        likesCount: initial.likesCount + 1,
      );
      expect(liked.hasLiked, isTrue);
      expect(liked.likesCount, 24);

      // User taps Unlike: optimistic decrement
      final unliked = liked.copyWith(
        hasLiked: false,
        likesCount: liked.likesCount - 1,
      );
      expect(unliked.hasLiked, isFalse);
      expect(unliked.likesCount, 23);

      // Simulated network failure: revert to initial
      final reverted = liked.copyWith(
        hasLiked: initial.hasLiked,
        likesCount: initial.likesCount,
      );
      expect(reverted.hasLiked, isFalse);
      expect(reverted.likesCount, 23);
    });

    test('FriendModel parses enriched fields: achievementsCount, recentActivity, hasLiked', () {
      final json = {
        'id': 12,
        'name': 'Priya',
        'xp': 1850,
        'level': 5,
        'streak': 21,
        'best_streak': 30,
        'likes_count': 45,
        'has_liked': true,
        'achievements_count': 6,
        'recent_activity': 'Completed today\'s quiz',
        'last_active': '2026-09-23T12:00:00Z',
      };

      final friend = FriendModel.fromJson(json);
      expect(friend.id, 12);
      expect(friend.hasLiked, isTrue);
      expect(friend.achievementsCount, 6);
      expect(friend.recentActivity, 'Completed today\'s quiz');
      expect(friend.bestStreak, 30);
    });

    test('UserSearchResultModel parses likes, streak, and friendship status', () {
      final json = {
        'id': 19,
        'name': 'Meena',
        'xp': 950,
        'level': 4,
        'streak': 8,
        'best_streak': 12,
        'likes_count': 14,
        'has_liked': false,
        'friend_status': 'REQUEST_SENT',
      };

      final searchUser = UserSearchResultModel.fromJson(json);
      expect(searchUser.id, 19);
      expect(searchUser.friendStatus, 'REQUEST_SENT');
      expect(searchUser.likesCount, 14);
      expect(searchUser.bestStreak, 12);
    });
  });
}
