import 'dart:ffi';

import 'package:amazon_clone/constants/global_variable.dart';
import 'package:amazon_clone/features/auth/services/auth_service.dart';
import 'package:amazon_clone/route/route_path.dart';
import 'package:flutter/material.dart';

import '../../../common/widgets/app_button.dart';
import '../../../common/widgets/app_text_field.dart';
import '../widgets/radio_selection.dart';

enum Auth { signIn, signUp }

class AuthScreen extends StatefulWidget {
  static const String routeName = RoutePath.auth;

  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  // from key
  GlobalKey<FormState> _signInFormKey = GlobalKey<FormState>();
  GlobalKey<FormState> _signUpFormKey = GlobalKey<FormState>();

  // text editing controller
  TextEditingController _nameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();

  // form type selection
  Auth _auth = Auth.signIn;

  // auth service
  final AuthService _authService = AuthService();

  void signupUser() {
    // validate form
    if (!_signUpFormKey.currentState!.validate()) return;
    _authService.signupUser(
      context: context,
      email: _emailController.text,
      password: _passwordController.text,
      name: _nameController.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariables.greyBackgroundCOlor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Text(
                  'Welcome',
                  style: Theme.of(context).textTheme.displaySmall,
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    RadioSelectionWidget(
                      title: 'Sign In',
                      value: Auth.signIn,
                      groupValue: _auth,
                      onChanged: (value) => setState(
                        () => _auth = value!,
                      ),
                    ),
                    RadioSelectionWidget(
                      title: 'Sign up',
                      value: Auth.signUp,
                      groupValue: _auth,
                      onChanged: (value) => setState(
                        () => _auth = value!,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Sign In
                if (_auth == Auth.signUp)
                  SignUpFormWidget(
                    formKey: _signUpFormKey,
                    onPressed: signupUser,
                    emailController: _emailController,
                    nameController: _nameController,
                    passwordController: _passwordController,
                    confirmPasswordController: _confirmPasswordController,
                  ),

                // Sign Up
                if (_auth == Auth.signIn)
                  SignInFormWidget(
                    formKey: _signInFormKey,
                    onPressed: () {},
                    emailController: _emailController,
                    passwordController: _passwordController,
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class SignUpFormWidget extends StatelessWidget {
  const SignUpFormWidget({
    super.key,
    required this.formKey,
    required this.onPressed,
    required this.emailController,
    required this.nameController,
    required this.passwordController,
    required this.confirmPasswordController,
  });

  final GlobalKey<FormState> formKey;
  final VoidCallback onPressed;
  final TextEditingController emailController,
      nameController,
      passwordController,
      confirmPasswordController;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Form(
        key: formKey,
        child: Column(
          children: [
            TextFieldWidget(label: 'Email', controller: emailController),
            TextFieldWidget(label: 'Name', controller: nameController),
            TextFieldWidget(label: 'Password', controller: passwordController),
            TextFieldWidget(
                label: 'Confirm Password',
                controller: confirmPasswordController),
            AppButtonWidget(
              label: 'Continue',
              onPressed: onPressed,
            ),
          ],
        ),
      ),
    );
  }
}

class SignInFormWidget extends StatelessWidget {
  const SignInFormWidget({
    super.key,
    required this.formKey,
    required this.onPressed,
    required this.emailController,
    required this.passwordController,
  });

  final GlobalKey<FormState> formKey;
  final VoidCallback onPressed;
  final TextEditingController emailController, passwordController;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Form(
        key: formKey,
        child: Column(
          children: [
            TextFieldWidget(
              label: 'Email',
              controller: emailController,
            ),
            TextFieldWidget(
              label: 'Password',
              controller: passwordController,
            ),
            AppButtonWidget(
              label: 'Continue',
              onPressed: onPressed,
            ),
          ],
        ),
      ),
    );
  }
}
