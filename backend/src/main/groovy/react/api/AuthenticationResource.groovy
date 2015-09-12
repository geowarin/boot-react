package react.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import javax.servlet.http.HttpSession

@RestController()
@RequestMapping('/api/session')
class AuthenticationResource {
  @Autowired
  AuthenticationManager authenticationManager

  @RequestMapping(value = '/login', method = RequestMethod.POST)
  def auth(@RequestBody def credentials, HttpSession httpSession) {
    UsernamePasswordAuthenticationToken authenticationToken =
      new UsernamePasswordAuthenticationToken(credentials.username, credentials.password)
    authenticationManager.authenticate(authenticationToken)
    SecurityContextHolder.context.authentication = authenticationToken

    httpSession.setAttribute('user', [name: credentials.username, token: httpSession.id])
    session(httpSession)
  }

  @RequestMapping(value = '/info', method = RequestMethod.GET)
  def session(HttpSession session) {
    session.getAttribute('user')
  }
}
