import 'package:flutter/foundation.dart';
import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../models/flashcard_model.dart';

class FlashcardRepository {
  final DioClient _dioClient;

  FlashcardRepository(this._dioClient);

  static const List<FlashcardCategoryModel> fallbackCategories = [
    FlashcardCategoryModel(
      id: 'greetings',
      titleTa: 'வாழ்த்துகள் & அறிமுகம்',
      titleEn: 'Greetings & Basics',
      descriptionTa: 'தினசரி நலம் விசாரிப்பு மற்றும் அடிப்படைச் சொற்கள்',
      descriptionEn: 'Everyday greetings and polite expressions',
      icon: '👋',
      color: '#10B981',
      cardCount: 6,
      xpReward: 60,
    ),
    FlashcardCategoryModel(
      id: 'food',
      titleTa: 'உணவு & சுவை',
      titleEn: 'Food & Flavors',
      descriptionTa: 'தமிழ்நாட்டு பாரம்பரிய உணவுகள் மற்றும் சுவைகள்',
      descriptionEn: 'Traditional foods, drinks and tastes',
      icon: '🍲',
      color: '#F59E0B',
      cardCount: 6,
      xpReward: 60,
    ),
    FlashcardCategoryModel(
      id: 'numbers',
      titleTa: 'எண்கள் & நேரம்',
      titleEn: 'Numbers & Time',
      descriptionTa: 'எண்ணிக்கை, நேரம் மற்றும் கால அளவுகள்',
      descriptionEn: 'Counting, time, and everyday units',
      icon: '🔢',
      color: '#8B5CF6',
      cardCount: 6,
      xpReward: 60,
    ),
    FlashcardCategoryModel(
      id: 'travel',
      titleTa: 'பயணம் & வழி',
      titleEn: 'Travel & Directions',
      descriptionTa: 'போக்குவரத்து மற்றும் திசைகள் அறிதல்',
      descriptionEn: 'Vehicles, directions and getting around',
      icon: '🛺',
      color: '#06B6D4',
      cardCount: 6,
      xpReward: 60,
    ),
    FlashcardCategoryModel(
      id: 'daily_conversation',
      titleTa: 'தினசரி உரையாடல்',
      titleEn: 'Daily Conversation',
      descriptionTa: 'பொதுவான கேள்விகள் மற்றும் எளிய பதில்கள்',
      descriptionEn: 'Common questions, phrases and replies',
      icon: '💬',
      color: '#EC4899',
      cardCount: 6,
      xpReward: 60,
    ),
  ];

