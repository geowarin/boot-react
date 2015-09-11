package react.auth

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter

@Configuration
@Order(1)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Autowired
  public void configureAuth(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication()
      .withUser('user').password('user').roles('USER').and()
      .withUser('admin').password('admin').roles('USER', 'ADMIN');
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .antMatchers('/api/auth').permitAll()
      .antMatchers(HttpMethod.POST).hasRole('ADMIN')
      .antMatchers(HttpMethod.PUT).hasRole('ADMIN')
      .antMatchers(HttpMethod.DELETE).hasRole('ADMIN')
      .anyRequest().authenticated()
  }
}
