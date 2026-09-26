import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';
import '../../core/storage/secure_storage_service.dart';
import '../models/user_model.dart';

class AuthRepository {
  final DioClient _dioClient;
  final SecureStorageService _storageService;

  AuthRepository(this._dioClient, this._storageService);

  Future<UserModel?> restoreSession() async {
    final hasToken = await _storageService.hasToken();
    if (!hasToken) return null;

    try {
      final data = await _dioClient.get(ApiConstants.me);
      final user = UserModel.fromJson(data as Map<String, dynamic>);
      await _storageService.saveUserInfo(id: user.id, name: user.name);
      return user;
    } catch (e) {
      // Token expired or invalid
      await _storageService.deleteToken();
      return null;
    }
  }

  Future<UserModel> login({required String email, required String password}) async {
    final response = await _dioClient.post(
      ApiConstants.login,
      data: {'email': email.trim(), 'password': password},
    );
    final authRes = AuthResponse.fromJson(response as Map<String, dynamic>);
    await _storageService.saveToken(authRes.token);
    await _storageService.saveUserInfo(id: authRes.user.id, name: authRes.user.name);
    return authRes.user;
  }

  Future<UserModel> register({
    required String name,
    required String email,
    required String password,
  }) async {
    final response = await _dioClient.post(
      ApiConstants.register,
      data: {
        'name': name.trim(),
        'email': email.trim(),
        'password': password,
      },
    );
    final authRes = AuthResponse.fromJson(response as Map<String, dynamic>);
    await _storageService.saveToken(authRes.token);
    await _storageService.saveUserInfo(id: authRes.user.id, name: authRes.user.name);
    return authRes.user;
  }

  Future<UserModel> getMe() async {
    final data = await _dioClient.get(ApiConstants.me);
    return UserModel.fromJson(data as Map<String, dynamic>);
  }

  Future<void> logout() async {
    await _storageService.clearAll();
  }
}
