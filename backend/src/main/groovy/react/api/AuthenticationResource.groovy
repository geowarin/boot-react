package react.api

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

import javax.servlet.http.HttpSession

@RestController()
@RequestMapping('/api/auth')
class AuthenticationResource {

  @RequestMapping('')
  Map auth(HttpSession session) {
    PreAuthenticatedAuthenticationToken authRequest = new PreAuthenticatedAuthenticationToken("test", session.id);
    authRequest.authenticated = true;
    SecurityContextHolder.getContext().setAuthentication(authRequest);
    [token: session.id]
  }
}
