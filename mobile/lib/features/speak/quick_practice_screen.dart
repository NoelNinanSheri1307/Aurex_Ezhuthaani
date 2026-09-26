import 'dart:async';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../data/models/speaking_scenario_model.dart';
import '../../data/services/speech_recognition_service.dart';

class QuickPracticeScreen extends ConsumerStatefulWidget {
  const QuickPracticeScreen({super.key});

  @override
  ConsumerState<QuickPracticeScreen> createState() => _QuickPracticeScreenState();
}

class _QuickPracticeScreenState extends ConsumerState<QuickPracticeScreen>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  bool _isListening = false;
  bool _isProcessing = false;
  QuickPracticeSubmitResult? _lastResult;
  late AnimationController _pulseController;
  String _partialTranscript = '';
  StreamSubscription? _partialSub;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
  }

  void _stopAllAudio() {
    try {
      ref.read(ttsServiceProvider).stop();
    } catch (_) {}
    try {
      ref.read(speechRecognitionServiceProvider).cancelListening();
    } catch (_) {}
  }

  @override
  void dispose() {
    _stopAllAudio();
    _pulseController.dispose();
    _partialSub?.cancel();
    super.dispose();
  }

  Future<void> _handleRecording(QuickPracticeModel challenge) async {
    final speechService = ref.read(speechRecognitionServiceProvider);
    if (!_isListening) {
      await ref.read(ttsServiceProvider).stop();
      await Future.delayed(const Duration(milliseconds: 80));
      if (!mounted) return;

      // Check availability / permissions before starting
      final available = await speechService.initialize();
      if (!available) {
        if (mounted) {
          final svcStatus = speechService.status;
          final errMsg = svcStatus == SpeechRecognitionStatus.permissionDenied
              ? 'speak.mic_permission_denied'.tr()
              : 'speak.speech_unavailable'.tr();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(errMsg, style: const TextStyle(fontSize: 12)),
              backgroundColor: AppColors.rose,
              duration: const Duration(seconds: 4),
            ),
          );
        }
        return;
      }
      // Subscribe to partial results
      _partialSub?.cancel();
      _partialSub = speechService.onPartialResult.listen((text) {
        if (mounted) setState(() => _partialTranscript = text);
      });
      setState(() {
        _isListening = true;
        _lastResult = null;
        _partialTranscript = '';
      });
      await speechService.startListening();
    } else {
      setState(() {
        _isListening = false;
        _isProcessing = true;
        _partialTranscript = '';
      });
      final spoken = await speechService.stopListening();

      if (spoken.trim().isEmpty) {
        if (mounted) {
          setState(() => _isProcessing = false);
          _showSpeechInputSheet(challenge);
        }
        return;
      }

      await _submitPracticeText(challenge, spoken);
    }
  }

  Future<void> _submitPracticeText(QuickPracticeModel challenge, String spoken) async {
    setState(() => _isProcessing = true);
    try {
      final repo = ref.read(speakingRepositoryProvider);
      final result = await repo.submitQuickPractice(
        challengeId: challenge.id,
        spokenText: spoken,
        audioDurationMs: 2000,
      );

      if (mounted) {
        setState(() {
          _lastResult = result;
          _isProcessing = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isProcessing = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${'common.error'.tr()}: $e'), backgroundColor: AppColors.rose),
        );
      }
    }
  }

  void _showSpeechInputSheet(QuickPracticeModel challenge) {
    final textController = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(bottom: MediaQuery.of(ctx).viewInsets.bottom),
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: const BoxDecoration(
              color: AppColors.surfaceElevated,
              borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.mic_off, color: AppColors.amberLight, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      'speak.voice_not_clear'.tr(),
                      style: const TextStyle(color: AppColors.textPrimary, fontSize: 14, fontWeight: FontWeight.bold),
                    ),
                    const Spacer(),
                    IconButton(
                      icon: const Icon(Icons.close, size: 18, color: AppColors.textMuted),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'speak.voice_not_clear_desc'.tr(),
                  style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: textController,
                  autofocus: true,
                  style: const TextStyle(color: AppColors.textPrimary),
                  decoration: InputDecoration(
                    hintText: '${'speak.target_prompt'.tr()} (${challenge.targetPhraseTamil})',
                    hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 13),
                    filled: true,
                    fillColor: AppColors.background,
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                  ),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {
                          Navigator.pop(ctx);
                          _handleRecording(challenge);
                        },
                        child: Text('speak.speak_again_btn'.tr(), style: const TextStyle(color: AppColors.emeraldLight)),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(backgroundColor: AppColors.emerald),
                        onPressed: () {
                          final text = textController.text.trim();
                          if (text.isNotEmpty) {
                            Navigator.pop(ctx);
                            _submitPracticeText(challenge, text);
                          }
                        },
                        child: Text('speak.evaluate_btn'.tr(), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }


  @override
  Widget build(BuildContext context) {
    final challengesAsync = ref.watch(quickPracticeChallengesProvider);

    return PopScope(
      canPop: true,
      onPopInvokedWithResult: (didPop, result) => _stopAllAudio(),
      child: Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.textPrimary, size: 20),
            onPressed: () {
              _stopAllAudio();
              context.pop();
            },
          ),
        title: Text(
          'speak.quick_practice_title'.tr(),
          style: AppTypography.titleLarge.copyWith(
            color: AppColors.textPrimary,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          challengesAsync.when(
            data: (list) => Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Center(
                child: Text(
                  '${_currentIndex + 1} / ${list.length}',
                  style: const TextStyle(color: AppColors.emeraldLight, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            loading: () => const SizedBox.shrink(),
            error: (_, _) => const SizedBox.shrink(),
          ),
        ],
      ),
      body: challengesAsync.when(
        data: (challenges) {
          if (challenges.isEmpty) {
            return Center(child: Text('common.no_data'.tr(), style: const TextStyle(color: Colors.white)));
          }

          final challenge = challenges[_currentIndex % challenges.length];

          return SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Column(
                children: [
                  // Progress indicator
                  LinearProgressIndicator(
                    value: (_currentIndex + 1) / challenges.length.toDouble(),
                    backgroundColor: AppColors.surfaceElevated,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.emerald),
                  ),
                  const SizedBox(height: 20),

                  // Challenge Card
                  Expanded(
                    child: SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppColors.purple.withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: AppColors.purpleLight),
                            ),
                            child: Text(
                              challenge.titleTamil,
                              style: const TextStyle(
                                color: AppColors.purpleLight,
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),

                          // Target Tamil Phrase
                          Text(
                            challenge.targetPhraseTamil,
                            textAlign: TextAlign.center,
                            style: AppTypography.displayMedium.copyWith(
                              color: AppColors.textPrimary,
                              fontWeight: FontWeight.bold,
                              fontSize: 26,
                              height: 1.4,
                            ),
                          ),
                          const SizedBox(height: 10),

                          // Phonetic guide
                          Text(
                            challenge.phoneticGuide,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: AppColors.amberLight,
                              fontSize: 15,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                          const SizedBox(height: 6),

                          // English translation
                          Text(
                            challenge.targetPhraseEnglish,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              color: AppColors.textSecondary,
                              fontSize: 13,
                            ),
                          ),
                          const SizedBox(height: 16),

                          // TTS audio listen button
                          ScaleOnPress(
                            onTap: () {
                              final tts = ref.read(ttsServiceProvider);
                              if (tts.isSpeaking) {
                                tts.stop();
                              } else {
                                tts.speak(challenge.targetPhraseTamil);
                              }
                            },
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceElevated,
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: AppColors.border),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.volume_up, color: AppColors.emeraldLight, size: 18),
                                  const SizedBox(width: 6),
                                  Text(
                                    'speak.listen_native'.tr(),
                                    style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                  ),
                                ],
                              ),
                            ),
                          ),

                          const SizedBox(height: 24),

                          // Evaluation Result Display
                          if (_lastResult != null) _buildResultDisplay(_lastResult!),
                        ],
                      ),
                    ),
                  ),

                  // Bottom Controls
                  Column(
                    children: [
                      // Record button
                      ScaleOnPress(
                        onTap: () => _handleRecording(challenge),
                        child: AnimatedBuilder(
                          animation: _pulseController,
                          builder: (context, child) {
                            final glow = _isListening ? 12.0 + (_pulseController.value * 14.0) : 4.0;
                            return Container(
                              width: 72,
                              height: 72,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: _isListening
                                    ? const LinearGradient(colors: [Color(0xFFF43F5E), Color(0xFFBE123C)])
                                    : AppColors.emeraldGradient,
                                boxShadow: [
                                  BoxShadow(
                                    color: (_isListening ? AppColors.rose : AppColors.emerald).withValues(alpha: 0.4),
                                    blurRadius: glow,
                                  ),
                                ],
                              ),
                              child: Center(
                                child: Icon(
                                  _isListening ? Icons.stop : Icons.mic,
                                  color: Colors.white,
                                  size: 34,
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 8),
                      // Live partial transcript display
                      if (_isListening && _partialTranscript.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 4),
                          child: Text(
                            '${'speak.listening'.tr()}: "$_partialTranscript"',
                            style: TextStyle(
                              color: AppColors.emeraldLight.withValues(alpha: 0.9),
                              fontSize: 13,
                              fontStyle: FontStyle.italic,
                            ),
                            textAlign: TextAlign.center,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      const SizedBox(height: 4),
                      Text(
                        _isListening
                            ? 'speak.listening'.tr()
                            : (_isProcessing ? 'speak.processing'.tr() : 'speak.tap_to_speak'.tr()),
                        style: const TextStyle(color: AppColors.textMuted, fontSize: 11),
                      ),
                      const SizedBox(height: 16),

                      // Next Challenge Button
                      if (_lastResult != null)
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.purple,
                              padding: const EdgeInsets.symmetric(vertical: 14),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            ),
                            onPressed: () {
                              setState(() {
                                _currentIndex++;
                                _lastResult = null;
                              });
                            },
                            child: Text('speak.next_turn'.tr(), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator(color: AppColors.emerald)),
        error: (err, _) => Center(child: Text('${'common.error'.tr()}: $err', style: const TextStyle(color: AppColors.rose))),
      ),
    ),
  );
}

  Widget _buildResultDisplay(QuickPracticeSubmitResult res) {
    Color scoreColor = res.score >= 85
        ? AppColors.emeraldLight
        : (res.score >= 60 ? AppColors.amberLight : AppColors.roseLight);

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: scoreColor.withValues(alpha: 0.5)),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '${res.score}%',
                style: AppTypography.displayMedium.copyWith(color: scoreColor, fontWeight: FontWeight.bold),
              ),
              const SizedBox(width: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.emerald.withValues(alpha: 0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  '+${res.xpAwarded} XP',
                  style: const TextStyle(color: AppColors.emeraldLight, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            res.feedback,
            textAlign: TextAlign.center,
            style: const TextStyle(color: AppColors.textPrimary, fontSize: 13),
          ),
          const SizedBox(height: 12),

          // Word pills
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: res.wordScores.map((w) {
              Color wColor = w.status == 'perfect'
                  ? AppColors.emerald
                  : (w.status == 'good' ? AppColors.amber : AppColors.sky);
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: wColor.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: wColor.withValues(alpha: 0.4)),
                ),
                child: Text(
                  w.word,
                  style: TextStyle(color: wColor, fontSize: 12, fontWeight: FontWeight.w600),
                ),
              );
            }).toList(),
          ),

          // Special phoneme tips
          if (res.phonemeFeedback.isNotEmpty) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: res.phonemeFeedback.map((tip) => Text(
                  '💡 ${tip.name}: ${tip.tipTamil}',
                  style: const TextStyle(color: AppColors.skyLight, fontSize: 11),
                )).toList(),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
