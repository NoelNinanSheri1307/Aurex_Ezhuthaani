# -*- coding: utf-8 -*-
"""Generates curriculum.json. Run once: python gen_curriculum.py"""
import json

UYIR = [
    ("அ","a","அம்மா","ammaa","mother"),
    ("ஆ","aa","ஆடு","aadu","goat"),
    ("இ","i","இலை","ilai","leaf"),
    ("ஈ","ii","ஈ","ii","fly"),
    ("உ","u","உடல்","udal","body"),
    ("ஊ","uu","ஊர்","uur","town"),
    ("எ","e","எலி","eli","mouse"),
    ("ஏ","ee","ஏணி","eeni","ladder"),
    ("ஐ","ai","ஐந்து","ainthu","five"),
    ("ஒ","o","ஒட்டகம்","ottagam","camel"),
    ("ஓ","oo","ஓடு","oodu","run"),
    ("ஔ","au","ஔவை","auvai","Auvai (poet)"),
]

MEI = [
    ("க்","k","கல்","kal","stone"),
    ("ங்","ng","மங்கை","mangai","young woman"),
    ("ச்","ch","சட்டை","chattai","shirt"),
    ("ஞ்","nj","ஞாயிறு","njaayiru","sun"),
    ("ட்","t","பட்டம்","pattam","kite"),
    ("ண்","N","மண்","maN","soil"),
    ("த்","th","தலை","thalai","head"),
    ("ந்","nh","நதி","nhathi","river"),
    ("ப்","p","பல்","pal","tooth"),
    ("ம்","m","மரம்","maram","tree"),
    ("ய்","y","வாய்","vaay","mouth"),
    ("ர்","r","மரம்","maram","tree"),
    ("ல்","l","பால்","paal","milk"),
    ("வ்","v","வானம்","vaanam","sky"),
    ("ழ்","zh","தமிழ்","thamizh","Tamil"),
    ("ள்","L","வாள்","vaaL","sword"),
    ("ற்","R","ஆறு","aaRu","river / six"),
    ("ன்","n","மீன்","meen","fish"),
]

def letters(rows):
    return [{"char": c, "tr": t, "example": {"ta": w, "tr": wt, "en": en}} for c, t, w, wt, en in rows]

def mcq(q, opts, a, hint=None):
    d = {"type": "mcq", "q": q, "options": opts, "answer": a}
    if hint: d["hint"] = hint
    return d

stages = []

