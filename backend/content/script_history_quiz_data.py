"""
Historical Quiz Dataset for Tamil Script Evolution (Feature 7 — Script History).

Contains exactly 6 bilingual (English + Tamil) multiple-choice questions corresponding to the
6 major phases of Tamil writing evolution. Each question tests conceptual historical understanding
with exactly 4 options (a, b, c, d) and exactly 1 correct answer.
"""

SCRIPT_HISTORY_QUIZ = [
    {
        "phase_number": 1,
        "phase_slug": "tamil-brahmi",
        "question": {
            "en": "Which orthographic innovation was introduced in Tamil-Brahmi to suppress the inherent 'a' vowel and represent a pure consonant, as described in the Tolkappiyam?",
            "ta": "தமிழ் பிராமி எழுத்துமுறையில் உள்ளார்ந்த 'அ'கர உயிரொலியை நீக்கி, தூய மெய்யெழுத்தைக் குறிக்க அறிமுகப்படுத்தப்பட்ட குறியீடு எது?"
        },
        "options": {
            "a": {
                "en": "The Pulli (diacritical dot)",
                "ta": "புள்ளி (மேற்குறி)"
            },
            "b": {
                "en": "The Visarga (ஃ)",
                "ta": "விசர்க்கம் (ஆய்தக்குறி)"
            },
            "c": {
                "en": "The Kombu curve (ெ)",
                "ta": "கொம்புக் குறியீடு"
            },
            "d": {
                "en": "The Box-head serif",
                "ta": "பெட்டித் தலைக்குறி"
            }
        },
        "answer": "a"
    },
    {
        "phase_number": 2,
        "phase_slug": "vatteluttu",
        "question": {
            "en": "What primary physical factor led to the development of sweeping circular strokes in the Vatteluttu script?",
            "ta": "வட்டெழுத்து முறையில் நேரான கோடுகளுக்குப் பதிலாக நெளிவான, வட்ட வடிவக் கோடுகள் உருவாக முதன்மைக் காரணம் என்ன?"
        },
        "options": {
            "a": {
                "en": "Matching the geometric shape of round bronze coins",
                "ta": "வட்ட வடிவ வெண்கல நாணயங்களின் வடிவத்திற்குப் பொருந்துவதற்காக"
            },
            "b": {
                "en": "Preventing tearing and splitting of fragile palm leaves when incising with an iron stylus",
                "ta": "இரும்பு எழுத்தாணியால் எழுதும்போது பலவீனமான பனை ஓலை நரம்புகள் கிழிவதைத் தவிர்ப்பதற்காக"
            },
            "c": {
                "en": "Standardizing letters for early European movable type presses",
                "ta": "ஆரம்பகால ஐரோப்பிய அச்சு இயந்திரங்களுக்கு எழுத்துக்களைத் தரப்படுத்துவதற்காக"
            },
            "d": {
                "en": "Adapting to stone carving chisels blunted by hard granite",
                "ta": "கருங்கற்களால் மழுங்கிப்போன கல் செதுக்கும் உளிகளுக்கு ஏற்ப மாற்றிக்கொள்வதற்காக"
            }
        },
        "answer": "b"
    },
    {
        "phase_number": 3,
        "phase_slug": "pallava-grantha",
        "question": {
            "en": "In Pallava-era epigraphy and royal charters, what was the distinct historical role of the Grantha script compared to the Pallava Tamil script?",
            "ta": "பல்லவர் காலக் கல்வெட்டுகளிலும் செப்பேடுகளிலும் பல்லவத் தமிழ் எழுத்துடன் ஒப்பிடுகையில் கிரந்த எழுத்தின் தனித்துவமான வரலாற்றுப் பங்கு என்ன?"
        },
        "options": {
            "a": {
                "en": "It was used exclusively for vernacular village revenue records in Tamil",
                "ta": "இது தமிழில் உள்ளூர் கிராம வரி ஆவணங்களை எழுத மட்டுமே பயன்படுத்தப்பட்டது"
            },
            "b": {
                "en": "It was a secret cipher script created only for royal private signatures",
                "ta": "இது அரசரின் ரகசிய கையொப்பங்களுக்காக மட்டுமே உருவாக்கப்பட்ட மறைமுக எழுத்துமுறை"
            },
            "c": {
                "en": "It was developed specifically to transcribe Sanskrit phonemes and liturgy absent in native Tamil",
                "ta": "இது பழந்தமிழில் இல்லாத சமஸ்கிருத ஒலிகளையும் வழிபாட்டுச் சுலோகங்களையும் துல்லியமாக எழுத உருவாக்கப்பட்டது"
            },
            "d": {
                "en": "It replaced the Tamil language completely in temple administration across South India",
                "ta": "இது தென்னிந்தியா முழுவதும் கோயில் நிர்வாகத்தில் தமிழ் மொழியை முழுமையாக மாற்றியமைத்தது"
            }
        },
        "answer": "c"
    },
    {
        "phase_number": 4,
        "phase_slug": "chola-tamil",
        "question": {
            "en": "How did the Imperial Chola administration standardize and consolidate the Tamil script across South India?",
            "ta": "சோழப் பேரரசு தங்கள் ஆளுகைக்குட்பட்ட பகுதிகளில் தமிழ் வரிவடிவத்தை எவ்வாறு தரப்படுத்தியது?"
        },
        "options": {
            "a": {
                "en": "By prohibiting stone inscriptions and permitting writing only on woven silk cloth",
                "ta": "கல்வெட்டுகளைத் தடை செய்து பட்டுத் துணிகளில் மட்டுமே எழுத அனுமதித்ததன் மூலம்"
            },
            "b": {
                "en": "By establishing uniform, high-contrast granite letterforms for temple archives and replacing Vatteluttu in the south",
                "ta": "கோயில் ஆவணங்களுக்காக சீரான, ஆழமான கருங்கல் எழுத்துக்களை நிறுவியதோடு தென்பகுதிகளில் வட்டெழுத்தை மாற்றியதன் மூலம்"
            },
            "c": {
                "en": "By introducing Latin alphabet characters into royal copper-plate charters",
                "ta": "அரச செப்பேடுகளில் லத்தீன் எழுத்துக்களைப் புகுத்தியதன் மூலம்"
            },
            "d": {
                "en": "By restricting writing privileges strictly to the royal court of Thanjavur",
                "ta": "எழுத்துப் பயன்பாட்டை தஞ்சாவூர் அரசவைக்குள் மட்டுமே கட்டுப்படுத்தியதன் மூலம்"
            }
        },
        "answer": "b"
    },
    {
        "phase_number": 5,
        "phase_slug": "printing-modernizing",
        "question": {
            "en": "Which key orthographic innovation for printed Tamil is historically credited to scholar Costanzo Beschi (Veeramamunivar)?",
            "ta": "அச்சுத் தமிழில் அறிஞர் வீரமாமுனிவர் (கான்ஸ்டன்ஸோ பெஸ்கி) மேற்கொண்டதாக வரலாற்று ரீதியாக அறியப்படும் முதன்மை எழுத்துச் சீர்திருத்தம் எது?"
        },
        "options": {
            "a": {
                "en": "Removing all vowel modifier symbols from the Tamil alphabet",
                "ta": "தமிழ் நெடுங்கணக்கிலிருந்து அனைத்து உயிர்மெய்க் குறிகளையும் நீக்கியமை"
            },
            "b": {
                "en": "Substituting the Tamil script with Devanagari typography",
                "ta": "தமிழ் எழுத்துக்களுக்குப் பதிலாக தேவநாகரி அச்சுருக்களை மாற்றியமை"
            },
            "c": {
                "en": "Introducing distinctive stroke and loop shapes to separate short and long vowels (எ/ஏ and ஒ/ஓ)",
                "ta": "குறில் மற்றும் நெடில் உயிரெழுத்துக்களை (எ/ஏ மற்றும் ஒ/ஓ) வேறுபடுத்தும் புதிய வரிவடிவங்களை அறிமுகப்படுத்தியமை"
            },
            "d": {
                "en": "Inventing the first mechanical Tamil typewriter keymap",
                "ta": "முதல் இயந்திரத் தமிழ் தட்டச்சு விசைப்பலகை அமைப்பைக் கண்டுபிடித்தமை"
            }
        },
        "answer": "c"
    },
    {
        "phase_number": 6,
        "phase_slug": "modern-unicode",
        "question": {
            "en": "What is the primary technical significance of standardizing Tamil under the global Unicode Standard (U+0B80–U+0BFF)?",
            "ta": "உலகளாவிய யூனிகோட் தரநிலையின் (U+0B80–U+0BFF) கீழ் தமிழைத் தரப்படுத்தியதன் முதன்மையான தொழில்நுட்ப முக்கியத்துவம் என்ன?"
        },
        "options": {
            "a": {
                "en": "It restricts Tamil computing strictly to offline proprietary desktop applications",
                "ta": "இது தமிழ் கணினிப் பயன்பாட்டை இணையமற்ற கணினிச் செயலிகளுக்கு மட்டுமே கட்டுப்படுத்துகிறது"
            },
            "b": {
                "en": "It assigns unique, platform-independent digital identities to Tamil characters, enabling universal web rendering, search, and AI processing",
                "ta": "எழுத்துரு மற்றும் இயங்குதளங்களைச் சாராமல் தனித்துவமான டிஜிட்டல் குறியீடுகளை வழங்கி, உலகளாவிய தேடல், வலைக்காட்சி மற்றும் AI பயன்பாட்டை சாத்தியமாக்கியமை"
            },
            "c": {
                "en": "It reduces the total number of Tamil characters from 247 down to 26 letters",
                "ta": "இது தமிழின் மொத்த எழுத்துக்களின் எண்ணிக்கையை 247-லிருந்து 26 ஆகக் குறைத்தமை"
            },
            "d": {
                "en": "It converts all written Tamil text automatically into Latin phonetic transliteration",
                "ta": "இது அனைத்து தமிழ் உரைகளையும் தானாகவே லத்தீன் ஒலிபெயர்ப்பாக மாற்றி அமைத்தமை"
            }
        },
        "answer": "b"
    }
]
