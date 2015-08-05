package react.webpack

import org.apache.tomcat.util.http.fileupload.IOUtils
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Controller
@Profile('dev')
class WebpackProxy {

  @RequestMapping('/')
  void home(HttpServletRequest request, HttpServletResponse response) {
    proxy(request, response, 'text/html')
  }

  private void proxy(HttpServletRequest request, HttpServletResponse response, String mimeType) {
    URI uri = new URI('http', null, 'localhost', 3000, request.requestURI, request.queryString, null)
    response.setHeader('Content-Type', mimeType)
    uri.toURL().withInputStream { stream ->
      IOUtils.copy(stream, response.outputStream)
    }
  }
}