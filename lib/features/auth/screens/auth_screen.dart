import 'package:amazon_clone/constants/global_variable.dart';
import 'package:flutter/material.dart';

import '../../../common/widgets/app_button.dart';
import '../../../common/widgets/app_text_field.dart';
import '../widgets/radio_selection.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
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
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    RadioSelectionWidget(
                      title: 'Sign In',
                    ),
                    RadioSelectionWidget(
                      title: 'Sign up',
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
