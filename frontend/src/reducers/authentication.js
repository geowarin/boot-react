import axios from 'axios';
import { pushPath } from 'redux-simple-router';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const AUTH_ERROR_MESSAGE = 'AUTH_ERROR_MESSAGE';

const initialState = {
  isAuthenticated: false,
  token: null,
  username: null,
  errorMessage: null
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return loginSuccessReducer(state, action.payload);
    case LOGOUT:
      return logoutReducer(state);
    case AUTH_ERROR_MESSAGE:
      return displayErrorReducer(state, action.payload.message);
    default:
      return state;
  }
}

const loginSuccessReducer = (state, data) => {
  localStorage.setItem('auth-token', data.token);
  return {
    ...state,
    isAuthenticated: data.isAuthenticated,
    token: data.token,
    username: data.username,
    errorMessage: null
  };
};

const displayErrorReducer = (state, message) => {
  return {
    ...state,
    errorMessage: message
  }
};

const logoutReducer = (state) => {
  localStorage.removeItem('auth-token');
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: null
  };
};

// Action creators

function doLoginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload: data};
}

function doLogout() {
  return {type: LOGOUT};
}

// Public action creators and async actions

export function displayAuthError(message) {
  return {type: AUTH_ERROR_MESSAGE, payload: {message}};
}

export function login(username, password) {
  return (dispatch, getState) => {
    axios.post('/api/session', {username, password})
      .then(res => {
        dispatch(doLoginSuccess(res.data));
        dispatch(pushPath(getState().routing.state.nextPathname));
      })
      .catch(res => {
        dispatch(doLogout());
        dispatch(displayAuthError(res.data.message));
      });
  };
}

export function logout() {
  return dispatch => {
    axios.delete('/api/session')
      .then(res => {
        dispatch(doLogout());
        dispatch(pushPath('login'));
      });
  };
}
