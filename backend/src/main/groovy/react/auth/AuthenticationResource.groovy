package react.auth

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController()
@RequestMapping('/api/auth')
class AuthenticationResource {

  @RequestMapping('')
  Map auth() {
    [token: 'lol']
  }
}
