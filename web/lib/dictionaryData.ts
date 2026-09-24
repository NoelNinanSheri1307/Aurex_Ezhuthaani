export interface DictionaryEntry {
  id: string;
  tamil: string;
  transliteration: string;
  meanings: string[];
  category: string;
  example?: string;
  exampleTranslation?: string;
  stage?: string;
  relatedWords?: string[];
  english?: string;
  categories?: string[];
  examples?: { tamil: string; english: string }[];
  partOfSpeech?: string;
  searchAliases?: string[];
}

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  {
    "id": "ta-0001",
    "tamil": "அக்கா",
    "transliteration": "Akkaa",
    "english": "elder sister",
    "meanings": [
      "elder sister"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் அக்கா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about elder sister.",
    "examples": [
      {
        "tamil": "நாம் அக்கா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about elder sister."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "elder sister"
    ]
  },
  {
    "id": "ta-0002",
    "tamil": "அக்டோபர்",
    "transliteration": "Aktoapar",
    "english": "October",
    "meanings": [
      "October"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் அக்டோபர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about October.",
    "examples": [
      {
        "tamil": "நாம் அக்டோபர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about October."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "October",
      "october"
    ]
  },
  {
    "id": "ta-0003",
    "tamil": "அங்கே",
    "transliteration": "Angkae",
    "english": "there",
    "meanings": [
      "there"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அங்கே.",
    "exampleTranslation": "We can use this word in a sentence: there.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அங்கே.",
        "english": "We can use this word in a sentence: there."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "there"
    ]
  },
  {
    "id": "ta-0004",
    "tamil": "அண்டைவர்",
    "transliteration": "Antaivar",
    "english": "neighbor",
    "meanings": [
      "neighbor"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் அண்டைவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about neighbor.",
    "examples": [
      {
        "tamil": "நாம் அண்டைவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about neighbor."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "neighbor"
    ]
  },
  {
    "id": "ta-0005",
    "tamil": "அண்ணன்",
    "transliteration": "Annan",
    "english": "elder brother",
    "meanings": [
      "elder brother"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் அண்ணன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about elder brother.",
    "examples": [
      {
        "tamil": "நாம் அண்ணன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about elder brother."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "elder brother"
    ]
  },
  {
    "id": "ta-0006",
    "tamil": "அது",
    "transliteration": "Athu",
    "english": "it/that",
    "meanings": [
      "it/that",
      "it",
      "that"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அது.",
    "exampleTranslation": "We can use this word in a sentence: it/that.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அது.",
        "english": "We can use this word in a sentence: it/that."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "it/that"
    ]
  },
  {
    "id": "ta-0007",
    "tamil": "அந்த",
    "transliteration": "Antha",
    "english": "that",
    "meanings": [
      "that"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அந்த.",
    "exampleTranslation": "We can use this word in a sentence: that.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அந்த.",
        "english": "We can use this word in a sentence: that."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "that"
    ]
  },
  {
    "id": "ta-0008",
    "tamil": "அனுபவம்",
    "transliteration": "Anupavam",
    "english": "experience",
    "meanings": [
      "experience"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் அனுபவம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about experience.",
    "examples": [
      {
        "tamil": "நாம் அனுபவம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about experience."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "experience"
    ]
  },
  {
    "id": "ta-0009",
    "tamil": "அனைத்து",
    "transliteration": "Anaiththu",
    "english": "all",
    "meanings": [
      "all"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அனைத்து.",
    "exampleTranslation": "We can use this word in a sentence: all.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அனைத்து.",
        "english": "We can use this word in a sentence: all."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "all"
    ]
  },
  {
    "id": "ta-0010",
    "tamil": "அன்பான",
    "transliteration": "Anpaana",
    "english": "loving",
    "meanings": [
      "loving"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் அன்பான.",
    "exampleTranslation": "This is very loving.",
    "examples": [
      {
        "tamil": "இது மிகவும் அன்பான.",
        "english": "This is very loving."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "loving"
    ]
  },
  {
    "id": "ta-0011",
    "tamil": "அன்பு",
    "transliteration": "Anpu",
    "english": "love",
    "meanings": [
      "love"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions",
      "Culture"
    ],
    "example": "நாம் அன்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about love.",
    "examples": [
      {
        "tamil": "நாம் அன்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about love."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "love"
    ]
  },
  {
    "id": "ta-0012",
    "tamil": "அப்பா",
    "transliteration": "Appaa",
    "english": "father",
    "meanings": [
      "father"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் அப்பா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about father.",
    "examples": [
      {
        "tamil": "நாம் அப்பா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about father."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "father"
    ]
  },
  {
    "id": "ta-0013",
    "tamil": "அமைதி",
    "transliteration": "Amaithi",
    "english": "peace",
    "meanings": [
      "peace"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions",
      "Culture"
    ],
    "example": "நாம் அமைதி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about peace.",
    "examples": [
      {
        "tamil": "நாம் அமைதி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about peace."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "peace"
    ]
  },
  {
    "id": "ta-0014",
    "tamil": "அமைதியான",
    "transliteration": "Amaithiyaana",
    "english": "peaceful",
    "meanings": [
      "peaceful"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் அமைதியான.",
    "exampleTranslation": "This is very peaceful.",
    "examples": [
      {
        "tamil": "இது மிகவும் அமைதியான.",
        "english": "This is very peaceful."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "peaceful"
    ]
  },
  {
    "id": "ta-0015",
    "tamil": "அம்மா",
    "transliteration": "Ammaa",
    "english": "mother",
    "meanings": [
      "mother"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் அம்மா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mother.",
    "examples": [
      {
        "tamil": "நாம் அம்மா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mother."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mother"
    ]
  },
  {
    "id": "ta-0016",
    "tamil": "அரசர்",
    "transliteration": "Arachar",
    "english": "king/ruler",
    "meanings": [
      "king/ruler",
      "king",
      "ruler"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் அரசர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about king/ruler.",
    "examples": [
      {
        "tamil": "நாம் அரசர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about king/ruler."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "king/ruler"
    ]
  },
  {
    "id": "ta-0017",
    "tamil": "அரசி",
    "transliteration": "Arachi",
    "english": "queen",
    "meanings": [
      "queen"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் அரசி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about queen.",
    "examples": [
      {
        "tamil": "நாம் அரசி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about queen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "queen"
    ]
  },
  {
    "id": "ta-0018",
    "tamil": "அரிசி",
    "transliteration": "Arichi",
    "english": "rice",
    "meanings": [
      "rice"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் அரிசி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rice.",
    "examples": [
      {
        "tamil": "நாம் அரிசி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rice."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rice"
    ]
  },
  {
    "id": "ta-0019",
    "tamil": "அருகில்",
    "transliteration": "Arukil",
    "english": "near",
    "meanings": [
      "near"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அருகில்.",
    "exampleTranslation": "We can use this word in a sentence: near.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அருகில்.",
        "english": "We can use this word in a sentence: near."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "near"
    ]
  },
  {
    "id": "ta-0020",
    "tamil": "அருங்காட்சியகம்",
    "transliteration": "Arungkaatchiyakam",
    "english": "museum",
    "meanings": [
      "museum"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் அருங்காட்சியகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about museum.",
    "examples": [
      {
        "tamil": "நாம் அருங்காட்சியகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about museum."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "museum"
    ]
  },
  {
    "id": "ta-0021",
    "tamil": "அருமையான",
    "transliteration": "Arumaiyaana",
    "english": "wonderful",
    "meanings": [
      "wonderful"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் அருமையான.",
    "exampleTranslation": "This is very wonderful.",
    "examples": [
      {
        "tamil": "இது மிகவும் அருமையான.",
        "english": "This is very wonderful."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "wonderful"
    ]
  },
  {
    "id": "ta-0022",
    "tamil": "அர்த்தம்",
    "transliteration": "Arththam",
    "english": "meaning",
    "meanings": [
      "meaning"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் அர்த்தம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about meaning.",
    "examples": [
      {
        "tamil": "நாம் அர்த்தம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about meaning."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "meaning"
    ]
  },
  {
    "id": "ta-0023",
    "tamil": "அறம்",
    "transliteration": "Aram",
    "english": "virtue/ethics",
    "meanings": [
      "virtue/ethics",
      "virtue",
      "ethics"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் அறம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about virtue/ethics.",
    "examples": [
      {
        "tamil": "நாம் அறம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about virtue/ethics."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "virtue/ethics"
    ]
  },
  {
    "id": "ta-0024",
    "tamil": "அறி",
    "transliteration": "Ari",
    "english": "know",
    "meanings": [
      "know"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் அறி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to know every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் அறி முயற்சி செய்கிறேன்.",
        "english": "I try to know every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "know"
    ]
  },
  {
    "id": "ta-0025",
    "tamil": "அறிவிப்பு",
    "transliteration": "Arivippu",
    "english": "announcement/notice",
    "meanings": [
      "announcement/notice",
      "announcement",
      "notice"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் அறிவிப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about announcement/notice.",
    "examples": [
      {
        "tamil": "நாம் அறிவிப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about announcement/notice."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "announcement/notice"
    ]
  },
  {
    "id": "ta-0026",
    "tamil": "அறிவியல்",
    "transliteration": "Ariviyal",
    "english": "science",
    "meanings": [
      "science"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் அறிவியல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about science.",
    "examples": [
      {
        "tamil": "நாம் அறிவியல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about science."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "science"
    ]
  },
  {
    "id": "ta-0027",
    "tamil": "அறிவு",
    "transliteration": "Arivu",
    "english": "knowledge",
    "meanings": [
      "knowledge"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Abstract"
    ],
    "example": "நாம் அறிவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about knowledge.",
    "examples": [
      {
        "tamil": "நாம் அறிவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about knowledge."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "knowledge"
    ]
  },
  {
    "id": "ta-0028",
    "tamil": "அறை",
    "transliteration": "Arai",
    "english": "room",
    "meanings": [
      "room"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் அறை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about room.",
    "examples": [
      {
        "tamil": "நாம் அறை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about room."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "room"
    ]
  },
  {
    "id": "ta-0029",
    "tamil": "அலமாரி",
    "transliteration": "Alamaari",
    "english": "cupboard",
    "meanings": [
      "cupboard"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் அலமாரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cupboard.",
    "examples": [
      {
        "tamil": "நாம் அலமாரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cupboard."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cupboard"
    ]
  },
  {
    "id": "ta-0030",
    "tamil": "அலுவலகம்",
    "transliteration": "Aluvalakam",
    "english": "office",
    "meanings": [
      "office"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் அலுவலகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about office.",
    "examples": [
      {
        "tamil": "நாம் அலுவலகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about office."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "office"
    ]
  },
  {
    "id": "ta-0031",
    "tamil": "அல்லது",
    "transliteration": "Allathu",
    "english": "or",
    "meanings": [
      "or"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அல்லது.",
    "exampleTranslation": "We can use this word in a sentence: or.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அல்லது.",
        "english": "We can use this word in a sentence: or."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "or"
    ]
  },
  {
    "id": "ta-0032",
    "tamil": "அழகான",
    "transliteration": "Azhakaana",
    "english": "beautiful",
    "meanings": [
      "beautiful"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் அழகான.",
    "exampleTranslation": "This is very beautiful.",
    "examples": [
      {
        "tamil": "இது மிகவும் அழகான.",
        "english": "This is very beautiful."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "beautiful"
    ]
  },
  {
    "id": "ta-0033",
    "tamil": "அழிப்பான்",
    "transliteration": "Azhippaan",
    "english": "eraser",
    "meanings": [
      "eraser"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் அழிப்பான் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about eraser.",
    "examples": [
      {
        "tamil": "நாம் அழிப்பான் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about eraser."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eraser"
    ]
  },
  {
    "id": "ta-0034",
    "tamil": "அழு",
    "transliteration": "Azhu",
    "english": "cry",
    "meanings": [
      "cry"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் அழு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to cry every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் அழு முயற்சி செய்கிறேன்.",
        "english": "I try to cry every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "cry"
    ]
  },
  {
    "id": "ta-0035",
    "tamil": "அழுக்கான",
    "transliteration": "Azhukkaana",
    "english": "dirty",
    "meanings": [
      "dirty"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் அழுக்கான.",
    "exampleTranslation": "This is very dirty.",
    "examples": [
      {
        "tamil": "இது மிகவும் அழுக்கான.",
        "english": "This is very dirty."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "dirty"
    ]
  },
  {
    "id": "ta-0036",
    "tamil": "அவன்",
    "transliteration": "Avan",
    "english": "he; his",
    "meanings": [
      "he; his",
      "he",
      "his"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவன்.",
    "exampleTranslation": "We can use this word in a sentence: he.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவன்.",
        "english": "We can use this word in a sentence: he."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "he; his",
      "he"
    ]
  },
  {
    "id": "ta-0037",
    "tamil": "அவர்",
    "transliteration": "Avar",
    "english": "he/she/respectful",
    "meanings": [
      "he/she/respectful",
      "he",
      "she",
      "respectful"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவர்.",
    "exampleTranslation": "We can use this word in a sentence: he/she/respectful.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவர்.",
        "english": "We can use this word in a sentence: he/she/respectful."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "he/she/respectful"
    ]
  },
  {
    "id": "ta-0038",
    "tamil": "அவர்கள்",
    "transliteration": "Avarkal",
    "english": "they",
    "meanings": [
      "they"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவர்கள்.",
    "exampleTranslation": "We can use this word in a sentence: they.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவர்கள்.",
        "english": "We can use this word in a sentence: they."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "they"
    ]
  },
  {
    "id": "ta-0039",
    "tamil": "அவள்",
    "transliteration": "Aval",
    "english": "she; her",
    "meanings": [
      "she; her",
      "she",
      "her"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவள்.",
    "exampleTranslation": "We can use this word in a sentence: she.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவள்.",
        "english": "We can use this word in a sentence: she."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "she; her",
      "she"
    ]
  },
  {
    "id": "ta-0040",
    "tamil": "அவை",
    "transliteration": "Avai",
    "english": "those",
    "meanings": [
      "those"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவை.",
    "exampleTranslation": "We can use this word in a sentence: those.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: அவை.",
        "english": "We can use this word in a sentence: those."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "those"
    ]
  },
  {
    "id": "ta-0041",
    "tamil": "ஆகஸ்ட்",
    "transliteration": "Aakast",
    "english": "August",
    "meanings": [
      "August"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஆகஸ்ட் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about August.",
    "examples": [
      {
        "tamil": "நாம் ஆகஸ்ட் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about August."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "August",
      "august"
    ]
  },
  {
    "id": "ta-0042",
    "tamil": "ஆசிரியர்",
    "transliteration": "Aachiriyar",
    "english": "teacher",
    "meanings": [
      "teacher"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் ஆசிரியர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about teacher.",
    "examples": [
      {
        "tamil": "நாம் ஆசிரியர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about teacher."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "teacher"
    ]
  },
  {
    "id": "ta-0043",
    "tamil": "ஆசை",
    "transliteration": "Aachai",
    "english": "desire",
    "meanings": [
      "desire"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் ஆசை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about desire.",
    "examples": [
      {
        "tamil": "நாம் ஆசை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about desire."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "desire"
    ]
  },
  {
    "id": "ta-0044",
    "tamil": "ஆச்சரியம்",
    "transliteration": "Aachchariyam",
    "english": "surprise",
    "meanings": [
      "surprise"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் ஆச்சரியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about surprise.",
    "examples": [
      {
        "tamil": "நாம் ஆச்சரியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about surprise."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "surprise"
    ]
  },
  {
    "id": "ta-0045",
    "tamil": "ஆடு",
    "transliteration": "Aatu",
    "english": "goat; play/dance",
    "meanings": [
      "goat; play/dance",
      "goat",
      "play",
      "dance"
    ],
    "category": "Animals",
    "categories": [
      "Animals",
      "Verbs"
    ],
    "example": "நாம் ஆடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about goat.",
    "examples": [
      {
        "tamil": "நாம் ஆடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about goat."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "goat; play/dance",
      "goat"
    ]
  },
  {
    "id": "ta-0046",
    "tamil": "ஆடை",
    "transliteration": "Aatai",
    "english": "clothing",
    "meanings": [
      "clothing"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் ஆடை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about clothing.",
    "examples": [
      {
        "tamil": "நாம் ஆடை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about clothing."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "clothing"
    ]
  },
  {
    "id": "ta-0047",
    "tamil": "ஆண்",
    "transliteration": "Aan",
    "english": "man",
    "meanings": [
      "man"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் ஆண் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about man.",
    "examples": [
      {
        "tamil": "நாம் ஆண் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about man."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "man"
    ]
  },
  {
    "id": "ta-0048",
    "tamil": "ஆண்டு",
    "transliteration": "Aantu",
    "english": "year",
    "meanings": [
      "year"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஆண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about year.",
    "examples": [
      {
        "tamil": "நாம் ஆண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about year."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "year"
    ]
  },
  {
    "id": "ta-0049",
    "tamil": "ஆனால்",
    "transliteration": "Aanaal",
    "english": "but",
    "meanings": [
      "but"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஆனால்.",
    "exampleTranslation": "We can use this word in a sentence: but.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஆனால்.",
        "english": "We can use this word in a sentence: but."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "but"
    ]
  },
  {
    "id": "ta-0050",
    "tamil": "ஆப்பிள்",
    "transliteration": "Aappil",
    "english": "apple",
    "meanings": [
      "apple"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் ஆப்பிள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about apple.",
    "examples": [
      {
        "tamil": "நாம் ஆப்பிள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about apple."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "apple"
    ]
  },
  {
    "id": "ta-0051",
    "tamil": "ஆமை",
    "transliteration": "Aamai",
    "english": "turtle",
    "meanings": [
      "turtle"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் ஆமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about turtle.",
    "examples": [
      {
        "tamil": "நாம் ஆமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about turtle."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "turtle"
    ]
  },
  {
    "id": "ta-0052",
    "tamil": "ஆம்",
    "transliteration": "Aam",
    "english": "yes",
    "meanings": [
      "yes"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் ஆம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about yes.",
    "examples": [
      {
        "tamil": "நாம் ஆம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about yes."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "yes"
    ]
  },
  {
    "id": "ta-0053",
    "tamil": "ஆயிரம்",
    "transliteration": "Aayiram",
    "english": "thousand",
    "meanings": [
      "thousand"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஆயிரம்.",
    "exampleTranslation": "We can use this word in a sentence: thousand.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஆயிரம்.",
        "english": "We can use this word in a sentence: thousand."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thousand"
    ]
  },
  {
    "id": "ta-0054",
    "tamil": "ஆய்வகம்",
    "transliteration": "Aayvakam",
    "english": "laboratory",
    "meanings": [
      "laboratory"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் ஆய்வகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about laboratory.",
    "examples": [
      {
        "tamil": "நாம் ஆய்வகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about laboratory."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "laboratory"
    ]
  },
  {
    "id": "ta-0055",
    "tamil": "ஆரஞ்சு",
    "transliteration": "Aaranjchu",
    "english": "orange",
    "meanings": [
      "orange"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் ஆரஞ்சு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about orange.",
    "examples": [
      {
        "tamil": "நாம் ஆரஞ்சு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about orange."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "orange"
    ]
  },
  {
    "id": "ta-0056",
    "tamil": "ஆராய்",
    "transliteration": "Aaraay",
    "english": "investigate",
    "meanings": [
      "investigate"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் ஆராய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to investigate every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் ஆராய் முயற்சி செய்கிறேன்.",
        "english": "I try to investigate every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "investigate"
    ]
  },
  {
    "id": "ta-0057",
    "tamil": "ஆராய்ச்சி",
    "transliteration": "Aaraaychchi",
    "english": "research",
    "meanings": [
      "research"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் ஆராய்ச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about research.",
    "examples": [
      {
        "tamil": "நாம் ஆராய்ச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about research."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "research"
    ]
  },
  {
    "id": "ta-0058",
    "tamil": "ஆரோக்கியம்",
    "transliteration": "Aaroakkiyam",
    "english": "health",
    "meanings": [
      "health"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் ஆரோக்கியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about health.",
    "examples": [
      {
        "tamil": "நாம் ஆரோக்கியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about health."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "health"
    ]
  },
  {
    "id": "ta-0059",
    "tamil": "ஆறு",
    "transliteration": "Aaru",
    "english": "river; six",
    "meanings": [
      "river; six",
      "river",
      "six"
    ],
    "category": "Nature",
    "categories": [
      "Nature",
      "Numbers"
    ],
    "example": "நாம் ஆறு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about river.",
    "examples": [
      {
        "tamil": "நாம் ஆறு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about river."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "river; six",
      "river"
    ]
  },
  {
    "id": "ta-0060",
    "tamil": "இங்கே",
    "transliteration": "Ingkae",
    "english": "here",
    "meanings": [
      "here"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இங்கே.",
    "exampleTranslation": "We can use this word in a sentence: here.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இங்கே.",
        "english": "We can use this word in a sentence: here."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "here"
    ]
  },
  {
    "id": "ta-0061",
    "tamil": "இசை",
    "transliteration": "Ichai",
    "english": "music",
    "meanings": [
      "music"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் இசை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about music.",
    "examples": [
      {
        "tamil": "நாம் இசை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about music."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "music"
    ]
  },
  {
    "id": "ta-0062",
    "tamil": "இடம்",
    "transliteration": "Itam",
    "english": "place",
    "meanings": [
      "place"
    ],
    "category": "Places",
    "categories": [
      "Places",
      "Abstract"
    ],
    "example": "நாம் இடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about place.",
    "examples": [
      {
        "tamil": "நாம் இடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about place."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "place"
    ]
  },
  {
    "id": "ta-0063",
    "tamil": "இடி",
    "transliteration": "Iti",
    "english": "thunder",
    "meanings": [
      "thunder"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் இடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about thunder.",
    "examples": [
      {
        "tamil": "நாம் இடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about thunder."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thunder"
    ]
  },
  {
    "id": "ta-0064",
    "tamil": "இட்லி",
    "transliteration": "Itli",
    "english": "idli",
    "meanings": [
      "idli"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் இட்லி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about idli.",
    "examples": [
      {
        "tamil": "நாம் இட்லி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about idli."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "idli"
    ]
  },
  {
    "id": "ta-0065",
    "tamil": "இதயம்",
    "transliteration": "Ithayam",
    "english": "heart",
    "meanings": [
      "heart"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் இதயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about heart.",
    "examples": [
      {
        "tamil": "நாம் இதயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about heart."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "heart"
    ]
  },
  {
    "id": "ta-0066",
    "tamil": "இது",
    "transliteration": "Ithu",
    "english": "this",
    "meanings": [
      "this"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இது.",
    "exampleTranslation": "We can use this word in a sentence: this.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இது.",
        "english": "We can use this word in a sentence: this."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "this"
    ]
  },
  {
    "id": "ta-0067",
    "tamil": "இந்த",
    "transliteration": "Intha",
    "english": "this",
    "meanings": [
      "this"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இந்த.",
    "exampleTranslation": "We can use this word in a sentence: this.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இந்த.",
        "english": "We can use this word in a sentence: this."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "this"
    ]
  },
  {
    "id": "ta-0068",
    "tamil": "இனிப்பு",
    "transliteration": "Inippu",
    "english": "sweet",
    "meanings": [
      "sweet"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் இனிப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sweet.",
    "examples": [
      {
        "tamil": "நாம் இனிப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sweet."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sweet"
    ]
  },
  {
    "id": "ta-0069",
    "tamil": "இனிய",
    "transliteration": "Iniya",
    "english": "sweet/pleasant",
    "meanings": [
      "sweet/pleasant",
      "sweet",
      "pleasant"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் இனிய.",
    "exampleTranslation": "This is very sweet/pleasant.",
    "examples": [
      {
        "tamil": "இது மிகவும் இனிய.",
        "english": "This is very sweet/pleasant."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "sweet/pleasant"
    ]
  },
  {
    "id": "ta-0070",
    "tamil": "இன்று",
    "transliteration": "Inru",
    "english": "today",
    "meanings": [
      "today"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் இன்று பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about today.",
    "examples": [
      {
        "tamil": "நாம் இன்று பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about today."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "today"
    ]
  },
  {
    "id": "ta-0071",
    "tamil": "இப்போது",
    "transliteration": "Ippoathu",
    "english": "now",
    "meanings": [
      "now"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் இப்போது பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about now.",
    "examples": [
      {
        "tamil": "நாம் இப்போது பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about now."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "now"
    ]
  },
  {
    "id": "ta-0072",
    "tamil": "இயந்திரம்",
    "transliteration": "Iyanthiram",
    "english": "machine",
    "meanings": [
      "machine"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் இயந்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about machine.",
    "examples": [
      {
        "tamil": "நாம் இயந்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about machine."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "machine"
    ]
  },
  {
    "id": "ta-0073",
    "tamil": "இயற்கை",
    "transliteration": "Iyarkai",
    "english": "nature",
    "meanings": [
      "nature"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் இயற்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about nature.",
    "examples": [
      {
        "tamil": "நாம் இயற்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about nature."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "nature"
    ]
  },
  {
    "id": "ta-0074",
    "tamil": "இயல்பான",
    "transliteration": "Iyalpaana",
    "english": "natural/normal",
    "meanings": [
      "natural/normal",
      "natural",
      "normal"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் இயல்பான.",
    "exampleTranslation": "This is very natural/normal.",
    "examples": [
      {
        "tamil": "இது மிகவும் இயல்பான.",
        "english": "This is very natural/normal."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "natural/normal"
    ]
  },
  {
    "id": "ta-0075",
    "tamil": "இரக்கம்",
    "transliteration": "Irakkam",
    "english": "pity/mercy",
    "meanings": [
      "pity/mercy",
      "pity",
      "mercy"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் இரக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pity/mercy.",
    "examples": [
      {
        "tamil": "நாம் இரக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pity/mercy."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pity/mercy"
    ]
  },
  {
    "id": "ta-0076",
    "tamil": "இரட்டிப்பு",
    "transliteration": "Irattippu",
    "english": "double",
    "meanings": [
      "double"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இரட்டிப்பு.",
    "exampleTranslation": "We can use this word in a sentence: double.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இரட்டிப்பு.",
        "english": "We can use this word in a sentence: double."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "double"
    ]
  },
  {
    "id": "ta-0077",
    "tamil": "இரண்டாவது",
    "transliteration": "Irantaavathu",
    "english": "second",
    "meanings": [
      "second"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இரண்டாவது.",
    "exampleTranslation": "We can use this word in a sentence: second.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இரண்டாவது.",
        "english": "We can use this word in a sentence: second."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "second"
    ]
  },
  {
    "id": "ta-0078",
    "tamil": "இரண்டு",
    "transliteration": "Irantu",
    "english": "two",
    "meanings": [
      "two"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இரண்டு.",
    "exampleTranslation": "We can use this word in a sentence: two.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இரண்டு.",
        "english": "We can use this word in a sentence: two."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "two"
    ]
  },
  {
    "id": "ta-0079",
    "tamil": "இரத்தம்",
    "transliteration": "Iraththam",
    "english": "blood",
    "meanings": [
      "blood"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் இரத்தம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about blood.",
    "examples": [
      {
        "tamil": "நாம் இரத்தம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about blood."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "blood"
    ]
  },
  {
    "id": "ta-0080",
    "tamil": "இரவு",
    "transliteration": "Iravu",
    "english": "night",
    "meanings": [
      "night"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் இரவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about night.",
    "examples": [
      {
        "tamil": "நாம் இரவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about night."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "night"
    ]
  },
  {
    "id": "ta-0081",
    "tamil": "இரவு உணவு",
    "transliteration": "Iravu unavu",
    "english": "dinner",
    "meanings": [
      "dinner"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் இரவு உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about dinner.",
    "examples": [
      {
        "tamil": "நாம் இரவு உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about dinner."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "dinner"
    ]
  },
  {
    "id": "ta-0082",
    "tamil": "இரு",
    "transliteration": "Iru",
    "english": "be/stay",
    "meanings": [
      "be/stay",
      "be",
      "stay"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் இரு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to be/stay every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் இரு முயற்சி செய்கிறேன்.",
        "english": "I try to be/stay every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "be/stay"
    ]
  },
  {
    "id": "ta-0083",
    "tamil": "இருபது",
    "transliteration": "Irupathu",
    "english": "twenty",
    "meanings": [
      "twenty"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இருபது.",
    "exampleTranslation": "We can use this word in a sentence: twenty.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இருபது.",
        "english": "We can use this word in a sentence: twenty."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "twenty"
    ]
  },
  {
    "id": "ta-0084",
    "tamil": "இருள்",
    "transliteration": "Irul",
    "english": "darkness",
    "meanings": [
      "darkness"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் இருள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about darkness.",
    "examples": [
      {
        "tamil": "நாம் இருள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about darkness."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "darkness"
    ]
  },
  {
    "id": "ta-0085",
    "tamil": "இற",
    "transliteration": "Ira",
    "english": "die",
    "meanings": [
      "die"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் இற முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to die every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் இற முயற்சி செய்கிறேன்.",
        "english": "I try to die every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "die"
    ]
  },
  {
    "id": "ta-0086",
    "tamil": "இறைச்சி",
    "transliteration": "Iraichchi",
    "english": "meat",
    "meanings": [
      "meat"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் இறைச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about meat.",
    "examples": [
      {
        "tamil": "நாம் இறைச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about meat."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "meat"
    ]
  },
  {
    "id": "ta-0087",
    "tamil": "இலக்கியம்",
    "transliteration": "Ilakkiyam",
    "english": "literature",
    "meanings": [
      "literature"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Culture"
    ],
    "example": "நாம் இலக்கியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about literature.",
    "examples": [
      {
        "tamil": "நாம் இலக்கியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about literature."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "literature"
    ]
  },
  {
    "id": "ta-0088",
    "tamil": "இலக்கு",
    "transliteration": "Ilakku",
    "english": "target/destination",
    "meanings": [
      "target/destination",
      "target",
      "destination"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் இலக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about target/destination.",
    "examples": [
      {
        "tamil": "நாம் இலக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about target/destination."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "target/destination"
    ]
  },
  {
    "id": "ta-0089",
    "tamil": "இலை",
    "transliteration": "Ilai",
    "english": "leaf",
    "meanings": [
      "leaf"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் இலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about leaf.",
    "examples": [
      {
        "tamil": "நாம் இலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about leaf."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "leaf"
    ]
  },
  {
    "id": "ta-0090",
    "tamil": "இல்லாமல்",
    "transliteration": "Illaamal",
    "english": "without",
    "meanings": [
      "without"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இல்லாமல்.",
    "exampleTranslation": "We can use this word in a sentence: without.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இல்லாமல்.",
        "english": "We can use this word in a sentence: without."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "without"
    ]
  },
  {
    "id": "ta-0091",
    "tamil": "இல்லை",
    "transliteration": "Illai",
    "english": "no/not",
    "meanings": [
      "no/not",
      "no",
      "not"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் இல்லை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about no/not.",
    "examples": [
      {
        "tamil": "நாம் இல்லை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about no/not."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "no/not"
    ]
  },
  {
    "id": "ta-0092",
    "tamil": "இவர்",
    "transliteration": "Ivar",
    "english": "this person",
    "meanings": [
      "this person"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இவர்.",
    "exampleTranslation": "We can use this word in a sentence: this person.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இவர்.",
        "english": "We can use this word in a sentence: this person."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "this person"
    ]
  },
  {
    "id": "ta-0093",
    "tamil": "இவை",
    "transliteration": "Ivai",
    "english": "these",
    "meanings": [
      "these"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இவை.",
    "exampleTranslation": "We can use this word in a sentence: these.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: இவை.",
        "english": "We can use this word in a sentence: these."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "these"
    ]
  },
  {
    "id": "ta-0094",
    "tamil": "உங்கள்",
    "transliteration": "Ungkal",
    "english": "your",
    "meanings": [
      "your"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உங்கள்.",
    "exampleTranslation": "We can use this word in a sentence: your.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உங்கள்.",
        "english": "We can use this word in a sentence: your."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "your"
    ]
  },
  {
    "id": "ta-0095",
    "tamil": "உடன்",
    "transliteration": "Utan",
    "english": "with",
    "meanings": [
      "with"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உடன்.",
    "exampleTranslation": "We can use this word in a sentence: with.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உடன்.",
        "english": "We can use this word in a sentence: with."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "with"
    ]
  },
  {
    "id": "ta-0096",
    "tamil": "உடல்",
    "transliteration": "Utal",
    "english": "body",
    "meanings": [
      "body"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் உடல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about body.",
    "examples": [
      {
        "tamil": "நாம் உடல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about body."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "body"
    ]
  },
  {
    "id": "ta-0097",
    "tamil": "உடல் நலம்",
    "transliteration": "Utal nalam",
    "english": "well-being/health",
    "meanings": [
      "well-being/health",
      "well-being",
      "health"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் உடல் நலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about well-being/health.",
    "examples": [
      {
        "tamil": "நாம் உடல் நலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about well-being/health."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "well-being/health"
    ]
  },
  {
    "id": "ta-0098",
    "tamil": "உட்கார்",
    "transliteration": "Utkaar",
    "english": "sit",
    "meanings": [
      "sit"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் உட்கார் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to sit every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் உட்கார் முயற்சி செய்கிறேன்.",
        "english": "I try to sit every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "sit"
    ]
  },
  {
    "id": "ta-0099",
    "tamil": "உணவு",
    "transliteration": "Unavu",
    "english": "food",
    "meanings": [
      "food"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink",
      "Culture"
    ],
    "example": "நாம் உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about food.",
    "examples": [
      {
        "tamil": "நாம் உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about food."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "food"
    ]
  },
  {
    "id": "ta-0100",
    "tamil": "உண்மை",
    "transliteration": "Unmai",
    "english": "truth",
    "meanings": [
      "truth"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் உண்மை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about truth.",
    "examples": [
      {
        "tamil": "நாம் உண்மை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about truth."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "truth"
    ]
  },
  {
    "id": "ta-0101",
    "tamil": "உண்மையான",
    "transliteration": "Unmaiyaana",
    "english": "real/true",
    "meanings": [
      "real/true",
      "real",
      "true"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் உண்மையான.",
    "exampleTranslation": "This is very real/true.",
    "examples": [
      {
        "tamil": "இது மிகவும் உண்மையான.",
        "english": "This is very real/true."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "real/true"
    ]
  },
  {
    "id": "ta-0102",
    "tamil": "உதவி",
    "transliteration": "Uthavi",
    "english": "help",
    "meanings": [
      "help"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions",
      "Abstract"
    ],
    "example": "நாம் உதவி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about help.",
    "examples": [
      {
        "tamil": "நாம் உதவி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about help."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "help"
    ]
  },
  {
    "id": "ta-0103",
    "tamil": "உதவு",
    "transliteration": "Uthavu",
    "english": "help",
    "meanings": [
      "help"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் உதவு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to help every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் உதவு முயற்சி செய்கிறேன்.",
        "english": "I try to help every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "help"
    ]
  },
  {
    "id": "ta-0104",
    "tamil": "உதாரணம்",
    "transliteration": "Uthaaranam",
    "english": "example",
    "meanings": [
      "example"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் உதாரணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about example.",
    "examples": [
      {
        "tamil": "நாம் உதாரணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about example."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "example"
    ]
  },
  {
    "id": "ta-0105",
    "tamil": "உன்",
    "transliteration": "Un",
    "english": "your",
    "meanings": [
      "your"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உன்.",
    "exampleTranslation": "We can use this word in a sentence: your.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உன்.",
        "english": "We can use this word in a sentence: your."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "your"
    ]
  },
  {
    "id": "ta-0106",
    "tamil": "உப்பு",
    "transliteration": "Uppu",
    "english": "salt",
    "meanings": [
      "salt"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் உப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about salt.",
    "examples": [
      {
        "tamil": "நாம் உப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about salt."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "salt"
    ]
  },
  {
    "id": "ta-0107",
    "tamil": "உயரமான",
    "transliteration": "Uyaramaana",
    "english": "tall/high",
    "meanings": [
      "tall/high",
      "tall",
      "high"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் உயரமான.",
    "exampleTranslation": "This is very tall/high.",
    "examples": [
      {
        "tamil": "இது மிகவும் உயரமான.",
        "english": "This is very tall/high."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "tall/high"
    ]
  },
  {
    "id": "ta-0108",
    "tamil": "உரிமை",
    "transliteration": "Urimai",
    "english": "right",
    "meanings": [
      "right"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் உரிமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about right.",
    "examples": [
      {
        "tamil": "நாம் உரிமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about right."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "right"
    ]
  },
  {
    "id": "ta-0109",
    "tamil": "உருளைக்கிழங்கு",
    "transliteration": "Urulaikkizhangku",
    "english": "potato",
    "meanings": [
      "potato"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் உருளைக்கிழங்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about potato.",
    "examples": [
      {
        "tamil": "நாம் உருளைக்கிழங்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about potato."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "potato"
    ]
  },
  {
    "id": "ta-0110",
    "tamil": "உருவாக்கு",
    "transliteration": "Uruvaakku",
    "english": "create",
    "meanings": [
      "create"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs",
      "Verbs"
    ],
    "example": "நான் தினமும் உருவாக்கு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to create every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் உருவாக்கு முயற்சி செய்கிறேன்.",
        "english": "I try to create every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "create"
    ]
  },
  {
    "id": "ta-0111",
    "tamil": "உறவினர்",
    "transliteration": "Uravinar",
    "english": "relative",
    "meanings": [
      "relative"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் உறவினர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about relative.",
    "examples": [
      {
        "tamil": "நாம் உறவினர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about relative."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "relative"
    ]
  },
  {
    "id": "ta-0112",
    "tamil": "உலகம்",
    "transliteration": "Ulakam",
    "english": "world",
    "meanings": [
      "world"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் உலகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about world.",
    "examples": [
      {
        "tamil": "நாம் உலகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about world."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "world"
    ]
  },
  {
    "id": "ta-0113",
    "tamil": "உள்ளே",
    "transliteration": "Ullae",
    "english": "inside",
    "meanings": [
      "inside"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உள்ளே.",
    "exampleTranslation": "We can use this word in a sentence: inside.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: உள்ளே.",
        "english": "We can use this word in a sentence: inside."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "inside"
    ]
  },
  {
    "id": "ta-0114",
    "tamil": "ஊர்",
    "transliteration": "Oor",
    "english": "town/native place",
    "meanings": [
      "town/native place",
      "town",
      "native place"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் ஊர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about town/native place.",
    "examples": [
      {
        "tamil": "நாம் ஊர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about town/native place."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "town/native place"
    ]
  },
  {
    "id": "ta-0115",
    "tamil": "எங்கள்",
    "transliteration": "Engkal",
    "english": "our",
    "meanings": [
      "our"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எங்கள்.",
    "exampleTranslation": "We can use this word in a sentence: our.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எங்கள்.",
        "english": "We can use this word in a sentence: our."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "our"
    ]
  },
  {
    "id": "ta-0116",
    "tamil": "எங்கே",
    "transliteration": "Engkae",
    "english": "where",
    "meanings": [
      "where"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எங்கே.",
    "exampleTranslation": "We can use this word in a sentence: where.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எங்கே.",
        "english": "We can use this word in a sentence: where."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "where"
    ]
  },
  {
    "id": "ta-0117",
    "tamil": "எடு",
    "transliteration": "Etu",
    "english": "take",
    "meanings": [
      "take"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் எடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to take every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் எடு முயற்சி செய்கிறேன்.",
        "english": "I try to take every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "take"
    ]
  },
  {
    "id": "ta-0118",
    "tamil": "எட்டு",
    "transliteration": "Ettu",
    "english": "eight",
    "meanings": [
      "eight"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எட்டு.",
    "exampleTranslation": "We can use this word in a sentence: eight.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எட்டு.",
        "english": "We can use this word in a sentence: eight."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eight"
    ]
  },
  {
    "id": "ta-0119",
    "tamil": "எண்ணம்",
    "transliteration": "Ennam",
    "english": "thought",
    "meanings": [
      "thought"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் எண்ணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about thought.",
    "examples": [
      {
        "tamil": "நாம் எண்ணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about thought."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thought"
    ]
  },
  {
    "id": "ta-0120",
    "tamil": "எது",
    "transliteration": "Ethu",
    "english": "which/what",
    "meanings": [
      "which/what",
      "which",
      "what"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எது.",
    "exampleTranslation": "We can use this word in a sentence: which/what.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எது.",
        "english": "We can use this word in a sentence: which/what."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "which/what"
    ]
  },
  {
    "id": "ta-0121",
    "tamil": "எத்தனை",
    "transliteration": "Eththanai",
    "english": "how many",
    "meanings": [
      "how many"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எத்தனை.",
    "exampleTranslation": "We can use this word in a sentence: how many.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எத்தனை.",
        "english": "We can use this word in a sentence: how many."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "how many"
    ]
  },
  {
    "id": "ta-0122",
    "tamil": "எனவே",
    "transliteration": "Enavae",
    "english": "therefore/so",
    "meanings": [
      "therefore/so",
      "therefore",
      "so"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எனவே.",
    "exampleTranslation": "We can use this word in a sentence: therefore/so.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எனவே.",
        "english": "We can use this word in a sentence: therefore/so."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "therefore/so"
    ]
  },
  {
    "id": "ta-0123",
    "tamil": "என்",
    "transliteration": "En",
    "english": "my",
    "meanings": [
      "my"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: என்.",
    "exampleTranslation": "We can use this word in a sentence: my.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: என்.",
        "english": "We can use this word in a sentence: my."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "my"
    ]
  },
  {
    "id": "ta-0124",
    "tamil": "என்ன",
    "transliteration": "Enna",
    "english": "what",
    "meanings": [
      "what"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: என்ன.",
    "exampleTranslation": "We can use this word in a sentence: what.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: என்ன.",
        "english": "We can use this word in a sentence: what."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "what"
    ]
  },
  {
    "id": "ta-0125",
    "tamil": "எப்படி",
    "transliteration": "Eppati",
    "english": "how",
    "meanings": [
      "how"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எப்படி.",
    "exampleTranslation": "We can use this word in a sentence: how.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எப்படி.",
        "english": "We can use this word in a sentence: how."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "how"
    ]
  },
  {
    "id": "ta-0126",
    "tamil": "எப்போதாவது",
    "transliteration": "Eppoathaavathu",
    "english": "sometimes",
    "meanings": [
      "sometimes"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் எப்போதாவது பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sometimes.",
    "examples": [
      {
        "tamil": "நாம் எப்போதாவது பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sometimes."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sometimes"
    ]
  },
  {
    "id": "ta-0127",
    "tamil": "எப்போது",
    "transliteration": "Eppoathu",
    "english": "when",
    "meanings": [
      "when"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எப்போது.",
    "exampleTranslation": "We can use this word in a sentence: when.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எப்போது.",
        "english": "We can use this word in a sentence: when."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "when"
    ]
  },
  {
    "id": "ta-0128",
    "tamil": "எப்போதும்",
    "transliteration": "Eppoathum",
    "english": "always",
    "meanings": [
      "always"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் எப்போதும் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about always.",
    "examples": [
      {
        "tamil": "நாம் எப்போதும் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about always."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "always"
    ]
  },
  {
    "id": "ta-0129",
    "tamil": "எறும்பு",
    "transliteration": "Erumpu",
    "english": "ant",
    "meanings": [
      "ant"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் எறும்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ant.",
    "examples": [
      {
        "tamil": "நாம் எறும்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ant."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ant"
    ]
  },
  {
    "id": "ta-0130",
    "tamil": "எலும்பு",
    "transliteration": "Elumpu",
    "english": "bone",
    "meanings": [
      "bone"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் எலும்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bone.",
    "examples": [
      {
        "tamil": "நாம் எலும்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bone."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bone"
    ]
  },
  {
    "id": "ta-0131",
    "tamil": "எளிய",
    "transliteration": "Eliya",
    "english": "simple",
    "meanings": [
      "simple"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் எளிய.",
    "exampleTranslation": "This is very simple.",
    "examples": [
      {
        "tamil": "இது மிகவும் எளிய.",
        "english": "This is very simple."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "simple"
    ]
  },
  {
    "id": "ta-0132",
    "tamil": "எழுது",
    "transliteration": "Ezhuthu",
    "english": "write",
    "meanings": [
      "write"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் எழுது முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to write every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் எழுது முயற்சி செய்கிறேன்.",
        "english": "I try to write every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "write"
    ]
  },
  {
    "id": "ta-0133",
    "tamil": "எழுத்து",
    "transliteration": "Ezhuththu",
    "english": "letter/writing",
    "meanings": [
      "letter/writing",
      "letter",
      "writing"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் எழுத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about letter/writing.",
    "examples": [
      {
        "tamil": "நாம் எழுத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about letter/writing."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "letter/writing"
    ]
  },
  {
    "id": "ta-0134",
    "tamil": "எழுந்திரு",
    "transliteration": "Ezhunthiru",
    "english": "wake up/get up",
    "meanings": [
      "wake up/get up",
      "wake up",
      "get up"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் எழுந்திரு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to wake up/get up every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் எழுந்திரு முயற்சி செய்கிறேன்.",
        "english": "I try to wake up/get up every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "wake up/get up"
    ]
  },
  {
    "id": "ta-0135",
    "tamil": "எவ்வளவு",
    "transliteration": "Evvalavu",
    "english": "how much",
    "meanings": [
      "how much"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எவ்வளவு.",
    "exampleTranslation": "We can use this word in a sentence: how much.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: எவ்வளவு.",
        "english": "We can use this word in a sentence: how much."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "how much"
    ]
  },
  {
    "id": "ta-0136",
    "tamil": "ஏனெனில்",
    "transliteration": "Aenenil",
    "english": "because",
    "meanings": [
      "because"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஏனெனில்.",
    "exampleTranslation": "We can use this word in a sentence: because.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஏனெனில்.",
        "english": "We can use this word in a sentence: because."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "because"
    ]
  },
  {
    "id": "ta-0137",
    "tamil": "ஏன்",
    "transliteration": "Aen",
    "english": "why",
    "meanings": [
      "why"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஏன்.",
    "exampleTranslation": "We can use this word in a sentence: why.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஏன்.",
        "english": "We can use this word in a sentence: why."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "why"
    ]
  },
  {
    "id": "ta-0138",
    "tamil": "ஏப்ரல்",
    "transliteration": "Aepral",
    "english": "April",
    "meanings": [
      "April"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஏப்ரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about April.",
    "examples": [
      {
        "tamil": "நாம் ஏப்ரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about April."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "April",
      "april"
    ]
  },
  {
    "id": "ta-0139",
    "tamil": "ஏரி",
    "transliteration": "Aeri",
    "english": "lake",
    "meanings": [
      "lake"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் ஏரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lake.",
    "examples": [
      {
        "tamil": "நாம் ஏரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lake."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lake"
    ]
  },
  {
    "id": "ta-0140",
    "tamil": "ஏழு",
    "transliteration": "Aezhu",
    "english": "seven",
    "meanings": [
      "seven"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஏழு.",
    "exampleTranslation": "We can use this word in a sentence: seven.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஏழு.",
        "english": "We can use this word in a sentence: seven."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "seven"
    ]
  },
  {
    "id": "ta-0141",
    "tamil": "ஐந்து",
    "transliteration": "Ainthu",
    "english": "five",
    "meanings": [
      "five"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஐந்து.",
    "exampleTranslation": "We can use this word in a sentence: five.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஐந்து.",
        "english": "We can use this word in a sentence: five."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "five"
    ]
  },
  {
    "id": "ta-0142",
    "tamil": "ஐம்பது",
    "transliteration": "Aimpathu",
    "english": "fifty",
    "meanings": [
      "fifty"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஐம்பது.",
    "exampleTranslation": "We can use this word in a sentence: fifty.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஐம்பது.",
        "english": "We can use this word in a sentence: fifty."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fifty"
    ]
  },
  {
    "id": "ta-0143",
    "tamil": "ஒட்டு",
    "transliteration": "Ottu",
    "english": "stick/paste",
    "meanings": [
      "stick/paste",
      "stick",
      "paste"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் ஒட்டு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to stick/paste every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் ஒட்டு முயற்சி செய்கிறேன்.",
        "english": "I try to stick/paste every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "stick/paste"
    ]
  },
  {
    "id": "ta-0144",
    "tamil": "ஒன்பது",
    "transliteration": "Onpathu",
    "english": "nine",
    "meanings": [
      "nine"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஒன்பது.",
    "exampleTranslation": "We can use this word in a sentence: nine.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஒன்பது.",
        "english": "We can use this word in a sentence: nine."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "nine"
    ]
  },
  {
    "id": "ta-0145",
    "tamil": "ஒன்று",
    "transliteration": "Onru",
    "english": "one",
    "meanings": [
      "one"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஒன்று.",
    "exampleTranslation": "We can use this word in a sentence: one.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஒன்று.",
        "english": "We can use this word in a sentence: one."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "one"
    ]
  },
  {
    "id": "ta-0146",
    "tamil": "ஒப்பிடு",
    "transliteration": "Oppitu",
    "english": "compare",
    "meanings": [
      "compare"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் ஒப்பிடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to compare every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் ஒப்பிடு முயற்சி செய்கிறேன்.",
        "english": "I try to compare every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "compare"
    ]
  },
  {
    "id": "ta-0147",
    "tamil": "ஒளி",
    "transliteration": "Oli",
    "english": "light",
    "meanings": [
      "light"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் ஒளி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about light.",
    "examples": [
      {
        "tamil": "நாம் ஒளி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about light."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "light"
    ]
  },
  {
    "id": "ta-0148",
    "tamil": "ஒழுக்கம்",
    "transliteration": "Ozhukkam",
    "english": "ethics/conduct",
    "meanings": [
      "ethics/conduct",
      "ethics",
      "conduct"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் ஒழுக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ethics/conduct.",
    "examples": [
      {
        "tamil": "நாம் ஒழுக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ethics/conduct."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ethics/conduct"
    ]
  },
  {
    "id": "ta-0149",
    "tamil": "ஒவ்வொரு",
    "transliteration": "Ovvoru",
    "english": "every",
    "meanings": [
      "every"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஒவ்வொரு.",
    "exampleTranslation": "We can use this word in a sentence: every.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: ஒவ்வொரு.",
        "english": "We can use this word in a sentence: every."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "every"
    ]
  },
  {
    "id": "ta-0150",
    "tamil": "ஓடு",
    "transliteration": "Oatu",
    "english": "run",
    "meanings": [
      "run"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் ஓடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to run every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் ஓடு முயற்சி செய்கிறேன்.",
        "english": "I try to run every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "run"
    ]
  },
  {
    "id": "ta-0151",
    "tamil": "ஓட்டுநர்",
    "transliteration": "Oattunar",
    "english": "driver",
    "meanings": [
      "driver"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் ஓட்டுநர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about driver.",
    "examples": [
      {
        "tamil": "நாம் ஓட்டுநர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about driver."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "driver"
    ]
  },
  {
    "id": "ta-0152",
    "tamil": "ஓநாய்",
    "transliteration": "Oanaay",
    "english": "wolf",
    "meanings": [
      "wolf"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் ஓநாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about wolf.",
    "examples": [
      {
        "tamil": "நாம் ஓநாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about wolf."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "wolf"
    ]
  },
  {
    "id": "ta-0153",
    "tamil": "ஓய்வு",
    "transliteration": "Oayvu",
    "english": "rest/retirement",
    "meanings": [
      "rest/retirement",
      "rest",
      "retirement"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் ஓய்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rest/retirement.",
    "examples": [
      {
        "tamil": "நாம் ஓய்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rest/retirement."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rest/retirement"
    ]
  },
  {
    "id": "ta-0154",
    "tamil": "ஓலைச்சுவடி",
    "transliteration": "Oalaichchuvati",
    "english": "palm-leaf manuscript",
    "meanings": [
      "palm-leaf manuscript"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் ஓலைச்சுவடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about palm-leaf manuscript.",
    "examples": [
      {
        "tamil": "நாம் ஓலைச்சுவடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about palm-leaf manuscript."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "palm-leaf manuscript"
    ]
  },
  {
    "id": "ta-0155",
    "tamil": "கசப்பான",
    "transliteration": "Kachappaana",
    "english": "bitter",
    "meanings": [
      "bitter"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் கசப்பான.",
    "exampleTranslation": "This is very bitter.",
    "examples": [
      {
        "tamil": "இது மிகவும் கசப்பான.",
        "english": "This is very bitter."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "bitter"
    ]
  },
  {
    "id": "ta-0156",
    "tamil": "கடமை",
    "transliteration": "Katamai",
    "english": "duty",
    "meanings": [
      "duty"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் கடமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about duty.",
    "examples": [
      {
        "tamil": "நாம் கடமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about duty."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "duty"
    ]
  },
  {
    "id": "ta-0157",
    "tamil": "கடற்கரை",
    "transliteration": "Katarkarai",
    "english": "seashore",
    "meanings": [
      "seashore"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் கடற்கரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about seashore.",
    "examples": [
      {
        "tamil": "நாம் கடற்கரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about seashore."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "seashore"
    ]
  },
  {
    "id": "ta-0158",
    "tamil": "கடல்",
    "transliteration": "Katal",
    "english": "sea",
    "meanings": [
      "sea"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் கடல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sea.",
    "examples": [
      {
        "tamil": "நாம் கடல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sea."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sea"
    ]
  },
  {
    "id": "ta-0159",
    "tamil": "கடிகாரம்",
    "transliteration": "Katikaaram",
    "english": "clock",
    "meanings": [
      "clock"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கடிகாரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about clock.",
    "examples": [
      {
        "tamil": "நாம் கடிகாரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about clock."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "clock"
    ]
  },
  {
    "id": "ta-0160",
    "tamil": "கடிதம்",
    "transliteration": "Katitham",
    "english": "letter",
    "meanings": [
      "letter"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கடிதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about letter.",
    "examples": [
      {
        "tamil": "நாம் கடிதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about letter."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "letter"
    ]
  },
  {
    "id": "ta-0161",
    "tamil": "கடினமான",
    "transliteration": "Katinamaana",
    "english": "difficult",
    "meanings": [
      "difficult"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் கடினமான.",
    "exampleTranslation": "This is very difficult.",
    "examples": [
      {
        "tamil": "இது மிகவும் கடினமான.",
        "english": "This is very difficult."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "difficult"
    ]
  },
  {
    "id": "ta-0162",
    "tamil": "கடை",
    "transliteration": "Katai",
    "english": "shop",
    "meanings": [
      "shop"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் கடை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about shop.",
    "examples": [
      {
        "tamil": "நாம் கடை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about shop."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "shop"
    ]
  },
  {
    "id": "ta-0163",
    "tamil": "கட்டை விரல்",
    "transliteration": "Kattai viral",
    "english": "thumb",
    "meanings": [
      "thumb"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கட்டை விரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about thumb.",
    "examples": [
      {
        "tamil": "நாம் கட்டை விரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about thumb."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thumb"
    ]
  },
  {
    "id": "ta-0164",
    "tamil": "கணக்கு போடு",
    "transliteration": "Kanakku poatu",
    "english": "calculate",
    "meanings": [
      "calculate"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கணக்கு போடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to calculate every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கணக்கு போடு முயற்சி செய்கிறேன்.",
        "english": "I try to calculate every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "calculate"
    ]
  },
  {
    "id": "ta-0165",
    "tamil": "கணவன்",
    "transliteration": "Kanavan",
    "english": "husband",
    "meanings": [
      "husband"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் கணவன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about husband.",
    "examples": [
      {
        "tamil": "நாம் கணவன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about husband."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "husband"
    ]
  },
  {
    "id": "ta-0166",
    "tamil": "கணிதம்",
    "transliteration": "Kanitham",
    "english": "mathematics",
    "meanings": [
      "mathematics"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் கணிதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mathematics.",
    "examples": [
      {
        "tamil": "நாம் கணிதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mathematics."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mathematics"
    ]
  },
  {
    "id": "ta-0167",
    "tamil": "கணினி",
    "transliteration": "Kanini",
    "english": "computer",
    "meanings": [
      "computer"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கணினி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about computer.",
    "examples": [
      {
        "tamil": "நாம் கணினி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about computer."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "computer"
    ]
  },
  {
    "id": "ta-0168",
    "tamil": "கண்",
    "transliteration": "Kan",
    "english": "eye",
    "meanings": [
      "eye"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கண் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about eye.",
    "examples": [
      {
        "tamil": "நாம் கண் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about eye."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eye"
    ]
  },
  {
    "id": "ta-0169",
    "tamil": "கண்கள்",
    "transliteration": "Kankal",
    "english": "eyes",
    "meanings": [
      "eyes"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கண்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about eyes.",
    "examples": [
      {
        "tamil": "நாம் கண்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about eyes."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eyes"
    ]
  },
  {
    "id": "ta-0170",
    "tamil": "கண்டுபிடி",
    "transliteration": "Kantupiti",
    "english": "find/discover",
    "meanings": [
      "find/discover",
      "find",
      "discover"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கண்டுபிடி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to find/discover every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கண்டுபிடி முயற்சி செய்கிறேன்.",
        "english": "I try to find/discover every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "find/discover"
    ]
  },
  {
    "id": "ta-0171",
    "tamil": "கண்ணாடி",
    "transliteration": "Kannaati",
    "english": "mirror; glasses",
    "meanings": [
      "mirror; glasses",
      "mirror",
      "glasses"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living",
      "Objects"
    ],
    "example": "நாம் கண்ணாடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mirror.",
    "examples": [
      {
        "tamil": "நாம் கண்ணாடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mirror."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mirror; glasses",
      "mirror"
    ]
  },
  {
    "id": "ta-0172",
    "tamil": "கண்ணீர்",
    "transliteration": "Kanneer",
    "english": "tear",
    "meanings": [
      "tear"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் கண்ணீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tear.",
    "examples": [
      {
        "tamil": "நாம் கண்ணீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tear."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tear"
    ]
  },
  {
    "id": "ta-0173",
    "tamil": "கதவு",
    "transliteration": "Kathavu",
    "english": "door",
    "meanings": [
      "door"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் கதவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about door.",
    "examples": [
      {
        "tamil": "நாம் கதவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about door."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "door"
    ]
  },
  {
    "id": "ta-0174",
    "tamil": "கதை",
    "transliteration": "Kathai",
    "english": "story",
    "meanings": [
      "story"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Culture"
    ],
    "example": "நாம் கதை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about story.",
    "examples": [
      {
        "tamil": "நாம் கதை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about story."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "story"
    ]
  },
  {
    "id": "ta-0175",
    "tamil": "கத்தி",
    "transliteration": "Kaththi",
    "english": "knife",
    "meanings": [
      "knife"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் கத்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about knife.",
    "examples": [
      {
        "tamil": "நாம் கத்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about knife."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "knife"
    ]
  },
  {
    "id": "ta-0176",
    "tamil": "கனவு",
    "transliteration": "Kanavu",
    "english": "dream",
    "meanings": [
      "dream"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் கனவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about dream.",
    "examples": [
      {
        "tamil": "நாம் கனவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about dream."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "dream"
    ]
  },
  {
    "id": "ta-0177",
    "tamil": "கப்",
    "transliteration": "Kap",
    "english": "cup",
    "meanings": [
      "cup"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் கப் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cup.",
    "examples": [
      {
        "tamil": "நாம் கப் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cup."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cup"
    ]
  },
  {
    "id": "ta-0178",
    "tamil": "கப்பல்",
    "transliteration": "Kappal",
    "english": "ship",
    "meanings": [
      "ship"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கப்பல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ship.",
    "examples": [
      {
        "tamil": "நாம் கப்பல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ship."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ship"
    ]
  },
  {
    "id": "ta-0179",
    "tamil": "கரடி",
    "transliteration": "Karati",
    "english": "bear",
    "meanings": [
      "bear"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் கரடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bear.",
    "examples": [
      {
        "tamil": "நாம் கரடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bear."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bear"
    ]
  },
  {
    "id": "ta-0180",
    "tamil": "கரண்டி",
    "transliteration": "Karanti",
    "english": "spoon",
    "meanings": [
      "spoon"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் கரண்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about spoon.",
    "examples": [
      {
        "tamil": "நாம் கரண்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about spoon."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "spoon"
    ]
  },
  {
    "id": "ta-0181",
    "tamil": "கருணை",
    "transliteration": "Karunai",
    "english": "compassion",
    "meanings": [
      "compassion"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் கருணை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about compassion.",
    "examples": [
      {
        "tamil": "நாம் கருணை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about compassion."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "compassion"
    ]
  },
  {
    "id": "ta-0182",
    "tamil": "கருத்து",
    "transliteration": "Karuththu",
    "english": "opinion/idea",
    "meanings": [
      "opinion/idea",
      "opinion",
      "idea"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் கருத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about opinion/idea.",
    "examples": [
      {
        "tamil": "நாம் கருத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about opinion/idea."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "opinion/idea"
    ]
  },
  {
    "id": "ta-0183",
    "tamil": "கருவி",
    "transliteration": "Karuvi",
    "english": "tool",
    "meanings": [
      "tool"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கருவி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tool.",
    "examples": [
      {
        "tamil": "நாம் கருவி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tool."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tool"
    ]
  },
  {
    "id": "ta-0184",
    "tamil": "கற்பனை செய்",
    "transliteration": "Karpanai chey",
    "english": "imagine",
    "meanings": [
      "imagine"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கற்பனை செய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to imagine every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கற்பனை செய் முயற்சி செய்கிறேன்.",
        "english": "I try to imagine every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "imagine"
    ]
  },
  {
    "id": "ta-0185",
    "tamil": "கற்பி",
    "transliteration": "Karpi",
    "english": "teach",
    "meanings": [
      "teach"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கற்பி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to teach every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கற்பி முயற்சி செய்கிறேன்.",
        "english": "I try to teach every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "teach"
    ]
  },
  {
    "id": "ta-0186",
    "tamil": "கற்பித்தல்",
    "transliteration": "Karpiththal",
    "english": "teaching",
    "meanings": [
      "teaching"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் கற்பித்தல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about teaching.",
    "examples": [
      {
        "tamil": "நாம் கற்பித்தல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about teaching."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "teaching"
    ]
  },
  {
    "id": "ta-0187",
    "tamil": "கற்று",
    "transliteration": "Karru",
    "english": "learn",
    "meanings": [
      "learn"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கற்று முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to learn every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கற்று முயற்சி செய்கிறேன்.",
        "english": "I try to learn every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "learn"
    ]
  },
  {
    "id": "ta-0188",
    "tamil": "கலை",
    "transliteration": "Kalai",
    "english": "art",
    "meanings": [
      "art"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் கலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about art.",
    "examples": [
      {
        "tamil": "நாம் கலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about art."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "art"
    ]
  },
  {
    "id": "ta-0189",
    "tamil": "கல்",
    "transliteration": "Kal",
    "english": "stone",
    "meanings": [
      "stone"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் கல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about stone.",
    "examples": [
      {
        "tamil": "நாம் கல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about stone."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "stone"
    ]
  },
  {
    "id": "ta-0190",
    "tamil": "கல்லூரி",
    "transliteration": "Kalloori",
    "english": "college",
    "meanings": [
      "college"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் கல்லூரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about college.",
    "examples": [
      {
        "tamil": "நாம் கல்லூரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about college."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "college"
    ]
  },
  {
    "id": "ta-0191",
    "tamil": "கல்வி",
    "transliteration": "Kalvi",
    "english": "education",
    "meanings": [
      "education"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் கல்வி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about education.",
    "examples": [
      {
        "tamil": "நாம் கல்வி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about education."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "education"
    ]
  },
  {
    "id": "ta-0192",
    "tamil": "கல்வெட்டு",
    "transliteration": "Kalvettu",
    "english": "inscription",
    "meanings": [
      "inscription"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் கல்வெட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about inscription.",
    "examples": [
      {
        "tamil": "நாம் கல்வெட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about inscription."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "inscription"
    ]
  },
  {
    "id": "ta-0193",
    "tamil": "கழுகு",
    "transliteration": "Kazhuku",
    "english": "eagle",
    "meanings": [
      "eagle"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் கழுகு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about eagle.",
    "examples": [
      {
        "tamil": "நாம் கழுகு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about eagle."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eagle"
    ]
  },
  {
    "id": "ta-0194",
    "tamil": "கழுத்து",
    "transliteration": "Kazhuththu",
    "english": "neck",
    "meanings": [
      "neck"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கழுத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about neck.",
    "examples": [
      {
        "tamil": "நாம் கழுத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about neck."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "neck"
    ]
  },
  {
    "id": "ta-0195",
    "tamil": "கழுவு",
    "transliteration": "Kazhuvu",
    "english": "wash",
    "meanings": [
      "wash"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கழுவு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to wash every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கழுவு முயற்சி செய்கிறேன்.",
        "english": "I try to wash every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "wash"
    ]
  },
  {
    "id": "ta-0196",
    "tamil": "கவனமான",
    "transliteration": "Kavanamaana",
    "english": "careful",
    "meanings": [
      "careful"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் கவனமான.",
    "exampleTranslation": "This is very careful.",
    "examples": [
      {
        "tamil": "இது மிகவும் கவனமான.",
        "english": "This is very careful."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "careful"
    ]
  },
  {
    "id": "ta-0197",
    "tamil": "கவனி",
    "transliteration": "Kavani",
    "english": "observe/pay attention",
    "meanings": [
      "observe/pay attention",
      "observe",
      "pay attention"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கவனி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to observe/pay attention every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கவனி முயற்சி செய்கிறேன்.",
        "english": "I try to observe/pay attention every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "observe/pay attention"
    ]
  },
  {
    "id": "ta-0198",
    "tamil": "கவலை",
    "transliteration": "Kavalai",
    "english": "worry",
    "meanings": [
      "worry"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் கவலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about worry.",
    "examples": [
      {
        "tamil": "நாம் கவலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about worry."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "worry"
    ]
  },
  {
    "id": "ta-0199",
    "tamil": "கவிதை",
    "transliteration": "Kavithai",
    "english": "poem; poetry",
    "meanings": [
      "poem; poetry",
      "poem",
      "poetry"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Culture"
    ],
    "example": "நாம் கவிதை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about poem.",
    "examples": [
      {
        "tamil": "நாம் கவிதை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about poem."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "poem; poetry",
      "poem"
    ]
  },
  {
    "id": "ta-0200",
    "tamil": "காகம்",
    "transliteration": "Kaakam",
    "english": "crow",
    "meanings": [
      "crow"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் காகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about crow.",
    "examples": [
      {
        "tamil": "நாம் காகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about crow."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "crow"
    ]
  },
  {
    "id": "ta-0201",
    "tamil": "காகிதம்",
    "transliteration": "Kaakitham",
    "english": "paper",
    "meanings": [
      "paper"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் காகிதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about paper.",
    "examples": [
      {
        "tamil": "நாம் காகிதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about paper."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "paper"
    ]
  },
  {
    "id": "ta-0202",
    "tamil": "காடு",
    "transliteration": "Kaatu",
    "english": "forest",
    "meanings": [
      "forest"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் காடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about forest.",
    "examples": [
      {
        "tamil": "நாம் காடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about forest."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "forest"
    ]
  },
  {
    "id": "ta-0203",
    "tamil": "காட்டு",
    "transliteration": "Kaattu",
    "english": "show",
    "meanings": [
      "show"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் காட்டு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to show every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் காட்டு முயற்சி செய்கிறேன்.",
        "english": "I try to show every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "show"
    ]
  },
  {
    "id": "ta-0204",
    "tamil": "காது",
    "transliteration": "Kaathu",
    "english": "ear",
    "meanings": [
      "ear"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் காது பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ear.",
    "examples": [
      {
        "tamil": "நாம் காது பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ear."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ear"
    ]
  },
  {
    "id": "ta-0205",
    "tamil": "காத்திரு",
    "transliteration": "Kaaththiru",
    "english": "wait",
    "meanings": [
      "wait"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் காத்திரு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to wait every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் காத்திரு முயற்சி செய்கிறேன்.",
        "english": "I try to wait every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "wait"
    ]
  },
  {
    "id": "ta-0206",
    "tamil": "காபி",
    "transliteration": "Kaapi",
    "english": "coffee",
    "meanings": [
      "coffee"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் காபி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about coffee.",
    "examples": [
      {
        "tamil": "நாம் காபி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about coffee."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "coffee"
    ]
  },
  {
    "id": "ta-0207",
    "tamil": "காய்கறி",
    "transliteration": "Kaaykari",
    "english": "vegetable",
    "meanings": [
      "vegetable"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் காய்கறி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about vegetable.",
    "examples": [
      {
        "tamil": "நாம் காய்கறி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about vegetable."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "vegetable"
    ]
  },
  {
    "id": "ta-0208",
    "tamil": "காரணம்",
    "transliteration": "Kaaranam",
    "english": "reason",
    "meanings": [
      "reason"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் காரணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about reason.",
    "examples": [
      {
        "tamil": "நாம் காரணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about reason."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "reason"
    ]
  },
  {
    "id": "ta-0209",
    "tamil": "கார்",
    "transliteration": "Kaar",
    "english": "car",
    "meanings": [
      "car"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கார் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about car.",
    "examples": [
      {
        "tamil": "நாம் கார் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about car."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "car"
    ]
  },
  {
    "id": "ta-0210",
    "tamil": "காற்று",
    "transliteration": "Kaarru",
    "english": "wind; air/wind",
    "meanings": [
      "wind; air/wind",
      "wind",
      "air",
      "wind"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் காற்று பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about wind.",
    "examples": [
      {
        "tamil": "நாம் காற்று பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about wind."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "wind; air/wind",
      "wind"
    ]
  },
  {
    "id": "ta-0211",
    "tamil": "காலணி",
    "transliteration": "Kaalani",
    "english": "footwear",
    "meanings": [
      "footwear"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் காலணி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about footwear.",
    "examples": [
      {
        "tamil": "நாம் காலணி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about footwear."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "footwear"
    ]
  },
  {
    "id": "ta-0212",
    "tamil": "காலம்",
    "transliteration": "Kaalam",
    "english": "time/era",
    "meanings": [
      "time/era",
      "time",
      "era"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் காலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about time/era.",
    "examples": [
      {
        "tamil": "நாம் காலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about time/era."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "time/era"
    ]
  },
  {
    "id": "ta-0213",
    "tamil": "காலை",
    "transliteration": "Kaalai",
    "english": "morning",
    "meanings": [
      "morning"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் காலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about morning.",
    "examples": [
      {
        "tamil": "நாம் காலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about morning."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "morning"
    ]
  },
  {
    "id": "ta-0214",
    "tamil": "காலை உணவு",
    "transliteration": "Kaalai unavu",
    "english": "breakfast",
    "meanings": [
      "breakfast"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் காலை உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about breakfast.",
    "examples": [
      {
        "tamil": "நாம் காலை உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about breakfast."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "breakfast"
    ]
  },
  {
    "id": "ta-0215",
    "tamil": "கால்",
    "transliteration": "Kaal",
    "english": "leg",
    "meanings": [
      "leg"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கால் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about leg.",
    "examples": [
      {
        "tamil": "நாம் கால் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about leg."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "leg"
    ]
  },
  {
    "id": "ta-0216",
    "tamil": "கால் விரல்",
    "transliteration": "Kaal viral",
    "english": "toe",
    "meanings": [
      "toe"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கால் விரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about toe.",
    "examples": [
      {
        "tamil": "நாம் கால் விரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about toe."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "toe"
    ]
  },
  {
    "id": "ta-0217",
    "tamil": "காளை",
    "transliteration": "Kaalai",
    "english": "bull",
    "meanings": [
      "bull"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் காளை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bull.",
    "examples": [
      {
        "tamil": "நாம் காளை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bull."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bull"
    ]
  },
  {
    "id": "ta-0218",
    "tamil": "காவலர்",
    "transliteration": "Kaavalar",
    "english": "police officer",
    "meanings": [
      "police officer"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் காவலர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about police officer.",
    "examples": [
      {
        "tamil": "நாம் காவலர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about police officer."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "police officer"
    ]
  },
  {
    "id": "ta-0219",
    "tamil": "கிராமம்",
    "transliteration": "Kiraamam",
    "english": "village",
    "meanings": [
      "village"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் கிராமம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about village.",
    "examples": [
      {
        "tamil": "நாம் கிராமம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about village."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "village"
    ]
  },
  {
    "id": "ta-0220",
    "tamil": "கிளி",
    "transliteration": "Kili",
    "english": "parrot",
    "meanings": [
      "parrot"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் கிளி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about parrot.",
    "examples": [
      {
        "tamil": "நாம் கிளி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about parrot."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "parrot"
    ]
  },
  {
    "id": "ta-0221",
    "tamil": "கிளை",
    "transliteration": "Kilai",
    "english": "branch",
    "meanings": [
      "branch"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் கிளை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about branch.",
    "examples": [
      {
        "tamil": "நாம் கிளை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about branch."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "branch"
    ]
  },
  {
    "id": "ta-0222",
    "tamil": "கீரை",
    "transliteration": "Keerai",
    "english": "greens",
    "meanings": [
      "greens"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் கீரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about greens.",
    "examples": [
      {
        "tamil": "நாம் கீரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about greens."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "greens"
    ]
  },
  {
    "id": "ta-0223",
    "tamil": "கீழ்",
    "transliteration": "Keezh",
    "english": "below",
    "meanings": [
      "below"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: கீழ்.",
    "exampleTranslation": "We can use this word in a sentence: below.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: கீழ்.",
        "english": "We can use this word in a sentence: below."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "below"
    ]
  },
  {
    "id": "ta-0224",
    "tamil": "குடி",
    "transliteration": "Kuti",
    "english": "drink",
    "meanings": [
      "drink"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் குடி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to drink every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் குடி முயற்சி செய்கிறேன்.",
        "english": "I try to drink every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "drink"
    ]
  },
  {
    "id": "ta-0225",
    "tamil": "குடும்பம்",
    "transliteration": "Kutumpam",
    "english": "family",
    "meanings": [
      "family"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் குடும்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about family.",
    "examples": [
      {
        "tamil": "நாம் குடும்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about family."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "family"
    ]
  },
  {
    "id": "ta-0226",
    "tamil": "குடை",
    "transliteration": "Kutai",
    "english": "umbrella",
    "meanings": [
      "umbrella"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் குடை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about umbrella.",
    "examples": [
      {
        "tamil": "நாம் குடை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about umbrella."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "umbrella"
    ]
  },
  {
    "id": "ta-0227",
    "tamil": "குதிரை",
    "transliteration": "Kuthirai",
    "english": "horse",
    "meanings": [
      "horse"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் குதிரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about horse.",
    "examples": [
      {
        "tamil": "நாம் குதிரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about horse."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "horse"
    ]
  },
  {
    "id": "ta-0228",
    "tamil": "குயில்",
    "transliteration": "Kuyil",
    "english": "cuckoo",
    "meanings": [
      "cuckoo"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் குயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cuckoo.",
    "examples": [
      {
        "tamil": "நாம் குயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cuckoo."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cuckoo"
    ]
  },
  {
    "id": "ta-0229",
    "tamil": "குரங்கு",
    "transliteration": "Kurangku",
    "english": "monkey",
    "meanings": [
      "monkey"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் குரங்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about monkey.",
    "examples": [
      {
        "tamil": "நாம் குரங்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about monkey."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "monkey"
    ]
  },
  {
    "id": "ta-0230",
    "tamil": "குறிக்கோள்",
    "transliteration": "Kurikkoal",
    "english": "goal",
    "meanings": [
      "goal"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் குறிக்கோள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about goal.",
    "examples": [
      {
        "tamil": "நாம் குறிக்கோள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about goal."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "goal"
    ]
  },
  {
    "id": "ta-0231",
    "tamil": "குறுகிய",
    "transliteration": "Kurukiya",
    "english": "short",
    "meanings": [
      "short"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் குறுகிய.",
    "exampleTranslation": "This is very short.",
    "examples": [
      {
        "tamil": "இது மிகவும் குறுகிய.",
        "english": "This is very short."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "short"
    ]
  },
  {
    "id": "ta-0232",
    "tamil": "குளம்",
    "transliteration": "Kulam",
    "english": "pond",
    "meanings": [
      "pond"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் குளம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pond.",
    "examples": [
      {
        "tamil": "நாம் குளம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pond."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pond"
    ]
  },
  {
    "id": "ta-0233",
    "tamil": "குளியலறை",
    "transliteration": "Kuliyalarai",
    "english": "bathroom",
    "meanings": [
      "bathroom"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் குளியலறை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bathroom.",
    "examples": [
      {
        "tamil": "நாம் குளியலறை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bathroom."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bathroom"
    ]
  },
  {
    "id": "ta-0234",
    "tamil": "குளிர்",
    "transliteration": "Kulir",
    "english": "cold",
    "meanings": [
      "cold"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் குளிர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cold.",
    "examples": [
      {
        "tamil": "நாம் குளிர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cold."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cold"
    ]
  },
  {
    "id": "ta-0235",
    "tamil": "குளிர்ந்த",
    "transliteration": "Kulirntha",
    "english": "cold",
    "meanings": [
      "cold"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் குளிர்ந்த.",
    "exampleTranslation": "This is very cold.",
    "examples": [
      {
        "tamil": "இது மிகவும் குளிர்ந்த.",
        "english": "This is very cold."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "cold"
    ]
  },
  {
    "id": "ta-0236",
    "tamil": "குழந்தை",
    "transliteration": "Kuzhanthai",
    "english": "child",
    "meanings": [
      "child"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் குழந்தை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about child.",
    "examples": [
      {
        "tamil": "நாம் குழந்தை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about child."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "child"
    ]
  },
  {
    "id": "ta-0237",
    "tamil": "குழந்தைகள்",
    "transliteration": "Kuzhanthaikal",
    "english": "children",
    "meanings": [
      "children"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் குழந்தைகள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about children.",
    "examples": [
      {
        "tamil": "நாம் குழந்தைகள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about children."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "children"
    ]
  },
  {
    "id": "ta-0238",
    "tamil": "குழு",
    "transliteration": "Kuzhu",
    "english": "group/team",
    "meanings": [
      "group/team",
      "group",
      "team"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் குழு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about group/team.",
    "examples": [
      {
        "tamil": "நாம் குழு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about group/team."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "group/team"
    ]
  },
  {
    "id": "ta-0239",
    "tamil": "கூட",
    "transliteration": "Koota",
    "english": "also/even",
    "meanings": [
      "also/even",
      "also",
      "even"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: கூட.",
    "exampleTranslation": "We can use this word in a sentence: also/even.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: கூட.",
        "english": "We can use this word in a sentence: also/even."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "also/even"
    ]
  },
  {
    "id": "ta-0240",
    "tamil": "கூட்டம்",
    "transliteration": "Koottam",
    "english": "meeting/crowd",
    "meanings": [
      "meeting/crowd",
      "meeting",
      "crowd"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் கூட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about meeting/crowd.",
    "examples": [
      {
        "tamil": "நாம் கூட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about meeting/crowd."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "meeting/crowd"
    ]
  },
  {
    "id": "ta-0241",
    "tamil": "கூரை",
    "transliteration": "Koorai",
    "english": "roof",
    "meanings": [
      "roof"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் கூரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about roof.",
    "examples": [
      {
        "tamil": "நாம் கூரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about roof."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "roof"
    ]
  },
  {
    "id": "ta-0242",
    "tamil": "கெட்ட",
    "transliteration": "Ketta",
    "english": "bad",
    "meanings": [
      "bad"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் கெட்ட.",
    "exampleTranslation": "This is very bad.",
    "examples": [
      {
        "tamil": "இது மிகவும் கெட்ட.",
        "english": "This is very bad."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "bad"
    ]
  },
  {
    "id": "ta-0243",
    "tamil": "கேமரா",
    "transliteration": "Kaemaraa",
    "english": "camera",
    "meanings": [
      "camera"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கேமரா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about camera.",
    "examples": [
      {
        "tamil": "நாம் கேமரா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about camera."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "camera"
    ]
  },
  {
    "id": "ta-0244",
    "tamil": "கேள்",
    "transliteration": "Kael",
    "english": "ask/hear",
    "meanings": [
      "ask/hear",
      "ask",
      "hear"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கேள் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to ask/hear every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கேள் முயற்சி செய்கிறேன்.",
        "english": "I try to ask/hear every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "ask/hear"
    ]
  },
  {
    "id": "ta-0245",
    "tamil": "கேள்வி",
    "transliteration": "Kaelvi",
    "english": "question",
    "meanings": [
      "question"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Abstract"
    ],
    "example": "நாம் கேள்வி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about question.",
    "examples": [
      {
        "tamil": "நாம் கேள்வி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about question."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "question"
    ]
  },
  {
    "id": "ta-0246",
    "tamil": "கேள்வி கேள்",
    "transliteration": "Kaelvi kael",
    "english": "question/ask",
    "meanings": [
      "question/ask",
      "question",
      "ask"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கேள்வி கேள் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to question/ask every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கேள்வி கேள் முயற்சி செய்கிறேன்.",
        "english": "I try to question/ask every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "question/ask"
    ]
  },
  {
    "id": "ta-0247",
    "tamil": "கை",
    "transliteration": "Kai",
    "english": "hand",
    "meanings": [
      "hand"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் கை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hand.",
    "examples": [
      {
        "tamil": "நாம் கை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hand."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hand"
    ]
  },
  {
    "id": "ta-0248",
    "tamil": "கைபேசி",
    "transliteration": "Kaipaechi",
    "english": "mobile phone",
    "meanings": [
      "mobile phone"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் கைபேசி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mobile phone.",
    "examples": [
      {
        "tamil": "நாம் கைபேசி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mobile phone."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mobile phone"
    ]
  },
  {
    "id": "ta-0249",
    "tamil": "கொடு",
    "transliteration": "Kotu",
    "english": "give",
    "meanings": [
      "give"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் கொடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to give every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் கொடு முயற்சி செய்கிறேன்.",
        "english": "I try to give every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "give"
    ]
  },
  {
    "id": "ta-0250",
    "tamil": "கோபம்",
    "transliteration": "Koapam",
    "english": "anger",
    "meanings": [
      "anger"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் கோபம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about anger.",
    "examples": [
      {
        "tamil": "நாம் கோபம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about anger."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "anger"
    ]
  },
  {
    "id": "ta-0251",
    "tamil": "கோலம்",
    "transliteration": "Koalam",
    "english": "kolam",
    "meanings": [
      "kolam"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் கோலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about kolam.",
    "examples": [
      {
        "tamil": "நாம் கோலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about kolam."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "kolam"
    ]
  },
  {
    "id": "ta-0252",
    "tamil": "கோழி",
    "transliteration": "Koazhi",
    "english": "chicken; hen",
    "meanings": [
      "chicken; hen",
      "chicken",
      "hen"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink",
      "Animals"
    ],
    "example": "நாம் கோழி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chicken.",
    "examples": [
      {
        "tamil": "நாம் கோழி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chicken."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chicken; hen",
      "chicken"
    ]
  },
  {
    "id": "ta-0253",
    "tamil": "கோவில்",
    "transliteration": "Koavil",
    "english": "temple",
    "meanings": [
      "temple"
    ],
    "category": "Places",
    "categories": [
      "Places",
      "Culture"
    ],
    "example": "நாம் கோவில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about temple.",
    "examples": [
      {
        "tamil": "நாம் கோவில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about temple."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "temple"
    ]
  },
  {
    "id": "ta-0254",
    "tamil": "சகோதரன்",
    "transliteration": "Chakoatharan",
    "english": "brother",
    "meanings": [
      "brother"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் சகோதரன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about brother.",
    "examples": [
      {
        "tamil": "நாம் சகோதரன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about brother."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "brother"
    ]
  },
  {
    "id": "ta-0255",
    "tamil": "சகோதரி",
    "transliteration": "Chakoathari",
    "english": "sister",
    "meanings": [
      "sister"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் சகோதரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sister.",
    "examples": [
      {
        "tamil": "நாம் சகோதரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sister."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sister"
    ]
  },
  {
    "id": "ta-0256",
    "tamil": "சக்தி",
    "transliteration": "Chakthi",
    "english": "power/energy",
    "meanings": [
      "power/energy",
      "power",
      "energy"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் சக்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about power/energy.",
    "examples": [
      {
        "tamil": "நாம் சக்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about power/energy."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "power/energy"
    ]
  },
  {
    "id": "ta-0257",
    "tamil": "சங்கிலி",
    "transliteration": "Changkili",
    "english": "chain",
    "meanings": [
      "chain"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் சங்கிலி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chain.",
    "examples": [
      {
        "tamil": "நாம் சங்கிலி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chain."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chain"
    ]
  },
  {
    "id": "ta-0258",
    "tamil": "சட்டம்",
    "transliteration": "Chattam",
    "english": "law",
    "meanings": [
      "law"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் சட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about law.",
    "examples": [
      {
        "tamil": "நாம் சட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about law."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "law"
    ]
  },
  {
    "id": "ta-0259",
    "tamil": "சட்டை",
    "transliteration": "Chattai",
    "english": "shirt",
    "meanings": [
      "shirt"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் சட்டை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about shirt.",
    "examples": [
      {
        "tamil": "நாம் சட்டை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about shirt."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "shirt"
    ]
  },
  {
    "id": "ta-0260",
    "tamil": "சட்னி",
    "transliteration": "Chatni",
    "english": "chutney",
    "meanings": [
      "chutney"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் சட்னி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chutney.",
    "examples": [
      {
        "tamil": "நாம் சட்னி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chutney."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chutney"
    ]
  },
  {
    "id": "ta-0261",
    "tamil": "சத்தமான",
    "transliteration": "Chaththamaana",
    "english": "noisy",
    "meanings": [
      "noisy"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சத்தமான.",
    "exampleTranslation": "This is very noisy.",
    "examples": [
      {
        "tamil": "இது மிகவும் சத்தமான.",
        "english": "This is very noisy."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "noisy"
    ]
  },
  {
    "id": "ta-0262",
    "tamil": "சந்திரன்",
    "transliteration": "Chanthiran",
    "english": "moon",
    "meanings": [
      "moon"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் சந்திரன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about moon.",
    "examples": [
      {
        "tamil": "நாம் சந்திரன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about moon."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "moon"
    ]
  },
  {
    "id": "ta-0263",
    "tamil": "சந்தை",
    "transliteration": "Chanthai",
    "english": "market",
    "meanings": [
      "market"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் சந்தை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about market.",
    "examples": [
      {
        "tamil": "நாம் சந்தை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about market."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "market"
    ]
  },
  {
    "id": "ta-0264",
    "tamil": "சனி",
    "transliteration": "Chani",
    "english": "Saturday",
    "meanings": [
      "Saturday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் சனி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Saturday.",
    "examples": [
      {
        "tamil": "நாம் சனி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Saturday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Saturday",
      "saturday"
    ]
  },
  {
    "id": "ta-0265",
    "tamil": "சமத்துவம்",
    "transliteration": "Chamaththuvam",
    "english": "equality",
    "meanings": [
      "equality"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் சமத்துவம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about equality.",
    "examples": [
      {
        "tamil": "நாம் சமத்துவம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about equality."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "equality"
    ]
  },
  {
    "id": "ta-0266",
    "tamil": "சமூகம்",
    "transliteration": "Chamookam",
    "english": "society",
    "meanings": [
      "society"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் சமூகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about society.",
    "examples": [
      {
        "tamil": "நாம் சமூகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about society."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "society"
    ]
  },
  {
    "id": "ta-0267",
    "tamil": "சமை",
    "transliteration": "Chamai",
    "english": "cook",
    "meanings": [
      "cook"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் சமை முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to cook every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் சமை முயற்சி செய்கிறேன்.",
        "english": "I try to cook every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "cook"
    ]
  },
  {
    "id": "ta-0268",
    "tamil": "சமையலறை",
    "transliteration": "Chamaiyalarai",
    "english": "kitchen",
    "meanings": [
      "kitchen"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் சமையலறை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about kitchen.",
    "examples": [
      {
        "tamil": "நாம் சமையலறை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about kitchen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "kitchen"
    ]
  },
  {
    "id": "ta-0269",
    "tamil": "சரி",
    "transliteration": "Chari",
    "english": "okay/correct",
    "meanings": [
      "okay/correct",
      "okay",
      "correct"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் சரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about okay/correct.",
    "examples": [
      {
        "tamil": "நாம் சரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about okay/correct."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "okay/correct"
    ]
  },
  {
    "id": "ta-0270",
    "tamil": "சரிபார்",
    "transliteration": "Charipaar",
    "english": "check/verify",
    "meanings": [
      "check/verify",
      "check",
      "verify"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் சரிபார் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to check/verify every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் சரிபார் முயற்சி செய்கிறேன்.",
        "english": "I try to check/verify every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "check/verify"
    ]
  },
  {
    "id": "ta-0271",
    "tamil": "சரியான",
    "transliteration": "Chariyaana",
    "english": "correct",
    "meanings": [
      "correct"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சரியான.",
    "exampleTranslation": "This is very correct.",
    "examples": [
      {
        "tamil": "இது மிகவும் சரியான.",
        "english": "This is very correct."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "correct"
    ]
  },
  {
    "id": "ta-0272",
    "tamil": "சர்க்கரை",
    "transliteration": "Charkkarai",
    "english": "sugar",
    "meanings": [
      "sugar"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் சர்க்கரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sugar.",
    "examples": [
      {
        "tamil": "நாம் சர்க்கரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sugar."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sugar"
    ]
  },
  {
    "id": "ta-0273",
    "tamil": "சாப்பிடு",
    "transliteration": "Chaappitu",
    "english": "eat",
    "meanings": [
      "eat"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் சாப்பிடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to eat every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் சாப்பிடு முயற்சி செய்கிறேன்.",
        "english": "I try to eat every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "eat"
    ]
  },
  {
    "id": "ta-0274",
    "tamil": "சாம்பார்",
    "transliteration": "Chaampaar",
    "english": "sambar",
    "meanings": [
      "sambar"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் சாம்பார் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sambar.",
    "examples": [
      {
        "tamil": "நாம் சாம்பார் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sambar."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sambar"
    ]
  },
  {
    "id": "ta-0275",
    "tamil": "சாறு",
    "transliteration": "Chaaru",
    "english": "juice",
    "meanings": [
      "juice"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் சாறு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about juice.",
    "examples": [
      {
        "tamil": "நாம் சாறு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about juice."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "juice"
    ]
  },
  {
    "id": "ta-0276",
    "tamil": "சாலை",
    "transliteration": "Chaalai",
    "english": "road",
    "meanings": [
      "road"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் சாலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about road.",
    "examples": [
      {
        "tamil": "நாம் சாலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about road."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "road"
    ]
  },
  {
    "id": "ta-0277",
    "tamil": "சாவி",
    "transliteration": "Chaavi",
    "english": "key",
    "meanings": [
      "key"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் சாவி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about key.",
    "examples": [
      {
        "tamil": "நாம் சாவி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about key."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "key"
    ]
  },
  {
    "id": "ta-0278",
    "tamil": "சிக்கல்",
    "transliteration": "Chikkal",
    "english": "problem",
    "meanings": [
      "problem"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் சிக்கல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about problem.",
    "examples": [
      {
        "tamil": "நாம் சிக்கல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about problem."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "problem"
    ]
  },
  {
    "id": "ta-0279",
    "tamil": "சிங்கம்",
    "transliteration": "Chingkam",
    "english": "lion",
    "meanings": [
      "lion"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் சிங்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lion.",
    "examples": [
      {
        "tamil": "நாம் சிங்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lion."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lion"
    ]
  },
  {
    "id": "ta-0280",
    "tamil": "சிரி",
    "transliteration": "Chiri",
    "english": "laugh",
    "meanings": [
      "laugh"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் சிரி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to laugh every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் சிரி முயற்சி செய்கிறேன்.",
        "english": "I try to laugh every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "laugh"
    ]
  },
  {
    "id": "ta-0281",
    "tamil": "சிரிப்பு",
    "transliteration": "Chirippu",
    "english": "laughter",
    "meanings": [
      "laughter"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் சிரிப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about laughter.",
    "examples": [
      {
        "tamil": "நாம் சிரிப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about laughter."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "laughter"
    ]
  },
  {
    "id": "ta-0282",
    "tamil": "சிறப்பான",
    "transliteration": "Chirappaana",
    "english": "special",
    "meanings": [
      "special"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சிறப்பான.",
    "exampleTranslation": "This is very special.",
    "examples": [
      {
        "tamil": "இது மிகவும் சிறப்பான.",
        "english": "This is very special."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "special"
    ]
  },
  {
    "id": "ta-0283",
    "tamil": "சிறிய",
    "transliteration": "Chiriya",
    "english": "small",
    "meanings": [
      "small"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சிறிய.",
    "exampleTranslation": "This is very small.",
    "examples": [
      {
        "tamil": "இது மிகவும் சிறிய.",
        "english": "This is very small."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "small"
    ]
  },
  {
    "id": "ta-0284",
    "tamil": "சிற்பம்",
    "transliteration": "Chirpam",
    "english": "sculpture",
    "meanings": [
      "sculpture"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் சிற்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sculpture.",
    "examples": [
      {
        "tamil": "நாம் சிற்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sculpture."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sculpture"
    ]
  },
  {
    "id": "ta-0285",
    "tamil": "சில",
    "transliteration": "Chila",
    "english": "some",
    "meanings": [
      "some"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: சில.",
    "exampleTranslation": "We can use this word in a sentence: some.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: சில.",
        "english": "We can use this word in a sentence: some."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "some"
    ]
  },
  {
    "id": "ta-0286",
    "tamil": "சிலந்தி",
    "transliteration": "Chilanthi",
    "english": "spider",
    "meanings": [
      "spider"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் சிலந்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about spider.",
    "examples": [
      {
        "tamil": "நாம் சிலந்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about spider."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "spider"
    ]
  },
  {
    "id": "ta-0287",
    "tamil": "சீக்கிரம்",
    "transliteration": "Cheekkiram",
    "english": "soon/quickly",
    "meanings": [
      "soon/quickly",
      "soon",
      "quickly"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் சீக்கிரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about soon/quickly.",
    "examples": [
      {
        "tamil": "நாம் சீக்கிரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about soon/quickly."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "soon/quickly"
    ]
  },
  {
    "id": "ta-0288",
    "tamil": "சுட்டி",
    "transliteration": "Chutti",
    "english": "mouse",
    "meanings": [
      "mouse"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் சுட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mouse.",
    "examples": [
      {
        "tamil": "நாம் சுட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mouse."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mouse"
    ]
  },
  {
    "id": "ta-0289",
    "tamil": "சுண்ணக்கட்டி",
    "transliteration": "Chunnakkatti",
    "english": "chalk",
    "meanings": [
      "chalk"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் சுண்ணக்கட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chalk.",
    "examples": [
      {
        "tamil": "நாம் சுண்ணக்கட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chalk."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chalk"
    ]
  },
  {
    "id": "ta-0290",
    "tamil": "சுதந்திரம்",
    "transliteration": "Chuthanthiram",
    "english": "freedom",
    "meanings": [
      "freedom"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் சுதந்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about freedom.",
    "examples": [
      {
        "tamil": "நாம் சுதந்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about freedom."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "freedom"
    ]
  },
  {
    "id": "ta-0291",
    "tamil": "சுத்தமான",
    "transliteration": "Chuththamaana",
    "english": "clean",
    "meanings": [
      "clean"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சுத்தமான.",
    "exampleTranslation": "This is very clean.",
    "examples": [
      {
        "tamil": "இது மிகவும் சுத்தமான.",
        "english": "This is very clean."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "clean"
    ]
  },
  {
    "id": "ta-0292",
    "tamil": "சுத்தம் செய்",
    "transliteration": "Chuththam chey",
    "english": "clean",
    "meanings": [
      "clean"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் சுத்தம் செய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to clean every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் சுத்தம் செய் முயற்சி செய்கிறேன்.",
        "english": "I try to clean every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "clean"
    ]
  },
  {
    "id": "ta-0293",
    "tamil": "சுறா",
    "transliteration": "Churaa",
    "english": "shark",
    "meanings": [
      "shark"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் சுறா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about shark.",
    "examples": [
      {
        "tamil": "நாம் சுறா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about shark."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "shark"
    ]
  },
  {
    "id": "ta-0294",
    "tamil": "சுவர்",
    "transliteration": "Chuvar",
    "english": "wall",
    "meanings": [
      "wall"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் சுவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about wall.",
    "examples": [
      {
        "tamil": "நாம் சுவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about wall."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "wall"
    ]
  },
  {
    "id": "ta-0295",
    "tamil": "சுவை",
    "transliteration": "Chuvai",
    "english": "taste",
    "meanings": [
      "taste"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் சுவை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about taste.",
    "examples": [
      {
        "tamil": "நாம் சுவை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about taste."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "taste"
    ]
  },
  {
    "id": "ta-0296",
    "tamil": "சூடான",
    "transliteration": "Chootaana",
    "english": "hot",
    "meanings": [
      "hot"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சூடான.",
    "exampleTranslation": "This is very hot.",
    "examples": [
      {
        "tamil": "இது மிகவும் சூடான.",
        "english": "This is very hot."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "hot"
    ]
  },
  {
    "id": "ta-0297",
    "tamil": "சூரியன்",
    "transliteration": "Chooriyan",
    "english": "sun",
    "meanings": [
      "sun"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் சூரியன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sun.",
    "examples": [
      {
        "tamil": "நாம் சூரியன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sun."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sun"
    ]
  },
  {
    "id": "ta-0298",
    "tamil": "செடி",
    "transliteration": "Cheti",
    "english": "plant",
    "meanings": [
      "plant"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் செடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about plant.",
    "examples": [
      {
        "tamil": "நாம் செடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about plant."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "plant"
    ]
  },
  {
    "id": "ta-0299",
    "tamil": "செப்டம்பர்",
    "transliteration": "Cheptampar",
    "english": "September",
    "meanings": [
      "September"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் செப்டம்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about September.",
    "examples": [
      {
        "tamil": "நாம் செப்டம்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about September."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "September",
      "september"
    ]
  },
  {
    "id": "ta-0300",
    "tamil": "செம்மறியாடு",
    "transliteration": "Chemmariyaatu",
    "english": "sheep",
    "meanings": [
      "sheep"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் செம்மறியாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sheep.",
    "examples": [
      {
        "tamil": "நாம் செம்மறியாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sheep."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sheep"
    ]
  },
  {
    "id": "ta-0301",
    "tamil": "செய்",
    "transliteration": "Chey",
    "english": "do/make",
    "meanings": [
      "do/make",
      "do",
      "make"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் செய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to do/make every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் செய் முயற்சி செய்கிறேன்.",
        "english": "I try to do/make every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "do/make"
    ]
  },
  {
    "id": "ta-0302",
    "tamil": "செய்தி",
    "transliteration": "Cheythi",
    "english": "news/message",
    "meanings": [
      "news/message",
      "news",
      "message"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் செய்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about news/message.",
    "examples": [
      {
        "tamil": "நாம் செய்தி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about news/message."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "news/message"
    ]
  },
  {
    "id": "ta-0303",
    "tamil": "செய்தித்தாள்",
    "transliteration": "Cheythiththaal",
    "english": "newspaper",
    "meanings": [
      "newspaper"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் செய்தித்தாள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about newspaper.",
    "examples": [
      {
        "tamil": "நாம் செய்தித்தாள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about newspaper."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "newspaper"
    ]
  },
  {
    "id": "ta-0304",
    "tamil": "செவிலியர்",
    "transliteration": "Cheviliyar",
    "english": "nurse",
    "meanings": [
      "nurse"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் செவிலியர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about nurse.",
    "examples": [
      {
        "tamil": "நாம் செவிலியர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about nurse."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "nurse"
    ]
  },
  {
    "id": "ta-0305",
    "tamil": "செவ்வாய்",
    "transliteration": "Chevvaay",
    "english": "Tuesday",
    "meanings": [
      "Tuesday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் செவ்வாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Tuesday.",
    "examples": [
      {
        "tamil": "நாம் செவ்வாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Tuesday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Tuesday",
      "tuesday"
    ]
  },
  {
    "id": "ta-0306",
    "tamil": "சேலை",
    "transliteration": "Chaelai",
    "english": "saree",
    "meanings": [
      "saree"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் சேலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about saree.",
    "examples": [
      {
        "tamil": "நாம் சேலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about saree."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "saree"
    ]
  },
  {
    "id": "ta-0307",
    "tamil": "சேவல்",
    "transliteration": "Chaeval",
    "english": "rooster",
    "meanings": [
      "rooster"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் சேவல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rooster.",
    "examples": [
      {
        "tamil": "நாம் சேவல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rooster."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rooster"
    ]
  },
  {
    "id": "ta-0308",
    "tamil": "சேவை",
    "transliteration": "Chaevai",
    "english": "service",
    "meanings": [
      "service"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் சேவை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about service.",
    "examples": [
      {
        "tamil": "நாம் சேவை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about service."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "service"
    ]
  },
  {
    "id": "ta-0309",
    "tamil": "சைக்கிள்",
    "transliteration": "Chaikkil",
    "english": "bicycle",
    "meanings": [
      "bicycle"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் சைக்கிள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bicycle.",
    "examples": [
      {
        "tamil": "நாம் சைக்கிள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bicycle."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bicycle"
    ]
  },
  {
    "id": "ta-0310",
    "tamil": "சொல்",
    "transliteration": "Chol",
    "english": "word; say/tell",
    "meanings": [
      "word; say/tell",
      "word",
      "say",
      "tell"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Verbs"
    ],
    "example": "நாம் சொல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about word.",
    "examples": [
      {
        "tamil": "நாம் சொல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about word."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "word; say/tell",
      "word"
    ]
  },
  {
    "id": "ta-0311",
    "tamil": "சோகமான",
    "transliteration": "Choakamaana",
    "english": "sad",
    "meanings": [
      "sad"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சோகமான.",
    "exampleTranslation": "This is very sad.",
    "examples": [
      {
        "tamil": "இது மிகவும் சோகமான.",
        "english": "This is very sad."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "sad"
    ]
  },
  {
    "id": "ta-0312",
    "tamil": "சோகம்",
    "transliteration": "Choakam",
    "english": "sadness",
    "meanings": [
      "sadness"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் சோகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sadness.",
    "examples": [
      {
        "tamil": "நாம் சோகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sadness."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sadness"
    ]
  },
  {
    "id": "ta-0313",
    "tamil": "சோதனை செய்",
    "transliteration": "Choathanai chey",
    "english": "test",
    "meanings": [
      "test"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் சோதனை செய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to test every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் சோதனை செய் முயற்சி செய்கிறேன்.",
        "english": "I try to test every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "test"
    ]
  },
  {
    "id": "ta-0314",
    "tamil": "சோம்பேறியான",
    "transliteration": "Choampaeriyaana",
    "english": "lazy",
    "meanings": [
      "lazy"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் சோம்பேறியான.",
    "exampleTranslation": "This is very lazy.",
    "examples": [
      {
        "tamil": "இது மிகவும் சோம்பேறியான.",
        "english": "This is very lazy."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "lazy"
    ]
  },
  {
    "id": "ta-0315",
    "tamil": "சோறு",
    "transliteration": "Choaru",
    "english": "cooked rice",
    "meanings": [
      "cooked rice"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் சோறு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cooked rice.",
    "examples": [
      {
        "tamil": "நாம் சோறு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cooked rice."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cooked rice"
    ]
  },
  {
    "id": "ta-0316",
    "tamil": "ஜனவரி",
    "transliteration": "Janavari",
    "english": "January",
    "meanings": [
      "January"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஜனவரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about January.",
    "examples": [
      {
        "tamil": "நாம் ஜனவரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about January."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "January",
      "january"
    ]
  },
  {
    "id": "ta-0317",
    "tamil": "ஜன்னல்",
    "transliteration": "Jannal",
    "english": "window",
    "meanings": [
      "window"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் ஜன்னல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about window.",
    "examples": [
      {
        "tamil": "நாம் ஜன்னல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about window."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "window"
    ]
  },
  {
    "id": "ta-0318",
    "tamil": "ஜூன்",
    "transliteration": "Joon",
    "english": "June",
    "meanings": [
      "June"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஜூன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about June.",
    "examples": [
      {
        "tamil": "நாம் ஜூன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about June."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "June",
      "june"
    ]
  },
  {
    "id": "ta-0319",
    "tamil": "ஜூலை",
    "transliteration": "Joolai",
    "english": "July",
    "meanings": [
      "July"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஜூலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about July.",
    "examples": [
      {
        "tamil": "நாம் ஜூலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about July."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "July",
      "july"
    ]
  },
  {
    "id": "ta-0320",
    "tamil": "ஞாயிறு",
    "transliteration": "Njaayiru",
    "english": "Sunday",
    "meanings": [
      "Sunday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் ஞாயிறு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Sunday.",
    "examples": [
      {
        "tamil": "நாம் ஞாயிறு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Sunday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Sunday",
      "sunday"
    ]
  },
  {
    "id": "ta-0321",
    "tamil": "டிசம்பர்",
    "transliteration": "Tichampar",
    "english": "December",
    "meanings": [
      "December"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் டிசம்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about December.",
    "examples": [
      {
        "tamil": "நாம் டிசம்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about December."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "December",
      "december"
    ]
  },
  {
    "id": "ta-0322",
    "tamil": "தகவல்",
    "transliteration": "Thakaval",
    "english": "information",
    "meanings": [
      "information"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் தகவல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about information.",
    "examples": [
      {
        "tamil": "நாம் தகவல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about information."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "information"
    ]
  },
  {
    "id": "ta-0323",
    "tamil": "தக்காளி",
    "transliteration": "Thakkaali",
    "english": "tomato",
    "meanings": [
      "tomato"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தக்காளி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tomato.",
    "examples": [
      {
        "tamil": "நாம் தக்காளி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tomato."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tomato"
    ]
  },
  {
    "id": "ta-0324",
    "tamil": "தங்கை",
    "transliteration": "Thangkai",
    "english": "younger sister",
    "meanings": [
      "younger sister"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் தங்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about younger sister.",
    "examples": [
      {
        "tamil": "நாம் தங்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about younger sister."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "younger sister"
    ]
  },
  {
    "id": "ta-0325",
    "tamil": "தட்டு",
    "transliteration": "Thattu",
    "english": "plate",
    "meanings": [
      "plate"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் தட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about plate.",
    "examples": [
      {
        "tamil": "நாம் தட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about plate."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "plate"
    ]
  },
  {
    "id": "ta-0326",
    "tamil": "தண்ணீர்",
    "transliteration": "Thanneer",
    "english": "water",
    "meanings": [
      "water"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தண்ணீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about water.",
    "examples": [
      {
        "tamil": "நாம் தண்ணீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about water."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "water"
    ]
  },
  {
    "id": "ta-0327",
    "tamil": "தனியான",
    "transliteration": "Thaniyaana",
    "english": "separate/alone",
    "meanings": [
      "separate/alone",
      "separate",
      "alone"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் தனியான.",
    "exampleTranslation": "This is very separate/alone.",
    "examples": [
      {
        "tamil": "இது மிகவும் தனியான.",
        "english": "This is very separate/alone."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "separate/alone"
    ]
  },
  {
    "id": "ta-0328",
    "tamil": "தமிழகம்",
    "transliteration": "Thamizhakam",
    "english": "Tamil region/Tamil Nadu",
    "meanings": [
      "Tamil region/Tamil Nadu",
      "Tamil region",
      "Tamil Nadu"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் தமிழகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Tamil region/Tamil Nadu.",
    "examples": [
      {
        "tamil": "நாம் தமிழகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Tamil region/Tamil Nadu."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Tamil region/Tamil Nadu",
      "tamil region/tamil nadu"
    ]
  },
  {
    "id": "ta-0329",
    "tamil": "தமிழர்",
    "transliteration": "Thamizhar",
    "english": "Tamil person/Tamils",
    "meanings": [
      "Tamil person/Tamils",
      "Tamil person",
      "Tamils"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் தமிழர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Tamil person/Tamils.",
    "examples": [
      {
        "tamil": "நாம் தமிழர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Tamil person/Tamils."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Tamil person/Tamils",
      "tamil person/tamils"
    ]
  },
  {
    "id": "ta-0330",
    "tamil": "தமிழ்",
    "transliteration": "Thamizh",
    "english": "Tamil",
    "meanings": [
      "Tamil"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் தமிழ் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Tamil.",
    "examples": [
      {
        "tamil": "நாம் தமிழ் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Tamil."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Tamil",
      "tamil"
    ]
  },
  {
    "id": "ta-0331",
    "tamil": "தமிழ்நாடு",
    "transliteration": "Thamizhnaatu",
    "english": "Tamil Nadu",
    "meanings": [
      "Tamil Nadu"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் தமிழ்நாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Tamil Nadu.",
    "examples": [
      {
        "tamil": "நாம் தமிழ்நாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Tamil Nadu."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Tamil Nadu",
      "tamil nadu"
    ]
  },
  {
    "id": "ta-0332",
    "tamil": "தமிழ்ப்புத்தாண்டு",
    "transliteration": "Thamizhppuththaantu",
    "english": "Tamil New Year",
    "meanings": [
      "Tamil New Year"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் தமிழ்ப்புத்தாண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Tamil New Year.",
    "examples": [
      {
        "tamil": "நாம் தமிழ்ப்புத்தாண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Tamil New Year."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Tamil New Year",
      "tamil new year"
    ]
  },
  {
    "id": "ta-0333",
    "tamil": "தம்பி",
    "transliteration": "Thampi",
    "english": "younger brother",
    "meanings": [
      "younger brother"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் தம்பி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about younger brother.",
    "examples": [
      {
        "tamil": "நாம் தம்பி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about younger brother."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "younger brother"
    ]
  },
  {
    "id": "ta-0334",
    "tamil": "தயவுசெய்து",
    "transliteration": "Thayavucheythu",
    "english": "please",
    "meanings": [
      "please"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் தயவுசெய்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about please.",
    "examples": [
      {
        "tamil": "நாம் தயவுசெய்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about please."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "please"
    ]
  },
  {
    "id": "ta-0335",
    "tamil": "தயாரான",
    "transliteration": "Thayaaraana",
    "english": "ready",
    "meanings": [
      "ready"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் தயாரான.",
    "exampleTranslation": "This is very ready.",
    "examples": [
      {
        "tamil": "இது மிகவும் தயாரான.",
        "english": "This is very ready."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "ready"
    ]
  },
  {
    "id": "ta-0336",
    "tamil": "தயிர்",
    "transliteration": "Thayir",
    "english": "curd",
    "meanings": [
      "curd"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தயிர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about curd.",
    "examples": [
      {
        "tamil": "நாம் தயிர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about curd."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "curd"
    ]
  },
  {
    "id": "ta-0337",
    "tamil": "தரை",
    "transliteration": "Tharai",
    "english": "floor",
    "meanings": [
      "floor"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் தரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about floor.",
    "examples": [
      {
        "tamil": "நாம் தரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about floor."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "floor"
    ]
  },
  {
    "id": "ta-0338",
    "tamil": "தலை",
    "transliteration": "Thalai",
    "english": "head",
    "meanings": [
      "head"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் தலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about head.",
    "examples": [
      {
        "tamil": "நாம் தலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about head."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "head"
    ]
  },
  {
    "id": "ta-0339",
    "tamil": "தலையணை",
    "transliteration": "Thalaiyanai",
    "english": "pillow",
    "meanings": [
      "pillow"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் தலையணை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pillow.",
    "examples": [
      {
        "tamil": "நாம் தலையணை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pillow."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pillow"
    ]
  },
  {
    "id": "ta-0340",
    "tamil": "தலைவர்",
    "transliteration": "Thalaivar",
    "english": "leader",
    "meanings": [
      "leader"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் தலைவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about leader.",
    "examples": [
      {
        "tamil": "நாம் தலைவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about leader."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "leader"
    ]
  },
  {
    "id": "ta-0341",
    "tamil": "தவறான",
    "transliteration": "Thavaraana",
    "english": "wrong",
    "meanings": [
      "wrong"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் தவறான.",
    "exampleTranslation": "This is very wrong.",
    "examples": [
      {
        "tamil": "இது மிகவும் தவறான.",
        "english": "This is very wrong."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "wrong"
    ]
  },
  {
    "id": "ta-0342",
    "tamil": "தவளை",
    "transliteration": "Thavalai",
    "english": "frog",
    "meanings": [
      "frog"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் தவளை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about frog.",
    "examples": [
      {
        "tamil": "நாம் தவளை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about frog."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "frog"
    ]
  },
  {
    "id": "ta-0343",
    "tamil": "தாகம்",
    "transliteration": "Thaakam",
    "english": "thirst",
    "meanings": [
      "thirst"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தாகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about thirst.",
    "examples": [
      {
        "tamil": "நாம் தாகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about thirst."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thirst"
    ]
  },
  {
    "id": "ta-0344",
    "tamil": "தாத்தா",
    "transliteration": "Thaaththaa",
    "english": "grandfather",
    "meanings": [
      "grandfather"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் தாத்தா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about grandfather.",
    "examples": [
      {
        "tamil": "நாம் தாத்தா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about grandfather."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "grandfather"
    ]
  },
  {
    "id": "ta-0345",
    "tamil": "தாமதம்",
    "transliteration": "Thaamatham",
    "english": "delay/late",
    "meanings": [
      "delay/late",
      "delay",
      "late"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் தாமதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about delay/late.",
    "examples": [
      {
        "tamil": "நாம் தாமதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about delay/late."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "delay/late"
    ]
  },
  {
    "id": "ta-0346",
    "tamil": "தாழ்ந்த",
    "transliteration": "Thaazhntha",
    "english": "low",
    "meanings": [
      "low"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் தாழ்ந்த.",
    "exampleTranslation": "This is very low.",
    "examples": [
      {
        "tamil": "இது மிகவும் தாழ்ந்த.",
        "english": "This is very low."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "low"
    ]
  },
  {
    "id": "ta-0347",
    "tamil": "திங்கள்",
    "transliteration": "Thingkal",
    "english": "Monday",
    "meanings": [
      "Monday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் திங்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Monday.",
    "examples": [
      {
        "tamil": "நாம் திங்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Monday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Monday",
      "monday"
    ]
  },
  {
    "id": "ta-0348",
    "tamil": "திசை",
    "transliteration": "Thichai",
    "english": "direction",
    "meanings": [
      "direction"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் திசை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about direction.",
    "examples": [
      {
        "tamil": "நாம் திசை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about direction."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "direction"
    ]
  },
  {
    "id": "ta-0349",
    "tamil": "திட்டமிடு",
    "transliteration": "Thittamitu",
    "english": "plan",
    "meanings": [
      "plan"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் திட்டமிடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to plan every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் திட்டமிடு முயற்சி செய்கிறேன்.",
        "english": "I try to plan every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "plan"
    ]
  },
  {
    "id": "ta-0350",
    "tamil": "திட்டம்",
    "transliteration": "Thittam",
    "english": "plan",
    "meanings": [
      "plan"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் திட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about plan.",
    "examples": [
      {
        "tamil": "நாம் திட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about plan."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "plan"
    ]
  },
  {
    "id": "ta-0351",
    "tamil": "திமிங்கலம்",
    "transliteration": "Thimingkalam",
    "english": "whale",
    "meanings": [
      "whale"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் திமிங்கலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about whale.",
    "examples": [
      {
        "tamil": "நாம் திமிங்கலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about whale."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "whale"
    ]
  },
  {
    "id": "ta-0352",
    "tamil": "திராட்சை",
    "transliteration": "Thiraatchai",
    "english": "grapes",
    "meanings": [
      "grapes"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் திராட்சை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about grapes.",
    "examples": [
      {
        "tamil": "நாம் திராட்சை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about grapes."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "grapes"
    ]
  },
  {
    "id": "ta-0353",
    "tamil": "திருவிழா",
    "transliteration": "Thiruvizhaa",
    "english": "festival",
    "meanings": [
      "festival"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் திருவிழா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about festival.",
    "examples": [
      {
        "tamil": "நாம் திருவிழா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about festival."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "festival"
    ]
  },
  {
    "id": "ta-0354",
    "tamil": "திரை",
    "transliteration": "Thirai",
    "english": "screen",
    "meanings": [
      "screen"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் திரை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about screen.",
    "examples": [
      {
        "tamil": "நாம் திரை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about screen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "screen"
    ]
  },
  {
    "id": "ta-0355",
    "tamil": "திற",
    "transliteration": "Thira",
    "english": "open",
    "meanings": [
      "open"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் திற முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to open every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் திற முயற்சி செய்கிறேன்.",
        "english": "I try to open every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "open"
    ]
  },
  {
    "id": "ta-0356",
    "tamil": "திறமை",
    "transliteration": "Thiramai",
    "english": "skill",
    "meanings": [
      "skill"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் திறமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about skill.",
    "examples": [
      {
        "tamil": "நாம் திறமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about skill."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "skill"
    ]
  },
  {
    "id": "ta-0357",
    "tamil": "தீர்மானி",
    "transliteration": "Theermaani",
    "english": "decide",
    "meanings": [
      "decide"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs",
      "Verbs"
    ],
    "example": "நான் தினமும் தீர்மானி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to decide every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் தீர்மானி முயற்சி செய்கிறேன்.",
        "english": "I try to decide every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "decide"
    ]
  },
  {
    "id": "ta-0358",
    "tamil": "தீர்வு",
    "transliteration": "Theervu",
    "english": "solution",
    "meanings": [
      "solution"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் தீர்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about solution.",
    "examples": [
      {
        "tamil": "நாம் தீர்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about solution."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "solution"
    ]
  },
  {
    "id": "ta-0359",
    "tamil": "தீவு",
    "transliteration": "Theevu",
    "english": "island",
    "meanings": [
      "island"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் தீவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about island.",
    "examples": [
      {
        "tamil": "நாம் தீவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about island."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "island"
    ]
  },
  {
    "id": "ta-0360",
    "tamil": "துக்கம்",
    "transliteration": "Thukkam",
    "english": "grief",
    "meanings": [
      "grief"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் துக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about grief.",
    "examples": [
      {
        "tamil": "நாம் துக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about grief."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "grief"
    ]
  },
  {
    "id": "ta-0361",
    "tamil": "துணிச்சலான",
    "transliteration": "Thunichchalaana",
    "english": "brave",
    "meanings": [
      "brave"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் துணிச்சலான.",
    "exampleTranslation": "This is very brave.",
    "examples": [
      {
        "tamil": "இது மிகவும் துணிச்சலான.",
        "english": "This is very brave."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "brave"
    ]
  },
  {
    "id": "ta-0362",
    "tamil": "துண்டு",
    "transliteration": "Thuntu",
    "english": "towel",
    "meanings": [
      "towel"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் துண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about towel.",
    "examples": [
      {
        "tamil": "நாம் துண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about towel."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "towel"
    ]
  },
  {
    "id": "ta-0363",
    "tamil": "துறைமுகம்",
    "transliteration": "Thuraimukam",
    "english": "port",
    "meanings": [
      "port"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் துறைமுகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about port.",
    "examples": [
      {
        "tamil": "நாம் துறைமுகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about port."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "port"
    ]
  },
  {
    "id": "ta-0364",
    "tamil": "தூங்கு",
    "transliteration": "Thoongku",
    "english": "sleep",
    "meanings": [
      "sleep"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் தூங்கு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to sleep every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் தூங்கு முயற்சி செய்கிறேன்.",
        "english": "I try to sleep every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "sleep"
    ]
  },
  {
    "id": "ta-0365",
    "tamil": "தெரு",
    "transliteration": "Theru",
    "english": "street",
    "meanings": [
      "street"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் தெரு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about street.",
    "examples": [
      {
        "tamil": "நாம் தெரு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about street."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "street"
    ]
  },
  {
    "id": "ta-0366",
    "tamil": "தெளிவான",
    "transliteration": "Thelivaana",
    "english": "clear",
    "meanings": [
      "clear"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் தெளிவான.",
    "exampleTranslation": "This is very clear.",
    "examples": [
      {
        "tamil": "இது மிகவும் தெளிவான.",
        "english": "This is very clear."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "clear"
    ]
  },
  {
    "id": "ta-0367",
    "tamil": "தேங்காய்",
    "transliteration": "Thaengkaay",
    "english": "coconut",
    "meanings": [
      "coconut"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தேங்காய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about coconut.",
    "examples": [
      {
        "tamil": "நாம் தேங்காய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about coconut."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "coconut"
    ]
  },
  {
    "id": "ta-0368",
    "tamil": "தேடு",
    "transliteration": "Thaetu",
    "english": "search/look for",
    "meanings": [
      "search/look for",
      "search",
      "look for"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் தேடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to search/look for every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் தேடு முயற்சி செய்கிறேன்.",
        "english": "I try to search/look for every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "search/look for"
    ]
  },
  {
    "id": "ta-0369",
    "tamil": "தேநீர்",
    "transliteration": "Thaeneer",
    "english": "tea",
    "meanings": [
      "tea"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தேநீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tea.",
    "examples": [
      {
        "tamil": "நாம் தேநீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tea."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tea"
    ]
  },
  {
    "id": "ta-0370",
    "tamil": "தேனீ",
    "transliteration": "Thaenee",
    "english": "bee",
    "meanings": [
      "bee"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் தேனீ பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bee.",
    "examples": [
      {
        "tamil": "நாம் தேனீ பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bee."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bee"
    ]
  },
  {
    "id": "ta-0371",
    "tamil": "தேர்வு",
    "transliteration": "Thaervu",
    "english": "exam",
    "meanings": [
      "exam"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் தேர்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about exam.",
    "examples": [
      {
        "tamil": "நாம் தேர்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about exam."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "exam"
    ]
  },
  {
    "id": "ta-0372",
    "tamil": "தேர்வு செய்",
    "transliteration": "Thaervu chey",
    "english": "choose; select",
    "meanings": [
      "choose; select",
      "choose",
      "select"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs",
      "Verbs"
    ],
    "example": "நான் தினமும் தேர்வு செய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to choose every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் தேர்வு செய் முயற்சி செய்கிறேன்.",
        "english": "I try to choose every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "choose; select",
      "choose"
    ]
  },
  {
    "id": "ta-0373",
    "tamil": "தேவாலயம்",
    "transliteration": "Thaevaalayam",
    "english": "church",
    "meanings": [
      "church"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் தேவாலயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about church.",
    "examples": [
      {
        "tamil": "நாம் தேவாலயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about church."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "church"
    ]
  },
  {
    "id": "ta-0374",
    "tamil": "தேவை",
    "transliteration": "Thaevai",
    "english": "need",
    "meanings": [
      "need"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் தேவை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about need.",
    "examples": [
      {
        "tamil": "நாம் தேவை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about need."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "need"
    ]
  },
  {
    "id": "ta-0375",
    "tamil": "தைரியம்",
    "transliteration": "Thairiyam",
    "english": "courage",
    "meanings": [
      "courage"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் தைரியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about courage.",
    "examples": [
      {
        "tamil": "நாம் தைரியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about courage."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "courage"
    ]
  },
  {
    "id": "ta-0376",
    "tamil": "தொடக்கம்",
    "transliteration": "Thotakkam",
    "english": "beginning",
    "meanings": [
      "beginning"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் தொடக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about beginning.",
    "examples": [
      {
        "tamil": "நாம் தொடக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about beginning."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "beginning"
    ]
  },
  {
    "id": "ta-0377",
    "tamil": "தொடங்கு",
    "transliteration": "Thotangku",
    "english": "start",
    "meanings": [
      "start"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் தொடங்கு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to start every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் தொடங்கு முயற்சி செய்கிறேன்.",
        "english": "I try to start every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "start"
    ]
  },
  {
    "id": "ta-0378",
    "tamil": "தொப்பி",
    "transliteration": "Thoppi",
    "english": "hat",
    "meanings": [
      "hat"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் தொப்பி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hat.",
    "examples": [
      {
        "tamil": "நாம் தொப்பி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hat."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hat"
    ]
  },
  {
    "id": "ta-0379",
    "tamil": "தொலைக்காட்சி",
    "transliteration": "Tholaikkaatchi",
    "english": "television",
    "meanings": [
      "television"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் தொலைக்காட்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about television.",
    "examples": [
      {
        "tamil": "நாம் தொலைக்காட்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about television."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "television"
    ]
  },
  {
    "id": "ta-0380",
    "tamil": "தொலைபேசி",
    "transliteration": "Tholaipaechi",
    "english": "telephone/phone",
    "meanings": [
      "telephone/phone",
      "telephone",
      "phone"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் தொலைபேசி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about telephone/phone.",
    "examples": [
      {
        "tamil": "நாம் தொலைபேசி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about telephone/phone."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "telephone/phone"
    ]
  },
  {
    "id": "ta-0381",
    "tamil": "தொலைவில்",
    "transliteration": "Tholaivil",
    "english": "far",
    "meanings": [
      "far"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: தொலைவில்.",
    "exampleTranslation": "We can use this word in a sentence: far.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: தொலைவில்.",
        "english": "We can use this word in a sentence: far."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "far"
    ]
  },
  {
    "id": "ta-0382",
    "tamil": "தொழிலாளர்",
    "transliteration": "Thozhilaalar",
    "english": "worker",
    "meanings": [
      "worker"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் தொழிலாளர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about worker.",
    "examples": [
      {
        "tamil": "நாம் தொழிலாளர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about worker."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "worker"
    ]
  },
  {
    "id": "ta-0383",
    "tamil": "தோசை",
    "transliteration": "Thoachai",
    "english": "dosa",
    "meanings": [
      "dosa"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் தோசை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about dosa.",
    "examples": [
      {
        "tamil": "நாம் தோசை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about dosa."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "dosa"
    ]
  },
  {
    "id": "ta-0384",
    "tamil": "தோட்டம்",
    "transliteration": "Thoattam",
    "english": "garden",
    "meanings": [
      "garden"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் தோட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about garden.",
    "examples": [
      {
        "tamil": "நாம் தோட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about garden."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "garden"
    ]
  },
  {
    "id": "ta-0385",
    "tamil": "தோல்",
    "transliteration": "Thoal",
    "english": "skin",
    "meanings": [
      "skin"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் தோல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about skin.",
    "examples": [
      {
        "tamil": "நாம் தோல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about skin."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "skin"
    ]
  },
  {
    "id": "ta-0386",
    "tamil": "தோல்வி",
    "transliteration": "Thoalvi",
    "english": "failure",
    "meanings": [
      "failure"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions",
      "Abstract"
    ],
    "example": "நாம் தோல்வி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about failure.",
    "examples": [
      {
        "tamil": "நாம் தோல்வி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about failure."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "failure"
    ]
  },
  {
    "id": "ta-0387",
    "tamil": "தோல்வியடை",
    "transliteration": "Thoalviyatai",
    "english": "fail",
    "meanings": [
      "fail"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் தோல்வியடை முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to fail every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் தோல்வியடை முயற்சி செய்கிறேன்.",
        "english": "I try to fail every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "fail"
    ]
  },
  {
    "id": "ta-0388",
    "tamil": "தோள்",
    "transliteration": "Thoal",
    "english": "shoulder",
    "meanings": [
      "shoulder"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் தோள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about shoulder.",
    "examples": [
      {
        "tamil": "நாம் தோள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about shoulder."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "shoulder"
    ]
  },
  {
    "id": "ta-0389",
    "tamil": "நகரம்",
    "transliteration": "Nakaram",
    "english": "city",
    "meanings": [
      "city"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் நகரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about city.",
    "examples": [
      {
        "tamil": "நாம் நகரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about city."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "city"
    ]
  },
  {
    "id": "ta-0390",
    "tamil": "நட",
    "transliteration": "Nata",
    "english": "walk",
    "meanings": [
      "walk"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் நட முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to walk every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நட முயற்சி செய்கிறேன்.",
        "english": "I try to walk every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "walk"
    ]
  },
  {
    "id": "ta-0391",
    "tamil": "நடத்து",
    "transliteration": "Nataththu",
    "english": "conduct/drive",
    "meanings": [
      "conduct/drive",
      "conduct",
      "drive"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் நடத்து முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to conduct/drive every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நடத்து முயற்சி செய்கிறேன்.",
        "english": "I try to conduct/drive every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "conduct/drive"
    ]
  },
  {
    "id": "ta-0392",
    "tamil": "நடனம்",
    "transliteration": "Natanam",
    "english": "dance",
    "meanings": [
      "dance"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் நடனம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about dance.",
    "examples": [
      {
        "tamil": "நாம் நடனம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about dance."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "dance"
    ]
  },
  {
    "id": "ta-0393",
    "tamil": "நட்சத்திரம்",
    "transliteration": "Natchaththiram",
    "english": "star",
    "meanings": [
      "star"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நட்சத்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about star.",
    "examples": [
      {
        "tamil": "நாம் நட்சத்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about star."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "star"
    ]
  },
  {
    "id": "ta-0394",
    "tamil": "நட்பு",
    "transliteration": "Natpu",
    "english": "friendship",
    "meanings": [
      "friendship"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் நட்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about friendship.",
    "examples": [
      {
        "tamil": "நாம் நட்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about friendship."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "friendship"
    ]
  },
  {
    "id": "ta-0395",
    "tamil": "நண்பர்",
    "transliteration": "Nanpar",
    "english": "friend",
    "meanings": [
      "friend"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் நண்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about friend.",
    "examples": [
      {
        "tamil": "நாம் நண்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about friend."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "friend"
    ]
  },
  {
    "id": "ta-0396",
    "tamil": "நண்பி",
    "transliteration": "Nanpi",
    "english": "female friend",
    "meanings": [
      "female friend"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் நண்பி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about female friend.",
    "examples": [
      {
        "tamil": "நாம் நண்பி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about female friend."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "female friend"
    ]
  },
  {
    "id": "ta-0397",
    "tamil": "நதி",
    "transliteration": "Nathi",
    "english": "river",
    "meanings": [
      "river"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நதி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about river.",
    "examples": [
      {
        "tamil": "நாம் நதி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about river."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "river"
    ]
  },
  {
    "id": "ta-0398",
    "tamil": "நன்றி",
    "transliteration": "Nanri",
    "english": "thanks/gratitude; thank you/thanks",
    "meanings": [
      "thanks/gratitude; thank you/thanks",
      "thanks",
      "gratitude",
      "thank you",
      "thanks"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் நன்றி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about thanks/gratitude.",
    "examples": [
      {
        "tamil": "நாம் நன்றி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about thanks/gratitude."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thanks/gratitude; thank you/thanks",
      "thanks/gratitude"
    ]
  },
  {
    "id": "ta-0399",
    "tamil": "நபர்",
    "transliteration": "Napar",
    "english": "person",
    "meanings": [
      "person"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் நபர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about person.",
    "examples": [
      {
        "tamil": "நாம் நபர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about person."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "person"
    ]
  },
  {
    "id": "ta-0400",
    "tamil": "நம்பிக்கை",
    "transliteration": "Nampikkai",
    "english": "hope/trust; confidence/trust",
    "meanings": [
      "hope/trust; confidence/trust",
      "hope",
      "trust",
      "confidence",
      "trust"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் நம்பிக்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hope/trust.",
    "examples": [
      {
        "tamil": "நாம் நம்பிக்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hope/trust."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hope/trust; confidence/trust",
      "hope/trust"
    ]
  },
  {
    "id": "ta-0401",
    "tamil": "நம்பு",
    "transliteration": "Nampu",
    "english": "believe",
    "meanings": [
      "believe"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் நம்பு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to believe every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நம்பு முயற்சி செய்கிறேன்.",
        "english": "I try to believe every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "believe"
    ]
  },
  {
    "id": "ta-0402",
    "tamil": "நம்புதல்",
    "transliteration": "Namputhal",
    "english": "to trust",
    "meanings": [
      "to trust"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் நம்புதல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about to trust.",
    "examples": [
      {
        "tamil": "நாம் நம்புதல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about to trust."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "to trust"
    ]
  },
  {
    "id": "ta-0403",
    "tamil": "நரி",
    "transliteration": "Nari",
    "english": "fox",
    "meanings": [
      "fox"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் நரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about fox.",
    "examples": [
      {
        "tamil": "நாம் நரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about fox."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fox"
    ]
  },
  {
    "id": "ta-0404",
    "tamil": "நல்ல",
    "transliteration": "Nalla",
    "english": "good",
    "meanings": [
      "good"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் நல்ல.",
    "exampleTranslation": "This is very good.",
    "examples": [
      {
        "tamil": "இது மிகவும் நல்ல.",
        "english": "This is very good."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "good"
    ]
  },
  {
    "id": "ta-0405",
    "tamil": "நள்ளிரவு",
    "transliteration": "Nalliravu",
    "english": "midnight",
    "meanings": [
      "midnight"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் நள்ளிரவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about midnight.",
    "examples": [
      {
        "tamil": "நாம் நள்ளிரவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about midnight."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "midnight"
    ]
  },
  {
    "id": "ta-0406",
    "tamil": "நவம்பர்",
    "transliteration": "Navampar",
    "english": "November",
    "meanings": [
      "November"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் நவம்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about November.",
    "examples": [
      {
        "tamil": "நாம் நவம்பர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about November."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "November",
      "november"
    ]
  },
  {
    "id": "ta-0407",
    "tamil": "நாக்கு",
    "transliteration": "Naakku",
    "english": "tongue",
    "meanings": [
      "tongue"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் நாக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tongue.",
    "examples": [
      {
        "tamil": "நாம் நாக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tongue."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tongue"
    ]
  },
  {
    "id": "ta-0408",
    "tamil": "நாங்கள்",
    "transliteration": "Naangkal",
    "english": "we",
    "meanings": [
      "we"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நாங்கள்.",
    "exampleTranslation": "We can use this word in a sentence: we.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நாங்கள்.",
        "english": "We can use this word in a sentence: we."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "we"
    ]
  },
  {
    "id": "ta-0409",
    "tamil": "நாடு",
    "transliteration": "Naatu",
    "english": "country; land/country",
    "meanings": [
      "country; land/country",
      "country",
      "land",
      "country"
    ],
    "category": "Places",
    "categories": [
      "Places",
      "Culture"
    ],
    "example": "நாம் நாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about country.",
    "examples": [
      {
        "tamil": "நாம் நாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about country."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "country; land/country",
      "country"
    ]
  },
  {
    "id": "ta-0410",
    "tamil": "நான்",
    "transliteration": "Naan",
    "english": "I",
    "meanings": [
      "I"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நான்.",
    "exampleTranslation": "We can use this word in a sentence: I.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நான்.",
        "english": "We can use this word in a sentence: I."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "I",
      "i"
    ]
  },
  {
    "id": "ta-0411",
    "tamil": "நான்கு",
    "transliteration": "Naanku",
    "english": "four",
    "meanings": [
      "four"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நான்கு.",
    "exampleTranslation": "We can use this word in a sentence: four.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நான்கு.",
        "english": "We can use this word in a sentence: four."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "four"
    ]
  },
  {
    "id": "ta-0412",
    "tamil": "நாம்",
    "transliteration": "Naam",
    "english": "we",
    "meanings": [
      "we"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நாம்.",
    "exampleTranslation": "We can use this word in a sentence: we.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நாம்.",
        "english": "We can use this word in a sentence: we."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "we"
    ]
  },
  {
    "id": "ta-0413",
    "tamil": "நாய்",
    "transliteration": "Naay",
    "english": "dog",
    "meanings": [
      "dog"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் நாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about dog.",
    "examples": [
      {
        "tamil": "நாம் நாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about dog."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "dog"
    ]
  },
  {
    "id": "ta-0414",
    "tamil": "நாய்க்குட்டி",
    "transliteration": "Naaykkutti",
    "english": "puppy",
    "meanings": [
      "puppy"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் நாய்க்குட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about puppy.",
    "examples": [
      {
        "tamil": "நாம் நாய்க்குட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about puppy."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "puppy"
    ]
  },
  {
    "id": "ta-0415",
    "tamil": "நாற்காலி",
    "transliteration": "Naarkaali",
    "english": "chair",
    "meanings": [
      "chair"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் நாற்காலி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chair.",
    "examples": [
      {
        "tamil": "நாம் நாற்காலி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chair."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chair"
    ]
  },
  {
    "id": "ta-0416",
    "tamil": "நாற்பது",
    "transliteration": "Naarpathu",
    "english": "forty",
    "meanings": [
      "forty"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நாற்பது.",
    "exampleTranslation": "We can use this word in a sentence: forty.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நாற்பது.",
        "english": "We can use this word in a sentence: forty."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "forty"
    ]
  },
  {
    "id": "ta-0417",
    "tamil": "நாளை",
    "transliteration": "Naalai",
    "english": "tomorrow",
    "meanings": [
      "tomorrow"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் நாளை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tomorrow.",
    "examples": [
      {
        "tamil": "நாம் நாளை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tomorrow."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tomorrow"
    ]
  },
  {
    "id": "ta-0418",
    "tamil": "நாள்",
    "transliteration": "Naal",
    "english": "day",
    "meanings": [
      "day"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் நாள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about day.",
    "examples": [
      {
        "tamil": "நாம் நாள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about day."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "day"
    ]
  },
  {
    "id": "ta-0419",
    "tamil": "நிகழ்வு",
    "transliteration": "Nikazhvu",
    "english": "event",
    "meanings": [
      "event"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் நிகழ்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about event.",
    "examples": [
      {
        "tamil": "நாம் நிகழ்வு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about event."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "event"
    ]
  },
  {
    "id": "ta-0420",
    "tamil": "நிச்சயம்",
    "transliteration": "Nichchayam",
    "english": "certainly/surely",
    "meanings": [
      "certainly/surely",
      "certainly",
      "surely"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் நிச்சயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about certainly/surely.",
    "examples": [
      {
        "tamil": "நாம் நிச்சயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about certainly/surely."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "certainly/surely"
    ]
  },
  {
    "id": "ta-0421",
    "tamil": "நினை",
    "transliteration": "Ninai",
    "english": "think/remember; think",
    "meanings": [
      "think/remember; think",
      "think",
      "remember",
      "think"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs",
      "Verbs"
    ],
    "example": "நான் தினமும் நினை முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to think/remember every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நினை முயற்சி செய்கிறேன்.",
        "english": "I try to think/remember every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "think/remember; think",
      "think/remember"
    ]
  },
  {
    "id": "ta-0422",
    "tamil": "நினைவில் கொள்",
    "transliteration": "Ninaivil kol",
    "english": "remember",
    "meanings": [
      "remember"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் நினைவில் கொள் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to remember every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நினைவில் கொள் முயற்சி செய்கிறேன்.",
        "english": "I try to remember every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "remember"
    ]
  },
  {
    "id": "ta-0423",
    "tamil": "நினைவு",
    "transliteration": "Ninaivu",
    "english": "memory",
    "meanings": [
      "memory"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் நினைவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about memory.",
    "examples": [
      {
        "tamil": "நாம் நினைவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about memory."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "memory"
    ]
  },
  {
    "id": "ta-0424",
    "tamil": "நினைவுகொள்",
    "transliteration": "Ninaivukol",
    "english": "remember",
    "meanings": [
      "remember"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் நினைவுகொள் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to remember every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நினைவுகொள் முயற்சி செய்கிறேன்.",
        "english": "I try to remember every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "remember"
    ]
  },
  {
    "id": "ta-0425",
    "tamil": "நிமிடம்",
    "transliteration": "Nimitam",
    "english": "minute",
    "meanings": [
      "minute"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் நிமிடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about minute.",
    "examples": [
      {
        "tamil": "நாம் நிமிடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about minute."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "minute"
    ]
  },
  {
    "id": "ta-0426",
    "tamil": "நிலம்",
    "transliteration": "Nilam",
    "english": "land",
    "meanings": [
      "land"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நிலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about land.",
    "examples": [
      {
        "tamil": "நாம் நிலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about land."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "land"
    ]
  },
  {
    "id": "ta-0427",
    "tamil": "நிலா",
    "transliteration": "Nilaa",
    "english": "moonlight/moon",
    "meanings": [
      "moonlight/moon",
      "moonlight",
      "moon"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நிலா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about moonlight/moon.",
    "examples": [
      {
        "tamil": "நாம் நிலா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about moonlight/moon."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "moonlight/moon"
    ]
  },
  {
    "id": "ta-0428",
    "tamil": "நிலையம்",
    "transliteration": "Nilaiyam",
    "english": "station",
    "meanings": [
      "station"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் நிலையம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about station.",
    "examples": [
      {
        "tamil": "நாம் நிலையம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about station."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "station"
    ]
  },
  {
    "id": "ta-0429",
    "tamil": "நில்",
    "transliteration": "Nil",
    "english": "stand",
    "meanings": [
      "stand"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் நில் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to stand every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் நில் முயற்சி செய்கிறேன்.",
        "english": "I try to stand every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "stand"
    ]
  },
  {
    "id": "ta-0430",
    "tamil": "நிழல்",
    "transliteration": "Nizhal",
    "english": "shade/shadow",
    "meanings": [
      "shade/shadow",
      "shade",
      "shadow"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நிழல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about shade/shadow.",
    "examples": [
      {
        "tamil": "நாம் நிழல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about shade/shadow."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "shade/shadow"
    ]
  },
  {
    "id": "ta-0431",
    "tamil": "நீ",
    "transliteration": "Nee",
    "english": "you",
    "meanings": [
      "you"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நீ.",
    "exampleTranslation": "We can use this word in a sentence: you.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நீ.",
        "english": "We can use this word in a sentence: you."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "you"
    ]
  },
  {
    "id": "ta-0432",
    "tamil": "நீங்கள்",
    "transliteration": "Neengkal",
    "english": "you",
    "meanings": [
      "you"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நீங்கள்.",
    "exampleTranslation": "We can use this word in a sentence: you.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நீங்கள்.",
        "english": "We can use this word in a sentence: you."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "you"
    ]
  },
  {
    "id": "ta-0433",
    "tamil": "நீதி",
    "transliteration": "Neethi",
    "english": "justice",
    "meanings": [
      "justice"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் நீதி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about justice.",
    "examples": [
      {
        "tamil": "நாம் நீதி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about justice."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "justice"
    ]
  },
  {
    "id": "ta-0434",
    "tamil": "நீர்",
    "transliteration": "Neer",
    "english": "water",
    "meanings": [
      "water"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about water.",
    "examples": [
      {
        "tamil": "நாம் நீர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about water."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "water"
    ]
  },
  {
    "id": "ta-0435",
    "tamil": "நீளமான",
    "transliteration": "Neelamaana",
    "english": "long",
    "meanings": [
      "long"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் நீளமான.",
    "exampleTranslation": "This is very long.",
    "examples": [
      {
        "tamil": "இது மிகவும் நீளமான.",
        "english": "This is very long."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "long"
    ]
  },
  {
    "id": "ta-0436",
    "tamil": "நூறு",
    "transliteration": "Nooru",
    "english": "hundred",
    "meanings": [
      "hundred"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நூறு.",
    "exampleTranslation": "We can use this word in a sentence: hundred.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: நூறு.",
        "english": "We can use this word in a sentence: hundred."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hundred"
    ]
  },
  {
    "id": "ta-0437",
    "tamil": "நூலகம்",
    "transliteration": "Noolakam",
    "english": "library",
    "meanings": [
      "library"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் நூலகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about library.",
    "examples": [
      {
        "tamil": "நாம் நூலகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about library."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "library"
    ]
  },
  {
    "id": "ta-0438",
    "tamil": "நூல்",
    "transliteration": "Nool",
    "english": "book/text",
    "meanings": [
      "book/text",
      "book",
      "text"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் நூல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about book/text.",
    "examples": [
      {
        "tamil": "நாம் நூல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about book/text."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "book/text"
    ]
  },
  {
    "id": "ta-0439",
    "tamil": "நெய்",
    "transliteration": "Ney",
    "english": "ghee",
    "meanings": [
      "ghee"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் நெய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ghee.",
    "examples": [
      {
        "tamil": "நாம் நெய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ghee."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ghee"
    ]
  },
  {
    "id": "ta-0440",
    "tamil": "நெருப்பு",
    "transliteration": "Neruppu",
    "english": "fire",
    "meanings": [
      "fire"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் நெருப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about fire.",
    "examples": [
      {
        "tamil": "நாம் நெருப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about fire."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fire"
    ]
  },
  {
    "id": "ta-0441",
    "tamil": "நேரம்",
    "transliteration": "Naeram",
    "english": "time; time/hour",
    "meanings": [
      "time; time/hour",
      "time",
      "time",
      "hour"
    ],
    "category": "Objects",
    "categories": [
      "Objects",
      "Time"
    ],
    "example": "நாம் நேரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about time.",
    "examples": [
      {
        "tamil": "நாம் நேரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about time."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "time; time/hour",
      "time"
    ]
  },
  {
    "id": "ta-0442",
    "tamil": "நேற்று",
    "transliteration": "Naerru",
    "english": "yesterday",
    "meanings": [
      "yesterday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் நேற்று பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about yesterday.",
    "examples": [
      {
        "tamil": "நாம் நேற்று பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about yesterday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "yesterday"
    ]
  },
  {
    "id": "ta-0443",
    "tamil": "நோய்",
    "transliteration": "Noay",
    "english": "illness/disease",
    "meanings": [
      "illness/disease",
      "illness",
      "disease"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் நோய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about illness/disease.",
    "examples": [
      {
        "tamil": "நாம் நோய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about illness/disease."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "illness/disease"
    ]
  },
  {
    "id": "ta-0444",
    "tamil": "பகிர்",
    "transliteration": "Pakir",
    "english": "share",
    "meanings": [
      "share"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பகிர் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to share every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பகிர் முயற்சி செய்கிறேன்.",
        "english": "I try to share every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "share"
    ]
  },
  {
    "id": "ta-0445",
    "tamil": "பக்கம்",
    "transliteration": "Pakkam",
    "english": "page; side/page",
    "meanings": [
      "page; side/page",
      "page",
      "side",
      "page"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் பக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about page.",
    "examples": [
      {
        "tamil": "நாம் பக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about page."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "page; side/page",
      "page"
    ]
  },
  {
    "id": "ta-0446",
    "tamil": "பசி",
    "transliteration": "Pachi",
    "english": "hunger",
    "meanings": [
      "hunger"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் பசி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hunger.",
    "examples": [
      {
        "tamil": "நாம் பசி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hunger."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hunger"
    ]
  },
  {
    "id": "ta-0447",
    "tamil": "படகு",
    "transliteration": "Pataku",
    "english": "boat",
    "meanings": [
      "boat"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் படகு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about boat.",
    "examples": [
      {
        "tamil": "நாம் படகு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about boat."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "boat"
    ]
  },
  {
    "id": "ta-0448",
    "tamil": "படம்",
    "transliteration": "Patam",
    "english": "picture",
    "meanings": [
      "picture"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் படம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about picture.",
    "examples": [
      {
        "tamil": "நாம் படம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about picture."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "picture"
    ]
  },
  {
    "id": "ta-0449",
    "tamil": "படி",
    "transliteration": "Pati",
    "english": "read/study",
    "meanings": [
      "read/study",
      "read",
      "study"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் படி முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to read/study every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் படி முயற்சி செய்கிறேன்.",
        "english": "I try to read/study every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "read/study"
    ]
  },
  {
    "id": "ta-0450",
    "tamil": "படிக்கட்டு",
    "transliteration": "Patikkattu",
    "english": "stairs",
    "meanings": [
      "stairs"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் படிக்கட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about stairs.",
    "examples": [
      {
        "tamil": "நாம் படிக்கட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about stairs."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "stairs"
    ]
  },
  {
    "id": "ta-0451",
    "tamil": "படுக்கை",
    "transliteration": "Patukkai",
    "english": "bed",
    "meanings": [
      "bed"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் படுக்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bed.",
    "examples": [
      {
        "tamil": "நாம் படுக்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bed."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bed"
    ]
  },
  {
    "id": "ta-0452",
    "tamil": "பட்டம்",
    "transliteration": "Pattam",
    "english": "kite",
    "meanings": [
      "kite"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் பட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about kite.",
    "examples": [
      {
        "tamil": "நாம் பட்டம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about kite."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "kite"
    ]
  },
  {
    "id": "ta-0453",
    "tamil": "பணம்",
    "transliteration": "Panam",
    "english": "money",
    "meanings": [
      "money"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about money.",
    "examples": [
      {
        "tamil": "நாம் பணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about money."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "money"
    ]
  },
  {
    "id": "ta-0454",
    "tamil": "பண்பாடு",
    "transliteration": "Panpaatu",
    "english": "culture",
    "meanings": [
      "culture"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் பண்பாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about culture.",
    "examples": [
      {
        "tamil": "நாம் பண்பாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about culture."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "culture"
    ]
  },
  {
    "id": "ta-0455",
    "tamil": "பதினான்கு",
    "transliteration": "Pathinaanku",
    "english": "fourteen",
    "meanings": [
      "fourteen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினான்கு.",
    "exampleTranslation": "We can use this word in a sentence: fourteen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினான்கு.",
        "english": "We can use this word in a sentence: fourteen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fourteen"
    ]
  },
  {
    "id": "ta-0456",
    "tamil": "பதினாறு",
    "transliteration": "Pathinaaru",
    "english": "sixteen",
    "meanings": [
      "sixteen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினாறு.",
    "exampleTranslation": "We can use this word in a sentence: sixteen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினாறு.",
        "english": "We can use this word in a sentence: sixteen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sixteen"
    ]
  },
  {
    "id": "ta-0457",
    "tamil": "பதினெட்டு",
    "transliteration": "Pathinettu",
    "english": "eighteen",
    "meanings": [
      "eighteen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினெட்டு.",
    "exampleTranslation": "We can use this word in a sentence: eighteen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினெட்டு.",
        "english": "We can use this word in a sentence: eighteen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eighteen"
    ]
  },
  {
    "id": "ta-0458",
    "tamil": "பதினேழு",
    "transliteration": "Pathinaezhu",
    "english": "seventeen",
    "meanings": [
      "seventeen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினேழு.",
    "exampleTranslation": "We can use this word in a sentence: seventeen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினேழு.",
        "english": "We can use this word in a sentence: seventeen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "seventeen"
    ]
  },
  {
    "id": "ta-0459",
    "tamil": "பதினைந்து",
    "transliteration": "Pathinainthu",
    "english": "fifteen",
    "meanings": [
      "fifteen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினைந்து.",
    "exampleTranslation": "We can use this word in a sentence: fifteen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினைந்து.",
        "english": "We can use this word in a sentence: fifteen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fifteen"
    ]
  },
  {
    "id": "ta-0460",
    "tamil": "பதினொன்று",
    "transliteration": "Pathinonru",
    "english": "eleven",
    "meanings": [
      "eleven"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினொன்று.",
    "exampleTranslation": "We can use this word in a sentence: eleven.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதினொன்று.",
        "english": "We can use this word in a sentence: eleven."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "eleven"
    ]
  },
  {
    "id": "ta-0461",
    "tamil": "பதின்மூன்று",
    "transliteration": "Pathinmoonru",
    "english": "thirteen",
    "meanings": [
      "thirteen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதின்மூன்று.",
    "exampleTranslation": "We can use this word in a sentence: thirteen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பதின்மூன்று.",
        "english": "We can use this word in a sentence: thirteen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thirteen"
    ]
  },
  {
    "id": "ta-0462",
    "tamil": "பதில்",
    "transliteration": "Pathil",
    "english": "answer",
    "meanings": [
      "answer"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Abstract"
    ],
    "example": "நாம் பதில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about answer.",
    "examples": [
      {
        "tamil": "நாம் பதில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about answer."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "answer"
    ]
  },
  {
    "id": "ta-0463",
    "tamil": "பதில் சொல்",
    "transliteration": "Pathil chol",
    "english": "answer",
    "meanings": [
      "answer"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பதில் சொல் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to answer every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பதில் சொல் முயற்சி செய்கிறேன்.",
        "english": "I try to answer every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "answer"
    ]
  },
  {
    "id": "ta-0464",
    "tamil": "பத்து",
    "transliteration": "Paththu",
    "english": "ten",
    "meanings": [
      "ten"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பத்து.",
    "exampleTranslation": "We can use this word in a sentence: ten.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பத்து.",
        "english": "We can use this word in a sentence: ten."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ten"
    ]
  },
  {
    "id": "ta-0465",
    "tamil": "பத்தொன்பது",
    "transliteration": "Paththonpathu",
    "english": "nineteen",
    "meanings": [
      "nineteen"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பத்தொன்பது.",
    "exampleTranslation": "We can use this word in a sentence: nineteen.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பத்தொன்பது.",
        "english": "We can use this word in a sentence: nineteen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "nineteen"
    ]
  },
  {
    "id": "ta-0466",
    "tamil": "பந்து",
    "transliteration": "Panthu",
    "english": "ball",
    "meanings": [
      "ball"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் பந்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ball.",
    "examples": [
      {
        "tamil": "நாம் பந்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ball."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ball"
    ]
  },
  {
    "id": "ta-0467",
    "tamil": "பனி",
    "transliteration": "Pani",
    "english": "dew/frost",
    "meanings": [
      "dew/frost",
      "dew",
      "frost"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் பனி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about dew/frost.",
    "examples": [
      {
        "tamil": "நாம் பனி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about dew/frost."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "dew/frost"
    ]
  },
  {
    "id": "ta-0468",
    "tamil": "பன்னிரண்டு",
    "transliteration": "Pannirantu",
    "english": "twelve",
    "meanings": [
      "twelve"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பன்னிரண்டு.",
    "exampleTranslation": "We can use this word in a sentence: twelve.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பன்னிரண்டு.",
        "english": "We can use this word in a sentence: twelve."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "twelve"
    ]
  },
  {
    "id": "ta-0469",
    "tamil": "பன்றி",
    "transliteration": "Panri",
    "english": "pig",
    "meanings": [
      "pig"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் பன்றி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pig.",
    "examples": [
      {
        "tamil": "நாம் பன்றி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pig."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pig"
    ]
  },
  {
    "id": "ta-0470",
    "tamil": "பயணம்",
    "transliteration": "Payanam",
    "english": "journey/travel",
    "meanings": [
      "journey/travel",
      "journey",
      "travel"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பயணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about journey/travel.",
    "examples": [
      {
        "tamil": "நாம் பயணம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about journey/travel."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "journey/travel"
    ]
  },
  {
    "id": "ta-0471",
    "tamil": "பயன்",
    "transliteration": "Payan",
    "english": "benefit/use",
    "meanings": [
      "benefit/use",
      "benefit",
      "use"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பயன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about benefit/use.",
    "examples": [
      {
        "tamil": "நாம் பயன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about benefit/use."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "benefit/use"
    ]
  },
  {
    "id": "ta-0472",
    "tamil": "பயன்படுத்து",
    "transliteration": "Payanpatuththu",
    "english": "use",
    "meanings": [
      "use"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பயன்படுத்து முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to use every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பயன்படுத்து முயற்சி செய்கிறேன்.",
        "english": "I try to use every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "use"
    ]
  },
  {
    "id": "ta-0473",
    "tamil": "பயன்பாடு",
    "transliteration": "Payanpaatu",
    "english": "usage/use",
    "meanings": [
      "usage/use",
      "usage",
      "use"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பயன்பாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about usage/use.",
    "examples": [
      {
        "tamil": "நாம் பயன்பாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about usage/use."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "usage/use"
    ]
  },
  {
    "id": "ta-0474",
    "tamil": "பயம்",
    "transliteration": "Payam",
    "english": "fear",
    "meanings": [
      "fear"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் பயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about fear.",
    "examples": [
      {
        "tamil": "நாம் பயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about fear."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fear"
    ]
  },
  {
    "id": "ta-0475",
    "tamil": "பயிற்சி",
    "transliteration": "Payirchi",
    "english": "practice",
    "meanings": [
      "practice"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் பயிற்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about practice.",
    "examples": [
      {
        "tamil": "நாம் பயிற்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about practice."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "practice"
    ]
  },
  {
    "id": "ta-0476",
    "tamil": "பரவாயில்லை",
    "transliteration": "Paravaayillai",
    "english": "it is okay/no problem",
    "meanings": [
      "it is okay/no problem",
      "it is okay",
      "no problem"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் பரவாயில்லை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about it is okay/no problem.",
    "examples": [
      {
        "tamil": "நாம் பரவாயில்லை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about it is okay/no problem."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "it is okay/no problem"
    ]
  },
  {
    "id": "ta-0477",
    "tamil": "பரிசு",
    "transliteration": "Parichu",
    "english": "gift",
    "meanings": [
      "gift"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் பரிசு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about gift.",
    "examples": [
      {
        "tamil": "நாம் பரிசு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about gift."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "gift"
    ]
  },
  {
    "id": "ta-0478",
    "tamil": "பருப்பு",
    "transliteration": "Paruppu",
    "english": "lentils",
    "meanings": [
      "lentils"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் பருப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lentils.",
    "examples": [
      {
        "tamil": "நாம் பருப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lentils."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lentils"
    ]
  },
  {
    "id": "ta-0479",
    "tamil": "பறவை",
    "transliteration": "Paravai",
    "english": "bird",
    "meanings": [
      "bird"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் பறவை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bird.",
    "examples": [
      {
        "tamil": "நாம் பறவை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bird."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bird"
    ]
  },
  {
    "id": "ta-0480",
    "tamil": "பற்கள்",
    "transliteration": "Parkal",
    "english": "teeth",
    "meanings": [
      "teeth"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் பற்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about teeth.",
    "examples": [
      {
        "tamil": "நாம் பற்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about teeth."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "teeth"
    ]
  },
  {
    "id": "ta-0481",
    "tamil": "பல",
    "transliteration": "Pala",
    "english": "many",
    "meanings": [
      "many"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பல.",
    "exampleTranslation": "We can use this word in a sentence: many.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பல.",
        "english": "We can use this word in a sentence: many."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "many"
    ]
  },
  {
    "id": "ta-0482",
    "tamil": "பலகை",
    "transliteration": "Palakai",
    "english": "board",
    "meanings": [
      "board"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் பலகை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about board.",
    "examples": [
      {
        "tamil": "நாம் பலகை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about board."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "board"
    ]
  },
  {
    "id": "ta-0483",
    "tamil": "பலவீனமான",
    "transliteration": "Palaveenamaana",
    "english": "weak",
    "meanings": [
      "weak"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் பலவீனமான.",
    "exampleTranslation": "This is very weak.",
    "examples": [
      {
        "tamil": "இது மிகவும் பலவீனமான.",
        "english": "This is very weak."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "weak"
    ]
  },
  {
    "id": "ta-0484",
    "tamil": "பல்",
    "transliteration": "Pal",
    "english": "tooth",
    "meanings": [
      "tooth"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் பல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tooth.",
    "examples": [
      {
        "tamil": "நாம் பல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tooth."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tooth"
    ]
  },
  {
    "id": "ta-0485",
    "tamil": "பல்கலைக்கழகம்",
    "transliteration": "Palkalaikkazhakam",
    "english": "university",
    "meanings": [
      "university"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் பல்கலைக்கழகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about university.",
    "examples": [
      {
        "tamil": "நாம் பல்கலைக்கழகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about university."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "university"
    ]
  },
  {
    "id": "ta-0486",
    "tamil": "பள்ளி",
    "transliteration": "Palli",
    "english": "school",
    "meanings": [
      "school"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் பள்ளி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about school.",
    "examples": [
      {
        "tamil": "நாம் பள்ளி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about school."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "school"
    ]
  },
  {
    "id": "ta-0487",
    "tamil": "பள்ளிவாசல்",
    "transliteration": "Pallivaachal",
    "english": "mosque",
    "meanings": [
      "mosque"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் பள்ளிவாசல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mosque.",
    "examples": [
      {
        "tamil": "நாம் பள்ளிவாசல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mosque."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mosque"
    ]
  },
  {
    "id": "ta-0488",
    "tamil": "பழக்கம்",
    "transliteration": "Pazhakkam",
    "english": "custom/habit",
    "meanings": [
      "custom/habit",
      "custom",
      "habit"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் பழக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about custom/habit.",
    "examples": [
      {
        "tamil": "நாம் பழக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about custom/habit."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "custom/habit"
    ]
  },
  {
    "id": "ta-0489",
    "tamil": "பழம்",
    "transliteration": "Pazham",
    "english": "fruit",
    "meanings": [
      "fruit"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink",
      "Nature"
    ],
    "example": "நாம் பழம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about fruit.",
    "examples": [
      {
        "tamil": "நாம் பழம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about fruit."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fruit"
    ]
  },
  {
    "id": "ta-0490",
    "tamil": "பழைய",
    "transliteration": "Pazhaiya",
    "english": "old",
    "meanings": [
      "old"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் பழைய.",
    "exampleTranslation": "This is very old.",
    "examples": [
      {
        "tamil": "இது மிகவும் பழைய.",
        "english": "This is very old."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "old"
    ]
  },
  {
    "id": "ta-0491",
    "tamil": "பாடம்",
    "transliteration": "Paatam",
    "english": "lesson",
    "meanings": [
      "lesson"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் பாடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lesson.",
    "examples": [
      {
        "tamil": "நாம் பாடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lesson."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lesson"
    ]
  },
  {
    "id": "ta-0492",
    "tamil": "பாடல்",
    "transliteration": "Paatal",
    "english": "song",
    "meanings": [
      "song"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் பாடல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about song.",
    "examples": [
      {
        "tamil": "நாம் பாடல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about song."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "song"
    ]
  },
  {
    "id": "ta-0493",
    "tamil": "பாடு",
    "transliteration": "Paatu",
    "english": "sing",
    "meanings": [
      "sing"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பாடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to sing every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பாடு முயற்சி செய்கிறேன்.",
        "english": "I try to sing every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "sing"
    ]
  },
  {
    "id": "ta-0494",
    "tamil": "பாட்டி",
    "transliteration": "Paatti",
    "english": "grandmother",
    "meanings": [
      "grandmother"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் பாட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about grandmother.",
    "examples": [
      {
        "tamil": "நாம் பாட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about grandmother."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "grandmother"
    ]
  },
  {
    "id": "ta-0495",
    "tamil": "பாதம்",
    "transliteration": "Paatham",
    "english": "foot",
    "meanings": [
      "foot"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் பாதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about foot.",
    "examples": [
      {
        "tamil": "நாம் பாதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about foot."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "foot"
    ]
  },
  {
    "id": "ta-0496",
    "tamil": "பாதி",
    "transliteration": "Paathi",
    "english": "half",
    "meanings": [
      "half"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பாதி.",
    "exampleTranslation": "We can use this word in a sentence: half.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பாதி.",
        "english": "We can use this word in a sentence: half."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "half"
    ]
  },
  {
    "id": "ta-0497",
    "tamil": "பாதுகாப்பு",
    "transliteration": "Paathukaappu",
    "english": "safety",
    "meanings": [
      "safety"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பாதுகாப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about safety.",
    "examples": [
      {
        "tamil": "நாம் பாதுகாப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about safety."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "safety"
    ]
  },
  {
    "id": "ta-0498",
    "tamil": "பாதை",
    "transliteration": "Paathai",
    "english": "path",
    "meanings": [
      "path"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் பாதை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about path.",
    "examples": [
      {
        "tamil": "நாம் பாதை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about path."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "path"
    ]
  },
  {
    "id": "ta-0499",
    "tamil": "பாத்திரம்",
    "transliteration": "Paaththiram",
    "english": "vessel",
    "meanings": [
      "vessel"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் பாத்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about vessel.",
    "examples": [
      {
        "tamil": "நாம் பாத்திரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about vessel."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "vessel"
    ]
  },
  {
    "id": "ta-0500",
    "tamil": "பானை",
    "transliteration": "Paanai",
    "english": "pot",
    "meanings": [
      "pot"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் பானை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pot.",
    "examples": [
      {
        "tamil": "நாம் பானை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pot."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pot"
    ]
  },
  {
    "id": "ta-0501",
    "tamil": "பாம்பு",
    "transliteration": "Paampu",
    "english": "snake",
    "meanings": [
      "snake"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் பாம்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about snake.",
    "examples": [
      {
        "tamil": "நாம் பாம்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about snake."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "snake"
    ]
  },
  {
    "id": "ta-0502",
    "tamil": "பாரம்பரியம்",
    "transliteration": "Paarampariyam",
    "english": "tradition",
    "meanings": [
      "tradition"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் பாரம்பரியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tradition.",
    "examples": [
      {
        "tamil": "நாம் பாரம்பரியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tradition."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tradition"
    ]
  },
  {
    "id": "ta-0503",
    "tamil": "பார்",
    "transliteration": "Paar",
    "english": "see/watch",
    "meanings": [
      "see/watch",
      "see",
      "watch"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பார் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to see/watch every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பார் முயற்சி செய்கிறேன்.",
        "english": "I try to see/watch every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "see/watch"
    ]
  },
  {
    "id": "ta-0504",
    "tamil": "பாறை",
    "transliteration": "Paarai",
    "english": "rock",
    "meanings": [
      "rock"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் பாறை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rock.",
    "examples": [
      {
        "tamil": "நாம் பாறை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rock."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rock"
    ]
  },
  {
    "id": "ta-0505",
    "tamil": "பாலம்",
    "transliteration": "Paalam",
    "english": "bridge",
    "meanings": [
      "bridge"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் பாலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bridge.",
    "examples": [
      {
        "tamil": "நாம் பாலம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bridge."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bridge"
    ]
  },
  {
    "id": "ta-0506",
    "tamil": "பால்",
    "transliteration": "Paal",
    "english": "milk",
    "meanings": [
      "milk"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் பால் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about milk.",
    "examples": [
      {
        "tamil": "நாம் பால் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about milk."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "milk"
    ]
  },
  {
    "id": "ta-0507",
    "tamil": "பின்",
    "transliteration": "Pin",
    "english": "after",
    "meanings": [
      "after"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் பின் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about after.",
    "examples": [
      {
        "tamil": "நாம் பின் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about after."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "after"
    ]
  },
  {
    "id": "ta-0508",
    "tamil": "பின்னால்",
    "transliteration": "Pinnaal",
    "english": "behind",
    "meanings": [
      "behind"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பின்னால்.",
    "exampleTranslation": "We can use this word in a sentence: behind.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: பின்னால்.",
        "english": "We can use this word in a sentence: behind."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "behind"
    ]
  },
  {
    "id": "ta-0509",
    "tamil": "பிப்ரவரி",
    "transliteration": "Pipravari",
    "english": "February",
    "meanings": [
      "February"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் பிப்ரவரி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about February.",
    "examples": [
      {
        "tamil": "நாம் பிப்ரவரி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about February."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "February",
      "february"
    ]
  },
  {
    "id": "ta-0510",
    "tamil": "பிற",
    "transliteration": "Pira",
    "english": "be born",
    "meanings": [
      "be born"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பிற முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to be born every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பிற முயற்சி செய்கிறேன்.",
        "english": "I try to be born every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "be born"
    ]
  },
  {
    "id": "ta-0511",
    "tamil": "பிஸியான",
    "transliteration": "Pisiyaana",
    "english": "busy",
    "meanings": [
      "busy"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் பிஸியான.",
    "exampleTranslation": "This is very busy.",
    "examples": [
      {
        "tamil": "இது மிகவும் பிஸியான.",
        "english": "This is very busy."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "busy"
    ]
  },
  {
    "id": "ta-0512",
    "tamil": "புகைப்படம்",
    "transliteration": "Pukaippatam",
    "english": "photograph",
    "meanings": [
      "photograph"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் புகைப்படம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about photograph.",
    "examples": [
      {
        "tamil": "நாம் புகைப்படம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about photograph."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "photograph"
    ]
  },
  {
    "id": "ta-0513",
    "tamil": "புதன்",
    "transliteration": "Puthan",
    "english": "Wednesday",
    "meanings": [
      "Wednesday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் புதன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Wednesday.",
    "examples": [
      {
        "tamil": "நாம் புதன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Wednesday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Wednesday",
      "wednesday"
    ]
  },
  {
    "id": "ta-0514",
    "tamil": "புதிய",
    "transliteration": "Puthiya",
    "english": "new",
    "meanings": [
      "new"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் புதிய.",
    "exampleTranslation": "This is very new.",
    "examples": [
      {
        "tamil": "இது மிகவும் புதிய.",
        "english": "This is very new."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "new"
    ]
  },
  {
    "id": "ta-0515",
    "tamil": "புத்தகம்",
    "transliteration": "Puththakam",
    "english": "book",
    "meanings": [
      "book"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் புத்தகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about book.",
    "examples": [
      {
        "tamil": "நாம் புத்தகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about book."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "book"
    ]
  },
  {
    "id": "ta-0516",
    "tamil": "புத்திசாலியான",
    "transliteration": "Puththichaaliyaana",
    "english": "intelligent",
    "meanings": [
      "intelligent"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் புத்திசாலியான.",
    "exampleTranslation": "This is very intelligent.",
    "examples": [
      {
        "tamil": "இது மிகவும் புத்திசாலியான.",
        "english": "This is very intelligent."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "intelligent"
    ]
  },
  {
    "id": "ta-0517",
    "tamil": "புயல்",
    "transliteration": "Puyal",
    "english": "storm",
    "meanings": [
      "storm"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் புயல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about storm.",
    "examples": [
      {
        "tamil": "நாம் புயல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about storm."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "storm"
    ]
  },
  {
    "id": "ta-0518",
    "tamil": "புரிதல்",
    "transliteration": "Purithal",
    "english": "understanding",
    "meanings": [
      "understanding"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் புரிதல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about understanding.",
    "examples": [
      {
        "tamil": "நாம் புரிதல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about understanding."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "understanding"
    ]
  },
  {
    "id": "ta-0519",
    "tamil": "புரிந்து கொள்",
    "transliteration": "Purinthu kol",
    "english": "understand",
    "meanings": [
      "understand"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs",
      "Verbs"
    ],
    "example": "நான் தினமும் புரிந்து கொள் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to understand every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் புரிந்து கொள் முயற்சி செய்கிறேன்.",
        "english": "I try to understand every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "understand"
    ]
  },
  {
    "id": "ta-0520",
    "tamil": "புலி",
    "transliteration": "Puli",
    "english": "tiger",
    "meanings": [
      "tiger"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் புலி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tiger.",
    "examples": [
      {
        "tamil": "நாம் புலி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tiger."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tiger"
    ]
  },
  {
    "id": "ta-0521",
    "tamil": "புளிப்பான",
    "transliteration": "Pulippaana",
    "english": "sour",
    "meanings": [
      "sour"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் புளிப்பான.",
    "exampleTranslation": "This is very sour.",
    "examples": [
      {
        "tamil": "இது மிகவும் புளிப்பான.",
        "english": "This is very sour."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "sour"
    ]
  },
  {
    "id": "ta-0522",
    "tamil": "புவியியல்",
    "transliteration": "Puviyiyal",
    "english": "geography",
    "meanings": [
      "geography"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் புவியியல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about geography.",
    "examples": [
      {
        "tamil": "நாம் புவியியல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about geography."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "geography"
    ]
  },
  {
    "id": "ta-0523",
    "tamil": "பூ",
    "transliteration": "Poo",
    "english": "flower",
    "meanings": [
      "flower"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் பூ பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about flower.",
    "examples": [
      {
        "tamil": "நாம் பூ பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about flower."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "flower"
    ]
  },
  {
    "id": "ta-0524",
    "tamil": "பூங்கா",
    "transliteration": "Poongkaa",
    "english": "park",
    "meanings": [
      "park"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் பூங்கா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about park.",
    "examples": [
      {
        "tamil": "நாம் பூங்கா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about park."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "park"
    ]
  },
  {
    "id": "ta-0525",
    "tamil": "பூட்டு",
    "transliteration": "Poottu",
    "english": "lock",
    "meanings": [
      "lock"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் பூட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lock.",
    "examples": [
      {
        "tamil": "நாம் பூட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lock."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lock"
    ]
  },
  {
    "id": "ta-0526",
    "tamil": "பூண்டு",
    "transliteration": "Poontu",
    "english": "garlic",
    "meanings": [
      "garlic"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் பூண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about garlic.",
    "examples": [
      {
        "tamil": "நாம் பூண்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about garlic."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "garlic"
    ]
  },
  {
    "id": "ta-0527",
    "tamil": "பூனை",
    "transliteration": "Poonai",
    "english": "cat",
    "meanings": [
      "cat"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் பூனை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cat.",
    "examples": [
      {
        "tamil": "நாம் பூனை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cat."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cat"
    ]
  },
  {
    "id": "ta-0528",
    "tamil": "பூனைக்குட்டி",
    "transliteration": "Poonaikkutti",
    "english": "kitten",
    "meanings": [
      "kitten"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் பூனைக்குட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about kitten.",
    "examples": [
      {
        "tamil": "நாம் பூனைக்குட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about kitten."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "kitten"
    ]
  },
  {
    "id": "ta-0529",
    "tamil": "பெண்",
    "transliteration": "Pen",
    "english": "woman",
    "meanings": [
      "woman"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் பெண் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about woman.",
    "examples": [
      {
        "tamil": "நாம் பெண் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about woman."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "woman"
    ]
  },
  {
    "id": "ta-0530",
    "tamil": "பென்சில்",
    "transliteration": "Penchil",
    "english": "pencil",
    "meanings": [
      "pencil"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் பென்சில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pencil.",
    "examples": [
      {
        "tamil": "நாம் பென்சில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pencil."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pencil"
    ]
  },
  {
    "id": "ta-0531",
    "tamil": "பெயர்",
    "transliteration": "Peyar",
    "english": "name",
    "meanings": [
      "name"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பெயர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about name.",
    "examples": [
      {
        "tamil": "நாம் பெயர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about name."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "name"
    ]
  },
  {
    "id": "ta-0532",
    "tamil": "பெரிய",
    "transliteration": "Periya",
    "english": "big",
    "meanings": [
      "big"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் பெரிய.",
    "exampleTranslation": "This is very big.",
    "examples": [
      {
        "tamil": "இது மிகவும் பெரிய.",
        "english": "This is very big."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "big"
    ]
  },
  {
    "id": "ta-0533",
    "tamil": "பெருமை",
    "transliteration": "Perumai",
    "english": "pride",
    "meanings": [
      "pride"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் பெருமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pride.",
    "examples": [
      {
        "tamil": "நாம் பெருமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pride."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pride"
    ]
  },
  {
    "id": "ta-0534",
    "tamil": "பெறு",
    "transliteration": "Peru",
    "english": "receive/get",
    "meanings": [
      "receive/get",
      "receive",
      "get"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பெறு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to receive/get every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பெறு முயற்சி செய்கிறேன்.",
        "english": "I try to receive/get every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "receive/get"
    ]
  },
  {
    "id": "ta-0535",
    "tamil": "பெற்றோர்",
    "transliteration": "Perroar",
    "english": "parents",
    "meanings": [
      "parents"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் பெற்றோர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about parents.",
    "examples": [
      {
        "tamil": "நாம் பெற்றோர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about parents."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "parents"
    ]
  },
  {
    "id": "ta-0536",
    "tamil": "பேசு",
    "transliteration": "Paechu",
    "english": "speak",
    "meanings": [
      "speak"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் பேசு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to speak every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் பேசு முயற்சி செய்கிறேன்.",
        "english": "I try to speak every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "speak"
    ]
  },
  {
    "id": "ta-0537",
    "tamil": "பேனா",
    "transliteration": "Paenaa",
    "english": "pen",
    "meanings": [
      "pen"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் பேனா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pen.",
    "examples": [
      {
        "tamil": "நாம் பேனா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pen."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pen"
    ]
  },
  {
    "id": "ta-0538",
    "tamil": "பேருந்து",
    "transliteration": "Paerunthu",
    "english": "bus",
    "meanings": [
      "bus"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் பேருந்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bus.",
    "examples": [
      {
        "tamil": "நாம் பேருந்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bus."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bus"
    ]
  },
  {
    "id": "ta-0539",
    "tamil": "பை",
    "transliteration": "Pai",
    "english": "bag",
    "meanings": [
      "bag"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Objects"
    ],
    "example": "நாம் பை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bag.",
    "examples": [
      {
        "tamil": "நாம் பை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bag."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bag"
    ]
  },
  {
    "id": "ta-0540",
    "tamil": "பொங்கல்",
    "transliteration": "Pongkal",
    "english": "pongal; Pongal",
    "meanings": [
      "pongal; Pongal",
      "pongal",
      "Pongal"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink",
      "Culture"
    ],
    "example": "நாம் பொங்கல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pongal.",
    "examples": [
      {
        "tamil": "நாம் பொங்கல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pongal."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pongal; Pongal",
      "pongal"
    ]
  },
  {
    "id": "ta-0541",
    "tamil": "பொதுவான",
    "transliteration": "Pothuvaana",
    "english": "common",
    "meanings": [
      "common"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் பொதுவான.",
    "exampleTranslation": "This is very common.",
    "examples": [
      {
        "tamil": "இது மிகவும் பொதுவான.",
        "english": "This is very common."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "common"
    ]
  },
  {
    "id": "ta-0542",
    "tamil": "பொம்மை",
    "transliteration": "Pommai",
    "english": "toy",
    "meanings": [
      "toy"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் பொம்மை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about toy.",
    "examples": [
      {
        "tamil": "நாம் பொம்மை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about toy."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "toy"
    ]
  },
  {
    "id": "ta-0543",
    "tamil": "பொய்",
    "transliteration": "Poy",
    "english": "lie/falsehood",
    "meanings": [
      "lie/falsehood",
      "lie",
      "falsehood"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பொய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lie/falsehood.",
    "examples": [
      {
        "tamil": "நாம் பொய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lie/falsehood."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lie/falsehood"
    ]
  },
  {
    "id": "ta-0544",
    "tamil": "பொய்யான",
    "transliteration": "Poyyaana",
    "english": "false",
    "meanings": [
      "false"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் பொய்யான.",
    "exampleTranslation": "This is very false.",
    "examples": [
      {
        "tamil": "இது மிகவும் பொய்யான.",
        "english": "This is very false."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "false"
    ]
  },
  {
    "id": "ta-0545",
    "tamil": "பொருள்",
    "transliteration": "Porul",
    "english": "thing/object",
    "meanings": [
      "thing/object",
      "thing",
      "object"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் பொருள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about thing/object.",
    "examples": [
      {
        "tamil": "நாம் பொருள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about thing/object."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thing/object"
    ]
  },
  {
    "id": "ta-0546",
    "tamil": "பொறுப்பு",
    "transliteration": "Poruppu",
    "english": "responsibility",
    "meanings": [
      "responsibility"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் பொறுப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about responsibility.",
    "examples": [
      {
        "tamil": "நாம் பொறுப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about responsibility."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "responsibility"
    ]
  },
  {
    "id": "ta-0547",
    "tamil": "பொறுமை",
    "transliteration": "Porumai",
    "english": "patience",
    "meanings": [
      "patience"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் பொறுமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about patience.",
    "examples": [
      {
        "tamil": "நாம் பொறுமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about patience."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "patience"
    ]
  },
  {
    "id": "ta-0548",
    "tamil": "போ",
    "transliteration": "Poa",
    "english": "go",
    "meanings": [
      "go"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் போ முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to go every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் போ முயற்சி செய்கிறேன்.",
        "english": "I try to go every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "go"
    ]
  },
  {
    "id": "ta-0549",
    "tamil": "போர்",
    "transliteration": "Poar",
    "english": "war",
    "meanings": [
      "war"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் போர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about war.",
    "examples": [
      {
        "tamil": "நாம் போர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about war."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "war"
    ]
  },
  {
    "id": "ta-0550",
    "tamil": "போர்வை",
    "transliteration": "Poarvai",
    "english": "blanket",
    "meanings": [
      "blanket"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் போர்வை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about blanket.",
    "examples": [
      {
        "tamil": "நாம் போர்வை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about blanket."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "blanket"
    ]
  },
  {
    "id": "ta-0551",
    "tamil": "மகன்",
    "transliteration": "Makan",
    "english": "son",
    "meanings": [
      "son"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மகன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about son.",
    "examples": [
      {
        "tamil": "நாம் மகன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about son."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "son"
    ]
  },
  {
    "id": "ta-0552",
    "tamil": "மகள்",
    "transliteration": "Makal",
    "english": "daughter",
    "meanings": [
      "daughter"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மகள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about daughter.",
    "examples": [
      {
        "tamil": "நாம் மகள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about daughter."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "daughter"
    ]
  },
  {
    "id": "ta-0553",
    "tamil": "மகிழ்ச்சி",
    "transliteration": "Makizhchchi",
    "english": "happiness",
    "meanings": [
      "happiness"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் மகிழ்ச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about happiness.",
    "examples": [
      {
        "tamil": "நாம் மகிழ்ச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about happiness."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "happiness"
    ]
  },
  {
    "id": "ta-0554",
    "tamil": "மகிழ்ச்சியான",
    "transliteration": "Makizhchchiyaana",
    "english": "happy",
    "meanings": [
      "happy"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் மகிழ்ச்சியான.",
    "exampleTranslation": "This is very happy.",
    "examples": [
      {
        "tamil": "இது மிகவும் மகிழ்ச்சியான.",
        "english": "This is very happy."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "happy"
    ]
  },
  {
    "id": "ta-0555",
    "tamil": "மக்கள்",
    "transliteration": "Makkal",
    "english": "people",
    "meanings": [
      "people"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People",
      "Culture"
    ],
    "example": "நாம் மக்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about people.",
    "examples": [
      {
        "tamil": "நாம் மக்கள் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about people."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "people"
    ]
  },
  {
    "id": "ta-0556",
    "tamil": "மட்டும்",
    "transliteration": "Mattum",
    "english": "only",
    "meanings": [
      "only"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மட்டும்.",
    "exampleTranslation": "We can use this word in a sentence: only.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மட்டும்.",
        "english": "We can use this word in a sentence: only."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "only"
    ]
  },
  {
    "id": "ta-0557",
    "tamil": "மணல்",
    "transliteration": "Manal",
    "english": "sand",
    "meanings": [
      "sand"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மணல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sand.",
    "examples": [
      {
        "tamil": "நாம் மணல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sand."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sand"
    ]
  },
  {
    "id": "ta-0558",
    "tamil": "மண்",
    "transliteration": "Man",
    "english": "soil",
    "meanings": [
      "soil"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மண் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about soil.",
    "examples": [
      {
        "tamil": "நாம் மண் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about soil."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "soil"
    ]
  },
  {
    "id": "ta-0559",
    "tamil": "மதிப்பிடு",
    "transliteration": "Mathippitu",
    "english": "evaluate",
    "meanings": [
      "evaluate"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் மதிப்பிடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to evaluate every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் மதிப்பிடு முயற்சி செய்கிறேன்.",
        "english": "I try to evaluate every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "evaluate"
    ]
  },
  {
    "id": "ta-0560",
    "tamil": "மதிப்பெண்",
    "transliteration": "Mathippen",
    "english": "mark/score",
    "meanings": [
      "mark/score",
      "mark",
      "score"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் மதிப்பெண் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mark/score.",
    "examples": [
      {
        "tamil": "நாம் மதிப்பெண் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mark/score."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mark/score"
    ]
  },
  {
    "id": "ta-0561",
    "tamil": "மதிய உணவு",
    "transliteration": "Mathiya unavu",
    "english": "lunch",
    "meanings": [
      "lunch"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் மதிய உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lunch.",
    "examples": [
      {
        "tamil": "நாம் மதிய உணவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lunch."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lunch"
    ]
  },
  {
    "id": "ta-0562",
    "tamil": "மதியம்",
    "transliteration": "Mathiyam",
    "english": "afternoon/noon",
    "meanings": [
      "afternoon/noon",
      "afternoon",
      "noon"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் மதியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about afternoon/noon.",
    "examples": [
      {
        "tamil": "நாம் மதியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about afternoon/noon."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "afternoon/noon"
    ]
  },
  {
    "id": "ta-0563",
    "tamil": "மனைவி",
    "transliteration": "Manaivi",
    "english": "wife",
    "meanings": [
      "wife"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மனைவி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about wife.",
    "examples": [
      {
        "tamil": "நாம் மனைவி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about wife."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "wife"
    ]
  },
  {
    "id": "ta-0564",
    "tamil": "மன்னர்",
    "transliteration": "Mannar",
    "english": "king",
    "meanings": [
      "king"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் மன்னர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about king.",
    "examples": [
      {
        "tamil": "நாம் மன்னர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about king."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "king"
    ]
  },
  {
    "id": "ta-0565",
    "tamil": "மன்னிக்கவும்",
    "transliteration": "Mannikkavum",
    "english": "sorry/excuse me",
    "meanings": [
      "sorry/excuse me",
      "sorry",
      "excuse me"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் மன்னிக்கவும் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sorry/excuse me.",
    "examples": [
      {
        "tamil": "நாம் மன்னிக்கவும் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sorry/excuse me."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sorry/excuse me"
    ]
  },
  {
    "id": "ta-0566",
    "tamil": "மயில்",
    "transliteration": "Mayil",
    "english": "peacock",
    "meanings": [
      "peacock"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் மயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about peacock.",
    "examples": [
      {
        "tamil": "நாம் மயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about peacock."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "peacock"
    ]
  },
  {
    "id": "ta-0567",
    "tamil": "மரபு",
    "transliteration": "Marapu",
    "english": "heritage",
    "meanings": [
      "heritage"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் மரபு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about heritage.",
    "examples": [
      {
        "tamil": "நாம் மரபு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about heritage."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "heritage"
    ]
  },
  {
    "id": "ta-0568",
    "tamil": "மரம்",
    "transliteration": "Maram",
    "english": "tree",
    "meanings": [
      "tree"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about tree.",
    "examples": [
      {
        "tamil": "நாம் மரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about tree."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "tree"
    ]
  },
  {
    "id": "ta-0569",
    "tamil": "மரியாதை",
    "transliteration": "Mariyaathai",
    "english": "respect",
    "meanings": [
      "respect"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் மரியாதை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about respect.",
    "examples": [
      {
        "tamil": "நாம் மரியாதை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about respect."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "respect"
    ]
  },
  {
    "id": "ta-0570",
    "tamil": "மருத்துவமனை",
    "transliteration": "Maruththuvamanai",
    "english": "hospital",
    "meanings": [
      "hospital"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் மருத்துவமனை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hospital.",
    "examples": [
      {
        "tamil": "நாம் மருத்துவமனை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hospital."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hospital"
    ]
  },
  {
    "id": "ta-0571",
    "tamil": "மருத்துவம்",
    "transliteration": "Maruththuvam",
    "english": "medicine/medical care",
    "meanings": [
      "medicine/medical care",
      "medicine",
      "medical care"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் மருத்துவம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about medicine/medical care.",
    "examples": [
      {
        "tamil": "நாம் மருத்துவம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about medicine/medical care."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "medicine/medical care"
    ]
  },
  {
    "id": "ta-0572",
    "tamil": "மருத்துவர்",
    "transliteration": "Maruththuvar",
    "english": "doctor",
    "meanings": [
      "doctor"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மருத்துவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about doctor.",
    "examples": [
      {
        "tamil": "நாம் மருத்துவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about doctor."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "doctor"
    ]
  },
  {
    "id": "ta-0573",
    "tamil": "மருந்து",
    "transliteration": "Marunthu",
    "english": "medicine",
    "meanings": [
      "medicine"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் மருந்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about medicine.",
    "examples": [
      {
        "tamil": "நாம் மருந்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about medicine."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "medicine"
    ]
  },
  {
    "id": "ta-0574",
    "tamil": "மற",
    "transliteration": "Mara",
    "english": "forget",
    "meanings": [
      "forget"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் மற முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to forget every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் மற முயற்சி செய்கிறேன்.",
        "english": "I try to forget every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "forget"
    ]
  },
  {
    "id": "ta-0575",
    "tamil": "மறந்துவிடு",
    "transliteration": "Maranthuvitu",
    "english": "forget",
    "meanings": [
      "forget"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் மறந்துவிடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to forget every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் மறந்துவிடு முயற்சி செய்கிறேன்.",
        "english": "I try to forget every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "forget"
    ]
  },
  {
    "id": "ta-0576",
    "tamil": "மற்றும்",
    "transliteration": "Marrum",
    "english": "and",
    "meanings": [
      "and"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மற்றும்.",
    "exampleTranslation": "We can use this word in a sentence: and.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மற்றும்.",
        "english": "We can use this word in a sentence: and."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "and"
    ]
  },
  {
    "id": "ta-0577",
    "tamil": "மலர்",
    "transliteration": "Malar",
    "english": "flower",
    "meanings": [
      "flower"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மலர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about flower.",
    "examples": [
      {
        "tamil": "நாம் மலர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about flower."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "flower"
    ]
  },
  {
    "id": "ta-0578",
    "tamil": "மலை",
    "transliteration": "Malai",
    "english": "mountain",
    "meanings": [
      "mountain"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mountain.",
    "examples": [
      {
        "tamil": "நாம் மலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mountain."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mountain"
    ]
  },
  {
    "id": "ta-0579",
    "tamil": "மலைச்சிகரம்",
    "transliteration": "Malaichchikaram",
    "english": "mountain peak",
    "meanings": [
      "mountain peak"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மலைச்சிகரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mountain peak.",
    "examples": [
      {
        "tamil": "நாம் மலைச்சிகரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mountain peak."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mountain peak"
    ]
  },
  {
    "id": "ta-0580",
    "tamil": "மழை",
    "transliteration": "Mazhai",
    "english": "rain",
    "meanings": [
      "rain"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மழை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rain.",
    "examples": [
      {
        "tamil": "நாம் மழை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rain."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rain"
    ]
  },
  {
    "id": "ta-0581",
    "tamil": "மாடு",
    "transliteration": "Maatu",
    "english": "cow",
    "meanings": [
      "cow"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் மாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cow.",
    "examples": [
      {
        "tamil": "நாம் மாடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cow."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cow"
    ]
  },
  {
    "id": "ta-0582",
    "tamil": "மாணவர்",
    "transliteration": "Maanavar",
    "english": "student",
    "meanings": [
      "student"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மாணவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about student.",
    "examples": [
      {
        "tamil": "நாம் மாணவர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about student."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "student"
    ]
  },
  {
    "id": "ta-0583",
    "tamil": "மாணவி",
    "transliteration": "Maanavi",
    "english": "female student",
    "meanings": [
      "female student"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மாணவி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about female student.",
    "examples": [
      {
        "tamil": "நாம் மாணவி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about female student."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "female student"
    ]
  },
  {
    "id": "ta-0584",
    "tamil": "மாதம்",
    "transliteration": "Maatham",
    "english": "month",
    "meanings": [
      "month"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் மாதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about month.",
    "examples": [
      {
        "tamil": "நாம் மாதம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about month."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "month"
    ]
  },
  {
    "id": "ta-0585",
    "tamil": "மான்",
    "transliteration": "Maan",
    "english": "deer",
    "meanings": [
      "deer"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் மான் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about deer.",
    "examples": [
      {
        "tamil": "நாம் மான் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about deer."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "deer"
    ]
  },
  {
    "id": "ta-0586",
    "tamil": "மாமா",
    "transliteration": "Maamaa",
    "english": "uncle",
    "meanings": [
      "uncle"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மாமா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about uncle.",
    "examples": [
      {
        "tamil": "நாம் மாமா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about uncle."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "uncle"
    ]
  },
  {
    "id": "ta-0587",
    "tamil": "மாமி",
    "transliteration": "Maami",
    "english": "aunt",
    "meanings": [
      "aunt"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் மாமி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about aunt.",
    "examples": [
      {
        "tamil": "நாம் மாமி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about aunt."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "aunt"
    ]
  },
  {
    "id": "ta-0588",
    "tamil": "மாம்பழம்",
    "transliteration": "Maampazham",
    "english": "mango",
    "meanings": [
      "mango"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் மாம்பழம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mango.",
    "examples": [
      {
        "tamil": "நாம் மாம்பழம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mango."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mango"
    ]
  },
  {
    "id": "ta-0589",
    "tamil": "மார்ச்",
    "transliteration": "Maarch",
    "english": "March",
    "meanings": [
      "March"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் மார்ச் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about March.",
    "examples": [
      {
        "tamil": "நாம் மார்ச் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about March."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "March",
      "march"
    ]
  },
  {
    "id": "ta-0590",
    "tamil": "மார்பு",
    "transliteration": "Maarpu",
    "english": "chest",
    "meanings": [
      "chest"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் மார்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chest.",
    "examples": [
      {
        "tamil": "நாம் மார்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chest."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chest"
    ]
  },
  {
    "id": "ta-0591",
    "tamil": "மாறு",
    "transliteration": "Maaru",
    "english": "change",
    "meanings": [
      "change"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் மாறு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to change every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் மாறு முயற்சி செய்கிறேன்.",
        "english": "I try to change every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "change"
    ]
  },
  {
    "id": "ta-0592",
    "tamil": "மாற்றம்",
    "transliteration": "Maarram",
    "english": "change",
    "meanings": [
      "change"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் மாற்றம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about change.",
    "examples": [
      {
        "tamil": "நாம் மாற்றம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about change."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "change"
    ]
  },
  {
    "id": "ta-0593",
    "tamil": "மாலை",
    "transliteration": "Maalai",
    "english": "evening",
    "meanings": [
      "evening"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் மாலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about evening.",
    "examples": [
      {
        "tamil": "நாம் மாலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about evening."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "evening"
    ]
  },
  {
    "id": "ta-0594",
    "tamil": "மிகவும்",
    "transliteration": "Mikavum",
    "english": "very",
    "meanings": [
      "very"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மிகவும்.",
    "exampleTranslation": "We can use this word in a sentence: very.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மிகவும்.",
        "english": "We can use this word in a sentence: very."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "very"
    ]
  },
  {
    "id": "ta-0595",
    "tamil": "மிதிவண்டி",
    "transliteration": "Mithivanti",
    "english": "bicycle",
    "meanings": [
      "bicycle"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் மிதிவண்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bicycle.",
    "examples": [
      {
        "tamil": "நாம் மிதிவண்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bicycle."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bicycle"
    ]
  },
  {
    "id": "ta-0596",
    "tamil": "மின்னல்",
    "transliteration": "Minnal",
    "english": "lightning",
    "meanings": [
      "lightning"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மின்னல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lightning.",
    "examples": [
      {
        "tamil": "நாம் மின்னல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lightning."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lightning"
    ]
  },
  {
    "id": "ta-0597",
    "tamil": "மின்விசிறி",
    "transliteration": "Minvichiri",
    "english": "fan",
    "meanings": [
      "fan"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் மின்விசிறி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about fan.",
    "examples": [
      {
        "tamil": "நாம் மின்விசிறி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about fan."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fan"
    ]
  },
  {
    "id": "ta-0598",
    "tamil": "மிளகாய்",
    "transliteration": "Milakaay",
    "english": "chilli",
    "meanings": [
      "chilli"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் மிளகாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about chilli.",
    "examples": [
      {
        "tamil": "நாம் மிளகாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about chilli."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "chilli"
    ]
  },
  {
    "id": "ta-0599",
    "tamil": "மீன்",
    "transliteration": "Meen",
    "english": "fish",
    "meanings": [
      "fish"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink",
      "Animals"
    ],
    "example": "நாம் மீன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about fish.",
    "examples": [
      {
        "tamil": "நாம் மீன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about fish."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "fish"
    ]
  },
  {
    "id": "ta-0600",
    "tamil": "முகம்",
    "transliteration": "Mukam",
    "english": "face",
    "meanings": [
      "face"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் முகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about face.",
    "examples": [
      {
        "tamil": "நாம் முகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about face."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "face"
    ]
  },
  {
    "id": "ta-0601",
    "tamil": "முக்கியமான",
    "transliteration": "Mukkiyamaana",
    "english": "important",
    "meanings": [
      "important"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் முக்கியமான.",
    "exampleTranslation": "This is very important.",
    "examples": [
      {
        "tamil": "இது மிகவும் முக்கியமான.",
        "english": "This is very important."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "important"
    ]
  },
  {
    "id": "ta-0602",
    "tamil": "முடி",
    "transliteration": "Muti",
    "english": "hair; finish",
    "meanings": [
      "hair; finish",
      "hair",
      "finish"
    ],
    "category": "Body",
    "categories": [
      "Body",
      "Verbs"
    ],
    "example": "நாம் முடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hair.",
    "examples": [
      {
        "tamil": "நாம் முடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hair."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hair; finish",
      "hair"
    ]
  },
  {
    "id": "ta-0603",
    "tamil": "முடிவு",
    "transliteration": "Mutivu",
    "english": "decision/end",
    "meanings": [
      "decision/end",
      "decision",
      "end"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் முடிவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about decision/end.",
    "examples": [
      {
        "tamil": "நாம் முடிவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about decision/end."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "decision/end"
    ]
  },
  {
    "id": "ta-0604",
    "tamil": "முட்டை",
    "transliteration": "Muttai",
    "english": "egg",
    "meanings": [
      "egg"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் முட்டை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about egg.",
    "examples": [
      {
        "tamil": "நாம் முட்டை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about egg."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "egg"
    ]
  },
  {
    "id": "ta-0605",
    "tamil": "முதல்",
    "transliteration": "Muthal",
    "english": "first",
    "meanings": [
      "first"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: முதல்.",
    "exampleTranslation": "We can use this word in a sentence: first.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: முதல்.",
        "english": "We can use this word in a sentence: first."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "first"
    ]
  },
  {
    "id": "ta-0606",
    "tamil": "முதல்வர்",
    "transliteration": "Muthalvar",
    "english": "principal",
    "meanings": [
      "principal"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் முதல்வர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about principal.",
    "examples": [
      {
        "tamil": "நாம் முதல்வர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about principal."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "principal"
    ]
  },
  {
    "id": "ta-0607",
    "tamil": "முதுகு",
    "transliteration": "Muthuku",
    "english": "back",
    "meanings": [
      "back"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் முதுகு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about back.",
    "examples": [
      {
        "tamil": "நாம் முதுகு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about back."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "back"
    ]
  },
  {
    "id": "ta-0608",
    "tamil": "முன்",
    "transliteration": "Mun",
    "english": "before",
    "meanings": [
      "before"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் முன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about before.",
    "examples": [
      {
        "tamil": "நாம் முன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about before."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "before"
    ]
  },
  {
    "id": "ta-0609",
    "tamil": "முன்னால்",
    "transliteration": "Munnaal",
    "english": "in front",
    "meanings": [
      "in front"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: முன்னால்.",
    "exampleTranslation": "We can use this word in a sentence: in front.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: முன்னால்.",
        "english": "We can use this word in a sentence: in front."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "in front"
    ]
  },
  {
    "id": "ta-0610",
    "tamil": "முன்னேற்றம்",
    "transliteration": "Munnaerram",
    "english": "progress",
    "meanings": [
      "progress"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் முன்னேற்றம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about progress.",
    "examples": [
      {
        "tamil": "நாம் முன்னேற்றம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about progress."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "progress"
    ]
  },
  {
    "id": "ta-0611",
    "tamil": "முப்பது",
    "transliteration": "Muppathu",
    "english": "thirty",
    "meanings": [
      "thirty"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: முப்பது.",
    "exampleTranslation": "We can use this word in a sentence: thirty.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: முப்பது.",
        "english": "We can use this word in a sentence: thirty."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "thirty"
    ]
  },
  {
    "id": "ta-0612",
    "tamil": "முயற்சி",
    "transliteration": "Muyarchi",
    "english": "effort",
    "meanings": [
      "effort"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் முயற்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about effort.",
    "examples": [
      {
        "tamil": "நாம் முயற்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about effort."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "effort"
    ]
  },
  {
    "id": "ta-0613",
    "tamil": "முயற்சி செய்",
    "transliteration": "Muyarchi chey",
    "english": "try",
    "meanings": [
      "try"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் முயற்சி செய் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to try every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் முயற்சி செய் முயற்சி செய்கிறேன்.",
        "english": "I try to try every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "try"
    ]
  },
  {
    "id": "ta-0614",
    "tamil": "முயல்",
    "transliteration": "Muyal",
    "english": "rabbit",
    "meanings": [
      "rabbit"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் முயல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rabbit.",
    "examples": [
      {
        "tamil": "நாம் முயல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rabbit."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rabbit"
    ]
  },
  {
    "id": "ta-0615",
    "tamil": "முறை",
    "transliteration": "Murai",
    "english": "method/way",
    "meanings": [
      "method/way",
      "method",
      "way"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் முறை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about method/way.",
    "examples": [
      {
        "tamil": "நாம் முறை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about method/way."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "method/way"
    ]
  },
  {
    "id": "ta-0616",
    "tamil": "முழங்கால்",
    "transliteration": "Muzhangkaal",
    "english": "knee",
    "meanings": [
      "knee"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் முழங்கால் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about knee.",
    "examples": [
      {
        "tamil": "நாம் முழங்கால் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about knee."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "knee"
    ]
  },
  {
    "id": "ta-0617",
    "tamil": "முழுமையான",
    "transliteration": "Muzhumaiyaana",
    "english": "complete",
    "meanings": [
      "complete"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் முழுமையான.",
    "exampleTranslation": "This is very complete.",
    "examples": [
      {
        "tamil": "இது மிகவும் முழுமையான.",
        "english": "This is very complete."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "complete"
    ]
  },
  {
    "id": "ta-0618",
    "tamil": "மூக்கு",
    "transliteration": "Mookku",
    "english": "nose",
    "meanings": [
      "nose"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் மூக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about nose.",
    "examples": [
      {
        "tamil": "நாம் மூக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about nose."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "nose"
    ]
  },
  {
    "id": "ta-0619",
    "tamil": "மூச்சு",
    "transliteration": "Moochchu",
    "english": "breath",
    "meanings": [
      "breath"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் மூச்சு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about breath.",
    "examples": [
      {
        "tamil": "நாம் மூச்சு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about breath."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "breath"
    ]
  },
  {
    "id": "ta-0620",
    "tamil": "மூடு",
    "transliteration": "Mootu",
    "english": "close",
    "meanings": [
      "close"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் மூடு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to close every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் மூடு முயற்சி செய்கிறேன்.",
        "english": "I try to close every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "close"
    ]
  },
  {
    "id": "ta-0621",
    "tamil": "மூன்றாவது",
    "transliteration": "Moonraavathu",
    "english": "third",
    "meanings": [
      "third"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மூன்றாவது.",
    "exampleTranslation": "We can use this word in a sentence: third.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மூன்றாவது.",
        "english": "We can use this word in a sentence: third."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "third"
    ]
  },
  {
    "id": "ta-0622",
    "tamil": "மூன்று",
    "transliteration": "Moonru",
    "english": "three",
    "meanings": [
      "three"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மூன்று.",
    "exampleTranslation": "We can use this word in a sentence: three.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மூன்று.",
        "english": "We can use this word in a sentence: three."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "three"
    ]
  },
  {
    "id": "ta-0623",
    "tamil": "மூளை",
    "transliteration": "Moolai",
    "english": "brain",
    "meanings": [
      "brain"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் மூளை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about brain.",
    "examples": [
      {
        "tamil": "நாம் மூளை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about brain."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "brain"
    ]
  },
  {
    "id": "ta-0624",
    "tamil": "மெதுவான",
    "transliteration": "Methuvaana",
    "english": "slow",
    "meanings": [
      "slow"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் மெதுவான.",
    "exampleTranslation": "This is very slow.",
    "examples": [
      {
        "tamil": "இது மிகவும் மெதுவான.",
        "english": "This is very slow."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "slow"
    ]
  },
  {
    "id": "ta-0625",
    "tamil": "மே",
    "transliteration": "Mae",
    "english": "May",
    "meanings": [
      "May"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் மே பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about May.",
    "examples": [
      {
        "tamil": "நாம் மே பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about May."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "May",
      "may"
    ]
  },
  {
    "id": "ta-0626",
    "tamil": "மேகம்",
    "transliteration": "Maekam",
    "english": "cloud",
    "meanings": [
      "cloud"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் மேகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about cloud.",
    "examples": [
      {
        "tamil": "நாம் மேகம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about cloud."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "cloud"
    ]
  },
  {
    "id": "ta-0627",
    "tamil": "மேசை",
    "transliteration": "Maechai",
    "english": "table; desk/table",
    "meanings": [
      "table; desk/table",
      "table",
      "desk",
      "table"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living",
      "Education"
    ],
    "example": "நாம் மேசை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about table.",
    "examples": [
      {
        "tamil": "நாம் மேசை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about table."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "table; desk/table",
      "table"
    ]
  },
  {
    "id": "ta-0628",
    "tamil": "மேல்",
    "transliteration": "Mael",
    "english": "above/on",
    "meanings": [
      "above/on",
      "above",
      "on"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மேல்.",
    "exampleTranslation": "We can use this word in a sentence: above/on.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மேல்.",
        "english": "We can use this word in a sentence: above/on."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "above/on"
    ]
  },
  {
    "id": "ta-0629",
    "tamil": "மொத்தம்",
    "transliteration": "Moththam",
    "english": "total",
    "meanings": [
      "total"
    ],
    "category": "Numbers",
    "categories": [
      "Numbers"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மொத்தம்.",
    "exampleTranslation": "We can use this word in a sentence: total.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: மொத்தம்.",
        "english": "We can use this word in a sentence: total."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "total"
    ]
  },
  {
    "id": "ta-0630",
    "tamil": "மொழி",
    "transliteration": "Mozhi",
    "english": "language",
    "meanings": [
      "language"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Culture"
    ],
    "example": "நாம் மொழி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about language.",
    "examples": [
      {
        "tamil": "நாம் மொழி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about language."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "language"
    ]
  },
  {
    "id": "ta-0631",
    "tamil": "மோதிரம்",
    "transliteration": "Moathiram",
    "english": "ring",
    "meanings": [
      "ring"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் மோதிரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about ring.",
    "examples": [
      {
        "tamil": "நாம் மோதிரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about ring."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "ring"
    ]
  },
  {
    "id": "ta-0632",
    "tamil": "யானை",
    "transliteration": "Yaanai",
    "english": "elephant",
    "meanings": [
      "elephant"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் யானை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about elephant.",
    "examples": [
      {
        "tamil": "நாம் யானை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about elephant."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "elephant"
    ]
  },
  {
    "id": "ta-0633",
    "tamil": "யானைக்குட்டி",
    "transliteration": "Yaanaikkutti",
    "english": "elephant calf",
    "meanings": [
      "elephant calf"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் யானைக்குட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about elephant calf.",
    "examples": [
      {
        "tamil": "நாம் யானைக்குட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about elephant calf."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "elephant calf"
    ]
  },
  {
    "id": "ta-0634",
    "tamil": "யார்",
    "transliteration": "Yaar",
    "english": "who",
    "meanings": [
      "who"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: யார்.",
    "exampleTranslation": "We can use this word in a sentence: who.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: யார்.",
        "english": "We can use this word in a sentence: who."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "who"
    ]
  },
  {
    "id": "ta-0635",
    "tamil": "ரயில்",
    "transliteration": "Rayil",
    "english": "train",
    "meanings": [
      "train"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் ரயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about train.",
    "examples": [
      {
        "tamil": "நாம் ரயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about train."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "train"
    ]
  },
  {
    "id": "ta-0636",
    "tamil": "ரொட்டி",
    "transliteration": "Rotti",
    "english": "bread",
    "meanings": [
      "bread"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் ரொட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bread.",
    "examples": [
      {
        "tamil": "நாம் ரொட்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bread."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bread"
    ]
  },
  {
    "id": "ta-0637",
    "tamil": "வகுப்பறை",
    "transliteration": "Vakupparai",
    "english": "classroom",
    "meanings": [
      "classroom"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் வகுப்பறை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about classroom.",
    "examples": [
      {
        "tamil": "நாம் வகுப்பறை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about classroom."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "classroom"
    ]
  },
  {
    "id": "ta-0638",
    "tamil": "வங்கி",
    "transliteration": "Vangki",
    "english": "bank",
    "meanings": [
      "bank"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் வங்கி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bank.",
    "examples": [
      {
        "tamil": "நாம் வங்கி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bank."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bank"
    ]
  },
  {
    "id": "ta-0639",
    "tamil": "வணக்கம்",
    "transliteration": "Vanakkam",
    "english": "hello/greetings",
    "meanings": [
      "hello/greetings",
      "hello",
      "greetings"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் வணக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hello/greetings.",
    "examples": [
      {
        "tamil": "நாம் வணக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hello/greetings."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hello/greetings"
    ]
  },
  {
    "id": "ta-0640",
    "tamil": "வண்டி",
    "transliteration": "Vanti",
    "english": "vehicle",
    "meanings": [
      "vehicle"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் வண்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about vehicle.",
    "examples": [
      {
        "tamil": "நாம் வண்டி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about vehicle."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "vehicle"
    ]
  },
  {
    "id": "ta-0641",
    "tamil": "வண்ணத்துப்பூச்சி",
    "transliteration": "Vannaththuppoochchi",
    "english": "butterfly",
    "meanings": [
      "butterfly"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் வண்ணத்துப்பூச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about butterfly.",
    "examples": [
      {
        "tamil": "நாம் வண்ணத்துப்பூச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about butterfly."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "butterfly"
    ]
  },
  {
    "id": "ta-0642",
    "tamil": "வயது",
    "transliteration": "Vayathu",
    "english": "age",
    "meanings": [
      "age"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் வயது பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about age.",
    "examples": [
      {
        "tamil": "நாம் வயது பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about age."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "age"
    ]
  },
  {
    "id": "ta-0643",
    "tamil": "வயிறு",
    "transliteration": "Vayiru",
    "english": "stomach",
    "meanings": [
      "stomach"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் வயிறு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about stomach.",
    "examples": [
      {
        "tamil": "நாம் வயிறு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about stomach."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "stomach"
    ]
  },
  {
    "id": "ta-0644",
    "tamil": "வரலாறு",
    "transliteration": "Varalaaru",
    "english": "history",
    "meanings": [
      "history"
    ],
    "category": "Education",
    "categories": [
      "Education",
      "Culture"
    ],
    "example": "நாம் வரலாறு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about history.",
    "examples": [
      {
        "tamil": "நாம் வரலாறு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about history."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "history"
    ]
  },
  {
    "id": "ta-0645",
    "tamil": "வரவேற்கிறேன்",
    "transliteration": "Varavaerkiraen",
    "english": "welcome",
    "meanings": [
      "welcome"
    ],
    "category": "Common",
    "categories": [
      "Common"
    ],
    "example": "நாம் வரவேற்கிறேன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about welcome.",
    "examples": [
      {
        "tamil": "நாம் வரவேற்கிறேன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about welcome."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "welcome"
    ]
  },
  {
    "id": "ta-0646",
    "tamil": "வரை",
    "transliteration": "Varai",
    "english": "draw",
    "meanings": [
      "draw"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வரை முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to draw every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வரை முயற்சி செய்கிறேன்.",
        "english": "I try to draw every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "draw"
    ]
  },
  {
    "id": "ta-0647",
    "tamil": "வரைபடம்",
    "transliteration": "Varaipatam",
    "english": "map",
    "meanings": [
      "map"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் வரைபடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about map.",
    "examples": [
      {
        "tamil": "நாம் வரைபடம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about map."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "map"
    ]
  },
  {
    "id": "ta-0648",
    "tamil": "வலி",
    "transliteration": "Vali",
    "english": "pain",
    "meanings": [
      "pain"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் வலி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about pain.",
    "examples": [
      {
        "tamil": "நாம் வலி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about pain."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "pain"
    ]
  },
  {
    "id": "ta-0649",
    "tamil": "வலிமை",
    "transliteration": "Valimai",
    "english": "strength",
    "meanings": [
      "strength"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் வலிமை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about strength.",
    "examples": [
      {
        "tamil": "நாம் வலிமை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about strength."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "strength"
    ]
  },
  {
    "id": "ta-0650",
    "tamil": "வலிமையான",
    "transliteration": "Valimaiyaana",
    "english": "strong",
    "meanings": [
      "strong"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் வலிமையான.",
    "exampleTranslation": "This is very strong.",
    "examples": [
      {
        "tamil": "இது மிகவும் வலிமையான.",
        "english": "This is very strong."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "strong"
    ]
  },
  {
    "id": "ta-0651",
    "tamil": "வளர்",
    "transliteration": "Valar",
    "english": "grow",
    "meanings": [
      "grow"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வளர் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to grow every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வளர் முயற்சி செய்கிறேன்.",
        "english": "I try to grow every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "grow"
    ]
  },
  {
    "id": "ta-0652",
    "tamil": "வளர்ச்சி",
    "transliteration": "Valarchchi",
    "english": "development/growth",
    "meanings": [
      "development/growth",
      "development",
      "growth"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் வளர்ச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about development/growth.",
    "examples": [
      {
        "tamil": "நாம் வளர்ச்சி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about development/growth."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "development/growth"
    ]
  },
  {
    "id": "ta-0653",
    "tamil": "வழக்கம்",
    "transliteration": "Vazhakkam",
    "english": "custom",
    "meanings": [
      "custom"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் வழக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about custom.",
    "examples": [
      {
        "tamil": "நாம் வழக்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about custom."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "custom"
    ]
  },
  {
    "id": "ta-0654",
    "tamil": "வழி",
    "transliteration": "Vazhi",
    "english": "way/route",
    "meanings": [
      "way/route",
      "way",
      "route"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் வழி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about way/route.",
    "examples": [
      {
        "tamil": "நாம் வழி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about way/route."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "way/route"
    ]
  },
  {
    "id": "ta-0655",
    "tamil": "வா",
    "transliteration": "Vaa",
    "english": "come",
    "meanings": [
      "come"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வா முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to come every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வா முயற்சி செய்கிறேன்.",
        "english": "I try to come every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "come"
    ]
  },
  {
    "id": "ta-0656",
    "tamil": "வாக்கியம்",
    "transliteration": "Vaakkiyam",
    "english": "sentence",
    "meanings": [
      "sentence"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் வாக்கியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sentence.",
    "examples": [
      {
        "tamil": "நாம் வாக்கியம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sentence."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sentence"
    ]
  },
  {
    "id": "ta-0657",
    "tamil": "வாங்கு",
    "transliteration": "Vaangku",
    "english": "buy",
    "meanings": [
      "buy"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வாங்கு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to buy every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வாங்கு முயற்சி செய்கிறேன்.",
        "english": "I try to buy every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "buy"
    ]
  },
  {
    "id": "ta-0658",
    "tamil": "வாத்து",
    "transliteration": "Vaaththu",
    "english": "duck",
    "meanings": [
      "duck"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் வாத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about duck.",
    "examples": [
      {
        "tamil": "நாம் வாத்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about duck."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "duck"
    ]
  },
  {
    "id": "ta-0659",
    "tamil": "வானம்",
    "transliteration": "Vaanam",
    "english": "sky",
    "meanings": [
      "sky"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் வானம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sky.",
    "examples": [
      {
        "tamil": "நாம் வானம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sky."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sky"
    ]
  },
  {
    "id": "ta-0660",
    "tamil": "வானிலை",
    "transliteration": "Vaanilai",
    "english": "weather",
    "meanings": [
      "weather"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் வானிலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about weather.",
    "examples": [
      {
        "tamil": "நாம் வானிலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about weather."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "weather"
    ]
  },
  {
    "id": "ta-0661",
    "tamil": "வானொலி",
    "transliteration": "Vaanoli",
    "english": "radio",
    "meanings": [
      "radio"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் வானொலி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about radio.",
    "examples": [
      {
        "tamil": "நாம் வானொலி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about radio."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "radio"
    ]
  },
  {
    "id": "ta-0662",
    "tamil": "வாய்",
    "transliteration": "Vaay",
    "english": "mouth",
    "meanings": [
      "mouth"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் வாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about mouth.",
    "examples": [
      {
        "tamil": "நாம் வாய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about mouth."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "mouth"
    ]
  },
  {
    "id": "ta-0663",
    "tamil": "வாய்ப்பு",
    "transliteration": "Vaayppu",
    "english": "opportunity",
    "meanings": [
      "opportunity"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் வாய்ப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about opportunity.",
    "examples": [
      {
        "tamil": "நாம் வாய்ப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about opportunity."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "opportunity"
    ]
  },
  {
    "id": "ta-0664",
    "tamil": "வாரம்",
    "transliteration": "Vaaram",
    "english": "week",
    "meanings": [
      "week"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் வாரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about week.",
    "examples": [
      {
        "tamil": "நாம் வாரம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about week."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "week"
    ]
  },
  {
    "id": "ta-0665",
    "tamil": "வாளி",
    "transliteration": "Vaali",
    "english": "bucket",
    "meanings": [
      "bucket"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் வாளி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about bucket.",
    "examples": [
      {
        "tamil": "நாம் வாளி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about bucket."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "bucket"
    ]
  },
  {
    "id": "ta-0666",
    "tamil": "வாழைப்பழம்",
    "transliteration": "Vaazhaippazham",
    "english": "banana",
    "meanings": [
      "banana"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் வாழைப்பழம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about banana.",
    "examples": [
      {
        "tamil": "நாம் வாழைப்பழம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about banana."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "banana"
    ]
  },
  {
    "id": "ta-0667",
    "tamil": "வாழ்",
    "transliteration": "Vaazh",
    "english": "live",
    "meanings": [
      "live"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வாழ் முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to live every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வாழ் முயற்சி செய்கிறேன்.",
        "english": "I try to live every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "live"
    ]
  },
  {
    "id": "ta-0668",
    "tamil": "வாழ்க்கை",
    "transliteration": "Vaazhkkai",
    "english": "life",
    "meanings": [
      "life"
    ],
    "category": "Culture",
    "categories": [
      "Culture",
      "Abstract"
    ],
    "example": "நாம் வாழ்க்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about life.",
    "examples": [
      {
        "tamil": "நாம் வாழ்க்கை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about life."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "life"
    ]
  },
  {
    "id": "ta-0669",
    "tamil": "வாழ்த்து",
    "transliteration": "Vaazhththu",
    "english": "greeting/wish",
    "meanings": [
      "greeting/wish",
      "greeting",
      "wish"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் வாழ்த்து பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about greeting/wish.",
    "examples": [
      {
        "tamil": "நாம் வாழ்த்து பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about greeting/wish."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "greeting/wish"
    ]
  },
  {
    "id": "ta-0670",
    "tamil": "விசைப்பலகை",
    "transliteration": "Vichaippalakai",
    "english": "keyboard",
    "meanings": [
      "keyboard"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் விசைப்பலகை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about keyboard.",
    "examples": [
      {
        "tamil": "நாம் விசைப்பலகை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about keyboard."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "keyboard"
    ]
  },
  {
    "id": "ta-0671",
    "tamil": "விதி",
    "transliteration": "Vithi",
    "english": "rule",
    "meanings": [
      "rule"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் விதி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about rule.",
    "examples": [
      {
        "tamil": "நாம் விதி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about rule."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "rule"
    ]
  },
  {
    "id": "ta-0672",
    "tamil": "விதை",
    "transliteration": "Vithai",
    "english": "seed",
    "meanings": [
      "seed"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் விதை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about seed.",
    "examples": [
      {
        "tamil": "நாம் விதை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about seed."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "seed"
    ]
  },
  {
    "id": "ta-0673",
    "tamil": "வினாடி",
    "transliteration": "Vinaati",
    "english": "second",
    "meanings": [
      "second"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் வினாடி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about second.",
    "examples": [
      {
        "tamil": "நாம் வினாடி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about second."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "second"
    ]
  },
  {
    "id": "ta-0674",
    "tamil": "விமான நிலையம்",
    "transliteration": "Vimaana nilaiyam",
    "english": "airport",
    "meanings": [
      "airport"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் விமான நிலையம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about airport.",
    "examples": [
      {
        "tamil": "நாம் விமான நிலையம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about airport."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "airport"
    ]
  },
  {
    "id": "ta-0675",
    "tamil": "விமானம்",
    "transliteration": "Vimaanam",
    "english": "airplane",
    "meanings": [
      "airplane"
    ],
    "category": "Objects",
    "categories": [
      "Objects"
    ],
    "example": "நாம் விமானம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about airplane.",
    "examples": [
      {
        "tamil": "நாம் விமானம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about airplane."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "airplane"
    ]
  },
  {
    "id": "ta-0676",
    "tamil": "வியாழன்",
    "transliteration": "Viyaazhan",
    "english": "Thursday",
    "meanings": [
      "Thursday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் வியாழன் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Thursday.",
    "examples": [
      {
        "tamil": "நாம் வியாழன் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Thursday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Thursday",
      "thursday"
    ]
  },
  {
    "id": "ta-0677",
    "tamil": "விரல்",
    "transliteration": "Viral",
    "english": "finger",
    "meanings": [
      "finger"
    ],
    "category": "Body",
    "categories": [
      "Body"
    ],
    "example": "நாம் விரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about finger.",
    "examples": [
      {
        "tamil": "நாம் விரல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about finger."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "finger"
    ]
  },
  {
    "id": "ta-0678",
    "tamil": "விருந்தினர்",
    "transliteration": "Virunthinar",
    "english": "guest",
    "meanings": [
      "guest"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் விருந்தினர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about guest.",
    "examples": [
      {
        "tamil": "நாம் விருந்தினர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about guest."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "guest"
    ]
  },
  {
    "id": "ta-0679",
    "tamil": "விருந்தோம்பல்",
    "transliteration": "Virunthoampal",
    "english": "hospitality",
    "meanings": [
      "hospitality"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் விருந்தோம்பல் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hospitality.",
    "examples": [
      {
        "tamil": "நாம் விருந்தோம்பல் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hospitality."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hospitality"
    ]
  },
  {
    "id": "ta-0680",
    "tamil": "விருப்பம்",
    "transliteration": "Viruppam",
    "english": "liking/wish",
    "meanings": [
      "liking/wish",
      "liking",
      "wish"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் விருப்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about liking/wish.",
    "examples": [
      {
        "tamil": "நாம் விருப்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about liking/wish."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "liking/wish"
    ]
  },
  {
    "id": "ta-0681",
    "tamil": "விரும்பு",
    "transliteration": "Virumpu",
    "english": "want/like",
    "meanings": [
      "want/like",
      "want",
      "like"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் விரும்பு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to want/like every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் விரும்பு முயற்சி செய்கிறேன்.",
        "english": "I try to want/like every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "want/like"
    ]
  },
  {
    "id": "ta-0682",
    "tamil": "விற்று",
    "transliteration": "Virru",
    "english": "sell",
    "meanings": [
      "sell"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் விற்று முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to sell every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் விற்று முயற்சி செய்கிறேன்.",
        "english": "I try to sell every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "sell"
    ]
  },
  {
    "id": "ta-0683",
    "tamil": "விலங்கு",
    "transliteration": "Vilangku",
    "english": "animal",
    "meanings": [
      "animal"
    ],
    "category": "Animals",
    "categories": [
      "Animals"
    ],
    "example": "நாம் விலங்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about animal.",
    "examples": [
      {
        "tamil": "நாம் விலங்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about animal."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "animal"
    ]
  },
  {
    "id": "ta-0684",
    "tamil": "விலை",
    "transliteration": "Vilai",
    "english": "price",
    "meanings": [
      "price"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் விலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about price.",
    "examples": [
      {
        "tamil": "நாம் விலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about price."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "price"
    ]
  },
  {
    "id": "ta-0685",
    "tamil": "விளக்கு",
    "transliteration": "Vilakku",
    "english": "lamp; explain",
    "meanings": [
      "lamp; explain",
      "lamp",
      "explain"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living",
      "Verbs",
      "Verbs"
    ],
    "example": "நாம் விளக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about lamp.",
    "examples": [
      {
        "tamil": "நாம் விளக்கு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about lamp."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "lamp; explain",
      "lamp"
    ]
  },
  {
    "id": "ta-0686",
    "tamil": "விளையாட்டு",
    "transliteration": "Vilaiyaattu",
    "english": "game/sport",
    "meanings": [
      "game/sport",
      "game",
      "sport"
    ],
    "category": "Education",
    "categories": [
      "Education"
    ],
    "example": "நாம் விளையாட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about game/sport.",
    "examples": [
      {
        "tamil": "நாம் விளையாட்டு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about game/sport."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "game/sport"
    ]
  },
  {
    "id": "ta-0687",
    "tamil": "விளையாட்டு மைதானம்",
    "transliteration": "Vilaiyaattu maithaanam",
    "english": "playground",
    "meanings": [
      "playground"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் விளையாட்டு மைதானம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about playground.",
    "examples": [
      {
        "tamil": "நாம் விளையாட்டு மைதானம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about playground."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "playground"
    ]
  },
  {
    "id": "ta-0688",
    "tamil": "விளைவு",
    "transliteration": "Vilaivu",
    "english": "result/effect",
    "meanings": [
      "result/effect",
      "result",
      "effect"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் விளைவு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about result/effect.",
    "examples": [
      {
        "tamil": "நாம் விளைவு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about result/effect."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "result/effect"
    ]
  },
  {
    "id": "ta-0689",
    "tamil": "விழா",
    "transliteration": "Vizhaa",
    "english": "festival",
    "meanings": [
      "festival"
    ],
    "category": "Culture",
    "categories": [
      "Culture"
    ],
    "example": "நாம் விழா பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about festival.",
    "examples": [
      {
        "tamil": "நாம் விழா பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about festival."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "festival"
    ]
  },
  {
    "id": "ta-0690",
    "tamil": "விவசாயி",
    "transliteration": "Vivachaayi",
    "english": "farmer",
    "meanings": [
      "farmer"
    ],
    "category": "Family & People",
    "categories": [
      "Family & People"
    ],
    "example": "நாம் விவசாயி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about farmer.",
    "examples": [
      {
        "tamil": "நாம் விவசாயி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about farmer."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "farmer"
    ]
  },
  {
    "id": "ta-0691",
    "tamil": "வீடு",
    "transliteration": "Veetu",
    "english": "house",
    "meanings": [
      "house"
    ],
    "category": "Home & Living",
    "categories": [
      "Home & Living"
    ],
    "example": "நாம் வீடு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about house.",
    "examples": [
      {
        "tamil": "நாம் வீடு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about house."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "house"
    ]
  },
  {
    "id": "ta-0692",
    "tamil": "வீதி",
    "transliteration": "Veethi",
    "english": "street",
    "meanings": [
      "street"
    ],
    "category": "Places",
    "categories": [
      "Places"
    ],
    "example": "நாம் வீதி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about street.",
    "examples": [
      {
        "tamil": "நாம் வீதி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about street."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "street"
    ]
  },
  {
    "id": "ta-0693",
    "tamil": "வெங்காயம்",
    "transliteration": "Vengkaayam",
    "english": "onion",
    "meanings": [
      "onion"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் வெங்காயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about onion.",
    "examples": [
      {
        "tamil": "நாம் வெங்காயம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about onion."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "onion"
    ]
  },
  {
    "id": "ta-0694",
    "tamil": "வெட்கம்",
    "transliteration": "Vetkam",
    "english": "shame/shyness",
    "meanings": [
      "shame/shyness",
      "shame",
      "shyness"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் வெட்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about shame/shyness.",
    "examples": [
      {
        "tamil": "நாம் வெட்கம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about shame/shyness."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "shame/shyness"
    ]
  },
  {
    "id": "ta-0695",
    "tamil": "வெட்டு",
    "transliteration": "Vettu",
    "english": "cut",
    "meanings": [
      "cut"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வெட்டு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to cut every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வெட்டு முயற்சி செய்கிறேன்.",
        "english": "I try to cut every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "cut"
    ]
  },
  {
    "id": "ta-0696",
    "tamil": "வெண்ணெய்",
    "transliteration": "Venney",
    "english": "butter",
    "meanings": [
      "butter"
    ],
    "category": "Food & Drink",
    "categories": [
      "Food & Drink"
    ],
    "example": "நாம் வெண்ணெய் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about butter.",
    "examples": [
      {
        "tamil": "நாம் வெண்ணெய் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about butter."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "butter"
    ]
  },
  {
    "id": "ta-0697",
    "tamil": "வெப்பம்",
    "transliteration": "Veppam",
    "english": "heat",
    "meanings": [
      "heat"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் வெப்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about heat.",
    "examples": [
      {
        "tamil": "நாம் வெப்பம் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about heat."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "heat"
    ]
  },
  {
    "id": "ta-0698",
    "tamil": "வெயில்",
    "transliteration": "Veyil",
    "english": "sunshine",
    "meanings": [
      "sunshine"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் வெயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about sunshine.",
    "examples": [
      {
        "tamil": "நாம் வெயில் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about sunshine."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "sunshine"
    ]
  },
  {
    "id": "ta-0699",
    "tamil": "வெறுப்பு",
    "transliteration": "Veruppu",
    "english": "hatred/dislike",
    "meanings": [
      "hatred/dislike",
      "hatred",
      "dislike"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions"
    ],
    "example": "நாம் வெறுப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about hatred/dislike.",
    "examples": [
      {
        "tamil": "நாம் வெறுப்பு பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about hatred/dislike."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "hatred/dislike"
    ]
  },
  {
    "id": "ta-0700",
    "tamil": "வெற்றி",
    "transliteration": "Verri",
    "english": "success",
    "meanings": [
      "success"
    ],
    "category": "Emotions",
    "categories": [
      "Emotions",
      "Abstract"
    ],
    "example": "நாம் வெற்றி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about success.",
    "examples": [
      {
        "tamil": "நாம் வெற்றி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about success."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "success"
    ]
  },
  {
    "id": "ta-0701",
    "tamil": "வெற்றி பெறு",
    "transliteration": "Verri peru",
    "english": "succeed",
    "meanings": [
      "succeed"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வெற்றி பெறு முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to succeed every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வெற்றி பெறு முயற்சி செய்கிறேன்.",
        "english": "I try to succeed every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "succeed"
    ]
  },
  {
    "id": "ta-0702",
    "tamil": "வெளியே",
    "transliteration": "Veliyae",
    "english": "outside",
    "meanings": [
      "outside"
    ],
    "category": "Grammar",
    "categories": [
      "Grammar"
    ],
    "example": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: வெளியே.",
    "exampleTranslation": "We can use this word in a sentence: outside.",
    "examples": [
      {
        "tamil": "இந்த சொல்லை நாம் வாக்கியத்தில் பயன்படுத்தலாம்: வெளியே.",
        "english": "We can use this word in a sentence: outside."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "outside"
    ]
  },
  {
    "id": "ta-0703",
    "tamil": "வெள்ளி",
    "transliteration": "Velli",
    "english": "Friday",
    "meanings": [
      "Friday"
    ],
    "category": "Time",
    "categories": [
      "Time"
    ],
    "example": "நாம் வெள்ளி பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about Friday.",
    "examples": [
      {
        "tamil": "நாம் வெள்ளி பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about Friday."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "Friday",
      "friday"
    ]
  },
  {
    "id": "ta-0704",
    "tamil": "வேகமான",
    "transliteration": "Vaekamaana",
    "english": "fast",
    "meanings": [
      "fast"
    ],
    "category": "Qualities",
    "categories": [
      "Qualities"
    ],
    "example": "இது மிகவும் வேகமான.",
    "exampleTranslation": "This is very fast.",
    "examples": [
      {
        "tamil": "இது மிகவும் வேகமான.",
        "english": "This is very fast."
      }
    ],
    "partOfSpeech": "adjective",
    "searchAliases": [
      "fast"
    ]
  },
  {
    "id": "ta-0705",
    "tamil": "வேர்",
    "transliteration": "Vaer",
    "english": "root",
    "meanings": [
      "root"
    ],
    "category": "Nature",
    "categories": [
      "Nature"
    ],
    "example": "நாம் வேர் பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about root.",
    "examples": [
      {
        "tamil": "நாம் வேர் பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about root."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "root"
    ]
  },
  {
    "id": "ta-0706",
    "tamil": "வேலை",
    "transliteration": "Vaelai",
    "english": "work/job",
    "meanings": [
      "work/job",
      "work",
      "job"
    ],
    "category": "Abstract",
    "categories": [
      "Abstract"
    ],
    "example": "நாம் வேலை பற்றி இன்று கற்றுக்கொள்வோம்.",
    "exampleTranslation": "Today we will learn about work/job.",
    "examples": [
      {
        "tamil": "நாம் வேலை பற்றி இன்று கற்றுக்கொள்வோம்.",
        "english": "Today we will learn about work/job."
      }
    ],
    "partOfSpeech": "noun/phrase",
    "searchAliases": [
      "work/job"
    ]
  },
  {
    "id": "ta-0707",
    "tamil": "வை",
    "transliteration": "Vai",
    "english": "put/keep",
    "meanings": [
      "put/keep",
      "put",
      "keep"
    ],
    "category": "Verbs",
    "categories": [
      "Verbs"
    ],
    "example": "நான் தினமும் வை முயற்சி செய்கிறேன்.",
    "exampleTranslation": "I try to put/keep every day.",
    "examples": [
      {
        "tamil": "நான் தினமும் வை முயற்சி செய்கிறேன்.",
        "english": "I try to put/keep every day."
      }
    ],
    "partOfSpeech": "verb",
    "searchAliases": [
      "put/keep"
    ]
  }
];
