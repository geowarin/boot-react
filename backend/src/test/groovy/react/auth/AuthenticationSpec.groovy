package react.auth

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpSession
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import react.BootReactApplication
import spock.lang.Specification

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.hamcrest.Matchers.*;

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@WebAppConfiguration
class AuthenticationSpec extends Specification {

  @Autowired
  WebApplicationContext wac;

  MockMvc mvc;

  def setup() {
    mvc = MockMvcBuilders
      .webAppContextSetup(this.wac)
      .apply(springSecurity())
      .build();
  }

  def "unauthenticated users cannot get resource"() {
    when:
    def response = this.mvc.perform(get("/api/simple"))

    then:
    response.andExpect(status().isForbidden())
  }

  @WithMockUser
  def "authenticated users can get resource"() {
    when:
    def response = this.mvc.perform(get("/api/simple"))

    then:
    response.andExpect(status().isOk())
  }

  def "get session"() {
    given:
    def session = new MockHttpSession()
    session.setAttribute('user', [username: 'user'])

    when:
    def response = this.mvc.perform(get("/api/session").session(session))

    then:
    response.andExpect(status().isOk())
    response.andExpect(jsonPath('$.username', is('user')))
  }
}