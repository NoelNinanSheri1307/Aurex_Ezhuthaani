# Ezhuthaani (எழுத்தாணி) — Interactive Tamil Learning & Cultural Masterclass Engine

An editorial-grade, full-stack interactive learning platform for the Tamil language, script, literature, epigraphy, and cultural heritage.

---

## Project Overview

Ezhuthaani (எழுத்தாணி — the traditional iron stylus used to carve Tamil script onto palm-leaf manuscripts) is a modern, gamified learning platform that takes learners from foundational character recognition to reading classical Tamil literature and exploring ancient Tamil epigraphy.

- **7-Stage Curriculum Journey**: Structured learning progression from Adippadai (Basics) to Puthagangal (Books).
- **Interactive Stroke Tracing Engine**: Real-time HTML5 Canvas engine for practicing Tamil character strokes with pixel-mask coverage validation.
- **Tamil Rhymes Mode (`/rhymes`)**: Interactive 3D WebGL storybook environments powered by Three.js, tap-to-discover vocabulary, Piper Valluvar TTS pronunciation, and curated YouTube Tamil video rhymes.
- **Daily Thirukkural Engine (`/daily`)**: Deterministic calendar-date selection of 1,330 Thirukkural couplets featuring dual stanzas, transliterations, English explanations, 3 Tamil commentaries (Mu. Varadarajan, Solomon Pappaiah, Mu. Karunanidhi), +5 XP read status rewards, and notebook reflection saving.
- **Ezhuthaani AI Assistant**: Embedded OpenRouter LLM chatbot (google/gemini-2.5-flash), strictly bounded to Tamil language, literature, and culture queries, with persisted conversation threads in Neon PostgreSQL.
- **Local Piper Neural TTS Engine**: Offline Tamil Neural TTS powered by `ta_IN-ValluvarNeural-medium.onnx`, single startup lifespan loading, in-memory WAV streaming with 250ms lead-in silence padding, and automatic browser fallback.
- **Daily Missions & Gamification**: Daily learning loop with 4 deterministic tasks (Script, Vocabulary, Grammar, Literature), streak multipliers, milestone badges, level progression, and anti-farming XP protection.
- **Reading-Aloud Practice Mode**: Guided passage practice with native model pronunciation and chunk-by-chunk self-paced reading.
- **Interactive GIS Map Explorer**: Leaflet map visualizing historical monuments, cultural sites, ancient Tamil-Brahmi inscriptions, and archaeological excavation sites across India and Sri Lanka.
- **Practice Games**: Interactive Word Builder tile puzzle with adjustable question count selectors (5, 10, 15, 20, All) and classic SVG Tamil Hangman with saved word integration.
- **Rich Cultural & Epigraphic Libraries**: Explore Culture, History, Literature, Knowledge Base, Script History, and Rock Inscriptions with curated historical images and provenance metadata.

---

## Curriculum Architecture (7 Stages)

| Stage | Name | Title | Scope & Objectives |
| :--- | :--- | :--- | :--- |
| **01** | **அடிப்படை** (*Adippadai*) | **Thodakkam (தொடக்கம்)** | Vowel (*Uyir*) & Consonant (*Mei*) foundations, pronunciation & letter formation. |
| **02** | **எழுத்துக்கள்** (*Ezhuthukkal*) | **Ezhuthu Arivu (எழுத்து அறிவு)** | Script structure, combined characters (*Uyir-Mei*), and 247-grapheme matrix. |
| **03** | **பயிற்சி** (*Payirchi*) | **Kai Ezhuthu (கை எழுத்து)** | Real-time stroke handwriting tracing on canvas with mask verification. |
| **04** | **சொற்கள்** (*Sorkkal*) | **Sol Vangi (சொல் வங்கி)** | Essential vocabulary, root words, parts of speech, and interactive word assembly. |
| **05** | **வாக்கியம்** (*Vaakkiyangal*) | **Vaakya Amaippu (வாக்கிய அமைப்பு)** | Sentence construction, verb tenses, and word builder practice games. |
| **06** | **வாசிப்பு** (*Vasippu*) | **Vasippu Thiran (வாசிப்பு திறன்)** | Passage reading comprehension & guided read-aloud practice mode. |
| **07** | **புத்தகம்** (*Puthagangam*) | **Noolagam (நூலகம்)** | Classical Tamil literature, Thirukkural couplets, and Sangam masterworks. |

