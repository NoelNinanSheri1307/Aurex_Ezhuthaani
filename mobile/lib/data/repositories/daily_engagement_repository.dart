import '../../core/network/dio_client.dart';
import '../models/crossword_model.dart';
import '../models/daily_quiz_model.dart';

class DailyEngagementRepository {
  final DioClient _client;

  DailyEngagementRepository(this._client);

  Future<DailyQuizModel> getDailyQuizToday() async {
    final res = await _client.get('/api/daily-quiz/today');
    return DailyQuizModel.fromJson(res as Map<String, dynamic>);
  }

  Future<DailyQuizSubmitResultModel> submitDailyQuiz(List<int> answers) async {
    final res = await _client.post(
      '/api/daily-quiz/submit',
      data: {'answers': answers},
    );
    return DailyQuizSubmitResultModel.fromJson(res as Map<String, dynamic>);
  }

  Future<CrosswordPuzzleModel> getDailyCrosswordToday() async {
    final res = await _client.get('/api/crossword/today');
    return CrosswordPuzzleModel.fromJson(res as Map<String, dynamic>);
  }

  Future<CrosswordSubmitResultModel> submitCrossword(Map<String, String> answers, int timeSeconds) async {
    final res = await _client.post(
      '/api/crossword/submit',
      data: {
        'answers': answers,
        'time_seconds': timeSeconds,
      },
    );
    return CrosswordSubmitResultModel.fromJson(res as Map<String, dynamic>);
  }
}