# ---------------- STAGE 1: ADIPPADAI ----------------
stages.append({
  "id": "adippadai", "order": 1, "name": "Adippadai", "name_ta": "அடிப்படை",
  "subtitle": "Tamil Basics", "icon": "", "color": "emerald",
  "blurb": "What Tamil is, how its writing system is built, and your first sounds.",
  "milestone": {"title": "Thodakkam", "title_ta": "தொடக்கம்", "badge": "", "desc": "You understand how Tamil writing works."},
  "lessons": [
    {"id": "ad-1", "type": "read", "title": "Welcome to Tamil", "title_ta": "தமிழுக்கு வரவேற்பு", "xp": 10,
     "content": {"blocks": [
        {"h": "One of the world's oldest living languages",
         "p": "Tamil (தமிழ்) has been spoken and written continuously for over 2,000 years. It is an official language in India, Sri Lanka and Singapore, with around 80 million speakers."},
        {"h": "You already know the hardest part: showing up",
         "p": "Tamil script looks unfamiliar, but it is remarkably logical. Unlike English, Tamil is almost perfectly phonetic — once you know a letter, you always know its sound. No silent letters, no surprises."},
        {"h": "How this journey works",
         "p": "Seven stages. Each stage has lessons, then a milestone quiz. Pass the quiz and the next stage unlocks. Kili will be with you the whole way."}
     ]}},
    {"id": "ad-2", "type": "read", "title": "The Three Letter Families", "title_ta": "மூன்று எழுத்து வகைகள்", "xp": 15,
     "content": {"blocks": [
        {"h": "Uyir — உயிர் — 'life' letters", "p": "12 vowels. They can stand alone and be pronounced on their own. Think of them as the soul of a syllable.", "ta": "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ"},
        {"h": "Mei — மெய் — 'body' letters", "p": "18 consonants. A dot on top (called pulli · புள்ளி) means the consonant has no vowel attached. A body with no life cannot be spoken alone.", "ta": "க் ங் ச் ஞ் ட் ண் த் ந் ப் ம் ய் ர் ல் வ் ழ் ள் ற் ன்"},
        {"h": "Uyirmei — உயிர்மெய் — 'living body'", "p": "Combine a body with a life and you get a speakable syllable. 18 consonants × 12 vowels = 216 combinations. You will never memorise 216 things — you learn 30 pieces and combine them.", "ta": "க் + அ = க      க் + ஆ = கா      க் + இ = கி"},
        {"h": "Aaytham — ஆய்தம் — the special one", "p": "A single extra letter, ஃ, written as three dots. Rare, but it completes the alphabet: 12 + 18 + 1 = 31 base letters.", "ta": "ஃ"}
     ]}},
    {"id": "ad-3", "type": "vocab", "title": "Your First Words", "title_ta": "முதல் சொற்கள்", "xp": 20,
     "content": {"items": [
        {"ta": "வணக்கம்", "tr": "vaNakkam", "en": "Hello / greetings", "emoji": ""},
        {"ta": "நன்றி", "tr": "nanRi", "en": "Thank you", "emoji": ""},
        {"ta": "ஆம்", "tr": "aam", "en": "Yes", "emoji": ""},
        {"ta": "இல்லை", "tr": "illai", "en": "No", "emoji": ""},
        {"ta": "தமிழ்", "tr": "thamizh", "en": "Tamil", "emoji": ""},
        {"ta": "நான்", "tr": "naan", "en": "I / me", "emoji": ""},
        {"ta": "நீ", "tr": "nee", "en": "You", "emoji": ""},
        {"ta": "சரி", "tr": "sari", "en": "Okay / correct", "emoji": ""}
     ]}},
    {"id": "ad-4", "type": "letters", "title": "Tamil Numerals", "title_ta": "தமிழ் எண்கள்", "xp": 15,
     "content": {"note": "Traditional Tamil numerals. Modern Tamil uses 1 2 3, but these appear in old texts, temple inscriptions and calendars.",
       "items": [
        {"char": "௧", "tr": "1 — onRu", "example": {"ta": "ஒன்று", "tr": "onRu", "en": "one"}},
        {"char": "௨", "tr": "2 — iraNdu", "example": {"ta": "இரண்டு", "tr": "iraNdu", "en": "two"}},
        {"char": "௩", "tr": "3 — muunRu", "example": {"ta": "மூன்று", "tr": "muunRu", "en": "three"}},
        {"char": "௪", "tr": "4 — naangu", "example": {"ta": "நான்கு", "tr": "naangu", "en": "four"}},
        {"char": "௫", "tr": "5 — ainthu", "example": {"ta": "ஐந்து", "tr": "ainthu", "en": "five"}},
        {"char": "௬", "tr": "6 — aaRu", "example": {"ta": "ஆறு", "tr": "aaRu", "en": "six"}},
        {"char": "௭", "tr": "7 — eezhu", "example": {"ta": "ஏழு", "tr": "eezhu", "en": "seven"}},
        {"char": "௮", "tr": "8 — ettu", "example": {"ta": "எட்டு", "tr": "ettu", "en": "eight"}},
        {"char": "௯", "tr": "9 — onpathu", "example": {"ta": "ஒன்பது", "tr": "onpathu", "en": "nine"}},
        {"char": "௰", "tr": "10 — paththu", "example": {"ta": "பத்து", "tr": "paththu", "en": "ten"}}
     ]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("How many uyir (vowel) letters does Tamil have?", ["10", "12", "18", "31"], 1),
     mcq("What does the word 'mei' (மெய்) mean?", ["Life", "Body", "Sound", "Dot"], 1),
     mcq("What is the dot placed above a consonant called?", ["Pulli", "Aaytham", "Uyir", "Kural"], 0),
     mcq("How do you say 'Thank you' in Tamil?", ["வணக்கம்", "நன்றி", "சரி", "இல்லை"], 1),
     mcq("Uyirmei letters are formed by combining...", ["Two vowels", "A consonant and a vowel", "Two consonants", "A vowel and aaytham"], 1),
     mcq("How many uyirmei combinations exist in total?", ["144", "180", "216", "247"], 2),
     mcq("Which of these means 'Hello'?", ["நன்றி", "வணக்கம்", "நான்", "ஆம்"], 1),
     mcq("The Tamil numeral ௫ represents which number?", ["3", "4", "5", "8"], 2)
  ]}
})

# ---------------- STAGE 2: EZHUTHUKKAL ----------------
stages.append({
  "id": "ezhuthukkal", "order": 2, "name": "Ezhuthukkal", "name_ta": "எழுத்துக்கள்",
  "subtitle": "Tamil Letters", "icon": "", "color": "sky",
  "blurb": "All 12 vowels, 18 consonants, and the grid that combines them.",
  "milestone": {"title": "Ezhuthu Arivu", "title_ta": "எழுத்து அறிவு", "badge": "", "desc": "You can recognise every Tamil letter."},
  "lessons": [
    {"id": "ez-1", "type": "letters", "title": "The 12 Uyir Letters", "title_ta": "உயிர் எழுத்துக்கள்", "xp": 25,
     "content": {"note": "Tap any letter to hear it. Short and long pairs sit next to each other: அ/ஆ, இ/ஈ, உ/ஊ.", "items": letters(UYIR)}},
    {"id": "ez-2", "type": "letters", "title": "The 18 Mei Letters", "title_ta": "மெய் எழுத்துக்கள்", "xp": 30,
     "content": {"note": "Each carries a pulli (dot) on top, meaning 'no vowel attached'. Tamil has three l-sounds (ல ள ழ) and three n-sounds (ந ண ன) — these take practice.", "items": letters(MEI)}},
    {"id": "ez-3", "type": "grid", "title": "The Uyirmei Grid", "title_ta": "உயிர்மெய் அட்டவணை", "xp": 30,
     "content": {"note": "18 rows × 12 columns = 216 living letters. Pick any cell to see how the body and the life join together."}},
    {"id": "ez-4", "type": "letters", "title": "Look-alike Letters", "title_ta": "ஒத்த எழுத்துக்கள்", "xp": 20,
     "content": {"note": "These pairs trip up every beginner. Study the small differences carefully.", "items": [
        {"char": "ங", "tr": "nga", "example": {"ta": "vs ஈ (ii)", "tr": "ngaa vs ii", "en": "ங has a flat top bar; ஈ has a hook"}},
        {"char": "ன", "tr": "na (soft)", "example": {"ta": "vs ண (Na)", "tr": "na vs Na", "en": "ன is a simple loop; ண has an extra curl"}},
        {"char": "ல", "tr": "la", "example": {"ta": "vs ன (na)", "tr": "la vs na", "en": "ல opens upward, ன opens sideways"}},
        {"char": "ர", "tr": "ra", "example": {"ta": "vs ச (cha)", "tr": "ra vs cha", "en": "ச has a longer tail sweeping right"}},
        {"char": "வ", "tr": "va", "example": {"ta": "vs உ (u)", "tr": "va vs u", "en": "வ is closed at the bottom left"}},
        {"char": "ழ", "tr": "zha", "example": {"ta": "vs ம (ma)", "tr": "zha vs ma", "en": "ழ has the signature inner curl — the sound Tamil is famous for"}}
     ]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("Which letter is 'aa'?", ["அ", "ஆ", "இ", "ஈ"], 1),
     mcq("What sound does ழ make?", ["la", "zha", "La", "ra"], 1),
     mcq("Which letter is 'ma'?", ["ம", "ய", "வ", "ழ"], 0),
     mcq("The word தமிழ் ends with which letter?", ["ல்", "ள்", "ழ்", "ர்"], 2),
     mcq("Which of these is a mei (consonant) letter?", ["ஏ", "ஔ", "ந்", "ஐ"], 2),
     mcq("Which vowel is the long form of உ?", ["ஊ", "ஓ", "ஈ", "ஏ"], 0),
     mcq("Which letter makes the 'pa' sound?", ["ப", "ம", "த", "ட"], 0),
     mcq("How many mei letters are there?", ["12", "16", "18", "21"], 2),
     mcq("ஃ is called...", ["Pulli", "Aaytham", "Uyirmei", "Kombu"], 1),
     mcq("Which pair is most often confused by beginners?", ["அ and ஒ", "ண and ன", "க and ப", "ஏ and ஓ"], 1)
  ]}
})

# ---------------- STAGE 3: WRITING ----------------
stages.append({
  "id": "payirchi", "order": 3, "name": "Ezhuthu Payirchi", "name_ta": "எழுத்துப் பயிற்சி",
  "subtitle": "Writing Practice", "icon": "", "color": "amber",
  "blurb": "Trace real Tamil letters with your finger. Kili scores every stroke.",
  "milestone": {"title": "Kai Ezhuthu", "title_ta": "கை எழுத்து", "badge": "", "desc": "You can write Tamil letters by hand."},
  "lessons": [
    {"id": "wr-1", "type": "trace", "title": "Trace: First Vowels", "title_ta": "உயிர் எழுதுதல் — 1", "xp": 30,
     "content": {"note": "Draw over the grey letter. Kili scores your coverage and your neatness.", "items": [
        {"char": "அ", "tr": "a"}, {"char": "ஆ", "tr": "aa"}, {"char": "இ", "tr": "i"}, {"char": "உ", "tr": "u"}]}},
    {"id": "wr-2", "type": "trace", "title": "Trace: More Vowels", "title_ta": "உயிர் எழுதுதல் — 2", "xp": 30,
     "content": {"note": "Longer vowels have more curves. Slow down — accuracy beats speed.", "items": [
        {"char": "எ", "tr": "e"}, {"char": "ஏ", "tr": "ee"}, {"char": "ஐ", "tr": "ai"}, {"char": "ஓ", "tr": "oo"}]}},
    {"id": "wr-3", "type": "trace", "title": "Trace: Core Consonants", "title_ta": "மெய் எழுதுதல்", "xp": 35,
     "content": {"note": "Write the body first, then add the pulli dot on top.", "items": [
        {"char": "க", "tr": "ka"}, {"char": "ம", "tr": "ma"}, {"char": "த", "tr": "tha"}, {"char": "ப", "tr": "pa"}, {"char": "ந", "tr": "nha"}]}},
    {"id": "wr-4", "type": "trace", "title": "Trace: The Hard Ones", "title_ta": "கடினமான எழுத்துக்கள்", "xp": 40,
     "content": {"note": "The letters that define Tamil handwriting. ழ is the one to master.", "items": [
        {"char": "ழ", "tr": "zha"}, {"char": "ள", "tr": "La"}, {"char": "ண", "tr": "Na"}, {"char": "ஞ", "tr": "nja"}, {"char": "ங", "tr": "nga"}]}},
    {"id": "wr-5", "type": "trace", "title": "Trace: Write a Word", "title_ta": "சொல் எழுதுதல்", "xp": 45,
     "content": {"note": "Full words now. Take your time — this is the milestone challenge.", "items": [
        {"char": "தமிழ்", "tr": "thamizh — Tamil"}, {"char": "அம்மா", "tr": "ammaa — mother"}, {"char": "நன்றி", "tr": "nanRi — thank you"}]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("When writing a mei letter, where does the pulli go?", ["Below the letter", "On top of the letter", "To the right", "Inside the loop"], 1),
     mcq("Which vowel sign is added to க to make கா?", ["ி", "ா", "ெ", "ு"], 1),
     mcq("க + ி = ?", ["கா", "கி", "கு", "கே"], 1),
     mcq("Which letter is generally considered the hardest to write?", ["க", "ம", "ழ", "ப"], 2),
     mcq("Tamil is traditionally written in which direction?", ["Right to left", "Left to right", "Top to bottom", "Boustrophedon"], 1),
     mcq("What does removing the pulli from க் produce?", ["க", "கா", "கி", "ஃ"], 0),
     mcq("The word அம்மா contains how many mei-with-pulli letters?", ["0", "1", "2", "3"], 1)
  ]}
})

# ---------------- STAGE 4: WORDS ----------------
stages.append({
  "id": "sollkal", "order": 4, "name": "Sollkal", "name_ta": "சொற்கள்",
  "subtitle": "Words & Vocabulary", "icon": "", "color": "violet",
  "blurb": "Build a working vocabulary: family, food, colours, animals, verbs.",
  "milestone": {"title": "Sol Vangi", "title_ta": "சொல் வங்கி", "badge": "", "desc": "You hold a starter vocabulary of everyday Tamil."},
  "lessons": [
    {"id": "wo-1", "type": "vocab", "title": "Family", "title_ta": "குடும்பம்", "xp": 25,
     "content": {"items": [
        {"ta": "அம்மா", "tr": "ammaa", "en": "mother", "emoji": ""},
        {"ta": "அப்பா", "tr": "appaa", "en": "father", "emoji": ""},
        {"ta": "அண்ணன்", "tr": "aNNan", "en": "elder brother", "emoji": ""},
        {"ta": "தம்பி", "tr": "thambi", "en": "younger brother", "emoji": ""},
        {"ta": "அக்கா", "tr": "akkaa", "en": "elder sister", "emoji": ""},
        {"ta": "தங்கை", "tr": "thangai", "en": "younger sister", "emoji": ""},
        {"ta": "பாட்டி", "tr": "paatti", "en": "grandmother", "emoji": ""},
        {"ta": "தாத்தா", "tr": "thaaththaa", "en": "grandfather", "emoji": ""},
        {"ta": "குடும்பம்", "tr": "kudumbam", "en": "family", "emoji": "‍‍"}]}},
    {"id": "wo-2", "type": "vocab", "title": "Food & Drink", "title_ta": "உணவு", "xp": 25,
     "content": {"items": [
        {"ta": "சாப்பாடு", "tr": "saappaadu", "en": "meal / food", "emoji": ""},
        {"ta": "தண்ணீர்", "tr": "thaNNeer", "en": "water", "emoji": ""},
        {"ta": "பால்", "tr": "paal", "en": "milk", "emoji": ""},
        {"ta": "அரிசி", "tr": "arisi", "en": "rice", "emoji": ""},
        {"ta": "இட்லி", "tr": "idli", "en": "idli", "emoji": ""},
        {"ta": "தோசை", "tr": "thosai", "en": "dosa", "emoji": ""},
        {"ta": "காபி", "tr": "kaapi", "en": "coffee", "emoji": ""},
        {"ta": "பழம்", "tr": "pazham", "en": "fruit", "emoji": ""},
        {"ta": "இனிப்பு", "tr": "inippu", "en": "sweet", "emoji": ""}]}},
    {"id": "wo-3", "type": "vocab", "title": "Colours & Nature", "title_ta": "நிறங்கள்", "xp": 25,
     "content": {"items": [
        {"ta": "சிவப்பு", "tr": "sivappu", "en": "red", "emoji": ""},
        {"ta": "நீலம்", "tr": "neelam", "en": "blue", "emoji": ""},
        {"ta": "பச்சை", "tr": "pachchai", "en": "green", "emoji": ""},
        {"ta": "மஞ்சள்", "tr": "manjaL", "en": "yellow", "emoji": ""},
        {"ta": "கருப்பு", "tr": "karuppu", "en": "black", "emoji": ""},
        {"ta": "வெள்ளை", "tr": "veLLai", "en": "white", "emoji": ""},
        {"ta": "சூரியன்", "tr": "suuriyan", "en": "sun", "emoji": ""},
        {"ta": "நிலா", "tr": "nilaa", "en": "moon", "emoji": ""},
        {"ta": "மரம்", "tr": "maram", "en": "tree", "emoji": ""},
        {"ta": "மழை", "tr": "mazhai", "en": "rain", "emoji": ""}]}},
    {"id": "wo-4", "type": "vocab", "title": "Animals", "title_ta": "விலங்குகள்", "xp": 25,
     "content": {"items": [
        {"ta": "கிளி", "tr": "kiLi", "en": "parrot — our mascot!", "emoji": ""},
        {"ta": "நாய்", "tr": "naay", "en": "dog", "emoji": ""},
        {"ta": "பூனை", "tr": "puunai", "en": "cat", "emoji": ""},
        {"ta": "மாடு", "tr": "maadu", "en": "cow", "emoji": ""},
        {"ta": "யானை", "tr": "yaanai", "en": "elephant", "emoji": ""},
        {"ta": "புலி", "tr": "puli", "en": "tiger", "emoji": ""},
        {"ta": "மீன்", "tr": "meen", "en": "fish", "emoji": ""},
        {"ta": "குதிரை", "tr": "kuthirai", "en": "horse", "emoji": ""},
        {"ta": "ஆடு", "tr": "aadu", "en": "goat", "emoji": ""}]}},
    {"id": "wo-5", "type": "vocab", "title": "Everyday Verbs", "title_ta": "வினைச்சொற்கள்", "xp": 30,
     "content": {"note": "Tamil verbs are given here in the root form used for commands.", "items": [
        {"ta": "வா", "tr": "vaa", "en": "come", "emoji": ""},
        {"ta": "போ", "tr": "poo", "en": "go", "emoji": ""},
        {"ta": "சாப்பிடு", "tr": "saappidu", "en": "eat", "emoji": ""},
        {"ta": "குடி", "tr": "kudi", "en": "drink", "emoji": ""},
        {"ta": "படி", "tr": "padi", "en": "read / study", "emoji": ""},
        {"ta": "எழுது", "tr": "ezhuthu", "en": "write", "emoji": ""},
        {"ta": "பார்", "tr": "paar", "en": "look / see", "emoji": ""},
        {"ta": "கேள்", "tr": "keeL", "en": "listen / ask", "emoji": ""},
        {"ta": "தூங்கு", "tr": "thuungu", "en": "sleep", "emoji": ""},
        {"ta": "பேசு", "tr": "peesu", "en": "speak", "emoji": ""}]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("What does அம்மா mean?", ["father", "mother", "sister", "grandmother"], 1),
     mcq("Which word means 'water'?", ["பால்", "தண்ணீர்", "காபி", "பழம்"], 1),
     mcq("கிளி means...", ["crow", "parrot", "peacock", "sparrow"], 1),
     mcq("How do you say 'read / study'?", ["எழுது", "படி", "பேசு", "பார்"], 1),
     mcq("Which colour is பச்சை?", ["red", "blue", "green", "yellow"], 2),
     mcq("யானை is which animal?", ["horse", "tiger", "elephant", "cow"], 2),
     mcq("What does தம்பி mean?", ["elder brother", "younger brother", "elder sister", "uncle"], 1),
     mcq("Which word means 'write'?", ["எழுது", "படி", "குடி", "வா"], 0),
     mcq("மழை means...", ["sun", "moon", "rain", "tree"], 2),
     mcq("Which of these is a food word?", ["நிலா", "தோசை", "புலி", "நீலம்"], 1)
  ]}
})

# ---------------- STAGE 5: SENTENCES ----------------
stages.append({
  "id": "vaakkiyam", "order": 5, "name": "Vaakkiyangal", "name_ta": "வாக்கியங்கள்",
  "subtitle": "Sentences", "icon": "", "color": "rose",
  "blurb": "Put words in Tamil order and form real sentences.",
  "milestone": {"title": "Vaakkiya Amaippu", "title_ta": "வாக்கிய அமைப்பு", "badge": "", "desc": "You can build and read Tamil sentences."},
  "lessons": [
    {"id": "se-1", "type": "read", "title": "Tamil Word Order", "title_ta": "சொல் வரிசை", "xp": 20,
     "content": {"blocks": [
        {"h": "Subject → Object → Verb", "p": "English says 'I eat rice'. Tamil says 'I rice eat'. The verb almost always lands at the end of the sentence. Once this clicks, Tamil sentences stop looking scrambled.", "ta": "நான் சாதம் சாப்பிடுகிறேன்.\nnaan saatham saappidugiREn.\n(I) (rice) (eat) → I eat rice."},
        {"h": "No 'is' needed", "p": "Tamil usually drops the verb 'to be' in simple statements. 'This is a book' is simply 'This book'.", "ta": "இது புத்தகம்.\nithu puththagam.\nThis (is a) book."},
        {"h": "Questions add ஆ", "p": "Attach the suffix -ஆ to turn a statement into a yes/no question.", "ta": "இது புத்தகமா?\nithu puththagamaa?\nIs this a book?"}
     ]}},
    {"id": "se-2", "type": "sentence", "title": "Everyday Sentences", "title_ta": "அன்றாட வாக்கியங்கள்", "xp": 30,
     "content": {"items": [
        {"ta": "என் பெயர் கிளி.", "tr": "en peyar kiLi.", "en": "My name is Kili.", "parts": [["என்","my"],["பெயர்","name"],["கிளி","Kili"]]},
        {"ta": "நான் தமிழ் படிக்கிறேன்.", "tr": "naan thamizh padikkiREn.", "en": "I am learning Tamil.", "parts": [["நான்","I"],["தமிழ்","Tamil"],["படிக்கிறேன்","am studying"]]},
        {"ta": "இது என் புத்தகம்.", "tr": "ithu en puththagam.", "en": "This is my book.", "parts": [["இது","this"],["என்","my"],["புத்தகம்","book"]]},
        {"ta": "நீ எங்கே போகிறாய்?", "tr": "nee engee poogiRaay?", "en": "Where are you going?", "parts": [["நீ","you"],["எங்கே","where"],["போகிறாய்","are going"]]},
        {"ta": "எனக்குப் பசிக்கிறது.", "tr": "enakkup pasikkiRathu.", "en": "I am hungry.", "parts": [["எனக்கு","to me"],["பசிக்கிறது","hunger happens"]]},
        {"ta": "அம்மா சாப்பாடு சமைக்கிறார்.", "tr": "ammaa saappaadu samaikkiRaar.", "en": "Mother is cooking food.", "parts": [["அம்மா","mother"],["சாப்பாடு","food"],["சமைக்கிறார்","is cooking"]]}]}},
    {"id": "se-3", "type": "sentence", "title": "Asking Questions", "title_ta": "கேள்விகள்", "xp": 30,
     "content": {"items": [
        {"ta": "உங்கள் பெயர் என்ன?", "tr": "ungaL peyar enna?", "en": "What is your name?", "parts": [["உங்கள்","your"],["பெயர்","name"],["என்ன","what"]]},
        {"ta": "நீங்கள் எப்படி இருக்கிறீர்கள்?", "tr": "neengaL eppadi irukkiReergaL?", "en": "How are you?", "parts": [["நீங்கள்","you (polite)"],["எப்படி","how"],["இருக்கிறீர்கள்","are"]]},
        {"ta": "இது எவ்வளவு?", "tr": "ithu evvaLavu?", "en": "How much is this?", "parts": [["இது","this"],["எவ்வளவு","how much"]]},
        {"ta": "தண்ணீர் எங்கே இருக்கிறது?", "tr": "thaNNeer engee irukkiRathu?", "en": "Where is the water?", "parts": [["தண்ணீர்","water"],["எங்கே","where"],["இருக்கிறது","is"]]},
        {"ta": "உனக்கு தமிழ் தெரியுமா?", "tr": "unakku thamizh theriyumaa?", "en": "Do you know Tamil?", "parts": [["உனக்கு","to you"],["தமிழ்","Tamil"],["தெரியுமா","is known?"]]}]}},
    {"id": "se-4", "type": "build", "title": "Build the Sentence", "title_ta": "வாக்கியம் அமை", "xp": 40,
     "content": {"note": "Tap the words in the correct Tamil order.", "items": [
        {"en": "I eat rice.", "ta": "நான் சாதம் சாப்பிடுகிறேன்", "words": ["நான்", "சாதம்", "சாப்பிடுகிறேன்"]},
        {"en": "This is my book.", "ta": "இது என் புத்தகம்", "words": ["இது", "என்", "புத்தகம்"]},
        {"en": "Mother is cooking food.", "ta": "அம்மா சாப்பாடு சமைக்கிறார்", "words": ["அம்மா", "சாப்பாடு", "சமைக்கிறார்"]},
        {"en": "What is your name?", "ta": "உங்கள் பெயர் என்ன", "words": ["உங்கள்", "பெயர்", "என்ன"]},
        {"en": "I am learning Tamil.", "ta": "நான் தமிழ் படிக்கிறேன்", "words": ["நான்", "தமிழ்", "படிக்கிறேன்"]}]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("What is the standard Tamil word order?", ["Subject-Verb-Object", "Subject-Object-Verb", "Verb-Subject-Object", "Object-Verb-Subject"], 1),
     mcq("'என் பெயர்' means...", ["your name", "my name", "his name", "what name"], 1),
     mcq("Which suffix turns a statement into a yes/no question?", ["-ஆ", "-கு", "-இல்", "-உம்"], 0),
     mcq("How do you ask 'What is your name?'", ["நீ எங்கே போகிறாய்?", "உங்கள் பெயர் என்ன?", "இது எவ்வளவு?", "எனக்குப் பசிக்கிறது"], 1),
     mcq("'எங்கே' means...", ["what", "how", "where", "when"], 2),
     mcq("In 'நான் தமிழ் படிக்கிறேன்', which word is the verb?", ["நான்", "தமிழ்", "படிக்கிறேன்", "none"], 2),
     mcq("Tamil simple statements usually omit which verb?", ["to have", "to be", "to go", "to do"], 1),
     mcq("'எப்படி இருக்கிறீர்கள்?' asks...", ["Where are you?", "Who are you?", "How are you?", "What is this?"], 2)
  ]}
})

# ---------------- STAGE 6: READING ----------------
stages.append({
  "id": "vasippu", "order": 6, "name": "Vasippu", "name_ta": "வாசிப்பு",
  "subtitle": "Reading", "icon": "", "color": "cyan",
  "blurb": "Read connected Tamil passages and answer comprehension questions.",
  "milestone": {"title": "Vasippu Thiran", "title_ta": "வாசிப்புத் திறன்", "badge": "", "desc": "You can read and understand short Tamil passages."},
  "lessons": [
    {"id": "re-1", "type": "reading", "title": "Kili's Morning", "title_ta": "கிளியின் காலை", "xp": 35,
     "content": {"lines": [
        {"ta": "கிளி ஒரு பச்சை பறவை.", "tr": "kiLi oru pachchai paRavai.", "en": "Kili is a green bird."},
        {"ta": "அது காலையில் எழுந்தது.", "tr": "athu kaalaiyil ezhunthathu.", "en": "It woke up in the morning."},
        {"ta": "கிளி ஒரு பழம் சாப்பிட்டது.", "tr": "kiLi oru pazham saappittathu.", "en": "Kili ate a fruit."},
        {"ta": "பிறகு அது மரத்தில் அமர்ந்தது.", "tr": "piRagu athu maraththil amarnthathu.", "en": "Then it sat on the tree."},
        {"ta": "கிளி தமிழ் பாடல் பாடியது.", "tr": "kiLi thamizh paadal paadiyathu.", "en": "Kili sang a Tamil song."}],
      "questions": [
        mcq("What colour is Kili?", ["red", "green", "blue", "yellow"], 1),
        mcq("What did Kili eat?", ["rice", "a fruit", "milk", "nothing"], 1),
        mcq("Where did Kili sit?", ["on the ground", "on a tree", "on a house", "in water"], 1)]}},
    {"id": "re-2", "type": "reading", "title": "At the Market", "title_ta": "கடைத்தெருவில்", "xp": 35,
     "content": {"lines": [
        {"ta": "அம்மா கடைக்குப் போனார்.", "tr": "ammaa kadaikkup poonaar.", "en": "Mother went to the shop."},
        {"ta": "அவர் அரிசியும் பழமும் வாங்கினார்.", "tr": "avar arisiyum pazhamum vaanginaar.", "en": "She bought rice and fruit."},
        {"ta": "“இது எவ்வளவு?” என்று கேட்டார்.", "tr": "“ithu evvaLavu?” enRu keettaar.", "en": "“How much is this?” she asked."},
        {"ta": "கடைக்காரர் “ஐம்பது ரூபாய்” என்றார்.", "tr": "kadaikkaarar “aimbathu ruubaay” enRaar.", "en": "The shopkeeper said “fifty rupees”."},
        {"ta": "அம்மா பணம் கொடுத்து வீட்டுக்கு வந்தார்.", "tr": "ammaa paNam koduththu veettukku vanthaar.", "en": "Mother paid and came home."}],
      "questions": [
        mcq("Where did mother go?", ["to school", "to the shop", "to the temple", "to the farm"], 1),
        mcq("What did she buy?", ["rice and fruit", "milk and coffee", "a book", "clothes"], 0),
        mcq("What was the price?", ["fifteen rupees", "fifty rupees", "five rupees", "hundred rupees"], 1)]}},
    {"id": "re-3", "type": "reading", "title": "The Thirsty Crow", "title_ta": "தாகமுள்ள காகம்", "xp": 40,
     "content": {"note": "A classic folk tale, retold in simple Tamil.",
      "lines": [
        {"ta": "ஒரு காகத்திற்கு மிகவும் தாகம்.", "tr": "oru kaagaththiRku migavum thaagam.", "en": "A crow was very thirsty."},
        {"ta": "அது ஒரு பானையைப் பார்த்தது.", "tr": "athu oru paanaiyaip paarththathu.", "en": "It saw a pot."},
        {"ta": "பானையில் கொஞ்சம் தண்ணீர் இருந்தது.", "tr": "paanaiyil konjam thaNNeer irunthathu.", "en": "There was a little water in the pot."},
        {"ta": "காகம் கற்களைப் போட்டது.", "tr": "kaagam kaRkaLaip poottathu.", "en": "The crow dropped stones in."},
        {"ta": "தண்ணீர் மேலே வந்தது.", "tr": "thaNNeer meelee vanthathu.", "en": "The water rose up."},
        {"ta": "காகம் தண்ணீர் குடித்தது. புத்தி பலம்!", "tr": "kaagam thaNNeer kudiththathu. puththi balam!", "en": "The crow drank the water. Cleverness is strength!"}],
      "questions": [
        mcq("What was the crow's problem?", ["it was hungry", "it was thirsty", "it was lost", "it was tired"], 1),
        mcq("What did the crow put in the pot?", ["leaves", "stones", "sticks", "sand"], 1),
        mcq("What is the moral?", ["Be fast", "Be strong", "Cleverness is strength", "Share with others"], 2)]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("'பறவை' means...", ["fish", "bird", "flower", "stone"], 1),
     mcq("'கடை' means...", ["home", "shop", "school", "road"], 1),
     mcq("'தாகம்' means...", ["hunger", "thirst", "sleep", "fear"], 1),
     mcq("'வீடு' means...", ["house", "tree", "road", "river"], 0),
     mcq("In 'அம்மா கடைக்குப் போனார்', what does போனார் mean?", ["came", "went", "bought", "asked"], 1),
     mcq("'கல்' / 'கற்கள்' means...", ["stone / stones", "word / words", "hand / hands", "day / days"], 0),
     mcq("The suffix -உம் ... -உம் is used to mean...", ["or", "and (both)", "not", "if"], 1),
     mcq("'காலையில்' means...", ["at night", "in the morning", "yesterday", "tomorrow"], 1),
     mcq("Which sentence means 'It saw a pot'?", ["அது ஒரு பானையைப் பார்த்தது", "அது தண்ணீர் குடித்தது", "அது மரத்தில் அமர்ந்தது", "அது பாடல் பாடியது"], 0)
  ]}
})

# ---------------- STAGE 7: BOOKS ----------------
stages.append({
  "id": "puthagam", "order": 7, "name": "Puthagangal", "name_ta": "புத்தகங்கள்",
  "subtitle": "Reading Tamil Books", "icon": "", "color": "indigo",
  "blurb": "Step into real Tamil literature — Thirukkural and Aathichoodi.",
  "milestone": {"title": "Ilakkiya Payanam", "title_ta": "இலக்கியப் பயணம்", "badge": "", "desc": "You can read classical Tamil literature. The journey is complete."},
  "lessons": [
    {"id": "bk-1", "type": "read", "title": "What Tamil Books Await You", "title_ta": "தமிழ் இலக்கியம்", "xp": 20,
     "content": {"blocks": [
        {"h": "Sangam literature (300 BCE – 300 CE)", "p": "The oldest body of Tamil poetry: Kurunthogai, Purananuru, Natrinai. Poems about love, war, land and longing, written two thousand years ago and still startlingly direct."},
        {"h": "Thirukkural", "p": "1,330 couplets by Thiruvalluvar on virtue, wealth and love. Each kural is just seven words. It is the most quoted Tamil text in the world and the perfect first book — short units, huge ideas."},
        {"h": "Aathichoodi", "p": "Written by the poet Avvaiyar for children: one short moral line per letter of the alphabet. This is where most Tamil children begin reading."},
        {"h": "Modern Tamil", "p": "Once you are comfortable with the classics, modern novels and short stories open up. But start where Tamil itself starts — with Avvaiyar."}
     ]}},
    {"id": "bk-2", "type": "reading", "title": "Aathichoodi — First Lines", "title_ta": "ஆத்திசூடி", "xp": 40,
     "content": {"note": "By Avvaiyar. One line per letter, in alphabetical order. Written for beginners — exactly like you.",
      "lines": [
        {"ta": "அறம் செய விரும்பு.", "tr": "aRam seya virumbu.", "en": "Desire to do good deeds."},
        {"ta": "ஆறுவது சினம்.", "tr": "aaRuvathu sinam.", "en": "Anger is a thing to be cooled."},
        {"ta": "இயல்வது கரவேல்.", "tr": "iyalvathu karavEl.", "en": "Do not hide what you are able to give."},
        {"ta": "ஈவது விலக்கேல்.", "tr": "eevathu vilakkEl.", "en": "Do not prevent charity."},
        {"ta": "உடையது விளம்பேல்.", "tr": "udaiyathu viLambEl.", "en": "Do not boast of what you own."}],
      "questions": [
        mcq("'அறம்' means...", ["wealth", "virtue / good deeds", "anger", "anger"], 1),
        mcq("What does 'ஆறுவது சினம்' teach?", ["Be generous", "Cool your anger", "Study daily", "Respect elders"], 1),
        mcq("Why is Aathichoodi arranged this way?", ["By length", "By author", "In alphabetical order", "Randomly"], 2)]}},
    {"id": "bk-3", "type": "reading", "title": "Thirukkural — On Learning", "title_ta": "திருக்குறள் — கல்வி", "xp": 45,
     "content": {"note": "Chapter 40, Kalvi (Learning). By Thiruvalluvar, roughly 2,000 years old.",
      "lines": [
        {"ta": "கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.", "tr": "kaRka kasadaRak kaRpavai kaRRapin / niRka atharkuth thaga.", "en": "Learn thoroughly what is worth learning — then live by what you have learned."},
        {"ta": "தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்\nகற்றனைத் தூறும் அறிவு.", "tr": "thottanaith thuuRum maNaRkeeNi maantharkkuk / kaRRanaith thuuRum aRivu.", "en": "As a sand-well yields water the deeper you dig, so knowledge flows the more one learns."},
        {"ta": "கேடில் விழுச்செல்வம் கல்வி ஒருவற்கு\nமாடல்ல மற்றை யவை.", "tr": "keedil vizhuchchelvam kalvi oruvaRku / maadalla maRRai yavai.", "en": "Learning is the imperishable wealth; all other riches are not true wealth."}],
      "questions": [
        mcq("'கல்வி' means...", ["wealth", "learning / education", "friendship", "farming"], 1),
        mcq("What image describes knowledge growing with study?", ["A rising river", "A sand-well yielding water", "A burning lamp", "A climbing vine"], 1),
        mcq("According to the third kural, what is the imperishable wealth?", ["gold", "land", "learning", "fame"], 2),
        mcq("How many lines does a kural have?", ["one", "two", "four", "seven"], 1)]}},
    {"id": "bk-4", "type": "reading", "title": "Your First Whole Page", "title_ta": "முதல் பக்கம்", "xp": 50,
     "content": {"note": "No transliteration crutch on the first read. Try it in Tamil alone, then check yourself.",
      "hide_tr": True,
      "lines": [
        {"ta": "தமிழ் ஒரு பழமையான மொழி.", "tr": "thamizh oru pazhamaiyaana mozhi.", "en": "Tamil is an ancient language."},
        {"ta": "இரண்டாயிரம் ஆண்டுகளாக மக்கள் தமிழில் எழுதுகிறார்கள்.", "tr": "iraNdaayiram aaNdugaLaaga makkaL thamizhil ezhuthugiRaargaL.", "en": "For two thousand years people have written in Tamil."},
        {"ta": "சங்க இலக்கியம் மிகப் பழமையான நூல்கள்.", "tr": "sanga ilakkiyam migap pazhamaiyaana nuulgaL.", "en": "Sangam literature is the oldest body of books."},
        {"ta": "திருக்குறள் உலகம் முழுவதும் பரவியது.", "tr": "thirukkuRaL ulagam muzhuvathum paraviyathu.", "en": "The Thirukkural spread throughout the world."},
        {"ta": "இப்போது நீங்களும் தமிழ் படிக்கிறீர்கள்.", "tr": "ippoothu neengaLum thamizh padikkiReergaL.", "en": "Now you too are reading Tamil."},
        {"ta": "இது ஒரு தொடக்கம் மட்டுமே. வாழ்த்துக்கள்!", "tr": "ithu oru thodakkam mattumee. vaazhththukkaL!", "en": "This is only a beginning. Congratulations!"}],
      "questions": [
        mcq("'மொழி' means...", ["book", "language", "people", "world"], 1),
        mcq("'இரண்டாயிரம் ஆண்டுகள்' means...", ["two hundred years", "two thousand years", "twenty years", "two million years"], 1),
        mcq("'நூல்' means...", ["book / text", "song", "letter", "river"], 0),
        mcq("What does the final line say?", ["This is the end", "This is only a beginning", "This is difficult", "This is a book"], 1)]}}
  ],
  "quiz": {"pass_score": 70, "questions": [
     mcq("Who wrote the Thirukkural?", ["Avvaiyar", "Thiruvalluvar", "Kambar", "Bharathiyar"], 1),
     mcq("How many kurals are there in total?", ["1,008", "1,330", "2,000", "700"], 1),
     mcq("Who wrote the Aathichoodi?", ["Avvaiyar", "Thiruvalluvar", "Ilango Adigal", "Kambar"], 0),
     mcq("'கல்வி' means...", ["wealth", "learning", "war", "love"], 1),
     mcq("Sangam literature dates from roughly...", ["1800s CE", "1200s CE", "300 BCE – 300 CE", "1500s CE"], 2),
     mcq("A kural consists of how many words?", ["five", "seven", "ten", "twelve"], 1),
     mcq("'நூல்' means...", ["book", "song", "temple", "king"], 0),
     mcq("Aathichoodi is organised...", ["by theme", "by length", "in alphabetical order", "chronologically"], 2),
     mcq("'மொழி' means...", ["language", "book", "letter", "story"], 0),
     mcq("What does 'வாழ்த்துக்கள்' mean?", ["Goodbye", "Congratulations", "Welcome", "Sorry"], 1)
  ]}
})

data = {"app": "Ezhuthaani", "mascot": "Kili", "stages": stages}
with open("curriculum.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=1)

tot_l = sum(len(s["lessons"]) for s in stages)
tot_q = sum(len(s["quiz"]["questions"]) for s in stages)
print("stages", len(stages), "lessons", tot_l, "quiz qs", tot_q)
