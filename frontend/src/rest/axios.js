import axios from 'axios';
import { displayAuthError } from 'reducers/authentication';
import { pushPath } from 'redux-simple-router';

const setupAxiosInterceptors = dispatch => {
  const onRequestSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = error => {
    if (error.status == 403 && error.config.url != '/api/session') {
      const currentPath = window.location.pathname;
      dispatch(displayAuthError('Please login to access this resource'));
      dispatch(pushPath('/login', {nextPathname: currentPath}));
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
  setupAxiosInterceptors
};
