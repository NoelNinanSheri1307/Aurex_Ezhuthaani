import 'dart:io';
import 'package:audioplayers/audioplayers.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:path_provider/path_provider.dart';
import '../../core/config/api_constants.dart';
import '../../core/network/dio_client.dart';

class TtsService {
  final DioClient _dioClient;
  final AudioPlayer _audioPlayer = AudioPlayer();
  final FlutterTts _flutterTts = FlutterTts();

  bool _isSpeaking = false;
  bool get isSpeaking => _isSpeaking;
  int _activeSpeechId = 0;

  TtsService(this._dioClient) {
    _initFlutterTts();
    _audioPlayer.onPlayerStateChanged.listen((state) {
      if (state == PlayerState.completed || state == PlayerState.stopped) {
        _isSpeaking = false;
      }
    }, onError: (err) {
      debugPrint('[TtsService] AudioPlayer state error: $err');
      _isSpeaking = false;
    });

    _audioPlayer.onPlayerComplete.listen((_) {
      _isSpeaking = false;
    });
  }

  Future<void> _initFlutterTts() async {
    try {
      await _flutterTts.setLanguage('ta-IN');
      await _flutterTts.setSpeechRate(0.45);
      await _flutterTts.setVolume(1.0);
      await _flutterTts.setPitch(1.0);
      _flutterTts.setCompletionHandler(() {
        _isSpeaking = false;
      });
      _flutterTts.setErrorHandler((_) {
        _isSpeaking = false;
      });
    } catch (e) {
      debugPrint('Failed to init FlutterTts: $e');
    }
  }

  Future<void> stop() async {
    _activeSpeechId++;
    _isSpeaking = false;
    try {
      await _audioPlayer.stop();
    } catch (_) {}
    try {
      await _flutterTts.stop();
    } catch (_) {}
  }

  Future<void> speak(String text, {bool slow = false}) async {
    final cleanText = text.trim();
    if (cleanText.isEmpty) return;

    await stop();
    final speechId = ++_activeSpeechId;
    _isSpeaking = true;

    // 1. Try server-side neural Piper TTS
    try {
      final response = await _dioClient.dio.post<List<int>>(
        ApiConstants.ttsSynthesize,
        data: {'text': cleanText},
        options: Options(
          responseType: ResponseType.bytes,
          receiveTimeout: const Duration(seconds: 15),
        ),
      );

      // Check if cancelled or a new speech request was made while network request was in-flight
      if (speechId != _activeSpeechId || !_isSpeaking) {
        debugPrint('[TtsService] Speech request $speechId was cancelled while synthesis was in-flight.');
        return;
      }

      if (response.data != null && response.data!.isNotEmpty) {
        try {
          final tempDir = await getTemporaryDirectory();
          final wavFile = File('${tempDir.path}/piper_speech.wav');
          await wavFile.writeAsBytes(response.data!, flush: true);

          if (speechId != _activeSpeechId || !_isSpeaking) {
            return;
          }

          if (slow) {
            await _audioPlayer.setPlaybackRate(0.75);
          } else {
            await _audioPlayer.setPlaybackRate(1.0);
          }

          await _audioPlayer.play(
            DeviceFileSource(wavFile.path, mimeType: 'audio/wav'),
          );
          return;
        } catch (playerError) {
          debugPrint('Piper playback failed with AudioPlayer: $playerError, falling back to on-device TTS');
        }
      }
    } catch (e) {
      debugPrint('Piper TTS server unavailable, falling back to on-device TTS: $e');
    }

    if (speechId != _activeSpeechId || !_isSpeaking) {
      return;
    }

    // 2. Fallback to device native Tamil speech engine
    try {
      await _flutterTts.setSpeechRate(slow ? 0.28 : 0.45);
      await _flutterTts.speak(cleanText);
    } catch (e) {
      _isSpeaking = false;
      debugPrint('On-device TTS error: $e');
    }
  }

  void dispose() {
    try {
      _audioPlayer.dispose();
    } catch (_) {}
    try {
      _flutterTts.stop();
    } catch (_) {}
  }
}

