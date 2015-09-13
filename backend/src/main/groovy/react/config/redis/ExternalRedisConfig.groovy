package react.config.redis

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Profile
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession
import org.springframework.session.web.http.HeaderHttpSessionStrategy

@Profile('redis')
@EnableRedisHttpSession
public class ExternalRedisConfig {
  @Bean
  HeaderHttpSessionStrategy sessionStrategy() {
    new HeaderHttpSessionStrategy();
  }
}
