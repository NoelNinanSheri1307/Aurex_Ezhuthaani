import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';
import 'package:record/record.dart';
import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';

enum SpeechRecognitionStatus {
  idle,
  listening,
  processing,
  error,
  unavailable,
  permissionDenied,
}

class SpeechRecognitionService {
  final DioClient? _dioClient;
  final AudioRecorder _audioRecorder = AudioRecorder();

  bool _isInitialized = false;
  bool _isAvailable = false;
  bool get isAvailable => _isAvailable;

  SpeechRecognitionStatus _status = SpeechRecognitionStatus.idle;
  SpeechRecognitionStatus get status => _status;

  final _statusController = StreamController<SpeechRecognitionStatus>.broadcast();
  Stream<SpeechRecognitionStatus> get onStatusChange => _statusController.stream;

  final _amplitudeController = StreamController<double>.broadcast();
  Stream<double> get onAmplitudeChange => _amplitudeController.stream;

  final _durationController = StreamController<int>.broadcast();
  Stream<int> get onDurationChange => _durationController.stream;

  final _partialResultController = StreamController<String>.broadcast();
  Stream<String> get onPartialResult => _partialResultController.stream;

  final _finalResultController = StreamController<String>.broadcast();
  Stream<String> get onFinalResult => _finalResultController.stream;

  StreamSubscription<Amplitude>? _amplitudeSub;
  Timer? _waveformTimer;
  Timer? _durationTimer;
  int _secondsElapsed = 0;
  final Random _random = Random();

  String _lastRecordedPath = '';
  String _recognizedTranscript = '';

  /// The transcript returned by the backend Google Cloud Speech-to-Text service.
  String get recognizedText => _recognizedTranscript;

  bool _userListening = false;
  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  bool get isListening => _userListening;

  SpeechRecognitionService([this._dioClient]);

  /// Used for test/mock compatibility
  void setRecognizedTranscript(String text) {
    _recognizedTranscript = text.trim();
  }

  /// Initializes the audio recorder and requests microphone permissions.
  Future<bool> initialize() async {
    if (_isInitialized) {
      debugPrint('[STT_DEBUG] Already initialized, available=$_isAvailable');
      return _isAvailable;
    }
    try {
      debugPrint('[STT_DEBUG] Initializing microphone audio recorder...');
      final hasPermission = await _audioRecorder.hasPermission();
      debugPrint('[STT_DEBUG] Microphone permission: $hasPermission');

      _isAvailable = hasPermission;
      _isInitialized = true;

      if (!hasPermission) {
        _status = SpeechRecognitionStatus.permissionDenied;
        _errorMessage = 'Microphone permission denied';
        _statusController.add(_status);
      } else {
        _status = SpeechRecognitionStatus.idle;
        _statusController.add(_status);
      }
      return _isAvailable;
    } catch (e) {
      debugPrint('[STT_DEBUG] Initialize FAILED: $e');
      _isAvailable = false;
      _isInitialized = true;
      _status = SpeechRecognitionStatus.error;
      _errorMessage = e.toString();
      _statusController.add(_status);
      return false;
    }
  }

  /// Starts microphone recording to standard WAV format for Google Cloud STT.
  Future<void> startListening({
    String? language,
    Function(String text)? onPartialResult,
  }) async {
    if (_userListening) return;

    _errorMessage = null;
    _recognizedTranscript = '';
    _lastRecordedPath = '';

    final available = await initialize();
    if (!available) {
      debugPrint('[STT_DEBUG] Cannot start: microphone permission not granted');
      return;
    }

    try {
      final tempDir = await getTemporaryDirectory();
      final filePath = '${tempDir.path}/speech_${DateTime.now().millisecondsSinceEpoch}.wav';
      _lastRecordedPath = filePath;

      debugPrint('[STT_DEBUG] Recording started -> $filePath');

      // Standard linear 16-bit PCM WAV at 16kHz mono — universally compatible with Google Cloud Speech-to-Text
      await _audioRecorder.start(
        const RecordConfig(
          encoder: AudioEncoder.wav,
          sampleRate: 16000,
          numChannels: 1,
          bitRate: 256000,
        ),
        path: filePath,
      );

      _userListening = true;
      _status = SpeechRecognitionStatus.listening;
      _statusController.add(_status);
      _secondsElapsed = 0;
      _durationController.add(0);

      // Duration timer (auto-stop after 15 seconds)
      _durationTimer?.cancel();
      _durationTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
        _secondsElapsed++;
        _durationController.add(_secondsElapsed);
        if (_secondsElapsed >= 15) {
          debugPrint('[STT_DEBUG] Auto-stopping after 15 seconds');
          stopListening();
        }
      });

      // Listen to hardware amplitude from recorder
      _amplitudeSub?.cancel();
      _amplitudeSub = _audioRecorder.onAmplitudeChanged(const Duration(milliseconds: 90)).listen((amp) {
        // amp.current is in dBFS (-160 to 0). Normalize to 0.0 - 1.0 for UI waveforms.
        final normalized = ((amp.current + 60.0) / 60.0).clamp(0.1, 1.0);
        _amplitudeController.add(normalized);
      }, onError: (_) {});

