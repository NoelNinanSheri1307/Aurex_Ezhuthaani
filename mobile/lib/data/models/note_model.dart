class NoteModel {
  final int id;
  final String contentType;
  final String contentId;
  final String? title;
  final String body;
  final String? createdAt;
  final String? updatedAt;

  const NoteModel({
    required this.id,
    required this.contentType,
    required this.contentId,
    this.title,
    required this.body,
    this.createdAt,
    this.updatedAt,
  });

  factory NoteModel.fromJson(Map<String, dynamic> json) {
    return NoteModel(
      id: json['id'] as int? ?? 0,
      contentType: json['content_type'] as String? ?? 'dictionary',
      contentId: json['content_id'] as String? ?? '',
      title: json['title'] as String?,
      body: json['body'] as String? ?? '',
      createdAt: json['created_at'] as String?,
      updatedAt: json['updated_at'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'content_type': contentType,
      'content_id': contentId,
      'title': title,
      'body': body,
    };
  }
}
