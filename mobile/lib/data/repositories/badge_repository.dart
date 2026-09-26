import '../../core/network/dio_client.dart';
import '../models/badge_model.dart';

class BadgeRepository {
  final DioClient _client;

  BadgeRepository(this._client);

  /// Fetch catalogue of all active badges
  Future<List<BadgeModel>> getAllBadges() async {
    final res = await _client.get('/api/v1/badges');
    final list = res as List<dynamic>? ?? [];
    return list.map((b) => BadgeModel.fromJson(b as Map<String, dynamic>)).toList();
  }

  /// Fetch current user's badges with unlock state and progress
  Future<List<BadgeModel>> getMyBadges() async {
    final res = await _client.get('/api/v1/users/me/badges');
    final list = res as List<dynamic>? ?? [];
    return list.map((b) => BadgeModel.fromJson(b as Map<String, dynamic>)).toList();
  }

  /// Fetch current user's badge progress summary
  Future<BadgeProgressSummary> getBadgeProgress() async {
    final res = await _client.get('/api/v1/users/me/badges/progress');
    return BadgeProgressSummary.fromJson(res as Map<String, dynamic>? ?? {});
  }

  /// Fetch public unlocked badges for a specific user
  Future<List<BadgeModel>> getUserBadges(int userId) async {
    final res = await _client.get('/api/v1/users/$userId/badges');
    final list = res as List<dynamic>? ?? [];
    return list.map((b) => BadgeModel.fromJson(b as Map<String, dynamic>)).toList();
  }
}