      // Supplementary waveform timer to ensure smooth visualizer pulsing
      _waveformTimer?.cancel();
      _waveformTimer = Timer.periodic(const Duration(milliseconds: 90), (timer) {
        if (_userListening) {
          final amp = 0.2 + (_random.nextDouble() * 0.7);
          _amplitudeController.add(amp);
        }
      });
    } catch (e) {
      debugPrint('[STT_DEBUG] Recording start FAILED: $e');
      _userListening = false;
      _status = SpeechRecognitionStatus.error;
      _errorMessage = e.toString();
      _statusController.add(_status);
    }
  }

  /// Stops audio recording, uploads the audio file to the backend Google Cloud STT endpoint,
  /// and returns the actual recognized Tamil transcript.
  Future<String> stopListening({String? recognizedText}) async {
    debugPrint('[STT_DEBUG] Recording stopped');
    _durationTimer?.cancel();
    _waveformTimer?.cancel();
    _amplitudeSub?.cancel();

    _userListening = false;
    _status = SpeechRecognitionStatus.processing;
    _statusController.add(_status);
    _amplitudeController.add(0.0);

    String? path;
    try {
      path = await _audioRecorder.stop();
    } catch (e) {
      debugPrint('[STT_DEBUG] Error stopping recorder: $e');
    }

    final finalPath = path ?? _lastRecordedPath;
    debugPrint('[STT_DEBUG] Audio file saved at: $finalPath');

    // Allow explicit override if provided (for test/mock compatibility)
    if (recognizedText != null && recognizedText.trim().isNotEmpty) {
      _recognizedTranscript = recognizedText.trim();
      _status = SpeechRecognitionStatus.idle;
      _statusController.add(_status);
      return _recognizedTranscript;
    }

    // Upload audio file to backend /api/speak/transcribe
    if (finalPath.isNotEmpty && File(finalPath).existsSync()) {
      final file = File(finalPath);
      final fileSize = file.lengthSync();
      debugPrint('[STT_DEBUG] Uploading audio ($fileSize bytes) to backend /api/speak/transcribe...');

      try {
        final dio = _dioClient?.dio ?? Dio(BaseOptions(baseUrl: ApiConstants.baseUrl));
        
        final formData = FormData.fromMap({
          'audio': await MultipartFile.fromFile(
            finalPath,
            filename: 'audio.wav',
          ),
        });

        final response = await dio.post(
          ApiConstants.speakingTranscribe,
          data: formData,
          options: Options(
            receiveTimeout: const Duration(seconds: 30),
            sendTimeout: const Duration(seconds: 30),
          ),
        );

        debugPrint('[STT_DEBUG] Google STT response received: ${response.statusCode}');

        if (response.statusCode == 200 && response.data is Map<String, dynamic>) {
          final data = response.data as Map<String, dynamic>;
          final transcript = (data['transcript'] as String? ?? '').trim();
          final confidence = (data['confidence'] as num?)?.toDouble() ?? 0.0;

          debugPrint('[STT_DEBUG] Transcript: "$transcript"');
          debugPrint('[STT_DEBUG] Confidence: $confidence');

          _recognizedTranscript = transcript;
          _partialResultController.add(transcript);
          _finalResultController.add(transcript);
        } else {
          debugPrint('[STT_DEBUG] Unexpected response: ${response.data}');
          _recognizedTranscript = '';
        }
      } catch (e) {
        debugPrint('[STT_DEBUG] Upload / Transcription FAILED: $e');
        _errorMessage = e.toString();
        _recognizedTranscript = '';
      } finally {
        // Clean up temporary audio file
        try {
          if (file.existsSync()) {
            file.deleteSync();
          }
        } catch (_) {}
      }
    } else {
      debugPrint('[STT_DEBUG] No audio file found to upload');
      _recognizedTranscript = '';
    }

    _status = SpeechRecognitionStatus.idle;
    _statusController.add(_status);

    return _recognizedTranscript;
  }

  /// Cancels recording and cleans up temporary audio file.
  Future<void> cancelListening() async {
    debugPrint('[STT_DEBUG] cancelListening() called');
    _durationTimer?.cancel();
    _waveformTimer?.cancel();
    _amplitudeSub?.cancel();

    try {
      final path = await _audioRecorder.stop();
      if (path != null && File(path).existsSync()) {
        File(path).deleteSync();
      }
    } catch (_) {}

    _recognizedTranscript = '';
    _lastRecordedPath = '';
    _userListening = false;
    _status = SpeechRecognitionStatus.idle;
    _statusController.add(_status);
    _amplitudeController.add(0.0);
  }

  void dispose() {
    _durationTimer?.cancel();
    _waveformTimer?.cancel();
    _amplitudeSub?.cancel();
    try {
      _audioRecorder.dispose();
    } catch (_) {}
    _statusController.close();
    _amplitudeController.close();
    _durationController.close();
    _partialResultController.close();
    _finalResultController.close();
  }
}
