class CulturalItemModel {
  final int id;
  final String slug;
  final String contentType;
  final String titleTa;
  final String titleEn;
  final String category;
  final String summaryTa;
  final String summaryEn;
  final String? contentTa;
  final String? contentEn;
  final String? author;
  final String? region;
  final String? period;
  final int? dateOrder;
  final String? dateLabel;
  final String? era;
  final String? genre;
  final String? literaryTradition;
  final String? copyrightStatus;
  final String? externalLink;
  final String? script;
  final String? scriptLanguage;
  final String? historicalSignificance;
  final String? locationName;
  final double? latitude;
  final double? longitude;
  final String? imageUrl;
  final String? imageCaption;
  final String sourceType;
  final String sourceName;
  final String? sourceUrl;
  final String? license;
  final String? tags;
  final List<RelatedItemSummary> related;

  const CulturalItemModel({
    required this.id,
    required this.slug,
    required this.contentType,
    required this.titleTa,
    required this.titleEn,
    required this.category,
    required this.summaryTa,
    required this.summaryEn,
    this.contentTa,
    this.contentEn,
    this.author,
    this.region,
    this.period,
    this.dateOrder,
    this.dateLabel,
    this.era,
    this.genre,
    this.literaryTradition,
    this.copyrightStatus,
    this.externalLink,
    this.script,
    this.scriptLanguage,
    this.historicalSignificance,
    this.locationName,
    this.latitude,
    this.longitude,
    this.imageUrl,
    this.imageCaption,
    required this.sourceType,
    required this.sourceName,
    this.sourceUrl,
    this.license,
    this.tags,
    this.related = const [],
  });

  factory CulturalItemModel.fromJson(Map<String, dynamic> json) {
    final rawRelated = json['related'] as List<dynamic>? ?? [];
    return CulturalItemModel(
      id: json['id'] as int? ?? 0,
      slug: json['slug'] as String? ?? '',
      contentType: json['content_type'] as String? ?? 'culture',
      titleTa: json['title_ta'] as String? ?? '',
      titleEn: json['title_en'] as String? ?? '',
      category: json['category'] as String? ?? '',
      summaryTa: json['summary_ta'] as String? ?? '',
      summaryEn: json['summary_en'] as String? ?? '',
      contentTa: json['content_ta'] as String?,
      contentEn: json['content_en'] as String?,
      author: json['author'] as String?,
      region: json['region'] as String?,
      period: json['period'] as String?,
      dateOrder: json['date_order'] as int?,
      dateLabel: json['date_label'] as String?,
      era: json['era'] as String?,
      genre: json['genre'] as String?,
      literaryTradition: json['literary_tradition'] as String?,
      copyrightStatus: json['copyright_status'] as String?,
      externalLink: json['external_link'] as String?,
      script: json['script'] as String?,
      scriptLanguage: json['script_language'] as String?,
      historicalSignificance: json['historical_significance'] as String?,
      locationName: json['location_name'] as String?,
      latitude: (json['latitude'] as num?)?.toDouble(),
      longitude: (json['longitude'] as num?)?.toDouble(),
      imageUrl: json['image_url'] as String?,
      imageCaption: json['image_caption'] as String?,
      sourceType: json['source_type'] as String? ?? 'curated',
      sourceName: json['source_name'] as String? ?? 'Ezhuthaani Editorial',
      sourceUrl: json['source_url'] as String?,
      license: json['license'] as String?,
      tags: json['tags'] as String?,
      related: rawRelated.map((r) => RelatedItemSummary.fromJson(r as Map<String, dynamic>)).toList(),
    );
  }
}

class RelatedItemSummary {
  final String slug;
  final String? contentType;
  final String titleTa;
  final String titleEn;
  final String category;
  final String? imageUrl;

  const RelatedItemSummary({
    required this.slug,
    this.contentType,
    required this.titleTa,
    required this.titleEn,
    required this.category,
    this.imageUrl,
  });

  factory RelatedItemSummary.fromJson(Map<String, dynamic> json) {
    return RelatedItemSummary(
      slug: json['slug'] as String? ?? '',
      contentType: json['content_type'] as String?,
      titleTa: json['title_ta'] as String? ?? '',
      titleEn: json['title_en'] as String? ?? '',
      category: json['category'] as String? ?? '',
      imageUrl: json['image_url'] as String?,
    );
  }
}
