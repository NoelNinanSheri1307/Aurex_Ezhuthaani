enum MascotState {
  idle,
  happy,
  excited,
  thinking,
  celebrating,
  sad,
  encouraging,
  streak,
  levelUp,
  quizCorrect,
  quizWrong,
  dailyComplete,
}

extension MascotStateX on MascotState {
  String get defaultSpeech {
    switch (this) {
      case MascotState.idle:
        return 'வணக்கம்! 👋 இன்று என்ன படிக்கலாம்?';
      case MascotState.happy:
        return 'அருமை! மிகச் சிறப்பாகக் கற்கிறீர்கள்! 🐘✨';
      case MascotState.excited:
        return 'வேகம் குறையாமல் தொடருங்கள்! 💪';
      case MascotState.thinking:
        return 'சிந்தித்துப் பாருங்கள்... விடை மிக எளிது! 🤔';
      case MascotState.celebrating:
        return 'அபாரமான வெற்றி! வாழ்த்துகள்! 🌟🎉';
      case MascotState.sad:
        return 'வருந்தாதீர்கள்! தவறுகளே சிறந்த பாடம்.';
      case MascotState.encouraging:
        return 'வாங்க! இன்னைக்கு கொஞ்சம் தமிழ் கற்போமா? 📚';
      case MascotState.streak:
        return 'உங்கள் தொடர் சாதனை தீப்பிழம்பாய் எரிகிறது! 🔥';
      case MascotState.levelUp:
        return 'அருமை! புதிய நிலை உயர்ந்தது! 👑🎉';
      case MascotState.quizCorrect:
        return 'சூப்பர்! சரியான பதில்! ✨🎉';
      case MascotState.quizWrong:
        return 'பரவாயில்லை! இன்னொரு முறை முயற்சி செய்வோம்.';
      case MascotState.dailyComplete:
        return 'இன்றைய பயிற்சி முடிந்தது! அற்புதம்! 🏆💪';
    }
  }

  String get englishSpeech {
    switch (this) {
      case MascotState.idle:
        return "Hello! 👋 What are we learning today?";
      case MascotState.happy:
        return "Great job! You're learning wonderfully! 🐘✨";
      case MascotState.excited:
        return "Keep this great momentum going! 💪";
      case MascotState.thinking:
        return "Think about it... the answer is simple! 🤔";
      case MascotState.celebrating:
        return "Outstanding victory! Congratulations! 🌟🎉";
      case MascotState.sad:
        return "Don't worry! Mistakes are the best lessons.";
      case MascotState.encouraging:
        return "Come on! Shall we learn some Tamil today? 📚";
      case MascotState.streak:
        return "Your streak is burning bright! Keep it up! 🔥";
      case MascotState.levelUp:
        return "Awesome! Level up reached! 👑🎉";
      case MascotState.quizCorrect:
        return "Super! Correct answer! ✨🎉";
      case MascotState.quizWrong:
        return "No worries! Let's try once more.";
      case MascotState.dailyComplete:
        return "Today's challenges complete! Bravo! 🏆💪";
    }
  }

  String get assetPath {
    switch (this) {
      case MascotState.idle:
      case MascotState.excited:
        return 'assets/images/mascotlanding.png';
      case MascotState.happy:
        return 'assets/images/mascothappy.png';
      case MascotState.thinking:
        return 'assets/images/mascotstudying.png';
      case MascotState.celebrating:
      case MascotState.levelUp:
      case MascotState.quizCorrect:
      case MascotState.dailyComplete:
        return 'assets/images/mascotwinning.png';
      case MascotState.sad:
      case MascotState.quizWrong:
        return 'assets/images/mascotstudying.png';
      case MascotState.encouraging:
      case MascotState.streak:
        return 'assets/images/mascotteaching.png';
    }
  }

  static const List<String> randomTapQuotes = [
    'வணக்கம்! நான் உங்கள் தமிழ் யானை தோழன்! 🐘',
    'தமிழ் கற்பது மிக இனிமையான பயணம்! ✨',
    'இன்றைய பாடங்களை முடிக்கத் தயாரா? 📚',
    'எழுத்தாணி மூலம் தமிழ் அறிவை வளர்ப்போம்! 🌟',
    'உங்கள் ஆர்வமே உங்கள் மிகப்பெரிய பலம்! 💪',
    'முயற்சி திருவினையாக்கும்! தொடர்ந்து பயிலுங்கள்! 🎯',
  ];
}
