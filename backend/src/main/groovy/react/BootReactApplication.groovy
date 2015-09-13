package react

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration

@SpringBootApplication(exclude = [SessionAutoConfiguration])
class BootReactApplication {

  static void main(String[] args) {
    SpringApplication.run BootReactApplication, args
  }
}
