import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:ezhuthaani/data/models/badge_model.dart';
import 'package:ezhuthaani/data/models/social_model.dart';
import 'package:ezhuthaani/core/widgets/badge_unlock_dialog.dart';

void main() {
  group('Badge System Models & Utilities Test', () {
    test('BadgeModel parses from JSON correctly', () {
      final json = {
        'id': 'TAMIL_BEGINNINGS',
        'key': 'TAMIL_BEGINNINGS',
        'name': 'Tamil Beginnings',
        'name_tamil': 'தமிழ் தொடக்கம்',
        'description': 'Complete your very first Tamil lesson',
        'description_tamil': 'உங்கள் முதல் தமிழ் பாடத்தை வெற்றிகரமாக முடித்துள்ளீர்கள்',
        'icon': 'school',
        'category': 'learning',
        'rarity': 'common',
        'xp_reward': 50,
        'is_unlocked': true,
        'unlocked_at': '2026-09-23T20:30:00Z',
        'progress': 1,
        'progress_target': 1,
      };

      final badge = BadgeModel.fromJson(json);
      expect(badge.id, 'TAMIL_BEGINNINGS');
      expect(badge.name, 'Tamil Beginnings');
      expect(badge.nameTamil, 'தமிழ் தொடக்கம்');
      expect(badge.category, 'learning');
      expect(badge.rarity, BadgeRarity.common);
      expect(badge.xpReward, 50);
      expect(badge.isUnlocked, isTrue);
      expect(badge.progressRatio, 1.0);
    });

    test('BadgeModel progressRatio is correctly calculated and clamped', () {
      const badge = BadgeModel(
        id: 'WORD_COLLECTOR',
        key: 'WORD_COLLECTOR',
        name: 'Word Collector',
        nameTamil: 'சொல் சேகரிப்பாளர்',
        description: 'Collect 100 words',
        descriptionTamil: '100 சொற்களைச் சேகரியுங்கள்',
        icon: 'menu_book',
        category: 'learning',
        rarity: BadgeRarity.rare,
        xpReward: 150,
        progress: 45,
        progressTarget: 100,
      );

      expect(badge.progressRatio, 0.45);
      expect(badge.isUnlocked, isFalse);

      final unlocked = badge.copyWith(
        isUnlocked: true,
        progress: 100,
      );
      expect(unlocked.progressRatio, 1.0);
      expect(unlocked.isUnlocked, isTrue);
    });

    test('BadgeRarity returns appropriate colors and Tamil display names', () {
      expect(BadgeRarity.common.displayNameTa, 'சாதாரண');
      expect(BadgeRarity.uncommon.displayNameTa, 'சிறப்பு');
      expect(BadgeRarity.rare.displayNameTa, 'அரிதான');
      expect(BadgeRarity.epic.displayNameTa, 'உயரிய');
      expect(BadgeRarity.legendary.displayNameTa, 'வரலாற்றுப் பெருமை');

      expect(BadgeRarity.fromString('legendary'), BadgeRarity.legendary);
      expect(BadgeRarity.fromString('epic'), BadgeRarity.epic);
      expect(BadgeRarity.fromString('unknown'), BadgeRarity.common);
    });

    test('BadgeIconMapper maps keys accurately to Material Icons', () {
      expect(BadgeIconMapper.getIcon('school'), Icons.school_rounded);
      expect(BadgeIconMapper.getIcon('local_fire_department'), Icons.local_fire_department_rounded);
      expect(BadgeIconMapper.getIcon('grid_on'), Icons.grid_on_rounded);
      expect(BadgeIconMapper.getIcon('museum'), Icons.museum_rounded);
      expect(BadgeIconMapper.getIcon('star'), Icons.star_rounded);
    });

    test('FriendModel parses badgesCount and badgesPreview correctly', () {
      final json = {
        'id': 101,
        'name': 'Arjun',
        'xp': 1500,
        'level': 8,
        'streak': 12,
        'best_streak': 15,
        'likes_count': 42,
        'has_liked': true,
        'achievements_count': 5,
        'badges_count': 6,
        'badges_preview': ['school', 'local_fire_department', 'grid_on'],
        'recent_activity': 'Completed today\'s quiz',
      };

      final friend = FriendModel.fromJson(json);
      expect(friend.badgesCount, 6);
      expect(friend.badgesPreview, ['school', 'local_fire_department', 'grid_on']);
      expect(friend.hasLiked, isTrue);
    });

    test('UserProfileModel parses badges list and count correctly', () {
      final json = {
        'id': 102,
        'name': 'Meena',
        'xp': 2400,
        'level': 9,
        'streak': 14,
        'best_streak': 20,
        'likes_count': 18,
        'has_liked': false,
        'friend_status': 'FRIENDS',
        'badges_count': 1,
        'badges': [
          {
            'id': 'KURAL_SCHOLAR',
            'key': 'KURAL_SCHOLAR',
            'name': 'Kural Scholar',
            'name_tamil': 'குறள் அறிஞர்',
            'icon': 'menu_book',
            'category': 'kural',
            'rarity': 'rare',
            'xp_reward': 250,
          }
        ],
        'achievements': [],
        'recent_activities': [],
      };

      final profile = UserProfileModel.fromJson(json);
      expect(profile.badgesCount, 1);
      expect(profile.badges.length, 1);
      expect(profile.badges.first['name_tamil'], 'குறள் அறிஞர்');
    });
  });

  group('Badge UI Widgets Test', () {
    testWidgets('BadgeUnlockDialog displays Tamil name, English subtitle, XP chip and mascot', (tester) async {
      const testBadge = BadgeModel(
        id: 'KURAL_SCHOLAR',
        key: 'KURAL_SCHOLAR',
        name: 'Kural Scholar',
        nameTamil: 'குறள் அறிஞர்',
        description: 'Master 50 Thirukkural couplets',
        descriptionTamil: '50 திருக்குறள்களின் செம்பொருளை உணர்ந்து பயின்றுள்ளீர்கள்',
        icon: 'menu_book',
        category: 'kural',
        rarity: BadgeRarity.rare,
        xpReward: 250,
        isUnlocked: true,
      );

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: Scaffold(
              body: BadgeUnlockDialog(badge: testBadge),
            ),
          ),
        ),
      );

      expect(find.text('குறள் அறிஞர்'), findsOneWidget);
      expect(find.text('Kural Scholar'), findsOneWidget);
      expect(find.text('+250 XP EARNED'), findsOneWidget);
      expect(find.text('தொடர்க · Continue'), findsOneWidget);
    });
  });
}
