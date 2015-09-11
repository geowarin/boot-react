package react.auth

import org.springframework.context.annotation.Bean
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession
import org.springframework.session.web.http.HeaderHttpSessionStrategy;

@EnableRedisHttpSession
public class HttpSessionConfig {
  @Bean
  HeaderHttpSessionStrategy sessionStrategy() {
    new HeaderHttpSessionStrategy();
  }
}