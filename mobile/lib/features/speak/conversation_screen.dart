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

class ConversationScreen extends ConsumerStatefulWidget {
  final String scenarioIdOrKey;

  const ConversationScreen({
    super.key,
    required this.scenarioIdOrKey,
  });

  @override
  ConsumerState<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends ConsumerState<ConversationScreen>
    with SingleTickerProviderStateMixin {
  SpeakingScenarioModel? _scenario;
  bool _isLoading = true;
  String? _errorMessage;

  int? _sessionId;
  int _currentStageOrder = 1;
  int _totalStages = 3;
  Map<String, dynamic> _stageInfo = {};

  final List<Map<String, dynamic>> _dialogueMessages = [];
  List<ScenarioReply> _suggestedReplies = [];

  bool _isVoiceMode = true;
  bool _isProcessing = false;
  bool _isSlowTts = false;
  final TextEditingController _textInputController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  late AnimationController _pulseController;
  PronunciationReportModel? _lastPronunciationReport;
  String? _activeRetryPrompt;
  bool _showVoiceUnclearBanner = false;
  String _partialTranscript = '';

  StreamSubscription? _statusSub;
  StreamSubscription? _amplitudeSub;
  StreamSubscription? _durationSub;
  StreamSubscription? _partialSub;
  double _currentAmplitude = 0.0;
  int _recordingSeconds = 0;


  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);

