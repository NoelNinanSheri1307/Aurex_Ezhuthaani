import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/animations/fade_slide_transition.dart';
import '../../core/animations/scale_on_press.dart';
import '../../core/providers.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/utils/tamil_grapheme_utils.dart';
import '../../core/widgets/animated_button.dart';
import '../../core/widgets/glass_card.dart';
import '../../core/widgets/state_views.dart';
import '../../data/models/crossword_model.dart';
import '../auth/auth_provider.dart';
import '../mascot/mascot_controller.dart';
import '../mascot/mascot_state.dart';

class CrosswordScreen extends ConsumerStatefulWidget {
  const CrosswordScreen({super.key});

  @override
  ConsumerState<CrosswordScreen> createState() => _CrosswordScreenState();
}

class _CrosswordScreenState extends ConsumerState<CrosswordScreen> {
  CrosswordPuzzleModel? _puzzle;
  bool _isLoading = true;
  String? _error;

  int _selectedRow = 0;
  int _selectedCol = 0;
  final Map<String, String> _userAnswers = {};

  int _secondsElapsed = 0;
  Timer? _timer;
  bool _isSubmitting = false;
  CrosswordSubmitResultModel? _result;

  int _keypadTab = 0; // 0: Puzzle Letters, 1: Uyir (Vowels), 2: Mei (Pulli), 3: Consonants
  String? _selectedConsonantForSyllables;

  List<String> get _puzzleLetters {
    if (_puzzle == null) return TamilGraphemeUtils.uyirLetters;
    final set = <String>{};
    for (final row in _puzzle!.cells) {
      for (final cell in row) {
        if (!cell.isBlocked && cell.char.isNotEmpty) {
          set.addAll(TamilGraphemeUtils.splitGraphemes(cell.char));
        }
      }
    }
    for (final clue in [..._puzzle!.cluesAcross, ..._puzzle!.cluesDown]) {
      set.addAll(TamilGraphemeUtils.splitGraphemes(clue.answer));
    }
    final decoys = ['க', 'தி', 'ம', 'வா', 'நி', 'வி', 'சு', 'ல்', 'து', 'பொ', 'ப', 'த'];
    for (final d in decoys) {
      if (set.length < 20) set.add(d);
    }
    final list = set.toList();
    list.sort();
    return list;
  }

