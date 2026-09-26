import 'package:dio/dio.dart';
import '../storage/secure_storage_service.dart';

class AuthInterceptor extends Interceptor {
  final SecureStorageService _storageService;
  final void Function()? onUnauthorized;

  AuthInterceptor(this._storageService, {this.onUnauthorized});

  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final rawToken = await _storageService.getToken();
    final cleanToken = rawToken?.trim().replaceAll('"', '').replaceAll("'", '');
    if (cleanToken != null &&
        cleanToken.isNotEmpty &&
        cleanToken != 'null' &&
        cleanToken != 'undefined') {
      options.headers['Authorization'] = 'Bearer $cleanToken';
    } else {
      options.headers.remove('Authorization');
    }
    options.headers['Content-Type'] = 'application/json';
    options.headers['Accept'] = 'application/json';
    return handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      // Invalidate token locally on 401 Unauthorized
      _storageService.deleteToken();
      onUnauthorized?.call();
    }
    return handler.next(err);
  }
}
