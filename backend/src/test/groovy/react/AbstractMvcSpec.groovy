package react

import org.springframework.boot.test.SpringApplicationContextLoader
import org.springframework.session.MapSessionRepository
import org.springframework.session.web.http.HeaderHttpSessionStrategy
import org.springframework.session.web.http.SessionRepositoryFilter
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Shared
import spockmvc.SpockMvcSpec

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity

@ContextConfiguration(
  loader = SpringApplicationContextLoader,
  classes = [BootReactApplication]
)
@ActiveProfiles("test")
abstract class AbstractMvcSpec extends SpockMvcSpec {

  @Shared
  private def sessionRepository = new MapSessionRepository()

  @Override
  MockMvc buildMockMvc(WebApplicationContext wac) {
    def sessionFilter = new SessionRepositoryFilter(sessionRepository)
    sessionFilter.httpSessionStrategy = new HeaderHttpSessionStrategy()

    MockMvcBuilders
      .webAppContextSetup(wac)
      .apply(springSecurity())
      .addFilter(sessionFilter)
      .build()
  }
}
