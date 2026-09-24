/**
 * Tamil Grapheme Unit Utility Functions
 * Uses Intl.Segmenter where supported, with regex fallback for Tamil combining marks.
 */

// Common Tamil base graphemes to draw distractors from if needed
const COMMON_TAMIL_GRAPHEMES = [
  "அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ",
  "க", "கா", "கி", "கீ", "கு", "கூ", "கெ", "கே", "கை", "கொ", "கோ", "க்",
  "ச", "சா", "சி", "சீ", "சு", "சூ", "செ", "சே", "சை", "சொ", "சோ", "ச்",
  "த", "தா", "தி", "தீ", "து", "தூ", "தெ", "தே", "தை", "தொ", "தோ", "த்",
  "ந", "நா", "நி", "நீ", "நு", "நூ", "நெ", "நே", "நை", "நொ", "நோ", "ந்",
  "ப", "பா", "பி", "பீ", "பு", "பூ", "பெ", "பே", "பை", "பொ", "போ", "ப்",
  "ம", "மா", "மி", "மீ", "மு", "மூ", "மெ", "மே", "மை", "மொ", "மோ", "ம்",
  "ய", "யா", "யி", "யீ", "யு", "யூ", "யெ", "யே", "யை", "யொ", "யோ", "ய்",
  "ர", "ரா", "ரி", "ரீ", "ரு", "ரூ", "ரெ", "ரே", "ரை", "ரொ", "ரோ", "ர்",
  "ல", "லா", "லி", "லீ", "லு", "லூ", "லெ", "லே", "லை", "லொ", "லோ", "ல்",
  "வ", "வா", "வி", "வீ", "வு", "வூ", "வெ", "வே", "வை", "வொ", "வோ", "வ்",
  "ழ", "ழா", "ழி", "ழீ", "ழு", "ழூ", "ழெ", "ழே", "ழை", "ழொ", "ழோ", "ழ்",
  "ள", "ளா", "ளி", "ளீ", "ளு", "ளூ", "ளெ", "ளே", "ளை", "ளொ", "ளோ", "ள்",
  "ற", "றா", "றி", "றீ", "று", "றூ", "றெ", "றே", "றை", "றொ", "றோ", "ற்",
  "ன", "னா", "னி", "னீ", "னு", "னூ", "னெ", "னே", "னை", "னொ", "னோ", "ன்",
];

/**
 * Splits a Tamil string into visible grapheme units (e.g. 'வணக்கம்' -> ['வ', 'ண', 'க்', 'க', 'ம்']).
 */
export function getTamilGraphemes(text: string): string[] {
  if (!text) return [];

  const cleanText = text.trim();

  // 1. Modern browser Intl.Segmenter
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter("ta", { granularity: "grapheme" });
      const segments = Array.from(segmenter.segment(cleanText), (s) => s.segment);
      if (segments.length > 0) {
        return segments;
      }
    } catch {
      // Fall through to regex
    }
  }

  // 2. Fallback regex for Tamil base character + combining marks
  // Tamil range: U+0B80 to U+0BFF
  // Combining vowel signs/marks: U+0B82, U+0BC0..U+0BCD, U+0BD7
  const regex = /[\u0B80-\u0BFF][\u0B82\u0BC0-\u0BCD\u0BD7]*/g;
  const matches = cleanText.match(regex);
  if (matches && matches.join("") === cleanText) {
    return matches;
  }

  // 3. Fallback character array
  return Array.from(cleanText);
}

/**
 * Fisher-Yates shuffle array helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates distractor graphemes not in target list to pad game tile pools.
 */
export function getDistractorGraphemes(targetGraphemes: string[], count: number = 4): string[] {
  const targetSet = new Set(targetGraphemes);
  const candidates = COMMON_TAMIL_GRAPHEMES.filter((g) => !targetSet.has(g));
  const shuffled = shuffleArray(candidates);
  return shuffled.slice(0, count);
}
