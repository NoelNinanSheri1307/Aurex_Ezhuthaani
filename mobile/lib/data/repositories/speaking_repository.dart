import 'package:flutter/foundation.dart';
import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../models/speaking_scenario_model.dart';

class SpeakingRepository {
  final DioClient _dioClient;

  SpeakingRepository(this._dioClient);

  Future<List<SpeakingScenarioModel>> getScenarios({
    String? category,
    String? difficulty,
  }) async {
    final queryParams = <String, dynamic>{};
    if (category != null && category.isNotEmpty) {
      queryParams['category'] = category;
    }
    if (difficulty != null && difficulty.isNotEmpty) {
      queryParams['difficulty'] = difficulty;
    }

    final response = await _dioClient.dio.get(
      ApiConstants.speakingScenarios,
      queryParameters: queryParams,
    );

    final data = response.data as Map<String, dynamic>;
    final list = (data['scenarios'] as List<dynamic>?) ?? [];
    return list
        .map((e) => SpeakingScenarioModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<SpeakingScenarioModel> getScenarioDetail(String idOrKey) async {
    final response = await _dioClient.dio.get(
      ApiConstants.speakingScenarioDetail(idOrKey),
    );
    return SpeakingScenarioModel.fromJson(response.data as Map<String, dynamic>);
  }

  Future<Map<String, dynamic>> startSession(
    String idOrKey, {
    String difficulty = 'beginner',
    String mode = 'structured',
  }) async {
    final response = await _dioClient.dio.post(
      ApiConstants.speakingStart(idOrKey),
      data: {
        'difficulty': difficulty,
        'mode': mode,
      },
    );
    return response.data as Map<String, dynamic>;
  }

  Future<TurnResponseModel> submitTurn(
    String idOrKey, {
    required int sessionId,
    required String userInput,
    String inputMode = 'voice',
    int? stage,
  }) async {
    final endpoint = ApiConstants.speakingTurn(idOrKey);
    final baseUrl = _dioClient.dio.options.baseUrl;
    debugPrint('[API]\nPOST $endpoint\nserver=$baseUrl');
    debugPrint(
      '[REAL_TURN_REQUEST]\n'
      'scenario=$idOrKey\n'
      'session_id=$sessionId\n'
      'stage=${stage ?? 1}\n'
      'user_input=$userInput',
    );

    final response = await _dioClient.dio.post(
      endpoint,
      data: {
        'session_id': sessionId,
        'user_input': userInput,
        'input_mode': inputMode,
      },
    );

    final turnModel = TurnResponseModel.fromJson(response.data as Map<String, dynamic>);
    debugPrint(
      '[REAL_TURN_RESPONSE]\n'
      'character_reply=${turnModel.characterReply.tamil}\n'
      'advance_stage=${turnModel.advanceStage}\n'
      'stage_complete=${turnModel.stageComplete}\n'
      'detected_intent=${turnModel.detectedIntent}\n'
      'provider=${turnModel.provider}',
    );

    return turnModel;
  }

  Future<Map<String, dynamic>> getHint(
    String idOrKey, {
    required int sessionId,
    int level = 1,
  }) async {
    final response = await _dioClient.dio.post(
      ApiConstants.speakingHint(idOrKey),
      data: {
        'session_id': sessionId,
        'level': level,
      },
    );
    return response.data as Map<String, dynamic>;
  }

  Future<SpeakingCompletionResult> completeSession(
    String idOrKey, {
    required int sessionId,
    String? feedback,
  }) async {
    final response = await _dioClient.dio.post(
      ApiConstants.speakingComplete(idOrKey),
      data: {
        'session_id': sessionId,
        if (feedback != null && feedback.isNotEmpty) 'feedback': feedback,
      },
    );
    return SpeakingCompletionResult.fromJson(response.data as Map<String, dynamic>);
  }

  Future<List<QuickPracticeModel>> getQuickPracticeChallenges() async {
    final response = await _dioClient.dio.get(ApiConstants.speakingQuickPractice);
    final data = response.data as Map<String, dynamic>;
    final list = (data['challenges'] as List<dynamic>?) ?? [];
    return list
        .map((e) => QuickPracticeModel.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<QuickPracticeSubmitResult> submitQuickPractice({
    required String challengeId,
    required String spokenText,
    int audioDurationMs = 0,
  }) async {
    final response = await _dioClient.dio.post(
      ApiConstants.speakingQuickPracticeSubmit,
      data: {
        'challenge_id': challengeId,
        'spoken_text': spokenText,
        'audio_duration_ms': audioDurationMs,
      },
    );
    return QuickPracticeSubmitResult.fromJson(response.data as Map<String, dynamic>);
  }

  Future<SpeakingStatsModel> getSpeakingStats() async {
    final response = await _dioClient.dio.get(ApiConstants.speakingStats);
    return SpeakingStatsModel.fromJson(response.data as Map<String, dynamic>);
  }
}
