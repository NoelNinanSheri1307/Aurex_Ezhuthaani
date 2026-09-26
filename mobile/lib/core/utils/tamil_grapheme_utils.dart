import 'package:characters/characters.dart';

/// Utilities for Unicode Tamil grapheme cluster manipulation.
///
/// In Tamil, letters like "தி", "கி", "கௌ", "ழ்" consist of a base consonant
/// followed by one or more combining vowel signs or a virama (pulli).
/// They MUST be treated as single user-perceived characters (grapheme clusters),
/// not split into raw UTF-16 code units or isolated combining marks.
class TamilGraphemeUtils {
  TamilGraphemeUtils._();

  /// Splits a Tamil word/string into individual user-perceived grapheme clusters.
  /// Example: 'தமிழ்' -> ['த', 'மி', 'ழ்']
  /// Example: 'தி' -> ['தி']
  static List<String> splitGraphemes(String text) {
    if (text.isEmpty) return const [];
    return text.characters.toList();
  }

  /// Returns the count of grapheme clusters in [text].
  /// Example: 'தமிழ்' -> 3
  static int graphemeLength(String text) {
    if (text.isEmpty) return 0;
    return text.characters.length;
  }

  /// Checks if [text] consists of exactly one Tamil grapheme cluster.
  static bool isSingleGrapheme(String text) {
    return text.characters.length == 1;
  }

  /// Checks if [char] is a Tamil combining vowel sign or virama (pulli).
  static bool isCombiningMark(String char) {
    if (char.isEmpty) return false;
    final code = char.codeUnitAt(0);
    // Tamil Unicode block combining signs:
    // 0x0BBE (ா) to 0x0BCD (்), and 0x0BD7 (ௗ)
    return (code >= 0x0BBE && code <= 0x0BCD) || code == 0x0BD7;
  }

  /// Combines a base consonant with a combining mark, returning the
  /// canonical resulting grapheme cluster.
  static String combine(String base, String mark) {
    final combined = '$base$mark';
    final clusters = combined.characters.toList();
    return clusters.isNotEmpty ? clusters.first : combined;
  }

  /// Curated complete Tamil grapheme clusters grouped by category for keypad selection.
  static const List<String> uyirLetters = [
    'அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ',
  ];

  static const List<String> meiLetters = [
    'க்', 'ங்', 'ச்', 'ஞ்', 'ட்', 'ண்', 'த்', 'ந்', 'ப்', 'ம்', 'ய்', 'ர்', 'ல்', 'வ்', 'ழ்', 'ள்', 'ற்', 'ன்',
  ];

  static const List<String> baseConsonants = [
    'க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன',
  ];

  static const List<String> vowelSigns = [
    '', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', '்',
  ];

  /// Generates the full 12 Uyirmei syllables + pulli (Mei) for a given base consonant.
  /// Example for 'த' -> ['த', 'தா', 'தி', 'தீ', 'து', 'தூ', 'தெ', 'தே', 'தை', 'தொ', 'தோ', 'தௌ', 'த்']
  static List<String> generateSyllables(String baseConsonant) {
    if (baseConsonant.isEmpty) return const [];
    return vowelSigns.map((sign) => combine(baseConsonant, sign)).toList();
  }
}
