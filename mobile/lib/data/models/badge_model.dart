import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

enum BadgeRarity {
  common,
  uncommon,
  rare,
  epic,
  legendary;

  static BadgeRarity fromString(String? val) {
    switch (val?.toLowerCase()) {
      case 'uncommon':
        return BadgeRarity.uncommon;
      case 'rare':
        return BadgeRarity.rare;
      case 'epic':
        return BadgeRarity.epic;
      case 'legendary':
        return BadgeRarity.legendary;
      default:
        return BadgeRarity.common;
    }
  }

  String get displayName {
    switch (this) {
      case BadgeRarity.common:
        return 'Common';
      case BadgeRarity.uncommon:
        return 'Uncommon';
      case BadgeRarity.rare:
        return 'Rare';
      case BadgeRarity.epic:
        return 'Epic';
      case BadgeRarity.legendary:
        return 'Legendary';
    }
  }

  String get displayNameTa {
    switch (this) {
      case BadgeRarity.common:
        return 'சாதாரண';
      case BadgeRarity.uncommon:
        return 'சிறப்பு';
      case BadgeRarity.rare:
        return 'அரிதான';
      case BadgeRarity.epic:
        return 'உயரிய';
      case BadgeRarity.legendary:
        return 'வரலாற்றுப் பெருமை';
    }
  }

  Color get color {
    switch (this) {
      case BadgeRarity.common:
        return const Color(0xFF94A3B8); // Slate 400
      case BadgeRarity.uncommon:
        return AppColors.emerald;
      case BadgeRarity.rare:
        return AppColors.sky;
      case BadgeRarity.epic:
        return const Color(0xFFA855F7); // Purple 500
      case BadgeRarity.legendary:
        return AppColors.amber;
    }
  }

  Color get borderColor {
    return color.withValues(alpha: 0.6);
  }

  Color get glowColor {
    return color.withValues(alpha: 0.25);
  }
}

class BadgeIconMapper {
  static IconData getIcon(String? iconKey) {
    switch (iconKey?.toLowerCase()) {
      case 'school':
        return Icons.school_rounded;
      case 'menu_book':
        return Icons.menu_book_rounded;
      case 'history_edu':
        return Icons.history_edu_rounded;
      case 'auto_stories':
        return Icons.auto_stories_rounded;
      case 'local_fire_department':
        return Icons.local_fire_department_rounded;
      case 'whatshot':
        return Icons.whatshot_rounded;
      case 'military_tech':
        return Icons.military_tech_rounded;
      case 'grid_on':
        return Icons.grid_on_rounded;
      case 'extension':
        return Icons.extension_rounded;
      case 'castle':
        return Icons.castle_rounded;
      case 'museum':
        return Icons.museum_rounded;
      case 'lightbulb':
        return Icons.lightbulb_rounded;
      case 'psychology':
        return Icons.psychology_rounded;
      case 'today':
        return Icons.today_rounded;
      case 'group':
        return Icons.group_rounded;
      case 'diversity_3':
        return Icons.diversity_3_rounded;
      case 'favorite':
        return Icons.favorite_rounded;
      case 'star':
        return Icons.star_rounded;
      case 'workspace_premium':
        return Icons.workspace_premium_rounded;
      case 'emoji_events':
        return Icons.emoji_events_rounded;
      case 'diamond':
        return Icons.diamond_rounded;
      case 'quiz':
        return Icons.quiz_rounded;
      case 'shield':
        return Icons.shield_rounded;
      case 'auto_awesome':
        return Icons.auto_awesome_rounded;
      case 'record_voice_over':
        return Icons.record_voice_over_rounded;
      case 'mic':
        return Icons.mic_rounded;
      case 'verified':
        return Icons.verified_rounded;
      case 'restaurant':
        return Icons.restaurant_rounded;
      case 'local_taxi':
        return Icons.local_taxi_rounded;
      case 'trophy':
        return Icons.emoji_events_rounded;
      case 'badge':
        return Icons.military_tech_rounded;
      default:
        return Icons.military_tech_rounded;
    }
  }

