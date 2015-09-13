package react

import groovy.json.JsonOutput
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpSession
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Specification

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@WebAppConfiguration
abstract class AbstractMvcSpec extends Specification {

  @Autowired
  WebApplicationContext wac

  MockMvc mvc

  def setup() {
    mvc = MockMvcBuilders
      .webAppContextSetup(this.wac)
      .apply(springSecurity())
      .build();
  }

  ResultActions doPost(String url, def data) {
    this.mvc.perform(
      post(url)
        .contentType(MediaType.APPLICATION_JSON)
        .content(JsonOutput.toJson(data)))
  }

  ResultActions doGet(String url) {
    this.mvc.perform(get(url))
  }

  ResultActions doGetWithSession(String url, Map<String, ?> session) {
    def mockSession = new MockHttpSession()
    session.each {
      mockSession.setAttribute(it.key, it.value)
    }
    this.mvc.perform(get(url).session(mockSession))
  }
}
