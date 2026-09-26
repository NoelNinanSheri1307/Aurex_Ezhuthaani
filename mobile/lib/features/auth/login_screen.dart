import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/animations/fade_slide_transition.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_typography.dart';
import '../../core/widgets/animated_button.dart';
import '../../core/widgets/glass_card.dart';
import 'auth_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final success = await ref.read(authNotifierProvider.notifier).login(
          _emailController.text.trim(),
          _passwordController.text,
        );

    if (success && mounted) {
      context.go('/home');
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authNotifierProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
            child: FadeSlideTransition(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Language Switcher in top right
                  Align(
                    alignment: Alignment.centerRight,
                    child: InkWell(
                      onTap: () {
                        final nextLocale = context.locale.languageCode == 'en'
                            ? const Locale('ta')
                            : const Locale('en');
                        context.setLocale(nextLocale);
                      },
                      borderRadius: BorderRadius.circular(20),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: AppColors.surface,
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppColors.border),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              context.locale.languageCode == 'en' ? '🇬🇧 English' : '🇮🇳 தமிழ்',
                              style: AppTypography.caption.copyWith(
                                fontWeight: FontWeight.bold,
                                color: AppColors.emeraldLight,
                              ),
                            ),
                            const SizedBox(width: 6),
                            const Icon(Icons.language_rounded, size: 14, color: AppColors.emeraldLight),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  // Logo / Ezhuthaani Official Logo
                  Container(
                    width: 76,
                    height: 76,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.emerald.withValues(alpha: 0.35),
                          blurRadius: 24,
                          offset: const Offset(0, 8),
                        ),
                      ],
                    ),
                    child: ClipOval(
                      child: Image.asset(
                        'assets/images/icon.png',
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          decoration: const BoxDecoration(
                            gradient: AppColors.emeraldGradient,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(Icons.draw_rounded, color: Colors.white, size: 36),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text('எழுத்தாணி', style: AppTypography.tamilDisplay.copyWith(color: AppColors.emeraldLight)),
                  Text('app.name'.tr(), style: AppTypography.titleMedium.copyWith(color: AppColors.textSecondary, letterSpacing: 2)),
                  const SizedBox(height: 6),
                  Text('app.tagline'.tr(), style: AppTypography.bodyMedium),
                  const SizedBox(height: 32),

                  // Login Form Card
                  GlassCard(
                    padding: const EdgeInsets.all(24),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('auth.welcome_back'.tr(), style: AppTypography.titleLarge),
                          const SizedBox(height: 6),
                          Text('auth.welcome_subtitle'.tr(), style: AppTypography.bodyMedium),
                          const SizedBox(height: 24),

                          // Error alert if any
                          if (authState.errorMessage != null) ...[
                            Container(
                              padding: const EdgeInsets.all(12),
                              margin: const EdgeInsets.only(bottom: 16),
                              decoration: BoxDecoration(
                                color: AppColors.rose.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: AppColors.rose.withValues(alpha: 0.4)),
                              ),
                              child: Row(
                                children: [
                                  const Icon(Icons.error_outline_rounded, color: AppColors.rose, size: 20),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      authState.errorMessage!,
                                      style: AppTypography.bodyMedium.copyWith(color: AppColors.roseLight, fontSize: 12),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],

                          // Email field
                          TextFormField(
                            controller: _emailController,
                            keyboardType: TextInputType.emailAddress,
                            style: AppTypography.bodyLarge,
                            decoration: InputDecoration(
                              labelText: 'auth.email'.tr(),
                              prefixIcon: const Icon(Icons.email_outlined, color: AppColors.textMuted),
                            ),
                            validator: (v) {
                              if (v == null || v.trim().isEmpty) return 'auth.enter_valid_email'.tr();
                              if (!v.contains('@')) return 'auth.enter_valid_email'.tr();
                              return null;
                            },
                          ),
                          const SizedBox(height: 16),

                          // Password field
                          TextFormField(
                            controller: _passwordController,
                            obscureText: _obscurePassword,
                            style: AppTypography.bodyLarge,
                            decoration: InputDecoration(
                              labelText: 'auth.password'.tr(),
                              prefixIcon: const Icon(Icons.lock_outline_rounded, color: AppColors.textMuted),
                              suffixIcon: IconButton(
                                icon: Icon(
                                  _obscurePassword ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                                  color: AppColors.textMuted,
                                ),
                                onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                              ),
                            ),
                            validator: (v) {
                              if (v == null || v.isEmpty) return 'auth.enter_valid_password'.tr();
                              return null;
                            },
                          ),
                          const SizedBox(height: 24),

                          // Submit button
                          AnimatedButton(
                            label: 'auth.sign_in_button'.tr(),
                            onPressed: _submit,
                            isLoading: authState.status == AuthStatus.loading,
                            icon: Icons.arrow_forward_rounded,
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Switch to Signup
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('${'auth.no_account'.tr()} ', style: AppTypography.bodyMedium),
                      GestureDetector(
                        onTap: () => context.push('/signup'),
                        child: Text(
                          'auth.sign_up_button'.tr(),
                          style: AppTypography.titleMedium.copyWith(color: AppColors.emeraldLight),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
