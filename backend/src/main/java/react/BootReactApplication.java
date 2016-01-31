package react;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.session.SessionAutoConfiguration;

@SpringBootApplication(exclude = SessionAutoConfiguration.class)
public class BootReactApplication {

  public static void main(String[] args) {
    SpringApplication.run(BootReactApplication.class, args);
  }
}
