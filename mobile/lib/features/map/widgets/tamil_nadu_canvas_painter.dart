import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class TamilNaduCanvasPainter extends CustomPainter {
  final double canvasWidth;
  final double canvasHeight;
  final String? highlightedRegion;

  TamilNaduCanvasPainter({
    required this.canvasWidth,
    required this.canvasHeight,
    this.highlightedRegion,
  });

  // Geographic bounds of Tamil Nadu
  static const double minLat = 8.0;
  static const double maxLat = 13.6;
  static const double minLng = 76.2;
  static const double maxLng = 80.5;

  /// Converts geographic (lat, lng) to canvas (x, y)
  static Offset geoToCanvas(double lat, double lng, double width, double height) {
    final nx = (lng - minLng) / (maxLng - minLng);
    final ny = (maxLat - lat) / (maxLat - minLat);
    return Offset(
      (nx * width).clamp(0.0, width),
      (ny * height).clamp(0.0, height),
    );
  }

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // 1. Surrounding Ocean & Waters (Deep Navy Cultural Palette)
    _paintOceanBackground(canvas, w, h);

    // 2. Surrounding Water Wave Ribbons (Bay of Bengal & Indian Ocean)
    _paintOceanRipples(canvas, w, h);

    // 3. Tamil Nadu Main Landmass Silhouette
    final statePath = _buildTamilNaduPath(w, h);

    // Draw Landmass Shadow / Depth
    final shadowPaint = Paint()
      ..color = Colors.black.withValues(alpha: 0.5)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 18);
    canvas.drawPath(statePath.shift(const Offset(4, 10)), shadowPaint);

    // Landmass Base Parchment/Stone Fill
    final landGradient = LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        const Color(0xFF1E293B), // Slate deep
        const Color(0xFF0F172A), // Dark cultural slate
        const Color(0xFF151E2E),
      ],
    );
    final landPaint = Paint()
      ..shader = landGradient.createShader(Rect.fromLTWH(0, 0, w, h))
      ..style = PaintingStyle.fill;
    canvas.drawPath(statePath, landPaint);

    // 4. Cultural Historical Regions (Shaded Kingdoms)
    _paintHistoricRegions(canvas, w, h, statePath);

    // 5. Sacred Rivers of Tamil Nadu (Kaveri, Vaigai, Thamirabarani)
    _paintRivers(canvas, w, h, statePath);

    // 6. State Coastline & Border Outlines
    final borderGlow = Paint()
      ..color = AppColors.amber.withValues(alpha: 0.35)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.5
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 4);
    canvas.drawPath(statePath, borderGlow);

    final borderStroke = Paint()
      ..color = AppColors.amber.withValues(alpha: 0.8)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.8;
    canvas.drawPath(statePath, borderStroke);

    // 7. Traditional Compass Rose (திசைமானி)
    _paintCompassRose(canvas, w * 0.82, h * 0.84);

    // 8. Cultural Sea Labels (வங்காள விரிகுடா, மன்னார் வளைகுடா, இந்தியப் பெருங்கடல்)
    _paintOceanLabels(canvas, w, h);

    // 9. Historic Realm Callouts (சோழ நாடு, பாண்டிய நாடு, etc.)
    _paintRegionLabels(canvas, w, h);
  }

  void _paintOceanBackground(Canvas canvas, double w, double h) {
    final oceanGrad = RadialGradient(
      center: Alignment.center,
      radius: 1.2,
      colors: [
        const Color(0xFF0A101D),
        const Color(0xFF060911),
      ],
    );
    canvas.drawRect(
      Rect.fromLTWH(0, 0, w, h),
      Paint()..shader = oceanGrad.createShader(Rect.fromLTWH(0, 0, w, h)),
    );
  }

  void _paintOceanRipples(Canvas canvas, double w, double h) {
    final ripplePaint = Paint()
      ..color = const Color(0xFF1E3A5F).withValues(alpha: 0.22)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;

    for (int i = 0; i < 6; i++) {
      final yOffset = h * 0.15 + (i * h * 0.12);
      final path = Path();
      path.moveTo(w * 0.85, yOffset);
      path.quadraticBezierTo(
        w * 0.92,
        yOffset - 15,
        w * 0.98,
        yOffset,
      );
      canvas.drawPath(path, ripplePaint);
    }
  }

  Path _buildTamilNaduPath(double w, double h) {
    final p = Path();

    // Accurate Tamil Nadu state boundary (normalized coordinates):
    // Starting at Pulicat Lake / Chennai north border
    final start = _toCanvas(0.94, 0.08, w, h);
    p.moveTo(start.dx, start.dy);

    // Down the Coromandel coast
    _curveTo(p, 0.94, 0.11, 0.93, 0.15, w, h); // Chennai
    _curveTo(p, 0.92, 0.19, 0.90, 0.25, w, h); // Mamallapuram
    _curveTo(p, 0.88, 0.29, 0.86, 0.35, w, h); // Marakkanam / Pondicherry
    _curveTo(p, 0.84, 0.40, 0.83, 0.44, w, h); // Cuddalore / Poompuhar

    // Kaveri Delta Bulge extending east towards Point Calimere (Kodikkarai)
    _curveTo(p, 0.85, 0.48, 0.87, 0.52, w, h); // Nagapattinam
    _curveTo(p, 0.88, 0.55, 0.84, 0.58, w, h); // Point Calimere tip
    _curveTo(p, 0.79, 0.60, 0.73, 0.61, w, h); // Adirampattinam / Palk Strait
    _curveTo(p, 0.69, 0.64, 0.68, 0.69, w, h); // Devipattinam

    // Pamban / Rameswaram eastward projection
    _curveTo(p, 0.74, 0.71, 0.77, 0.72, w, h); // Rameswaram
    _curveTo(p, 0.75, 0.74, 0.67, 0.75, w, h); // Gulf of Mannar entrance
    _curveTo(p, 0.62, 0.77, 0.58, 0.81, w, h); // Thoothukudi coast
    _curveTo(p, 0.53, 0.85, 0.49, 0.90, w, h); // Tiruchendur
    _curveTo(p, 0.44, 0.93, 0.38, 0.96, w, h); // Kudankulam

    // Southernmost Cape tip: Kanyakumari (Cape Comorin)
    _curveTo(p, 0.34, 0.98, 0.31, 0.99, w, h);

    // Western Ghats running northwest towards Nilgiris
    _curveTo(p, 0.27, 0.97, 0.25, 0.92, w, h); // Nagercoil / Western Ghats
    _curveTo(p, 0.24, 0.86, 0.23, 0.81, w, h); // Tenkasi / Shenkottai Gap
    _curveTo(p, 0.25, 0.75, 0.24, 0.68, w, h); // Srivilliputhur / Rajapalayam
    _curveTo(p, 0.22, 0.62, 0.20, 0.56, w, h); // Anamalai / Pollachi
    _curveTo(p, 0.17, 0.52, 0.16, 0.48, w, h); // Palakkad Gap indent
    _curveTo(p, 0.14, 0.43, 0.14, 0.39, w, h); // Nilgiris (Ooty westernmost peak)
    _curveTo(p, 0.16, 0.36, 0.20, 0.34, w, h); // Moyar river gorge

    // Northern Border running northeast
    _curveTo(p, 0.25, 0.33, 0.32, 0.32, w, h); // Sathyamangalam / Erode north
    _curveTo(p, 0.38, 0.29, 0.41, 0.23, w, h); // Dharmapuri / Krishnagiri salient
    _curveTo(p, 0.46, 0.21, 0.54, 0.20, w, h); // Jolarpettai / Yelagiri
    _curveTo(p, 0.62, 0.18, 0.70, 0.16, w, h); // Vellore / Ranipet
    _curveTo(p, 0.78, 0.13, 0.86, 0.10, w, h); // Arakkonam / Tiruvallur
    _curveTo(p, 0.90, 0.08, 0.94, 0.08, w, h); // Back to Pulicat Lake

    p.close();
    return p;
  }

  void _paintHistoricRegions(Canvas canvas, double w, double h, Path clipPath) {
    canvas.save();
    canvas.clipPath(clipPath);

    // 1. Chola Kaveri Delta (Warm Gold / Amber Tint)
    final cholaPaint = Paint()
      ..color = const Color(0xFFF59E0B).withValues(alpha: 0.12)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 30);
    canvas.drawCircle(_toCanvas(0.70, 0.48, w, h), w * 0.20, cholaPaint);

    // 2. Pandya Nadu (Royal Crimson / Rose Tint)
    final pandyaPaint = Paint()
      ..color = const Color(0xFFE11D48).withValues(alpha: 0.11)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 35);
    canvas.drawCircle(_toCanvas(0.48, 0.68, w, h), w * 0.22, pandyaPaint);

    // 3. Pallava Tondai Nadu (Sky Cyan Tint)
    final pallavaPaint = Paint()
      ..color = const Color(0xFF0284C7).withValues(alpha: 0.12)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 30);
    canvas.drawCircle(_toCanvas(0.82, 0.18, w, h), w * 0.18, pallavaPaint);

    // 4. Kongu Nadu (Purple / Violet Tint)
    final konguPaint = Paint()
      ..color = const Color(0xFF7C3AED).withValues(alpha: 0.10)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 30);
    canvas.drawCircle(_toCanvas(0.32, 0.45, w, h), w * 0.18, konguPaint);

    // 5. Southern Realm (Emerald Green Tint)
    final southPaint = Paint()
      ..color = const Color(0xFF059669).withValues(alpha: 0.12)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 28);
    canvas.drawCircle(_toCanvas(0.38, 0.88, w, h), w * 0.16, southPaint);

    canvas.restore();
  }

  void _paintRivers(Canvas canvas, double w, double h, Path clipPath) {
    canvas.save();
    canvas.clipPath(clipPath);

    final riverPaint = Paint()
      ..color = const Color(0xFF38BDF8).withValues(alpha: 0.55)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.8
      ..strokeCap = StrokeCap.round;

    // 1. Kaveri River (காவிரி ஆறு)
    final kaveri = Path();
    kaveri.moveTo(_toCanvas(0.30, 0.36, w, h).dx, _toCanvas(0.30, 0.36, w, h).dy); // Mettur entry
    kaveri.quadraticBezierTo(
      _toCanvas(0.42, 0.42, w, h).dx,
      _toCanvas(0.42, 0.42, w, h).dy,
      _toCanvas(0.55, 0.48, w, h).dx,
      _toCanvas(0.55, 0.48, w, h).dy, // Erode / Karur to Trichy
    );
    // Delta Fan Branches
    kaveri.quadraticBezierTo(
      _toCanvas(0.68, 0.49, w, h).dx,
      _toCanvas(0.68, 0.49, w, h).dy,
      _toCanvas(0.85, 0.46, w, h).dx,
      _toCanvas(0.85, 0.46, w, h).dy, // Poompuhar / Kollidam
    );
    canvas.drawPath(kaveri, riverPaint);

    // Kaveri south delta branch (Vennar)
    final deltaBranch = Path();
    deltaBranch.moveTo(_toCanvas(0.60, 0.49, w, h).dx, _toCanvas(0.60, 0.49, w, h).dy);
    deltaBranch.quadraticBezierTo(
      _toCanvas(0.70, 0.53, w, h).dx,
      _toCanvas(0.70, 0.53, w, h).dy,
      _toCanvas(0.86, 0.54, w, h).dx,
      _toCanvas(0.86, 0.54, w, h).dy, // Nagapattinam
    );
    canvas.drawPath(deltaBranch, riverPaint..strokeWidth = 1.2);

    // 2. Vaigai River (வைகை ஆறு)
    final vaigai = Path();
    vaigai.moveTo(_toCanvas(0.30, 0.65, w, h).dx, _toCanvas(0.30, 0.65, w, h).dy);
    vaigai.quadraticBezierTo(
      _toCanvas(0.45, 0.66, w, h).dx,
      _toCanvas(0.45, 0.66, w, h).dy, // Madurai
      _toCanvas(0.70, 0.70, w, h).dx,
      _toCanvas(0.70, 0.70, w, h).dy, // Palk Strait
    );
    canvas.drawPath(vaigai, riverPaint);

    // 3. Thamirabarani River (தாமிரபரணி ஆறு)
    final thamirabarani = Path();
    thamirabarani.moveTo(_toCanvas(0.28, 0.88, w, h).dx, _toCanvas(0.28, 0.88, w, h).dy); // Pothigai
    thamirabarani.quadraticBezierTo(
      _toCanvas(0.40, 0.88, w, h).dx,
      _toCanvas(0.40, 0.88, w, h).dy, // Tirunelveli
      _toCanvas(0.53, 0.87, w, h).dx,
      _toCanvas(0.53, 0.87, w, h).dy, // Gulf of Mannar
    );
    canvas.drawPath(thamirabarani, riverPaint);

    canvas.restore();
  }

  void _paintCompassRose(Canvas canvas, double cx, double cy) {
    const r = 26.0;

    // Outer brass circle
    final circlePaint = Paint()
      ..color = AppColors.amber.withValues(alpha: 0.45)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;
    canvas.drawCircle(Offset(cx, cy), r, circlePaint);

    // 4 Pointer Stars
    final pointerPaint = Paint()
      ..color = AppColors.amberLight
      ..style = PaintingStyle.fill;

    // North needle
    final northPath = Path()
      ..moveTo(cx, cy - r + 3)
      ..lineTo(cx - 4, cy)
      ..lineTo(cx + 4, cy)
      ..close();
    canvas.drawPath(northPath, pointerPaint);

    // South needle
    final southPath = Path()
      ..moveTo(cx, cy + r - 3)
      ..lineTo(cx - 3, cy)
      ..lineTo(cx + 3, cy)
      ..close();
    canvas.drawPath(southPath, pointerPaint..color = AppColors.amber.withValues(alpha: 0.5));

    // Tamil Cardinal labels
    _drawText(canvas, 'வ', Offset(cx - 4, cy - r - 14), AppColors.amberLight, 10, bold: true);
    _drawText(canvas, 'தெ', Offset(cx - 5, cy + r + 3), AppColors.textMuted, 9);
    _drawText(canvas, 'கி', Offset(cx + r + 4, cy - 6), AppColors.textMuted, 9);
    _drawText(canvas, 'மே', Offset(cx - r - 14, cy - 6), AppColors.textMuted, 9);
  }

  void _paintOceanLabels(Canvas canvas, double w, double h) {
    _drawText(
      canvas,
      'வங்காள விரிகுடா\nBay of Bengal',
      Offset(w * 0.72, h * 0.30),
      const Color(0xFF64748B).withValues(alpha: 0.55),
      11,
      align: TextAlign.center,
    );

    _drawText(
      canvas,
      'மன்னார் வளைகுடா\nGulf of Mannar',
      Offset(w * 0.60, h * 0.75),
      const Color(0xFF64748B).withValues(alpha: 0.5),
      9.5,
      align: TextAlign.center,
    );

    _drawText(
      canvas,
      'இந்தியப் பெருங்கடல் · Indian Ocean',
      Offset(w * 0.20, h * 0.96),
      const Color(0xFF64748B).withValues(alpha: 0.45),
      10,
    );
  }

  void _paintRegionLabels(Canvas canvas, double w, double h) {
    // Elegant watermark-style ancient Tamil kingdom names
    _drawText(
      canvas,
      'தொண்டை நாடு',
      _toCanvas(0.68, 0.24, w, h),
      const Color(0xFF38BDF8).withValues(alpha: 0.35),
      12,
      bold: true,
    );

    _drawText(
      canvas,
      'சோழ நாடு',
      _toCanvas(0.65, 0.44, w, h),
      const Color(0xFFF59E0B).withValues(alpha: 0.40),
      13,
      bold: true,
    );

    _drawText(
      canvas,
      'கொங்கு நாடு',
      _toCanvas(0.26, 0.44, w, h),
      const Color(0xFFA855F7).withValues(alpha: 0.35),
      12,
      bold: true,
    );

    _drawText(
      canvas,
      'பாண்டிய நாடு',
      _toCanvas(0.44, 0.68, w, h),
      const Color(0xFFFB7185).withValues(alpha: 0.40),
      13,
      bold: true,
    );
  }

  void _drawText(
    Canvas canvas,
    String text,
    Offset offset,
    Color color,
    double fontSize, {
    bool bold = false,
    TextAlign align = TextAlign.left,
  }) {
    final textSpan = TextSpan(
      text: text,
      style: TextStyle(
        fontFamily: 'NotoSansTamil',
        color: color,
        fontSize: fontSize,
        fontWeight: bold ? FontWeight.bold : FontWeight.w500,
        letterSpacing: 0.8,
      ),
    );
    final textPainter = TextPainter(
      text: textSpan,
      textAlign: align,
      textDirection: TextDirection.ltr,
    )..layout();
    textPainter.paint(canvas, offset);
  }

  Offset _toCanvas(double nx, double ny, double w, double h) {
    return Offset(nx * w, ny * h);
  }

  void _curveTo(Path p, double cpX, double cpY, double toX, double toY, double w, double h) {
    p.quadraticBezierTo(cpX * w, cpY * h, toX * w, toY * h);
  }

  @override
  bool shouldRepaint(covariant TamilNaduCanvasPainter oldDelegate) {
    return oldDelegate.canvasWidth != canvasWidth ||
        oldDelegate.canvasHeight != canvasHeight ||
        oldDelegate.highlightedRegion != highlightedRegion;
  }
}
