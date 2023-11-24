import 'package:flutter/material.dart';

class RadioSelectionWidget extends StatelessWidget {
  const RadioSelectionWidget({
    super.key,
    required this.title,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: RadioListTile(
        dense: true,
        contentPadding: EdgeInsets.zero,
        value: '2',
        groupValue: '',
        onChanged: (val) {},
        title: Text(
          title,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
      ),
    );
  }
}
