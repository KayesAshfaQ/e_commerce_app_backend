// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:amazon_clone/features/auth/screens/auth_screen.dart';
import 'package:flutter/material.dart';

class RadioSelectionWidget extends StatelessWidget {
  const RadioSelectionWidget({
    Key? key,
    required this.title,
    required this.value,
    this.groupValue,
    this.onChanged,
  }) : super(key: key);

  final String title;
  final Auth value;
  final Auth? groupValue;
  final Function(Auth?)? onChanged;

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: RadioListTile<Auth>(
        contentPadding: EdgeInsets.zero,
        value: value,
        groupValue: groupValue,
        onChanged: onChanged,
        title: Text(
          title,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        dense: true,
      ),
    );
  }
}
