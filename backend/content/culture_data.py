"""
Culture Dataset for Feature 4 — Tamil Culture Explorer
Aurex'26 CICT Tamil Learning Portal

Contains structured, authentic, source-attributed cultural entries across the 8 core categories:
1. Food
2. Festivals
3. Arts
4. Architecture
5. Language & Traditions
6. People
7. History
8. Places

All 16 existing topic slugs are strictly preserved.
Each topic includes 2 to 3 substantive paragraphs in English and Tamil.
"""

CULTURE_DATA = [
    # =========================================================================
    # 1. FOOD
    # =========================================================================
    {
        "slug": "pongal-dish",
        "category": "Food",
        "title_en": "Pongal (Venn & Sakkarai)",
        "title_ta": "பொங்கல் உணவு",
        "subtitle_en": "Traditional Tamil harvest dish of rice, lentils, ghee, and jaggery",
        "subtitle_ta": "அரிசி, பருப்பு, நெய், வெல்லம் கலந்த தமிழரின் பண்பாட்டு அறுவடை உணவு",
        "summary_en": "Pongal is the quintessential culinary symbol of Tamil hospitality and harvest bounty, prepared in both sweet (Sakkarai) and savory (Venn) varieties during celebrations and daily breakfasts.",
        "summary_ta": "பொங்கல் தமிழ் கலாச்சாரத்தின் முதன்மை விருந்தோம்பல் மற்றும் அறுவடை அடையாளமாகும்; தையல் திங்களில் புதிய நெல், பயறு, வெல்லம், நெய் சேர்த்துச் சமைக்கப்படும் மங்கல உணவாகும்.",
        "content_en": (
            "Pongal is the foundational culinary emblem of Tamil civilization, embodying the prosperity and abundance of the agrarian cycle. Derived from the Tamil verb 'pongu'—meaning 'to boil over' or 'overflow'—the dish symbolizes the joyous spilling over of good fortune, peace, and agricultural bounty. Prepared using freshly harvested paddy rice and split yellow moong dal, it is traditionally cooked in decorated earthenware pots over an open-air woodfire hearth. When the boiling milk froths over the brim of the pot, families rejoice with the traditional chant 'Pongalo Pongal!', offering the first serving to the Sun God (Surya) and Mother Earth as an act of cosmic thanksgiving.\n\n"
            "The culinary tradition bifurcates into two world-renowned varieties: Venn Pongal (savory) and Sakkarai Pongal (sweet). Venn Pongal is tempered with freshly cracked whole black pepper, roasted cumin seeds, finely minced ginger, aromatic curry leaves, golden-fried cashew nuts, and generous amounts of pure cow's ghee. Its creamy, melt-in-the-mouth texture offers an exquisite warmth and wholesome nutrition. In contrast, Sakkarai Pongal is sweetened with unrefined dark cane jaggery (Vellam), infused with fragrant green cardamom pods, freshly grated nutmeg, plump golden raisins, and toasted nuts, creating a deeply aromatic dessert reserved for sacred temple rituals and festive gatherings.\n\n"
            "Beyond its festive role, Pongal holds profound historical and nutritional significance. Epigraphical records in the Brihadisvara Temple of Thanjavur and various Chola-era copper plates document regular endowments of rice, ghee, and spices made specifically for preparing Pongal as temple prasadam over a thousand years ago. From a nutritional standpoint, the combination of rice and lentils delivers a complete amino acid profile, balanced with gut-soothing spices like ginger and black pepper, making it one of the healthiest, easily digestible staples of Tamil heritage."
        ),
        "content_ta": (
            "பொங்கல் தமிழர்களின் ஆழமான பண்பாட்டு அடையாளமாகவும், உழவர் திருநாளின் தலையாய மங்கல உணவாகவும் விளங்குகிறது. 'பொங்கு' என்ற வினைச்சொல்லிலிருந்து தோன்றிய இப்பெயர், வாழ்வில் வளம், மகிழ்ச்சி, அமைதி மற்றும் தான்யச் செல்வம் நிறைந்து பொங்கி வழிய வேண்டும் என்ற உன்னத வாழ்வியல் நோக்கத்தை உணர்த்துகிறது. புதிதாக அறுவடை செய்யப்பட்ட பச்சரிசியும், பாசிப்பருப்பும் சேர்த்து, மாவிலை-மஞ்சள் கொத்து கட்டிய புதிய மண்பானையில் பாலூற்றி அடுப்பில் வைத்து பொங்க விடுவது தமிழர்களின் தொன்மையான மரபாகும். பால் பொங்கி வழியும் நன்னாழிகையில் 'பொங்கலோ பொங்கல்!' என இல்லத்தினர் முழங்கி, இயற்கை அன்னைக்கும் சூரிய பகவானுக்கும் நன்றி செலுத்துகின்றனர்.\n\n"
            "இவ்வுணவு இரு பெரும் முதன்மை வகைகளைக் கொண்டது: சுவைமிகுந்த வெண் பொங்கல் மற்றும் தெய்வீக மணம் கமழும் சர்க்கரைப் பொங்கல். வெண் பொங்கலானது மிளகு, சீரகம், இஞ்சி, கறிவேப்பிலை, வறுத்த முந்திரி மற்றும் தூய பசு நெய் கொண்டு தாளிக்கப்பட்டு நாவில் கரையும் மென்மையுடன் சமைக்கப்படுகிறது. இது உடலுக்கு உடனடி ஆற்றலையும் செரிமானச் சீரையும் தருகிறது. மாறாக, சர்க்கரைப் பொங்கல் என்பது தூய நாட்டு வெல்லப்பாகு, நெய், ஏலக்காய், ஜாதிக்காய் மற்றும் உலர் திராட்சை கலந்து செய்யப்படும் தித்திக்கும் நைவேத்திய உணவாகும்; இது திருவிழாக்களிலும் வழிபாட்டுத் தலங்களிலும் முதன்மை பிரசாதமாக வழங்கப்படுகிறது.\n\n"
            "பொங்கல் உணவின் வரலாற்றுப் பின்னணி ஆயிரம் ஆண்டுகளுக்கும் முற்பட்ட சோழர் மற்றும் பாண்டியர் காலக் கல்வெட்டுகளில் பொறிக்கப்பட்டுள்ளது. தஞ்சைப் பெரிய கோவில் உள்ளிட்ட வரலாற்றுப் பிரசித்தி பெற்ற திருக்கோவில்களில் நித்திய நைவேத்தியமாகப் 'பொங்கல் அமுது' படைக்கப்பட்ட குறிப்புகள் காணப்படுகின்றன. தானியமும் பருப்பும் இணையும் போது உடலுக்குத் தேவையான முழுமையான புரதச் சத்துக்களும், மிளகு-சீரகம்-இஞ்சியின் மருத்துவக் குணங்களும் ஒருங்கே கிடைக்கப்பெறும் தன்னிகரற்ற சரிவிகித உணவு இதுவாகும்."
        ),
        "period": "Classical to Modern",
        "era": "Ancient Antiquity to Present",
        "region": "Tamil Nadu",
        "location_name": "Madurai Harvest Belt & Kaveri Delta, Tamil Nadu",
        "latitude": 9.9252,
        "longitude": 78.1198,
        "tags": "food,culinary,pongal,breakfast,harvest,prasadam,tradition",
        "related_slugs": "thai-pongal,idli-dosa,thanjavur",
        "image_url": "/assets/library/arusuvai_culinary.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Ven_Pongal.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Muthunarayanan / Wikimedia Commons",
        "image_caption": "Traditional Tamil Venn Pongal garnished with cashews, curry leaves, and roasted cumin",
        "source_name": "Tamil Virtual Academy & Department of Archaeology, Tamil Nadu",
        "source_url": "https://www.tamilvu.org/courses/degree/d061/d0611/html/d061155.htm",
    },
    {
        "slug": "idli-dosa",
        "category": "Food",
        "title_en": "Idli & Dosa",
        "title_ta": "இட்லி மற்றும் தோசை",
        "subtitle_en": "Ancient fermented steamed cakes and crisp golden crepes of Tamil Nadu",
        "subtitle_ta": "அரிசி-உளுந்து நொதித்தல் அறிவியலில் உருவான ஆவிப் பறக்கும் இட்லியும் மொறுமொறு தோசையும்",
        "summary_en": "Steamed fermented rice cakes (Idli) and crisp golden griddle crepes (Dosa) represent the pinnacle of ancient Tamil culinary biotechnology, served with coconut chutney and sambar.",
        "summary_ta": "ஆவியில் வெந்த பஞ்சுபோன்ற இட்லியும், பொன்னிற நெய் தோசையும் தமிழர்களின் தொன்மையான நொதித்தல் உணவு அறிவியலின் உலகப் புகழ்பெற்ற அடையாளங்களாகும்.",
        "content_en": (
            "Idli and Dosa represent the pinnacle of traditional Tamil culinary biotechnology, embodying centuries of refined food processing wisdom. Crafted from a scientifically balanced blend of parboiled rice and skinned black gram (urad dal), the soaked grains are stone-ground into a silky batter and allowed to undergo spontaneous overnight fermentation. This process is driven by wild lactic acid bacteria (such as Leuconostoc mesenteroides) and naturally occurring airborne yeasts. The anaerobic fermentation naturally leavens the mixture, multiplying vitamin B complex content, enhancing essential amino acid bioavailability, and synthesizing lactic acid that imparts a gentle, characteristic tang.\n\n"
            "The culinary preparation highlights two distinct cooking methods. Idli is steam-cooked in concave circular moulds without a single drop of cooking oil, producing cloud-soft, pillowy cakes that are globally recognized by health organizations as one of the most easily digestible, gut-friendly breakfast meals in existence. Conversely, Dosa batter is skillfully spread paper-thin in circular motions across a smoking-hot seasoned cast-iron thava (griddle) and roasted with cold-pressed sesame oil or clarified butter until golden and crispy. Varieties range from wafer-thin Paper Roast to spongy Thattu Dosa and aromatic Podi Dosa.\n\n"
            "Literary and historical references establish the deep antiquity of these dishes in Tamil civilization. The Sangam work Perumpanarruppadai and the 10th-century encyclopedia Manasollasa reference early griddle-baked fermented cakes described as delicious, crispy discs. Served alongside freshly grated stone-ground coconut chutney, spicy roasted shallot-tomato relish, and a piping hot tamarind-lentil vegetable sambar, Idli and Dosa remain an indispensable daily culinary ritual in millions of homes and bustling street tiffin stalls across Tamil Nadu and the global Tamil diaspora."
        ),
        "content_ta": (
            "இட்லியும் தோசையும் தமிழர்களின் உணவுப் பண்பாட்டின் மணிமகுடமாகவும், நுண்ணுயிரியல் நொதித்தல் அறிவியலின் வியத்தகு சாதனையாகவும் விளங்குகின்றன. புழுங்கல் அரிசியும் உளுந்தம்பருப்பும் குறிப்பிட்ட விகிதத்தில் ஊறவைக்கப்பட்டு, ஆட்டுக்கல்லில் பக்குவமாக அரைக்கப்பட்டு, இரவு முழுவதும் இயற்கையான முறையில் நொதிக்க வைக்கப்படுகின்றன. இந்த நொதித்தல் முறையானது மாவில் லாக்டிக் அமில பாக்டீரியாக்களை பெருக்கி, வைட்டமின் பி12 மற்றும் அத்தியாவசிய அமினோ அமிலங்களை அதிகப்படுத்தி, மாவினை இயற்கையாகவே மென்மையடையச் செய்கிறது.\n\n"
            "சமையல் முறையில் இட்லியும் தோசையும் இருவேறு தனித்துவமான கலைநயங்களைக் கொண்டுள்ளன. இட்லி என்பது எண்ணெய் துளியும் சேர்க்காமல் ஆவியில் வேகவைக்கப்படும் பஞ்சு போன்ற வெண்மையான உணவாகும்; இது உலக சுகாதார நிறுவனங்களால் பாராட்டப்பட்ட தலைசிறந்த, செரிமானத்திற்கு உகந்த ஆரோக்கிய உணவாகத் திகழ்கிறது. மறுபுறம், நன்கு சூடேற்றப்பட்ட இரும்புத் தவாவில் மாவை வட்டமாக மெல்லியதாகத் தேய்த்து, நல்லெண்ணெய் அல்லது நெய் சேர்த்துப் பொன்னிறமாக மொறுமொறுவெனச் சுட்டெடுக்கப்படும் தோசை, நாவிற்கு இணையற்ற சுவை விருந்தளிக்கிறது.\n\n"
            "சங்க இலக்கியமான பெரும்பாணாற்றுப்படையில் 'தோசை' போன்ற அப்ப வகைகள் நெய் மணக்கும் சுவையுடன் விவரிக்கப்பட்டுள்ளன. பத்தாம் நூற்றாண்டு இலக்கியங்களிலும், இடைக்கால சோழர் வரலாற்று ஆவணங்களிலும் இட்லி-தோசை தயாரிப்பு முறைகள் ஆவணப்படுத்தப்பட்டுள்ளன. நயம்பட அரைத்த தேங்காய் சட்னி, காரசாரமான தக்காளி-வெங்காய சட்னி, நறுமணமிக்க பருப்பு சாம்பார் மற்றும் எள்ளுப் பொடியுடன் இவற்றை உண்பது ஒவ்வொரு தமிழரின் அன்றாட வாழ்வியல் இன்பமாகும்."
        ),
        "period": "Sangam Era to Modern Era",
        "era": "Classical Antiquity to Present",
        "region": "Tamil Nadu & South India",
        "location_name": "Chennai & Madurai Heritage Culinary Centers, Tamil Nadu",
        "latitude": 13.0827,
        "longitude": 80.2707,
        "tags": "food,breakfast,idli,dosa,fermentation,culinary,tradition",
        "related_slugs": "pongal-dish,thanjavur,madurai-meenakshi",
        "image_url": "/assets/culture/idli-dosa.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Idli_Dosa_with_sambar.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Kashif Pathan / Wikimedia Commons",
        "image_caption": "Classic South Indian breakfast of crisp golden Dosa and steamed Idlis served with sambar and chutneys",
        "source_name": "Central Food Technological Research Institute (CFTRI) & Tamil Virtual Academy",
        "source_url": "https://www.tamilvu.org/library/lA410/html/lA410cnt.htm",
    },

    # =========================================================================
    # 2. FESTIVALS
    # =========================================================================
    {
        "slug": "thai-pongal",
        "category": "Festivals",
        "title_en": "Thai Pongal Harvest Festival",
        "title_ta": "தைப்பொங்கல் அறுவடைத் திருநாள்",
        "subtitle_en": "Four-day thanksgiving solar festival celebrating nature, sun, and cattle",
        "subtitle_ta": "உழவுக்கும் தொழிலுக்கும் இயற்கைக்கும் சூரியனுக்கும் நன்றி செலுத்தும் நான்கு நாள் தமிழ்த் திருவிழா",
        "summary_en": "Thai Pongal is the foremost secular thanksgiving festival of Tamils globally, celebrated across four days—Bhogi, Surya Pongal, Maattu Pongal, and Kaanum Pongal—honoring cosmic energy and agricultural labor.",
        "summary_ta": "தை மாதம் முதல் நாளில் தொடங்கும் தைப்பொங்கல், இயற்கைக்கும் சூரிய பகவானுக்கும் கால்நடைகளுக்கும் நன்றி செலுத்தும் உலகத் தமிழர்களின் தலையாய பண்பாட்டுத் திருவிழாவாகும்.",
        "content_en": (
            "Thai Pongal is the four-day solar harvest festival that marks the Sun's northward celestial journey (Uttarayana) and ushers in the auspicious Tamil month of Thai. Rooted in millennia-old agrarian traditions celebrated across the Tamil land, the festival is a profound expression of cosmic gratitude toward the natural elements—the Sun, rain, soil, and working animals—that sustain human life. The cultural maxim 'Thai Pirandhal Vazhi Pirakkum' ('With the birth of Thai, new avenues of prosperity open') reflects the collective joy of farmers reaping the rewards of their tireless agricultural toil.\n\n"
            "The celebrations unfold through four distinct, culturally rich days. Day one is Bhogi Pongal, dedicated to renewal and spiritual detachment, where discarded household items are ritually consigned to domestic bonfires, symbolizing the elimination of past negativity and welcoming fresh beginnings. Day two is Perum Pongal or Surya Pongal, the main festival day, where families gather in open courtyards adorned with intricate rice flour kolams, boiling fresh harvest rice, milk, and jaggery in newly fired clay pots tied with fresh turmeric leaves. When the pot froths over, joyous conch shells blow and the chant 'Pongalo Pongal!' fills the air.\n\n"
            "Day three is Maattu Pongal, an energetic homage to cattle whose labor plows the fields and enriches the soil. Bullocks and cows are bathed, their horns painted with vibrant colors, adorned with brass bells and floral garlands, and fed sweet Pongal. In rural regions, this day features the ancient heroic bull-embracing sport of Jallikattu (Eru Thazhuvuthal), recorded since the Sangam era. The final day, Kaanum Pongal, fosters community bonding through family excursions, social visits to elders, traditional folk performances, and sharing festive banquets across generations."
        ),
        "content_ta": (
            "தைப்பொங்கல் என்பது உலகெங்கும் வாழும் தமிழர்களால் சாதி, மத எல்லைகளைக் கடந்து கொண்டாடப்படும் உன்னதமான இயற்கை வழிபாட்டு மற்றும் அறுவடைத் திருவிழாவாகும். 'தை பிறந்தால் வழி பிறக்கும்' என்ற முதுமொழிக்கேற்ப, உழவர்கள் தங்கள் கடின உழைப்பின் பலனான புது நெல்லை அறுவடை செய்து, சூரிய பகவானுக்கும் இயற்கை அன்னைக்கும் நன்றி செலுத்தும் திருநாளாக இது அமைகிறது. சங்க காலத்து நற்றிணை, புறநானூறு பாடல்களிலேயே உழவர் அறுவடை செய்து இயற்கையைக் கொண்டாடிய பதிவுகள் காணப்படுகின்றன.\n\n"
            "இத்திருவிழா நான்கு நாட்கள் தனித்துவமான பண்பாட்டுச் சடங்குகளுடன் விமரிசையாகக் கொண்டாடப்படுகிறது. முதல் நாள் போகிப் பண்டிகை: 'பழையன கழிதலும் புதியன புகுதலும்' என்ற நன்னெறியின்படி, இல்லங்களில் உள்ள பயனற்ற பழைய பொருட்களைத் தீயிலிட்டு, உள்ளத்திலும் இல்லத்திலும் புதிய நல்சிந்தனைகளை வரவேற்பது. இரண்டாம் நாள் பெரும் பொங்கல் அல்லது தைப்பொங்கல்: சூரிய உதய வேளையில் வீட்டு முற்றத்தில் வண்ணக் கோலமிட்டு, புதுப் பானையில் மஞ்சள் கொத்து கட்டி, புது நெல்லரிசி இட்டுப் பொங்க வைத்து 'பொங்கலோ பொங்கல்' என வானதிர முழங்கி சூரியனுக்குப் படைத்து வணங்குவர்.\n\n"
            "மூன்றாம் நாள் மாட்டுப் பொங்கல்: உழவுத் தொழிலுக்கு உற்ற தோழனாக விளங்கும் மாடுகளையும் பசுக்களையும் நீராட்டி, கொம்புகளுக்கு வண்ணமிட்டு, மணிகள் பூட்டி நன்றி பாராட்டும் நாளாகும். கிராமப்புறங்களில் தமிழரின் வீர விளையாட்டான ஜல்லிக்கட்டு (ஏறுதழுவுதல்) இந்நாளில் பெரும் உற்சாகத்துடன் நடைபெறும். நான்காம் நாள் காணும் பொங்கல்: உற்றார், உறவினர்களை நேரில் கண்டு மகிழ்தல், பெரியவர்களிடம் ஆசி பெறுதல், சுற்றுலா செல்லுதல் மற்றும் சமுதாய நல்லிணக்கத்தை வளர்க்கும் நாளாகக் கொண்டாடப்படுகிறது."
        ),
        "period": "Annual Solar Event (Mid-January)",
        "era": "Sangam Antiquity to Present",
        "region": "Global Tamil Diaspora & Kaveri Delta",
        "location_name": "Thanjavur Delta Farmlands & Madurai, Tamil Nadu",
        "latitude": 10.7870,
        "longitude": 79.1378,
        "tags": "festival,pongal,harvest,sun,cattle,thai,thanksgiving,tradition",
        "related_slugs": "pongal-dish,puthandu,kolam-art",
        "image_url": "/assets/library/thai_pongal.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Aesthetic_Ven_Pongal.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Subramanian.M / Wikimedia Commons",
        "image_caption": "Festive sugarcane, painted earthen pot, and brass lamps prepared for Thai Pongal sunrise worship",
        "source_name": "Department of Information and Public Relations, Government of Tamil Nadu",
        "source_url": "https://www.tn.gov.in/",
    },
    {
        "slug": "puthandu",
        "category": "Festivals",
        "title_en": "Puthandu (Tamil New Year)",
        "title_ta": "தமிழ்ப் புத்தாண்டு (சித்திரை முதல் நாள்)",
        "subtitle_en": "Celebration of the astronomical Vernal Equinox and life's philosophical harmony",
        "subtitle_ta": "அறுசுவை வாழ்வின் தத்துவத்தை உணர்த்தும் சித்திரை மாத பிறப்பு மற்றும் மங்கல புத்தாண்டு",
        "summary_en": "Puthandu is the Tamil solar New Year celebrated on the first day of the Tamil month Chithirai (mid-April), featuring the auspicious Kanni visual display and symbolic neem flower pachadi.",
        "summary_ta": "சித்திரை 1-ஆம் நாள் கொண்டாடப்படும் தமிழ்ப் புத்தாண்டு, மங்கலப் பொருட்களால் அமைக்கப்பட்ட 'கன்னி' தரிசனம் மற்றும் அறுசுவை வேப்பம்பூ பச்சடியுடன் தொடங்குகிறது.",
        "content_en": (
            "Puthandu, also known as Chithirai Thirunaal, marks the commencement of the traditional Tamil solar calendar, coinciding with the astronomical vernal equinox when the sun enters the constellation Aries (Mesha Rasi) in mid-April. Tamil chronology is structured around a 60-year Jovian calendar cycle (Arupathu Aandukal), where each year possesses a unique poetic name, from Prabhava to Kshaya. The festival represents cosmic alignment, temporal renewal, and spiritual contemplation, celebrated across Tamil Nadu, Sri Lanka, Malaysia, Singapore, and worldwide diaspora communities.\n\n"
            "A core hallmark of Puthandu is the auspicious ritual of 'Kanni Paarthal' (viewing the auspicious dawn arrangement). On the eve of the New Year, elders arrange a decorative brass or silver platter in front of a mirror, laden with the sacred Mukkani (three royal fruits: mango, banana, and jackfruit), fresh betel leaves and areca nuts, gold and silver coins, silk garments, blooming flowers, and auspicious raw rice. At the crack of dawn, family members are led blindfolded to open their eyes first upon this glittering sight, invoking a year filled with prosperity, clear vision, and spiritual light.\n\n"
            "Central to Puthandu's culinary philosophy is the ceremonial preparation of 'Mangai Pachadi' or 'Veppam Poo Pachadi'—a dish deliberately incorporating the six fundamental tastes (Arusuvai). It blends the bitterness of fresh neem flowers (Kasappu), the sweetness of sugarcane jaggery (Inippu), the sourness of raw green mango (Pulippu), the pungency of green chilies (Kaaram), the salinity of sea salt (Uvarppu), and the astringency of mustard seeds (Thuvarppu). This culinary masterpiece serves as an ancient ethical sermon: life is an inevitable mosaic of diverse joys, struggles, triumphs, and sorrows, all of which must be met with emotional poise and equanimity."
        ),
        "content_ta": (
            "தமிழ்ப் புத்தாண்டு சித்திரை மாதத்தின் முதல் நாளில் சூரியனின் மேஷ ராசிப் பிரவேசத்தை ஒட்டி விமரிசையாகக் கொண்டாடப்படுகிறது. தமிழ் ஆண்டுக் கணக்கின்படி 60 ஆண்டுகளைக் கொண்ட சுழற்சி முறையில் (பிரபவ முதல் அட்சய வரை) ஒவ்வொரு ஆண்டும் தனித்துவமான பெயர் பெற்று மலர்கிறது. வானியல் ரீதியாக சூரியன் நிலநடுக்கோட்டை கடக்கும் வசந்த காலத் தொடக்கத்தை இது குறிக்கிறது. தமிழகம் மட்டுமின்றி இலங்கை, மலேசியா, சிங்கப்பூர் மற்றும் புலம்பெயர் தமிழ் சமூகங்கள் அனைவராலும் புத்தாண்டு உற்சாகத்துடன் வரவேற்கப்படுகிறது.\n\n"
            "புத்தாண்டின் விடியலில் மங்கலப் பார்வை காணும் 'கன்னி பார்த்தல்' மரபு மிகத் தொன்மையானது. புத்தாண்டுக்கு முந்தைய இரவு, பூஜை அறையில் கண்ணாடி முன்பாக மா, பலா, வாழை ஆகிய முக்கனிகள், வெற்றிலை பாக்கு, தங்க-வெள்ளி நகைகள், நாணயங்கள், நவதானியங்கள், பட்டு ஆடை மற்றும் மல்லிகைப் பூக்களை நேர்த்தியாக அடுக்குவர். சித்திரை முதல் நாள் அதிகாலையில் கண்விழித்து இந்தக் கன்னியைக் காண்பது, அந்த ஆண்டு முழுவதும் இல்லத்தில் செல்வமும் மகிழ்ச்சியும் நிலைத்திருக்கச் செய்யும் என்பது நம்பிக்கையாகும்.\n\n"
            "புத்தாண்டின் மிக முக்கிய பண்பாட்டு அம்சம் 'அறுசுவை வேப்பம்பூ பச்சடி' ஆகும். வேப்பம்பூவின் கசப்பு, வெல்லத்தின் இனிப்பு, மாங்காயின் புளிப்பு, மிளகாயின் காரம், உப்பின் உவர்ப்பு, கடுகின் துவர்ப்பு ஆகிய ஆறு சுவைகளும் ஒருங்கிணைந்து இதில் சமைக்கப்படுகின்றன. மனித வாழ்க்கை என்பது இன்பம், துன்பம், வெற்றி, சவால் என அனைத்தும் கலந்தது; அனைத்தையும் சமநோக்குடனும் மன முதிர்ச்சியுடனும் எதிர்கொள்ள வேண்டும் என்ற ஆழமான வாழ்வியல் தத்துவத்தை இந்த உணவு உணர்த்துகிறது."
        ),
        "period": "Annual Solar Event (April 14)",
        "era": "Ancient Solar Calendar Tradition to Present",
        "region": "Tamil Nadu, Puducherry & Global Tamil Diaspora",
        "location_name": "Chidambaram Cultural Sanctuary & Chennai, Tamil Nadu",
        "latitude": 11.3992,
        "longitude": 79.6934,
        "tags": "festival,puthandu,newyear,chithirai,arusuvai,kanni,tradition",
        "related_slugs": "thai-pongal,kolam-art,sangam-literature-legacy",
        "image_url": "/assets/library/puthandu_new_year.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Puthandu_Vaisakhi_Tamil_Hindu_New_Year.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Ms Sarah Welch / Wikimedia Commons",
        "image_caption": "Traditional auspicious Kanni tray display with Mukkani fruits, betel leaves, and brass lamp for Puthandu",
        "source_name": "Tamil Virtual Academy & International Institute of Tamil Studies",
        "source_url": "https://www.tamilvu.org/library/lA410/html/lA410cnt.htm",
    },

    # =========================================================================
    # 3. ARTS
    # =========================================================================
    {
        "slug": "bharatanatyam",
        "category": "Arts",
        "title_en": "Bharatanatyam",
        "title_ta": "பரதநாட்டியம்",
        "subtitle_en": "Millennia-old classical dance drama originating in the sacred temples of Tamil Nadu",
        "subtitle_ta": "பாவம், ராகம், தாளம் மற்றும் ஆடல் முத்திரைகள் இணைந்த தமிழரின் செவ்வியல் ஆடற்கலை",
        "summary_en": "Bharatanatyam is one of India's oldest classical dance traditions, codified from temple Sadir dances into a sophisticated theatre art utilizing mudras, rhythmic footwork, and expressive abhinaya.",
        "summary_ta": "தமிழ்நாட்டின் திருக்கோவில்களில் தோன்றி வளர்ந்த பரதநாட்டியம், சிற்ப நுணுக்கம் கொண்ட உடல் அசைவுகள், நவரச பாவனைகள் மற்றும் தாளக் கட்டுகளுடன் கூடிய செவ்வியல் நடனமாகும்.",
        "content_en": (
            "Bharatanatyam is the premier classical dance heritage of Tamil Nadu and one of the oldest codified dance traditions in world history, tracing its antiquity back over two millennia. Rooted in the ancient Sanskrit treatise Natya Shastra and the Tamil epic Silappadikaram (which exhaustively describes the virtuoso dancing of the maiden Madhavi), the dance form was historically cultivated in sacred temples as Sadir Attam by dedicated hereditary artistes known as Devadasis. The name 'Bharatanatyam' is an acronymous synthesis of four fundamental pillars: Bha (Bhava / emotion), Ra (Raga / melodic framework), Ta (Tala / rhythmic metre), and Natyam (dramatic dance).\n\n"
            "The performance technique of Bharatanatyam is an exquisite architectural geometry of the human body. The dancer maintains the foundational Araimandi (a half-seated, demi-plié posture) and executes lightning-fast foot tapping (Tattadavu) that resonates through tuned bronze ankle bells (Salangai). Hand gestures known as Hastas or Mudras (consisting of 28 single-hand Asamyuta and 24 double-hand Samyuta gestures) function as a visual language capable of conveying intricate narratives. Dancers balance pure rhythmic footwork (Nritta) with deeply expressive facial miming and emotional storytelling (Abhinaya), bringing alive the nine universal emotional sentiments (Navarasas).\n\n"
            "In the early 20th century, Bharatanatyam underwent a historic cultural renaissance led by pioneers such as Rukmini Devi Arundale, E. Krishna Iyer, and the Thanjavur Quartet brothers who systematized the classical Margam performance repertoire (Alarippu, Jathiswaram, Shabdam, Varnam, Padam, and Thillana). Today, accompanied by Carnatic vocalists, Mridangam drums, violin, flute, and the crisp iron cymbals of the Nattuvanar, Bharatanatyam transcends geographic borders, celebrated on premier global stages as the ultimate embodiment of Indian classical aesthetics and devotional storytelling."
        ),
        "content_ta": (
            "பரதநாட்டியம் தமிழ்நாட்டின் தனித்துவமிக்க செவ்வியல் ஆடற்கலையாகும்; இது இரண்டாயிரத்திற்கும் மேற்பட்ட வரலாற்றுத் தொன்மையைக் கொண்டது. சங்க காலத்து சிலப்பதிகாரத்தில் மாதவியின் ஆடலரங்கேற்றம் பற்றிய விரிவான வர்ணனைகள் மற்றும் நடனக் கலைக் கோட்பாடுகள் இடம்பெற்றுள்ளன. தொடக்கத்தில் தமிழகத் திருக்கோவில்களில் 'சதிர் ஆட்டம்' என்றும் 'சின்ன மேளம்' என்றும் போற்றப்பட்ட இக்கலை, இறை வழிபாட்டின் உன்னத வடிவமாகத் திகழ்ந்தது. 'பாவம்' (உணர்வு), 'ராகம்' (இசை), 'தாளம்' (கால அளவு), 'நாட்டியம்' (கூத்து) ஆகிய நான்கின் முதல் எழுத்துக்களை இணைத்து 'பரதநாட்டியம்' எனப் பெயர் பெற்றது.\n\n"
            "பரதநாட்டியத்தின் உடல் அசைவுகள் கோவில் சிற்பங்களின் வடிவவியலை ஒத்த வியக்கத்தக்க துல்லியத்தைக் கொண்டுள்ளன. உடலை அரைவட்ட வடிவில் நிறுத்தும் 'அரைமண்டி' நிலை, கால்களால் தாள நயத்துடன் நிலத்தைத் தட்டும் 'அடவுகள்', கால்களில் கட்டப்பட்ட சலங்கைகளின் நயமான ஒலி ஆகியவை இதன் தனித்துவங்களாகும். 28 ஒற்றைக் கை முத்திரைகளும் (இணைவிலாக் கை), 24 இரட்டைக் கை முத்திரைகளும் (இணைந்த கை) சேர்ந்து நவரச பாவங்களையும் மனித உணர்ச்சிகளையும் காவியக் கதைகளையும் பார்வையாளர்களுக்குத் தத்ரூபமாக உணர்த்துகின்றன.\n\n"
            "20-ஆம் நூற்றாண்டின் தொடக்கத்தில் ருக்மிணி தேவி அருண்டேல், இ. கிருஷ்ணய்யர் மற்றும் தஞ்சை நால்வர் ஆகியோரின் பெரும் முயற்சியால் பரதநாட்டியம் நவீன மேடைக்கலையாக மறுமலர்ச்சி பெற்றது. அலாரிப்பு, ஜதிஸ்வரம், சப்தம், வர்ணம், பதம், தில்லானா என்ற 'மார்க்க' அமைப்பில் இது நிகழ்த்தப்படுகிறது. மிருதங்கம், நட்டுவாங்கம், வாய்ப்பாட்டு, புல்லாங்குழல் மற்றும் வயலின் இசையின் துணையோடு ஆடப்படும் இக்கலை, இன்று உலகளாவிய அரங்குகளில் தமிழரின் பண்பாட்டுப் பெருமிதமாகப் போற்றப்படுகிறது."
        ),
        "period": "Ancient to Modern",
        "era": "Sangam Era & Chola Era to Present",
        "region": "Tamil Nadu",
        "location_name": "Thanjavur Royal Courts & Kalakshetra, Chennai, Tamil Nadu",
        "latitude": 13.0035,
        "longitude": 80.2565,
        "tags": "dance,bharatanatyam,classical,mudras,abhinaya,tala,arts",
        "related_slugs": "karagattam,brihadisvara-temple,sangam-literature-legacy",
        "image_url": "/assets/library/bharatanatyam.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Bharatanatyam_Performance_DS.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Deepak Singhal / Wikimedia Commons",
        "image_caption": "Classical Bharatanatyam dancer demonstrating intricate hand mudras and seated Araimandi posture",
        "source_name": "Sangeet Natak Akademi & Tamil Virtual Academy",
        "source_url": "https://www.tamilvu.org/library/lA410/html/lA410cnt.htm",
    },
    {
        "slug": "karagattam",
        "category": "Arts",
        "title_en": "Karagattam Folk Dance",
        "title_ta": "கரகாட்டம் கிராமியக் கலை",
        "subtitle_en": "Ancient balancing folk dance honoring the rain goddess Mariamman with decorated brass pots",
        "subtitle_ta": "மழைத்தெய்வ வழிபாட்டில் தலையில் அலங்கரித்த கரகம் ஏந்தி நயம்பட ஆடும் தமிழரின் தொல் கலை",
        "summary_en": "Karagattam is Tamil Nadu's vibrant folk dance where performers balance decorated brass or clay pots crowned with floral towers on their heads while performing intricate acrobatic footwork.",
        "summary_ta": "மழையையும் செழிப்பையும் வேண்டி மாரியம்மன் வழிபாட்டில் தலையில் பித்தளை அல்லது மண் கரகம் சுமந்து ஆடப்படும் தமிழரின் முதன்மையான கிராமிய ஆடற்கலையாகும்.",
        "content_en": (
            "Karagattam is one of the most vibrant and ancient folk dance traditions of Tamil Nadu, whose historical origins are documented in Sangam literature as 'Kudakkoothu' (the pot dance performed by Lord Krishna). Rooted in rural village temple festivities, the dance is fundamentally dedicated to Mariamman, the goddess of rain and fertility, praying for seasonal monsoon showers and bountiful crop harvests. The performance is divided into two broad genres: Shakthi Karagam, a strictly religious ritual dance performed inside sanctums, and Aatta Karagam, a dazzling artistic folk entertainment staged for rural community audiences.\n\n"
            "The visual centerpiece of Karagattam is the 'Karagam' itself—a heavy brass, copper, or earthen pot filled with uncooked paddy rice and consecrated water, closed with a peeled coconut, and topped with a cluster of fresh neem leaves. The entire vessel is crowned with a towering conical cone decorated with vibrant marigold and jasmine garlands, sparkling tinsel, and a wooden parrot emblem. Dancers balance this weighted structure entirely on the crown of their heads without touching it with their hands, executing breathtaking acrobatic movements, rolling on the ground, climbing ladders, and threading needles with their eyelids while maintaining uninterrupted rhythm.\n\n"
            "Karagattam is driven by the infectious, high-tempo rhythm of traditional folk orchestration known as Thavil, Naiyandi Melam, Nadaswaram, and Pambai drums. Male and female dancers wear brightly colored silk dhotis, glittering sashes, and tinkling ankle bells, exchanging witty spoken verses, comedic banter, and theatrical improvisations. As an enduring folk heritage, Karagattam embodies the vitality, resilience, and boundless artistic ingenuity of rural Tamil communities, preserving ancestral folklore across generations."
        ),
        "content_ta": (
            "கரகாட்டம் தமிழ்நாட்டின் கிராமியக் கலை வடிவங்களில் மிகவும் புகழ்பெற்றதும், தொன்மையானதுமான ஆடற்கலையாகும். சங்க இலக்கியங்களில் இது 'குடக்கூத்து' என்ற பெயரில் போற்றப்பட்டுள்ளது. மழைக் கடவுளான மாரியம்மனை வேண்டி, கிராமப்புறக் கோவில் திருவிழாக்களில் விவசாயச் செழிப்புக்காகவும், ஊர் நலம் காக்கவும் இது ஆடப்படுகிறது. கரகாட்டம் இரு பெரும் பிரிவுகளாக நிகழ்த்தப்படுகிறது: கோவில்களில் பக்தி பூர்வமாக ஆடப்படும் 'சக்தி கரகம்' மற்றும் பொதுமக்களின் கலை ரசனைக்காக மேடைகளில் ஆடப்படும் 'ஆட்டக் கரகம்' ஆகும்.\n\n"
            "கரகாட்டத்தின் தலையாய சிறப்பம்சம் நடனக் கலைஞர்கள் தலையில் சுமக்கும் 'கரகம்' ஆகும். பித்தளை அல்லது செம்புச் செம்பில் பச்சரிசியும் புனித நீரும் நிரப்பப்பட்டு, அதன் வாயில் தேங்காய் வைக்கப்பட்டு, வேப்பிலை சொருகப்படும். அதன் மேல் மூங்கில் குச்சிகளால் கூம்பு வடிவம் செய்யப்பட்டு மல்லிகை, கனகாம்பரம், சாமந்திப் பூக்களாலும் பளபளக்கும் ஜரிகைகளாலும் அலங்கரிக்கப்பட்டு, உச்சியில் மரத்தாலான கிளி பொம்மை பொருத்தப்படும். இந்த எடைகொண்ட கரகத்தைத் தலையில் கைகளால் தொடாமல் சமநிலைப்படுத்தி, தரையில் குனிந்து காசுகளை எடுத்தல், ஏணியில் ஏறுதல், ஊசியில் நூல் கோர்த்தல் போன்ற வியக்கத்தக்க சாகசங்களைச் செய்து ஆடுவர்.\n\n"
            "நையாண்டி மேளம், நாதஸ்வரம், தவில், பம்பை, தமருக்கு போன்ற கிராமிய இசைக் கருவிகளின் துள்ளலான தாளக் கட்டுகளுக்கு ஏற்ப கரகாட்டம் ஆடப்படுகிறது. வண்ணமயமான பட்டு உடைகள், இடுப்புக் கச்சைகள் மற்றும் கால்களில் சலங்கைகள் அணிந்து கலைஞர்கள் நையாண்டிப் பாடல்களுடனும் நகைச்சுவை உரையாடல்களுடனும் ஆடுவர். கரகாட்டம் என்பது தமிழர்களின் மண்ணின் மணமும், நாட்டுப்புற வாழ்வியல் ஆற்றலும் மிளிரும் தன்னிகரற்ற நாட்டுப்புறக் கலைப் பொக்கிஷமாகும்."
        ),
        "period": "Sangam Era to Modern Era",
        "era": "Ancient Folk Tradition to Present",
        "region": "Rural Tamil Nadu",
        "location_name": "Madurai & Thanjavur Rural Folk Heartlands, Tamil Nadu",
        "latitude": 9.9252,
        "longitude": 78.1198,
        "tags": "folk,dance,karagattam,mariamman,kudam,temple,tradition,arts",
        "related_slugs": "bharatanatyam,thai-pongal,madurai-meenakshi",
        "image_url": "/assets/library/karagattam_dance.jpeg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Karagattam_Folk_Dance_Tamil_Nadu.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Tamil Nadu Tourism / Wikimedia Commons",
        "image_caption": "Karagattam folk dancers gracefully balancing multi-tiered floral brass pots while performing rhythmic steps",
        "source_name": "Tamil Nadu Folk Arts Development Board & Department of Art and Culture",
        "source_url": "https://www.artandculture.tn.gov.in/",
    },

    # =========================================================================
    # 4. ARCHITECTURE
    # =========================================================================
    {
        "slug": "brihadisvara-temple",
        "category": "Architecture",
        "title_en": "Brihadisvara Temple (Peruvudaiyar Kovil)",
        "title_ta": "தஞ்சைப் பெருவுடையார் கோவில் (பிரகதீஸ்வரர் கோவில்)",
        "subtitle_en": "11th-century monolithic granite marvel of Raja Raja Chola I and UNESCO World Heritage monument",
        "subtitle_ta": "முதலாம் இராஜராஜ சோழனால் கட்டப்பட்ட திராவிடக் கட்டிடக்கலையின் சிகரமும் உலகப் பாரம்பரியச் சின்னமும்",
        "summary_en": "Built entirely of interlocking granite in 1010 CE by Emperor Raja Raja Chola I, the Brihadisvara Temple stands as one of the grandest achievements of Dravidian temple architecture.",
        "summary_ta": "கி.பி. 1010-ல் முதலாம் இராஜராஜ சோழனால் முழுக்க முழுக்கக் கருங்கற்களால் கட்டப்பட்ட தஞ்சைப் பெரிய கோவில், உலக அதிசயங்களுக்கு இணையான திராவிடக் கட்டிடக்கலை அற்புதம்.",
        "content_en": (
            "The Brihadisvara Temple (affectionately known as the Thanjavur Periya Kovil or Big Temple) is the crowning jewel of Dravidian monumental architecture. Consecrated in 1010 CE by the visionary Chola Emperor Raja Raja Chola I, the temple was constructed to commemorate his reign's imperial majesty and spiritual devotion to Lord Shiva. Designated as a UNESCO World Heritage Site under the 'Great Living Chola Temples', it remains one of the tallest, largest, and most geometrically sophisticated granite structures ever erected in human history.\n\n"
            "The temple's architectural engineering defies belief. Over 130,000 tonnes of hard granite were transported across dozens of kilometers without wheeled modern machinery to an alluvial river basin devoid of natural stone. The sanctum is crowned by an astonishing 13-storey pyramidal tower (Vimana) soaring 66 meters (216 feet) into the sky. At its pinnacle rests the monolithic Kumbam (cupola octagonal dome), sculpted from a single colossal granite block weighing approximately 80 tonnes. Historical records suggest this colossal dome was elevated to the apex using an inclined earth-and-timber ramp stretching over six kilometers from the village of Sarapallam.\n\n"
            "Beyond its colossal scale, the temple is an encyclopedic museum of medieval Chola culture. Its granite plinth walls are incised with thousands of lines of precise Tamil inscriptions detailing state revenues, military regiments, donations of gold, and administrative decrees. The inner ambulatory corridors house exquisite 11th-century Chola frescoes and 108 classical Bharatanatyam dance postures (Karanas) carved in bas-relief. Guarding the entrance is a monolithic Nandi (sacred bull) carved from a single stone measuring 6 meters in length, continuing to welcome pilgrims and architects from across the globe."
        ),
        "content_ta": (
            "தஞ்சைப் பெருவுடையார் கோவில் (தஞ்சைப் பெரிய கோவில்) திராவிடக் கட்டிடக்கலையின் தலைசிறந்த சிகரமாகவும், உலகப் பண்பாட்டுப் பாரம்பரியச் சின்னமாகவும் திகழ்கிறது. சோழப் பேரரசர் முதலாம் இராஜராஜ சோழனால் கி.பி. 1010-ஆம் ஆண்டில் கட்டி முடிக்கப்பட்ட இத்திருக்கோவில், சோழர்களின் இணையற்ற பொறியியல் மேலாண்மைக்கும் கலை நுணுக்கத்திற்கும் அழியாத சான்றாக நிற்கிறது. யுனெஸ்கோ (UNESCO) அமைப்பால் உலகப் பாரம்பரியக் களமாக அறிவிக்கப்பட்ட இக்கோவில், ஆயிரம் ஆண்டுகளைக் கடந்தும் கம்பீரமாக வீற்றிருக்கிறது.\n\n"
            "இக்கோவிலின் கட்டிடக்கலை அமைப்பு உலகப் பொறியாளர்களை இன்றும் வியப்பில் ஆழ்த்துகிறது. பாறைகளே இல்லாத காவிரி டெல்டா சமவெளிப் பகுதியில், 1.3 இலட்சம் டன் எடைகொண்ட கடினமான கருங்கற்களை தொலைதூரத்திலிருந்து கொண்டுவந்து, பூச்சு வேலைகள் ஏதுமின்றி ஒன்றோடு ஒன்று பூட்டிக்கொள்ளும் 'இண்டர்லாக்கிங்' முறையில் கட்டப்பட்டுள்ளது. கருவறையின் மேல் எழும்பியுள்ள விமானம் 216 அடி (66 மீட்டர்) உயரம் கொண்ட 13 அடுக்குகளைக் கொண்டுள்ளது. இதன் உச்சியில் நிறுவப்பட்டுள்ள பிரம்மாண்டமான 'குண்டக்கல்' அல்லது ஸ்தூபி ஒரே கல்லில் செதுக்கப்பட்ட 80 டன் எடைகொண்டதாகும்; இதனை சாரப்பள்ளம் பகுதியிலிருந்து 6 கி.மீ நீள சாய்வுதளம் அமைத்து யானைகள் மூலம் மேலே ஏற்றியதாக வரலாறு கூறுகிறது.\n\n"
            "கோவிலின் சுவர்கள் முழுவதும் பொறிக்கப்பட்டுள்ள அழகிய தமிழ் கல்வெட்டுகள் சோழர் கால நிர்வாகம், வரிவிதிப்பு, கோவில் திருப்பணிகள், நடனக் கலைஞர்கள் மற்றும் மருத்துவர்கள் பற்றிய வரலாற்று ஆவணக் களஞ்சியமாகத் திகழ்கின்றன. உட்பிரகாரச் சுவர்களில் வண்ணமயமான சோழர் கால மூலிகை ஓவியங்களும், நாட்டிய சாஸ்திரத்தின் 108 கரணச் சிற்பங்களும் செதுக்கப்பட்டுள்ளன. கோவில் முகப்பில் ஒரே கல்லில் வடிக்கப்பட்ட பிரம்மாண்ட நந்தி எம்பெருமான் வீற்றிருந்து, தமிழர்களின் மகத்தான வரலாற்றுப் பெருமையை உலகிற்குப் பறைசாற்றுகிறார்."
        ),
        "period": "1010 CE (11th Century)",
        "era": "Medieval Chola Empire",
        "region": "Kaveri Delta, Tamil Nadu",
        "location_name": "Thanjavur Old Town, Tamil Nadu",
        "latitude": 10.7828,
        "longitude": 79.1318,
        "tags": "architecture,temple,chola,granite,unesco,vimana,thanjavur,heritage",
        "related_slugs": "thanjavur,chola-dynasty,mamallapuram-monuments",
        "image_url": "/assets/culture/brihadisvara-temple.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Brihadisvara_Temple_Thanjavur.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Jean-Pierre Dalbéra / Wikimedia Commons",
        "image_caption": "The soaring 216-foot granite Vimana of Brihadisvara Temple crowned by an 80-tonne monolithic cupola",
        "source_name": "Archaeological Survey of India (ASI) & UNESCO World Heritage Centre",
        "source_url": "https://whc.unesco.org/en/list/250/",
    },
    {
        "slug": "mamallapuram-monuments",
        "category": "Architecture",
        "title_en": "Mamallapuram Monuments & Shore Temple",
        "title_ta": "மாமல்லபுரக் கடற்கரைக் கோவில் மற்றும் குடைவரைக் கலை",
        "subtitle_en": "7th-8th century Pallava rock-cut sanctuaries and monumental bas-reliefs on the Coromandel Coast",
        "subtitle_ta": "பல்லவ மன்னர்களின் கைவண்ணத்தில் பாறைகளில் செதுக்கப்பட்ட உலகப் புகழ்பெற்ற சிற்பக் கலைக்கூடம்",
        "summary_en": "Mamallapuram is a UNESCO World Heritage complex of 7th-8th century Pallava rock-cut cave temples, monolithic monolithic chariots (Rathas), and the magnificent Shore Temple facing the Bay of Bengal.",
        "summary_ta": "வங்கக் கடலோரம் அமைந்துள்ள மாமல்லபுரம், பல்லவ மன்னர்களின் ஒற்றைக்கல் ரதங்கள், குகைக் கோவில்கள் மற்றும் 'அர்ச்சுனன் தபசு' புடைப்புச் சிற்பங்களைக் கொண்ட உலகப் பாரம்பரியக் களமாகும்.",
        "content_en": (
            "Mamallapuram (Mahabalipuram) is an open-air museum of monumental rock architecture situated along the Coromandel Coast of the Bay of Bengal. Conceived and patronized by the illustrious Pallava monarchs—primarily Mahendravarman I and his warrior son Narasimhavarman I (Mamalla)—between the 7th and 8th centuries CE, this bustling ancient port city was the gateway for maritime trade and cultural exchange between South India, Sri Lanka, and Southeast Asia. Designated as a UNESCO World Heritage Site in 1984, it represents the foundational genesis of classical South Indian stone architecture.\n\n"
            "The architectural complex is celebrated for four groundbreaking structural categories: monolithic rock temples (Rathas), scooped cave sanctuaries (Mandapas), colossal structural temples, and open-air bas-relief rock carvings. The Pancha Rathas (Five Chariots) are sculpted directly out of single whale-back granite outcroppings, mimicking wooden multi-storey shrines with barrel-vaulted, apsidal, and pyramidal roofs. Nearby lies 'Arjuna's Penance' (or the Descent of the Ganges), an awe-inspiring 27-meter-long by 9-meter-high granite boulder carved with over one hundred celestial deities, sages, naturalistic elephants, lions, and serpents gathering at a central natural cleft representing the sacred river.\n\n"
            "Overlooking the crashing ocean surf stands the iconic Shore Temple, built during the reign of Narasimhavarman II (Rajasimha). Constructed of finely dressed granite blocks rather than carved in situ, it represents the transition from rock-cut excavation to structural stone masonry. Despite enduring thirteen centuries of harsh saline sea winds and the catastrophic 2004 Indian Ocean tsunami, its sanctum towers and granite Nandi bull enclosures stand resilient, an eternal testament to ancient Tamil artistic mastery."
        ),
        "content_ta": (
            "மாமல்லபுரம் (மகாபலிபுரம்) வங்காள விரிகுடாக் கரையில் அமைந்துள்ள உலகப் புகழ்பெற்ற திறந்தவெளிச் சிற்பக் கலைக்கூடமாகும். கி.பி. 7 மற்றும் 8-ஆம் நூற்றாண்டுகளில் பல்லவ மன்னர்களான முதலாம் மகேந்திரவர்மன் மற்றும் அவரது வீரப்புதல்வர் மாமல்லன் நரசிம்மவர்மன் ஆகியோரால் இக்கலைநகரம் உருவாக்கப்பட்டது. அக்காலத்தில் தென் இந்தியாவிற்கும், இலங்கை, இந்தோனேசியா, கம்போடியா போன்ற தென்கிழக்கு ஆசிய நாடுகளுக்கும் இடையிலான கடல்வழி வணிகத்தின் முதன்மைத் துறைமுகமாக மாமல்லபுரம் விளங்கியது. 1984-ல் யுனெஸ்கோ அமைப்பால் உலகப் பாரம்பரியக் களமாக இது அங்கீகரிக்கப்பட்டது.\n\n"
            "மாமல்லபுரத்தின் சிற்பக் கலை நான்கு தனித்துவமான பாணிகளில் அமைந்துள்ளது: ஒற்றைக்கல் ரதங்கள், பாறைக் குடைவரைக் கோவில்கள், திறந்தவெளிப் புடைப்புச் சிற்பங்கள் மற்றும் கற்றளிக் கோவில்கள். 'பஞ்ச பாண்டவர் ரதங்கள்' எனப்படும் ஐந்து ரதங்கள், இயற்கையான பெரும் பாறைகளை மேலிருந்து கீழாகச் செதுக்கி வடிக்கப்பட்ட ஒற்றைக்கல் கட்டிடக்கலை அதிசயங்களாகும். உலகிலேயே மிகப்பெரிய பாறைச் சிற்பமான 'அர்ச்சுனன் தபசு' (பகீரதன் தவம் / கங்கை பூமிக்கு வருதல்), 96 அடி நீளமும் 43 அடி உயரமும் கொண்ட பாறையில் வடிக்கப்பட்டுள்ளது; இதில் வானவர்கள், தவசிகள், கம்பீரமான யானைகள் மற்றும் மான்களின் உயிரோட்டமான சிற்பங்கள் செதுக்கப்பட்டுள்ளன.\n\n"
            "கடலலைகள் தழுவிச் செல்லும் கடற்கரையில் இரண்டாம் நரசிம்மவர்மனால் (ராஜசிம்மன்) கட்டப்பட்ட 'கடற்கரைக் கோவில்' (Shore Temple) கற்றளிக் கட்டிடக்கலையின் முன்னோடியாகும். பதிமூன்று நூற்றாண்டுகளாகக் கடல் காற்றின் உப்புத்தன்மையையும், 2004 சுனாமிப் பேரலையையும் தாங்கி நிற்கும் இக்கோவில், பல்லவ சிற்பிகளின் கற்பனைத் திறனையும் தமிழர்களின் உன்னதமான கல் தச்சுத் திறனையும் உலகிற்குப் பறைசாற்றுகிறது."
        ),
        "period": "7th - 8th Century CE",
        "era": "Pallava Dynasty",
        "region": "Coromandel Coast, Tamil Nadu",
        "location_name": "Mamallapuram Coastal Heritage Site, Chengalpattu, Tamil Nadu",
        "latitude": 12.6172,
        "longitude": 80.1927,
        "tags": "architecture,pallava,rock-cut,monolith,unesco,shore-temple,heritage",
        "related_slugs": "brihadisvara-temple,chola-dynasty,sangam-period",
        "image_url": "/assets/culture/mamallapuram-monuments.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Shore_Temple_Mahabalipuram.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "G41rn8 / Wikimedia Commons",
        "image_caption": "The 8th-century granite Shore Temple facing the breaking waves of the Bay of Bengal at Mamallapuram",
        "source_name": "Archaeological Survey of India (ASI) & UNESCO World Heritage Centre",
        "source_url": "https://whc.unesco.org/en/list/249/",
    },

    # =========================================================================
    # 5. LANGUAGE & TRADITIONS
    # =========================================================================
    {
        "slug": "sangam-literature-legacy",
        "category": "Language & Traditions",
        "title_en": "Sangam Literature Legacy",
        "title_ta": "சங்க இலக்கியப் பாரம்பரியம்",
        "subtitle_en": "Ancient corpus of classical Tamil poetry codified into Eight Anthologies and Ten Idylls",
        "subtitle_ta": "எட்டுத்தொகையும் பத்துப்பாட்டும் கொண்ட தமிழரின் ஈராயிரம் ஆண்டு செவ்வியல் இலக்கியச் சுரங்கம்",
        "summary_en": "Sangam literature is the crown jewel of ancient Tamil linguistic heritage, comprising 2,381 poems by 473 poets categorized into interior emotional love (Agam) and exterior civic heroism (Puram).",
        "summary_ta": "ஈராயிரம் ஆண்டுகளுக்கு முந்தைய 2,381 செய்யுட்களைக் கொண்ட சங்க இலக்கியம், அகப்பொருள் மற்றும் புறப்பொருள் என வாழ்வியலை வகுத்துரைத்த உலகின் தலைசிறந்த செவ்வியல் மொழிக் கருவூலமாகும்.",
        "content_en": (
            "Sangam literature represents the golden age of classical Tamil literary creation, flourishing between 300 BCE and 300 CE under the royal patronage of the Pandya, Chola, and Chera dynasties. Convened across historic literary academies (Sangams) centered in the ancient city of Madurai, this extraordinary corpus consists of 2,381 poems composed by 473 distinct poets—including monarchs, farmers, blacksmiths, merchants, and at least 30 distinguished women poets such as Avvaiyar, Okkur Masathiyar, and Velli Veethiyar. It is globally recognized as one of the oldest secular literatures in human history.\n\n"
            "The poetic framework of Sangam literature is uniquely divided into two fundamental human dimensions: Agam (the interior landscape of personal love, longing, and domestic harmony) and Puram (the exterior world of valour, civic governance, battle, ethics, and philanthropy). Poetic imagery is mapped onto the 'Thinai' system—five distinct eco-geographical zones: Kurinji (mountains / romantic union), Mullai (forests / patient waiting), Marutham (pastoral plains / domestic reconciliation), Neithal (coastal seashore / sea-grief and longing), and Paalai (arid desert / perilous journey and separation). Every poem integrates flora, fauna, climate, and musical instruments specific to its geographic landscape.\n\n"
            "This vast corpus is systematized into the Pathinenmelkanakku collections: the Ettuthogai (Eight Anthologies, including Natrinai, Kurunthogai, Ainkurunuru, Pathitrupathu, Paripadal, Kalithogai, Ahananuru, and Purananuru) and the Pathupattu (Ten Idylls). Rooted in the strict grammatical foundation of the Tholkappiyam, Sangam poetry provides an unmatched sociological window into ancient Tamil maritime commerce with Rome, egalitarian societal ethics, and a timeless philosophy that proclaimed 'Yaadhum Oore Yaavarum Kelir' ('Every town is our homeland, and every human our kin')."
        ),
        "content_ta": (
            "சங்க இலக்கியம் என்பது தமிழின் இரண்டாயிரத்திற்கும் மேற்பட்ட ஆண்டுகாலச் செவ்வியல் இலக்கிய வளத்தின் மகுடமாகும். கி.மு. 300 முதல் கி.பி. 300 வரையிலான காலகட்டத்தில் பாண்டிய, சோழ, சேர மன்னர்களின் ஆதரவுடன் மதுரையில் கூடி தமிழ் வளர்த்த சங்கப் புலவர்களால் இச்செய்யுட்கள் இயற்றப்பட்டன. இத்தொகுப்பில் 473 புலவர்களால் பாடப்பட்ட 2,381 பாடல்கள் உள்ளன. இதில் அரசர்கள், உழவர்கள், பொற்கொல்லர்கள், வணிகர்கள் மற்றும் அவ்வையார், ஒக்கூர் மாசாத்தியார், வெள்ளிவீதியார் உள்ளிட்ட 30-க்கும் மேற்பட்ட பெண் புலவர்களின் பாடல்களும் அடங்கியிருப்பது சங்க காலச் சமூகத்தின் பாலின சமத்துவத்தை வெளிப்படுத்துகிறது.\n\n"
            "சங்க இலக்கியத்தின் வாழ்வியல் கோட்பாடு 'அகம்' மற்றும் 'புறம்' என இரு பெரும் பிரிவுகளாகப் பகுக்கப்பட்டுள்ளது. அகம் என்பது உள்ளத்து உணர்வுகள், காதல் மற்றும் குடும்ப வாழ்வை விவரிப்பது; புறம் என்பது வீரம், ஆட்சிமுறை, போர் அறநெறி, ஈகை மற்றும் விருந்தோம்பலை விவரிப்பது. இப்பாடல்கள் 'ஐந்திணை' எனப்படும் ஐவகை நிலங்களின் அடிப்படையில் அமைந்துள்ளன: குறிஞ்சி (மலையும் மலை சார்ந்த இடமும் - புணர்தல்), முல்லை (காடும் காடு சார்ந்த இடமும் - இருத்தல்), மருதம் (வயலும் வயல் சார்ந்த இடமும் - ஊடல்), நெய்தல் (கடலும் கடல் சார்ந்த இடமும் - இரங்கல்), பாலை (மணலும் மணல் சார்ந்த இடமும் - பிரிதல்). ஒவ்வொரு திணைக்கும் உரிய பூக்கள், பறவைகள், விலங்குகள் மற்றும் தாள நயங்கள் நேர்த்தியாகக் கையாளப்பட்டுள்ளன.\n\n"
            "இலக்கியங்கள் 'பதினெண்மேற்கணக்கு' நூல்களாகத் தொகுக்கப்பட்டுள்ளன; இதில் 'எட்டுத்தொகை' (நற்றிணை, குறுந்தொகை, ஐங்குறுநூறு, பதிற்றுப்பத்து, பரிபாடல், கலித்தொகை, அகநானூறு, புறநானூறு) மற்றும் 'பத்துப்பாட்டு' நூல்கள் அடங்கும். தொல்காப்பிய இலக்கண நெறிப்படி இயற்றப்பட்ட சங்கப் பாடல்கள், பண்டைய தமிழர்களின் உரோம வர்த்தகம், சமூக நீதி மற்றும் 'யாதும் ஊரே யாவரும் கேளிர்' என்ற உலகளாவிய மானுட நேயத் தத்துவத்தை உலகுக்கு உணர்த்துகின்றன."
        ),
        "period": "300 BCE - 300 CE",
        "era": "Classical Sangam Antiquity",
        "region": "Ancient Tamilakam",
        "location_name": "Madurai Sangam Academies, Tamil Nadu",
        "latitude": 9.9195,
        "longitude": 78.1193,
        "tags": "literature,sangam,poetry,thinai,akam,puram,tamil,heritage",
        "related_slugs": "thiruvalluvar,avvaiyar,sangam-period",
        "image_url": "/assets/culture/sangam-literature-legacy.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Sangam_Poets_Assembly_Madurai.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Tamil Virtual Academy / Wikimedia Commons",
        "image_caption": "Artistic depiction of ancient Tamil poets convening at the Madurai Sangam Literary Assembly",
        "source_name": "Central Institute of Classical Tamil (CICT) & Tamil Virtual Academy",
        "source_url": "https://www.cict.in/",
    },
    {
        "slug": "kolam-art",
        "category": "Language & Traditions",
        "title_en": "Kolam Geometric Art",
        "title_ta": "கோலக் கலை (புள்ளிக் கோலம்)",
        "subtitle_en": "Sacred threshold math and dawn geometric floor art drawn with edible rice powder",
        "subtitle_ta": "அரிசி மாவில் வீட்டு வாசலில் வரையப்படும் தமிழரின் கணித நுணுக்கமும் மங்கல வரவேற்பும்",
        "summary_en": "Kolam is a traditional daily threshold art form practiced by Tamil women, who draw intricate symmetrical geometric patterns using coarse white rice flour at dawn to welcome prosperity and feed small creatures.",
        "summary_ta": "அதிகாலை வேளையில் வீட்டு வாசலை மெழுகி, பச்சரிசி மாவினால் புள்ளிகள் வைத்து வளைவுகளால் வரையப்படும் மங்கலக் கோலம், தமிழரின் அழகியல் மற்றும் சுற்றுச்சூழல் அறத்தின் அடையாளமாகும்.",
        "content_en": (
            "Kolam is a millennia-old ritual geometric floor art drawn daily at dawn by women across Tamil households. Stepping onto the threshold before sunrise, the house entrance is swept clean, sprinkled with fresh water mixed with cow dung or red soil (Kaavi), and transformed into a canvas of intricate beauty. Drawn deftly by letting coarse white rice flour stream between the thumb and forefinger, Kolam serves a dual metaphysical and ecological purpose: it welcomes the goddess of fortune, Mahalakshmi, while offering food charity (Bhootha Yajna) to ants, birds, and insects, embodying everyday ecological compassion.\n\n"
            "The artistic discipline of Kolam is a sophisticated manifestation of mathematical topology, symmetry, and fractal geometry. Designs are categorized into dot-based Sikku Kolam (where unbroken continuous curved lines loop symmetrically around a predetermined grid of dots without intersecting them), Neli Kolam, geometric Padi Kolam (layered lines drawn for auspicious ceremonies), and vibrant multi-colored Rangoli. Computer scientists and mathematicians worldwide study the recursive algorithms and ethnomathematical principles underpinning Kolam patterns, comparing their generative grammar to array languages and knot theory.\n\n"
            "During the sacred Tamil month of Margazhi (December-January), Kolam reaches its artistic zenith. Neighborhood streets become sprawling galleries of monumental floral and geometric mandalas, often adorned at the center with fresh golden pumpkin blossoms (Parangi Poo) set in small balls of cow dung. Beyond its visual allure, the daily physical practice of bending, reaching, and drawing strengthens core physical flexibility, mental concentration, and mindfulness, sustaining a vibrant living heritage across generations."
        ),
        "content_ta": (
            "கோலமிடுதல் என்பது தமிழ்ப் பெண்களின் அன்றாட வாழ்வியலோடு பின்னிப்பிணைந்த ஒரு உன்னதமான சடங்குசார் வடிவியல் கலை வடிவமாகும். அதிகாலை பிரம்ம முகூர்த்த வேளையில், வீட்டு வாசலை நீர் தெளித்துச் சுத்தம் செய்து, செம்மண் பூசி, பச்சரிசி மாவினால் புள்ளிகள் வைத்து அழகிய கோலங்கள் வரையப்படுகின்றன. கோலம் என்பது வெறும் அழகுக்காக மட்டுமல்லாமல், 'பூத யாகம்' எனப்படும் பிற உயிர்களுக்கு உணவளிக்கும் உன்னத அறத்தின் வெளிப்பாடாகும்; அரிசி மாவால் வரையப்படும் கோலத்தை எறும்புகள், சிற்றுயிர்கள் மற்றும் பறவைகள் உண்டு பசியாறுகின்றன.\n\n"
            "கோலக்கலை என்பது ஆழ்ந்த கணிதவியல், சமச்சீர்மை மற்றும் வடிவியல் அறிவியலின் அற்புதக் கலவையாகும். புள்ளிகளைச் சுற்றி வளைந்த கோடுகளால் முடிச்சுகளின்றிப் பின்னப்படும் 'சிக்குக் கோலம்' (அல்லது பிரம்ம முடிச்சுக் கோலம்), நேர்க்கோடுகளால் வரையப்படும் 'படி கோலம்', மற்றும் வண்ணப் பொடிகளால் அலங்கரிக்கப்படும் 'ரங்கோலி' எனப் பல வகைகள் உண்டு. கம்ப்யூட்டர் சயின்ஸ் மற்றும் கணிதப் பேராசிரியர்கள் கோலத்தின் சிக்கலான வடிவமைப்பு முறைகளை 'அல்காரிதம்' மற்றும் முடிச்சு கோட்பாடுகளுடன் (Knot Theory) ஒப்பிட்டு சர்வதேச அளவில் ஆய்வு செய்து வருகின்றனர்.\n\n"
            "குறிப்பாக மார்கழி மாதத்தில் தமிழர்களின் தெருக்கள் அனைத்தும் கோலக் கலைக்கூடங்களாகக் காட்சியளிக்கின்றன. பெண்கள் விடியற்காலையில் எழுந்து தெருவே வியக்கும் வண்ணம் பிரம்மாண்டமான வண்ணக் கோலங்களை வரைந்து, அதன் நடுவில் பசுஞ்சாண உருண்டையில் மஞ்சள் நிறப் பரங்கிப் பூவைச் சொருகி வைப்பர். குனிந்து நிமிர்ந்து நிலத்தில் கோலமிடுவது பெண்களுக்கு உடற்பயிற்சியாகவும், மன ஒருமைப்பாட்டை வளர்க்கும் தியானமாகவும் விளங்குகிறது."
        ),
        "period": "Ancient Antiquity to Present",
        "era": "Pre-historic Folk Custom to Present",
        "region": "Tamil Nadu & South India",
        "location_name": "Mylapore Heritage Precinct, Chennai & Madurai, Tamil Nadu",
        "latitude": 13.0336,
        "longitude": 80.2687,
        "tags": "tradition,kolam,art,mathematics,margazhi,riceflour,geometry,heritage",
        "related_slugs": "puthandu,thai-pongal,madurai-meenakshi",
        "image_url": "/assets/culture/kolam-art.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Kolam_traditional_art_Tamil_Nadu.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Subramanian / Wikimedia Commons",
        "image_caption": "Intricate traditional Sikku Kolam pattern drawn in white rice flour at a temple doorway in Tamil Nadu",
        "source_name": "International Institute of Tamil Studies & Tamil Virtual Academy",
        "source_url": "https://www.tamilvu.org/courses/degree/d061/d0611/html/d061155.htm",
    },

    # =========================================================================
    # 6. PEOPLE
    # =========================================================================
    {
        "slug": "thiruvalluvar",
        "category": "People",
        "title_en": "Thiruvalluvar & The Thirukkural",
        "title_ta": "திருவள்ளுவர் மற்றும் திருக்குறள்",
        "subtitle_en": "Immortal philosopher-poet whose 1,330 couplets formulate universal human ethics",
        "subtitle_ta": "1330 குறட்பாக்களில் உலக மாந்தர் அனைவருக்கும் பொதுவான வாழ்வியல் நெறி வகுத்த தெய்வப் புலவர்",
        "summary_en": "Thiruvalluvar is the celebrated Tamil sage-poet whose magnum opus, the Thirukkural, formulates a timeless, secular philosophy of virtue (Aram), wealth (Porul), and love (Inbam).",
        "summary_ta": "அறத்துப்பால், பொருட்பால், காமத்துப்பால் என முப்பால்களாக 133 அதிகாரங்களில் மானுட வாழ்வின் முழுமையை உரைத்த உலகப் பொதுமறையான திருக்குறளை அருளியவர் திருவள்ளுவர்.",
        "content_en": (
            "Thiruvalluvar (often reverently addressed as Poyyamozhi Pulavar, Theiva Pulavar, or Valluvar) is the immortal philosopher-sage of Tamil civilization, believed to have lived between the 3rd century BCE and 1st century CE. His monumental masterpiece, the Thirukkural ('Sacred Couplets'), is celebrated as the 'Ulagappodhumari' (Universal Scripture)—a completely secular, humanist ethical treatise devoid of sectarian dogma, caste prejudice, or geographic limitation. Composed in the concise Kural Venba metre, it formulates timeless wisdom applicable to every human being across eras.\n\n"
            "The Thirukkural is rigorously organized into three comprehensive books comprising 133 chapters (Adhikarams) of exactly ten couplets each, totaling 1,330 couplets. The first section, Aram (Virtue and Righteousness), explores moral living, compassion, non-violence, truthfulness, and gratitude. The second, Porul (Wealth and Polity), delivers profound administrative treatises on statecraft, diplomacy, economic management, leadership, citizenship, and defense. The final section, Inbam or Kaamam (Love), articulates delicate aesthetic poetry on courtship, union, and emotional intimacy in marriage.\n\n"
            "The global impact of Thiruvalluvar's thought is unparalleled; the Thirukkural has been translated into over 100 world languages, inspiring global thinkers from Leo Tolstoy and Mahatma Gandhi to Albert Schweitzer, who praised it as 'a pure spring of human ethics.' In modern Tamil Nadu, Valluvar's legacy is physically immortalized in the soaring 133-foot stone colossus erected at the confluence of three oceans in Kanyakumari, and the Valluvar Kottam chariot monument in Chennai, standing as eternal testaments to his universal moral vision."
        ),
        "content_ta": (
            "திருவள்ளுவர் (தெய்வப் புலவர், பொய்யாமொழிப் புலவர், நாயனார்) தமிழ் தந்த ஈடுஇணையற்ற மெய்யியல் ஞானியும் உலகளாவிய சிந்தனையாளரும் ஆவார். இவர் அருளிய 'திருக்குறள்' உலகப் பொதுமறை, முப்பால், உத்தரவேதம், தமிழ்மறை எனப் பல பெயர்களால் போற்றப்படுகிறது. எந்த ஒரு குறிப்பிட்ட மதத்தையோ, சாதியையோ, நாட்டையோ அல்லது மொழியையோ சாராமல், மானுட இனம் முழுமைக்கும் தேவையான அறநெறிகளையும், வாழ்வியல் உண்மைகளையும் மிகச் சுருக்கமான இரண்டு அடி குறள் வெண்பாக்களில் உரைத்திருப்பது இவரது தனிப்பெரும் சிறப்பாகும்.\n\n"
            "திருக்குறள் மூன்று பெரும் பால்களாகவும், 133 அதிகாரங்களாகவும், அதிகாரத்திற்குப் பத்து பாடல்கள் வீதம் 1,330 குறட்பாக்களாகவும் பகுக்கப்பட்டுள்ளது. முதலாவது 'அறத்துப்பால்' (38 அதிகாரங்கள்): தனிமனித ஒழுக்கம், அன்புடைமை, செய்ந்நன்றி அறிதல், வாய்மை மற்றும் கொல்லாமை போன்ற அறங்களை விளக்குகிறது. இரண்டாவது 'பொருட்பால்' (70 அதிகாரங்கள்): ஓர் அரசு எப்படி இயங்க வேண்டும், அரசனின் நற்பண்புகள், கல்வி, சொல்வன்மை, நட்பின் மேன்மை மற்றும் குடியாட்சித் தத்துவங்களை உரைக்கிறது. மூன்றாவது 'காமத்துப்பால்' (25 அதிகாரங்கள்): தலைவன்-தலைவியின் தூய காதல் உணர்வுகளையும், இல்லற மாண்பினையும் நயம்பட விவரிக்கிறது.\n\n"
            "திருக்குறள் உலக அளவில் நூற்றுக்கும் மேற்பட்ட மொழிகளில் மொழிபெயர்க்கப்பட்டுள்ளது. லியோ டால்ஸ்டாய், மகாத்மா காந்தி, ஜி.யு. போப் மற்றும் ஆல்பர்ட் சுவைட்சர் போன்ற உலக மேதைகளால் பெரிதும் போற்றப்பட்டது. கன்னியாகுமரியில் முக்கடல் சங்கமத்தில் நிறுவப்பட்டுள்ள 133 அடி உயர விவேக திருவள்ளுவர் கற்சிலையும், சென்னையில் உள்ள வள்ளுவர் கோட்டத் தேரும் தமிழர்களின் நெஞ்சில் திருவள்ளுவரின் நெறிகள் என்றென்றும் வாழ்ந்துகொண்டிருக்கின்றன என்பதற்குச் சான்றுகளாகும்."
        ),
        "period": "3rd Century BCE - 1st Century CE",
        "era": "Classical Era",
        "region": "Ancient Tamil Nadu",
        "location_name": "Mylapore, Chennai & Kanyakumari, Tamil Nadu",
        "latitude": 8.0780,
        "longitude": 77.5550,
        "tags": "people,poet,thiruvalluvar,thirukkural,ethics,literature,kural,philosophy",
        "related_slugs": "avvaiyar,sangam-literature-legacy,sangam-period",
        "image_url": "/assets/culture/thiruvalluvar.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Thiruvalluvar_Statue,_Kanyakumari.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Gowthaman / Wikimedia Commons",
        "image_caption": "The colossal 133-foot stone statue of philosopher-poet Thiruvalluvar at Kanyakumari",
        "source_name": "Central Institute of Classical Tamil (CICT) & International Institute of Tamil Studies",
        "source_url": "https://www.cict.in/",
    },
    {
        "slug": "avvaiyar",
        "category": "People",
        "title_en": "Avvaiyar",
        "title_ta": "ஔவையார்",
        "subtitle_en": "Revered female philosopher, royal diplomat, and moral educator of Tamil civilization",
        "subtitle_ta": "அறம் பாடிய மூதாட்டியாகவும், அரச தூதராகவும், தமிழ்ச் சமூகத்தின் தாயாகவும் திகழ்ந்த தவப்புலவர்",
        "summary_en": "Avvaiyar is the legendary title of eminent Tamil woman poets across historical eras, revered for their fearless royal diplomacy, Sangam poems, and foundational moral texts like Aathichoodi.",
        "summary_ta": "சங்க காலம் முதல் பிற்காலம் வரை வாழ்ந்த ஔவையார் என்ற பெயர்கொண்ட பெண் புலவர்கள், அரசர்களுக்கு நல்லுரை பகன்ற தூதராகவும், ஆத்திசூடி, கொன்றைவேந்தன் போன்ற நீதி நூல்களைத் தந்த ஆசிரியராகவும் போற்றப்படுகின்றனர்.",
        "content_en": (
            "Avvaiyar (literally meaning 'Venerable Mother' or 'Wise Elder Woman') is the revered name borne by several historic female poets who profoundly shaped the moral, literary, and political landscape of Tamil civilization across different historical epochs. The earliest and most famous Avvaiyar lived during the classical Sangam era (c. 1st century BCE to 2nd century CE), celebrated in Purananuru for her razor-sharp intellect, fierce egalitarianism, and intimate friendship with the noble chieftain Athiyaman Neduman Anji of Tagadur (modern Dharmapuri).\n\n"
            "In Sangam history, Avvaiyar was not merely a poet but an influential royal diplomat who averted devastating warfare between competing kings through the sheer power of her eloquent verse. When King Thondaiman of Kanchipuram displayed his gleaming armory to intimidate Athiyaman, Avvaiyar composed an ingenious satiric poem praising Thondaiman's polished weapons sitting safely in storage while noting that Athiyaman's weapons were constantly bloodstained and notched from fighting on the frontlines to defend his people, shaming Thondaiman into peace. In another legendary incident, Athiyaman presented Avvaiyar with the rare, immortalizing black gooseberry (Karunelli) harvested from a perilous mountain cliff, choosing to grant longevity to her wisdom rather than prolong his own royal life.\n\n"
            "A later medieval Avvaiyar (c. 10th-12th century CE) authored foundational didactic moral primers that every Tamil child memorizes to this day: Aathichoodi (single-line alphabetic ethical axioms like 'Aram Seya Virumbu' - Desire to do good), Konraiventhan, Moodhurai, and Nalvazhi. Her timeless pedagogical poetry distilled profound philosophical truths into melodic, accessible aphorisms, instilling compassion, courage, scientific inquiry, and social justice as the bedrock of Tamil education."
        ),
        "content_ta": (
            "ஔவையார் (பொருள்: 'மரியாதைக்குரிய தாய்' அல்லது 'மூதாட்டி') என்பவர் தமிழ் இலக்கிய வரலாற்றில் பல்வேறு காலகட்டங்களில் வாழ்ந்து, தமிழ்ச் சமூகத்தின் அறநெறி மற்றும் அரசியல் போக்கை வழிநடத்திய பெண் ஞானியர் ஆவார். இவர்களில் மிகவும் புகழ்பெற்றவர் சங்க காலத்தில் (கி.மு. 1 முதல் கி.பி. 2-ஆம் நூற்றாண்டு) வாழ்ந்த சங்க கால ஔவையார் ஆவார். தகடூர் (தருமபுரி) மன்னன் அதியமான் நெடுமான் அஞ்சியின் உற்ற தோழியாகவும், அரசவையில் மதிப்பிற்குரிய வழிகாட்டியாகவும் இவர் திகழ்ந்தார்.\n\n"
            "சங்க கால ஔவையார் வெறும் கவிஞர் மட்டுமல்லாமல், போர்களைத் தடுத்து நிறுத்திய தலைசிறந்த அரசதந்திரியாகவும் விளங்கினார். தொண்டைமான் தனது ஆயுதக் கிடங்கைக் காட்டிப் போருக்குத் தயாரானபோது, 'தொண்டைமானின் ஆயுதங்கள் பளபளப்பாக நெய் பூசப்பட்டுப் பாதுகாப்பாக உள்ளன; ஆனால் என் அதியமானின் ஆயுதங்களோ பகைவரைக் கொன்று பட்டறையில் பழுதுபார்க்கப்படுகின்றன' என்று நயம்படப் பாடி போரைத் தடுத்தார். அதியமான் தனக்குக் கிடைத்த அரிய சாகா வரம் தரும் 'கருநெல்லிக்கனியை' தான் உண்ணாமல், 'நான் வாழ்வதை விட ஔவை வாழ்ந்தால் தமிழுக்கு ஆக்கம்' என்று ஔவையாருக்குக் கொடுத்து மகிழ்ந்த வரலாறு தமிழர்களின் நட்பிற்கும் தமிழ் மீதான காதலுக்கும் சான்றாகும்.\n\n"
            "பிற்காலத்தில் (12-ஆம் நூற்றாண்டு) வாழ்ந்த மற்றொரு ஔவையார் தமிழ்க் குழந்தைகளுக்கு வாழ்வியல் நன்னெறிகளைப் புகட்டும் 'ஆத்திசூடி' (அறம் செய விரும்பு, ஆறுவது சினம்), 'கொன்றைவேந்தன்', 'மூதுரை' மற்றும் 'நல்வழி' ஆகிய அரிய நீதி நூல்களை இயற்றினார். எளிமையான சொற்களில் ஆழமான தத்துவங்களை அமைத்து, தமிழ்ச் சமூகத்திற்கு அறமும் நீதியும் போதித்த ஔவையார், தாயைப் போன்ற பாசத்தோடும் ஞானத்தோடும் என்றென்றும் போற்றப்படுகிறார்."
        ),
        "period": "Sangam Era & Medieval Era",
        "era": "1st Century BCE & 12th Century CE",
        "region": "Ancient Tamil Nadu",
        "location_name": "Tagadur (Dharmapuri) & Madurai, Tamil Nadu",
        "latitude": 12.1211,
        "longitude": 78.1582,
        "tags": "people,poet,avvaiyar,sangam,aathichoodi,athiyaman,literature,ethics",
        "related_slugs": "thiruvalluvar,sangam-literature-legacy,sangam-period",
        "image_url": "/assets/culture/avvaiyar.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Avvaiyar_statue_Marina_Beach_Chennai.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Rasnaboy / Wikimedia Commons",
        "image_caption": "Statue of revered female poet Avvaiyar on the Marina Promenade in Chennai",
        "source_name": "Tamil Virtual Academy & Department of Tamil Development",
        "source_url": "https://www.tamilvu.org/library/lA410/html/lA410cnt.htm",
    },

    # =========================================================================
    # 7. HISTORY
    # =========================================================================
    {
        "slug": "chola-dynasty",
        "category": "History",
        "title_en": "Imperial Chola Dynasty",
        "title_ta": "சோழப் பேரரசு (இம்பீரியல் சோழர்கள்)",
        "subtitle_en": "Maritime thalassocracy, grand architecture, and administrative genius of medieval Tamil Nadu",
        "subtitle_ta": "கடல் கடந்த கடற்படை வலிமையும், பேராலயக் கட்டிடக்கலையும், குடவோலை மக்களாட்சியும் கொண்ட பொற்காலம்",
        "summary_en": "The Medieval Cholas (9th-13th century CE) established a formidable maritime empire spanning South India, Sri Lanka, and Southeast Asia, renowned for bronze sculpture, stone temples, and democratic Kudavolai governance.",
        "summary_ta": "தென்னிந்தியா, இலங்கை மற்றும் கடாரம் உள்ளிட்ட தென்கிழக்கு ஆசியப் பகுதிகளை வென்று கடல் ஆதிக்கம் செலுத்திய சோழப் பேரரசு, கட்டிடக்கலை மற்றும் கலைகளின் பொற்காலமாக விளங்கியது.",
        "content_en": (
            "The Imperial Chola Dynasty (flourishing between 850 and 1279 CE) stands as one of the longest-ruling and most powerful maritime empires in world history. Re-established from Thanjavur by Vijayalaya Chola in the 9th century, the empire reached its zenith under the father-son monarchs Raja Raja Chola I (r. 985–1014 CE) and Rajendra Chola I (r. 1014–1044 CE). Transforming the Bay of Bengal into a 'Chola Lake', their naval armadas crossed the Indian Ocean to exert political and commercial influence across Sri Lanka, the Maldives, the Srivijaya Empire of Sumatra, the Malay Peninsula, and Java.\n\n"
            "The Cholas pioneered revolutionary administrative and civic systems that anticipated modern democratic institutions. As documented in the famous 10th-century Uthiramerur Inscriptions, local village assemblies (Sabhas) elected representatives through the 'Kudavolai' ballot system, using palm-leaf votes drawn from a sealed pot. Stringent qualifications were mandated for candidates, including property ownership, educational mastery of ethical texts, and a clean financial record, while disqualifying those guilty of corruption, theft, or failing to audit public funds.\n\n"
            "In culture and the arts, the Chola era represents the absolute golden age of Tamil civilization. They constructed colossal granite monuments known as the 'Great Living Chola Temples' (Brihadisvara in Thanjavur, Gangaikonda Cholapuram, and Airavatesvara in Darasuram). Furthermore, Chola bronze casting using the lost-wax (Cire Perdue) technique created globally celebrated masterpieces such as the cosmic dancing Nataraja and serene bronze deities, prized today in the world's greatest museums as the pinnacle of metal artistry."
        ),
        "content_ta": (
            "சோழப் பேரரசு (கி.பி. 850 - 1279) என்பது உலக வரலாற்றில் நீண்ட காலம் ஆட்சி புரிந்ததும், இணையற்ற கடற்படை வல்லமை கொண்டதும் ஆன மகத்தான பேரரசாகும். 9-ஆம் நூற்றாண்டில் விஜயாலய சோழனால் தஞ்சையைத் தலைநகராகக் கொண்டு மீண்டும் நிலைநாட்டப்பட்ட சோழ அரசு, முதலாம் இராஜராஜ சோழன் மற்றும் அவரது புதல்வர் முதலாம் இராஜேந்திர சோழன் காலத்தில் பொற்காலத்தை எட்டியது. வங்காள விரிகுடாவை 'சோழர் ஏரி' என மாற்றிய இவர்களின் பிரம்மாண்ட கப்பற்படை, இலங்கை, மாலத்தீவுகள், மலேசியா, சிங்கப்பூர் மற்றும் இந்தோனேசியாவின் ஸ்ரீவிஜயப் பேரரசு (கடாரம்) வரை சென்று வெற்றிக் கொடி நாட்டியது.\n\n"
            "சோழர்களின் ஆட்சி நிர்வாகம் நவீன ஜனநாயகத்திற்கே முன்னோடியாக அமைந்தது. காஞ்சிபுரம் உத்திரமேரூர் கல்வெட்டில் விவரிக்கப்பட்டுள்ள 'குடவோலை முறை' மூலம் கிராம நிர்வாக உறுப்பினர்கள் வெளிப்படையாகத் தேர்ந்தெடுக்கப்பட்டனர். பனை ஓலையில் வேட்பாளர் பெயரை எழுதி மண்பானையில் இட்டு, சிறுவன் மூலம் ஓலைகளை எடுத்துத் தலைவர்களைத் தேர்ந்தெடுத்தனர். இதில் போட்டியிட நில உரிமை, கல்வித் தகுதி, நற்பண்புகள் கட்டாயமாக்கப்பட்டன; ஊழல் செய்தவர்களும், பொதுச் சொத்தைக் கையாடல் செய்தவர்களும் தேர்தலில் போட்டியிட வாழ்நாள் தடை விதிக்கப்பட்டது.\n\n"
            "கலை, பண்பாடு மற்றும் கட்டிடக்கலையில் சோழர் காலம் உச்சக்கட்ட வளர்ச்சியை அடைந்தது. தஞ்சைப் பெரிய கோவில், கங்கைகொண்ட சோழபுரம் மற்றும் தாராசுரம் ஐராவதேஸ்வரர் கோவில் ஆகிய பெரும் கற்றளிகள் இவர்களால் நிர்மாணிக்கப்பட்டன. மேலும், 'மெழுகு அச்சு முறை' (Lost-wax process) மூலம் வார்க்கப்பட்ட சோழர் காலத்து ஐம்பொன் நடராஜர் மற்றும் தெய்வச் சிலைகள், உலகெங்கிலும் உள்ள கலை அருங்காட்சியகங்களில் வியந்து போற்றப்படும் உன்னத கலைப்படைப்புகளாகத் திகழ்கின்றன."
        ),
        "period": "850 CE - 1279 CE",
        "era": "Medieval Period",
        "region": "South India & Southeast Asia",
        "location_name": "Thanjavur & Gangaikonda Cholapuram, Tamil Nadu",
        "latitude": 10.7870,
        "longitude": 79.1378,
        "tags": "history,chola,empire,rajaraja,rajendra,kudavolai,bronze,maritime,heritage",
        "related_slugs": "brihadisvara-temple,thanjavur,sangam-period",
        "image_url": "/assets/culture/chola-dynasty.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Chola_Bronze_Nataraja.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "V&A Museum / Wikimedia Commons",
        "image_caption": "11th-century Chola bronze masterpiece of Nataraja, the cosmic dancer, from Tamil Nadu",
        "source_name": "Archaeological Survey of India (ASI) & Tamil Nadu State Department of Archaeology",
        "source_url": "https://www.tnarch.gov.in/",
    },
    {
        "slug": "sangam-period",
        "category": "History",
        "title_en": "The Sangam Age & Three Crowned Kings",
        "title_ta": "சங்க காலம் மற்றும் மூவேந்தர் வரலாறு",
        "subtitle_en": "Classical epoch of the Chera, Chola, and Pandya dynasties, Roman trade, and urban port cities",
        "subtitle_ta": "சேர, சோழ, பாண்டிய மூவேந்தர்களின் ஆட்சி, உரோமானிய கடல் வணிகம் மற்றும் செழித்த நகர நாகரிகம்",
        "summary_en": "The Sangam Period (300 BCE – 300 CE) was the classical dawn of Tamil civilization, characterized by the rule of the Three Crowned Kings (Moovendhar), bustling ports like Poompuhar, and thriving Greco-Roman maritime trade.",
        "summary_ta": "கி.மு. 300 முதல் கி.பி. 300 வரை சேர, சோழ, பாண்டிய மன்னர்களால் ஆளப்பட்ட சங்க காலம், உலகளாவிய யவனக் கடல் வணிகமும் உயர் நாகரிகமும் செழித்தோங்கிய தமிழரின் தொல் பொற்காலமாகும்.",
        "content_en": (
            "The Sangam Period (dating approximately from the 6th/3rd century BCE to the 3rd century CE) marks the classical dawn and foundational epoch of Tamil civilization. Politically governed by the legendary 'Moovendhar' (the Three Crowned Kings: the Cheras of the western mountain realm, the Cholas of the fertile Kaveri Delta, and the Pandyas of the southern river plains), alongside valiant independent chieftains (Velirs) like Pari, Kari, and Ori, the era flourished with sophisticated urbanism, egalitarian social structures, and vibrant maritime commerce.\n\n"
            "Archaeological excavations at Keeladi, Kodumanal, Pattanam (ancient Muziris), and Alagankulam have conclusively demonstrated that ancient Tamilakam possessed a literate, industrialized society with advanced metallurgy, gem cutting, weaving, and drainage infrastructure. Flourishing port cities like Poompuhar (Kaveripoompattinam) and Korkai traded with the Greco-Roman world, Egypt, Arabia, and China. Greek and Roman geographers such as Ptolemy, Pliny the Elder, and the Periplus of the Erythraean Sea recorded extensive imports of Tamil black pepper (known in the West as 'Black Gold' or Yavanapriya), beryl, fine muslin, and pearls in exchange for vast hoards of Roman gold and silver denarii.\n\n"
            "The cultural bedrock of the Sangam Age was its profound secular philosophy, humanist ethics, and linguistic codification through the Tholkappiyam and the Sangam academies of Madurai. The era celebrated civic generosity, military courage governed by strict rules of engagement, and cosmopolitan tolerance. The timeless verse of Kaniyan Poongundranar—'Every land is my home, every human my kin'—remains the eternal motto summarizing the noble cosmopolitan worldview of the Sangam Tamil ethos."
        ),
        "content_ta": (
            "சங்க காலம் (சுமார் கி.மு. 6-ஆம் / 3-ஆம் நூற்றாண்டு முதல் கி.பி. 3-ஆம் நூற்றாண்டு வரை) என்பது தமிழர்களின் தொன்மையான வரலாற்றுக் காலமும், நாகரிகத்தின் பொற்காலமும் ஆகும். இப்பேரரசை சேர, சோழ, பாண்டியர் என்ற 'மூவேந்தர்கள்' மற்றும் பாரி, காரி, ஓரி, பேகன் போன்ற 'கடை ஏழு வள்ளல்கள்' உள்ளிட்ட குறுநில மன்னர்கள் ஆட்சி செய்தனர். சேரர்கள் வில் கொடியையும், சோழர்கள் புலிக் கொடியையும், பாண்டியர்கள் மீன் கொடியையும் கொண்டு தமிழகத்தை நல்லாட்சி செய்தனர்.\n\n"
            "கீழடி, கொடுமணல், பூம்புகார், அழகன்குளம் மற்றும் அரிக்கமேடு ஆகிய இடங்களில் நடைபெற்ற சமீபத்திய தொல்பொருள் அகழ்வாராய்ச்சிகள், சங்க காலத் தமிழர்கள் எழுத்தறிவு பெற்ற, செழிப்பான நகர நாகரிகத்தைக் கொண்டிருந்தனர் என்பதை உலகுக்கு நிரூபித்துள்ளன. கிரேக்க, உரோமானிய வரலாற்று ஆசிரியர்களான தாலமி, பிளினி மற்றும் 'எரித்ரியன் கடலின் பெரிப்ளஸ்' குறிப்புகள் பண்டைய தமிழகத்தின் உலகளாவிய வர்த்தகத்தை விவரிக்கின்றன. தமிழர்களின் நறுமண மிளகு (யவனப் பிரியா / கறுப்புத் தங்கம்), முசிரி மற்றும் கொற்கைத் துறைமுகங்களின் முத்துக்கள், பட்டு மற்றும் மணிக்கற்களைப் பெறுவதற்காக உரோமானியர்கள் கப்பல் கப்பலாகத் தங்க, வெள்ளி நாணயங்களைக் கொண்டுவந்து குவித்தனர்.\n\n"
            "சங்க காலச் சமூகம் மனிதநேயம், கல்வி, கலைகள் மற்றும் அறநெறிகளைப் போற்றி வளர்த்தது. அரசர்கள் புலவர்களை மதித்துப் போற்றினர்; விருந்தோம்பலும் ஈகையும் வாழ்வின் முதன்மைக் கடமைகளாகக் கருதப்பட்டன. கணியன் பூங்குன்றனாரின் 'யாதும் ஊரே யாவரும் கேளிர், தீதும் நன்றும் பிறர்தர வாரா' என்ற உலகளாவிய ஒருமைப்பாட்டுச் சிந்தனை, சங்க காலத் தமிழர்களின் உன்னதமான நாகரிகப் பண்பாட்டின் நித்திய சான்றாக இன்றும் விளங்குகிறது."
        ),
        "period": "300 BCE - 300 CE",
        "era": "Classical Antiquity",
        "region": "Ancient Tamilakam (Tamil Nadu & Kerala)",
        "location_name": "Madurai, Korkai, Poompuhar & Keeladi, Tamil Nadu",
        "latitude": 9.8631,
        "longitude": 78.1884,
        "tags": "history,sangam,moovendhar,keeladi,trade,roman,poompuhar,cheras,cholas,pandyas",
        "related_slugs": "sangam-literature-legacy,chola-dynasty,thiruvalluvar",
        "image_url": "/assets/library/purananuru_manuscript.png",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Sangam_Age_Artefacts_Keeladi.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Tamil Nadu State Department of Archaeology / Wikimedia Commons",
        "image_caption": "Archaeological terracotta and inscribed pottery shards unearthed at the ancient Sangam site of Keeladi",
        "source_name": "Tamil Nadu State Department of Archaeology & Archaeological Survey of India (ASI)",
        "source_url": "https://www.tnarch.gov.in/",
    },

    # =========================================================================
    # 8. PLACES
    # =========================================================================
    {
        "slug": "madurai-meenakshi",
        "category": "Places",
        "title_en": "Madurai & The Meenakshi Sundareswarar Temple",
        "title_ta": "மதுரை மற்றும் மீனாட்சி சுந்தரேஸ்வரர் திருக்கோவில்",
        "subtitle_en": "Ancient continuous temple metropolis on the Vaigai River and architectural masterpiece of Nayaka art",
        "subtitle_ta": "வைகைக் கரையில் இரண்டாயிரத்து ஐந்நூறு ஆண்டுகளாகத் திகழும் தூங்கா நகரம் மற்றும் சிற்பக் கலைக்கூடம்",
        "summary_en": "Madurai is one of the world's oldest continuously inhabited living cities, anchored by the iconic Meenakshi Amman Temple featuring fourteen towering Gopurams and the Hall of a Thousand Pillars.",
        "summary_ta": "உலகின் மிகத் தொன்மையான நகரங்களில் ஒன்றான மதுரை, 14 விண்ணை முட்டும் கோபுரங்கள் மற்றும் ஆயிரங்கால் மண்டபம் கொண்ட உலகப் புகழ்பெற்ற மீனாட்சி அம்மன் கோவிலின் தாயகமாகும்.",
        "content_en": (
            "Madurai, affectionately hailed as 'Thoonga Nagaram' (The City that Never Sleeps), 'Koodal Managar', and 'Malligai Maanagar', is one of the oldest continuously inhabited urban centers in world history, gracing the banks of the sacred Vaigai River for over 2,500 years. Serving as the legendary capital of the Pandya Kingdom and the historic seat of the three Tamil Sangam literary assemblies, Madurai has been a vibrant cradle of Tamil culture, commerce, and spiritual philosophy since antiquity, celebrated in classical Greek, Roman, and Arab travelogues.\n\n"
            "At the geographic and spiritual epicenter of Madurai's concentric lotus-shaped street layout stands the magnificent Arulmigu Meenakshi Sundareswarar Temple. Expanded into its present architectural splendour under the 16th-17th century Nayaka rulers (especially King Thirumalai Nayak), the vast 14-acre temple complex is renowned for its 14 soaring Gopurams (monumental gateway towers). The tallest South Tower reaches an imposing height of 52 meters (170 feet), enveloped in thousands of intricately sculpted, brightly painted stucco figures depicting scenes from Tamil puranas and classical mythology.\n\n"
            "Among the temple's engineering marvels is the celebrated Aayiram Kaal Mandapam (Hall of a Thousand Pillars), containing 985 meticulously carved granite columns portraying divine icons, warriors on rearing mythical Yalis, and musicians. Outside this hall stand the famed Musical Pillars, sculpted from single resonant granite stones that emit precise musical swaras when tapped. With its vibrant annual Chithirai Festival drawing millions of pilgrims, Madurai remains the living heartbeat of Tamil religious and civic tradition."
        ),
        "content_ta": (
            "மதுரை, 'தூங்கா நகரம்', 'கூடல் மாநகர்', 'மல்லிகைக் கொழுந்து நகரம்' எனப் பல சிறப்புகளுடன் அழைக்கப்படும் உலகின் மிகத் தொன்மையான தொடர் வாழ்விட நகரங்களில் ஒன்றாகும். வைகை நதிக்கரையில் 2,500 ஆண்டுகளுக்கும் மேலாகச் செழித்தோங்கி நிற்கும் இந்நகரம், சங்கம் வைத்துத் தமிழ் வளர்த்த பாண்டிய மன்னர்களின் தலைநகரமாகவும், தமிழ்ப் பண்பாட்டின் தாயகமாகவும் திகழ்கிறது. மெகஸ்தனிஸ், பிளினி மற்றும் இப்னு பதூதா போன்ற வரலாற்றுப் பயணிகள் மதுரையின் வளத்தையும் உன்னதத்தையும் வியந்து பதிவு செய்துள்ளனர்.\n\n"
            "மதுரை மாநகரின் மத்தியில் தாமரை மலரின் இதழ்களைப் போல அமைந்த வீதிகளின் நடுவே அருள்மிகு மீனாட்சி சுந்தரேஸ்வரர் திருக்கோவில் கம்பீரமாக வீற்றிருக்கிறது. 16 மற்றும் 17-ஆம் நூற்றாண்டுகளில் மதுரை நாயக்க மன்னர்களால், குறிப்பாகத் திருமலை நாயக்கரால் இக்கோவில் பிரம்மாண்டமாக விரிவாக்கப்பட்டது. 14 ஏக்கர் பரப்பளவில் அமைந்துள்ள இக்கோவிலில் 14 விண்ணை முட்டும் ராஜகோபுரங்கள் உள்ளன. இதில் 170 அடி உயரமுள்ள தெற்கு கோபுரம் பல்லாயிரக்கணக்கான சுதைச் சிற்பங்களுடன் தமிழர்களின் சிற்பக்கலை மேன்மையை வெளிப்படுத்துகிறது.\n\n"
            "இக்கோவிலின் மற்றுமொரு வியக்கத்தக்க அம்சம் 'ஆயிரங்கால் மண்டபம்' ஆகும்; இதில் 985 கலை நுணுக்கம் கொண்ட கருங்கல்தூண்கள் எழிலுற அமைந்துள்ளன. இதன் முகப்பில் அமைந்துள்ள 'இசைத் தூண்கள்' (Musical Pillars) ஒரே கல்லில் செதுக்கப்பட்டவை; இவற்றைத் தட்டினால் 'சரிகமபதநி' என்ற சப்த சுவரங்கள் இனிமையாக இசைக்கின்றன. ஆண்டுதோறும் சித்திரைத் திருவிழாவில் லட்சக்கணக்கான பக்தர்கள் கூடும் மதுரை, தமிழர்களின் பக்தி, கலை மற்றும் கலாச்சாரத்தின் நித்திய சங்கமமாக மிளிர்கிறது."
        ),
        "period": "Ancient to Modern",
        "era": "Pandya Era to Nayaka Era",
        "region": "Southern Tamil Nadu",
        "location_name": "Madurai City Center, Tamil Nadu",
        "latitude": 9.9195,
        "longitude": 78.1193,
        "tags": "places,madurai,meenakshi,temple,gopuram,pandya,nayaka,heritage",
        "related_slugs": "thanjavur,sangam-literature-legacy,sangam-period",
        "image_url": "/assets/library/madurai_meenakshi.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Madurai_Meenakshi_Amman_Temple_Towers.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Bernard Gagnon / Wikimedia Commons",
        "image_caption": "Vibrant gopurams of the historic Meenakshi Amman Temple rising above the skyline of Madurai",
        "source_name": "Hindu Religious and Charitable Endowments (HR&CE) Department & Tamil Nadu Tourism",
        "source_url": "https://maduraimeenakshi.hrce.tn.gov.in/",
    },
    {
        "slug": "thanjavur",
        "category": "Places",
        "title_en": "Thanjavur & The Kaveri Delta",
        "title_ta": "தஞ்சாவூர் மற்றும் காவிரி டெல்டா",
        "subtitle_en": "Cultural capital of the Cholas, rice bowl of Tamil Nadu, and sanctuary of fine arts and classical music",
        "subtitle_ta": "சோழர்களின் தலைசிறந்த பண்பாட்டுத் தலைநகரம், தமிழகத்தின் நெற்களஞ்சியம் மற்றும் கலைகளின் உறைவிடம்",
        "summary_en": "Thanjavur is the historic cultural capital of Tamil Nadu and the rice bowl of the Kaveri Delta, celebrated worldwide for the Brihadisvara Temple, Saraswathi Mahal Library, Thanjavur paintings, and brass art plates.",
        "summary_ta": "சோழர் காலத் தலைநகரான தஞ்சாவூர், செழுமையான காவிரிப் படுகையின் நெற்களஞ்சியமாகவும், தஞ்சாவூர் ஓவியங்கள், தட்டு மற்றும் சரசுவதி மகால் நூலகத்தின் கலைப் புகலிடமாகவும் திகழ்கிறது.",
        "content_en": (
            "Thanjavur, situated in the fertile delta of the sacred Kaveri River, is universally revered as the cultural capital of Tamil civilization and the 'Rice Bowl of Tamil Nadu' (Nel Kalanjiyam). Serving as the royal imperial capital of the Medieval Chola Empire from the 9th to 13th centuries, and subsequently enriched under the Thanjavur Nayakas and Maratha rulers, the city fostered an unprecedented renaissance in monumental temple architecture, Carnatic classical music, Bharatanatyam dance, bronze sculpture, and exquisite handicrafts.\n\n"
            "At the heart of Thanjavur's historic heritage stands the UNESCO World Heritage Brihadisvara Temple, accompanied by the expansive Thanjavur Maratha Palace complex. Within this royal palace lies the legendary Saraswathi Mahal Library (Thanjai Saraswathi Mahal Noolagam)—one of the oldest medieval libraries in Asia, housing a priceless repository of over 60,000 ancient palm-leaf manuscripts and rare paper codices spanning literature, indigenous Siddha and Ayurvedic medicine, musicology, astronomy, and statecraft in Tamil, Sanskrit, Telugu, and Marathi.\n\n"
            "Thanjavur is equally celebrated globally for its unique traditional handicrafts and visual arts. The world-renowned Thanjavur Paintings (Thanjavur Oviyam) are distinguished by their rich gold foil embossing, vibrant mineral pigments, and inset semi-precious stones adorning devotional portraits on wood panels. Furthermore, the city produces the iconic bobble-head Thanjavur Thalaiyatti Bommai (gravity-defying dancing dolls), hand-beaten silver-and-brass Thanjavur Art Plates, and resonant Tanjore Veena musical instruments, all awarded prestigious Geographical Indication (GI) status."
        ),
        "content_ta": (
            "தஞ்சாவூர், செழிப்புமிக்க காவிரி நதி பாயும் டெல்டா சமவெளியில் அமைந்துள்ள தமிழகத்தின் கலை மற்றும் பண்பாட்டுத் தலைநகரமாகும்; இது 'தமிழகத்தின் நெற்களஞ்சியம்' என்று பெருமையுடன் அழைக்கப்படுகிறது. கி.பி. 9 முதல் 13-ஆம் நூற்றாண்டு வரை மாபெரும் சோழப் பேரரசின் தலைநகரமாக விளங்கிய இந்நகரம், பின்னர் தஞ்சை நாயக்கர்கள் மற்றும் மராட்டிய மன்னர்களின் ஆட்சிக் காலத்தில் கர்நாடக இசை, பரதநாட்டியம், சிற்பக்கலை, ஓவியம் மற்றும் இலக்கியங்களின் உறைவிடமாக மறுமலர்ச்சி அடைந்தது.\n\n"
            "தஞ்சையின் அடையாளமாக உலகப் புகழ்பெற்ற தஞ்சைப் பெரிய கோவில் விளங்குவதோடு, வரலாற்றுச் சிறப்புமிக்க தஞ்சாவூர் மராட்டிய அரண்மனை வளாகமும் கம்பீரமாக வீற்றிருக்கிறது. இந்த அரண்மனையினுள் அமைந்துள்ள 'சரசுவதி மகால் நூலகம்' ஆசியாவின் மிகத் தொன்மையான நூலகங்களில் ஒன்றாகும். இதில் மருத்துவம், ஜோதிடம், இலக்கியம், இசை மற்றும் தத்துவம் சார்ந்த 60,000-க்கும் மேற்பட்ட அரிய பனை ஓலைச் சுவடிகளும், கையெழுத்துப் பிரதிகளும் பொக்கிஷமாகப் பாதுகாக்கப்பட்டு வருகின்றன.\n\n"
            "தஞ்சாவூர் கைவினைப் பொருட்களுக்கும் நுண்கலைகளுக்கும் உலக அளவில் பெயர் பெற்றது. தூய தங்க இலைகள் மற்றும் மணிக்கற்கள் பதித்து மரப்பலகையில் வரையப்படும் 'தஞ்சாவூர் ஓவியங்கள்' (Tanjore Paintings), புவியீர்ப்பு விசைக்கு ஏற்ப அழகாக ஆடும் 'தஞ்சாவூர் தலையாட்டி பொம்மை', பித்தளை மற்றும் வெள்ளியால் வேலைப்பாடு செய்யப்படும் 'தஞ்சாவூர்க் கலைத்தட்டு' மற்றும் தெய்வீக நாதம் எழுப்பும் 'தஞ்சாவூர் வீணை' ஆகியவை புவிசார் குறியீடு (GI Tag) பெற்று தமிழரின் கைவினைத்திறனை உலக அரங்கில் பறைசாற்றுகின்றன."
        ),
        "period": "Medieval to Modern",
        "era": "Chola, Nayaka & Maratha Eras",
        "region": "Kaveri Delta, Tamil Nadu",
        "location_name": "Thanjavur Royal Enclave, Tamil Nadu",
        "latitude": 10.7870,
        "longitude": 79.1378,
        "tags": "places,thanjavur,kaveri,chola,paintings,library,ricebowl,arts,heritage",
        "related_slugs": "brihadisvara-temple,chola-dynasty,madurai-meenakshi",
        "image_url": "/assets/library/kaveri_delta.jpg",
        "image_source_url": "https://commons.wikimedia.org/wiki/File:Saraswathi_Mahal_Library_Thanjavur.jpg",
        "image_source_name": "Wikimedia Commons",
        "image_license": "CC BY-SA 4.0",
        "image_attribution": "Tamil Nadu Tourism / Wikimedia Commons",
        "image_caption": "Historic Saraswathi Mahal Library and Royal Palace complex in Thanjavur",
        "source_name": "Thanjavur Palace Devasthanam & Tamil Nadu Tourism Development Corporation",
        "source_url": "https://www.tamilnadutourism.tn.gov.in/",
    },
]
