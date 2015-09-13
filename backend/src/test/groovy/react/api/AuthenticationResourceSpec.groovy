package react.api

import groovy.json.JsonSlurper
import react.AbstractMvcSpec
import spock.lang.Shared
import spock.lang.Stepwise

import static org.hamcrest.Matchers.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Stepwise
class AuthenticationResourceSpec extends AbstractMvcSpec {

  @Shared
  String token

  def "bad authentication"() {
    given:
    def credentials = [username: 'user', password: 'badpassword']

    when:
    def response = doPost('/api/session', credentials)

    then:
    response.andExpect(status().isForbidden())
  }

  def "good authentication"() {
    given:
    def credentials = [username: 'user', password: 'password']

    when:
    def response = doPost('/api/session', credentials)
    def res = new JsonSlurper().parseText(response.andReturn().response.getContentAsString())
    token = res.token

    then:
    response.andExpect(status().isOk())
    response.andExpect(jsonPath('$.username', is('user')))
    token != null
  }

  def "get session"() {
    when:
    def response = doGetWithToken('/api/session', token)

    then:
    response.andExpect(status().isOk())
    response.andExpect(jsonPath('$.username', is('user')))
  }

  def "delete session"() {
    when:
    def response = doDeleteWithToken('/api/session', token)

    then:
    response.andExpect(status().isOk())

    when:
    response = doGetWithToken('/api/session', token)

    then:
    response.andExpect(status().isOk())
    response.andExpect(content().string(''))
  }
}
