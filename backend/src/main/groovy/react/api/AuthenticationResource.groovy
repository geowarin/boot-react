package react.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
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

  @RequestMapping(method = RequestMethod.POST)
  def login(@RequestBody def credentials, HttpSession httpSession) {
    Authentication authentication = new UsernamePasswordAuthenticationToken(credentials.username, credentials.password)
    authenticationManager.authenticate(authentication)
    SecurityContextHolder.context.authentication = authentication

    httpSession.setAttribute('user', [username: credentials.username, token: httpSession.id, isAuthenticated: true])
    session(httpSession)
  }

  @RequestMapping(method = RequestMethod.GET)
  def session(HttpSession session) {
    session.getAttribute('user')
  }

  @RequestMapping(method = RequestMethod.DELETE)
  def logout(HttpSession session) {
    session.invalidate()
  }
}
