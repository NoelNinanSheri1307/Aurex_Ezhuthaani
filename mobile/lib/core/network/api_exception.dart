import 'package:dio/dio.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final dynamic rawData;

  ApiException({
    required this.message,
    this.statusCode,
    this.rawData,
  });

  factory ApiException.fromDioError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return ApiException(
          message: 'Connection timed out. Please check your backend server.',
          statusCode: error.response?.statusCode,
        );
      case DioExceptionType.connectionError:
        return ApiException(
          message: 'Cannot reach backend at ${error.requestOptions.uri.origin}. Ensure server is running.',
          statusCode: error.response?.statusCode,
        );
      case DioExceptionType.badResponse:
        final response = error.response;
        final data = response?.data;
        final code = response?.statusCode;

        if (code == 401) {
          return ApiException(
            message: 'உள்நுழையவும் · Please sign in to access daily quests.',
            statusCode: 401,
            rawData: data,
          );
        }

        if (data is Map<String, dynamic> && data.containsKey('detail')) {
          final detail = data['detail'];
          if (detail is String) {
            return ApiException(message: detail, statusCode: code, rawData: data);
          } else if (detail is List && detail.isNotEmpty) {
            // Pydantic validation error array
            final firstErr = detail.first;
            if (firstErr is Map && firstErr.containsKey('msg')) {
              return ApiException(
                message: firstErr['msg'].toString(),
                statusCode: code,
                rawData: data,
              );
            }
          }
        }
        if (code == 403) {
          return ApiException(message: 'Access restricted or stage locked.', statusCode: 403);
        } else if (code == 404) {
          return ApiException(message: 'Requested item not found.', statusCode: 404);
        } else if (code == 503) {
          return ApiException(message: 'Service temporarily unavailable.', statusCode: 503);
        }
        return ApiException(
          message: 'Server returned error ($code).',
          statusCode: code,
          rawData: data,
        );
      case DioExceptionType.cancel:
        return ApiException(message: 'Request was cancelled.');
      default:
        return ApiException(
          message: error.message ?? 'An unexpected network error occurred.',
        );
    }
  }

  @override
  String toString() => message;
}
