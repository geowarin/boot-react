package react.config.redis

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Profile
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession
import org.springframework.session.web.http.HeaderHttpSessionStrategy;

@EnableRedisHttpSession
@Profile('prod')
public class ExternalRedisConfig {
  @Bean
  HeaderHttpSessionStrategy sessionStrategy() {
    new HeaderHttpSessionStrategy();
  }
}