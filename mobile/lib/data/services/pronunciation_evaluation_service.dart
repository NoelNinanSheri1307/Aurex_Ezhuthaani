import '../../core/utils/tamil_grapheme_utils.dart';
import '../models/speaking_scenario_model.dart';

class PronunciationEvaluationService {
  static const Map<String, Map<String, String>> specialTamilLetters = {
    'ழ': {
      'name': 'Retroflex Approximant (ழ)',
      'tip': 'Curl the tip of your tongue backward towards the palate without touching it, letting air glide smoothly.',
      'tip_tamil': 'நாக்கின் நுனியை மேல் அண்ணத்தை தொடாமல் உள்நோக்கி மடித்து "ழ" என ஒலிக்கவும்.',
    },
    'ற': {
      'name': 'Hard Alveolar Trill (ற)',
      'tip': 'Tap the tongue firmly on the alveolar ridge behind top teeth with a crisp vibration.',
      'tip_tamil': 'நாக்கின் நுனியால் மேல் அண்ணத்தை அழுத்தி "ற" என ஒலிக்கவும்.',
    },
    'ள': {
      'name': 'Retroflex Lateral (ள)',
      'tip': 'Curl the tongue backwards and press against the roof of the mouth releasing air from both sides.',
      'tip_tamil': 'நாக்கை உள்நோக்கி மடித்து அண்ணத்தைத் தொட்டு "ள" என ஒலிக்கவும்.',
    },
    'ண': {
      'name': 'Retroflex Nasal (ண)',
      'tip': 'Curl the tongue backwards and make an "N" nasal sound against the hard palate.',
      'tip_tamil': 'நாக்கை உள்நோக்கி மடித்து "ண" என்ற மூக்கொலியை எழுப்பவும்.',
    },
  };

  static const Map<String, String> colloquialEquivalents = {
    'வேணும்': 'வேண்டும்',
    'வேண்டும்': 'வேணும்',
    'கொடுங்க': 'கொடுங்கள்',
    'கொடுங்கள்': 'கொடுங்க',
    'தாங்க': 'தாருங்கள்',
    'தாருங்கள்': 'தாங்க',
    'வாங்க': 'வாருங்கள்',
    'வாருங்கள்': 'வாங்க',
    'போங்க': 'போங்கள்',
    'போங்கள்': 'போங்க',
    'வைங்க': 'வைங்கள்',
    'வைங்கள்': 'வைங்க',
    'ரூபா': 'ரூபாய்',
    'ரூபாய்': 'ரூபா',
  };

  /// Normalizes Tamil text by removing punctuation and collapsing whitespace
  String normalizeText(String input) {
    if (input.trim().isEmpty) return '';
    var text = input.trim();
    // remove punctuation
    text = text.replaceAll(RegExp(r'[!?,.:;"\x27\(\)\-_/\\\[\]]'), ' ');
    // collapse multiple spaces
    text = text.replaceAll(RegExp(r'\s+'), ' ').trim();
    return text;
  }

