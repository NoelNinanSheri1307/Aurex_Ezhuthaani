import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/animations/scale_on_press.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/glass_card.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _soundEffects = true;
  bool _hapticFeedback = true;
  bool _slowSpeech = false;

  @override
  Widget build(BuildContext context) {
    final currentLocale = context.locale;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text('settings.title'.tr(), style: AppTypography.titleLarge),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textPrimary, size: 20),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Interface Language Header
              Text(
                'settings.language_section'.tr(),
                style: AppTypography.titleMedium.copyWith(color: AppColors.emeraldLight),
              ),
              const SizedBox(height: 6),
              Text(
                'settings.language_desc'.tr(),
                style: AppTypography.caption.copyWith(color: AppColors.textMuted),
              ),
              const SizedBox(height: 14),

              // Language Options
              Row(
                children: [
                  Expanded(
                    child: _buildLanguageCard(
                      context: context,
                      localeCode: 'en',
                      label: 'English',
                      subLabel: 'Default',
                      flagEmoji: '🇬🇧',
                      isSelected: currentLocale.languageCode == 'en',
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _buildLanguageCard(
                      context: context,
                      localeCode: 'ta',
                      label: 'தமிழ்',
                      subLabel: 'Tamil',
                      flagEmoji: '🇮🇳',
                      isSelected: currentLocale.languageCode == 'ta',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 28),

              // Audio & Feedback Section
              Text(
                'settings.audio_section'.tr(),
                style: AppTypography.titleMedium.copyWith(color: AppColors.amberLight),
              ),
              const SizedBox(height: 14),
              GlassCard(
                padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 16),
                child: Column(
                  children: [
                    SwitchListTile.adaptive(
                      contentPadding: EdgeInsets.zero,
                      value: _soundEffects,
                      activeTrackColor: AppColors.emerald,
                      title: Text('settings.sound_effects'.tr(), style: AppTypography.titleMedium.copyWith(fontSize: 14)),
                      subtitle: Text('settings.sound_effects_desc'.tr(), style: AppTypography.caption),
                      onChanged: (val) => setState(() => _soundEffects = val),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    SwitchListTile.adaptive(
                      contentPadding: EdgeInsets.zero,
                      value: _hapticFeedback,
                      activeTrackColor: AppColors.emerald,
                      title: Text('settings.haptic_feedback'.tr(), style: AppTypography.titleMedium.copyWith(fontSize: 14)),
                      subtitle: Text('settings.haptic_feedback_desc'.tr(), style: AppTypography.caption),
                      onChanged: (val) => setState(() => _hapticFeedback = val),
                    ),
                    const Divider(color: AppColors.border, height: 1),
                    SwitchListTile.adaptive(
                      contentPadding: EdgeInsets.zero,
                      value: _slowSpeech,
                      activeTrackColor: AppColors.emerald,
                      title: Text('settings.slow_speech'.tr(), style: AppTypography.titleMedium.copyWith(fontSize: 14)),
                      subtitle: Text('settings.slow_speech_desc'.tr(), style: AppTypography.caption),
                      onChanged: (val) => setState(() => _slowSpeech = val),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 28),

              // About Section
              Text(
                'settings.about_section'.tr(),
                style: AppTypography.titleMedium.copyWith(color: AppColors.skyLight),
              ),
              const SizedBox(height: 14),
              GlassCard(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: AppColors.emerald, width: 2),
                          ),
                          child: ClipOval(
                            child: Image.asset('assets/images/icon.png', fit: BoxFit.cover),
                          ),
                        ),
                        const SizedBox(width: 14),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('app.name'.tr(), style: AppTypography.titleLarge),
                            Text('settings.version'.tr(), style: AppTypography.caption),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'settings.tagline'.tr(),
                      style: AppTypography.bodyMedium.copyWith(color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'settings.credits'.tr(),
                      style: AppTypography.caption.copyWith(color: AppColors.textMuted),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLanguageCard({
    required BuildContext context,
    required String localeCode,
    required String label,
    required String subLabel,
    required String flagEmoji,
    required bool isSelected,
  }) {
    return ScaleOnPress(
      onTap: () async {
        if (!isSelected) {
          await context.setLocale(Locale(localeCode));
        }
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? AppColors.emerald.withValues(alpha: 0.2)
              : AppColors.surface,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: isSelected ? AppColors.emeraldLight : AppColors.border,
            width: isSelected ? 2 : 1,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: AppColors.emerald.withValues(alpha: 0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(flagEmoji, style: const TextStyle(fontSize: 24)),
                if (isSelected)
                  const Icon(Icons.check_circle_rounded, color: AppColors.emeraldLight, size: 20)
                else
                  const Icon(Icons.radio_button_unchecked_rounded, color: AppColors.textMuted, size: 20),
              ],
            ),
            const SizedBox(height: 12),
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                label,
                style: AppTypography.titleMedium.copyWith(
                  color: isSelected ? AppColors.emeraldLight : AppColors.textPrimary,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 2),
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                subLabel,
                style: AppTypography.caption.copyWith(
                  color: isSelected ? AppColors.emeraldLight.withValues(alpha: 0.8) : AppColors.textMuted,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
