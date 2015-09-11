package react.config

import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.savedrequest.NullRequestCache

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .antMatchers('/api/auth').permitAll()
      .antMatchers(HttpMethod.POST).hasRole('ADMIN')
      .antMatchers(HttpMethod.PUT).hasRole('ADMIN')
      .antMatchers(HttpMethod.DELETE).hasRole('ADMIN')
      .anyRequest().authenticated()
      .and()
      .requestCache()
      .requestCache(new NullRequestCache())
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
  }

}
