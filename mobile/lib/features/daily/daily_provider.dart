import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/network/api_exception.dart';
import '../../core/providers.dart';
import '../../data/models/daily_mission_model.dart';
import '../auth/auth_provider.dart';

final dailyDashboardFutureProvider = FutureProvider<DailyDashboardModel>((ref) async {
  final authState = ref.watch(authNotifierProvider);
  if (!authState.isAuthenticated) {
    throw ApiException(
      message: 'உள்நுழையவும் · Please sign in to view and track your daily quests.',
      statusCode: 401,
    );
  }
  final repo = ref.watch(dailyRepositoryProvider);
  return await repo.getDailyDashboard();
});