  static String getBadgeAsset(String? keyOrId) {
    switch (keyOrId?.toUpperCase()) {
      case 'TAMIL_BEGINNINGS':
      case 'STREAK_STARTER':
      case 'FIRST_FRIEND':
        return 'assets/images/Badge1Thodakkam.png';
      case 'SCRIPT_MASTER':
      case 'HERITAGE_EXPLORER':
        return 'assets/images/Badge2EzhuthuArivu.png';
      case 'TAMIL_SCHOLAR':
      case 'WEEK_WARRIOR':
        return 'assets/images/Badge3KaiEzhuthu.png';
      case 'VOCAB_EXPLORER':
      case 'DAILY_DEVOTEE':
      case 'COMMUNITY_PILLAR':
        return 'assets/images/Badge4SolVangi.png';
      case 'CROSSWORD_MASTER':
      case 'CROSSWORD_NOVICE':
      case 'PUZZLE_GENIUS':
      case 'QUIZ_CHAMPION':
        return 'assets/images/Badge5VaakyaAmaippu.png';
      case 'KURAL_SCHOLAR':
      case 'KURAL_BEGINNER':
      case 'THIRUKKURAL_SAGE':
      case 'MONTH_MASTER':
      case 'PERFECT_SCORE':
        return 'assets/images/Badge6VasippuThiran.png';
      case 'LEGEND_OF_TAMIL':
      case 'LEVEL_TEN':
      case 'CENTURY_STREAK':
      case 'HERITAGE_GUARDIAN':
      case 'POPULAR_LEARNER':
      default:
        return 'assets/images/Badge7.png';
    }
  }
}

class BadgeArtWidget extends StatelessWidget {
  final BadgeModel badge;
  final double size;
  final bool showLockWhenLocked;

  const BadgeArtWidget({
    super.key,
    required this.badge,
    this.size = 52,
    this.showLockWhenLocked = true,
  });

  @override
  Widget build(BuildContext context) {
    final image = badge.imageAsset;
    final isLocked = !badge.isUnlocked;

    return Stack(
      alignment: Alignment.center,
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: badge.isUnlocked
                ? badge.rarity.color.withValues(alpha: 0.15)
                : AppColors.surfaceLight.withValues(alpha: 0.5),
            border: Border.all(
              color: badge.isUnlocked ? badge.rarity.color : AppColors.border,
              width: 2,
            ),
            boxShadow: badge.isUnlocked
                ? [
                    BoxShadow(
                      color: badge.rarity.glowColor,
                      blurRadius: 12,
                      spreadRadius: 1,
                    )
                  ]
                : null,
          ),
          child: ClipOval(
            child: ColorFiltered(
              colorFilter: isLocked
                  ? const ColorFilter.matrix(<double>[
                      0.2126, 0.7152, 0.0722, 0, 0,
                      0.2126, 0.7152, 0.0722, 0, 0,
                      0.2126, 0.7152, 0.0722, 0, 0,
                      0,      0,      0,      0.45, 0,
                    ])
                  : const ColorFilter.mode(Colors.transparent, BlendMode.multiply),
              child: Image.asset(
                image,
                width: size,
                height: size,
                fit: BoxFit.cover,
                errorBuilder: (_, _, _) => Center(
                  child: Icon(
                    BadgeIconMapper.getIcon(badge.icon),
                    size: size * 0.52,
                    color: isLocked ? AppColors.textMuted : badge.rarity.color,
                  ),
                ),
              ),
            ),
          ),
        ),
        if (isLocked && showLockWhenLocked)
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              padding: const EdgeInsets.all(3),
              decoration: const BoxDecoration(
                color: Color(0xFF0F172A),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.lock_rounded,
                size: 14,
                color: AppColors.textMuted,
              ),
            ),
          ),
      ],
    );
  }
}

class BadgeModel {
  final String id;
  final String key;
  final String name;
  final String nameTamil;
  final String description;
  final String descriptionTamil;
  final String icon;
  final String category;
  final BadgeRarity rarity;
  final int xpReward;
  final bool isUnlocked;
  final String? unlockedAt;
  final int progress;
  final int progressTarget;

  const BadgeModel({
    required this.id,
    required this.key,
    required this.name,
    required this.nameTamil,
    required this.description,
    required this.descriptionTamil,
    required this.icon,
    required this.category,
    required this.rarity,
    required this.xpReward,
    this.isUnlocked = false,
    this.unlockedAt,
    this.progress = 0,
    this.progressTarget = 1,
  });

  double get progressRatio {
    if (progressTarget <= 0) return 0.0;
    return (progress / progressTarget).clamp(0.0, 1.0);
  }

