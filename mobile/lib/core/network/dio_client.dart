import 'package:dio/dio.dart';
import '../config/api_constants.dart';
import '../storage/secure_storage_service.dart';
import 'api_exception.dart';
import 'auth_interceptor.dart';

class DioClient {
  late final Dio dio;
  final SecureStorageService storageService;

  DioClient({required this.storageService, void Function()? onUnauthorized}) {
    dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.baseUrl,
        connectTimeout: const Duration(seconds: 15),
        receiveTimeout: const Duration(seconds: 35),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onError: (DioException error, ErrorInterceptorHandler handler) async {
          if (error.type == DioExceptionType.connectionError ||
              error.type == DioExceptionType.connectionTimeout) {
            for (final fallback in ApiConstants.fallbackUrls) {
              if (fallback != dio.options.baseUrl) {
                try {
                  final retryOptions = Options(
                    method: error.requestOptions.method,
                    headers: error.requestOptions.headers,
                    responseType: error.requestOptions.responseType,
                    contentType: error.requestOptions.contentType,
                  );
                  final fallbackDio = Dio(
                    BaseOptions(
                      baseUrl: fallback,
                      connectTimeout: const Duration(seconds: 6),
                      receiveTimeout: const Duration(seconds: 15),
                      headers: dio.options.headers,
                    ),
                  );
                  final response = await fallbackDio.request(
                    error.requestOptions.path,
                    data: error.requestOptions.data,
                    queryParameters: error.requestOptions.queryParameters,
                    options: retryOptions,
                  );
                  // Connection successful on fallback! Persist for subsequent requests
                  ApiConstants.customBaseUrl = fallback;
                  dio.options.baseUrl = fallback;
                  return handler.resolve(response);
                } catch (_) {
                  // Try next fallback candidate
                }
              }
            }
          }
          return handler.next(error);
        },
      ),
    );

    dio.interceptors.add(
      AuthInterceptor(storageService, onUnauthorized: onUnauthorized),
    );
  }

  Future<dynamic> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await dio.get(
        path,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<dynamic> post(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<dynamic> put(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<dynamic> delete(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await dio.delete(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }
}
