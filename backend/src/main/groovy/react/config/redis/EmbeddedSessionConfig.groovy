package react.config.redis

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.session.MapSessionRepository
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import org.springframework.session.web.http.SessionRepositoryFilter

@Profile('fake-redis')
@Configuration
public class EmbeddedSessionConfig {

  @Bean
  SessionRepositoryFilter springSessionRepositoryFilter() {
    SessionRepositoryFilter sessionRepositoryFilter = new SessionRepositoryFilter(new MapSessionRepository())
    sessionRepositoryFilter.httpSessionStrategy = new JWTHeaderHttpSessionStrategy()
    sessionRepositoryFilter
  }
}
