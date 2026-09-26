import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/theme/app_colors.dart';
import 'mascot_controller.dart';
import 'mascot_state.dart';

class MascotWidget extends ConsumerStatefulWidget {
  final double size;
  final bool showSpeechBubble;
  final bool interactive;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const MascotWidget({
    super.key,
    this.size = 140,
    this.showSpeechBubble = true,
    this.interactive = true,
    this.onTap,
    this.onLongPress,
  });

  @override
  ConsumerState<MascotWidget> createState() => _MascotWidgetState();
}

class _MascotWidgetState extends ConsumerState<MascotWidget>
    with TickerProviderStateMixin {
  late final AnimationController _idleController;
  late final AnimationController _actionController;
  late final AnimationController _blinkController;
  late final AnimationController _celebrateController;

  int _tapQuoteIndex = 0;

  @override
  void initState() {
    super.initState();
    // Gentle breathing & floating bob
    _idleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    )..repeat(reverse: true);

    // Dynamic ear flap / trunk wave on actions
    _actionController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );

    // Natural blinking
    _blinkController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3800),
    )..repeat();

    // Celebration particles & glow spin
    _celebrateController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat();
  }

  @override
  void dispose() {
    _idleController.dispose();
    _actionController.dispose();
    _blinkController.dispose();
    _celebrateController.dispose();
    super.dispose();
  }

  void _handleTap() {
    if (!widget.interactive) return;

    final controller = ref.read(mascotProvider.notifier);
    _actionController.forward(from: 0);

    final quotes = MascotStateX.randomTapQuotes;
    final nextQuote = quotes[_tapQuoteIndex % quotes.length];
    _tapQuoteIndex++;

    controller.trigger(
      MascotState.happy,
      customSpeech: nextQuote,
      duration: const Duration(seconds: 4),
    );

    widget.onTap?.call();
  }

  void _handleLongPress() {
    if (!widget.interactive) return;

    final controller = ref.read(mascotProvider.notifier);
    _actionController.forward(from: 0);

    controller.trigger(
      MascotState.celebrating,
      customSpeech: 'வெற்றி நமதே! தமிழால் இணைவோம்! 🐘🌟🎉',
      duration: const Duration(seconds: 4),
    );

    widget.onLongPress?.call();
  }

  @override
  Widget build(BuildContext context) {
    final mascotModel = ref.watch(mascotProvider);
    final state = mascotModel.state;

    // React to high-energy states
    if (state == MascotState.excited ||
        state == MascotState.celebrating ||
        state == MascotState.levelUp ||
        state == MascotState.dailyComplete) {
      if (!_actionController.isAnimating) {
        _actionController.repeat(reverse: true);
      }
    } else {
      if (_actionController.isAnimating && state != MascotState.happy) {
        _actionController.stop();
      }
    }

    return GestureDetector(
      onTap: _handleTap,
      onLongPress: _handleLongPress,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Speech Bubble
          if (widget.showSpeechBubble)
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 300),
              transitionBuilder: (child, anim) => ScaleTransition(
                scale: CurvedAnimation(parent: anim, curve: Curves.easeOutBack),
                child: FadeTransition(opacity: anim, child: child),
              ),
              child: _buildSpeechBubble(
                mascotModel.speech,
                key: ValueKey(mascotModel.speech),
              ),
            ),

          if (widget.showSpeechBubble) const SizedBox(height: 10),

          // Official Mascot Character from web/assets/
          AnimatedBuilder(
            animation: Listenable.merge([
              _idleController,
              _actionController,
              _celebrateController,
            ]),
            builder: (context, child) {
              final hoverOffset = math.sin(_idleController.value * math.pi) * 5;
              final tapScale = 1.0 + math.sin(_actionController.value * math.pi) * 0.08;

              return Transform.translate(
                offset: Offset(0, -hoverOffset),
                child: Transform.scale(
                  scale: tapScale,
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.emerald.withValues(alpha: 0.18),
                          blurRadius: 28,
                          spreadRadius: 2,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: Image.asset(
                      state.assetPath,
                      width: widget.size,
                      height: widget.size,
                      fit: BoxFit.contain,
                      errorBuilder: (context, error, stackTrace) {
                        debugPrint('Mascot image load error for ${state.assetPath}: $error');
                        return CustomPaint(
                          size: Size(widget.size, widget.size),
                          painter: EzhuthaaniElephantPainter(
                            state: state,
                            blink: false,
                            idleProgress: _idleController.value,
                            actionProgress: _actionController.value,
                            celebrateProgress: _celebrateController.value,
                          ),
                        );
                      },
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSpeechBubble(String text, {required Key key}) {
    return Container(
      key: key,
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFF1E293B).withValues(alpha: 0.95),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: AppColors.emeraldLight.withValues(alpha: 0.4),
          width: 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.emerald.withValues(alpha: 0.15),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: const TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          height: 1.3,
        ),
      ),
    );
  }
}

/// High-performance 2.5D procedural CustomPainter rendering the Ezhuthaani Tamil Elephant Mascot.
class EzhuthaaniElephantPainter extends CustomPainter {
  final MascotState state;
  final bool blink;
  final double idleProgress;
  final double actionProgress;
  final double celebrateProgress;

  EzhuthaaniElephantPainter({
    required this.state,
    required this.blink,
    required this.idleProgress,
    required this.actionProgress,
    required this.celebrateProgress,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final scale = size.width / 140.0;
    canvas.save();
    canvas.scale(scale, scale);

    final center = const Offset(70, 70);

    // 1. Ambient Background Effects & Auras
    _paintAura(canvas, center);

    // 2. Elephant Ears (Left & Right with dynamic fanning / flapping)
    _paintEars(canvas);

    // 3. Elephant Body & Cute Rounded Legs
    _paintBody(canvas);

    // 4. Tamil Emerald Silk Shawl / Saddle with Gold Trim & Medallion
    _paintTamilSilkSaddle(canvas);

    // 5. Elephant Head (Rounded with 3D radial shading)
    _paintHead(canvas);

    // 6. Traditional Tamil Forehead Ornament (நெற்றிப்பட்டம் & திலகம்)
    _paintNettipattam(canvas);

    // 7. Tusks (Pair of cute curved ivory tusks with 3D drop shadow)
    _paintTusks(canvas);

    // 8. Eyes & Cheerful Expressions (Anime / Game aesthetic with sparkles)
    _paintEyes(canvas);

    // 9. Rosy Blushing Cheeks
    _paintCheeks(canvas);

    // 10. Expressive Animated Trunk (Curling, lifting, waving, trumpeting)
    _paintTrunk(canvas);

    // 11. State-Specific Accessories (Crown for levelUp, Flames for streak, Sparkles)
    _paintAccessories(canvas);

    canvas.restore();
  }

  void _paintAura(Canvas canvas, Offset center) {
    if (state == MascotState.levelUp || state == MascotState.celebrating) {
      final goldGlow = Paint()
        ..color = AppColors.amber.withValues(alpha: 0.28)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 22);
      canvas.drawCircle(center, 52, goldGlow);
    } else if (state == MascotState.streak) {
      final flameGlow = Paint()
        ..color = AppColors.rose.withValues(alpha: 0.3)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 24);
      canvas.drawCircle(center, 54, flameGlow);

      // Procedural flame rays
      final flamePaint = Paint()
        ..shader = const LinearGradient(
          colors: [Color(0xFFF97316), Color(0xFFE11D48), Colors.transparent],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ).createShader(const Rect.fromLTWH(20, 10, 100, 100))
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);
      canvas.drawCircle(const Offset(70, 60), 48, flamePaint);
    } else if (state == MascotState.dailyComplete || state == MascotState.quizCorrect) {
      final emeraldGlow = Paint()
        ..color = AppColors.emerald.withValues(alpha: 0.22)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 18);
      canvas.drawCircle(center, 50, emeraldGlow);
    }
  }

  void _paintEars(Canvas canvas) {
    // Dynamic ear flap angles based on state
    double leftEarAngle = math.sin(idleProgress * 2 * math.pi) * 0.05;
    double rightEarAngle = -leftEarAngle;

    if (state == MascotState.excited ||
        state == MascotState.celebrating ||
        state == MascotState.levelUp) {
      final flap = math.sin(actionProgress * 4 * math.pi) * 0.16;
      leftEarAngle += flap;
      rightEarAngle -= flap;
    } else if (state == MascotState.thinking) {
      leftEarAngle -= 0.14; // Left ear cocked
    } else if (state == MascotState.sad) {
      leftEarAngle += 0.10; // Drooped ears
      rightEarAngle -= 0.10;
    }

    // Left Ear
    canvas.save();
    canvas.translate(42, 54);
    canvas.rotate(leftEarAngle);
    canvas.translate(-42, -54);

    // Left Outer Ear
    final outerEarPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFF64748B), Color(0xFF475569), Color(0xFF334155)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(const Rect.fromLTWH(12, 30, 42, 50));

    final leftEarPath = Path()
      ..moveTo(42, 45)
      ..cubicTo(18, 32, 10, 52, 16, 70)
      ..cubicTo(20, 84, 34, 88, 44, 76)
      ..close();
    canvas.drawPath(leftEarPath, outerEarPaint);

    // Left Inner Ear (Warm translucent pink)
    final innerEarPaint = Paint()
      ..shader = RadialGradient(
        colors: [
          const Color(0xFFFDA4AF).withValues(alpha: 0.55),
          const Color(0xFFF472B6).withValues(alpha: 0.25),
          Colors.transparent,
        ],
      ).createShader(const Rect.fromLTWH(18, 42, 28, 36));

    final leftInnerPath = Path()
      ..moveTo(40, 48)
      ..cubicTo(24, 38, 18, 54, 22, 68)
      ..cubicTo(26, 78, 36, 80, 42, 70)
      ..close();
    canvas.drawPath(leftInnerPath, innerEarPaint);
    canvas.restore();

    // Right Ear
    canvas.save();
    canvas.translate(98, 54);
    canvas.rotate(rightEarAngle);
    canvas.translate(-98, -54);

    // Right Outer Ear
    final rightEarPath = Path()
      ..moveTo(98, 45)
      ..cubicTo(122, 32, 130, 52, 124, 70)
      ..cubicTo(120, 84, 106, 88, 96, 76)
      ..close();
    canvas.drawPath(rightEarPath, outerEarPaint);

    // Right Inner Ear
    final rightInnerPath = Path()
      ..moveTo(100, 48)
      ..cubicTo(116, 38, 122, 54, 118, 68)
      ..cubicTo(114, 78, 104, 80, 98, 70)
      ..close();
    canvas.drawPath(rightInnerPath, innerEarPaint);
    canvas.restore();
  }

  void _paintBody(Canvas canvas) {
    // Body Drop Shadow
    final shadowPaint = Paint()
      ..color = Colors.black.withValues(alpha: 0.35)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8);
    canvas.drawOval(const Rect.fromLTWH(42, 110, 56, 16), shadowPaint);

    // Rounded Stout Body
    final bodyPaint = Paint()
      ..shader = const RadialGradient(
        center: Alignment(-0.25, -0.3),
        radius: 0.9,
        colors: [Color(0xFF64748B), Color(0xFF475569), Color(0xFF1E293B)],
      ).createShader(const Rect.fromLTWH(38, 68, 64, 52));

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(38, 68, 64, 48),
        const Radius.circular(28),
      ),
      bodyPaint,
    );

    // Cute Front Legs
    final legPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFF475569), Color(0xFF334155), Color(0xFF1E293B)],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(const Rect.fromLTWH(42, 94, 56, 26));

    // Left leg
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(46, 96, 18, 22),
        const Radius.circular(9),
      ),
      legPaint,
    );

    // Right leg
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(76, 96, 18, 22),
        const Radius.circular(9),
      ),
      legPaint,
    );

    // Cute Toes (Golden-slate accents)
    final toePaint = Paint()..color = const Color(0xFF94A3B8);
    for (int i = 0; i < 3; i++) {
      canvas.drawCircle(Offset(49.0 + i * 5.5, 115), 1.8, toePaint);
      canvas.drawCircle(Offset(79.0 + i * 5.5, 115), 1.8, toePaint);
    }
  }

  void _paintTamilSilkSaddle(Canvas canvas) {
    // Emerald green satin drape with gold embroidered border
    final silkPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFF34D399), Color(0xFF10B981), Color(0xFF047857)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(const Rect.fromLTWH(44, 76, 52, 24));

    final silkPath = Path()
      ..moveTo(46, 78)
      ..quadraticBezierTo(70, 84, 94, 78)
      ..lineTo(90, 96)
      ..quadraticBezierTo(70, 102, 50, 96)
      ..close();
    canvas.drawPath(silkPath, silkPaint);

    // Gold Trim Border
    final goldTrim = Paint()
      ..color = const Color(0xFFFBBF24)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.0;
    canvas.drawPath(silkPath, goldTrim);

    // Chest Gold Bell / Amulet Medallion
    canvas.drawCircle(
      const Offset(70, 96),
      4.5,
      Paint()..color = const Color(0xFFF59E0B),
    );
    canvas.drawCircle(
      const Offset(70, 96),
      2.5,
      Paint()..color = const Color(0xFF10B981),
    );
  }

  void _paintHead(Canvas canvas) {
    // 3D Spherical Head Shading
    final headPaint = Paint()
      ..shader = const RadialGradient(
        center: Alignment(-0.25, -0.35),
        radius: 0.95,
        colors: [
          Color(0xFF94A3B8), // Soft top-left specular ambient
          Color(0xFF64748B),
          Color(0xFF475569),
          Color(0xFF1E293B),
        ],
      ).createShader(const Rect.fromLTWH(38, 24, 64, 60));

    canvas.drawCircle(const Offset(70, 52), 31, headPaint);

    // Subtle forehead temple bump curves (authentic elephant anatomy)
    final bumpPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.08)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);
    canvas.drawCircle(const Offset(59, 36), 8, bumpPaint);
    canvas.drawCircle(const Offset(81, 36), 8, bumpPaint);
  }

  void _paintNettipattam(Canvas canvas) {
    // Traditional Tamil Temple Elephant Forehead Ornament (நெற்றிப்பட்டம்)
    // 1. Curved Gold Brow Band
    final bandPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFFFBBF24), Color(0xFFF59E0B), Color(0xFFD97706)],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(const Rect.fromLTWH(52, 28, 36, 14));

    final bandPath = Path()
      ..moveTo(54, 38)
      ..quadraticBezierTo(70, 32, 86, 38)
      ..quadraticBezierTo(70, 36, 54, 38);
    canvas.drawPath(bandPath, bandPaint..style = PaintingStyle.stroke..strokeWidth = 3.5);

    // 2. Beaded Gold Dots
    final dotPaint = Paint()..color = const Color(0xFFFEF08A);
    for (int i = 0; i <= 6; i++) {
      final t = i / 6.0;
      final x = 54 + t * 32;
      final y = 38 - math.sin(t * math.pi) * 4;
      canvas.drawCircle(Offset(x, y), 1.2, dotPaint);
    }

    // 3. Central Sacred Tilakam (நெற்றித் திலகம்) with Glowing Gem
    final tilakPath = Path()
      ..moveTo(70, 31)
      ..cubicTo(67, 36, 67, 43, 70, 46)
      ..cubicTo(73, 43, 73, 36, 70, 31)
      ..close();

    final tilakPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFFFBBF24), Color(0xFFE11D48)],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(const Rect.fromLTWH(67, 31, 6, 15));
    canvas.drawPath(tilakPath, tilakPaint);

    // Ruby Center Gem
    canvas.drawCircle(
      const Offset(70, 41),
      2.0,
      Paint()..color = const Color(0xFFBE123C),
    );
    canvas.drawCircle(
      const Offset(69.5, 40.5),
      0.8,
      Paint()..color = Colors.white,
    );
  }

  void _paintTusks(Canvas canvas) {
    // Ivory Small Curved Tusks with 3D drop shadow
    final tuskShadow = Paint()
      ..color = Colors.black.withValues(alpha: 0.3)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2);

    final tuskPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Colors.white, Color(0xFFF1F5F9), Color(0xFFCBD5E1)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(const Rect.fromLTWH(50, 64, 40, 20));

    // Left Tusk
    final leftTuskPath = Path()
      ..moveTo(56, 66)
      ..quadraticBezierTo(48, 70, 50, 78)
      ..quadraticBezierTo(53, 75, 59, 70)
      ..close();
    canvas.drawPath(leftTuskPath, tuskShadow);
    canvas.drawPath(leftTuskPath, tuskPaint);

    // Right Tusk
    final rightTuskPath = Path()
      ..moveTo(84, 66)
      ..quadraticBezierTo(92, 70, 90, 78)
      ..quadraticBezierTo(87, 75, 81, 70)
      ..close();
    canvas.drawPath(rightTuskPath, tuskShadow);
    canvas.drawPath(rightTuskPath, tuskPaint);
  }

  void _paintEyes(Canvas canvas) {
    final leftEyeCenter = const Offset(55, 48);
    final rightEyeCenter = const Offset(85, 48);

    if (state == MascotState.happy ||
        state == MascotState.celebrating ||
        state == MascotState.quizCorrect ||
        state == MascotState.dailyComplete) {
      // Cheerful curved smiling eyes (^_^)
      final smileEyePaint = Paint()
        ..color = const Color(0xFF0F172A)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3.2
        ..strokeCap = StrokeCap.round;

      final leftArc = Path()
        ..moveTo(49, 50)
        ..quadraticBezierTo(55, 42, 61, 50);
      canvas.drawPath(leftArc, smileEyePaint);

      final rightArc = Path()
        ..moveTo(79, 50)
        ..quadraticBezierTo(85, 42, 91, 50);
      canvas.drawPath(rightArc, smileEyePaint);
    } else if (blink) {
      // Sleek blinking eye line
      final blinkPaint = Paint()
        ..color = const Color(0xFF0F172A)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.8
        ..strokeCap = StrokeCap.round;

      canvas.drawLine(const Offset(49, 48), const Offset(61, 48), blinkPaint);
      canvas.drawLine(const Offset(79, 48), const Offset(91, 48), blinkPaint);
    } else {
      // Expressive Anime/Game Eyes
      _paintSingleEye(canvas, leftEyeCenter, isLeft: true);
      _paintSingleEye(canvas, rightEyeCenter, isLeft: false);
    }
  }

  void _paintSingleEye(Canvas canvas, Offset center, {required bool isLeft}) {
    // Sclera (White)
    canvas.drawCircle(center, 7.5, Paint()..color = Colors.white);

    // Eye Iris (Deep Midnight Slate-Cyan)
    final lookOffsetX = (state == MascotState.thinking) ? 2.5 : 0.0;
    final lookOffsetY = (state == MascotState.thinking) ? -2.0 : 0.0;

    final irisCenter = Offset(center.dx + lookOffsetX, center.dy + lookOffsetY);
    final irisPaint = Paint()
      ..shader = const RadialGradient(
        colors: [Color(0xFF38BDF8), Color(0xFF0369A1), Color(0xFF0F172A)],
      ).createShader(Rect.fromCircle(center: irisCenter, radius: 5.5));
    canvas.drawCircle(irisCenter, 5.5, irisPaint);

    // Specular Sparkle Dots (Gives consciousness & charm)
    canvas.drawCircle(
      Offset(irisCenter.dx - 1.8, irisCenter.dy - 1.8),
      2.0,
      Paint()..color = Colors.white,
    );
    canvas.drawCircle(
      Offset(irisCenter.dx + 1.8, irisCenter.dy + 1.8),
      1.0,
      Paint()..color = Colors.white.withValues(alpha: 0.8),
    );
  }

  void _paintCheeks(Canvas canvas) {
    final blushPaint = Paint()
      ..color = const Color(0xFFFB7185).withValues(alpha: 0.45)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);
    canvas.drawCircle(const Offset(50, 58), 6.5, blushPaint);
    canvas.drawCircle(const Offset(90, 58), 6.5, blushPaint);
  }

  void _paintTrunk(Canvas canvas) {
    // Dynamic trunk curve & shading
    final trunkPaint = Paint()
      ..shader = const LinearGradient(
        colors: [Color(0xFF64748B), Color(0xFF475569), Color(0xFF334155)],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(const Rect.fromLTWH(58, 54, 24, 50));

    final trunkShadow = Paint()
      ..color = Colors.black.withValues(alpha: 0.3)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3);

    final trunkPath = Path();

    if (state == MascotState.celebrating ||
        state == MascotState.excited ||
        state == MascotState.levelUp ||
        state == MascotState.dailyComplete ||
        state == MascotState.quizCorrect) {
      // Triumphant Raised Trunk (Trumpeting joyously upwards!)
      final wave = math.sin(actionProgress * 4 * math.pi) * 3;
      trunkPath.moveTo(63, 60);
      trunkPath.quadraticBezierTo(60, 78, 62 + wave, 86);
      trunkPath.quadraticBezierTo(64 + wave, 94, 76 + wave, 90);
      trunkPath.quadraticBezierTo(86 + wave, 82, 84 + wave, 70); // Tip curved up
      trunkPath.quadraticBezierTo(76 + wave, 72, 77, 60);
      trunkPath.close();

      canvas.drawPath(trunkPath, trunkShadow);
      canvas.drawPath(trunkPath, trunkPaint);

      // Celebration Sparkle at tip of trunk
      canvas.drawCircle(
        Offset(84 + wave, 68),
        3,
        Paint()..color = const Color(0xFFFBBF24),
      );
    } else if (state == MascotState.thinking) {
      // Pondering trunk touching cheek
      trunkPath.moveTo(63, 60);
      trunkPath.quadraticBezierTo(66, 78, 56, 82);
      trunkPath.quadraticBezierTo(48, 76, 52, 68); // Tip curled touching left cheek
      trunkPath.quadraticBezierTo(58, 68, 77, 60);
      trunkPath.close();

      canvas.drawPath(trunkPath, trunkShadow);
      canvas.drawPath(trunkPath, trunkPaint);
    } else if (state == MascotState.sad) {
      // Soft downward curved trunk
      trunkPath.moveTo(64, 60);
      trunkPath.quadraticBezierTo(65, 82, 68, 96);
      trunkPath.quadraticBezierTo(70, 100, 74, 96);
      trunkPath.quadraticBezierTo(75, 82, 76, 60);
      trunkPath.close();

      canvas.drawPath(trunkPath, trunkShadow);
      canvas.drawPath(trunkPath, trunkPaint);
    } else {
      // Idle / Happy: Gentle playful curl
      final sway = math.sin(idleProgress * 2 * math.pi) * 3;
      trunkPath.moveTo(63, 60);
      trunkPath.quadraticBezierTo(64, 76, 68 + sway, 88);
      trunkPath.quadraticBezierTo(72 + sway, 96, 78 + sway, 92);
      trunkPath.quadraticBezierTo(82 + sway, 88, 79 + sway, 84); // Tip curled slightly up
      trunkPath.quadraticBezierTo(74 + sway, 80, 77, 60);
      trunkPath.close();

      canvas.drawPath(trunkPath, trunkShadow);
      canvas.drawPath(trunkPath, trunkPaint);
    }

    // Trunk Skin Wrinkle Folds (3D detail)
    final ringPaint = Paint()
      ..color = const Color(0xFF334155).withValues(alpha: 0.6)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.4;
    canvas.drawLine(const Offset(65, 68), const Offset(75, 68), ringPaint);
    canvas.drawLine(const Offset(66, 74), const Offset(74, 74), ringPaint);
  }

  void _paintAccessories(Canvas canvas) {
    if (state == MascotState.levelUp) {
      // Royal Tamil Ceremonial Golden Crown (கிரீடம்) with Ruby Gemstones
      final crownPaint = Paint()
        ..shader = const LinearGradient(
          colors: [Color(0xFFFEF08A), Color(0xFFF59E0B), Color(0xFFD97706)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ).createShader(const Rect.fromLTWH(50, 4, 40, 24));

      final crownPath = Path()
        ..moveTo(52, 24)
        ..lineTo(54, 12)
        ..lineTo(62, 18)
        ..lineTo(70, 6)
        ..lineTo(78, 18)
        ..lineTo(86, 12)
        ..lineTo(88, 24)
        ..close();
      canvas.drawPath(crownPath, crownPaint);

      // Ruby in Crown Center
      canvas.drawCircle(const Offset(70, 15), 2.8, Paint()..color = const Color(0xFFE11D48));
      canvas.drawCircle(const Offset(69.5, 14.5), 1.0, Paint()..color = Colors.white);
    } else if (state == MascotState.streak) {
      // Floating Flame Icon near shoulder
      final flamePaint = Paint()..color = const Color(0xFFF97316);
      final flamePath = Path()
        ..moveTo(96, 78)
        ..quadraticBezierTo(106, 62, 102, 54)
        ..quadraticBezierTo(98, 64, 93, 68)
        ..quadraticBezierTo(88, 58, 86, 56)
        ..quadraticBezierTo(84, 72, 92, 82)
        ..close();
      canvas.drawPath(flamePath, flamePaint);
      canvas.drawCircle(
        const Offset(95, 74),
        3.5,
        Paint()..color = const Color(0xFFFDE047),
      );
    } else if (state == MascotState.thinking) {
      // Thought question mark
      final qPaint = Paint()
        ..color = const Color(0xFF38BDF8)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5
        ..strokeCap = StrokeCap.round;
      final qPath = Path()
        ..moveTo(96, 24)
        ..cubicTo(96, 16, 106, 16, 106, 24)
        ..cubicTo(106, 30, 101, 30, 101, 35);
      canvas.drawPath(qPath, qPaint);
      canvas.drawCircle(const Offset(101, 41), 1.6, Paint()..color = const Color(0xFF38BDF8));
    } else if (state == MascotState.celebrating || state == MascotState.dailyComplete) {
      // Celebration Confetti stars
      final starPaint = Paint()..color = const Color(0xFFFBBF24);
      final confetti1 = Paint()..color = const Color(0xFF34D399);
      final confetti2 = Paint()..color = const Color(0xFFF43F5E);

      canvas.drawCircle(const Offset(32, 28), 2.5, starPaint);
      canvas.drawCircle(const Offset(108, 26), 3.0, starPaint);
      canvas.drawCircle(const Offset(24, 62), 2.0, confetti1);
      canvas.drawCircle(const Offset(116, 58), 2.2, confetti2);
    }
  }

  @override
  bool shouldRepaint(covariant EzhuthaaniElephantPainter oldDelegate) {
    return oldDelegate.state != state ||
        oldDelegate.blink != blink ||
        oldDelegate.idleProgress != idleProgress ||
        oldDelegate.actionProgress != actionProgress ||
        oldDelegate.celebrateProgress != celebrateProgress;
  }
}