  /// Evaluates spoken Tamil phrase against target phrase.
  /// Uses Tamil grapheme / word-level comparison without claiming acoustic phoneme detection.
  PronunciationReportModel evaluate({
    required String spokenText,
    required String targetText,
  }) {
    final cleanSpoken = normalizeText(spokenText);
    final cleanTarget = normalizeText(targetText);

    if (cleanSpoken.isEmpty) {
      return PronunciationReportModel(
        score: null,
        accuracy: 0,
        feedback: 'குரல் தெளிவாக கேட்கவில்லை. மீண்டும் பேசவும் அல்லது தட்டச்சு செய்யவும். (Could not understand the recording clearly. Try speaking again or type instead.)',
        wordScores: const [],
        phonemeFeedback: const [],
        recognizedText: spokenText,
        isAvailable: false,
      );
    }

    final targetWords = cleanTarget.split(' ').where((w) => w.isNotEmpty).toList();
    final spokenWords = cleanSpoken.split(' ').where((w) => w.isNotEmpty).toList();

    final wordScores = <WordScoreModel>[];
    final phonemeTips = <PhonemeFeedbackModel>[];
    final seenPhonemes = <String>{};

    int totalWordScore = 0;

    for (final tWord in targetWords) {
      int bestWordScore = 0;
      String bestSpokenWord = '';

      for (final sWord in spokenWords) {
        // 1. Exact match
        if (sWord == tWord) {
          bestWordScore = 100;
          bestSpokenWord = sWord;
          break;
        }

        // 2. Colloquial equivalence (e.g. வேணும் vs வேண்டும்)
        if (colloquialEquivalents[tWord] == sWord || colloquialEquivalents[sWord] == tWord) {
          if (bestWordScore < 92) {
            bestWordScore = 92;
            bestSpokenWord = sWord;
          }
          continue;
        }

        // 3. Grapheme cluster comparison
        final tGraphemes = TamilGraphemeUtils.splitGraphemes(tWord);
        final sGraphemes = TamilGraphemeUtils.splitGraphemes(sWord);

        int matches = 0;
        for (int i = 0; i < tGraphemes.length; i++) {
          if (i < sGraphemes.length && tGraphemes[i] == sGraphemes[i]) {
            matches++;
          } else if (sGraphemes.contains(tGraphemes[i])) {
            matches++;
          }
        }

        final sim = (matches / (tGraphemes.isEmpty ? 1 : tGraphemes.length) * 100).round();
        if (sim > bestWordScore) {
          bestWordScore = sim;
          bestSpokenWord = sWord;
        }
      }

      // Penalize unrelated words if similarity is too low
      if (bestWordScore < 45) {
        bestWordScore = 0;
      }

      totalWordScore += bestWordScore;
      final status = bestWordScore >= 85
          ? 'perfect'
          : (bestWordScore >= 60 ? 'good' : 'needs_work');

      wordScores.add(WordScoreModel(
        word: tWord,
        target: tWord,
        spoken: bestSpokenWord,
        score: bestWordScore,
        status: status,
      ));

      // Special Tamil letter feedback based on recognized transcript
      for (final entry in specialTamilLetters.entries) {
        final letter = entry.key;
        if (tWord.contains(letter) && !seenPhonemes.contains(letter) && bestWordScore < 80) {
          seenPhonemes.add(letter);
          phonemeTips.add(PhonemeFeedbackModel(
            letter: letter,
            name: entry.value['name'] ?? letter,
            tip: '💡 Your transcript suggests practicing "$letter" in "$tWord". ${entry.value['tip'] ?? ''}',
            tipTamil: '💡 உங்கள் பேச்சின் அடிப்படையில் "$tWord" சொல்லில் "$letter" எழுத்தை கவனமாக உச்சரிக்கலாம்.',
          ));
        }
      }
    }

    final avgScore = targetWords.isEmpty ? 0 : (totalWordScore / targetWords.length).round();
    final finalScore = avgScore.clamp(0, 100);

    String feedbackText;
    if (finalScore >= 90) {
      feedbackText = 'அற்புதம்! மிகச் சிறப்பான உச்சரிப்பு! (Superb! Excellent pronunciation!)';
    } else if (finalScore >= 70) {
      feedbackText = 'மிக நன்று! வார்த்தைகள் தெளிவாக உள்ளன. (Very good! Words are clear.)';
    } else if (finalScore >= 45) {
      feedbackText = 'நல்ல முயற்சி! இன்னும் கொஞ்சம் தெளிவாக பேசலாம். (Good effort! Try speaking a bit more clearly.)';
    } else {
      feedbackText = 'தொடர்ந்து பயிற்சி செய்யுங்கள், நீங்கள் சாதிக்கலாம்! (Keep practicing, you will master it!)';
    }

    return PronunciationReportModel(
      score: finalScore,
      accuracy: finalScore,
      feedback: feedbackText,
      wordScores: wordScores,
      phonemeFeedback: phonemeTips,
      recognizedText: spokenText,
      isAvailable: true,
    );
  }

}
