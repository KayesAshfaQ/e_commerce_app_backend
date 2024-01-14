import 'dart:convert';

import 'package:amazon_clone/constants/utils.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void httpErrorHandle({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  switch (response.statusCode) {
    // all 2xx status code
    case 200: // OK
    case 201: // Created
    case 202: // Accepted
    case 203: // Non-Authoritative Information
    case 204: // No Content
    case 205: // Reset Content
    case 206: // Partial Content
      onSuccess();
      break;

    // all 4xx status code
    case 400: // Bad Request
    case 401: // Unauthorized
    case 403: // Forbidden
    case 404: // Not Found
    case 405: // Method Not Allowed
    case 406: // Not Acceptable
    case 407: // Proxy Authentication Required
    case 408: // Request Timeout
    case 409: // Conflict
    case 410: // Gone
    case 411: // Length Required
    case 412: // Precondition Failed
    case 413: // Payload Too Large
    case 414: // URI Too Long
    case 415: // Unsupported Media Type
    case 416: // Range Not Satisfiable
    case 417: // Expectation Failed
    case 418: // I'm a teapot
    case 421: // Misdirected Request
    case 422: // Unprocessable Entity
    case 423: // Locked
    case 424: // Failed Dependency
    case 425: // Too Early
    case 426: // Upgrade Required
    case 428: // Precondition Required
    case 429: // Too Many Requests
    case 431: // Request Header Fields Too Large
    case 451: // Unavailable For Legal Reasons
      showSnackBar(
        context: context,
        message: jsonDecode(response.body)['message'],
        color: Colors.red,
      );
      debugPrint('Client Error: ${response.statusCode}');
      break;

    // all 5xx status code
    case 500: // Internal Server Error
    case 501: // Not Implemented
    case 502: // Bad Gateway
    case 503: // Service Unavailable
    case 504: // Gateway Timeout
    case 505: // HTTP Version Not Supported
    case 506: // Variant Also Negotiates
    case 507: // Insufficient Storage
    case 508: // Loop Detected
    case 510: // Not Extended
    case 511: // Network Authentication Required
      showSnackBar(
        context: context,
        message: jsonDecode(response.body)['error'],
        color: Colors.red.shade800,
      );
      debugPrint('Server Error: ${response.statusCode}');
      break;

    default:
      showSnackBar(
        context: context,
        message: response.body,
        color: Colors.grey,
      );
      debugPrint('unknown response with status code: ${response.statusCode}');
  }
}