    _initSession();
    _listenToSpeechService();
  }

  void _listenToSpeechService() {
    final speechService = ref.read(speechRecognitionServiceProvider);
    _amplitudeSub = speechService.onAmplitudeChange.listen((amp) {
      if (mounted) setState(() => _currentAmplitude = amp);
    });
    _durationSub = speechService.onDurationChange.listen((sec) {
      if (mounted) setState(() => _recordingSeconds = sec);
    });
    _partialSub = speechService.onPartialResult.listen((text) {
      if (mounted) setState(() => _partialTranscript = text);
    });
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
    _textInputController.dispose();
    _scrollController.dispose();
    _statusSub?.cancel();
    _amplitudeSub?.cancel();
    _durationSub?.cancel();
    _partialSub?.cancel();
    super.dispose();
  }

  Future<void> _initSession() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final repo = ref.read(speakingRepositoryProvider);
      final detail = await repo.getScenarioDetail(widget.scenarioIdOrKey);

      final startData = await repo.startSession(widget.scenarioIdOrKey);
      final initialMsg = startData['character_initial_message'] as Map<String, dynamic>? ?? {};
      final repliesRaw = (startData['suggested_replies'] as List<dynamic>?) ?? [];
      final suggested = repliesRaw.map((e) => ScenarioReply.fromJson(e as Map<String, dynamic>)).toList();

      if (mounted) {
        setState(() {
          _scenario = detail;
          _sessionId = startData['session_id'] as int?;
          _currentStageOrder = startData['current_stage_order'] as int? ?? 1;
          _totalStages = startData['total_stages'] as int? ?? detail.stages.length;
          _stageInfo = (startData['stage_info'] as Map<String, dynamic>?) ?? {};
          _suggestedReplies = suggested;
          _dialogueMessages.clear();
          _dialogueMessages.add({
            'sender': 'character',
            'tamil': initialMsg['tamil'] ?? '',
            'english': initialMsg['english'] ?? '',
            'phonetic': initialMsg['phonetic'] ?? '',
          });
          _isLoading = false;
        });

        // Automatically play first character greeting
        if (initialMsg['tamil'] != null) {
          ref.read(ttsServiceProvider).speak(initialMsg['tamil']);
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _handleUserSubmit(String userInput, {String inputMode = 'voice'}) async {
    final text = userInput.trim();
    if (text.isEmpty || _sessionId == null || _isProcessing) return;

    try {
      ref.read(ttsServiceProvider).stop();
    } catch (_) {}

    setState(() {
      _isProcessing = true;
      _dialogueMessages.add({
        'sender': 'user',
        'tamil': text,
        'input_mode': inputMode,
      });
    });
    _textInputController.clear();
    _scrollToBottom();

    try {
      final repo = ref.read(speakingRepositoryProvider);
      final turnResult = await repo.submitTurn(
        widget.scenarioIdOrKey,
        sessionId: _sessionId!,
        userInput: text,
        inputMode: inputMode,
        stage: _currentStageOrder,
      );

      if (mounted) {
        setState(() {
          _lastPronunciationReport = turnResult.pronunciationReport;
          _currentStageOrder = turnResult.currentStageOrder;
          _totalStages = turnResult.totalStages;
          _stageInfo = turnResult.stageInfo;
          _suggestedReplies = turnResult.nextSuggestedReplies;
          _activeRetryPrompt = !turnResult.advanceStage ? turnResult.retryPromptTamil : null;
          _showVoiceUnclearBanner = false;

          _dialogueMessages.add({
            'sender': 'character',
            'tamil': turnResult.characterReply.tamil,
            'english': turnResult.characterReply.english,
            'phonetic': turnResult.characterReply.phonetic,
          });
          _isProcessing = false;
        });


        _scrollToBottom();

        // Speak character reply safely
        try {
          ref.read(ttsServiceProvider).speak(
            turnResult.characterReply.tamil,
            slow: _isSlowTts,
          );
        } catch (ttsErr) {
          debugPrint('TTS trigger error: $ttsErr');
        }

        if (turnResult.isConversationComplete) {
          // Complete session automatically
          _completeSession();
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isProcessing = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${'common.error'.tr()}: $e'),
            backgroundColor: AppColors.rose,
          ),
        );
      }
    }
  }

  Future<void> _completeSession() async {
    if (_sessionId == null) return;
    try {
      final repo = ref.read(speakingRepositoryProvider);
      final res = await repo.completeSession(widget.scenarioIdOrKey, sessionId: _sessionId!);

      if (mounted) {
        _showCelebrationDialog(res);
      }
    } catch (e) {
      debugPrint('Completion error: $e');
    }
  }

  void _showCelebrationDialog(SpeakingCompletionResult res) {
    showModalBottomSheet(
      context: context,
      isDismissible: false,
      enableDrag: false,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(24),
          decoration: const BoxDecoration(
            color: AppColors.surfaceElevated,
            borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Mascot Winning Header
              Image.asset(
                'assets/images/mascotwinning.png',
                height: 110,
                errorBuilder: (_, _, _) => const Icon(Icons.stars, color: AppColors.amberLight, size: 80),
              ),
              const SizedBox(height: 12),
              Text(
                'speak.scenario_completed'.tr(),
                style: AppTypography.titleLarge.copyWith(
                  color: AppColors.textPrimary,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                res.scenarioTitle,
                style: const TextStyle(color: AppColors.textSecondary, fontSize: 13),
              ),
              const SizedBox(height: 18),

              // Star Rating
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  3,
                  (i) => Icon(
                    i < res.stars ? Icons.star : Icons.star_border,
                    color: AppColors.amberLight,
                    size: 36,
                  ),
                ),
              ),
              const SizedBox(height: 18),

              // Scores Grid
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Expanded(child: _buildResultScoreCard('speak.overall_skill'.tr(), '${res.overallScore}%', AppColors.emeraldLight)),
                  const SizedBox(width: 8),
                  Expanded(child: _buildResultScoreCard('speak.pronunciation_skill'.tr(), '${res.pronunciationScore}%', AppColors.skyLight)),
                  const SizedBox(width: 8),
                  Expanded(child: _buildResultScoreCard('speak.conversation_skill'.tr(), '${res.conversationScore}%', AppColors.purpleLight)),
                ],
              ),
              const SizedBox(height: 20),

              // XP Earned Banner
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                decoration: BoxDecoration(
                  gradient: AppColors.emeraldGradient,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.bolt, color: Colors.white, size: 24),
                    const SizedBox(width: 8),
                    Text(
                      'speak.xp_earned_msg'.tr(args: [res.xpAwarded.toString()]),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),

              // New Badges Banner
              if (res.newBadges.isNotEmpty) ...[
                const SizedBox(height: 14),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(
                    color: AppColors.amber.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.amberLight),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.military_tech, color: AppColors.amberLight),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          'speak.new_badge_unlocked'.tr(),
                          style: const TextStyle(
                            color: AppColors.amberLight,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],

              const SizedBox(height: 24),

              // Buttons
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        side: const BorderSide(color: AppColors.border),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      onPressed: () {
                        _stopAllAudio();
                        Navigator.pop(ctx);
                        _initSession();
                      },
                      child: Text('speak.practice_again'.tr(), style: const TextStyle(color: Colors.white)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        backgroundColor: AppColors.emerald,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                      onPressed: () {
                        _stopAllAudio();
                        Navigator.pop(ctx);
                        context.pop();
                      },
                      child: Text('speak.continue_btn'.tr(), style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
            ],
          ),
        );
      },
    );
  }

  Widget _buildResultScoreCard(String title, String val, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(val, style: AppTypography.titleMedium.copyWith(color: color, fontWeight: FontWeight.bold)),
          const SizedBox(height: 2),
          FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(title, textAlign: TextAlign.center, maxLines: 1, style: const TextStyle(color: AppColors.textMuted, fontSize: 10)),
          ),
        ],
      ),
    );
  }

  void _showHintSheet() async {
    if (_sessionId == null) return;
    int currentHintLevel = 1;

    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surfaceElevated,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.lightbulb_outline, color: AppColors.amberLight),
                      const SizedBox(width: 8),
                      Text(
                        'உதவி குறிப்புகள் (Progressive Hints)',
                        style: AppTypography.titleMedium.copyWith(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'படிப்படியான குறிப்புகள் மூலம் இயல்பாக பேச பயிலுங்கள்:',
                    style: TextStyle(color: AppColors.textSecondary, fontSize: 12),
                  ),
                  const SizedBox(height: 16),
                  _buildHintTile(
                    level: 1,
                    title: 'Level 1: ஆங்கிலப் பொருள் (Meaning & Intent)',
                    description: 'Learn what to say in this situation without Tamil words.',
                    isSelected: currentHintLevel >= 1,
                    onTap: () async {
                      final h = await ref.read(speakingRepositoryProvider).getHint(
                        widget.scenarioIdOrKey,
                        sessionId: _sessionId!,
                        level: 1,
                      );
                      setSheetState(() => currentHintLevel = 1);
                      _showHintContentDialog(h['hint_text']?.toString() ?? '');
                    },
                  ),
                  const SizedBox(height: 8),
                  _buildHintTile(
                    level: 2,
                    title: 'Level 2: முதல் சொல் (First Tamil Word)',
                    description: 'Gives the opening word or greeting to jumpstart your phrase.',
                    isSelected: currentHintLevel >= 2,
                    onTap: () async {
                      final h = await ref.read(speakingRepositoryProvider).getHint(
                        widget.scenarioIdOrKey,
                        sessionId: _sessionId!,
                        level: 2,
                      );
                      setSheetState(() => currentHintLevel = 2);
                      _showHintContentDialog(h['hint_text']?.toString() ?? '');
                    },
                  ),
                  const SizedBox(height: 8),
                  _buildHintTile(
                    level: 3,
                    title: 'Level 3: முழு வாக்கியம் (Full Model Sentence)',
                    description: 'Complete Tamil model phrase with phonetic transliteration.',
                    isSelected: currentHintLevel >= 3,
                    onTap: () async {
                      final h = await ref.read(speakingRepositoryProvider).getHint(
                        widget.scenarioIdOrKey,
                        sessionId: _sessionId!,
                        level: 3,
                      );
                      setSheetState(() => currentHintLevel = 3);
                      _showHintContentDialog(h['hint_text']?.toString() ?? '');
                    },
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildHintTile({
    required int level,
    required String title,
    required String description,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isSelected ? AppColors.amber.withValues(alpha: 0.5) : AppColors.border),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.amber.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: Text('$level', style: const TextStyle(color: AppColors.amberLight, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(color: AppColors.textPrimary, fontWeight: FontWeight.w600, fontSize: 13)),
                  Text(description, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, color: AppColors.textMuted, size: 14),
          ],
        ),
      ),
    );
  }

  void _showHintContentDialog(String text) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppColors.surfaceElevated,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        title: Row(
          children: [
            const Icon(Icons.lightbulb, color: AppColors.amberLight),
            const SizedBox(width: 8),
            Text('speak.hint_title'.tr(), style: const TextStyle(color: Colors.white)),
          ],
        ),
        content: Text(text, style: const TextStyle(color: AppColors.textPrimary, fontSize: 15, height: 1.4)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: Text('speak.got_it'.tr(), style: const TextStyle(color: AppColors.emeraldLight)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
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
          ),
          body: const Center(
            child: CircularProgressIndicator(color: AppColors.emerald),
          ),
        ),
      );
    }

    if (_errorMessage != null) {
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
          ),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, color: AppColors.rose, size: 48),
                const SizedBox(height: 12),
                Text('${'common.error'.tr()}\n$_errorMessage', textAlign: TextAlign.center, style: const TextStyle(color: AppColors.textSecondary)),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _initSession,
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.emerald),
                  child: Text('common.retry'.tr()),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final speechService = ref.watch(speechRecognitionServiceProvider);
    final isListening = speechService.isListening;

    return PopScope(
      canPop: true,
      onPopInvokedWithResult: (didPop, result) => _stopAllAudio(),
      child: Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(
          backgroundColor: AppColors.surfaceElevated.withValues(alpha: 0.9),
          elevation: 0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_ios_new, color: AppColors.textPrimary, size: 20),
            onPressed: () {
              _stopAllAudio();
              context.pop();
            },
          ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              _scenario?.titleTamil ?? '',
              style: AppTypography.titleMedium.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.bold,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              '${_scenario?.characterName} (${_scenario?.characterRole})',
              style: const TextStyle(color: AppColors.textSecondary, fontSize: 11),
            ),
          ],
        ),
        actions: [
          // Slow TTS Toggle
          IconButton(
            tooltip: _isSlowTts ? 'speak.normal_speed'.tr() : 'speak.slow_speed'.tr(),
            icon: Text(
              _isSlowTts ? '🐢' : '🐇',
              style: const TextStyle(fontSize: 20),
            ),
            onPressed: () {
              setState(() => _isSlowTts = !_isSlowTts);
            },
          ),
          // Hint Button
          IconButton(
            tooltip: 'speak.hints_tooltip'.tr(),
            icon: const Icon(Icons.lightbulb_outline, color: AppColors.amberLight),
            onPressed: _showHintSheet,
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(28),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Row(
              children: [
                Text(
                  'speak.stage_indicator'.tr(args: [_currentStageOrder.toString(), _totalStages.toString()]),
                  style: const TextStyle(
                    color: AppColors.emeraldLight,
                    fontWeight: FontWeight.bold,
                    fontSize: 11,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: _currentStageOrder / _totalStages.toDouble(),
                      backgroundColor: AppColors.surface,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppColors.emerald),
                      minHeight: 5,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Stage Goal Card
            if (_stageInfo['goal_tamil'] != null)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.surface.withValues(alpha: 0.6),
                  border: const Border(bottom: BorderSide(color: AppColors.border, width: 0.5)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.track_changes, size: 16, color: AppColors.skyLight),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'speak.goal_label'.tr(args: [_stageInfo['goal_tamil'].toString()]),
                        style: const TextStyle(color: AppColors.textSecondary, fontSize: 11),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),

            // Dialogue Transcript Area
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: _dialogueMessages.length,
                itemBuilder: (context, index) {
                  final msg = _dialogueMessages[index];
                  final isCharacter = msg['sender'] == 'character';
                  return _buildDialogueBubble(msg, isCharacter);
                },
              ),
            ),

            // Live Pronunciation Feedback Banner
            if (_lastPronunciationReport != null)
              _buildPronunciationFeedbackCard(_lastPronunciationReport!),

            // Retry prompt banner if turn was invalid or partial
            if (_activeRetryPrompt != null && !_isProcessing)
              _buildRetryPromptBanner(),

            // Voice unclear banner
            if (_showVoiceUnclearBanner && !_isProcessing)
              _buildVoiceUnclearBanner(),

            // Suggested Quick Replies Chips
            if (_suggestedReplies.isNotEmpty && !_isProcessing)
              _buildSuggestedRepliesDrawer(),

            // Interactive Bottom Input Panel
            _buildInputControlPanel(isListening),
          ],
        ),
      ),
    ),
  );
}

  Widget _buildDialogueBubble(Map<String, dynamic> msg, bool isCharacter) {
    final textTamil = msg['tamil']?.toString() ?? '';
    final textEnglish = msg['english']?.toString() ?? '';
    final textPhonetic = msg['phonetic']?.toString() ?? '';

    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Row(
        mainAxisAlignment: isCharacter ? MainAxisAlignment.start : MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (isCharacter) ...[
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: AppColors.amber.withValues(alpha: 0.2),
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.amberLight, width: 1),
              ),
              child: const Center(child: Text('👨‍🍳', style: TextStyle(fontSize: 18))),
            ),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: isCharacter ? AppColors.surfaceElevated : AppColors.emerald.withValues(alpha: 0.15),
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(16),
                  topRight: const Radius.circular(16),
                  bottomLeft: Radius.circular(isCharacter ? 4 : 16),
                  bottomRight: Radius.circular(isCharacter ? 16 : 4),
                ),
                border: Border.all(
                  color: isCharacter ? AppColors.border : AppColors.emerald.withValues(alpha: 0.4),
                ),
              ),
              child: Column(
                crossAxisAlignment: isCharacter ? CrossAxisAlignment.start : CrossAxisAlignment.end,
                children: [
                  if (isCharacter)
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Text(
                            textTamil,
                            style: AppTypography.bodyMedium.copyWith(
                              color: AppColors.textPrimary,
                              fontWeight: FontWeight.w600,
                              fontSize: 15,
                              height: 1.3,
                            ),
                          ),
                        ),
                        const SizedBox(width: 6),
                        IconButton(
                          icon: const Icon(Icons.volume_up, size: 18, color: AppColors.emeraldLight),
                          padding: EdgeInsets.zero,
                          constraints: const BoxConstraints(),
                          onPressed: () {
                            final tts = ref.read(ttsServiceProvider);
                            if (tts.isSpeaking) {
                              tts.stop();
                            } else {
                              tts.speak(textTamil, slow: _isSlowTts);
                            }
                          },
                        ),
                      ],
                    )
                  else
                    Text(
                      textTamil,
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.textPrimary,
                        fontWeight: FontWeight.w600,
                        fontSize: 15,
                        height: 1.3,
                      ),
                    ),
                  if (textPhonetic.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(
                      textPhonetic,
                      style: TextStyle(
                        color: AppColors.amberLight.withValues(alpha: 0.9),
                        fontSize: 11,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                  if (textEnglish.isNotEmpty) ...[
                    const SizedBox(height: 2),
                    Text(
                      textEnglish,
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        fontSize: 11,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          if (!isCharacter) const SizedBox(width: 6),
        ],
      ),
    );
  }

  Widget _buildSuggestedRepliesDrawer() {
    return Container(
      height: 46,
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        scrollDirection: Axis.horizontal,
        itemCount: _suggestedReplies.length,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final reply = _suggestedReplies[index];
          return ScaleOnPress(
            onTap: () {
              _handleUserSubmit(reply.tamil, inputMode: 'suggested');
            },
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.emerald.withValues(alpha: 0.5)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.chat_bubble_outline, size: 12, color: AppColors.emeraldLight),
                  const SizedBox(width: 6),
                  Text(
                    reply.tamil,
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildRetryPromptBanner() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.amber.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.amberLight.withValues(alpha: 0.5)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.lightbulb_outline, size: 20, color: AppColors.amberLight),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'speak.retry_hint_prefix'.tr(),
                  style: const TextStyle(color: AppColors.amberLight, fontSize: 11, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 2),
                Text(
                  _activeRetryPrompt!,
                  style: const TextStyle(color: AppColors.textPrimary, fontSize: 12, fontWeight: FontWeight.w500),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.close, size: 14, color: AppColors.textMuted),
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            onPressed: () => setState(() => _activeRetryPrompt = null),
          ),
        ],
      ),
    );
  }

  Widget _buildVoiceUnclearBanner() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.amber.withValues(alpha: 0.5)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.info_outline, size: 18, color: AppColors.amberLight),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  'speak.voice_unclear_banner'.tr(),
                  style: const TextStyle(color: AppColors.textPrimary, fontSize: 12, fontWeight: FontWeight.w600),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.close, size: 14, color: AppColors.textMuted),
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(),
                onPressed: () => setState(() => _showVoiceUnclearBanner = false),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              TextButton.icon(
                icon: const Icon(Icons.mic, size: 15, color: AppColors.emeraldLight),
                label: Text('speak.speak_again_btn'.tr(), style: const TextStyle(color: AppColors.emeraldLight, fontSize: 12)),
                onPressed: () async {
                  setState(() {
                    _showVoiceUnclearBanner = false;
                    _partialTranscript = '';
                  });
                  _stopAllAudio();
                  await Future.delayed(const Duration(milliseconds: 80));
                  final svc = ref.read(speechRecognitionServiceProvider);
                  await svc.initialize();
                  await svc.startListening();
                },
              ),
              const SizedBox(width: 8),
              TextButton.icon(
                icon: const Icon(Icons.keyboard, size: 15, color: AppColors.skyLight),
                label: Text('speak.type_mode'.tr(), style: const TextStyle(color: AppColors.skyLight, fontSize: 12)),
                onPressed: () {
                  setState(() {
                    _showVoiceUnclearBanner = false;
                    _isVoiceMode = false;
                  });
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPronunciationFeedbackCard(PronunciationReportModel report) {
    if (report.score == null || !report.isAvailable) {
      return Container(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: AppColors.surfaceElevated,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            const Icon(Icons.info_outline, size: 16, color: AppColors.textSecondary),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                report.feedback.isNotEmpty
                    ? report.feedback
                    : 'speak.type_mode_no_score'.tr(),
                style: const TextStyle(color: AppColors.textSecondary, fontSize: 11),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.close, size: 14, color: AppColors.textMuted),
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
              onPressed: () => setState(() => _lastPronunciationReport = null),
            ),
          ],
        ),
      );
    }

    final score = report.score!;
    final Color scoreColor = score >= 85
        ? AppColors.emeraldLight
        : (score >= 60 ? AppColors.amberLight : AppColors.roseLight);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: scoreColor.withValues(alpha: 0.4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: scoreColor.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'speak.pronunciation_accuracy'.tr(args: [score.toString()]),
                  style: TextStyle(color: scoreColor, fontWeight: FontWeight.bold, fontSize: 11),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  report.feedback,
                  style: const TextStyle(color: AppColors.textSecondary, fontSize: 11),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              IconButton(
                icon: const Icon(Icons.close, size: 14, color: AppColors.textMuted),
                padding: EdgeInsets.zero,
                constraints: const BoxConstraints(),
                onPressed: () => setState(() => _lastPronunciationReport = null),
              ),
            ],
          ),
          if (report.wordScores.isNotEmpty) ...[
            const SizedBox(height: 6),
            Wrap(
              spacing: 4,
              runSpacing: 4,
              children: report.wordScores.map((w) {
                final wColor = w.status == 'perfect'
                    ? AppColors.emeraldLight
                    : (w.status == 'good' ? AppColors.amberLight : AppColors.roseLight);
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: wColor.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: wColor.withValues(alpha: 0.3)),
                  ),
                  child: Text(
                    '${w.target} (${w.score}%)',
                    style: TextStyle(color: wColor, fontSize: 10, fontWeight: FontWeight.w500),
                  ),
                );
              }).toList(),
            ),
          ],
          if (report.phonemeFeedback.isNotEmpty) ...[
            const SizedBox(height: 6),
            ...report.phonemeFeedback.take(1).map((tip) => Row(
              children: [
                const Icon(Icons.record_voice_over, size: 14, color: AppColors.skyLight),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    '${tip.name}: ${tip.tipTamil}',
                    style: const TextStyle(color: AppColors.skyLight, fontSize: 10),
                  ),
                ),
              ],
            )),
          ],
        ],
      ),
    );
  }


  Widget _buildInputControlPanel(bool isListening) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        border: const Border(top: BorderSide(color: AppColors.border, width: 0.8)),
      ),
      child: _isVoiceMode ? _buildVoiceControl(isListening) : _buildTextControl(),
    );
  }

  Widget _buildVoiceControl(bool isListening) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (isListening) ...[
          // Animated sound waves & timer
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(
                  color: AppColors.rose,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '00:${_recordingSeconds.toString().padLeft(2, '0')}',
                style: const TextStyle(
                  color: AppColors.roseLight,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              const SizedBox(width: 14),
              // Waveform representation
              ...List.generate(6, (i) {
                final barHeight = 8.0 + (_currentAmplitude * 20.0 * (1 + (i % 3) * 0.4));
                return Container(
                  margin: const EdgeInsets.symmetric(horizontal: 2),
                  width: 3,
                  height: barHeight.clamp(6.0, 30.0),
                  decoration: BoxDecoration(
                    color: AppColors.emeraldLight,
                    borderRadius: BorderRadius.circular(2),
                  ),
                );
              }),
            ],
          ),
          const SizedBox(height: 6),
          // Live partial transcript
          if (_partialTranscript.isNotEmpty)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              child: Text(
                'கேட்கிறேன்: "$_partialTranscript"',
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
          const SizedBox(height: 6),
        ],
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            // Switch to Text Mode
            IconButton(
              tooltip: 'speak.type_mode'.tr(),
              icon: const Icon(Icons.keyboard, color: AppColors.textSecondary),
              onPressed: () {
                setState(() => _isVoiceMode = false);
              },
            ),

            // Large Microphone Action Button
            ScaleOnPress(
              onTap: () async {
                final speechService = ref.read(speechRecognitionServiceProvider);
                if (isListening) {
                  final spoken = await speechService.stopListening();
                  if (mounted) {
                    setState(() => _partialTranscript = '');
                  }
                  if (spoken.trim().isEmpty) {
                    if (mounted) {
                      setState(() {
                        _showVoiceUnclearBanner = true;
                      });
                    }
                  } else {
                    _handleUserSubmit(spoken, inputMode: 'voice');
                  }
                } else {
                  // User wants to record/speak: immediately stop any TTS audio
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
                  setState(() {
                    _showVoiceUnclearBanner = false;
                    _activeRetryPrompt = null;
                    _partialTranscript = '';
                  });
                  await speechService.startListening();
                }
              },
              child: AnimatedBuilder(
                animation: _pulseController,
                builder: (context, child) {
                  final glowRadius = isListening ? 12.0 + (_pulseController.value * 14.0) : 6.0;
                  return Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: isListening
                          ? const LinearGradient(colors: [Color(0xFFF43F5E), Color(0xFFBE123C)])
                          : AppColors.emeraldGradient,
                      boxShadow: [
                        BoxShadow(
                          color: (isListening ? AppColors.rose : AppColors.emerald).withValues(alpha: 0.4),
                          blurRadius: glowRadius,
                          spreadRadius: isListening ? 2 : 0,
                        ),
                      ],
                    ),
                    child: Center(
                      child: Icon(
                        isListening ? Icons.stop : Icons.mic,
                        color: Colors.white,
                        size: 32,
                      ),
                    ),
                  );
                },
              ),
            ),

            // Cancel recording
            IconButton(
              tooltip: 'speak.cancel_btn'.tr(),
              icon: const Icon(Icons.refresh, color: AppColors.textMuted),
              onPressed: () {
                _stopAllAudio();
              },
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          isListening ? 'speak.tap_when_done'.tr() : 'speak.tap_to_speak'.tr(),
          style: const TextStyle(color: AppColors.textMuted, fontSize: 11),
        ),
      ],
    );
  }

  Widget _buildTextControl() {
    return Row(
      children: [
        IconButton(
          tooltip: 'speak.voice_mode'.tr(),
          icon: const Icon(Icons.mic, color: AppColors.emeraldLight),
          onPressed: () {
            ref.read(ttsServiceProvider).stop();
            setState(() => _isVoiceMode = true);
          },
        ),
        Expanded(
          child: TextField(
            controller: _textInputController,
            style: const TextStyle(color: AppColors.textPrimary, fontSize: 14),
            decoration: InputDecoration(
              hintText: 'speak.type_tamil_hint'.tr(),
              hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 13),
              filled: true,
              fillColor: AppColors.surface,
              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(20),
                borderSide: const BorderSide(color: AppColors.border),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(20),
                borderSide: const BorderSide(color: AppColors.emerald),
              ),
            ),
            onSubmitted: (val) => _handleUserSubmit(val, inputMode: 'text'),
          ),
        ),
        const SizedBox(width: 8),
        ScaleOnPress(
          onTap: () => _handleUserSubmit(_textInputController.text, inputMode: 'text'),
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: const BoxDecoration(
              gradient: AppColors.emeraldGradient,
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.send, color: Colors.white, size: 18),
          ),
        ),
      ],
    );
  }
}
