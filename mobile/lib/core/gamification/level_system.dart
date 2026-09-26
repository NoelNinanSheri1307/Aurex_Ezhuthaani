import 'dart:math' as math;

class LevelSystem {
  /// Computes level from total XP using the exact backend formula:
  /// level = int((xp / 100) ^ 0.5) + 1
  static int levelForXp(int xp) {
    if (xp <= 0) return 1;
    return (math.sqrt(xp / 100)).floor() + 1;
  }

  /// Total XP required to reach the start of [level].
  static int xpForLevel(int level) {
    if (level <= 1) return 0;
    return (level - 1) * (level - 1) * 100;
  }

  /// Total XP required to reach [level] + 1.
  static int xpForNextLevel(int level) {
    return level * level * 100;
  }

  /// Minimum XP required for the user's current level.
  static int currentLevelMinXp(int xp) {
    final safeXp = math.max(0, xp);
    return xpForLevel(levelForXp(safeXp));
  }

  /// Target minimum XP required to reach the next level.
  static int nextLevelMinXp(int xp) {
    final safeXp = math.max(0, xp);
    return xpForNextLevel(levelForXp(safeXp));
  }

  /// Progress ratio (0.0 to 1.0) within the current level range:
  /// (xp - currentLevelMinXP) / (nextLevelMinXP - currentLevelMinXP)
  static double levelProgress(int xp) {
    final safeXp = math.max(0, xp);
    final currentLevel = levelForXp(safeXp);
    final floorXp = xpForLevel(currentLevel);
    final nextXp = xpForNextLevel(currentLevel);
    final range = nextXp - floorXp;
    if (range <= 0) return 1.0;
    final currentXpInLevel = safeXp - floorXp;
    return (currentXpInLevel / range).clamp(0.0, 1.0);
  }

  /// XP needed to reach the next level.
  static int xpNeededForNextLevel(int xp) {
    final safeXp = math.max(0, xp);
    final target = nextLevelMinXp(safeXp);
    return math.max(0, target - safeXp);
  }

  /// Alias for xpNeededForNextLevel
  static int xpRemaining(int xp) => xpNeededForNextLevel(xp);

  /// Tamil honorary title based on level.
  static String levelTitle(int level) {
    switch (level) {
      case 1:
        return 'தொடக்க நிலை';
      case 2:
        return 'தமிழ் ஆர்வலர்';
      case 3:
        return 'சொல் மாணவன்';
      case 4:
        return 'கவிதைப் பயில்நர்';
      case 5:
        return 'இலக்கண நேயர்';
      case 6:
        return 'செந்தமிழ் செல்வன்';
      case 7:
        return 'குறள் வித்தகன்';
      case 8:
        return 'சங்கச் சிற்பி';
      case 9:
        return 'முத்தமிழ்ப் பேரறிஞன்';
      default:
        return 'தமிழ்ப் பேரரசன்';
    }
  }

  /// English subtitle for the level.
  static String levelSubtitle(int level) {
    switch (level) {
      case 1:
        return 'Novice Seeker';
      case 2:
        return 'Tamil Enthusiast';
      case 3:
        return 'Word Explorer';
      case 4:
        return 'Poetic Apprentice';
      case 5:
        return 'Grammar Adept';
      case 6:
        return 'Tamil Scholar';
      case 7:
        return 'Kural Virtuoso';
      case 8:
        return 'Sangam Artisan';
      case 9:
        return 'Grand Polymath';
      default:
        return 'Tamil Sovereign';
    }
  }
}
