package react.spockmvc

import groovy.json.JsonSlurper
import org.springframework.http.HttpStatus
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

  Map<String, String> getHeader() {
    MockHttpServletResponse response = result.response
    response.getHeaderNames().collectEntries { name ->
      [(name): response.getHeaders(name).join(',')]
    }
  }
}
