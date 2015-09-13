package react

import groovy.json.JsonOutput
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpSession
import org.springframework.session.MapSessionRepository
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import org.springframework.session.web.http.SessionRepositoryFilter
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Shared
import spock.lang.Specification

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@WebAppConfiguration
abstract class AbstractMvcSpec extends Specification {

  @Autowired
  WebApplicationContext wac

  MockMvc mvc

  @Shared
  def sessionRepository = new MapSessionRepository()

  def setup() {
    def filter = new SessionRepositoryFilter(sessionRepository)
    filter.setHttpSessionStrategy(new HeaderHttpSessionStrategy())

    mvc = MockMvcBuilders
      .webAppContextSetup(this.wac)
      .apply(springSecurity())
      .addFilter(filter)
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

  ResultActions doGetWithToken(String url, String token) {
    this.mvc.perform(get(url).header('X-Auth-Token', token))
  }

  ResultActions doDeleteWithToken(String url, String token) {
    this.mvc.perform(delete(url).header('X-Auth-Token', token))
  }
}
