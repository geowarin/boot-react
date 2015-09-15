package react.spockmvc

import groovy.json.JsonOutput
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders

class SpockMvc {
  private MockMvc mvc

  SpockMvc(MockMvc mvc) {
    this.mvc = mvc
  }

  SpockMvcResult get(String url, RequestParams params = [:]) {
    spockMvc(MockMvcRequestBuilders.get(url), params)
  }

  SpockMvcResult delete(String url, RequestParams params = [:]) {
    spockMvc(MockMvcRequestBuilders.delete(url), params)
  }

  SpockMvcResult put(String url, RequestParams params = [:]) {
    spockMvc(MockMvcRequestBuilders.put(url), params)
  }

  SpockMvcResult options(String url, RequestParams params = [:]) {
    spockMvc(MockMvcRequestBuilders.options(url), params)
  }

  SpockMvcResult head(String url, RequestParams params = [:]) {
    spockMvc(MockMvcRequestBuilders.head(url), params)
  }

  SpockMvcResult post(String url, def data = null, RequestParams params = [:]) {
    def builder = MockMvcRequestBuilders.post(url)
    if (data) {
      builder
        .contentType(MediaType.APPLICATION_JSON)
        .content(JsonOutput.toJson(data))
    }
    spockMvc(builder, params)
  }

  private SpockMvcResult spockMvc(MockHttpServletRequestBuilder builder, RequestParams params) {
    if (params.authToken) {
      builder.header('X-Auth-Token', params.authToken)
    }
    params.cookies.each {
      builder.cookie(it)
    }
    params.headers.each {
      builder.header(it.key, it.value)
    }
    params.accepts.each {
      builder.accept(it)
    }
    builder.characterEncoding(params.encoding)
    if (params.locale) {
      builder.locale(params.locale)
    }
    def resultActions = this.mvc.perform(builder)
    new SpockMvcResult(resultActions.andReturn())
  }
}
