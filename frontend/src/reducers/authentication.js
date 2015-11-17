import { LOGIN_SUCCESS, LOGIN_FAILED } from 'actions/login';
import { LOGOUT } from 'actions/logout';

const initialState = {
  isAuthenticated: false,
  token: null,
  username: null
};

const loginSuccess = (state, data) => {
  localStorage.setItem('auth-token', data.token);
  console.log('Login successful');
  return {
    ...state,
    isAuthenticated: data.isAuthenticated,
    token: data.token,
    username: data.username
  };
};

const logout = (state) => {
  console.log('Logout');
  localStorage.removeItem('auth-token');
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: null
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return loginSuccess(state, action.payload);
    case LOGIN_FAILED:
      console.warn('Login failed');
      return logout(state);
    case LOGOUT:
      console.log('Logout');
      return logout(state);
    default:
      return state;
  }
}
