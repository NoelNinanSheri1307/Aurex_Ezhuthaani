import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ezhuthaani/core/gamification/level_system.dart';
import 'package:ezhuthaani/features/mascot/mascot_state.dart';
import 'package:ezhuthaani/features/mascot/mascot_controller.dart';
import 'package:ezhuthaani/features/mascot/mascot_widget.dart';
import 'package:ezhuthaani/data/models/user_model.dart';
import 'package:ezhuthaani/data/models/thirukkural_model.dart';
import 'package:ezhuthaani/data/models/curriculum_model.dart';
import 'package:ezhuthaani/data/models/daily_quiz_model.dart';
import 'package:ezhuthaani/data/models/crossword_model.dart';
import 'package:ezhuthaani/data/models/achievement_model.dart';
import 'package:ezhuthaani/data/models/social_model.dart';

void main() {
  group('LevelSystem Gamification Formula Test', () {
    test('Calculates level correctly matching backend formula int((xp/100)^0.5) + 1', () {
      expect(LevelSystem.levelForXp(0), 1);
      expect(LevelSystem.levelForXp(99), 1);
      expect(LevelSystem.levelForXp(100), 2);
      expect(LevelSystem.levelForXp(399), 2);
      expect(LevelSystem.levelForXp(400), 3);
      expect(LevelSystem.levelForXp(899), 3);
      expect(LevelSystem.levelForXp(900), 4);
      expect(LevelSystem.levelForXp(2500), 6);
    });

    test('Calculates level thresholds and progress ratios correctly', () {
      expect(LevelSystem.xpForLevel(1), 0);
      expect(LevelSystem.xpForLevel(2), 100);
      expect(LevelSystem.xpForLevel(3), 400);

      expect(LevelSystem.xpForNextLevel(1), 100);
      expect(LevelSystem.xpForNextLevel(2), 400);

      // In Level 1 (0 to 100), 50 XP is 50%
      expect(LevelSystem.levelProgress(50), 0.5);

      // In Level 2 (100 to 400), 250 XP is (250-100)/(400-100) = 150/300 = 0.5
      expect(LevelSystem.levelProgress(250), 0.5);

      expect(LevelSystem.levelTitle(1), contains('தொடக்க நிலை'));
      expect(LevelSystem.levelTitle(2), contains('தமிழ் ஆர்வலர்'));
      expect(LevelSystem.levelTitle(10), contains('தமிழ்ப் பேரரசன்'));
    });
  });

  group('Tamil Elephant Mascot System Tests', () {
    test('All 12 Mascot states exist and have bilingual voice lines', () {
      expect(MascotState.values.length, 12);
      for (final state in MascotState.values) {
        expect(state.defaultSpeech, isNotEmpty);
        expect(state.englishSpeech, isNotEmpty);
      }
    });

    test('MascotModel handles custom speech and default speech', () {
      const model = MascotModel(state: MascotState.idle);
      expect(model.speech, MascotState.idle.defaultSpeech);

      final withCustom = model.copyWith(customSpeech: 'வணக்கம் மாணவரே! 🐘');
      expect(withCustom.speech, 'வணக்கம் மாணவரே! 🐘');

      final cleared = withCustom.copyWith(clearCustomSpeech: true);
      expect(cleared.speech, MascotState.idle.defaultSpeech);
    });

    test('Elephant mascot interactive quotes are defined and non-empty', () {
      expect(MascotStateX.randomTapQuotes, isNotEmpty);
      expect(MascotStateX.randomTapQuotes.length, greaterThanOrEqualTo(5));
      for (final quote in MascotStateX.randomTapQuotes) {
        expect(quote, isNotEmpty);
      }
    });

    testWidgets('MascotWidget renders Tamil Elephant mascot and speech bubble', (tester) async {
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: Scaffold(
              body: MascotWidget(
                size: 140,
                showSpeechBubble: true,
                interactive: true,
              ),
            ),
          ),
        ),
      );

      await tester.pump();
      expect(find.byType(MascotWidget), findsOneWidget);
      expect(find.byType(CustomPaint), findsWidgets);
      // Confirms speech bubble is visible with initial speech
      expect(find.text(MascotState.idle.defaultSpeech), findsOneWidget);
    });

    testWidgets('MascotWidget handles tap interaction and triggers speech', (tester) async {
      final container = ProviderContainer();
      addTearDown(container.dispose);

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: const MaterialApp(
            home: Scaffold(
              body: MascotWidget(
                size: 140,
                showSpeechBubble: true,
                interactive: true,
              ),
            ),
          ),
        ),
      );

      await tester.pump();
      // Tap on mascot
      await tester.tap(find.byType(MascotWidget));
      await tester.pump(const Duration(milliseconds: 350));

      final state = container.read(mascotProvider);
      expect(state.state, MascotState.happy);
      expect(state.customSpeech, isNotNull);

      // Elapse reset timer
      await tester.pump(const Duration(seconds: 5));
    });

    testWidgets('MascotWidget handles long press celebration', (tester) async {
      final container = ProviderContainer();
      addTearDown(container.dispose);

      await tester.pumpWidget(
        UncontrolledProviderScope(
          container: container,
          child: const MaterialApp(
            home: Scaffold(
              body: MascotWidget(
                size: 140,
                showSpeechBubble: true,
                interactive: true,
              ),
            ),
          ),
        ),
      );

      await tester.pump();
      // Long press mascot
      await tester.longPress(find.byType(MascotWidget));
      await tester.pump(const Duration(milliseconds: 350));

      final state = container.read(mascotProvider);
      expect(state.state, MascotState.celebrating);

      // Elapse reset timer
      await tester.pump(const Duration(seconds: 5));
    });

    test('EzhuthaaniElephantPainter paints for all 12 states without throwing', () {
      final recorder = PictureRecorder();
      final canvas = Canvas(recorder);
      const size = Size(140, 140);

      for (final state in MascotState.values) {
        final painter = EzhuthaaniElephantPainter(
          state: state,
          blink: false,
          idleProgress: 0.5,
          actionProgress: 0.5,
          celebrateProgress: 0.5,
        );
        expect(() => painter.paint(canvas, size), returnsNormally);
      }

      // Blinking state
      final blinkPainter = EzhuthaaniElephantPainter(
        state: MascotState.idle,
        blink: true,
        idleProgress: 0.5,
        actionProgress: 0.0,
        celebrateProgress: 0.0,
      );
      expect(() => blinkPainter.paint(canvas, size), returnsNormally);
    });
  });

  group('Ezhuthaani Core Data Models Test', () {
    test('UserModel deserializes correctly', () {
      final json = {
        'id': 123,
        'email': 'user@ezhuthaani.app',
        'name': 'Agathiyar',
        'role': 'student',
        'xp': 350,
        'streak': 7,
        'best_streak': 14,
        'level': 3,
        'is_active': true,
      };

      final user = UserModel.fromJson(json);

      expect(user.id, 123);
      expect(user.name, 'Agathiyar');
      expect(user.xp, 350);
      expect(user.streak, 7);
      expect(user.level, 3);
    });

    test('KuralModel parses couplet correctly', () {
      final json = {
        'Number': 1,
        'Line1': 'அகர முதல எழுத்தெல்லாம் ஆதி',
        'Line2': 'பகவன் முதற்றே உலகு.',
        'Translation': 'As the letter A is the first of all letters, so the eternal God is first in the world.',
        'explanation': 'Just as "A" begins the alphabet, God begins the universe.',
      };

      final kural = KuralModel.fromJson(json);

      expect(kural.number, 1);
      expect(kural.line1, contains('அகர முதல'));
      expect(kural.translation, contains('first of all letters'));
    });

    test('CurriculumModel deserializes stages and lessons with elephant mascot', () {
      final json = {
        'app': 'Ezhuthaani',
        'mascot': 'elephant',
        'stages': [
          {
            'id': 'stage-1',
            'order': 1,
            'name_ta': 'உயிர் எழுத்துக்கள்',
            'name': 'Vowels',
            'lessons': [
              {
                'id': 'lesson-1',
                'type': 'trace',
                'title_ta': 'அ எழுத்து',
                'title': 'Letter A',
                'xp': 15,
                'content': {'char': 'அ', 'sound': 'a'}
              }
            ],
            'quiz': {
              'id': 'quiz-1',
              'passing_score': 70,
              'xp_reward': 50,
              'questions': [],
            }
          }
        ]
      };

      final curriculum = CurriculumModel.fromJson(json);

      expect(curriculum.stages.length, 1);
      expect(curriculum.mascot, 'elephant');
      expect(curriculum.stages.first.nameTa, 'உயிர் எழுத்துக்கள்');
      expect(curriculum.stages.first.lessons.first.titleTa, 'அ எழுத்து');
    });

    test('DailyQuizModel deserializes correctly', () {
      final json = {
        'id': 1,
        'date': '2026-09-23',
        'title': 'Daily Tamil Quiz',
        'title_ta': 'தினசரி தமிழ் வினாடி வினா',
        'xp_reward': 30,
        'questions': [
          {
            'id': 'q1',
            'question_ta': 'முதல் எழுத்து எது?',
            'question_en': 'First letter?',
            'options': ['அ', 'ஆ', 'இ'],
            'answer': 0,
            'explanation': 'அ is first',
          }
        ],
        'completed': false,
      };

      final quiz = DailyQuizModel.fromJson(json);
      expect(quiz.id, 1);
      expect(quiz.questions.length, 1);
      expect(quiz.questions.first.questionTa, 'முதல் எழுத்து எது?');
      expect(quiz.completed, false);
    });

    test('CrosswordPuzzleModel deserializes correctly', () {
      final json = {
        'id': 10,
        'date': '2026-09-23',
        'title': 'Wisdom',
        'title_ta': 'அன்பும் அறிவும்',
        'grid_size': 5,
        'cells': [
          [{'r': 0, 'c': 0, 'char': 'அ', 'num': 1, 'b': false}]
        ],
        'clues_across': [
          {'num': 1, 'clue_ta': 'பாசம்', 'clue_en': 'Love', 'r': 0, 'c': 0, 'length': 3, 'answer': 'அன்பு'}
        ],
        'clues_down': [],
        'xp_reward': 40,
        'completed': false,
      };

      final cw = CrosswordPuzzleModel.fromJson(json);
      expect(cw.gridSize, 5);
      expect(cw.cells[0][0].char, 'அ');
      expect(cw.cluesAcross.first.answer, 'அன்பு');
    });

    test('AchievementModel progress calculation is correct', () {
      final json = {
        'id': 'SEVEN_DAY_STREAK',
        'title': 'Seven Days of Tamil',
        'title_ta': 'ஏழு நாள் தொடர்ச்சி',
        'description': 'Maintained a 7-day learning streak',
        'description_ta': 'தொடர்ந்து 7 நாட்கள் தமிழ் கற்றுள்ளீர்கள்',
        'icon': 'local_fire_department',
        'category': 'streak',
        'xp_reward': 100,
        'requirement_value': 7,
        'progress': 5,
        'completed': false,
      };

      final ach = AchievementModel.fromJson(json);
      expect(ach.progress, 5);
      expect(ach.completed, false);
      expect(ach.progressRatio, closeTo(5 / 7, 0.01));
    });

    test('UserProfileModel deserializes with friends and activities', () {
      final json = {
        'id': 42,
        'name': 'Thirumavalavan',
        'xp': 3200,
        'level': 6,
        'streak': 15,
        'best_streak': 20,
        'likes_count': 18,
        'has_liked': true,
        'friend_status': 'FRIENDS',
        'achievements': [
          {'id': 'FIRST_LESSON', 'title': 'First Step', 'title_ta': 'முதல் படி', 'icon': 'school'}
        ],
        'recent_activities': [
          {
            'id': 1,
            'user_id': 42,
            'user_name': 'Thirumavalavan',
            'user_level': 6,
            'activity_type': 'QUIZ',
            'title': 'Achieved 5/5 on Daily Quiz',
            'title_ta': 'வினாடி வினாவில் 5/5 வெற்றி',
            'created_at': '2026-09-23T10:00:00Z',
          }
        ],
      };

      final profile = UserProfileModel.fromJson(json);
      expect(profile.id, 42);
      expect(profile.likesCount, 18);
      expect(profile.hasLiked, true);
      expect(profile.recentActivities.length, 1);
    });
  });
}