  @override
  void initState() {
    super.initState();
    _fetchCrossword();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() => _secondsElapsed++);
    });
  }

  Future<void> _fetchCrossword() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final repo = ref.read(dailyEngagementRepositoryProvider);
      final p = await repo.getDailyCrosswordToday();
      if (mounted) {
        setState(() {
          _puzzle = p;
          _isLoading = false;
        });

        if (!p.completed) {
          _startTimer();
          // Find first unblocked cell
          for (int r = 0; r < p.gridSize; r++) {
            for (int c = 0; c < p.gridSize; c++) {
              if (!p.cells[r][c].isBlocked) {
                _selectedRow = r;
                _selectedCol = c;
                return;
              }
            }
          }
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  void _selectCell(int r, int c) {
    if (_puzzle == null || _puzzle!.cells[r][c].isBlocked) return;
    HapticFeedback.selectionClick();
    setState(() {
      _selectedRow = r;
      _selectedCol = c;
    });
  }

  void _onKeyPress(String input) {
    HapticFeedback.lightImpact();
    final key = '$_selectedRow,$_selectedCol';
    final current = _userAnswers[key] ?? '';

    // If input is a combining vowel mark or pulli and current cell has a base consonant, combine them
    if (TamilGraphemeUtils.isCombiningMark(input) && current.isNotEmpty) {
      final combined = TamilGraphemeUtils.combine(current, input);
      setState(() {
        _userAnswers[key] = combined;
      });
      _advanceToNextCell();
      return;
    }

    // Otherwise, ensure exactly one complete grapheme cluster is placed in the cell
    final graphemes = TamilGraphemeUtils.splitGraphemes(input);
    final grapheme = graphemes.isNotEmpty ? graphemes.first : input;

    setState(() {
      _userAnswers[key] = grapheme;
    });

    _advanceToNextCell();
  }

  void _onBackspace() {
    HapticFeedback.lightImpact();
    final key = '$_selectedRow,$_selectedCol';
    // Backspace on a cell with a combined Tamil character (e.g. 'தி' or 'கி') removes the ENTIRE grapheme cluster
    if (_userAnswers.containsKey(key) && _userAnswers[key]!.isNotEmpty) {
      setState(() {
        _userAnswers.remove(key);
      });
    } else {
      // If cell is already empty, retreat to previous cell and clear it
      _retreatToPrevCell();
    }
  }

  void _advanceToNextCell() {
    if (_puzzle == null) return;
    int nextCol = _selectedCol + 1;
    while (nextCol < _puzzle!.gridSize) {
      if (!_puzzle!.cells[_selectedRow][nextCol].isBlocked) {
        setState(() => _selectedCol = nextCol);
        return;
      }
      nextCol++;
    }
  }

  void _retreatToPrevCell() {
    if (_puzzle == null) return;
    int prevCol = _selectedCol - 1;
    while (prevCol >= 0) {
      if (!_puzzle!.cells[_selectedRow][prevCol].isBlocked) {
        setState(() {
          _selectedCol = prevCol;
          _userAnswers.remove('$_selectedRow,$prevCol');
        });
        return;
      }
      prevCol--;
    }
  }

  Future<void> _submitCrossword() async {
    if (_isSubmitting) return;
    setState(() => _isSubmitting = true);

    try {
      final repo = ref.read(dailyEngagementRepositoryProvider);
      final res = await repo.submitCrossword(_userAnswers, _secondsElapsed);

      if (mounted) {
        setState(() {
          _result = res;
          _isSubmitting = false;
        });

        if (res.isCorrect) {
          _timer?.cancel();
          HapticFeedback.heavyImpact();
          await ref.read(authNotifierProvider.notifier).refreshUser();
          ref.read(mascotProvider.notifier).trigger(MascotState.celebrating);
        } else {
          HapticFeedback.mediumImpact();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('சில எழுத்துக்கள் தவறாக உள்ளன (${res.errors} பிழைகள்). சரிபார்த்து மீண்டும் முயற்சிக்கவும்!'),
              backgroundColor: AppColors.rose,
            ),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: AppColors.rose,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: LoadingView(message: 'Loading daily crossword · புதிர் ஏற்றப்படுகிறது...'),
      );
    }

    if (_error != null) {
      return Scaffold(
        backgroundColor: AppColors.background,
        appBar: AppBar(title: Text('Crossword Puzzle', style: AppTypography.titleLarge)),
        body: ErrorView(message: _error!, onRetry: _fetchCrossword),
      );
    }

    final p = _puzzle!;

    if (p.completed && _result == null) {
      return _buildAlreadyCompletedView(p);
    }

    if (_result != null && _result!.isCorrect) {
      return _buildWinView(_result!);
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(p.titleTa, style: AppTypography.titleMedium.copyWith(fontSize: 16)),
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.timer_outlined, size: 16, color: AppColors.amberLight),
                const SizedBox(width: 6),
                Text(
                  _formatTime(_secondsElapsed),
                  style: AppTypography.caption.copyWith(fontWeight: FontWeight.w700, color: AppColors.amberLight),
                ),
              ],
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Crossword 5x5 Grid Area
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              child: AspectRatio(
                aspectRatio: 1.0,
                child: Container(
                  decoration: BoxDecoration(
                    color: AppColors.surface,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.border, width: 2),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.3),
                        blurRadius: 15,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  padding: const EdgeInsets.all(8),
                  child: GridView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: p.gridSize,
                      crossAxisSpacing: 6,
                      mainAxisSpacing: 6,
                    ),
                    itemCount: p.gridSize * p.gridSize,
                    itemBuilder: (context, idx) {
                      final r = idx ~/ p.gridSize;
                      final c = idx % p.gridSize;
                      final cell = p.cells[r][c];

                      if (cell.isBlocked) {
                        return Container(
                          decoration: BoxDecoration(
                            color: AppColors.background,
                            borderRadius: BorderRadius.circular(8),
                          ),
                        );
                      }

                      final isSelected = r == _selectedRow && c == _selectedCol;
                      final cellKey = '$r,$c';
                      final val = _userAnswers[cellKey] ?? '';

                      return GestureDetector(
                        onTap: () => _selectCell(r, c),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 150),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? AppColors.emerald.withValues(alpha: 0.25)
                                : AppColors.surfaceElevated,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                              color: isSelected ? AppColors.emeraldLight : AppColors.border,
                              width: isSelected ? 2.5 : 1.0,
                            ),
                          ),
                          child: Stack(
                            children: [
                              if (cell.num != null)
                                Positioned(
                                  top: 3,
                                  left: 4,
                                  child: Text(
                                    '${cell.num}',
                                    style: AppTypography.caption.copyWith(
                                      fontSize: 9,
                                      fontWeight: FontWeight.w700,
                                      color: AppColors.textMuted,
                                    ),
                                  ),
                                ),
                              Center(
                                child: Text(
                                  val,
                                  style: AppTypography.tamilTitle.copyWith(
                                    fontSize: 20,
                                    color: isSelected ? AppColors.emeraldLight : Colors.white,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ),

            // Clues Carousel / Viewer
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: DefaultTabController(
                  length: 2,
                  child: Column(
                    children: [
                      TabBar(
                        tabs: const [
                          Tab(text: 'இடமிருந்து வலம் · Across'),
                          Tab(text: 'மேலிருந்து கீழ் · Down'),
                        ],
                        labelColor: AppColors.emeraldLight,
                        unselectedLabelColor: AppColors.textMuted,
                        indicatorColor: AppColors.emerald,
                        labelStyle: AppTypography.titleMedium.copyWith(fontSize: 13),
                      ),
                      Expanded(
                        child: TabBarView(
                          children: [
                            _buildClueList(p.cluesAcross),
                            _buildClueList(p.cluesDown),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Tamil Unicode Grapheme-Aware Virtual Keypad
            _buildKeypad(),

            // Submit Button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              child: AnimatedButton(
                label: 'புதிரைச் சரிபார் · Check & Submit',
                icon: Icons.check_circle_outline_rounded,
                isLoading: _isSubmitting,
                onPressed: _submitCrossword,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildKeypad() {
    final List<String> currentLetters;
    if (_selectedConsonantForSyllables != null) {
      currentLetters = TamilGraphemeUtils.generateSyllables(_selectedConsonantForSyllables!);
    } else if (_keypadTab == 1) {
      currentLetters = TamilGraphemeUtils.uyirLetters;
    } else if (_keypadTab == 2) {
      currentLetters = TamilGraphemeUtils.meiLetters;
    } else if (_keypadTab == 3) {
      currentLetters = TamilGraphemeUtils.baseConsonants;
    } else {
      currentLetters = _puzzleLetters;
    }

    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (_selectedConsonantForSyllables != null)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
              color: AppColors.surfaceElevated,
              child: Row(
                children: [
                  Text(
                    '$_selectedConsonantForSyllables வரிசை உயிர்மெய்',
                    style: AppTypography.caption.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.w700),
                  ),
                  const Spacer(),
                  GestureDetector(
                    onTap: () => setState(() => _selectedConsonantForSyllables = null),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppColors.rose.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text('பின்செல் · Back ✕', style: AppTypography.caption.copyWith(color: AppColors.roseLight)),
                    ),
                  ),
                ],
              ),
            )
          else
            SizedBox(
              height: 38,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                children: [
                  _buildKeypadTabChip(0, '🎯 புதிரின் எழுத்துக்கள்'),
                  const SizedBox(width: 6),
                  _buildKeypadTabChip(1, 'உயிர் (12)'),
                  const SizedBox(width: 6),
                  _buildKeypadTabChip(2, 'மெய் (18)'),
                  const SizedBox(width: 6),
                  _buildKeypadTabChip(3, 'அகரவரிசை (18)'),
                ],
              ),
            ),

          Container(
            height: 52,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            child: Row(
              children: [
                ScaleOnPress(
                  onTap: _onBackspace,
                  child: Container(
                    width: 44,
                    height: 40,
                    decoration: BoxDecoration(
                      color: AppColors.rose.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.rose.withValues(alpha: 0.4)),
                    ),
                    child: const Icon(Icons.backspace_outlined, size: 18, color: AppColors.roseLight),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: currentLetters.length,
                    separatorBuilder: (_, _) => const SizedBox(width: 6),
                    itemBuilder: (context, i) {
                      final char = currentLetters[i];
                      return ScaleOnPress(
                        onTap: () {
                          if (_keypadTab == 3 && _selectedConsonantForSyllables == null) {
                            setState(() => _selectedConsonantForSyllables = char);
                          } else {
                            _onKeyPress(char);
                          }
                        },
                        child: Container(
                          constraints: const BoxConstraints(minWidth: 44),
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: AppColors.surfaceElevated,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: AppColors.border),
                          ),
                          child: Text(
                            char,
                            style: AppTypography.tamilTitle.copyWith(fontSize: 16, color: Colors.white),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildKeypadTabChip(int tabIndex, String label) {
    final isSelected = _keypadTab == tabIndex;
    return GestureDetector(
      onTap: () => setState(() {
        _keypadTab = tabIndex;
        _selectedConsonantForSyllables = null;
      }),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.emerald.withValues(alpha: 0.25) : AppColors.surfaceElevated,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppColors.emeraldLight : AppColors.border,
          ),
        ),
        child: Text(
          label,
          style: AppTypography.caption.copyWith(
            fontSize: 11,
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
            color: isSelected ? AppColors.emeraldLight : AppColors.textMuted,
          ),
        ),
      ),
    );
  }

  Widget _buildClueList(List<CrosswordClueModel> clues) {
    if (clues.isEmpty) {
      return Center(child: Text('No clues', style: AppTypography.caption));
    }
    return ListView.separated(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: clues.length,
      separatorBuilder: (_, _) => const SizedBox(height: 8),
      itemBuilder: (context, idx) {
        final c = clues[idx];
        return ScaleOnPress(
          onTap: () => _selectCell(c.r, c.c),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: AppColors.surfaceElevated,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.emerald.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${c.num}',
                    style: AppTypography.caption.copyWith(fontWeight: FontWeight.w700, color: AppColors.emeraldLight),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(c.clueTa, style: AppTypography.tamilTitle.copyWith(fontSize: 14)),
                      const SizedBox(height: 2),
                      Text(c.clueEn, style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                    ],
                  ),
                ),
                Text('(${c.length})', style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildAlreadyCompletedView(CrosswordPuzzleModel p) {
    final attempt = p.attempt;
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(p.titleTa, style: AppTypography.titleMedium),
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.grid_on_rounded, size: 72, color: AppColors.emeraldLight),
              const SizedBox(height: 20),
              Text(
                'இன்றைய புதிர் முடிந்தது!',
                style: AppTypography.tamilTitle.copyWith(fontSize: 22),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'You have already solved today\'s Tamil crossword',
                style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              if (attempt != null) ...[
                GlassCard(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text(_formatTime(attempt.timeSeconds), style: AppTypography.titleLarge.copyWith(color: AppColors.emeraldLight)),
                          const SizedBox(height: 4),
                          Text('தீர்த்த நேரம் · Time', style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                        ],
                      ),
                      Column(
                        children: [
                          Text('+${attempt.xpAwarded} XP', style: AppTypography.titleLarge.copyWith(color: AppColors.amberLight)),
                          const SizedBox(height: 4),
                          Text('பெற்ற XP · Reward', style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
              const SizedBox(height: 32),
              AnimatedButton(
                label: 'மீண்டும் முகப்புக்குச் செல் · Back',
                icon: Icons.home_rounded,
                onPressed: () => context.pop(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildWinView(CrosswordSubmitResultModel res) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: FadeSlideTransition(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Icon(Icons.military_tech_rounded, size: 84, color: AppColors.amberLight),
                const SizedBox(height: 20),
                Text(
                  'அருமை! புதிர் தீர்க்கப்பட்டது!',
                  style: AppTypography.tamilTitle.copyWith(fontSize: 24),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  'Tamil Crossword solved in ${_formatTime(_secondsElapsed)}!',
                  style: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                GlassCard(
                  padding: const EdgeInsets.all(20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text('+${res.xpGained} XP', style: AppTypography.titleLarge.copyWith(color: AppColors.amberLight, fontWeight: FontWeight.w700)),
                          const SizedBox(height: 4),
                          Text('ஈட்டிய XP · Reward', style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                        ],
                      ),
                      Column(
                        children: [
                          Text('நிலை ${res.level}', style: AppTypography.titleLarge.copyWith(color: AppColors.emeraldLight, fontWeight: FontWeight.w700)),
                          const SizedBox(height: 4),
                          Text('தற்போதைய நிலை · Level', style: AppTypography.caption.copyWith(color: AppColors.textMuted)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
                AnimatedButton(
                  label: 'தொடர · Continue',
                  icon: Icons.check_circle_outline_rounded,
                  onPressed: () => context.pop(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _formatTime(int sec) {
    final m = sec ~/ 60;
    final s = sec % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }
}
