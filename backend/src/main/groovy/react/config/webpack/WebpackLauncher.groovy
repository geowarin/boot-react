package react.config.webpack

import org.springframework.beans.factory.DisposableBean
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile

@Configuration
@Profile('webpack')
class WebpackLauncher {

  @Bean
  WebpackRunner frontRunner() {
    new WebpackRunner()
  }

  class WebpackRunner implements InitializingBean, DisposableBean {
    static final String WEBPACK_SERVER_PROPERTY = 'webpack-server-loaded'
    private process

    static boolean isWindows() {
      System.getProperty('os.name').toLowerCase().contains('windows')
    }

    @Override
    void afterPropertiesSet() throws Exception {
      if (!System.getProperty(WEBPACK_SERVER_PROPERTY)) {
        startWebpackDevServer()
      }
    }

    private void startWebpackDevServer() {
      String cmd = isWindows() ? 'cmd /c gradlew.bat frontend:start' : './gradlew frontend:start'
      process = cmd.execute()
      process.consumeProcessOutput(System.out, System.err)
      System.setProperty(WEBPACK_SERVER_PROPERTY, 'true')
    }

    @Override
    void destroy() throws Exception {
      if (process) {
        process.destroyForcibly()
        process.waitFor()
      }
    }
  }
}