---

## Feature Directory

### 1. Tamil Rhymes (`/rhymes` & `/rhymes/[slug]`)
- Interactive 3D WebGL storybook environments powered by Three.js featuring mascot characters, foliage, rain, clouds, and water puddles.
- Tap-to-discover raycasting system: Tapping 3D objects highlights them, displays Tamil vocabulary overlays, and plays Piper Valluvar TTS pronunciation.
- Curated YouTube Tamil Video Rhymes section with inline modal video playback.
- Accessible 2D storybook fallback canvas for non-WebGL devices and screen readers.

### 2. Daily Thirukkural Engine (`/daily`)
- Calendar-date deterministic selector cycling through all 1,330 Thirukkural couplets.
- Dual Tamil lines, transliterations, English translations, and explanations.
- Interactive commentary switcher tabs: Mu. Varadarajan (மு.வ), Solomon Pappaiah (சாலமன் பாப்பையா), and Mu. Karunanidhi (மு.கருணாநிதி).
- Mark as Read (+5 XP) toggle button and personal reflection textarea that saves directly to the user's notebook.

### 3. Local Piper Neural TTS & Web Speech Fallback (`web/lib/tts.ts` & `backend/tts.py`)
- Primary Engine: Local Piper ONNX Neural TTS (`ta_IN-ValluvarNeural-medium.onnx`) loaded once into memory on backend startup.
- In-Memory Streaming: `POST /api/tts/synthesize` streams raw WAV audio directly using `BytesIO` with 250ms lead-in silence padding to prevent initial phoneme clipping.
- Automatic Fallback: If backend TTS is unreachable or disabled, `speakTamil()` seamlessly falls back to browser `speechSynthesis` (`ta-IN`) with zero UI interruption.
- TTS Laboratory (`/tts-lab`): Internal QA testing page for checking model status and monitoring active engine status (`PIPER` vs `BROWSER`).

### 4. Ezhuthaani AI Assistant (`/EzhuthaaniAIChatbot.tsx`)
- Floating circular mascot trigger button with pulsating amber halo at the bottom-right corner of all pages.
- Responsive modal window featuring a Conversation History Sidebar (persisted in Neon database) and Main Chat Area.
- Powered by OpenRouter API (`google/gemini-2.5-flash`) with a strict prompt boundary limiting responses exclusively to Tamil language, literature, culture, history, and app guidance.

### 5. Canvas Stroke Handwriting Engine (`/lesson/[id]`)
- Real-time HTML5 canvas tracing for Tamil characters.
- Evaluates user handwriting against letter template pixel masks, awarding completion XP upon reaching target coverage thresholds.

### 6. Daily Tamil & Missions (`/daily`)
- Daily learning loop generating 4 deterministic missions per calendar day (Script, Vocabulary, Grammar, Literature).
- Displays streak bonuses, mission completion badges, level progression, and atomic XP rewards with anti-farming safeguards.

### 7. Practice Games (`/word-builder` & `/hangman`)
- Word Builder (`/word-builder`): Interactive tile-snapping Tamil word assembly puzzle with customizable question counts (5, 10, 15, 20, All), hint system, and dictionary integration.
- Tamil Hangman (`/hangman`): SVG gallows with animated stick figure and full Tamil letter keyboard.

### 8. Searchable Dictionary & Personal Notebook (`/dictionary` & `/notes`)
- Trilingual search supporting Tamil script (`தமிழ்`), Transliteration (`Tamil`), and English (`language`).
- Displays part-of-speech tags, root words, example sentences, saved words integration, and 1-click personal note creation.

