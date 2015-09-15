package react.spockmvc

import groovy.json.JsonSlurper
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpServletResponse
import org.springframework.test.web.servlet.MvcResult

class SpockMvcResult {
  private MvcResult result

  SpockMvcResult(MvcResult result) {
    this.result = result
  }

  def getJson() {
    new JsonSlurper().parseText(result.response.getContentAsString())
  }

  HttpStatus getStatus() {
    HttpStatus.valueOf(result.response.status)
  }

  String getContent() {
    result.response.contentAsString
  }

  Locale getLocale() {
    result.response.locale
  }

  MediaType getContentType() {
    if (result.response.contentType)
      MediaType.parseMediaType(result.response.contentType)
    else
      null
  }

  Map<String, String> getHeaders() {
    MockHttpServletResponse response = result.response
    response.getHeaderNames().collectEntries { name ->
      [(name): response.getHeaders(name).join(',')]
    }
  }
}
