package react.config.redis

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.session.Session
import org.springframework.session.web.http.HttpSessionStrategy

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

public class JWTHeaderHttpSessionStrategy implements HttpSessionStrategy {
  public static final String SECRETKEY = 'secretkey';
  private String headerName = 'x-auth-token';

  public String getRequestedSessionId(HttpServletRequest request) {
    String token = request.getHeader(headerName);
    if (token == null) {
      return null;
    }
    String sessionId = Jwts.parser().setSigningKey(SECRETKEY)
      .parseClaimsJws(token).getBody().getSubject();
    return sessionId;
  }

  public void onNewSession(Session session, HttpServletRequest request, HttpServletResponse response) {
    String jwt = Jwts.builder()
      .setSubject(session.getId())
      .signWith(SignatureAlgorithm.HS256, SECRETKEY)
      .compact();
    session.setAttribute('token', jwt);
    response.setHeader(headerName, jwt);
  }

  public void onInvalidateSession(HttpServletRequest request, HttpServletResponse response) {
    response.setHeader(headerName, "");
  }
}
