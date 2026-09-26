import 'dart:convert';
import 'package:flutter/services.dart';
import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../models/curriculum_model.dart';

class CurriculumRepository {
  final DioClient _dioClient;
  CurriculumModel? _cachedCurriculum;

  CurriculumRepository(this._dioClient);

  Future<CurriculumModel> getCurriculum() async {
    if (_cachedCurriculum != null) return _cachedCurriculum!;

    // 1. Try remote API
    try {
      final data = await _dioClient.get(ApiConstants.curriculum);
      final model = CurriculumModel.fromJson(data as Map<String, dynamic>);
      _cachedCurriculum = model;
      return model;
    } catch (_) {
      // 2. Fall back to bundled offline curriculum JSON
      final raw = await rootBundle.loadString('assets/data/curriculum.json');
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final model = CurriculumModel.fromJson(data);
      _cachedCurriculum = model;
      return model;
    }
  }

  Future<Map<String, dynamic>> completeLesson({
    required String lessonId,
    int? score,
  }) async {
    final response = await _dioClient.post(
      ApiConstants.completeLesson(lessonId),
      data: {'score': score ?? 100},
    );
    return response as Map<String, dynamic>;
  }

  Future<QuizResultModel> submitQuiz({
    required String stageId,
    required List<int> answers,
  }) async {
    final response = await _dioClient.post(
      ApiConstants.submitQuiz(stageId),
      data: {'answers': answers},
    );
    return QuizResultModel.fromJson(response as Map<String, dynamic>);
  }
}
