import { createReducer } from './createReducer';

import { LOGIN_SUCCESS, LOGIN_FAILED } from 'actions/login';
import { LOGOUT } from 'actions/logout';

const initialState = {
  loggedIn: false,
  token: null
};

export default createReducer(initialState, {
  [LOGIN_SUCCESS]: (state, data) => {
    console.log('Login successful');
    return {
      ...state,
      loggedIn: true,
      token: data.token
    };
  },
  [LOGIN_FAILED]: (state, data) => {
    console.warn('Login failed');
    return {
      ...state,
      loggedIn: false,
      token: null
    };
  },
  [LOGOUT]: (state, data) => {
    console.log('Logout');
    return {
      ...state,
      loggedIn: false,
      token: null
    };
  }
});
