package react.config.redis

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Profile
import org.springframework.session.MapSessionRepository
import org.springframework.session.SessionRepository

@Profile('fake-redis')
public class EmbeddedSessionConfig {

  @Bean
  SessionRepository sessionRepository() {
    new MapSessionRepository()
  }
}