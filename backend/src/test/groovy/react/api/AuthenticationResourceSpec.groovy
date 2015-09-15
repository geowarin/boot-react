package react.api

import groovy.json.JsonSlurper
import org.springframework.http.HttpStatus
import react.AbstractMvcSpec
import react.spockmvc.RequestParams
import react.spockmvc.SpockMvc
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
    def res = spockMvc.post('/api/session', credentials)

    then:
    res.status == HttpStatus.FORBIDDEN
  }

  def "good authentication"() {
    given:
    def credentials = [username: 'user', password: 'password']

    when:
    def res = spockMvc.post('/api/session', credentials)
    token = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'user'
    token != null
  }

  def "get session"() {
    when:
    def res = spockMvc.get('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK
    res.json.username == 'user'
  }

  def "delete session"() {
    when:
    def res = spockMvc.delete('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK

    when:
    res = spockMvc.get('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK
    res.content.isEmpty()
  }
}
