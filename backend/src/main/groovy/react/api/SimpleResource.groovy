package react.api

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SimpleResource {

  @RequestMapping('/api/simple')
  List<String> resource() {
    (1..new Random().nextInt(10) + 2).collect { it.toString() }
  }
}