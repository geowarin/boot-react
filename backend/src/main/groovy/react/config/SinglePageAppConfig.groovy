package react.config

import groovy.transform.builder.Builder
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.util.StringUtils
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import org.springframework.web.servlet.resource.ResourceResolver
import org.springframework.web.servlet.resource.ResourceResolverChain

import javax.servlet.http.HttpServletRequest

/**
 * Redirects every page to index.html
 * Used to handle the router
 */
@Configuration
@Profile('!webpack')
class SinglePageAppConfig extends WebMvcConfigurerAdapter {

  @Override
  void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler('/**')
      .addResourceLocations('classpath:/static/')
      .resourceChain(false)
      .addResolver(new PushStateResourceResolver())
  }

  @Builder
  class PushStateResourceResolver implements ResourceResolver {
    Resource index = new ClassPathResource('/static/index.html')
    String[] handledExtensions = ['html', 'js', 'json', 'csv', 'css', 'png', 'svg', 'eot', 'ttf', 'woff', 'appcache', 'jpg', 'jpeg', 'gif', 'ico']
    String[] ignoredPaths = ['api']

    @Override
    Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
      resolve(requestPath, locations)
    }

    @Override
    String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
      resolve(resourcePath, locations)?.URL
    }

    private Resource resolve(String requestPath, List<? extends Resource> locations) {
      if (isIgnored(requestPath)) {
        return null
      }
      if (isHandled(requestPath)) {
        return locations.collect { it.createRelative(requestPath) }.find { it.exists() }
      }
      return index
    }

    boolean isIgnored(String path) {
      ignoredPaths.contains(path)
    }

    boolean isHandled(String path) {
      def extension = StringUtils.getFilenameExtension(path)
      handledExtensions.find { it == extension }
    }
  }
}
