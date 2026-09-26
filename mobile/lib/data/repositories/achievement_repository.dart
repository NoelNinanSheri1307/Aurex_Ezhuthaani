import '../../core/network/dio_client.dart';
import '../models/achievement_model.dart';

class AchievementRepository {
  final DioClient _client;

  AchievementRepository(this._client);

  Future<List<AchievementModel>> getAchievements() async {
    final res = await _client.get('/api/achievements');
    final list = res as List<dynamic>? ?? [];
    return list.map((a) => AchievementModel.fromJson(a as Map<String, dynamic>)).toList();
  }
}
