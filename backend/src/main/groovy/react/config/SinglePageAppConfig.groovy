package react.config

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
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
      .addResolver(new SpaResourceResolver())
  }

  class SpaResourceResolver implements ResourceResolver {
    Resource index = new ClassPathResource('/static/index.html')

    @Override
    Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
      if (requestPath.startsWith('api')) {
        return null
      }
      def foundResource = locations.collect { it.createRelative(requestPath) }.find { it.exists() }
      return foundResource ?: index
    }

    @Override
    String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
      'index'
    }
  }
}
