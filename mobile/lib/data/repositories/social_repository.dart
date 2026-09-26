import '../../core/network/dio_client.dart';
import '../models/social_model.dart';

class SocialRepository {
  final DioClient _client;

  SocialRepository(this._client);

  Future<List<FriendModel>> getFriends() async {
    final res = await _client.get('/api/friends');
    final list = res as List<dynamic>? ?? [];
    return list.map((f) => FriendModel.fromJson(f as Map<String, dynamic>)).toList();
  }

  Future<FriendRequestsContainerModel> getFriendRequests() async {
    final res = await _client.get('/api/friends/requests');
    return FriendRequestsContainerModel.fromJson(res as Map<String, dynamic>);
  }

  Future<Map<String, dynamic>> sendFriendRequest(int targetUserId) async {
    final res = await _client.post('/api/friends/request/$targetUserId');
    return res as Map<String, dynamic>;
  }

  Future<void> acceptFriendRequest(int requestId) async {
    await _client.post('/api/friends/request/$requestId/accept');
  }

  Future<void> rejectFriendRequest(int requestId) async {
    await _client.post('/api/friends/request/$requestId/reject');
  }

  Future<void> removeFriend(int targetUserId) async {
    await _client.delete('/api/friends/$targetUserId');
  }

  Future<List<UserSearchResultModel>> searchUsers(String query) async {
    final res = await _client.get(
      '/api/users/search',
      queryParameters: {'q': query},
    );
    final list = res as List<dynamic>? ?? [];
    return list.map((u) => UserSearchResultModel.fromJson(u as Map<String, dynamic>)).toList();
  }

  Future<UserProfileModel> getUserProfile(int userId) async {
    final res = await _client.get('/api/users/$userId/profile');
    return UserProfileModel.fromJson(res as Map<String, dynamic>);
  }

  Future<int> likeUserProfile(int targetUserId) async {
    final res = await _client.post('/api/users/$targetUserId/like');
    return (res as Map<String, dynamic>)['likes_count'] as int? ?? 0;
  }

  Future<int> likeProfile(int targetUserId) => likeUserProfile(targetUserId);

  Future<int> unlikeUserProfile(int targetUserId) async {
    final res = await _client.delete('/api/users/$targetUserId/like');
    return (res as Map<String, dynamic>)['likes_count'] as int? ?? 0;
  }

  Future<int> unlikeProfile(int targetUserId) => unlikeUserProfile(targetUserId);

  Future<List<SocialActivityModel>> getSocialFeed() async {
    final res = await _client.get('/api/social/feed');
    final list = res as List<dynamic>? ?? [];
    return list.map((s) => SocialActivityModel.fromJson(s as Map<String, dynamic>)).toList();
  }

  Future<List<InAppNotificationModel>> getNotifications() async {
    final res = await _client.get('/api/notifications');
    final list = res as List<dynamic>? ?? [];
    return list.map((n) => InAppNotificationModel.fromJson(n as Map<String, dynamic>)).toList();
  }

  Future<void> markNotificationsRead({List<int>? ids}) async {
    await _client.post(
      '/api/notifications/mark-read',
      data: {'notification_ids': ids ?? []},
    );
  }

  Future<List<Map<String, dynamic>>> getFriendsLeaderboard() async {
    final res = await _client.get(
      '/api/leaderboard',
      queryParameters: {'type': 'friends'},
    );
    final list = res as List<dynamic>? ?? [];
    return list.map((i) => i as Map<String, dynamic>).toList();
  }
}
