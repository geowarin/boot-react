package react.auth

import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.mock.web.MockHttpSession
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import react.AbstractMvcSpec
import react.BootReactApplication

import static org.hamcrest.Matchers.is
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@WebAppConfiguration
class AuthenticationSpec extends AbstractMvcSpec {

  def "unauthenticated users cannot get resource"() {
    when:
    def response = doGet("/api/simple")

    then:
    response.andExpect(status().isForbidden())
  }

  @WithMockUser
  def "authenticated users can get resource"() {
    when:
    def response = doGet("/api/simple")

    then:
    response.andExpect(status().isOk())
  }

  def "get session"() {
    given:
    def session = [user: [username: 'user']]

    when:
    def response = doGetWithSession('/api/session', session)

    then:
    response.andExpect(status().isOk())
    response.andExpect(jsonPath('$.username', is('user')))
  }
}