package react.dev;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.devtools.restart.Restarter;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.zeroturnaround.exec.ProcessExecutor;
import org.zeroturnaround.exec.stream.slf4j.Slf4jStream;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class YarnRunner implements CommandLineRunner {

  private Environment environment;

  @Autowired
  public YarnRunner(Environment environment) {
    this.environment = environment;
  }

  @Override
  public void run(String... args) throws Exception {
    if (!environment.acceptsProfiles("production") && !environment.acceptsProfiles("test")) {
      AtomicBoolean registered = (AtomicBoolean) Restarter.getInstance().getOrAddAttribute("yarnStarted", AtomicBoolean::new);
      boolean alreadyRun = registered.getAndSet(true);
      if (!alreadyRun) {
        yarnStart();
      }
    }
  }

  private void yarnStart() throws IOException {
    ProcessExecutor process = new ProcessExecutor()
      .directory(new File("frontend"))
      .command("yarn", "start")
      .redirectOutput(Slf4jStream.of(LoggerFactory.getLogger("yarn")).asInfo())
      .redirectError(Slf4jStream.of(LoggerFactory.getLogger("yarn")).asError());

    if (isWindows()) {
      process = process.command("cmd", "/c", "yarn", "start");
    }

    process.start();
  }

  private boolean isWindows() {
    return System.getProperty("os.name").toLowerCase().contains("win");
  }

}
