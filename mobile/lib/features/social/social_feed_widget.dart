import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../data/models/social_model.dart';

class SocialFeedWidget extends ConsumerWidget {
  final int maxItems;

  const SocialFeedWidget({super.key, this.maxItems = 6});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final feedAsync = ref.watch(socialFeedProvider);

    return feedAsync.when(
      loading: () => const Center(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: CircularProgressIndicator(color: AppColors.emerald),
        ),
      ),
      error: (err, stack) => const SizedBox.shrink(),
      data: (activities) {
        if (activities.isEmpty) {
          return const SizedBox.shrink();
        }

        final displayed = activities.take(maxItems).toList();

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Text(
                        '👥 நண்பர்களின் சாதனைகள்',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                  TextButton(
                    onPressed: () => context.push('/friends'),
                    child: const Text(
                      'அனைத்தும்',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.emeraldLight,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: displayed.length,
              separatorBuilder: (ctx, i) => const SizedBox(height: 8),
              itemBuilder: (ctx, index) {
                final act = displayed[index];
                return _buildFeedItem(context, act);
              },
            ),
          ],
        );
      },
    );
  }

  Widget _buildFeedItem(BuildContext context, SocialActivityModel act) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => context.push('/user/${act.userId}'),
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
          decoration: BoxDecoration(
            color: AppColors.surfaceElevated,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.border.withValues(alpha: 0.6)),
          ),
          child: Row(
            children: [
              // User avatar
              CircleAvatar(
                radius: 18,
                backgroundColor: AppColors.emerald,
                child: Text(
                  act.userName.isNotEmpty ? act.userName[0].toUpperCase() : '?',
                  style: const TextStyle(
                    fontSize: 14,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(width: 12),

              // Activity Details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: act.userName,
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          TextSpan(
                            text: ' • Lv ${act.userLevel}',
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: AppColors.amberLight,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      act.titleTa.isNotEmpty ? act.titleTa : act.title,
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),

              // Activity Icon
              Container(
                width: 34,
                height: 34,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.surface,
                ),
                alignment: Alignment.center,
                child: Text(
                  _activityIcon(act.activityType),
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _activityIcon(String type) {
    switch (type) {
      case 'BADGE_UNLOCKED':
        return '🏅';
      case 'ACHIEVEMENT':
        return '🏆';
      case 'LEVEL_UP':
        return '👑';
      case 'STREAK':
        return '🔥';
      case 'CROSSWORD':
        return '🧩';
      case 'QUIZ':
        return '🎯';
      default:
        return '📖';
    }
  }
}
