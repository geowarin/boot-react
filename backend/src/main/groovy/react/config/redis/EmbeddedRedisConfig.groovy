package react.config.redis

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Profile
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import redis.clients.jedis.Protocol
import redis.embedded.RedisServer

import javax.annotation.PreDestroy;

@EnableRedisHttpSession
@Profile('redis-embedded')
public class EmbeddedRedisConfig {
  private static RedisServer redisServer;

  @Bean
  public JedisConnectionFactory connectionFactory() throws IOException {
    redisServer = new RedisServer(Protocol.DEFAULT_PORT);
    redisServer.start();
    new JedisConnectionFactory();
  }

  @Bean
  HeaderHttpSessionStrategy sessionStrategy() {
    new HeaderHttpSessionStrategy();
  }

  @PreDestroy
  public void destroy() {
    redisServer.stop();
  }
}