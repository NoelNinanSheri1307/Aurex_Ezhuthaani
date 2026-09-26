import 'package:flutter_test/flutter_test.dart';
import 'package:ezhuthaani/data/models/speaking_scenario_model.dart';
import 'package:ezhuthaani/data/services/pronunciation_evaluation_service.dart';
import 'package:ezhuthaani/data/services/speech_recognition_service.dart';

void main() {
  group('Speaking System Models Test', () {
    test('SpeakingScenarioModel parses from JSON correctly', () {
      final json = {
        'id': 'scenario_restaurant_dosa',
        'key': 'restaurant_dosa',
        'title': 'Ordering at a Restaurant',
        'title_tamil': 'உணவகத்தில் உணவு ஆர்டர் செய்தல்',
        'description': 'Order hot crispy dosas and filter coffee from waiter Selvam.',
        'description_tamil': 'சூடான தோசை மற்றும் காபி ஆர்டர் செய்யுங்கள்.',
        'category': 'food',
        'difficulty': 'beginner',
        'character_name': 'செல்வம்',
        'character_role': 'உணவக பணியாளர்',
        'character_avatar': 'waiter',
        'learner_role': 'வாடிக்கையாளர்',
        'objective': 'Order a masala dosa',
        'objective_tamil': 'மசால் தோசை ஆர்டர் செய்க',
        'estimated_duration': '3-4 min',
        'xp_reward': 80,
        'stages_count': 3,
        'vocabulary_count': 6,
        'is_completed': true,
        'best_score': 88,
        'stars': 2,
        'stages': [
          {
            'stage_order': 1,
            'title': 'Greeting',
            'title_tamil': 'வணக்கம்',
            'goal': 'Greet the waiter',
            'goal_tamil': 'பணியாளருக்கு வணக்கம் கூறுங்கள்',
            'character_initial_message': {
              'tamil': 'வணக்கம் தம்பி! என்ன சாப்பிடறீங்க?',
              'english': 'Hello brother! What will you eat?',
              'phonetic': 'Vanakkam thambi! Enna saapidareenga?',
            },
            'suggested_replies': [
              {
                'tamil': 'வணக்கம் அண்ணா, எனக்கு ஒரு தோசை கொடுங்க.',
                'english': 'Hello brother, please give me one dosa.',
                'phonetic': 'Vanakkam anna, enakku oru thosai kodunga.',
              }
            ],
            'hints': ['Say hello politely', 'Start with Vanakkam', 'வணக்கம் அண்ணா'],
            'expected_keywords': ['வணக்கம்', 'தோசை', 'கொடுங்க'],
          }
        ],
        'vocabulary': [
          {'tamil': 'தோசை', 'phonetic': 'thosai', 'english': 'dosa'}
        ],
      };

      final model = SpeakingScenarioModel.fromJson(json);
      expect(model.id, 'scenario_restaurant_dosa');
      expect(model.key, 'restaurant_dosa');
      expect(model.titleTamil, 'உணவகத்தில் உணவு ஆர்டர் செய்தல்');
      expect(model.category, 'food');
      expect(model.difficulty, 'beginner');
      expect(model.xpReward, 80);
      expect(model.isCompleted, true);
      expect(model.bestScore, 88);
      expect(model.stars, 2);
      expect(model.stages.length, 1);
      expect(model.stages[0].stageOrder, 1);
      expect(model.stages[0].suggestedReplies.length, 1);
      expect(model.stages[0].expectedKeywords.contains('வணக்கம்'), true);
      expect(model.vocabulary.length, 1);
    });

    test('TurnResponseModel and PronunciationReportModel parse correctly', () {
      final json = {
        'session_id': 42,
        'character_reply': {
          'tamil': 'சரிங்க தம்பி! மசால் தோசை சொல்லிட்டேன்.',
          'english': 'Sure brother! Ordered masala dosa.',
          'phonetic': 'Saringa thambi! Masaal thosai sollitten.',
        },
        'pronunciation_report': {
          'score': 85,
          'accuracy': 85,
          'feedback': 'அற்புதம்! மிகச் சிறப்பான உச்சரிப்பு!',
          'word_scores': [
            {'word': 'வணக்கம்', 'score': 90, 'status': 'perfect'},
            {'word': 'தோசை', 'score': 85, 'status': 'perfect'},
          ],
          'phoneme_feedback': [
            {
              'letter': 'ழ',
              'name': 'Retroflex Approximant (ழ)',
              'tip': 'Curl tongue backward',
              'tip_tamil': 'நாக்கை உள்நோக்கி மடிக்கவும்',
            }
          ],
          'recognized_text': 'வணக்கம் தோசை',
        },
        'advance_stage': true,
        'current_stage_order': 2,
        'total_stages': 3,
        'is_conversation_complete': false,
        'feedback_tamil': 'நன்றாக பேசினீர்கள்!',
        'feedback_english': 'Great conversational Tamil!',
        'next_suggested_replies': [],
        'stage_info': {'title': 'Stage 2'},
      };

      final turn = TurnResponseModel.fromJson(json);
      expect(turn.sessionId, 42);
      expect(turn.characterReply.tamil, 'சரிங்க தம்பி! மசால் தோசை சொல்லிட்டேன்.');
      expect(turn.advanceStage, true);
      expect(turn.currentStageOrder, 2);
      expect(turn.pronunciationReport.score, 85);
      expect(turn.pronunciationReport.wordScores.length, 2);
      expect(turn.pronunciationReport.phonemeFeedback.length, 1);
      expect(turn.pronunciationReport.phonemeFeedback[0].letter, 'ழ');
    });

    test('QuickPracticeModel and SpeakingStatsModel parse correctly', () {
      final qpJson = {
        'id': 'qp_vazhai',
        'category': 'pronunciation_zha',
        'title': 'Special ழ Practice',
        'title_tamil': 'சிறப்பு ழ பயிற்சி',
        'target_phrase_tamil': 'வாழைப்பழம் மிகவும் இனிப்பாக இருக்கிறது.',
        'target_phrase_english': 'The banana is very sweet.',
        'phonetic_guide': 'Vaazhaippazham migavum inippaaga irukkiradhu.',
        'difficulty': 'intermediate',
        'xp_reward': 25,
      };

      final qp = QuickPracticeModel.fromJson(qpJson);
      expect(qp.id, 'qp_vazhai');
      expect(qp.targetPhraseTamil, 'வாழைப்பழம் மிகவும் இனிப்பாக இருக்கிறது.');
      expect(qp.xpReward, 25);

      final statsJson = {
        'total_conversations': 5,
        'average_overall_score': 84,
        'average_pronunciation_score': 86,
        'scenarios_completed': 4,
        'total_scenarios': 8,
        'speaking_badges_count': 2,
        'speaking_badges': [
          {'badge_id': 'FIRST_CONVERSATION', 'unlocked_at': '2026-09-23T10:00:00Z'},
          {'badge_id': 'RESTAURANT_EXPERT', 'unlocked_at': '2026-09-23T11:00:00Z'},
        ],
      };

      final stats = SpeakingStatsModel.fromJson(statsJson);
      expect(stats.totalConversations, 5);
      expect(stats.averageOverallScore, 84);
      expect(stats.speakingBadgesCount, 2);
    });
  });

  group('PronunciationEvaluationService Tests', () {
    final service = PronunciationEvaluationService();

    test('Exact match yields high score (>= 85)', () {
      const phrase = 'வாழைப்பழம் மிகவும் இனிப்பாக இருக்கிறது.';
      final report = service.evaluate(spokenText: phrase, targetText: phrase);

      expect(report.score, greaterThanOrEqualTo(85));
      expect(report.accuracy, greaterThanOrEqualTo(85));
      expect(report.wordScores.length, 4);
      for (final w in report.wordScores) {
        expect(w.status, 'perfect');
      }
    });

    test('Identifies special Tamil letters (ழ, ற, ள, ண) when improvement needed', () {
      const target = 'வாழைப்பழம் இனிப்பு';
      const spoken = 'வாலைபழம் இனிப்பு'; // misspelled/mispronounced ழ as ல
      final report = service.evaluate(spokenText: spoken, targetText: target);

      expect(report.score, greaterThan(0));
      // Should give grapheme/practice tip for ழ
      final hasZhaTip = report.phonemeFeedback.any((p) => p.letter == 'ழ');
      expect(hasZhaTip, true);
    });

    test('Empty spoken text returns null score and unavailable state', () {
      final report = service.evaluate(spokenText: '', targetText: 'வணக்கம்');
      expect(report.score, isNull);
      expect(report.isAvailable, false);
      expect(report.wordScores.isEmpty, true);
    });

    test('Colloquial Tamil word variation scores high', () {
      final report = service.evaluate(
        spokenText: 'எனக்கு தோசை வேணும்',
        targetText: 'எனக்கு தோசை வேண்டும்',
      );
      expect(report.score, greaterThanOrEqualTo(85));
      expect(report.isAvailable, true);
    });

    test('Completely unrelated speech produces low score', () {
      final report = service.evaluate(
        spokenText: 'நான் நேற்று சென்னை சென்றேன்',
        targetText: 'எனக்கு ஒரு தோசை வேண்டும்',
      );
      expect(report.score, lessThan(40));
      expect(report.isAvailable, true);
    });
  });

  group('SpeechRecognitionService Tests', () {
    test('Status transitions correctly and uses recognized transcript', () async {
      final service = SpeechRecognitionService();
      expect(service.status, SpeechRecognitionStatus.idle);
      expect(service.isListening, false);

      await service.startListening();
      expect(service.status, SpeechRecognitionStatus.listening);
      expect(service.isListening, true);

      // Set actual recognized speech from user / STT
      service.setRecognizedTranscript('வணக்கம்');
      final result = await service.stopListening();
      expect(result, 'வணக்கம்');
      expect(service.status, SpeechRecognitionStatus.idle);

      service.dispose();
    });

    test('Cancel listening resets state', () async {
      final service = SpeechRecognitionService();
      await service.startListening();
      expect(service.isListening, true);

      await service.cancelListening();
      expect(service.isListening, false);
      expect(service.status, SpeechRecognitionStatus.idle);

      service.dispose();
    });
  });
}
