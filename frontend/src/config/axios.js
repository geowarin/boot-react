import axios from 'axios';

export default () => {
  axios.interceptors.request.use((config => {
    var token = null;
    if (typeof(Storage) !== 'undefined') {
      token = localStorage.getItem('X-Auth-Token');
    } else {
      var cookies = {};
      for (let cookie of document.cookie.split('; ')) {
        let [name, value] = cookie.split("=");
        cookies[name] = decodeURIComponent(value);
      }
      token = cookies['X-Auth-Token'];
    }
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  }), (error => {
    return Promise.reject(error);
  }));
}
