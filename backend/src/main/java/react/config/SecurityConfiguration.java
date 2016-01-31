package react.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.savedrequest.NullRequestCache;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .authorizeRequests()
      .antMatchers("/api/session").permitAll()
      .antMatchers(HttpMethod.GET, "/api/**").authenticated()
      .antMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN")
      .antMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN")
      .antMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN")
      .and()
      .requestCache()
      .requestCache(new NullRequestCache())
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER)
      .and().csrf().disable();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .inMemoryAuthentication()
      .withUser("user").password("password").roles("USER");
  }
}
