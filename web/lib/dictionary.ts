import { DICTIONARY_ENTRIES, DictionaryEntry } from "./dictionaryData";

export type { DictionaryEntry };
export { DICTIONARY_ENTRIES };

export function getAllDictionaryEntries(): DictionaryEntry[] {
  return DICTIONARY_ENTRIES;
}

export function getAllCategories(): string[] {
  const categoriesSet = new Set<string>();
  DICTIONARY_ENTRIES.forEach((entry) => {
    if (entry.category) categoriesSet.add(entry.category);
    if (entry.categories) {
      entry.categories.forEach((c) => categoriesSet.add(c));
    }
  });
  return ["All", ...Array.from(categoriesSet).sort()];
}

export function getDictionaryWord(queryOrId: string): DictionaryEntry | null {
  if (!queryOrId) return null;
  const normalized = queryOrId.trim().toLowerCase();
  const rawQuery = queryOrId.trim();

  // 1. Exact ID match
  const byId = DICTIONARY_ENTRIES.find((e) => e.id === normalized);
  if (byId) return byId;

  // 2. Exact Tamil match
  const byTamil = DICTIONARY_ENTRIES.find((e) => e.tamil === rawQuery);
  if (byTamil) return byTamil;

  // 3. Exact Transliteration match
  const byTr = DICTIONARY_ENTRIES.find((e) => e.transliteration.toLowerCase() === normalized);
  if (byTr) return byTr;

  // 4. Exact English match
  const byEng = DICTIONARY_ENTRIES.find(
    (e) =>
      e.english?.toLowerCase() === normalized ||
      e.meanings.some((m) => m.toLowerCase() === normalized) ||
      e.searchAliases?.some((a) => a.toLowerCase() === normalized)
  );
  if (byEng) return byEng;

  // 5. Substring Tamil match
  const byTamilSub = DICTIONARY_ENTRIES.find((e) => e.tamil.includes(rawQuery));
  if (byTamilSub) return byTamilSub;

  // 6. Substring English match
  const byEngSub = DICTIONARY_ENTRIES.find(
    (e) =>
      e.english?.toLowerCase().includes(normalized) ||
      e.meanings.some((m) => m.toLowerCase().includes(normalized)) ||
      e.searchAliases?.some((a) => a.toLowerCase().includes(normalized))
  );
  if (byEngSub) return byEngSub;

  return null;
}

export function searchDictionary(query: string, category: string = "All"): DictionaryEntry[] {
  let results = DICTIONARY_ENTRIES;

  if (category && category !== "All") {
    const catLower = category.toLowerCase();
    results = results.filter((e) => {
      const primaryMatch = e.category.toLowerCase() === catLower;
      const extraMatch = e.categories?.some((c) => c.toLowerCase() === catLower);
      return primaryMatch || extraMatch;
    });
  }

  const q = query.trim().toLowerCase();
  if (!q) return results;
  const rawQuery = query.trim();

  return results.filter((entry) => {
    // 1. Tamil match (exact or substring)
    const matchTamil = entry.tamil.includes(rawQuery) || entry.tamil.toLowerCase().includes(q);

    // 2. Transliteration match
    const matchTr = entry.transliteration ? entry.transliteration.toLowerCase().includes(q) : false;

    // 3. English word / Gloss match
    const matchEnglish = entry.english ? entry.english.toLowerCase().includes(q) : false;

    // 4. Meanings array match
    const matchMeanings = entry.meanings ? entry.meanings.some((m) => m.toLowerCase().includes(q)) : false;

    // 5. Search Aliases match
    const matchAliases = entry.searchAliases ? entry.searchAliases.some((a) => a.toLowerCase().includes(q)) : false;

    // 6. Example usage match (Tamil example or English example translation)
    const matchExample =
      entry.example?.includes(rawQuery) ||
      entry.exampleTranslation?.toLowerCase().includes(q) ||
      entry.examples?.some((ex) => ex.tamil.includes(rawQuery) || ex.english.toLowerCase().includes(q));

    return matchTamil || matchTr || matchEnglish || matchMeanings || matchAliases || matchExample;
  });
}

export function getRelatedWords(entry: DictionaryEntry): DictionaryEntry[] {
  if (!entry.relatedWords || entry.relatedWords.length === 0) {
    return DICTIONARY_ENTRIES.filter(
      (e) => e.id !== entry.id && e.category === entry.category
    ).slice(0, 4);
  }
  return entry.relatedWords
    .map((idOrTamil) => getDictionaryWord(idOrTamil))
    .filter((e): e is DictionaryEntry => e !== null);
}

/**
 * External Dictionary API Lookup Fallback
 * Queries Tamil Wiktionary & MyMemory API for unbundled Tamil or English words.
 */
export async function fetchExternalDictionaryEntry(word: string): Promise<DictionaryEntry | null> {
  const cleanWord = word.trim();
  if (!cleanWord) return null;

  try {
    const isEnglish = /^[a-zA-Z\s]+$/.test(cleanWord);
    const langpair = isEnglish ? "en|ta" : "ta|en";

    // Try MyMemory Translation API for English <-> Tamil
    const translationUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=${langpair}`;
    const transRes = await fetch(translationUrl);
    if (transRes.ok) {
      const transData = await transRes.json();
      const translatedText = transData?.responseData?.translatedText;
      if (translatedText && translatedText.toUpperCase() !== cleanWord.toUpperCase()) {
        const tamilWord = isEnglish ? translatedText : cleanWord;
        const englishWord = isEnglish ? cleanWord : translatedText;
        return {
          id: `ext_${cleanWord}`,
          tamil: tamilWord,
          transliteration: cleanWord,
          english: englishWord,
          meanings: [translatedText],
          category: "External Lookup",
          example: `${tamilWord} - ${isEnglish ? "தமிழ் சொல்" : "English meaning"}.`,
          exampleTranslation: `Translation for "${cleanWord}": "${translatedText}".`,
        };
      }
    }
  } catch (err) {
    console.warn("External dictionary lookup failed:", err);
  }

  return null;
}

