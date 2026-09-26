import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';

class TracingCanvas extends StatefulWidget {
  final String character;
  final VoidCallback? onCleared;
  final VoidCallback? onCompleted;

  const TracingCanvas({
    super.key,
    required this.character,
    this.onCleared,
    this.onCompleted,
  });

  @override
  State<TracingCanvas> createState() => _TracingCanvasState();
}

class _TracingCanvasState extends State<TracingCanvas> {
  final List<List<Offset>> _strokes = [];
  List<Offset> _currentStroke = [];

  void _clear() {
    setState(() {
      _strokes.clear();
      _currentStroke.clear();
    });
    widget.onCleared?.call();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 280,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.border, width: 1.5),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background reference Tamil character watermark
          Center(
            child: Text(
              widget.character,
              style: AppTypography.tamilDisplay.copyWith(
                fontSize: 140,
                color: Colors.white.withValues(alpha: 0.08),
                fontWeight: FontWeight.bold,
              ),
            ),
          ),

          // User drawing canvas
          ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: SizedBox.expand(
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onPanStart: (details) {
                  setState(() {
                    _currentStroke = [details.localPosition];
                    _strokes.add(_currentStroke);
                  });
                },
                onPanUpdate: (details) {
                  setState(() {
                    _currentStroke.add(details.localPosition);
                  });
                },
                onPanEnd: (_) {
                  if (_strokes.length >= 2) {
                    widget.onCompleted?.call();
                  }
                },
                child: CustomPaint(
                  painter: _StrokePainter(_strokes),
                  size: Size.infinite,
                ),
              ),
            ),
          ),

          // Action Overlay: Clear and guide
          Positioned(
            top: 12,
            right: 12,
            child: IconButton(
              icon: const Icon(Icons.refresh_rounded, color: AppColors.textMuted),
              onPressed: _clear,
              tooltip: 'lesson.clear_canvas'.tr(),
            ),
          ),
          Positioned(
            bottom: 12,
            child: Text(
              'lesson.trace_letter'.tr(),
              style: AppTypography.caption.copyWith(color: AppColors.textMuted),
            ),
          ),
        ],
      ),
    );
  }
}

class _StrokePainter extends CustomPainter {
  final List<List<Offset>> strokes;

  _StrokePainter(this.strokes);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.emeraldLight
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round
      ..strokeWidth = 10.0
      ..style = PaintingStyle.stroke;

    final dotPaint = Paint()
      ..color = AppColors.emeraldLight
      ..style = PaintingStyle.fill;

    for (final stroke in strokes) {
      if (stroke.isEmpty) continue;
      if (stroke.length == 1) {
        canvas.drawCircle(stroke.first, 5.0, dotPaint);
        continue;
      }
      final path = Path()..moveTo(stroke.first.dx, stroke.first.dy);
      for (int i = 1; i < stroke.length; i++) {
        path.lineTo(stroke[i].dx, stroke[i].dy);
      }
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant _StrokePainter oldDelegate) => true;
}
