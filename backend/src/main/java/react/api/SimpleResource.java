package react.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
public class SimpleResource {

  @RequestMapping("/api/simple")
  public List<String> resource() {
    return IntStream.generate(() -> new Random().nextInt(42))
      .limit(2 + new Random().nextInt(10))
      .mapToObj(Integer::toString)
      .collect(Collectors.toList());
  }
}
