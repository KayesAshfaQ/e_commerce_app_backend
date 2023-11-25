import 'package:amazon_clone/constants/global_variable.dart';
import 'package:amazon_clone/route/router.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        scaffoldBackgroundColor: GlobalVariables.backgroundColor,
        colorScheme: ColorScheme.fromSeed(
          seedColor: GlobalVariables.secondaryColor,
          primary: GlobalVariables.secondaryColor,
        ),
        useMaterial3: true,
      ),
      onGenerateRoute: generateRoute,
      //home: const HomePage(),
    );
  }
}
