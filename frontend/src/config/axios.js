import axios from 'axios';
import history from './history';

export default () => {
  let onRequestSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  };
  const noOp = (response) => response;
  let onResonseError = (error) => {
    if (error.status == 403) {
      history.replaceState(null, '/login');
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(noOp, onResonseError);
}