  static const Map<String, List<FlashcardModel>> fallbackDecks = {
    'greetings': [
      FlashcardModel(
        id: 'gr_1',
        categoryId: 'greetings',
        wordTa: 'வணக்கம்',
        wordEn: 'Hello / Greetings',
        transliteration: 'Vanakkam',
        exampleTa: 'வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்?',
        exampleEn: 'Hello! How are you?',
        pronunciationTip: 'Traditional respectful greeting across Tamil culture',
      ),
      FlashcardModel(
        id: 'gr_2',
        categoryId: 'greetings',
        wordTa: 'நன்றி',
        wordEn: 'Thank you',
        transliteration: 'Nandri',
        exampleTa: 'உங்கள் உதவிக்கு மிக்க நன்றி.',
        exampleEn: 'Thank you very much for your help.',
        pronunciationTip: 'Roll the "r" gently at the end',
      ),
      FlashcardModel(
        id: 'gr_3',
        categoryId: 'greetings',
        wordTa: 'தயவுசெய்து',
        wordEn: 'Please',
        transliteration: 'Thayavuseithu',
        exampleTa: 'தயவுசெய்து உள்ளே வாருங்கள்.',
        exampleEn: 'Please come inside.',
        pronunciationTip: 'Expresses politeness and respect',
      ),
      FlashcardModel(
        id: 'gr_4',
        categoryId: 'greetings',
        wordTa: 'மன்னிக்கவும்',
        wordEn: 'Excuse me / Sorry',
        transliteration: 'Mannikkavum',
        exampleTa: 'என்னை மன்னிக்கவும், எனக்குத் தெரியாது.',
        exampleEn: 'Excuse me/Sorry, I don\'t know.',
        pronunciationTip: 'Used for apologies and getting attention',
      ),
      FlashcardModel(
        id: 'gr_5',
        categoryId: 'greetings',
        wordTa: 'நல்வரவு',
        wordEn: 'Welcome',
        transliteration: 'Nalvaravu',
        exampleTa: 'எங்கள் இல்லத்திற்கு நல்வரவு!',
        exampleEn: 'Welcome to our home!',
        pronunciationTip: 'Compound word: நல் (Good) + வரவு (Arrival)',
      ),
      FlashcardModel(
        id: 'gr_6',
        categoryId: 'greetings',
        wordTa: 'மீண்டும் சந்திப்போம்',
        wordEn: 'See you again',
        transliteration: 'Meendum Sandhippom',
        exampleTa: 'நாளை மீண்டும் சந்திப்போம்.',
        exampleEn: 'We will meet again tomorrow.',
        pronunciationTip: 'Common polite way to say goodbye',
      ),
    ],
    'food': [
      FlashcardModel(
        id: 'fd_1',
        categoryId: 'food',
        wordTa: 'தோசை',
        wordEn: 'Crispy Crepe (Dosai)',
        transliteration: 'Dosai',
        exampleTa: 'எனக்கு மொறுமொறுப்பான நெய் தோசை பிடிக்கும்.',
        exampleEn: 'I like crispy ghee dosai.',
        pronunciationTip: 'Iconic South Indian fermented rice-lentil dish',
      ),
      FlashcardModel(
        id: 'fd_2',
        categoryId: 'food',
        wordTa: 'சாம்பார்',
        wordEn: 'Lentil Vegetable Stew',
        transliteration: 'Sambar',
        exampleTa: 'சுடச்சுட சாம்பார் சாதம் அருமை.',
        exampleEn: 'Piping hot sambar rice is wonderful.',
        pronunciationTip: 'Staple aromatic curry spiced with tamarind',
      ),
      FlashcardModel(
        id: 'fd_3',
        categoryId: 'food',
        wordTa: 'சுவை',
        wordEn: 'Taste / Flavor',
        transliteration: 'Suvai',
        exampleTa: 'இந்த உணவு மிகவும் சுவையாக உள்ளது.',
        exampleEn: 'This food is very delicious.',
        pronunciationTip: 'Tamil literature celebrates "Aru Suvai" (6 tastes)',
      ),
      FlashcardModel(
        id: 'fd_4',
        categoryId: 'food',
        wordTa: 'தண்ணீர்',
        wordEn: 'Water',
        transliteration: 'Thanneer',
        exampleTa: 'தயவுசெய்து குடிக்க தண்ணீர் கொடுங்கள்.',
        exampleEn: 'Please give water to drink.',
        pronunciationTip: 'Soft "th" sound as in "thought"',
      ),
      FlashcardModel(
        id: 'fd_5',
        categoryId: 'food',
        wordTa: 'இனிப்பு',
        wordEn: 'Sweet',
        transliteration: 'Inippu',
        exampleTa: 'பண்டிகைக்கு இனிப்பு வாங்கினேன்.',
        exampleEn: 'I bought sweets for the festival.',
        pronunciationTip: 'Stress the double "p" sound',
      ),
      FlashcardModel(
        id: 'fd_6',
        categoryId: 'food',
        wordTa: 'காபி',
        wordEn: 'Filter Coffee',
        transliteration: 'Kaapi',
        exampleTa: 'சூடான ஒரு கப் டிகிரி காபி வேண்டும்.',
        exampleEn: 'I want a cup of hot degree filter coffee.',
        pronunciationTip: 'Traditional South Indian frothy chicory brew',
      ),
    ],
    'numbers': [
      FlashcardModel(
        id: 'num_1',
        categoryId: 'numbers',
        wordTa: 'ஒன்று',
        wordEn: 'One (1)',
        transliteration: 'Ondru',
        exampleTa: 'எனக்கு ஒன்று மட்டும் போதும்.',
        exampleEn: 'One is enough for me.',
        pronunciationTip: 'Pronounced with a gentle retroflex "ndr"',
      ),
      FlashcardModel(
        id: 'num_2',
        categoryId: 'numbers',
        wordTa: 'ஐந்து',
        wordEn: 'Five (5)',
        transliteration: 'Ainthu',
        exampleTa: 'இங்கு ஐந்து புத்தகங்கள் உள்ளன.',
        exampleEn: 'There are five books here.',
        pronunciationTip: 'Starts with the diphthong "ai"',
      ),
      FlashcardModel(
        id: 'num_3',
        categoryId: 'numbers',
        wordTa: 'பத்து',
        wordEn: 'Ten (10)',
        transliteration: 'Pathu',
        exampleTa: 'பத்து நிமிடங்களில் வருகிறேன்.',
        exampleEn: 'I will arrive in ten minutes.',
        pronunciationTip: 'Short sharp vowel with doubled "th"',
      ),
      FlashcardModel(
        id: 'num_4',
        categoryId: 'numbers',
        wordTa: 'நூறு',
        wordEn: 'Hundred (100)',
        transliteration: 'Nooru',
        exampleTa: 'இதன் விலை நூறு ரூபாய்.',
        exampleEn: 'The price of this is one hundred rupees.',
        pronunciationTip: 'Elongated "oo" vowel sound',
      ),
      FlashcardModel(
        id: 'num_5',
        categoryId: 'numbers',
        wordTa: 'இன்று',
        wordEn: 'Today',
        transliteration: 'Indru',
        exampleTa: 'இன்று மிகவும் நல்ல நாள்.',
        exampleEn: 'Today is a very good day.',
        pronunciationTip: 'Opposite of நாளை (Naalai - tomorrow)',
      ),
      FlashcardModel(
        id: 'num_6',
        categoryId: 'numbers',
        wordTa: 'மணி',
        wordEn: 'Hour / Time',
        transliteration: 'Mani',
        exampleTa: 'இப்போது மணி என்ன?',
        exampleEn: 'What is the time now?',
        pronunciationTip: 'Retroflex "ni" - tongue curved back to palate',
      ),
    ],
    'travel': [
      FlashcardModel(
        id: 'tr_1',
        categoryId: 'travel',
        wordTa: 'பேருந்து',
        wordEn: 'Bus',
        transliteration: 'Paerundhu',
        exampleTa: 'பேருந்து நிலையம் எங்குள்ளது?',
        exampleEn: 'Where is the bus station?',
        pronunciationTip: 'Shortened colloquially to "bus" or "vandi"',
      ),
      FlashcardModel(
        id: 'tr_2',
        categoryId: 'travel',
        wordTa: 'ரயில்',
        wordEn: 'Train',
        transliteration: 'Rayil',
        exampleTa: 'ரயில் சரியான நேரத்திற்கு வந்தது.',
        exampleEn: 'The train arrived on time.',
        pronunciationTip: 'Also referred to as தொடர்வண்டி (Thodarvandi)',
      ),
      FlashcardModel(
        id: 'tr_3',
        categoryId: 'travel',
        wordTa: 'எங்கே',
        wordEn: 'Where',
        transliteration: 'Engae',
        exampleTa: 'மருத்துவமனை எங்கே இருக்கிறது?',
        exampleEn: 'Where is the hospital located?',
        pronunciationTip: 'Essential question word for directions',
      ),
      FlashcardModel(
        id: 'tr_4',
        categoryId: 'travel',
        wordTa: 'நேராக',
        wordEn: 'Straight ahead',
        transliteration: 'Naeraaga',
        exampleTa: 'நேராக சென்று இடதுபுறம் திரும்புங்கள்.',
        exampleEn: 'Go straight and turn left.',
        pronunciationTip: 'Used for navigation and directions',
      ),
      FlashcardModel(
        id: 'tr_5',
        categoryId: 'travel',
        wordTa: 'வலதுபுறம்',
        wordEn: 'Right side',
        transliteration: 'Valadhupuram',
        exampleTa: 'அந்தக் கடை வலதுபுறத்தில் உள்ளது.',
        exampleEn: 'That shop is on the right side.',
        pronunciationTip: 'Contrast with இடதுபுறம் (Idadhupuram - Left side)',
      ),
      FlashcardModel(
        id: 'tr_6',
        categoryId: 'travel',
        wordTa: 'எவ்வளவு',
        wordEn: 'How much',
        transliteration: 'Evvalavu',
        exampleTa: 'ஆட்டோ கட்டணம் எவ்வளவு?',
        exampleEn: 'How much is the auto fare?',
        pronunciationTip: 'Crucial phrase for bargaining and shopping',
      ),
    ],
    'daily_conversation': [
      FlashcardModel(
        id: 'dc_1',
        categoryId: 'daily_conversation',
        wordTa: 'பெயர்',
        wordEn: 'Name',
        transliteration: 'Peyar',
        exampleTa: 'உங்கள் பெயர் என்ன?',
        exampleEn: 'What is your name?',
        pronunciationTip: 'Often shortened colloquially to "Paeru"',
      ),
      FlashcardModel(
        id: 'dc_2',
        categoryId: 'daily_conversation',
        wordTa: 'எப்போது',
        wordEn: 'When',
        transliteration: 'Eppothu',
        exampleTa: 'நீங்கள் எப்போது வருவீர்கள்?',
        exampleEn: 'When will you arrive?',
        pronunciationTip: 'Core question word for schedules and planning',
      ),
      FlashcardModel(
        id: 'dc_3',
        categoryId: 'daily_conversation',
        wordTa: 'மகிழ்ச்சி',
        wordEn: 'Happiness / Joy',
        transliteration: 'Magizhchi',
        exampleTa: 'உங்களை சந்தித்ததில் மிக்க மகிழ்ச்சி!',
        exampleEn: 'Very pleased to meet you!',
        pronunciationTip: 'Contains the unique special Tamil letter "ழ" (zha)',
      ),
      FlashcardModel(
        id: 'dc_4',
        categoryId: 'daily_conversation',
        wordTa: 'உதவி',
        wordEn: 'Help / Favor',
        transliteration: 'Udhavi',
        exampleTa: 'எனக்கு ஒரு சிறிய உதவி வேண்டும்.',
        exampleEn: 'I need a small favor.',
        pronunciationTip: 'Polite keyword when seeking assistance',
      ),
      FlashcardModel(
        id: 'dc_5',
        categoryId: 'daily_conversation',
        wordTa: 'புரிகிறது',
        wordEn: 'Understood',
        transliteration: 'Purigiradhu',
        exampleTa: 'எனக்கு நன்றாக புரிகிறது.',
        exampleEn: 'I understand very well.',
        pronunciationTip: 'Say "புரியவில்லை" (Puriyavillai) for "I don\'t understand"',
      ),
      FlashcardModel(
        id: 'dc_6',
        categoryId: 'daily_conversation',
        wordTa: 'வீடு',
        wordEn: 'Home / House',
        transliteration: 'Veedu',
        exampleTa: 'நான் இப்போது வீட்டிற்கு செல்கிறேன்.',
        exampleEn: 'I am going home now.',
        pronunciationTip: 'Long vowel "Vee" with hard retroflex "du"',
      ),
    ],
  };

