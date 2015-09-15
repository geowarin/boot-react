package react.api

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import react.AbstractMvcSpec
import react.spockmvc.RequestParams
import spock.lang.Shared
import spock.lang.Stepwise

@Stepwise
class AuthenticationResourceSpec extends AbstractMvcSpec {

  @Shared
  String token

  def "bad authentication"() {
    given:
    def credentials = [username: 'user', password: 'badpassword']

    when:
    def res = post('/api/session', credentials)

    then:
    res.status == HttpStatus.FORBIDDEN
  }

  def "good authentication"() {
    given:
    def credentials = [username: 'user', password: 'password']

    when:
    def res = post('/api/session', credentials)
    token = res.json.token

    then:
    res.status == HttpStatus.OK
    res.json.username == 'user'
    token != null
  }

  def "get session"() {
    when:
    def res = get('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK
    res.json.username == 'user'
  }

  def "delete session"() {
    when:
    def res = delete('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK

    when:
    res = get('/api/session', new RequestParams(authToken: token))

    then:
    res.status == HttpStatus.OK
    res.content.isEmpty()
  }
}
