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
  final GlobalKey<FormState> _signInFormKey = GlobalKey<FormState>();
  final GlobalKey<FormState> _signUpFormKey = GlobalKey<FormState>();

  // signup text editing controller
  final _signUpNameController = TextEditingController();
  final _signUpMailController = TextEditingController();
  final _signUpPassController = TextEditingController();
  final _signUpConfPassController = TextEditingController();

  // signin text editing controller
  final _signInMailController = TextEditingController();
  final _signInPassController = TextEditingController();

  // form type selection
  Auth _auth = Auth.signIn;

  // auth service
  final AuthService _authService = AuthService();

  void _signupUser() {
    // validate form
    if (!_signUpFormKey.currentState!.validate()) return;

    // close keyboard

    // show loading dialog

    // signup user
    _authService.signupUser(
      context: context,
      email: _signUpMailController.text,
      password: _signUpPassController.text,
      name: _signUpNameController.text,
    );

    // close loading dialog
  }

  void _signInUser() {
    // validate form
    if (!_signInFormKey.currentState!.validate()) return;

    // close keyboard

    // show loading dialog

    // signIn user
    _authService.signinUser(
      context: context,
      email: _signInMailController.text,
      password: _signInPassController.text,
    );

    // close loading dialog
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

                // Sign Up
                if (_auth == Auth.signUp)
                  SignUpFormWidget(
                    formKey: _signUpFormKey,
                    onPressed: _signupUser,
                    emailController: _signUpMailController,
                    nameController: _signUpNameController,
                    passwordController: _signUpPassController,
                    confirmPasswordController: _signUpConfPassController,
                  ),

                // Sign In
                if (_auth == Auth.signIn)
                  SignInFormWidget(
                    formKey: _signInFormKey,
                    onPressed: _signInUser,
                    emailController: _signInMailController,
                    passwordController: _signInPassController,
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
  /// sign up form widget
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
  final TextEditingController emailController, nameController, passwordController, confirmPasswordController;

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
            TextFieldWidget(label: 'Confirm Password', controller: confirmPasswordController),
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
  /// sign in form widget
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
