import axios from 'axios';

export default () => {
  var onSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  };
  var onError = error => {
    console.log(error);
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onSuccess, onError);
}
