package react

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.session.MapSessionRepository
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import org.springframework.session.web.http.SessionRepositoryFilter
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import react.spockmvc.SpockMvcSpec
import spock.lang.Shared

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@WebAppConfiguration
abstract class AbstractMvcSpec extends SpockMvcSpec {

  @Autowired
  private WebApplicationContext wac

  @Shared
  private def sessionRepository = new MapSessionRepository()

  @Override
  MockMvc getMockMvc() {
    def sessionFilter = new SessionRepositoryFilter(sessionRepository)
    sessionFilter.httpSessionStrategy = new HeaderHttpSessionStrategy()

    MockMvcBuilders
      .webAppContextSetup(this.wac)
      .apply(springSecurity())
      .addFilter(sessionFilter)
      .build()
  }
}
