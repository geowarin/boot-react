package react.config.redis;

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.session.MapSessionRepository
import org.springframework.session.SessionRepository
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;

@EnableRedisHttpSession
public class SessionConfig {
  @Bean
  HeaderHttpSessionStrategy sessionStrategy() {
    new HeaderHttpSessionStrategy();
  }

  @Bean
  @Profile('fake-redis')
  SessionRepository mapSessionRepository() {
    new MapSessionRepository()
  }
}