### 9. Culture, History, Literature & Epigraphy Hubs
- Culture Explorer (`/culture`): Active category filters (Food, Festivals, Arts, Architecture, Traditions) with GIS coordinates and source provenance.
- History Timeline (`/history`): Chronological timeline spanning 5 Tamil historical eras (Sangam, Chola, Pandyan, Colonial, Modern).
- Literature Library (`/literature`): Masterworks (*Thirukkural*, *Aathichoodi*, *Silappatikaram*, *Manimekalai*) with dual Tamil stanzas and English translations.
- Knowledge Library (`/knowledge`): Deep linguistic & archaeological articles (Keezhadi excavations, Adichanallur, Tamil Brahmi).
- Script History (`/script-history`): Evolution of Tamil script across 6 historic phases with authentic artifact images.
- Inscription Explorer (`/inscriptions`): Ancient epigraphic records (*Mangulam*, *Tanjavur*, *Pulimankombai*) with GIS coordinates and period filters.

### 10. Map Explorer (`/map`)
- Interactive Leaflet GIS map displaying cultural sites, historical monuments, and inscriptions across Tamil Nadu and Sri Lanka.

---

## Text-to-Speech (TTS) Setup Guide

Ezhuthaani uses **Piper ONNX Neural TTS** as its primary voice engine, with **Web Speech API** as an automatic fallback.

