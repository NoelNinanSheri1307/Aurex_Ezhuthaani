import 'dart:convert';
import 'dart:math';
import 'package:flutter/services.dart';
import '../models/thirukkural_model.dart';

class ThirukkuralRepository {
  List<KuralModel>? _kurals;

  Future<List<KuralModel>> getAllKurals() async {
    if (_kurals != null) return _kurals!;

    final raw = await rootBundle.loadString('assets/data/thirukkural.json');
    final Map<String, dynamic> json = jsonDecode(raw);
    final list = json['kural'] as List<dynamic>? ?? [];
    _kurals = list.map((k) => KuralModel.fromJson(k as Map<String, dynamic>)).toList();
    return _kurals!;
  }

  Future<KuralModel> getKuralOfTheDay() async {
    final kurals = await getAllKurals();
    final dayOfYear = DateTime.now().difference(DateTime(DateTime.now().year, 1, 1)).inDays;
    final index = dayOfYear % kurals.length;
    return kurals[index];
  }

  Future<KuralModel> getRandomKural() async {
    final kurals = await getAllKurals();
    final rand = Random().nextInt(kurals.length);
    return kurals[rand];
  }

  Future<KuralModel?> getKuralByNumber(int number) async {
    final kurals = await getAllKurals();
    return kurals.firstWhere(
      (k) => k.number == number,
      orElse: () => kurals.first,
    );
  }

  Future<List<KuralModel>> searchKurals(String query) async {
    final kurals = await getAllKurals();
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return kurals.take(20).toList();

    return kurals.where((k) {
      return k.line1.contains(q) ||
          k.line2.contains(q) ||
          k.translation.toLowerCase().contains(q) ||
          k.explanation.toLowerCase().contains(q) ||
          k.number.toString() == q;
    }).toList();
  }
}
