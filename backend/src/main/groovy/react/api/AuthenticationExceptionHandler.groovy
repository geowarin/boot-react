package react.api

import groovy.util.logging.Log4j
import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

@ControllerAdvice
@Log4j
class AuthenticationExceptionHandler {

  @ExceptionHandler(AuthenticationException.class)
  @ResponseBody
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  def handleAllExceptions(AuthenticationException e) {
    log.debug("Incorrect login");
    return [message: e.message, messageKey: 'login.error.badLogin']
  }
}
