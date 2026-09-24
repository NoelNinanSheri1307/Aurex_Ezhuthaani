export interface RhymeVocabularyItem {
  id: string;
  tamil: string;
  transliteration: string;
  english: string;
  objectId: string;
}

export interface RhymeLine {
  id: string;
  tamil: string;
  transliteration: string;
  english: string;
  highlightWords?: string[];
  actionObject?: string;
}

export interface InteractiveObjectMeta {
  objectId: string;
  tamil: string;
  transliteration: string;
  english: string;
  color: string;
}

export interface RhymeData {
  id: string;
  slug: string;
  titleTa: string;
  titleEn: string;
  subtitleTa: string;
  subtitleEn: string;
  category: "nature" | "animals" | "colours" | "numbers" | "family" | "everyday";
  ageGroup: string;
  coverImage?: string;
  lines: RhymeLine[];
  vocabulary: RhymeVocabularyItem[];
  interactiveObjects: InteractiveObjectMeta[];
  discoveryPrompt?: {
    questionTa: string;
    questionEn: string;
    targetObjectId: string;
  };
}

export const INTERACTIVE_RHYMES: RhymeData[] = [
  {
    id: "mazhai-vandhadhu",
    slug: "mazhai-vandhadhu",
    titleTa: "தமிழ் 3D உலகம் (மழை வந்தது)",
    titleEn: "Interactive 3D Tamil World",
    subtitleTa: "மழை, யானை, மரம், பூக்கள், கோவில் மற்றும் இயற்கை",
    subtitleEn: "Explore nature, animals, traditional village life, and vocabulary in interactive 3D",
    category: "nature",
    ageGroup: "1-6 years",
    coverImage: "/assets/mascothappy.png",
    lines: [
      {
        id: "l1",
        tamil: "மழை வந்தது மழை வந்தது!",
        transliteration: "Mazhai vandhadhu mazhai vandhadhu!",
        english: "The rain came, the rain came!",
        highlightWords: ["மழை"],
        actionObject: "rain",
      },
      {
        id: "l2",
        tamil: "யானை குடை பிடித்தது!",
        transliteration: "Yaanai kudai pidithadhu!",
        english: "The elephant held an umbrella!",
        highlightWords: ["யானை", "குடை"],
        actionObject: "elephant",
      },
      {
        id: "l3",
        tamil: "மரம் பச்சை ஆனது!",
        transliteration: "Maram pachai aanadhu!",
        english: "The tree turned bright green!",
        highlightWords: ["மரம்"],
        actionObject: "tree",
      },
      {
        id: "l4",
        tamil: "பூக்கள் அழகாய் சிரித்தது!",
        transliteration: "Pookkal azhagai sirithadhu!",
        english: "The flowers smiled beautifully!",
        highlightWords: ["பூக்கள்"],
        actionObject: "flower",
      },
      {
        id: "l5",
        tamil: "சூரியன் வெளிச்சம் தந்தது!",
        transliteration: "Sooriyan velicham thandhadhu!",
        english: "The sun gave bright light!",
        highlightWords: ["சூரியன்"],
        actionObject: "sun",
      },
    ],
    vocabulary: [
      { id: "v-yanii", tamil: "யானை", transliteration: "Yaanai", english: "Elephant", objectId: "elephant" },
      { id: "v-mazhai", tamil: "மழை", transliteration: "Mazhai", english: "Rain", objectId: "rain" },
      { id: "v-maram", tamil: "மரம்", transliteration: "Maram", english: "Tree", objectId: "tree" },
      { id: "v-poo", tamil: "பூக்கள்", transliteration: "Pookkal", english: "Flowers", objectId: "flower" },
      { id: "v-kudai", tamil: "குடை", transliteration: "Kudai", english: "Umbrella", objectId: "umbrella" },
      { id: "v-sooriyan", tamil: "சூரியன்", transliteration: "Sooriyan", english: "Sun", objectId: "sun" },
      { id: "v-mayil", tamil: "மயில்", transliteration: "Mayil", english: "Peacock", objectId: "peacock" },
      { id: "v-bull", tamil: "காளை", transliteration: "Kaalai", english: "Bull", objectId: "bull" },
      { id: "v-river", tamil: "ஆறு", transliteration: "Aaru", english: "River", objectId: "river" },
      { id: "v-bridge", tamil: "மரப் பாலம்", transliteration: "Marap Paalam", english: "Wooden Bridge", objectId: "bridge" },
      { id: "v-house", tamil: "கிராம வீடு", transliteration: "Giraama Veedu", english: "Village House", objectId: "house" },
      { id: "v-monument", tamil: "கல் தூண்", transliteration: "Kal Thoon", english: "Granite Monument", objectId: "monument" },
      { id: "v-palm", tamil: "பனை மரம்", transliteration: "Panai Maram", english: "Palmyra Tree", objectId: "palm" },
      { id: "v-banyan", tamil: "ஆலமரம்", transliteration: "Aalamaram", english: "Banyan Tree", objectId: "banyan" },
      { id: "v-coconut", tamil: "தென்னை மரம்", transliteration: "Thennai Maram", english: "Coconut Tree", objectId: "coconut" },
      { id: "v-hut", tamil: "குடில்", transliteration: "Kudil", english: "Thatched Hut", objectId: "hut" },
      { id: "v-temple", tamil: "கோவில்", transliteration: "Kovil Gopuram", english: "Temple Tower", objectId: "temple" },
      { id: "v-drum", tamil: "பறை / மேளம்", transliteration: "Parai / Melam", english: "Folk Drum", objectId: "drum" },
      { id: "v-pot", tamil: "மண் பானை", transliteration: "Mann Paanai", english: "Clay Pot", objectId: "pot" },
      { id: "v-field", tamil: "நெற்பயிர்", transliteration: "Nerpayir", english: "Paddy Crop", objectId: "field" },
      { id: "v-lamp", tamil: "அகல் விளக்கு", transliteration: "Agal Vilakku", english: "Oil Lamp", objectId: "lamp" },
      { id: "v-boat", tamil: "பரிசல்", transliteration: "Parisal", english: "Coracle Boat", objectId: "boat" },
    ],
    interactiveObjects: [
      { objectId: "elephant", tamil: "யானை", transliteration: "Yaanai", english: "Elephant", color: "#f59e0b" },
      { objectId: "tree", tamil: "மரம்", transliteration: "Maram", english: "Tree", color: "#10b981" },
      { objectId: "flower", tamil: "பூக்கள்", transliteration: "Pookkal", english: "Flowers", color: "#ec4899" },
      { objectId: "rain", tamil: "மழை", transliteration: "Mazhai", english: "Rain", color: "#3b82f6" },
      { objectId: "umbrella", tamil: "குடை", transliteration: "Kudai", english: "Umbrella", color: "#8b5cf6" },
      { objectId: "sun", tamil: "சூரியன்", transliteration: "Sooriyan", english: "Sun", color: "#eab308" },
      { objectId: "peacock", tamil: "மயில்", transliteration: "Mayil", english: "Peacock", color: "#0284c7" },
      { objectId: "bull", tamil: "காளை", transliteration: "Kaalai", english: "Bull", color: "#78350f" },
      { objectId: "river", tamil: "ஆறு", transliteration: "Aaru", english: "River", color: "#06b6d4" },
      { objectId: "bridge", tamil: "மரப் பாலம்", transliteration: "Marap Paalam", english: "Wooden Bridge", color: "#a16207" },
      { objectId: "house", tamil: "வீடு", transliteration: "Veedu", english: "House", color: "#ea580c" },
      { objectId: "monument", tamil: "கல் தூண்", transliteration: "Kal Thoon", english: "Monument", color: "#64748b" },
      { objectId: "coconut", tamil: "தென்னை மரம்", transliteration: "Thennai Maram", english: "Coconut Tree", color: "#15803d" },
      { objectId: "hut", tamil: "குடில்", transliteration: "Kudil", english: "Hut", color: "#d97706" },
      { objectId: "temple", tamil: "கோவில்", transliteration: "Kovil", english: "Temple", color: "#f59e0b" },
      { objectId: "drum", tamil: "பறை", transliteration: "Parai", english: "Drum", color: "#b45309" },
      { objectId: "pot", tamil: "மண் பானை", transliteration: "Mann Paanai", english: "Clay Pot", color: "#9a3412" },
      { objectId: "field", tamil: "நெற்பயிர்", transliteration: "Nerpayir", english: "Paddy Field", color: "#84cc16" },
      { objectId: "lamp", tamil: "அகல் விளக்கு", transliteration: "Agal Vilakku", english: "Oil Lamp", color: "#facc15" },
      { objectId: "boat", tamil: "பரிசல்", transliteration: "Parisal", english: "Coracle Boat", color: "#451a03" },
    ],
    discoveryPrompt: {
      questionTa: "3D உலகில் உள்ள யானையை தொட்டு அல்லது கிளிக் செய்து கண்டுபிடியுங்கள்!",
      questionEn: "Tap or click on the Elephant inside the 3D world to discover its pronunciation!",
      targetObjectId: "elephant",
    },
  },
];

export function getRhymeBySlug(slug: string): RhymeData | undefined {
  return INTERACTIVE_RHYMES.find((r) => r.slug === slug);
}
