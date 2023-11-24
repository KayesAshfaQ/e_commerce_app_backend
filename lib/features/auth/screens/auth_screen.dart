import 'package:amazon_clone/constants/global_variable.dart';
import 'package:flutter/material.dart';

import '../../../common/widgets/app_button.dart';
import '../../../common/widgets/app_text_field.dart';
import '../widgets/radio_selection.dart';

enum Auth { signIn, signUp }

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  Auth _auth = Auth.signIn;

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
                const TextFieldWidget(label: 'Email'),
                const TextFieldWidget(label: 'Name'),
                const TextFieldWidget(label: 'Password'),
                const TextFieldWidget(label: 'Confirm Password'),
                AppButtonWidget(
                  label: 'Continue',
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
