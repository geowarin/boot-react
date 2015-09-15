package react.spockmvc

import groovy.transform.Canonical

import javax.servlet.http.Cookie

@Canonical
class RequestParams {
  Map<String, String> headers
  List<Cookie> cookies
  String authToken
}