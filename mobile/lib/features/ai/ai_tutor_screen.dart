import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/ai_markdown_view.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/ai_chat_model.dart';

class AITutorScreen extends ConsumerStatefulWidget {
  const AITutorScreen({super.key});

  @override
  ConsumerState<AITutorScreen> createState() => _AITutorScreenState();
}

class _AITutorScreenState extends ConsumerState<AITutorScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();
  AIConversationModel? _activeConversation;
  List<AIMessageModel> _messages = [];
  bool _isLoading = true;
  bool _isSending = false;

  @override
  void initState() {
    super.initState();
    _initChat();
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _initChat() async {
    final repo = ref.read(aiRepositoryProvider);
    try {
      final convs = await repo.getConversations();
      if (convs.isNotEmpty) {
        _activeConversation = convs.first;
        final msgs = await repo.getMessages(_activeConversation!.id);
        if (mounted) {
          setState(() {
            _messages = msgs;
            _isLoading = false;
          });
        }
      } else {
        final newConv = await repo.createConversation();
        if (mounted) {
          setState(() {
            _activeConversation = newConv;
            _messages = [];
            _isLoading = false;
          });
        }
      }
    } catch (_) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _sendMessage() async {
    final text = _messageController.text.trim();
    if (text.isEmpty || _activeConversation == null || _isSending) return;

    _messageController.clear();
    setState(() {
      _messages.add(
        AIMessageModel(
          id: DateTime.now().millisecondsSinceEpoch,
          role: 'user',
          content: text,
          createdAt: DateTime.now().toIso8601String(),
        ),
      );
      _isSending = true;
    });

    _scrollToBottom();

    try {
      final repo = ref.read(aiRepositoryProvider);
      final res = await repo.sendMessage(
        convId: _activeConversation!.id,
        content: text,
      );

      if (mounted) {
        setState(() {
          _messages.add(res.assistantMessage);
          _isSending = false;
        });
        _scrollToBottom();
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSending = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('ai_tutor.failed_response'.tr(args: [e.toString()]))),
        );
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                gradient: AppColors.purpleGradient,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 18),
            ),
            const SizedBox(width: 10),
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'ai_tutor.title'.tr(),
                    style: AppTypography.titleMedium,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    'ai_tutor.subtitle'.tr(),
                    style: AppTypography.caption.copyWith(fontSize: 10, color: AppColors.emeraldLight),
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
      ),
      body: _isLoading
          ? LoadingView(message: 'ai_tutor.connecting'.tr())
          : SafeArea(
              child: Column(
                children: [
                  // Chat message stream
                  Expanded(
                    child: _messages.isEmpty
                        ? Center(
                            child: Padding(
                              padding: const EdgeInsets.all(32.0),
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(18),
                                    decoration: BoxDecoration(
                                      color: AppColors.purple.withValues(alpha: 0.15),
                                      shape: BoxShape.circle,
                                    ),
                                    child: const Icon(Icons.forum_outlined, color: AppColors.purpleLight, size: 40),
                                  ),
                                  const SizedBox(height: 16),
                                  Text('ai_tutor.greeting_title'.tr(), style: AppTypography.titleMedium),
                                  const SizedBox(height: 6),
                                  Text(
                                    'ai_tutor.greeting_desc'.tr(),
                                    style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                                    textAlign: TextAlign.center,
                                  ),
                                ],
                              ),
                            ),
                          )
                        : ListView.builder(
                            controller: _scrollController,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            itemCount: _messages.length,
                            itemBuilder: (context, index) {
                              final msg = _messages[index];
                              final isUser = msg.role == 'user';
                              return _buildMessageBubble(msg, isUser);
                            },
                          ),
                  ),

                  // Typing / Thinking Indicator
                  if (_isSending) ...[
                    Padding(
                      padding: const EdgeInsets.only(left: 20, bottom: 8),
                      child: Row(
                        children: [
                          const SizedBox(
                            width: 14,
                            height: 14,
                            child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.purpleLight),
                          ),
                          const SizedBox(width: 8),
                          Text('ai_tutor.thinking'.tr(), style: AppTypography.caption.copyWith(color: AppColors.purpleLight)),
                        ],
                      ),
                    ),
                  ],

                  // Message Input Field
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: const BoxDecoration(
                      color: AppColors.surface,
                      border: Border(top: BorderSide(color: AppColors.border)),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _messageController,
                            style: AppTypography.bodyLarge,
                            decoration: InputDecoration(
                              hintText: 'ai_tutor.input_placeholder'.tr(),
                              contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(24),
                                borderSide: BorderSide.none,
                              ),
                              filled: true,
                              fillColor: AppColors.surfaceElevated,
                            ),
                            onSubmitted: (_) => _sendMessage(),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          decoration: const BoxDecoration(
                            gradient: AppColors.purpleGradient,
                            shape: BoxShape.circle,
                          ),
                          child: IconButton(
                            icon: const Icon(Icons.send_rounded, color: Colors.white, size: 20),
                            onPressed: _sendMessage,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildMessageBubble(AIMessageModel msg, bool isUser) {
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.8,
        ),
        decoration: BoxDecoration(
          color: isUser ? AppColors.emeraldDark : AppColors.surfaceElevated,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(18),
            topRight: const Radius.circular(18),
            bottomLeft: Radius.circular(isUser ? 18 : 4),
            bottomRight: Radius.circular(isUser ? 4 : 18),
          ),
          border: Border.all(
            color: isUser ? AppColors.emerald.withValues(alpha: 0.3) : AppColors.border,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AiMarkdownView(
              data: msg.content,
              isUser: isUser,
            ),
            if (!isUser) ...[
              const SizedBox(height: 6),
              Align(
                alignment: Alignment.centerRight,
                child: GestureDetector(
                  onTap: () => ref.read(ttsServiceProvider).speak(AiMarkdownView.cleanForSpeech(msg.content)),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.volume_up_rounded, color: AppColors.purpleLight, size: 16),
                      const SizedBox(width: 4),
                      Text('ai_tutor.listen'.tr(), style: const TextStyle(color: AppColors.purpleLight, fontSize: 11)),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
