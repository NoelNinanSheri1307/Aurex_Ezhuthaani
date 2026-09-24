/**
 * Structured Passage Dataset for Feature 10 — Reading-Aloud Mode.
 * Contains beginner, intermediate, cultural, and classical Tamil reading passages
 * divided into manageable reading chunks with transliterations and dictionary word mappings.
 */

export interface ReadingChunk {
  id: string;
  tamil: string;
  transliteration?: string;
  english?: string;
  dictionaryWordIds?: string[];
}

export interface ReadingPassage {
  id: string;
  slug: string;
  titleTa: string;
  titleEn: string;
  difficulty: "Beginner" | "Intermediate" | "Literary" | "Everyday Tamil" | "Culture";
  category: "Beginner" | "Intermediate" | "Literary" | "Everyday Tamil" | "Culture";
  stageId: string; // Required curriculum stage ID ("adippadai", "ezhuthukkal", "sorkkal", "thodargal", "vaasippu", "agradhi", "noolgam")
  stageNameEn: string;
  sourceName?: string;
  summaryTa: string;
  summaryEn: string;
  chunks: ReadingChunk[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "vanakkam-vazhthu",
    slug: "vanakkam-vazhthu",
    titleTa: "வணக்கமும் வாழ்த்தும்",
    titleEn: "Greetings & Courtesy",
    difficulty: "Beginner",
    category: "Beginner",
    stageId: "adippadai",
    stageNameEn: "Stage 1: Tamil Basics",
    sourceName: "Ezhuthaani Basic Conversations",
    summaryTa: "அன்றாட வாழ்வில் பயன்படுத்தப்படும் எளிய வரவேற்பு மற்றும் வாழ்த்து வாக்கியங்கள்.",
    summaryEn: "Essential daily greetings and polite conversational Tamil sentences.",
    chunks: [
      {
        id: "vv-1",
        tamil: "வணக்கம்! என் பெயர் அன்பு.",
        transliteration: "Vanakkam! En peyar Anbu.",
        english: "Hello! My name is Anbu.",
        dictionaryWordIds: ["vanakkam", "peyar"],
      },
      {
        id: "vv-2",
        tamil: "உங்களைச் சந்திப்பதில் மிக்க மகிழ்ச்சி.",
        transliteration: "Ungalaich sandhippadhil mikka magizhchi.",
        english: "Very happy to meet you.",
        dictionaryWordIds: ["magizhchi"],
      },
      {
        id: "vv-3",
        tamil: "நன்றி, மீண்டும் சந்திப்போம்.",
        transliteration: "Nandri, meendum sandhippom.",
        english: "Thank you, see you again.",
        dictionaryWordIds: ["nandri"],
      },
    ],
  },
  {
    id: "en-kudumbam",
    slug: "en-kudumbam",
    titleTa: "என் குடும்பம்",
    titleEn: "My Family & Home",
    difficulty: "Beginner",
    category: "Beginner",
    stageId: "adippadai",
    stageNameEn: "Stage 1: Tamil Basics",
    sourceName: "Ezhuthaani Everyday Passages",
    summaryTa: "குடும்ப உறுப்பினர்கள் மற்றும் இல்லத்தைப் பற்றிய எளிய தமிழ் வாக்கியங்கள்.",
    summaryEn: "Simple Tamil sentences describing family members and household togetherness.",
    chunks: [
      {
        id: "ek-1",
        tamil: "இது என்னுடைய குடும்பம்.",
        transliteration: "Idhu ennudaiya kudumbam.",
        english: "This is my family.",
        dictionaryWordIds: ["kudumbam"],
      },
      {
        id: "ek-2",
        tamil: "எங்கள் வீட்டில் அம்மா, அப்பா, அண்ணன் உள்ளனர்.",
        transliteration: "Engal veettil amma, appa, annan ullanar.",
        english: "In our home there are mother, father, and elder brother.",
        dictionaryWordIds: ["amma", "appa", "annan"],
      },
      {
        id: "ek-3",
        tamil: "நாங்கள் அனைவரும் ஒன்றாக அன்புடன் வாழ்கிறோம்.",
        transliteration: "Naangal anaivarum ondraaga anbudan vaazhgirom.",
        english: "We all live together with love.",
        dictionaryWordIds: ["anbu"],
      },
    ],
  },
  {
    id: "santhaiyil-uraiyadal",
    slug: "santhaiyil-uraiyadal",
    titleTa: "சந்தையில் உரையாடல்",
    titleEn: "At the Local Market",
    difficulty: "Beginner",
    category: "Everyday Tamil",
    stageId: "sorkkal",
    stageNameEn: "Stage 3: Words (சொற்கள்)",
    sourceName: "Ezhuthaani Practical Dialogues",
    summaryTa: "உள்ளூர் சந்தையில் காய்கறிகள் வாங்கும்போது நிகழும் இயல்பான உரையாடல்.",
    summaryEn: "Natural dialogue when purchasing fresh vegetables at a local market.",
    chunks: [
      {
        id: "su-1",
        tamil: "ஐயா, புதிய காய்கறிகள் என்ன விலை?",
        transliteration: "Aiyaa, pudhiya kaaygarigal enna vilai?",
        english: "Sir, what is the price of fresh vegetables?",
        dictionaryWordIds: ["kaaygari"],
      },
      {
        id: "su-2",
        tamil: "தக்காளி ஒரு கிலோ ஐம்பது ரூபாய்.",
        transliteration: "Thakkaali oru kilo aimbadhu roobai.",
        english: "Tomatoes are fifty rupees per kilo.",
        dictionaryWordIds: [],
      },
      {
        id: "su-3",
        tamil: "இரண்டு கிலோ தக்காளி கொடுங்கள், நன்றி.",
        transliteration: "Irandu kilo thakkaali kodungal, nandri.",
        english: "Please give two kilos of tomatoes, thank you.",
        dictionaryWordIds: ["nandri"],
      },
    ],
  },
  {
    id: "tamil-mozhi-sirappu",
    slug: "tamil-mozhi-sirappu",
    titleTa: "தமிழ் மொழியின் சிறப்பு",
    titleEn: "The Greatness of Tamil Language",
    difficulty: "Intermediate",
    category: "Intermediate",
    stageId: "thodargal",
    stageNameEn: "Stage 4: Sentences (தொடர்கள்)",
    sourceName: "Ezhuthaani Language Heritage",
    summaryTa: "தமிழ் மொழியின் தொன்மை மற்றும் செம்மொழிச் சிறப்பை விளக்கும் வாசிப்புப் பகுதி.",
    summaryEn: "A reading passage highlighting the antiquity and classical legacy of Tamil.",
    chunks: [
      {
        id: "tm-1",
        tamil: "தமிழ் உலகின் மிகத் தொன்மையான மொழிகளில் ஒன்றாகும்.",
        transliteration: "Tamil ulagin migath thonmaiyaana mozhigalil ondraagum.",
        english: "Tamil is one of the oldest languages in the world.",
        dictionaryWordIds: ["mozhi", "ulagam"],
      },
      {
        id: "tm-2",
        tamil: "இது இந்தியாவில் முதன்முதலில் செம்மொழித் தகுதி பெற்ற மொழியாகும்.",
        transliteration: "Idhu indhiyaavil mudhanmudhalil semmozhit thagudhi petra mozhiyaagum.",
        english: "It is the first language in India to receive official classical language status.",
        dictionaryWordIds: ["mozhi"],
      },
      {
        id: "tm-3",
        tamil: "இன்று உலகம் முழுவதும் பல கோடி மக்கள் தமிழைப் பேசுகின்றனர்.",
        transliteration: "Indru ulagam muzhuvadhum pala kodi makkal thamizhaip paesuginranar.",
        english: "Today millions of people worldwide speak Tamil.",
        dictionaryWordIds: ["makkal", "ulagam"],
      },
    ],
  },
  {
    id: "iyarkaiyum-mazhaiyum",
    slug: "iyarkaiyum-mazhaiyum",
    titleTa: "இயற்கையும் மழையும்",
    titleEn: "Nature & Rain in Tamilakam",
    difficulty: "Intermediate",
    category: "Intermediate",
    stageId: "thodargal",
    stageNameEn: "Stage 4: Sentences (தொடர்கள்)",
    sourceName: "Ezhuthaani Nature Series",
    summaryTa: "தமிழ்நாட்டின் இயற்கை எழில் மற்றும் மழைக்கால நிலப்பரப்பைப் பற்றிய உரைநடை.",
    summaryEn: "A poetic prose description of monsoon landscapes and natural beauty in Tamil Nadu.",
    chunks: [
      {
        id: "im-1",
        tamil: "மழைக்காலத்தில் தமிழ்நாட்டின் வயல்கள் பச்சைப்பசேலென மாறுகின்றன.",
        transliteration: "Mazhaikkaalathil tamilnaattin vayalgal pachaippasaelena maaruginrana.",
        english: "During the rainy season, Tamil Nadu's fields turn lush green.",
        dictionaryWordIds: ["vayal", "mazhai"],
      },
      {
        id: "im-2",
        tamil: "தென்றல் காற்று வீசும்போது மரங்கள் அசைகின்றன.",
        transliteration: "Thendral kaatru veasumbodhu marangal asaiginrana.",
        english: "When gentle breeze blows, trees sway gracefully.",
        dictionaryWordIds: ["kaatru", "maram"],
      },
      {
        id: "im-3",
        tamil: "இயற்கையைப் பேணிப் பாதுகாப்பது நமது கடமையாகும்.",
        transliteration: "Iyarkaiyaip paenip paadhukaappadhu namadhu kadamaiyaagum.",
        english: "Nurturing and protecting nature is our supreme duty.",
        dictionaryWordIds: [],
      },
    ],
  },
  {
    id: "kaveri-pambadu",
    slug: "kaveri-pambadu",
    titleTa: "காவிரி கரையின் பாரம்பரியம்",
    titleEn: "Heritage of Kaveri River Delta",
    difficulty: "Intermediate",
    category: "Culture",
    stageId: "vaasippu",
    stageNameEn: "Stage 5: Reading (வாசிப்பு)",
    sourceName: "Ezhuthaani Cultural Heritage",
    summaryTa: "காவிரி பாயும் டெல்டா நிலத்தின் விவசாயம் மற்றும் கலைப் பாரம்பரியம்.",
    summaryEn: "Explores the agricultural fertility, temples, and musical heritage of the Kaveri Delta.",
    chunks: [
      {
        id: "kp-1",
        tamil: "காவிரி ஆறு தமிழ்நாட்டின் முதன்மையான உயிர்நாடியாகும்.",
        transliteration: "Kaveri aaru tamilnaattin mudhanmaiyaana uyirnaadiyaagum.",
        english: "Kaveri river is the foremost lifeline of Tamil Nadu.",
        dictionaryWordIds: ["aaru"],
      },
      {
        id: "kp-2",
        tamil: "காவிரிக் கரையில் தஞ்சாவூர் பெரிய கோவில் கம்பீரமாக அமைந்துள்ளது.",
        transliteration: "Kaverik karaiyil thanjavur periya kovil gambeeramaaga amaindhulladhu.",
        english: "On Kaveri banks stands the majestic Thanjavur Big Temple.",
        dictionaryWordIds: ["kovil"],
      },
      {
        id: "kp-3",
        tamil: "இங்கு விவசாயமும் இசையும் செவ்வியல் கலைகளும் தலைத்தோங்கின.",
        transliteration: "Ingu vivasaayamum isaiyum sevviyal kalaigalum thalaithoongina.",
        english: "Here agriculture, classical music, and fine arts flourished for centuries.",
        dictionaryWordIds: ["isai"],
      },
    ],
  },
  {
    id: "aathichudi-nethi",
    slug: "aathichudi-nethi",
    titleTa: "ஆத்திசூடி அறநெறி வரிகள்",
    titleEn: "Ethical Verses of Aathichudi by Avvaiyar",
    difficulty: "Literary",
    category: "Literary",
    stageId: "agradhi",
    stageNameEn: "Stage 6: Understanding Texts (அகராதி)",
    sourceName: "Avvaiyar Aathichudi (Classical Heritage)",
    summaryTa: "ஔவையார் இயற்றிய ஆத்திசூடியின் புகழ்பெற்ற ஒற்றை வரி அறநெறிப் போதனைகள்.",
    summaryEn: "Memorable single-line moral aphorisms composed by venerable poet-saint Avvaiyar.",
    chunks: [
      {
        id: "an-1",
        tamil: "அறம் செய விரும்பு.",
        transliteration: "Aram seya virumbu.",
        english: "Desire to perform righteous and noble deeds.",
        dictionaryWordIds: ["aram"],
      },
      {
        id: "an-2",
        tamil: "ஆறுவது சினம்.",
        transliteration: "Aaruvedhu sinam.",
        english: "Anger should be cooled and subdued promptly.",
        dictionaryWordIds: ["sinam"],
      },
      {
        id: "an-3",
        tamil: "இயல்வது கரவேல்.",
        transliteration: "Iyalvedhu karavael.",
        english: "Do not withhold charity within your capability.",
        dictionaryWordIds: [],
      },
      {
        id: "an-4",
        tamil: "ஈவது விலக்கேல்.",
        transliteration: "Eevadhu vilakkael.",
        english: "Do not obstruct or prevent acts of giving.",
        dictionaryWordIds: [],
      },
      {
        id: "an-5",
        tamil: "ஊக்கமது கைவிடேல்.",
        transliteration: "Ookkamadhu kaividael.",
        english: "Never abandon enthusiasm, vigor, and determination.",
        dictionaryWordIds: ["ookkam"],
      },
    ],
  },
  {
    id: "thirukkural-aram",
    slug: "thirukkural-aram",
    titleTa: "திருக்குறள் - அறத்துப்பால்",
    titleEn: "Ethical Gems from Thirukkural",
    difficulty: "Literary",
    category: "Literary",
    stageId: "noolgam",
    stageNameEn: "Stage 7: Tamil Literature (நூலகம்)",
    sourceName: "Thiruvalluvar Thirukkural (Public Domain Classical)",
    summaryTa: "திருவள்ளுவர் இயற்றிய உலகப் பொதுமறையான திருக்குறளின் புகழ்பெற்ற மூன்று குறட்பாக்கள்.",
    summaryEn: "Three revered classical couplets from the Thirukkural on wisdom, love, and sweet speech.",
    chunks: [
      {
        id: "ta-1",
        tamil: "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.",
        transliteration: "Agara mudhala ezhuthellam aadhi bhagavan mudhatrae ulagu.",
        english: "As the letter 'A' is the beginning of all letters, the Divine is the primal origin of the world.",
        dictionaryWordIds: ["ezhuthu", "ulagam"],
      },
      {
        id: "ta-2",
        tamil: "அன்பின் வழியது உயிர்நிலை அஃதிலார்க்கு என்புதோல் போர்த்த உடம்பு.",
        transliteration: "Anbin vazhiyadhu uyirnilai ahdhilaarkku enbudhol portha udambu.",
        english: "A body blessed with love is the seat of true life; without love, it is merely bone wrapped in skin.",
        dictionaryWordIds: ["anbu", "udambu"],
      },
      {
        id: "ta-3",
        tamil: "இனிய உளவாக இன்னாத கூறல் கனிஇருப்பக் காய்நவர்ந் தற்று.",
        transliteration: "Iniya ulavaaga innaadha kooral kaniiruppak kaainavarndhatru.",
        english: "To speak harsh words when sweet words exist is like choosing unripe fruit when ripe fruit is plentiful.",
        dictionaryWordIds: ["kani", "kaai"],
      },
    ],
  },
];

export function getAllPassages(): ReadingPassage[] {
  return READING_PASSAGES;
}

export function getPassageById(idOrSlug: string): ReadingPassage | null {
  if (!idOrSlug) return null;
  const match = READING_PASSAGES.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  return match || null;
}

export function getPassageCategories(): string[] {
  const categoriesSet = new Set<string>();
  READING_PASSAGES.forEach((p) => categoriesSet.add(p.category));
  return ["All", ...Array.from(categoriesSet)];
}
