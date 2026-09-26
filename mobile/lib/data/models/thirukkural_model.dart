class KuralModel {
  final int number;
  final String line1;
  final String line2;
  final String translation;
  final String mv;
  final String sp;
  final String mk;
  final String explanation;
  final String couplet;
  final String transliteration1;
  final String transliteration2;

  const KuralModel({
    required this.number,
    required this.line1,
    required this.line2,
    required this.translation,
    required this.mv,
    required this.sp,
    required this.mk,
    required this.explanation,
    required this.couplet,
    required this.transliteration1,
    required this.transliteration2,
  });

  factory KuralModel.fromJson(Map<String, dynamic> json) {
    return KuralModel(
      number: json['Number'] as int? ?? 0,
      line1: json['Line1'] as String? ?? '',
      line2: json['Line2'] as String? ?? '',
      translation: json['Translation'] as String? ?? '',
      mv: json['mv'] as String? ?? '',
      sp: json['sp'] as String? ?? '',
      mk: json['mk'] as String? ?? '',
      explanation: json['explanation'] as String? ?? '',
      couplet: json['couplet'] as String? ?? '',
      transliteration1: json['transliteration1'] as String? ?? '',
      transliteration2: json['transliteration2'] as String? ?? '',
    );
  }
}
