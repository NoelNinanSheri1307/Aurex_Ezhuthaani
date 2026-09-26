import 'package:flutter/material.dart';

class TiltCard extends StatefulWidget {
  final Widget child;
  final double maxTiltAngle;
  final VoidCallback? onTap;

  const TiltCard({
    super.key,
    required this.child,
    this.maxTiltAngle = 0.08,
    this.onTap,
  });

  @override
  State<TiltCard> createState() => _TiltCardState();
}

class _TiltCardState extends State<TiltCard> with SingleTickerProviderStateMixin {
  double _tiltX = 0.0;
  double _tiltY = 0.0;

  void _onPanUpdate(DragUpdateDetails details, Size size) {
    setState(() {
      _tiltY = ((details.localPosition.dx / size.width) - 0.5) * widget.maxTiltAngle;
      _tiltX = -((details.localPosition.dy / size.height) - 0.5) * widget.maxTiltAngle;
    });
  }

  void _resetTilt() {
    setState(() {
      _tiltX = 0.0;
      _tiltY = 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = Size(constraints.maxWidth, constraints.maxHeight);
        return GestureDetector(
          onTap: widget.onTap,
          onPanUpdate: (details) => _onPanUpdate(details, size),
          onPanEnd: (_) => _resetTilt(),
          onPanCancel: _resetTilt,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOutCubic,
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001) // perspective
              ..rotateX(_tiltX)
              ..rotateY(_tiltY),
            transformAlignment: FractionalOffset.center,
            child: widget.child,
          ),
        );
      },
    );
  }
}
