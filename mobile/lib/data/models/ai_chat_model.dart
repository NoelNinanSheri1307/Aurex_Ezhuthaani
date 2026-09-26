class AIConversationModel {
  final int id;
  final String title;
  final String createdAt;
  final String updatedAt;

  const AIConversationModel({
    required this.id,
    required this.title,
    required this.createdAt,
    required this.updatedAt,
  });

  factory AIConversationModel.fromJson(Map<String, dynamic> json) {
    return AIConversationModel(
      id: json['id'] as int? ?? 0,
      title: json['title'] as String? ?? 'Tamil Chat',
      createdAt: json['created_at'] as String? ?? '',
      updatedAt: json['updated_at'] as String? ?? '',
    );
  }
}

class AIMessageModel {
  final int id;
  final String role; // "user" or "assistant"
  final String content;
  final String createdAt;

  const AIMessageModel({
    required this.id,
    required this.role,
    required this.content,
    required this.createdAt,
  });

  factory AIMessageModel.fromJson(Map<String, dynamic> json) {
    return AIMessageModel(
      id: json['id'] as int? ?? 0,
      role: json['role'] as String? ?? 'user',
      content: json['content'] as String? ?? '',
      createdAt: json['created_at'] as String? ?? '',
    );
  }
}

class AIChatReplyResponse {
  final AIMessageModel userMessage;
  final AIMessageModel assistantMessage;

  const AIChatReplyResponse({
    required this.userMessage,
    required this.assistantMessage,
  });

  factory AIChatReplyResponse.fromJson(Map<String, dynamic> json) {
    return AIChatReplyResponse(
      userMessage: AIMessageModel.fromJson(json['user_message'] as Map<String, dynamic>? ?? {}),
      assistantMessage: AIMessageModel.fromJson(json['assistant_message'] as Map<String, dynamic>? ?? {}),
    );
  }
}
