package react.config.redis;

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;

@EnableRedisHttpSession
public class SessionConfig {
  @Bean
  HeaderHttpSessionStrategy sessionStrategy() {
    new HeaderHttpSessionStrategy();
  }
}
