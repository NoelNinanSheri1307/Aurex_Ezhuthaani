import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/providers.dart';
import '../../data/models/curriculum_model.dart';

final curriculumFutureProvider = FutureProvider<CurriculumModel>((ref) async {
  final repo = ref.watch(curriculumRepositoryProvider);
  return await repo.getCurriculum();
});
