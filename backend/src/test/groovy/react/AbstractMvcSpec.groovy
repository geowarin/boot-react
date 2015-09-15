package react

import groovy.json.JsonOutput
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.http.MediaType
import org.springframework.session.MapSessionRepository
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import org.springframework.session.web.http.SessionRepositoryFilter
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import react.spockmvc.SpockMvc
import spock.lang.Shared
import spock.lang.Specification

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@WebAppConfiguration
abstract class AbstractMvcSpec extends Specification {

  @Autowired
  private WebApplicationContext wac

  MockMvc mvc

  SpockMvc spockMvc

  @Shared
  private def sessionRepository = new MapSessionRepository()

  def setup() {
    def sessionFilter = new SessionRepositoryFilter(sessionRepository)
    sessionFilter.httpSessionStrategy = new HeaderHttpSessionStrategy()

    mvc = MockMvcBuilders
      .webAppContextSetup(this.wac)
      .apply(springSecurity())
      .addFilter(sessionFilter)
      .build()
    spockMvc = new SpockMvc(mvc)
  }

  ResultActions post(String url, def data, String token = null) {
    def builder = post(url)
      .contentType(MediaType.APPLICATION_JSON)
      .content(JsonOutput.toJson(data));
    if (token) {
      builder.header('X-Auth-Token', token)
    }
    this.mvc.perform(builder)
  }

  ResultActions get(String url, String token = null) {
    def builder = MockMvcRequestBuilders.get(url)
    if (token) {
      builder.header('X-Auth-Token', token)
    }
    this.mvc.perform(builder)
  }

  ResultActions delete(String url, String token = null) {
    def builder = MockMvcRequestBuilders.delete(url)
    if (token) {
      builder.header('X-Auth-Token', token)
    }
    this.mvc.perform(builder)
  }
}