### 1. Local Piper Neural TTS Model Setup (ONNX)
Large ONNX neural model files are excluded from git version control due to file size. To enable local neural Tamil TTS:
1. Download `ta_IN-ValluvarNeural-medium.onnx` and `ta_IN-ValluvarNeural-medium.onnx.json` from HuggingFace:
   [HuggingFace: Piper Tamil Voices - Valluvar Neural Medium](https://huggingface.co/Jeyaram-K/piper-tamil-voices/tree/main/ta_IN-ValluvarNeural-medium)
2. Place both downloaded files inside `tts-models/valluva/`:
   ```text
   ezhuthaani/
   └── tts-models/
       └── valluva/
           ├── ta_IN-ValluvarNeural-medium.onnx
           ├── ta_IN-ValluvarNeural-medium.onnx.json
           └── ttsinstructions.md
   ```
3. Detailed setup instructions are located in `tts-models/valluva/ttsinstructions.md`.

### 2. System Browser Native Speech Fallback (Web Speech API)
If Piper is not loaded, Ezhuthaani automatically routes speech to native system voices:

#### Windows Setup
1. Open Windows Settings (`Win + I`) -> Time & Language -> Speech.
2. Under Manage voices, click Add voices.
3. Search for Tamil (India) and click Add / Install (*Microsoft Valluvar* / *Microsoft Pallavi*).
4. Refresh your browser.

#### macOS / iOS Setup
1. Open System Settings -> Accessibility -> Spoken Content.
2. Click System Voice -> Manage Voices...
3. Download Tamil (India) (*Leka* or *Nayan*).

#### Android Setup
1. Open Settings -> System -> Languages & Input -> Text-to-speech output.
2. Tap Preferred engine (Google TTS settings) -> Install voice data -> Tamil (India).

---

## Tech Stack

### Frontend (`web/`)
- Framework: Next.js 16 (App Router with Turbopack)
- Library: React 19, TypeScript
- 3D WebGL Engine: Three.js
- Styling: Vanilla CSS, TailwindCSS, Custom Design Tokens
- Animations: Framer Motion
- Maps & Graphics: Leaflet GIS, HTML5 Canvas
- Icons: Lucide React

### Backend (`backend/`)
- Framework: FastAPI (Python 3.10+)
- ORM: SQLAlchemy 2.0
- Database: Neon Cloud PostgreSQL (Production) / SQLite (`ezhuthaani.db` for local dev)
- Authentication: PyJWT with Scrypt password hashing
- AI Engine: OpenRouter API (`google/gemini-2.5-flash`)
- Neural TTS Engine: Piper ONNX Runtime (`ta_IN-ValluvarNeural-medium`)

---

## Quick Start (Local Development)

### Prerequisites
- Node.js: v18+
- Python: 3.10+

### 1. Backend API Setup

```bash
# Navigate to backend directory
cd backend

# Create & activate virtual environment
python -m venv venv

# Windows (PowerShell):
.\venv\Scripts\activate

# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your environment variables:
# DATABASE_URL=sqlite:///./ezhuthaani.db (or Neon PostgreSQL URI)
# JWT_SECRET=your_jwt_secret_min_32_bytes
# OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key
# PIPER_MODEL_PATH=../tts-models/valluva/ta_IN-ValluvarNeural-medium.onnx

# Start backend server
uvicorn main:app --reload --port 8000
```
> The API will run at `http://localhost:8000` (Docs at `http://localhost:8000/docs`).

### 2. Frontend App Setup

```bash
# In a new terminal window, navigate to web directory
cd web

# Install Node.js dependencies
npm install

# Start Next.js development server
npm run dev
```
> Open `http://localhost:3000` in your browser.

---

## System QA & API Test Suite

The backend contains a comprehensive automated QA test suite verifying all 56 system endpoints, authentication rules, user data isolation, and anti-farming logic.

To run the test suite:

```bash
& "backend/venv/Scripts/python.exe" scratch/run_full_qa_tests.py
```

Expected Output:
```text
=== STARTING EZHUTHAANI SYSTEM QA AUDIT TESTS ===
[PASS] 1. GET /health
[PASS] 2. GET /api/curriculum (7 stages verified)
...
[PASS] 53. POST /api/ai/conversations (Created thread ID #1)
[PASS] 54. GET /api/ai/conversations & /api/ai/conversations/{id}/messages
[PASS] 55. POST /api/ai/conversations/{id}/messages (User msg sent & AI response returned)
[PASS] 56. Feature 11 — Ezhuthaani AI Chatbot Deletion & User Isolation Verified

=======================================================
ALL 56 BACKEND SYSTEM & API TESTS PASSED 100% PERFECTLY!
=======================================================
```

---

## Directory Structure

```text
ezhuthaani/
├── backend/
│   ├── main.py                     # FastAPI application & API endpoints
│   ├── tts.py                      # Piper Neural TTS service singleton
│   ├── curriculum.json             # 7-stage curriculum definition
│   ├── content/                    # Seed datasets (Culture, History, Literature, Inscriptions, Thirukkural)
│   └── requirements.txt            # Python dependencies
├── web/
│   ├── app/                        # Next.js 16 App Router pages & routes
│   │   ├── (auth)/                 # Login & Signup pages
│   │   ├── culture/                # Culture Explorer & detail pages
│   │   ├── daily/                  # Daily Tamil, Thirukkural & Missions
│   │   ├── dictionary/             # Trilingual dictionary
      ├── hangman/                # Tamil Hangman game
│   │   ├── history/                # History timeline & detail pages
│   │   ├── inscriptions/           # Epigraphy Explorer & detail pages
│   │   ├── journey/                # 7-Stage Curriculum Journey map
│   │   ├── knowledge/              # Knowledge Base articles
│   │   ├── lesson/[id]/            # Interactive lesson & canvas tracing
│   │   ├── literature/             # Literature Library
│   │   ├── map/                    # Leaflet GIS map explorer
│   │   ├── read-aloud/             # Guided passage read-aloud practice
│   │   ├── rhymes/                 # Tamil Rhymes 3D WebGL & YouTube video hub
│   │   ├── saved/                  # Saved words & bookmarks
│   │   ├── script/                 # 247-Character Tamil Script Matrix
│   │   ├── script-history/         # 2,600-year Tamil writing evolution
│   │   ├── tts-lab/                # Internal QA TTS lab
│   │   └── word-builder/           # Word Assembly game with count selectors
│   ├── components/                 # Shared UI components, 3D WebGL scenes & AI Chatbot
│   └── lib/                        # API client, TTS helper, types
└── tts-models/
    └── valluva/                    # Piper ONNX neural model files & instructions
```

---

## License

Distributed under the MIT License. See `LICENSE` for details.
