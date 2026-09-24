"""
Culture Quiz Dataset for Feature 4 — Tamil Culture Explorer
Aurex'26 CICT Tamil Learning Portal

Contains exactly 3 multiple-choice questions for each of the 16 Culture topics (48 questions total).
Updated to include bilingual support (English and Tamil) and a unique 'question_no' attribute for each question.[cite: 1, 2]
"""

CULTURE_QUIZ_DATA = {
    # =========================================================================
    # 1. FOOD
    # =========================================================================
    "pongal-dish": [
        {
            "question_no": 1,
            "question_en": "What does the Tamil word 'Pongal' literally mean?[cite: 2]",
            "question_ta": "'பொங்கல்' என்ற தமிழ்ச் சொல்லின் நேரடிப் பொருள் என்ன?[cite: 1]",
            "options_en": [
                "To boil over or overflow",
                "To sow new crop seeds",
                "To harvest ripe fruit",
                "To grind roasted spices"
            ],
            "options_ta": [
                "பொங்கி வழிதல்",
                "புதிய விதைகளை விதைத்தல்",
                "பழுத்த பழங்களை அறுவடை செய்தல்",
                "வறுத்த மசாலாக்களை அரைத்தல்"
            ],
            "answer_index": 0,
            "explanation_en": "Pongal is derived from the Tamil verb 'pongu', which means to boil over or overflow, symbolizing abundance and prosperity.[cite: 2]",
            "explanation_ta": "பொங்கல் என்பது 'பொங்கு' என்ற வினைச்சொல்லில் இருந்து உருவானது, இது பொங்கி வழிவதைக் குறிக்கிறது, இது செழிப்பைக் குறிக்கிறது.[cite: 1]"
        },
        {
            "question_no": 2,
            "question_en": "Which traditional ingredient provides the rich sweetness in Sakkarai Pongal?[cite: 2]",
            "question_ta": "சர்க்கரைப் பொங்கலுக்கு இனிப்புச் சுவையைத் தரும் பாரம்பரியப் பொருள் எது?[cite: 1]",
            "options_en": [
                "Refined white sugar",
                "Pure wild honey",
                "Unrefined cane jaggery (Vellam)",
                "Palm fruit pulp"
            ],
            "options_ta": [
                "சுத்திகரிக்கப்பட்ட வெள்ளைச் சர்க்கரை",
                "தூய காட்டுத் தேன்",
                "சுத்திகரிக்கப்படாத நாட்டு வெல்லம்",
                "பனைமரப் பழத்தின் கூழ்"
            ],
            "answer_index": 2,
            "explanation_en": "Sakkarai Pongal is traditionally sweetened with organic unrefined cane jaggery (Vellam) along with cardamom, cashews, and ghee.[cite: 2]",
            "explanation_ta": "சர்க்கரைப் பொங்கல் பாரம்பரியமாக தூய நாட்டு வெல்லம், ஏலக்காய், முந்திரி மற்றும் நெய் சேர்த்து இனிப்பாக்கப்படுகிறது.[cite: 1]"
        },
        {
            "question_no": 3,
            "question_en": "Which two primary agricultural staples form the base of traditional Pongal?[cite: 2]",
            "question_ta": "பாரம்பரியப் பொங்கலின் அடிப்படையாக விளங்கும் இரண்டு முக்கிய விவசாயப் பொருட்கள் யாவை?[cite: 1]",
            "options_en": [
                "Wheat flour and chickpeas",
                "Freshly harvested paddy rice and yellow moong dal",
                "Pearl millet and black sesame",
                "Barley grain and red kidney beans"
            ],
            "options_ta": [
                "கோதுமை மாவு மற்றும் கொண்டைக்கடலை",
                "புதிதாக அறுவடை செய்யப்பட்ட பச்சரிசி மற்றும் பாசிப்பருப்பு",
                "கம்பு மற்றும் கருப்பு எள்ளு",
                "பார்லி மற்றும் சிவப்பு ராஜ்மா"
            ],
            "answer_index": 1,
            "explanation_en": "Traditional Pongal is cooked by boiling freshly harvested rice together with split yellow moong dal in milk or water.[cite: 2]",
            "explanation_ta": "பாரம்பரிய பொங்கல் புதிதாக அறுவடை செய்யப்பட்ட பச்சரிசியை பாசிப்பருப்புடன் சேர்த்து பால் அல்லது தண்ணீரில் கொதிக்க வைத்து சமைக்கப்படுகிறது.[cite: 1]"
        }
    ],

    "idli-dosa": [
        {
            "question_no": 4,
            "question_en": "What natural biological process makes Idli and Dosa batter light, fluffy, and easily digestible?[cite: 2]",
            "question_ta": "இட்லி மற்றும் தோசை மாவை மென்மையாகவும், எளிதில் செரிமானமாகக்கூடியதாகவும் மாற்றும் இயற்கையான உயிரியல் செயல்முறை எது?[cite: 1]",
            "options_en": [
                "Adding artificial baking soda",
                "High-pressure boiling",
                "Natural overnight fermentation",
                "Deep-frying in vegetable oil"
            ],
            "options_ta": [
                "செயற்கை பேக்கிங் சோடா சேர்த்தல்",
                "அதிக அழுத்தத்தில் கொதிக்க வைத்தல்",
                "இயற்கையாக இரவு முழுவதும் புளிக்க வைத்தல் (நொதித்தல்)",
                "எண்ணெயில் பொரித்தல்"
            ],
            "answer_index": 2,
            "explanation_en": "Natural overnight fermentation by lactic acid bacteria and wild yeasts breaks down starches, enhances B-vitamins, and creates a light batter.[cite: 2]",
            "explanation_ta": "இயற்கையாக இரவு முழுவதும் லாக்டிக் அமில பாக்டீரியா மற்றும் ஈஸ்ட் மூலம் மாவு நொதிப்பதால் மாவுப்பொருள் உடைக்கப்பட்டு, பி-வைட்டமின்கள் அதிகரித்து மாவு மென்மையாகிறது.[cite: 1]"
        },
        {
            "question_no": 5,
            "question_en": "In which ancient classical Tamil text is an early form of Dosa referenced as a griddle-baked cake?[cite: 2]",
            "question_ta": "எந்தப் பழங்காலத் தமிழ் இலக்கியத்தில் தோசையின் ஆரம்ப வடிவம் சுடப்பட்ட அடையாகக் குறிப்பிடப்பட்டுள்ளது?[cite: 1]",
            "options_en": [
                "Perumpanarruppadai",
                "Silappadikaram",
                "Manimekalai",
                "Thirukkural"
            ],
            "options_ta": [
                "பெரும்பாணாற்றுப்படை",
                "சிலப்பதிகாரம்",
                "மணிமேகலை",
                "திருக்குறள்"
            ],
            "answer_index": 0,
            "explanation_en": "The Sangam poetic work Perumpanarruppadai describes crispy, appetizing griddle-baked cakes resembling modern Dosa.[cite: 2]",
            "explanation_ta": "சங்க இலக்கியமான பெரும்பாணாற்றுப்படையில் மொறுமொறுப்பான, சுவையான சுடப்பட்ட அடையாக தற்கால தோசையை ஒத்த உணவு விவரிக்கப்பட்டுள்ளது.[cite: 1]"
        },
        {
            "question_no": 6,
            "question_en": "How is the traditional Tamil Idli prepared without the use of oil?[cite: 2]",
            "question_ta": "எண்ணெய் பயன்படுத்தாமல் பாரம்பரிய தமிழ் இட்லி எவ்வாறு தயாரிக்கப்படுகிறது?[cite: 1]",
            "options_en": [
                "Roasted over open wood coals",
                "Steamed in concave moulds",
                "Sun dried on clean banana leaves",
                "Baked in a clay tandoor oven"
            ],
            "options_ta": [
                "விறகு அடுப்பில் சுடுதல்",
                "குழிவான தட்டுகளில் ஆவியில் வேகவைத்தல்",
                "சுத்தமான வாழை இலைகளில் வெயிலில் காயவைத்தல்",
                "களிமண் தந்தூர் அடுப்பில் சுடுதல்"
            ],
            "answer_index": 1,
            "explanation_en": "Idlis are steam-cooked in concave pans, making them a globally acclaimed, zero-oil, gut-friendly breakfast.[cite: 2]",
            "explanation_ta": "இட்லிகள் குழிவான தட்டுகளில் ஆவியில் வேகவைக்கப்படுகின்றன, இதனால் அவை உலகளவில் போற்றப்படும் எண்ணெயற்ற, குடலுக்கு உகந்த காலை உணவாகின்றன.[cite: 1]"
        }
    ],

    # =========================================================================
    # 2. FESTIVALS
    # =========================================================================
    "thai-pongal": [
        {
            "question_no": 7,
            "question_en": "Which day of the Thai Pongal festival is dedicated specifically to bathing and honoring farm cattle?[cite: 2]",
            "question_ta": "தைப்பொங்கல் திருவிழாவில் எந்த நாள் விவசாய கால்நடைகளைக் குளிப்பாட்டி மரியாதை செய்ய அர்ப்பணிக்கப்பட்டுள்ளது?[cite: 1]",
            "options_en": [
                "Bhogi Pongal",
                "Surya Pongal",
                "Maattu Pongal",
                "Kaanum Pongal"
            ],
            "options_ta": [
                "போகிப் பண்டிகை",
                "சூரியப் பொங்கல்",
                "மாட்டுப் பொங்கல்",
                "காணும் பொங்கல்"
            ],
            "answer_index": 2,
            "explanation_en": "Maattu Pongal (the third day) is dedicated to decorating, feeding, and thanking cattle for their indispensable agricultural labor.[cite: 2]",
            "explanation_ta": "மாட்டுப் பொங்கல் (மூன்றாம் நாள்) விவசாயத்திற்கு உற்ற துணையாக விளங்கும் மாடுகளை அலங்கரித்து, உணவளித்து நன்றி செலுத்துவதற்காக அர்ப்பணிக்கப்பட்டுள்ளது.[cite: 1]"
        },
        {
            "question_no": 8,
            "question_en": "What symbolic ritual is performed on Bhogi Pongal to welcome new beginnings?[cite: 2]",
            "question_ta": "புதிய தொடக்கங்களை வரவேற்க போகிப் பண்டிகையன்று என்ன குறியீட்டு சடங்கு செய்யப்படுகிறது?[cite: 1]",
            "options_en": [
                "Planting saplings along the riverbank",
                "Discarding and burning old household items in bonfires",
                "Making palm leaf manuscript copies",
                "Floating earthen oil lamps down streams"
            ],
            "options_ta": [
                "நதிக்கரையில் மரக்கன்றுகள் நடுதல்",
                "பழைய பொருட்களைத் தீயிலிட்டு எரித்தல்",
                "ஓலைச்சுவடிகளை நகலெடுத்தல்",
                "அகல் விளக்குகளை ஆற்றில் விடுதல்"
            ],
            "answer_index": 1,
            "explanation_en": "Bhogi Pongal celebrates renewal ('Pazhaiyana Kazhithal') by burning old, worn items in bonfires to signify spiritual cleansing.[cite: 2]",
            "explanation_ta": "போகிப் பண்டிகையன்று 'பழையன கழிதலும் புதியன புகுதலும்' என்ற தத்துவத்தின்படி பழைய பொருட்களைத் தீயிலிட்டு எரித்து ஆன்மீகத் தூய்மை கொண்டாடப்படுகிறது.[cite: 1]"
        },
        {
            "question_no": 9,
            "question_en": "What joyful phrase is chanted as milk overflows the earthen pot on Surya Pongal morning?[cite: 2]",
            "question_ta": "சூரியப் பொங்கல் காலையில் பானையிலிருந்து பால் பொங்கி வழியும்போது என்ன மகிழ்ச்சியான சொற்றொடர் முழங்கப்படுகிறது?[cite: 1]",
            "options_en": [
                "Vetrivel Veeravel!",
                "Pongalo Pongal!",
                "Iniya Puthandu Vazhthukkal!",
                "Vazhga Senthamil!"
            ],
            "options_ta": [
                "வெற்றிவேல் வீரவேல்!",
                "பொங்கலோ பொங்கல்!",
                "இனிய புத்தாண்டு வாழ்த்துக்கள்!",
                "வாழ்க செந்தமிழ்!"
            ],
            "answer_index": 1,
            "explanation_en": "As the boiled milk and rice froths and overflows the clay pot, families joyfully shout 'Pongalo Pongal!' to celebrate prosperity.[cite: 2]",
            "explanation_ta": "கொதிக்கும் பாலும் அரிசியும் நுரைத்து மண்பானையை விட்டுப் பொங்கி வழியும்போது, செழிப்பைக் கொண்டாட குடும்பத்தினர் 'பொங்கலோ பொங்கல்!' என்று மகிழ்ச்சியாக முழங்குவர்.[cite: 1]"
        }
    ],

    "puthandu": [
        {
            "question_no": 10,
            "question_en": "What is the auspicious visual tray of fruits, mirror, and jewelry viewed at dawn on Puthandu called?[cite: 2]",
            "question_ta": "தமிழ்ப் புத்தாண்டு அதிகாலையில் பார்க்கப்படும் பழங்கள், கண்ணாடி மற்றும் நகைகள் அடங்கிய மங்கலத் தட்டு எவ்வாறு அழைக்கப்படுகிறது?[cite: 1]",
            "options_en": [
                "Kolam",
                "Kanni",
                "Deepam",
                "Prasadam"
            ],
            "options_ta": [
                "கோலம்",
                "கன்னி",
                "தீபம்",
                "பிரசாதம்"
            ],
            "answer_index": 1,
            "explanation_en": "The 'Kanni' is an auspicious tray with Mukkani fruits, betel leaves, gold, and a mirror viewed first thing at sunrise on Puthandu.[cite: 2]",
            "explanation_ta": "'கன்னி' என்பது முக்கனிகள், வெற்றிலை, தங்கம் மற்றும் கண்ணாடியைக் கொண்ட மங்கலத் தட்டாகும், இது புத்தாண்டின் சூரிய உதயத்தில் முதலில் பார்க்கப்படுகிறது.[cite: 1]"
        },
        {
            "question_no": 11,
            "question_en": "Which ceremonial dish combining six fundamental tastes (Arusuvai) is prepared on Puthandu?[cite: 2]",
            "question_ta": "தமிழ்ப் புத்தாண்டன்று ஆறு அடிப்படை சுவைகளை (அறுசுவை) இணைத்து தயாரிக்கப்படும் சிறப்பு உணவு எது?[cite: 1]",
            "options_en": [
                "Venn Pongal",
                "Veppam Poo (Mangai) Pachadi",
                "Paruppu Payasam",
                "Curd Rice with Pomegranate"
            ],
            "options_ta": [
                "வெண் பொங்கல்",
                "வேப்பம்பூ (மாங்காய்) பச்சடி",
                "பருப்பு பாயசம்",
                "மாதுளை கலந்த தயிர் சாதம்"
            ],
            "answer_index": 1,
            "explanation_en": "Veppam Poo Pachadi integrates six tastes (including bitter neem flowers and sweet jaggery) symbolizing life's diverse experiences.[cite: 2]",
            "explanation_ta": "வேப்பம்பூ பச்சடி வாழ்க்கையின் பல்வேறு அனுபவங்களைக் குறிக்கும் வகையில் (கசப்பான வேப்பம்பூ மற்றும் இனிப்பான வெல்லம் உட்பட) ஆறு சுவைகளை ஒருங்கிணைக்கிறது.[cite: 1]"
        },
        {
            "question_no": 12,
            "question_en": "On the first day of which Tamil month is Puthandu (Tamil New Year) celebrated?[cite: 2]",
            "question_ta": "எந்தத் தமிழ் மாதத்தின் முதல் நாளில் தமிழ்ப் புத்தாண்டு கொண்டாடப்படுகிறது?[cite: 1]",
            "options_en": [
                "Thai",
                "Margazhi",
                "Chithirai",
                "Karthigai"
            ],
            "options_ta": [
                "தை",
                "மார்கழி",
                "சித்திரை",
                "கார்த்திகை"
            ],
            "answer_index": 2,
            "explanation_en": "Puthandu marks the commencement of the new cycle in the Tamil solar calendar on the 1st of Chithirai (mid-April).[cite: 2]",
            "explanation_ta": "தமிழ்ப் புத்தாண்டு தமிழ் சூரிய நாள்காட்டியின் புதிய சுழற்சியின் தொடக்கத்தை சித்திரை 1 ஆம் தேதி (ஏப்ரல் நடுப்பகுதியில்) குறிக்கிறது.[cite: 1]"
        }
    ],

    # =========================================================================
    # 3. ARTS
    # =========================================================================
    "bharatanatyam": [
        {
            "question_no": 13,
            "question_en": "What does the syllable 'Bha' represent in the name Bharatanatyam?[cite: 2]",
            "question_ta": "பரதநாட்டியம் என்ற பெயரில் உள்ள 'ப' என்ற எழுத்து எதனைக் குறிக்கிறது?[cite: 1]",
            "options_en": [
                "Bhava (Emotional expression)",
                "Bharatham (Country)",
                "Bhakti (Devotional prayer)",
                "Bhashai (Tamil language)"
            ],
            "options_ta": [
                "பாவம் (உணர்ச்சி வெளிப்பாடு)",
                "பாரதம் (நாடு)",
                "பக்தி (இறைவழிபாடு)",
                "பாஷை (தமிழ் மொழி)"
            ],
            "answer_index": 0,
            "explanation_en": "Bharatanatyam derives its name from Bha (Bhava/expression), Ra (Raga/melody), and Ta (Tala/rhythm).[cite: 2]",
            "explanation_ta": "பரதநாட்டியம் என்ற பெயர் பாவம் (ப), ராகம் (ர), மற்றும் தாளம் (த) ஆகிய சொற்களிலிருந்து உருவானது.[cite: 1]"
        },
        {
            "question_no": 14,
            "question_en": "What is the foundational half-seated demi-plié posture in Bharatanatyam called?[cite: 2]",
            "question_ta": "பரதநாட்டியத்தில் பாதி அமர்ந்த நிலையில் ஆடும் அடிப்படை நிலையின் பெயர் என்ன?[cite: 1]",
            "options_en": [
                "Samapadam",
                "Araimandi",
                "Tribhanga",
                "Natarajasana"
            ],
            "options_ta": [
                "சமபாதம்",
                "அரைமண்டி",
                "த்ரிபங்கம்",
                "நடராஜாசனம்"
            ],
            "answer_index": 1,
            "explanation_en": "Araimandi (half-sitting posture) provides the firm geometric foundation for footwork and body movements in Bharatanatyam.[cite: 2]",
            "explanation_ta": "அரைமண்டி (பாதி உட்கார்ந்த நிலை) பரதநாட்டியத்தில் கால் அசைவுகள் மற்றும் உடல் அசைவுகளுக்கு உறுதியான வடிவியல் அடித்தளத்தை வழங்குகிறது.[cite: 1]"
        },
        {
            "question_no": 15,
            "question_en": "Which historical temple dance tradition formed the foundation of modern Bharatanatyam?[cite: 2]",
            "question_ta": "எந்த வரலாற்றுச் சிறப்புமிக்க கோவில் நடனப் பாரம்பரியம் நவீன பரதநாட்டியத்தின் அடித்தளமாக அமைந்தது?[cite: 1]",
            "options_en": [
                "Kathakali",
                "Sadir Attam",
                "Yakshagana",
                "Chhau"
            ],
            "options_ta": [
                "கதகளி",
                "சதிர் ஆட்டம்",
                "யக்‌ஷகானா",
                "சாவ் நடனம்"
            ],
            "answer_index": 1,
            "explanation_en": "Bharatanatyam was historically practiced in Tamil temples as Sadir Attam before its 20th-century revival.[cite: 2]",
            "explanation_ta": "பரதநாட்டியம் 20 ஆம் நூற்றாண்டில் மீட்டுருவாக்கம் செய்யப்படுவதற்கு முன்பு தமிழ் கோவில்களில் சதிர் ஆட்டமாகப் பயிற்சி செய்யப்பட்டது.[cite: 1]"
        }
    ],

    "karagattam": [
        {
            "question_no": 16,
            "question_en": "What primary object do Karagattam performers balance on their heads while dancing?[cite: 2]",
            "question_ta": "கரகாட்டக் கலைஞர்கள் நடனமாடும்போது தங்கள் தலையில் சமநிலைப்படுத்தும் முதன்மையான பொருள் எது?[cite: 1]",
            "options_en": [
                "A curved iron sword",
                "A decorated brass pot (Karagam)",
                "A lighted plate with brass lamps",
                "A painted wooden umbrella"
            ],
            "options_ta": [
                "ஒரு வளைந்த இரும்பு வாள்",
                "அலங்கரிக்கப்பட்ட பித்தளைச் செம்பு (கரகம்)",
                "பித்தளை விளக்குகள் கொண்ட ஒளிரும் தட்டு",
                "வர்ணம் பூசப்பட்ட மரக் குடை"
            ],
            "answer_index": 1,
            "explanation_en": "Performers balance a brass pot loaded with rice or sand, decorated with flowers and a carved wooden parrot, on their heads.[cite: 2]",
            "explanation_ta": "கலைஞர்கள் அரிசி அல்லது மணல் நிரப்பப்பட்டு, பூக்கள் மற்றும் செதுக்கப்பட்ட மரக்கிளியால் அலங்கரிக்கப்பட்ட பித்தளைச் செம்பை தங்கள் தலையில் சமநிலைப்படுத்துகின்றனர்.[cite: 1]"
        },
        {
            "question_no": 17,
            "question_en": "Which musical ensemble traditionally provides the energetic rhythm for Karagattam performances?[cite: 2]",
            "question_ta": "கரகாட்ட நிகழ்ச்சிகளுக்கு எந்த இசைக்குழு பாரம்பரியமாக சுறுசுறுப்பான தாளத்தை வழங்குகிறது?[cite: 1]",
            "options_en": [
                "Western brass band",
                "Nayyandi Melam, Tavil, and Nadaswaram",
                "Veena and Flute duet",
                "Ghatam and Tambura solo"
            ],
            "options_ta": [
                "மேற்கத்திய இசைக்குழு",
                "நையாண்டி மேளம், தவில் மற்றும் நாதஸ்வரம்",
                "வீணை மற்றும் புல்லாங்குழல்",
                "கடம் மற்றும் தம்புரா"
            ],
            "answer_index": 1,
            "explanation_en": "Karagattam is accompanied by the fast, rustic beats of Nayyandi Melam folk drums, Tavil, and the piercing Nadaswaram.[cite: 2]",
            "explanation_ta": "கரகாட்டம் நையாண்டி மேளம், தவில் மற்றும் நாதஸ்வரத்தின் அதிவேகமான, கிராமியத் தாளங்களுடன் ஆடப்படுகிறது.[cite: 1]"
        },
        {
            "question_no": 18,
            "question_en": "Which deity of rain and health is traditionally invoked through the sacred ritual of Sakthi Karagam?[cite: 2]",
            "question_ta": "சக்தி கரகம் என்ற புனிதச் சடங்கின் மூலம் எந்த மழை மற்றும் ஆரோக்கிய தெய்வத்தை பாரம்பரியமாக வழிபடுகின்றனர்?[cite: 1]",
            "options_en": [
                "Goddess Mariamman",
                "Lord Indra",
                "Sage Agastya",
                "King Karikala Chola"
            ],
            "options_ta": [
                "மாரியம்மன்",
                "இந்திரன்",
                "அகத்திய முனிவர்",
                "கரிகால சோழன்"
            ],
            "answer_index": 0,
            "explanation_en": "Sakthi Karagam is performed in rural temples to seek blessings, rainfall, and protection from epidemics from Goddess Mariamman.[cite: 2]",
            "explanation_ta": "சக்தி கரகம் என்பது மாரியம்மனிடம் ஆசி, மழை மற்றும் நோய்களிலிருந்து பாதுகாப்பு வேண்டி கிராமப்புறக் கோவில்களில் ஆடப்படுகிறது.[cite: 1]"
        }
    ],

    # =========================================================================
    # 4. ARCHITECTURE
    # =========================================================================
    "brihadisvara-temple": [
        {
            "question_no": 19,
            "question_en": "Which imperial Chola monarch commissioned the construction of the Brihadisvara Temple in Thanjavur?[cite: 2]",
            "question_ta": "தஞ்சாவூர் பிரகதீஸ்வரர் கோவிலைக் கட்ட உத்தரவிட்ட சோழப் பேரரசர் யார்?[cite: 1]",
            "options_en": [
                "Narasimhavarman I",
                "Raja Raja Chola I",
                "Thirumalai Nayak",
                "Sundara Pandya"
            ],
            "options_ta": [
                "முதலாம் நரசிம்மவர்மன்",
                "முதலாம் ராஜராஜ சோழன்",
                "திருமலை நாயக்கர்",
                "சுந்தர பாண்டியன்"
            ],
            "answer_index": 1,
            "explanation_en": "Emperor Raja Raja Chola I commissioned the Brihadisvara Temple (Big Temple), which was consecrated in 1010 CE.[cite: 2]",
            "explanation_ta": "பேரரசர் முதலாம் ராஜராஜ சோழன் பிரகதீஸ்வரர் கோவிலைக் (தஞ்சைப் பெரிய கோவில்) கட்டினார்; இது கி.பி. 1010 இல் குடமுழுக்கு செய்யப்பட்டது.[cite: 1]"
        },
        {
            "question_no": 20,
            "question_en": "How high is the monolithic granite Vimana tower of the Brihadisvara Temple?[cite: 2]",
            "question_ta": "பிரகதீஸ்வரர் கோவிலின் ஒற்றைக் கருங்கல் விமான கோபுரம் எவ்வளவு உயரம் கொண்டது?[cite: 1]",
            "options_en": [
                "33 meters (108 feet)",
                "66 meters (216 feet)",
                "99 meters (324 feet)",
                "120 meters (393 feet)"
            ],
            "options_ta": [
                "33 மீட்டர் (108 அடி)",
                "66 மீட்டர் (216 அடி)",
                "99 மீட்டர் (324 அடி)",
                "120 மீட்டர் (393 அடி)"
            ],
            "answer_index": 1,
            "explanation_en": "The 13-tiered monolithic granite Vimana tower rises 66 meters (216 feet) above the Kaveri delta plains.[cite: 2]",
            "explanation_ta": "13 அடுக்குகளைக் கொண்ட ஒற்றைக் கருங்கல் விமானக் கோபுரம் காவிரி டெல்டா சமவெளிக்கு மேலே 66 மீட்டர் (216 அடி) உயர்ந்து நிற்கிறது.[cite: 1]"
        },
        {
            "question_no": 21,
            "question_en": "How did Chola engineers elevate the 80-ton monolithic granite cupola (Kumbam) to the apex of the tower?[cite: 2]",
            "question_ta": "80 டன் எடையுள்ள ஒற்றைக் கருங்கல் சிகரத்தை (கும்பம்) கோபுரத்தின் உச்சிக்கு சோழப் பொறியாளர்கள் எவ்வாறு உயர்த்தினர்?[cite: 1]",
            "options_en": [
                "Using iron winches and sea cables",
                "Using a multi-kilometer inclined earthen ramp (Sarappallam)",
                "Carving it directly out of a natural granite mountain peak",
                "Lifting it in small sections and cementing with lime"
            ],
            "options_ta": [
                "இரும்பு வின்ச்கள் மற்றும் கடல் கயிறுகளைப் பயன்படுத்தி",
                "பல கிலோமீட்டர் நீளமுள்ள சாரப்பள்ளம் (மணல் சரிவுப் பாதை) வழியாக",
                "இயற்கையான கிரானைட் மலை சிகரத்திலிருந்து நேரடியாக செதுக்குவதன் மூலம்",
                "சிறிய பகுதிகளாக உயர்த்தி சுண்ணாம்பால் ஒட்டுவதன் மூலம்"
            ],
            "answer_index": 1,
            "explanation_en": "Engineers built an inclined earthen ramp extending several kilometers to haul the 80-ton stone dome using elephants and log rollers.[cite: 2]",
            "explanation_ta": "80 டன் கல் குவிமாடத்தை யானைகள் மற்றும் மரக்கட்டைகளைப் பயன்படுத்தி உச்சிக்குக் கொண்டுசெல்ல பல கிலோமீட்டர்கள் வரை நீளும் சாய்வான மணல் பாதையை (சாரப்பள்ளம்) பொறியாளர்கள் அமைத்தனர்.[cite: 1]"
        }
    ],

    "mamallapuram-monuments": [
        {
            "question_no": 22,
            "question_en": "Which ancient royal dynasty sculpted the rock-cut sanctuaries and Shore Temple at Mamallapuram?[cite: 2]",
            "question_ta": "மாமல்லபுரத்தில் உள்ள குடைவரைக் கோவில்களையும் கடற்கரைக் கோவிலையும் செதுக்கிய பழங்கால அரச வம்சம் எது?[cite: 1]",
            "options_en": [
                "Chera Dynasty",
                "Pallava Dynasty",
                "Hoysala Dynasty",
                "Nayak Dynasty"
            ],
            "options_ta": [
                "சேர வம்சம்",
                "பல்லவ வம்சம்",
                "ஹொய்சாள வம்சம்",
                "நாயக்கர் வம்சம்"
            ],
            "answer_index": 1,
            "explanation_en": "The Pallava dynasty (especially Mahendravarman I and Narasimhavarman I Mamallan) created the monuments in the 7th-8th centuries CE.[cite: 2]",
            "explanation_ta": "பல்லவ வம்சம் (குறிப்பாக முதலாம் மகேந்திரவர்மன் மற்றும் முதலாம் நரசிம்மவர்மன்) கி.பி. 7-8 ஆம் நூற்றாண்டுகளில் இந்த நினைவுச் சின்னங்களை உருவாக்கியது.[cite: 1]"
        },
        {
            "question_no": 23,
            "question_en": "What is the famous giant open-air rock relief sculpture at Mamallapuram depicting?[cite: 2]",
            "question_ta": "மாமல்லபுரத்தில் உள்ள புகழ்பெற்ற மாபெரும் திறந்தவெளி பாறைப் புடைப்புச் சிற்பம் எதைச் சித்தரிக்கிறது?[cite: 1]",
            "options_en": [
                "The Battle of Talikota",
                "The Descent of the Ganges (Arjuna's Penance)",
                "The Coronation of Rajendra Chola",
                "The Maritime Journey to Rome"
            ],
            "options_ta": [
                "தலைக்கோட்டைப் போர்",
                "கங்கை பூமிக்கு வருதல் (அர்ஜுனன் தபசு / பகீரதன் தவம்)",
                "ராஜேந்திர சோழனின் முடிசூட்டு விழா",
                "ரோமுக்கான கடல் பயணம்"
            ],
            "answer_index": 1,
            "explanation_en": "The relief depicts the Descent of the Ganges (Arjuna's Penance), with celestial beings and life-size elephants worshipping the river.[cite: 2]",
            "explanation_ta": "இந்தச் சிற்பம் கங்கை நதி பூமிக்கு இறங்குவதை (அர்ஜுனன் தபசு) சித்தரிக்கிறது, அங்கு விண்ணவர் மற்றும் இயற்கையான அளவிலான யானைகள் நதியை வழிபடுகின்றன.[cite: 1]"
        },
        {
            "question_no": 24,
            "question_en": "How were the monolithic Pancha Rathas of Mamallapuram constructed?[cite: 2]",
            "question_ta": "மாமல்லபுரத்தின் ஒற்றைக்கல் பஞ்ச ரதங்கள் எவ்வாறு கட்டப்பட்டன?[cite: 1]",
            "options_en": [
                "Assembled from baked clay bricks and lime mortar",
                "Chiseled top-down out of individual giant granite boulders",
                "Cast from melted bronze and copper alloy",
                "Built using imported white marble blocks"
            ],
            "options_ta": [
                "சுட்ட களிமண் செங்கற்கள் மற்றும் சுண்ணாம்பு சாந்து கொண்டு",
                "ஒற்றைப் பெருங்கற்பாறையை மேலிருந்து கீழாகச் செதுக்குவதன் மூலம்",
                "உருகிய வெண்கலம் மற்றும் செப்பு கலவையால்",
                "இறக்குமதி செய்யப்பட்ட வெள்ளை பளிங்கு கற்களைப் பயன்படுத்தி"
            ],
            "answer_index": 1,
            "explanation_en": "The five Pancha Rathas are monolithic shrines sculpted directly from top to bottom out of large granite boulders.[cite: 2]",
            "explanation_ta": "ஐந்து பஞ்ச ரதங்களும் நேரடியாகப் பெரிய கிரானைட் பாறைகளிலிருந்து மேலிருந்து கீழாகச் செதுக்கப்பட்ட ஒற்றைக்கல் சிற்றாலயங்களாகும்.[cite: 1]"
        }
    ],

    # =========================================================================
    # 5. LANGUAGE & TRADITIONS
    # =========================================================================
    "sangam-literature-legacy": [
        {
            "question_no": 25,
            "question_en": "How does Sangam classical poetry classify human experience into two overarching themes?[cite: 2]",
            "question_ta": "சங்ககாலச் செவ்வியல் கவிதை மனித அனுபவங்களை எவ்வாறு இரண்டு முக்கிய கருப்பொருள்களாக வகைப்படுத்துகிறது?[cite: 1]",
            "options_en": [
                "Kavya and Nataka",
                "Akam (inner love/emotions) and Puram (outer valor/ethics)",
                "Shruti and Smriti",
                "Veda and Agama"
            ],
            "options_ta": [
                "காவியம் மற்றும் நாடகம்",
                "அகம் (உள்ளம்/காதல்) மற்றும் புறம் (வீரம்/அறம்)",
                "சுருதி மற்றும் ஸ்மிருதி",
                "வேதம் மற்றும் ஆகமம்"
            ],
            "answer_index": 1,
            "explanation_en": "Sangam poetry bifurcates life into Akam (subjective inner emotions of love) and Puram (objective civic ethics, warfare, and generosity).[cite: 2]",
            "explanation_ta": "சங்க இலக்கியம் வாழ்க்கையை அகம் (காதலின் அகநிலை உணர்வுகள்) மற்றும் புறம் (புறநிலை நெறிமுறைகள், போர் மற்றும் கொடை) என இரு கூறாகப் பிரிக்கிறது.[cite: 1]"
        },
        {
            "question_no": 26,
            "question_en": "What are the two major foundational poetic collections comprising Sangam literature?[cite: 2]",
            "question_ta": "சங்க இலக்கியத்தின் இரண்டு முக்கிய அடிப்படை கவிதைத் தொகுப்புகள் யாவை?[cite: 1]",
            "options_en": [
                "Ettuthogai (Eight Anthologies) and Pattupattu (Ten Idylls)",
                "Thirukkural and Naladiyar",
                "Silappadikaram and Manimekalai",
                "Kamba Ramayanam and Periya Puranam"
            ],
            "options_ta": [
                "எட்டுத்தொகை மற்றும் பத்துப்பாட்டு",
                "திருக்குறள் மற்றும் நாலடியார்",
                "சிலப்பதிகாரம் மற்றும் மணிமேகலை",
                "கம்பராமாயணம் மற்றும் பெரியபுராணம்"
            ],
            "answer_index": 0,
            "explanation_en": "The core Sangam literary corpus is compiled into the Ettuthogai (8 Anthologies) and Pattupattu (10 Idylls), containing 2,381 poems.[cite: 2]",
            "explanation_ta": "சங்க இலக்கியத் தொகுப்பு எட்டுத்தொகை மற்றும் பத்துப்பாட்டு என தொகுக்கப்பட்டுள்ளது, இதில் மொத்தம் 2,381 பாடல்கள் உள்ளன.[cite: 1]"
        },
        {
            "question_no": 27,
            "question_en": "What is the poetic-ecological system connecting human moods to five distinct landscapes in Sangam poetry called?[cite: 2]",
            "question_ta": "சங்கக் கவிதைகளில் மனித உணர்வுகளை ஐந்து வெவ்வேறு நிலப்பரப்புகளுடன் இணைக்கும் அமைப்பு எவ்வாறு அழைக்கப்படுகிறது?[cite: 1]",
            "options_en": [
                "Navarasa",
                "Thinai (Kurinji, Mullai, Marutham, Neithal, Palai)",
                "Kudavolai",
                "Panchabhoota"
            ],
            "options_ta": [
                "நவரசம்",
                "ஐந்திணை (குறிஞ்சி, முல்லை, மருதம், நெய்தல், பாலை)",
                "குடவோலை",
                "பஞ்சபூதம்"
            ],
            "answer_index": 1,
            "explanation_en": "The Thinai framework matches emotional phases of life to five specific geographic landscapes of ancient Tamilakam.[cite: 2]",
            "explanation_ta": "திணை அமைப்பு பண்டைய தமிழகத்தின் ஐந்து குறிப்பிட்ட புவியியல் நிலப்பரப்புகளுடன் வாழ்க்கையின் உணர்ச்சி நிலைகளை பொருத்துகிறது.[cite: 1]"
        }
    ],

    "kolam-art": [
        {
            "question_no": 28,
            "question_en": "Why is raw dry rice flour traditionally used to draw Kolam designs on household thresholds?[cite: 2]",
            "question_ta": "வீட்டு வாசல்களில் கோலம் வரைய பாரம்பரியமாக உலர்ந்த பச்சரிசி மாவு ஏன் பயன்படுத்தப்படுகிறது?[cite: 1]",
            "options_en": [
                "To dye the granite floor permanently white",
                "To provide food for ants, birds, and tiny creatures (Jivakarunyam)",
                "To keep wild grass from sprouting near the entrance",
                "To reflect sunlight away from the front doorway"
            ],
            "options_ta": [
                "தரையினை நிரந்தரமாக வெள்ளையாக மாற்ற",
                "எறும்புகள், பறவைகள் மற்றும் சிற்றுயிர்களுக்கு உணவளிக்க (ஜீவகாருண்யம்)",
                "நுழைவாயிலுக்கு அருகில் புல் முளைப்பதைத் தடுக்க",
                "சூரிய ஒளியை பிரதிபலிக்க"
            ],
            "answer_index": 1,
            "explanation_en": "Using edible rice powder is an act of daily charity (Jivakarunyam) feeding ants, small birds, and insects at the doorstep.[cite: 2]",
            "explanation_ta": "உண்ணக்கூடிய அரிசி மாவைப் பயன்படுத்துவது என்பது வாசலிலேயே எறும்புகள், சிறு பறவைகள் மற்றும் பூச்சிகளுக்கு உணவளிக்கும் தினசரி தர்மச் செயலாகும் (ஜீவகாருண்யம்).[cite: 1]"
        },
        {
            "question_no": 29,
            "question_en": "Which modern scientific disciplines actively study the symmetrical knot patterns of Tamil Kolam?[cite: 2]",
            "question_ta": "தமிழ் கோலங்களின் சமச்சீர் முடிச்சு வடிவங்களை எந்த நவீன அறிவியல் துறைகள் தீவிரமாக ஆராய்கின்றன?[cite: 1]",
            "options_en": [
                "Meteorology and seismology",
                "Computer science, ethnomathematics, and knot theory",
                "Metallurgy and petroleum engineering",
                "Acoustic physics and sonar navigation"
            ],
            "options_ta": [
                "வானிலை மற்றும் நிலநடுக்கவியல்",
                "கணினி அறிவியல், இன-கணிதவியல் மற்றும் முடிச்சு கோட்பாடு",
                "உலோகவியல் மற்றும் பெட்ரோலியப் பொறியியல்",
                "ஒலியியல் இயற்பியல் மற்றும் சோனார் வழிசெலுத்தல்"
            ],
            "answer_index": 1,
            "explanation_en": "Mathematicians and computer scientists analyze Kolam patterns for space-filling curves, graph algorithms, and fractal symmetry.[cite: 2]",
            "explanation_ta": "கணிதவியலாளர்கள் மற்றும் கணினி விஞ்ஞானிகள் கோல வடிவங்களை வரைபட வழிமுறைகள் மற்றும் பகுப்பியல் சமச்சீர்மைக்காக பகுப்பாய்வு செய்கின்றனர்.[cite: 1]"
        },
        {
            "question_no": 30,
            "question_en": "During which Tamil month do neighborhoods celebrate with grand, colorful street Kolam displays?[cite: 2]",
            "question_ta": "எந்தத் தமிழ் மாதத்தில் வீதிகள் முழுவதும் பிரம்மாண்டமான வண்ணக் கோலங்களை வரைந்து கொண்டாடுகின்றனர்?[cite: 1]",
            "options_en": [
                "Vaikasi",
                "Margazhi",
                "Aadi",
                "Ani"
            ],
            "options_ta": [
                "வைகாசி",
                "மார்கழி",
                "ஆடி",
                "ஆனி"
            ],
            "answer_index": 1,
            "explanation_en": "During the cool dawn hours of the Tamil month Margazhi (Dec–Jan), women create massive, intricate Kolams across entire streets.[cite: 2]",
            "explanation_ta": "மார்கழி மாதத்தின் (டிசம்பர்-ஜனவரி) அதிகாலையில், பெண்கள் தெருக்கள் முழுவதும் பிரம்மாண்டமான, சிக்கலான வண்ணக் கோலங்களை உருவாக்குகிறார்கள்.[cite: 1]"
        }
    ],

    # =========================================================================
    # 6. PEOPLE
    # =========================================================================
    "thiruvalluvar": [
        {
            "question_no": 31,
            "question_en": "How many couplets (Kurals) are contained in Sage Thiruvalluvar's masterwork, the Thirukkural?[cite: 2]",
            "question_ta": "திருவள்ளுவர் இயற்றிய திருக்குறளில் எத்தனை குறட்பாக்கள் உள்ளன?[cite: 1]",
            "options_en": [
                "108 couplets in 12 chapters",
                "1,330 couplets in 133 chapters",
                "2,000 couplets in 200 chapters",
                "700 couplets in 70 chapters"
            ],
            "options_ta": [
                "12 அதிகாரங்களில் 108 குறட்பாக்கள்",
                "133 அதிகாரங்களில் 1,330 குறட்பாக்கள்",
                "200 அதிகாரங்களில் 2,000 குறட்பாக்கள்",
                "70 அதிகாரங்களில் 700 குறட்பாக்கள்"
            ],
            "answer_index": 1,
            "explanation_en": "The Thirukkural contains exactly 1,330 succinct two-line couplets organized into 133 thematic chapters of 10 couplets each.[cite: 2]",
            "explanation_ta": "திருக்குறள் சரியாக 1,330 சுருக்கமான இரண்டு வரி குறட்பாக்களை உள்ளடக்கியது, இவை ஒவ்வொன்றும் 10 குறட்பாக்கள் வீதம் 133 அதிகாரங்களாக அமைக்கப்பட்டுள்ளன.[cite: 1]"
        },
        {
            "question_no": 32,
            "question_en": "What are the three universal books (Paals) comprising the Thirukkural?[cite: 2]",
            "question_ta": "திருக்குறளை உள்ளடக்கிய மூன்று முப்பெரும் பிரிவுகள் (பால்கள்) யாவை?[cite: 1]",
            "options_en": [
                "Aram (Virtue), Porul (Wealth/Governance), and Inbam (Love)",
                "Karma, Jnana, and Bhakti",
                "Akam, Puram, and Thinai",
                "Nithi, Kavi, and Natya"
            ],
            "options_ta": [
                "அறம், பொருள், மற்றும் இன்பம்",
                "கர்மம், ஞானம், மற்றும் பக்தி",
                "அகம், புறம், மற்றும் திணை",
                "நீதி, கவி, மற்றும் நாட்டியம்"
            ],
            "answer_index": 0,
            "explanation_en": "The Thirukkural is organized into Aram (Ethics/Righteousness), Porul (Wealth, Statecraft, Society), and Inbam (Love and Affection).[cite: 2]",
            "explanation_ta": "திருக்குறள் அறத்துப்பால் (அறநெறி), பொருட்பால் (செல்வம், சமூகம்), மற்றும் காமத்துப்பால் (காதல்) என மூன்றாகப் பிரிக்கப்பட்டுள்ளது.[cite: 1]"
        },
        {
            "question_no": 33,
            "question_en": "Where is the monumental 133-foot stone statue honoring Thiruvalluvar erected?[cite: 2]",
            "question_ta": "திருவள்ளுவரைக் கௌரவிக்கும் வகையில் 133 அடி உயர கல்சிலை எங்கு நிறுவப்பட்டுள்ளது?[cite: 1]",
            "options_en": [
                "Chennai Marina Promenade",
                "Kanyakumari (oceanic confluence)",
                "Madurai Meenakshi Temple Courtyard",
                "Thanjavur Palace Grounds"
            ],
            "options_ta": [
                "சென்னை மெரினா கடற்கரை",
                "கன்னியாகுமரி (கடல் சங்கமம்)",
                "மதுரை மீனாட்சி கோவில் வாளாகம்",
                "தஞ்சாவூர் அரண்மனை மைதானம்"
            ],
            "answer_index": 1,
            "explanation_en": "The 133-foot granite colossus representing the 133 chapters of the Kural stands where the Indian Ocean, Arabian Sea, and Bay of Bengal meet in Kanyakumari.[cite: 2]",
            "explanation_ta": "குறளின் 133 அதிகாரங்களைக் குறிக்கும் 133 அடி பிரம்மாண்ட சிலை கன்னியாகுமரியில் முக்கடலும் சங்கமிக்கும் இடத்தில் அமைந்துள்ளது.[cite: 1]"
        }
    ],

    "avvaiyar": [
        {
            "question_no": 34,
            "question_en": "Which rare gift did King Athiyaman present to poetess Avvaiyar to grant her long life and wisdom?[cite: 2]",
            "question_ta": "நீண்ட ஆயுளையும் ஞானத்தையும் பெற மன்னன் அதியமான் ஔவையாருக்கு வழங்கிய அரிய பரிசு எது?[cite: 1]",
            "options_en": [
                "A golden mango from the royal orchard",
                "A rare immortal black gooseberry (Nellikkani)",
                "A pearl necklace from the Gulf of Mannar",
                "A silver stylus set with precious rubies"
            ],
            "options_ta": [
                "அரசத் தோட்டத்தின் தங்க மாம்பழம்",
                "சாகாவரம் தரும் அரிய கருநெல்லிக்கனி",
                "மன்னார் வளைகுடா முத்து மாலை",
                "ரூபி கற்கள் பதித்த வெள்ளி எழுத்தாணி"
            ],
            "answer_index": 1,
            "explanation_en": "King Athiyaman selflessly gave Avvaiyar a rare Nellikkani (black gooseberry) conferring longevity so she could continue enriching Tamil culture.[cite: 2]",
            "explanation_ta": "மன்னன் அதியமான், ஔவையார் தமிழ் கலாச்சாரத்தை மேலும் வளப்படுத்த வேண்டும் என்பதற்காக அவருக்கு நீண்ட ஆயுளைத் தரும் அரிய கருநெல்லிக்கனியைத் தன்னலமின்றி வழங்கினார்.[cite: 1]"
        },
        {
            "question_no": 35,
            "question_en": "Which foundational moral text for children was composed by Avvaiyar, starting with 'Aram Seya Virumbu'?[cite: 2]",
            "question_ta": "'அறம் செய விரும்பு' என்று தொடங்கும், ஔவையாரால் இயற்றப்பட்ட குழந்தைகளுக்கான அடிப்படை அறநூல் எது?[cite: 1]",
            "options_en": [
                "Aathichudi",
                "Tolkappiyam",
                "Silappadikaram",
                "Civaka Cintamani"
            ],
            "options_ta": [
                "ஆத்திசூடி",
                "தொல்காப்பியம்",
                "சிலப்பதிகாரம்",
                "சீவக சிந்தாமணி"
            ],
            "answer_index": 0,
            "explanation_en": "Aathichudi is Avvaiyar's celebrated alphabetical moral primer teaching ethical values through memorable single-line maxims.[cite: 2]",
            "explanation_ta": "ஆத்திசூடி என்பது ஔவையாரின் புகழ்பெற்ற அகரவரிசை அறநூலாகும், இது எளிமையான ஒற்றை வரி வாக்கியங்கள் மூலம் அறநெறிகளைக் கற்பிக்கிறது.[cite: 1]"
        },
        {
            "question_no": 36,
            "question_en": "What is the literal meaning of the respectful title 'Avvaiyar' in Tamil?[cite: 2]",
            "question_ta": "'ஔவையார்' என்ற மரியாதைக்குரிய சொல்லின் நேரடிப் பொருள் என்ன?[cite: 1]",
            "options_en": [
                "Supreme Queen",
                "Venerable / Respected Mother",
                "Forest Songstress",
                "Royal Scholar"
            ],
            "options_ta": [
                "உயர் அரசி",
                "முதிய பெருமதிப்பிற்குரிய தாய்",
                "வனப் பாடகி",
                "அரச அறிஞர்"
            ],
            "answer_index": 1,
            "explanation_en": "Avvaiyar is an honorific title meaning 'Respected Elder Mother' or 'Venerable Woman', reflecting her maternal wisdom.[cite: 2]",
            "explanation_ta": "ஔவையார் என்பது 'மரியாதைக்குரிய தாய்' அல்லது 'மதிப்பிற்குரிய முதியவள்' என்று பொருள்படும் ஒரு பட்டமாகும், இது அவரது தாய்மை ஞானத்தைப் பிரதிபலிக்கிறது.[cite: 1]"
        }
    ],

    # =========================================================================
    # 7. HISTORY
    # =========================================================================
    "chola-dynasty": [
        {
            "question_no": 37,
            "question_en": "Which Chola emperor led successful overseas naval expeditions across Southeast Asia and the Srivijaya Empire?[cite: 2]",
            "question_ta": "தென்கிழக்கு ஆசியா மற்றும் ஸ்ரீவிஜயப் பேரரசு முழுவதும் வெற்றிகரமான கடற்படைப் படையெடுப்புகளை வழிநடத்திய சோழப் பேரரசர் யார்?[cite: 1]",
            "options_en": [
                "Karikala Chola",
                "Rajendra Chola I",
                "Kulothunga Chola III",
                "Vijayalaya Chola"
            ],
            "options_ta": [
                "கரிகால சோழன்",
                "முதலாம் ராஜேந்திர சோழன்",
                "மூன்றாம் குலோத்துங்க சோழன்",
                "விஜயாலய சோழன்"
            ],
            "answer_index": 1,
            "explanation_en": "Rajendra Chola I (r. 1014–1044 CE) commanded a blue-water navy that conquered Srivijaya (modern Indonesia and Malaysia).[cite: 2]",
            "explanation_ta": "முதலாம் ராஜேந்திர சோழன் (கி.பி. 1014-1044) ஸ்ரீவிஜயத்தை (நவீன இந்தோனேசியா மற்றும் மலேசியா) கைப்பற்றிய மாபெரும் கடற்படையை வழிநடத்தினார்.[cite: 1]"
        },
        {
            "question_no": 38,
            "question_en": "What was the democratic village electoral ballot system practiced by the Cholas called?[cite: 2]",
            "question_ta": "சோழர்களால் பின்பற்றப்பட்ட ஜனநாயக கிராமத் தேர்தல் வாக்குச்சீட்டு முறை எவ்வாறு அழைக்கப்பட்டது?[cite: 1]",
            "options_en": [
                "Kudavolai system",
                "Nayankara system",
                "Mansabdari system",
                "Poligar system"
            ],
            "options_ta": [
                "குடவோலை முறை",
                "நாயங்கர முறை",
                "மன்சப்தாரி முறை",
                "பாளையக்காரர் முறை"
            ],
            "answer_index": 0,
            "explanation_en": "The Kudavolai system, recorded in the Uthiramerur inscriptions, used palm-leaf ballots drawn from an earthen pot to elect village councils.[cite: 2]",
            "explanation_ta": "உத்திரமேரூர் கல்வெட்டுகளில் பதிவு செய்யப்பட்டுள்ள குடவோலை முறை, கிராம சபைகளைத் தேர்ந்தெடுக்க மண்பானையில் இருந்து பனை ஓலைகளை எடுக்கும் தேர்தல் முறையாகும்.[cite: 1]"
        },
        {
            "question_no": 39,
            "question_en": "Which world-renowned metal sculptures were perfected by Chola artisans using the lost-wax casting technique?[cite: 2]",
            "question_ta": "மெழுகு வார்ப்பு நுட்பத்தைப் பயன்படுத்தி சோழக் கலைஞர்களால் முழுமையாக்கப்பட்ட உலகப் புகழ்பெற்ற உலோகச் சிற்பங்கள் யாவை?[cite: 1]",
            "options_en": [
                "Iron cannons and battering rams",
                "Chola bronze Nataraja (dancing Shiva) sculptures",
                "Cast silver chariots",
                "Gold ceremonial armor"
            ],
            "options_ta": [
                "இரும்பு பீரங்கிகள் மற்றும் இடிதாங்கிகள்",
                "சோழர் வெண்கல நடராஜர் (ஆடல்வல்லான்) சிற்பங்கள்",
                "வார்ப்பிரும்பு வெள்ளி ரதங்கள்",
                "தங்கச் சடங்கு கவசங்கள்"
            ],
            "answer_index": 1,
            "explanation_en": "Chola bronzes, especially the iconic cosmic dancing Shiva as Nataraja, are globally celebrated masterpieces of lost-wax casting.[cite: 2]",
            "explanation_ta": "சோழர்களின் வெண்கலச் சிற்பங்கள், குறிப்பாக உலகப் புகழ்பெற்ற நடராஜர் (ஆடல்வல்லான்) சிற்பம், மெழுகு வார்ப்பின் உலகளாவிய தலைசிறந்த படைப்புகளாகும்.[cite: 1]"
        }
    ],

    "sangam-period": [
        {
            "question_no": 40,
            "question_en": "Which three dynasties constituted the 'Three Crowned Kings' (Moovendhar) of classical Tamilakam?[cite: 2]",
            "question_ta": "பண்டைய தமிழகத்தின் 'மூவேந்தர்கள்' என அழைக்கப்பட்ட மூன்று அரச வம்சங்கள் யாவை?[cite: 1]",
            "options_en": [
                "Maurya, Gupta, and Kushan",
                "Chera, Chola, and Pandya",
                "Pallava, Chalukya, and Rashtrakuta",
                "Vijayanagara, Nayak, and Maratha"
            ],
            "options_ta": [
                "மௌரியர், குப்தர், மற்றும் குஷானர்",
                "சேர, சோழ, மற்றும் பாண்டியர்",
                "பல்லவர், சாளுக்கியர், மற்றும் ராஷ்டிரகூடர்",
                "விஜயநகரர், நாயக்கர், மற்றும் மராட்டியர்"
            ],
            "answer_index": 1,
            "explanation_en": "The Cheras, Cholas, and Pandyas were the Three Crowned Kings (Moovendhar) who governed the Sangam Tamil world.[cite: 2]",
            "explanation_ta": "சங்ககாலத் தமிழ் நிலத்தை ஆட்சி செய்த சேர, சோழ, பாண்டிய மன்னர்கள் மூவேந்தர்கள் என்று அழைக்கப்பட்டனர்.[cite: 1]"
        },
        {
            "question_no": 41,
            "question_en": "What prized spice exported from ancient Tamil ports was known as 'black gold' in the Roman Empire?[cite: 2]",
            "question_ta": "பண்டைய தமிழ் துறைமுகங்களில் இருந்து ஏற்றுமதி செய்யப்பட்டு ரோமானியப் பேரரசில் 'கருப்பு தங்கம்' என அழைக்கப்பட்ட மதிப்புமிக்க மசாலா எது?[cite: 1]",
            "options_en": [
                "Cardamom seeds",
                "Black pepper (Milagu)",
                "Cinnamon bark",
                "Dry ginger"
            ],
            "options_ta": [
                "ஏலக்காய்",
                "கருமிளகு",
                "இலவங்கப்பட்டை",
                "சுக்கு (உலர்ந்த இஞ்சி)"
            ],
            "answer_index": 1,
            "explanation_en": "Black pepper (Milagu) was so highly valued across the Roman Empire that it was traded for its weight in gold coins.[cite: 2]",
            "explanation_ta": "ரோமானியப் பேரரசு முழுவதும் கருமிளகு மிகவும் மதிப்புமிக்கதாகக் கருதப்பட்டதால், அது தங்க நாணயங்களுக்கு ஈடாக வர்த்தகம் செய்யப்பட்டது.[cite: 1]"
        },
        {
            "question_no": 42,
            "question_en": "Which major archaeological excavation near Madurai uncovered 2,600-year-old urban Sangam settlements with brick drainage and inscribed pottery?[cite: 2]",
            "question_ta": "மதுரைக்கு அருகிலுள்ள எந்த முக்கிய அகழ்வாராய்ச்சியில் செங்கல் வடிகால் மற்றும் எழுத்துக்கள் பொறிக்கப்பட்ட பானைகளுடன் 2,600 ஆண்டுகள் பழமையான நகர்ப்புற சங்க காலக் குடியிருப்புகள் கண்டுபிடிக்கப்பட்டன?[cite: 1]",
            "options_en": [
                "Hampi",
                "Keezhadi",
                "Lothal",
                "Taxila"
            ],
            "options_ta": [
                "ஹம்பி",
                "கீழடி",
                "லோத்தல்",
                "தட்சசீலம்"
            ],
            "answer_index": 1,
            "explanation_en": "Keezhadi excavations along the Vaigai river confirm a literate, urban civilization in Tamil Nadu dating to the 6th century BCE.[cite: 2]",
            "explanation_ta": "வைகை நதிக்கரையில் அமைந்துள்ள கீழடி அகழ்வாராய்ச்சி, கி.மு. 6 ஆம் நூற்றாண்டைச் சேர்ந்த தமிழ்நாட்டின் எழுத்தறிவு பெற்ற நகர்ப்புற நாகரிகத்தை உறுதிப்படுத்துகிறது.[cite: 1]"
        }
    ],

    # =========================================================================
    # 8. PLACES
    # =========================================================================
    "madurai-meenakshi": [
        {
            "question_no": 43,
            "question_en": "How many towering gateway towers (Gopurams) surround the Madurai Meenakshi Amman Temple complex?[cite: 2]",
            "question_ta": "மதுரை மீனாட்சி அம்மன் கோவில் வளாகத்தைச் சுற்றி எத்தனை பிரம்மாண்ட நுழைவு கோபுரங்கள் உள்ளன?[cite: 1]",
            "options_en": [
                "4 Gopurams",
                "14 Gopurams",
                "21 Gopurams",
                "8 Gopurams"
            ],
            "options_ta": [
                "4 கோபுரங்கள்",
                "14 கோபுரங்கள்",
                "21 கோபுரங்கள்",
                "8 கோபுரங்கள்"
            ],
            "answer_index": 1,
            "explanation_en": "The Meenakshi Temple complex features 14 soaring Gopurams encrusted with thousands of painted mythological figures.[cite: 2]",
            "explanation_ta": "மீனாட்சி கோவில் வளாகம் ஆயிரக்கணக்கான வர்ணம் பூசப்பட்ட புராண உருவங்களால் சூழப்பட்ட 14 விண்ணுயர்ந்த கோபுரங்களைக் கொண்டுள்ளது.[cite: 1]"
        },
        {
            "question_no": 44,
            "question_en": "What acoustic marvel inside the temple produces musical swaras when gently tapped?[cite: 2]",
            "question_ta": "கோவிலின் உள்ளே மெதுவாகத் தட்டும்போது இசை ஸ்வரங்களை உருவாக்கும் ஒலியியல் அதிசயம் எது?[cite: 1]",
            "options_en": [
                "The Golden Lotus Tank",
                "Monolithic musical stone pillars in the Hall of 1000 Pillars",
                "The main brass flagstaff (Kodimaram)",
                "The granite sanctum doorframe"
            ],
            "options_ta": [
                "பொற்றாமரைக் குளம்",
                "ஆயிரங்கால் மண்டபத்தில் உள்ள ஒற்றைக்கல் இசைத் தூண்கள்",
                "முக்கிய பித்தளை கொடிமரம்",
                "கருங்கல் கருவறை கதவு"
            ],
            "answer_index": 1,
            "explanation_en": "The carved musical pillars in the Meenakshi Temple complex resonate with distinct melodic musical notes when tapped.[cite: 2]",
            "explanation_ta": "மீனாட்சி கோவில் வளாகத்தில் செதுக்கப்பட்ட இசைத் தூண்கள் தட்டும்போது தனித்துவமான இனிய இசை ஸ்வரங்களை ஒலிக்கச் செய்கின்றன.[cite: 1]"
        },
        {
            "question_no": 45,
            "question_en": "What is the name of the sacred tank inside the temple where ancient Sangam poets evaluated literary manuscripts?[cite: 2]",
            "question_ta": "பண்டைய சங்கப் புலவர்கள் இலக்கிய ஓலைச்சுவடிகளை மதிப்பீடு செய்த கோவிலின் உள்ளே உள்ள புனிதக் குளத்தின் பெயர் என்ன?[cite: 1]",
            "options_en": [
                "Saravana Poigai",
                "Potramarai Kulam (Golden Lotus Tank)",
                "Mahamaham Tank",
                "Shivaganga Tank"
            ],
            "options_ta": [
                "சரவணப் பொய்கை",
                "பொற்றாமரைக் குளம்",
                "மகாமகக் குளம்",
                "சிவகங்கைக் குளம்"
            ],
            "answer_index": 1,
            "explanation_en": "Potramarai Kulam (Golden Lotus Tank) is the sacred water body where the Sangam literary bench evaluated poems.[cite: 2]",
            "explanation_ta": "பொற்றாமரைக் குளம் என்பது சங்க இலக்கியப் புலவர்கள் கவிதைகளை மதிப்பீடு செய்த புனித நீர்நிலையாகும்.[cite: 1]"
        }
    ],

    "thanjavur": [
        {
            "question_no": 46,
            "question_en": "What precious material is uniquely embedded in traditional Tanjore Paintings to give them their radiant luster?[cite: 2]",
            "question_ta": "பாரம்பரிய தஞ்சாவூர் ஓவியங்களுக்கு ஒளிரும் பிரகாசத்தை அளிக்க தனித்துவமாகப் பதிக்கப்படும் விலையுயர்ந்த பொருள் எது?[cite: 1]",
            "options_en": [
                "Crushed sea pearls",
                "22-karat gold leaf and semi-precious gems",
                "Fine silver wire filigree",
                "Polished river pebbles"
            ],
            "options_ta": [
                "நொறுக்கப்பட்ட கடல் முத்துக்கள்",
                "22 காரட் தங்க ரேக்குகள் மற்றும் நவரத்தினக் கற்கள்",
                "சிறந்த வெள்ளி கம்பி வேலைப்பாடுகள்",
                "பளபளப்பான நதிக் கூழாங்கற்கள்"
            ],
            "answer_index": 1,
            "explanation_en": "Tanjore paintings feature rich gesso relief work overlaid with genuine 22-karat gold foil and embedded gems.[cite: 2]",
            "explanation_ta": "தஞ்சாவூர் ஓவியங்கள் 22 காரட் அசல் தங்கத் தகடு மற்றும் பதிக்கப்பட்ட நவரத்தினக் கற்களால் மேலெழுந்தவாரியாகக் காட்சியளிக்கின்றன.[cite: 1]"
        },
        {
            "question_no": 47,
            "question_en": "What scientific principle enables Thanjavur Bobblehead Dolls (Thalaiyatti Bommai) to right themselves when tilted?[cite: 2]",
            "question_ta": "தஞ்சாவூர் தலையாட்டி பொம்மைகள் சாய்க்கப்படும் போது தங்களைத் தாங்களே நிமிர்த்திக் கொள்ள உதவும் அறிவியல் கொள்கை எது?[cite: 1]",
            "options_en": [
                "Magnetic attraction in the base",
                "Low center of gravity with a rounded, weighted base",
                "Internal wound clockwork springs",
                "Pressurized pneumatic chambers"
            ],
            "options_ta": [
                "அடிப்படையில் காந்த ஈர்ப்பு",
                "வட்டமான, கனமான அடிப்பகுதியைக் கொண்ட குறைந்த புவியீர்ப்பு மையம் (Low center of gravity)",
                "உட்புற கடிகார சுருள்கள்",
                "அழுத்தப்பட்ட காற்று அறைகள்"
            ],
            "answer_index": 1,
            "explanation_en": "The dolls are crafted with a heavy, rounded clay base that keeps their center of gravity low, allowing continuous balancing without toppling.[cite: 2]",
            "explanation_ta": "பொம்மைகள் கனமான, வட்டமான களிமண் அடிப்பகுதியைக் கொண்டு உருவாக்கப்படுவதால், அவற்றின் ஈர்ப்பு மையம் குறைவாகப் பராமரிக்கப்பட்டு விழாமல் சமநிலைப்படுத்துகிறது.[cite: 1]"
        },
        {
            "question_no": 48,
            "question_en": "Which historic royal repository in Thanjavur preserves over 60,000 rare palm-leaf and paper manuscripts?[cite: 2]",
            "question_ta": "தஞ்சாவூரில் 60,000-க்கும் மேற்பட்ட அரிய ஓலைச்சுவடிகள் மற்றும் காகித கையெழுத்துப் பிரதிகளைப் பாதுகாக்கும் வரலாற்றுச் சிறப்புமிக்க அரச நூலகம் எது?[cite: 1]",
            "options_en": [
                "Connemara Public Library",
                "Saraswathi Mahal Library",
                "Asiatic Society Archives",
                "Adyar Theosophical Library"
            ],
            "options_ta": [
                "கன்னிமாரா பொது நூலகம்",
                "சரசுவதி மகால் நூலகம்",
                "ஆசியாட்டிக் சொசைட்டி ஆவணப்பககம்",
                "அடையாறு பிரம்மஞான சபை நூலகம்"
            ],
            "answer_index": 1,
            "explanation_en": "Established by Nayak rulers and enriched by Maratha King Serfoji II, Saraswathi Mahal Library is one of Asia's most historic manuscript repositories.[cite: 2]",
            "explanation_ta": "நாயக்க மன்னர்களால் நிறுவப்பட்டு மராட்டிய மன்னர் இரண்டாம் சரபோஜியால் வளப்படுத்தப்பட்ட சரசுவதி மகால் நூலகம் ஆசியாவின் மிக வரலாற்றுச் சிறப்புமிக்க ஓலைச்சுவடி ஆவணப்பககங்களில் ஒன்றாகும்.[cite: 1]"
        }
    ]
}