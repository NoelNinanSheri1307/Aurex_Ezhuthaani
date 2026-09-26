import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'mascot_state.dart';

class MascotModel {
  final MascotState state;
  final String? customSpeech;

  const MascotModel({
    required this.state,
    this.customSpeech,
  });

  String get speech => customSpeech ?? state.defaultSpeech;

  MascotModel copyWith({
    MascotState? state,
    String? customSpeech,
    bool clearCustomSpeech = false,
  }) {
    return MascotModel(
      state: state ?? this.state,
      customSpeech: clearCustomSpeech ? null : (customSpeech ?? this.customSpeech),
    );
  }
}

class MascotController extends Notifier<MascotModel> {
  Timer? _resetTimer;

  @override
  MascotModel build() {
    ref.onDispose(() {
      _resetTimer?.cancel();
    });
    return const MascotModel(state: MascotState.idle);
  }

  void trigger(
    MascotState state, {
    String? customSpeech,
    Duration duration = const Duration(seconds: 4),
  }) {
    _resetTimer?.cancel();
    this.state = MascotModel(
      state: state,
      customSpeech: customSpeech,
    );

    if (state != MascotState.idle) {
      _resetTimer = Timer(duration, () {
        this.state = const MascotModel(state: MascotState.idle);
      });
    }
  }

  void say(
    String speech, {
    MascotState state = MascotState.happy,
    Duration duration = const Duration(seconds: 4),
  }) {
    trigger(state, customSpeech: speech, duration: duration);
  }

  void resetToIdle() {
    _resetTimer?.cancel();
    state = const MascotModel(state: MascotState.idle);
  }
}

final mascotProvider =
    NotifierProvider<MascotController, MascotModel>(MascotController.new);
