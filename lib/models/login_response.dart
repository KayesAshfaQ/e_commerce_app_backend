import 'dart:convert';

import 'package:amazon_clone/models/user.dart';

class LoginResponse {
  String message;
  String token;
  User user;

  LoginResponse({
    required this.message,
    required this.token,
    required this.user,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'message': message,
      'token': token,
      'user': user.toMap(),
    };
  }

  factory LoginResponse.fromMap(Map<String, dynamic> map) {
    return LoginResponse(
      message: map['message'] as String,
      token: map['token'] as String,
      user: User.fromMap(map['user'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  factory LoginResponse.fromJson(String source) => LoginResponse.fromMap(json.decode(source) as Map<String, dynamic>);
}
