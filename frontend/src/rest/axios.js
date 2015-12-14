import axios from 'axios';
import { displayAuthError } from 'reducers/authentication';
import { pushPath } from 'redux-simple-router';

const setupAxiosInterceptors = pushToLoginWithMessage => {
  const onRequestSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    config.timeout = 10000;
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = error => {
    if (error.status == 403 && error.config.url != '/api/session') {
      localStorage.removeItem('auth-token');
      pushToLoginWithMessage('Please login to access this resource');
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
  setupAxiosInterceptors
};
