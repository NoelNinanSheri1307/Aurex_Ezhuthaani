import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../models/cultural_item_model.dart';
import '../models/note_model.dart';

class ContentRepository {
  final DioClient _dioClient;

  ContentRepository(this._dioClient);

  // Culture
  Future<List<CulturalItemModel>> getCultureItems({String? category, String? q}) async {
    final query = <String, dynamic>{};
    if (category != null && category != 'All') query['category'] = category;
    if (q != null && q.isNotEmpty) query['q'] = q;

    final data = await _dioClient.get(ApiConstants.culture, queryParameters: query);
    final list = data as List<dynamic>? ?? [];
    return list.map((i) => CulturalItemModel.fromJson(i as Map<String, dynamic>)).toList();
  }

  Future<CulturalItemModel> getCultureDetail(String slug) async {
    final data = await _dioClient.get(ApiConstants.cultureDetail(slug));
    return CulturalItemModel.fromJson(data as Map<String, dynamic>);
  }

  // History
  Future<List<CulturalItemModel>> getHistoryItems({String? era, String? q}) async {
    final query = <String, dynamic>{};
    if (era != null && era != 'All') query['era'] = era;
    if (q != null && q.isNotEmpty) query['q'] = q;

    final data = await _dioClient.get(ApiConstants.history, queryParameters: query);
    final list = data as List<dynamic>? ?? [];
    return list.map((i) => CulturalItemModel.fromJson(i as Map<String, dynamic>)).toList();
  }

  Future<CulturalItemModel> getHistoryDetail(String slug) async {
    final data = await _dioClient.get(ApiConstants.historyDetail(slug));
    return CulturalItemModel.fromJson(data as Map<String, dynamic>);
  }

  // Literature
  Future<List<CulturalItemModel>> getLiteratureItems({String? category, String? q}) async {
    final query = <String, dynamic>{};
    if (category != null && category != 'All') query['category'] = category;
    if (q != null && q.isNotEmpty) query['q'] = q;

    final data = await _dioClient.get(ApiConstants.literature, queryParameters: query);
    final list = data as List<dynamic>? ?? [];
    return list.map((i) => CulturalItemModel.fromJson(i as Map<String, dynamic>)).toList();
  }

  Future<CulturalItemModel> getLiteratureDetail(String slug) async {
    final data = await _dioClient.get(ApiConstants.literatureDetail(slug));
    return CulturalItemModel.fromJson(data as Map<String, dynamic>);
  }

  // Inscriptions
  Future<List<CulturalItemModel>> getInscriptions({String? period, String? q}) async {
    final query = <String, dynamic>{};
    if (period != null && period != 'All') query['period'] = period;
    if (q != null && q.isNotEmpty) query['q'] = q;

    final data = await _dioClient.get(ApiConstants.inscriptions, queryParameters: query);
    final list = data as List<dynamic>? ?? [];
    return list.map((i) => CulturalItemModel.fromJson(i as Map<String, dynamic>)).toList();
  }

  Future<CulturalItemModel> getInscriptionDetail(String slug) async {
    final data = await _dioClient.get(ApiConstants.inscriptionDetail(slug));
    return CulturalItemModel.fromJson(data as Map<String, dynamic>);
  }

  // Map locations
  Future<List<CulturalItemModel>> getMapLocations({String? contentType}) async {
    final query = <String, dynamic>{};
    if (contentType != null && contentType != 'All') query['content_type'] = contentType;

    final data = await _dioClient.get(ApiConstants.mapLocations, queryParameters: query);
    final list = data as List<dynamic>? ?? [];
    return list.map((i) => CulturalItemModel.fromJson(i as Map<String, dynamic>)).toList();
  }

  // Bookmarking & Saved Items
  Future<List<Map<String, dynamic>>> getSavedItems(String endpoint) async {
    final data = await _dioClient.get(endpoint);
    final list = data as List<dynamic>? ?? [];
    return list.map((e) => e as Map<String, dynamic>).toList();
  }

  Future<void> saveItem(String endpoint, Map<String, dynamic> body) async {
    await _dioClient.post(endpoint, data: body);
  }

  Future<void> unsaveItem(String deleteUrl) async {
    await _dioClient.delete(deleteUrl);
  }

  // Notes
  Future<List<NoteModel>> getNotes() async {
    final data = await _dioClient.get(ApiConstants.notes);
    final list = data as List<dynamic>? ?? [];
    return list.map((n) => NoteModel.fromJson(n as Map<String, dynamic>)).toList();
  }

  Future<NoteModel> createNote(NoteModel note) async {
    final data = await _dioClient.post(ApiConstants.notes, data: note.toJson());
    return NoteModel.fromJson(data as Map<String, dynamic>);
  }

  Future<void> deleteNote(int noteId) async {
    await _dioClient.delete(ApiConstants.noteDetail(noteId));
  }
}
