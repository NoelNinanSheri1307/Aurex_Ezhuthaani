import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../models/daily_mission_model.dart';

class DailyRepository {
  final DioClient _dioClient;

  DailyRepository(this._dioClient);

  Future<DailyDashboardModel> getDailyDashboard() async {
    final data = await _dioClient.get(ApiConstants.daily);
    return DailyDashboardModel.fromJson(data as Map<String, dynamic>);
  }

  Future<DailyDashboardModel> updateProgress({
    required String missionType,
    int increment = 1,
  }) async {
    final data = await _dioClient.post(
      ApiConstants.dailyProgress,
      data: {'mission_type': missionType, 'increment': increment},
    );
    return DailyDashboardModel.fromJson(data as Map<String, dynamic>);
  }

  Future<List<Map<String, dynamic>>> getLeaderboard({String type = 'global'}) async {
    final data = await _dioClient.get(
      ApiConstants.leaderboard,
      queryParameters: {'type': type},
    );
    final rawList = data as List<dynamic>? ?? [];
    return rawList.map((e) => e as Map<String, dynamic>).toList();
  }
}