  String get imageAsset {
    switch (key.toUpperCase()) {
      case 'TAMIL_BEGINNINGS':
      case 'STREAK_STARTER':
      case 'FIRST_FRIEND':
        return 'assets/images/Badge1Thodakkam.png';
      case 'SCRIPT_MASTER':
      case 'HERITAGE_EXPLORER':
        return 'assets/images/Badge2EzhuthuArivu.png';
      case 'TAMIL_SCHOLAR':
      case 'WEEK_WARRIOR':
        return 'assets/images/Badge3KaiEzhuthu.png';
      case 'VOCAB_EXPLORER':
      case 'DAILY_DEVOTEE':
      case 'COMMUNITY_PILLAR':
        return 'assets/images/Badge4SolVangi.png';
      case 'CROSSWORD_MASTER':
      case 'CROSSWORD_NOVICE':
      case 'PUZZLE_GENIUS':
      case 'QUIZ_CHAMPION':
        return 'assets/images/Badge5VaakyaAmaippu.png';
      case 'KURAL_SCHOLAR':
      case 'KURAL_BEGINNER':
      case 'THIRUKKURAL_SAGE':
      case 'MONTH_MASTER':
      case 'PERFECT_SCORE':
        return 'assets/images/Badge6VasippuThiran.png';
      case 'LEGEND_OF_TAMIL':
      case 'LEVEL_TEN':
      case 'CENTURY_STREAK':
      case 'HERITAGE_GUARDIAN':
      case 'POPULAR_LEARNER':
      default:
        return 'assets/images/Badge7.png';
    }
  }

  factory BadgeModel.fromJson(Map<String, dynamic> json) {
    final target = json['progress_target'] as int? ??
        json['requirement_value'] as int? ??
        1;
    final prog = json['progress'] as int? ?? 0;
    final isUnl = json['is_unlocked'] as bool? ?? (json['unlocked_at'] != null);

    return BadgeModel(
      id: json['id'] as String? ?? '',
      key: json['key'] as String? ?? json['id'] as String? ?? '',
      name: json['name'] as String? ?? json['title'] as String? ?? '',
      nameTamil: json['name_tamil'] as String? ?? json['title_ta'] as String? ?? '',
      description: json['description'] as String? ?? '',
      descriptionTamil: json['description_tamil'] as String? ?? json['description_ta'] as String? ?? '',
      icon: json['icon'] as String? ?? 'military_tech',
      category: json['category'] as String? ?? 'learning',
      rarity: BadgeRarity.fromString(json['rarity'] as String?),
      xpReward: json['xp_reward'] as int? ?? 50,
      isUnlocked: isUnl,
      unlockedAt: json['unlocked_at'] as String?,
      progress: prog,
      progressTarget: target,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'key': key,
      'name': name,
      'name_tamil': nameTamil,
      'description': description,
      'description_tamil': descriptionTamil,
      'icon': icon,
      'category': category,
      'rarity': rarity.name,
      'xp_reward': xpReward,
      'is_unlocked': isUnlocked,
      'unlocked_at': unlockedAt,
      'progress': progress,
      'progress_target': progressTarget,
    };
  }

  BadgeModel copyWith({
    String? id,
    String? key,
    String? name,
    String? nameTamil,
    String? description,
    String? descriptionTamil,
    String? icon,
    String? category,
    BadgeRarity? rarity,
    int? xpReward,
    bool? isUnlocked,
    String? unlockedAt,
    int? progress,
    int? progressTarget,
  }) {
    return BadgeModel(
      id: id ?? this.id,
      key: key ?? this.key,
      name: name ?? this.name,
      nameTamil: nameTamil ?? this.nameTamil,
      description: description ?? this.description,
      descriptionTamil: descriptionTamil ?? this.descriptionTamil,
      icon: icon ?? this.icon,
      category: category ?? this.category,
      rarity: rarity ?? this.rarity,
      xpReward: xpReward ?? this.xpReward,
      isUnlocked: isUnlocked ?? this.isUnlocked,
      unlockedAt: unlockedAt ?? this.unlockedAt,
      progress: progress ?? this.progress,
      progressTarget: progressTarget ?? this.progressTarget,
    );
  }
}

class BadgeProgressSummary {
  final int totalBadges;
  final int unlockedCount;
  final double progressRatio;
  final Map<String, dynamic> categories;
  final List<BadgeModel> recentlyUnlocked;

  const BadgeProgressSummary({
    required this.totalBadges,
    required this.unlockedCount,
    required this.progressRatio,
    required this.categories,
    required this.recentlyUnlocked,
  });

  factory BadgeProgressSummary.fromJson(Map<String, dynamic> json) {
    final recent = (json['recently_unlocked'] as List<dynamic>?)
            ?.map((e) => BadgeModel.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];
    return BadgeProgressSummary(
      totalBadges: json['total_badges'] as int? ?? 0,
      unlockedCount: json['unlocked_count'] as int? ?? 0,
      progressRatio: (json['progress_ratio'] as num?)?.toDouble() ?? 0.0,
      categories: (json['categories'] as Map<String, dynamic>?) ?? {},
      recentlyUnlocked: recent,
    );
  }
}
