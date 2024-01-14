import 'package:amazon_clone/constants/error_handling.dart';
import 'package:amazon_clone/constants/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../../../constants/global_variable.dart';
import '../../../models/user.dart';

class AuthService {
  // sign up with email and password
  void signupUser({
    required String email,
    required String password,
    required String name,
    required BuildContext context,
  }) async {
    try {
      User user = User(
        id: '',
        name: name,
        email: email,
        password: password,
        address: '',
        type: '',
        token: '',
      );
      // send request to server
      http.Response res = await http.post(
        Uri.parse('$uri/api/signup'),
        body: user.toJson(),
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
      );

      debugPrint('${res.statusCode}');
      // ignore: use_build_context_synchronously
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () {
            showSnackBar(
                context: context,
                message: 'Account successfully created',
                color: Colors.green);
          });

      // store user data in shared preferences
    } catch (e) {
      // handle error
      debugPrint(e.toString());
      // ignore: use_build_context_synchronously
      showSnackBar(context: context, message: e.toString(), color: Colors.red);
    }
  }
}
