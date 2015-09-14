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
    registry.addResourceHandler('/**.js').addResourceLocations('classpath:/static/')
    registry.addResourceHandler('/**').resourceChain(false).addResolver(new FixedResourceResolver('/static/index.html'))
  }

  class FixedResourceResolver implements ResourceResolver {
    Resource resource

    FixedResourceResolver(String path) {
      this.resource = new ClassPathResource(path)
    }

    @Override
    Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
      requestPath.startsWith('api') ? null : resource
    }

    @Override
    String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
      'index'
    }
  }
}
