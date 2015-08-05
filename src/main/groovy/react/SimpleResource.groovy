package react

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SimpleResource {

    @RequestMapping('/api/simple')
    Map resource() {
        [simple: 'resource']
    }
}