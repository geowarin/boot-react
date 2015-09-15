package react.spockmvc

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.context.web.WebAppConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.web.context.WebApplicationContext
import spock.lang.Specification

@WebAppConfiguration
abstract class SpockMvcSpec extends Specification {
  @Delegate
  private SpockMvc spockMvc

  @Autowired
  private WebApplicationContext wac

  def setup() {
    spockMvc = new SpockMvc(buildMockMvc(wac))
  }

  abstract MockMvc buildMockMvc(WebApplicationContext wac)
}
