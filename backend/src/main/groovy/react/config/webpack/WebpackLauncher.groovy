package react.config.webpack

import org.springframework.beans.factory.DisposableBean
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile

import java.util.regex.Matcher

@Configuration
@Profile('webpack')
class WebpackLauncher {

  @Bean
  WebpackRunner frontRunner() {
    new WebpackRunner()
  }

  class WebpackRunner implements InitializingBean, DisposableBean {
    static final String WEBPACK_SERVER_PROPERTY = 'webpack-server-loaded'
    private Process process

    static boolean isWindows() {
      System.getProperty('os.name').toLowerCase().contains('windows')
    }

    @Override
    void afterPropertiesSet() throws Exception {
      if (!System.getProperty(WEBPACK_SERVER_PROPERTY)) {
        startWebpackDevServer()
      }
    }

    private String findNodeVersion() {
      println new File('.').list()
      def matcher = new File(getFrontendDir(), 'build.gradle').text =~ /version = '(.*)'/
      return matcher[0][1]
    }

    private void startWebpackDevServer() {
      File nodeExecutable = findGradleNode()
      String cmd = isWindows() ? "cmd /c $nodeExecutable server.js" : "$nodeExecutable server.js"
      process = cmd.execute(null, getFrontendDir())
      process.consumeProcessOutput(System.out, System.err)
      System.setProperty(WEBPACK_SERVER_PROPERTY, 'true')
    }

    private File getFrontendDir() {
      def file = new File('frontend')
      file.exists() ? file : new File('../frontend')
    }

    private File findGradleNode() {
      def nodejs = new File(System.getProperty('user.home'), '.gradle/nodejs')
      def nodeVersion = findNodeVersion()
      def nodeDir = nodejs.listFiles().find { it.name.contains(nodeVersion) }

      if (!nodeDir) {
        throw new Error("Could not find node ${nodeVersion} please run \"gradlew :frontend:npmInstall\"")
      }
      new File(nodeDir, 'bin/node')
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
