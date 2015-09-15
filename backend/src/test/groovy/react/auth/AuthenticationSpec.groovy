package react.auth

import org.springframework.security.test.context.support.WithMockUser
import react.AbstractMvcSpec

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class AuthenticationSpec extends AbstractMvcSpec {

  def "unauthenticated users cannot get resource"() {
    when:
    def response = get("/api/simple")

    then:
    response.andExpect(status().isForbidden())
  }

  @WithMockUser
  def "authenticated users can get resource"() {
    when:
    def response = get("/api/simple")

    then:
    response.andExpect(status().isOk())
  }
}