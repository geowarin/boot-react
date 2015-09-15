package react.spockmvc

import groovy.transform.Canonical
import org.springframework.http.MediaType

import javax.servlet.http.Cookie

@Canonical
class RequestParams {
  Map<String, String> headers
  Cookie[] cookies
  String authToken
  MediaType[] accepts = MediaType.APPLICATION_JSON
  String encoding = 'UTF-8'
  Locale locale
}