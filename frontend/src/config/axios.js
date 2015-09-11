import axios from 'axios';

export default () => {
  axios.interceptors.request.use((config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  }), (error => {
    return Promise.reject(error);
  }));
}
