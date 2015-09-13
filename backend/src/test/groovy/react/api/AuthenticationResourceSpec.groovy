package react.api

import react.AbstractMvcSpec

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class AuthenticationResourceSpec extends AbstractMvcSpec {

  def "authentication"() {
    given:
    def credentials = [username: 'user', password: 'password']

    when:
    def response = doPost('/api/session', credentials)

    then:
    response.andExpect(status().isOk())
  }
}
