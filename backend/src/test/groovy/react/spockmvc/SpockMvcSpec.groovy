package react.spockmvc

import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

abstract class SpockMvcSpec extends Specification {
  @Delegate
  SpockMvc spockMvc

  def setup() {
    spockMvc = new SpockMvc(mockMvc)
  }

  abstract MockMvc getMockMvc()
}
