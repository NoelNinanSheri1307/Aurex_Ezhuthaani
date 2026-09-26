import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

import '../theme/app_colors.dart';
import '../theme/app_typography.dart';

/// Clean Markdown view tailored for Ezhuthaani AI Tutor responses.
///
/// Converts markdown like `**தமிழ் மொழி**`, lists, headings, and code
/// into beautifully styled native widgets adhering to Ezhuthaani's design system.
class AiMarkdownView extends StatelessWidget {
  final String data;
  final bool isUser;

  const AiMarkdownView({
    super.key,
    required this.data,
    this.isUser = false,
  });

  /// Sanitizes and normalizes AI text to handle edge cases or malformed Markdown.
  static String sanitizeMarkdown(String input) {
    if (input.isEmpty) return input;
    var text = input;

    // Normalize Windows/mixed line breaks
    text = text.replaceAll('\r\n', '\n').replaceAll('\r', '\n');

    // Balance unclosed bold markers if present (e.g. `**word` without closing `**`)
    final boldMatches = RegExp(r'\*\*').allMatches(text).length;
    if (boldMatches % 2 != 0) {
      text = '$text**';
    }

    // Balance unclosed code blocks if present
    final codeBlockMatches = RegExp(r'```').allMatches(text).length;
    if (codeBlockMatches % 2 != 0) {
      text = '$text\n```';
    }

    return text;
  }

  /// Strips Markdown symbols for text-to-speech reading so audio sounds natural.
  static String cleanForSpeech(String input) {
    if (input.isEmpty) return input;
    return input
        .replaceAllMapped(RegExp(r'\*\*([^*]+)\*\*'), (m) => m[1] ?? '')
        .replaceAllMapped(RegExp(r'\*([^*]+)\*'), (m) => m[1] ?? '')
        .replaceAllMapped(RegExp(r'__([^_]+)__'), (m) => m[1] ?? '')
        .replaceAllMapped(RegExp(r'_([^_]+)_'), (m) => m[1] ?? '')
        .replaceAllMapped(RegExp(r'`([^`]+)`'), (m) => m[1] ?? '')
        .replaceAll(RegExp(r'#{1,6}\s*'), '')
        .replaceAll(RegExp(r'^\s*[-*+]\s+', multiLine: true), '')
        .replaceAll(RegExp(r'^\s*\d+\.\s+', multiLine: true), '')
        .trim();
  }

  @override
  Widget build(BuildContext context) {
    final cleanText = sanitizeMarkdown(data);

    final textColor = isUser ? Colors.white : Colors.white;
    final accentColor = isUser ? AppColors.emeraldLight : AppColors.emeraldLight;

    final markdownStyle = MarkdownStyleSheet(
      p: AppTypography.bodyMedium.copyWith(
        color: textColor,
        height: 1.5,
      ),
      strong: AppTypography.bodyMedium.copyWith(
        color: textColor,
        fontWeight: FontWeight.w700,
      ),
      em: AppTypography.bodyMedium.copyWith(
        color: textColor.withValues(alpha: 0.9),
        fontStyle: FontStyle.italic,
      ),
      h1: AppTypography.titleLarge.copyWith(
        color: accentColor,
        fontWeight: FontWeight.w700,
        height: 1.4,
      ),
      h2: AppTypography.titleMedium.copyWith(
        color: accentColor,
        fontWeight: FontWeight.w700,
        height: 1.35,
      ),
      h3: AppTypography.titleMedium.copyWith(
        fontSize: 14,
        color: accentColor,
        fontWeight: FontWeight.w600,
      ),
      listBullet: AppTypography.bodyMedium.copyWith(
        color: accentColor,
        fontWeight: FontWeight.w700,
      ),
      listIndent: 20.0,
      listBulletPadding: const EdgeInsets.only(right: 6),
      blockSpacing: 8.0,
      code: TextStyle(
        color: AppColors.amberLight,
        backgroundColor: AppColors.surface,
        fontFamily: 'monospace',
        fontSize: 13,
      ),
      codeblockPadding: const EdgeInsets.all(12),
      codeblockDecoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.border),
      ),
      blockquoteDecoration: BoxDecoration(
        color: AppColors.surfaceElevated,
        borderRadius: BorderRadius.circular(8),
        border: const Border(
          left: BorderSide(color: AppColors.emerald, width: 3),
        ),
      ),
      blockquotePadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      blockquote: AppTypography.bodyMedium.copyWith(
        color: AppColors.textMuted,
        fontStyle: FontStyle.italic,
      ),
    );

    return MarkdownBody(
      data: cleanText,
      selectable: false,
      shrinkWrap: true,
      styleSheet: markdownStyle,
    );
  }
}