  Future<List<FlashcardCategoryModel>> getCategories() async {
    try {
      final response = await _dioClient.get(ApiConstants.flashcardCategories);
      if (response is Map<String, dynamic> && response['categories'] != null) {
        final list = response['categories'] as List<dynamic>;
        return list.map((c) => FlashcardCategoryModel.fromJson(c as Map<String, dynamic>)).toList();
      }
    } catch (e) {
      debugPrint('FlashcardRepository: failed to fetch remote categories: $e');
    }
    return fallbackCategories;
  }

  Future<FlashcardDeckModel> getDeck(String categoryId) async {
    try {
      final response = await _dioClient.get(ApiConstants.flashcardDeck(categoryId));
      if (response is Map<String, dynamic>) {
        return FlashcardDeckModel.fromJson(response);
      }
    } catch (e) {
      debugPrint('FlashcardRepository: failed to fetch remote deck for $categoryId: $e');
    }

    final cat = fallbackCategories.firstWhere(
      (c) => c.id == categoryId,
      orElse: () => fallbackCategories.first,
    );
    final cards = fallbackDecks[categoryId] ?? fallbackDecks['greetings']!;

    return FlashcardDeckModel(
      category: cat,
      cards: cards,
    );
  }

  Future<FlashcardSessionResultModel> completeSession({
    required String categoryId,
    required int knownCount,
    required int totalCount,
    required int xpEarned,
  }) async {
    try {
      final response = await _dioClient.post(
        ApiConstants.flashcardComplete,
        data: {
          'category_id': categoryId,
          'known_count': knownCount,
          'total_count': totalCount,
          'xp_earned': xpEarned,
        },
      );
      if (response is Map<String, dynamic>) {
        return FlashcardSessionResultModel.fromJson(response);
      }
    } catch (e) {
      debugPrint('FlashcardRepository: failed to record session online: $e');
    }

    // Local fallback return
    return FlashcardSessionResultModel(
      categoryId: categoryId,
      xpAwarded: xpEarned,
      userTotalXp: 0,
      newLevel: 1,
      streak: 1,
      knownCount: knownCount,
      totalCount: totalCount,
    );
  }
}
