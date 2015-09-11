package react.auth

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.servlet.http.HttpSession

@RestController()
@RequestMapping('/api/auth')
class AuthenticationResource {

  @RequestMapping('')
  Map auth(HttpSession session) {
    [token: session.id]
  }
}
