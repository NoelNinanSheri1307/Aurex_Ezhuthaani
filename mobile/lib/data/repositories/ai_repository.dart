import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../models/ai_chat_model.dart';

class AIRepository {
  final DioClient _dioClient;

  AIRepository(this._dioClient);

  Future<List<AIConversationModel>> getConversations() async {
    final data = await _dioClient.get(ApiConstants.aiConversations);
    final list = data as List<dynamic>? ?? [];
    return list.map((c) => AIConversationModel.fromJson(c as Map<String, dynamic>)).toList();
  }

  Future<AIConversationModel> createConversation() async {
    final data = await _dioClient.post(ApiConstants.aiConversations);
    return AIConversationModel.fromJson(data as Map<String, dynamic>);
  }

  Future<void> deleteConversation(int convId) async {
    await _dioClient.delete(ApiConstants.aiConversationDetail(convId));
  }

  Future<List<AIMessageModel>> getMessages(int convId) async {
    final data = await _dioClient.get(ApiConstants.aiMessages(convId));
    final list = data as List<dynamic>? ?? [];
    return list.map((m) => AIMessageModel.fromJson(m as Map<String, dynamic>)).toList();
  }

  Future<AIChatReplyResponse> sendMessage({
    required int convId,
    required String content,
  }) async {
    final data = await _dioClient.post(
      ApiConstants.aiMessages(convId),
      data: {'content': content.trim()},
    );
    return AIChatReplyResponse.fromJson(data as Map<String, dynamic>);
  }
}
