import { pushPath } from 'redux-simple-router';

const AUTH_ERROR_MESSAGE = 'AUTH_ERROR_MESSAGE';

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';
const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGOUT_FAIL';
const GET_SESSION = 'authentication/GET_SESSION';
const GET_SESSION_SUCCESS = 'authentication/GET_SESSION_SUCCESS';
const GET_SESSION_FAIL = 'authentication/LOGOUT_FAIL';

const initialState = {
  isAuthenticated: false,
  username: null,
  errorMessage: null,
  loading: false
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.result.data.isAuthenticated,
        username: action.result.data.username,
        errorMessage: null,
        loginIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        errorMessage: action.error.data.message,
        loginIn: false
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case GET_SESSION:
      return {
        ...state,
        loading: true
      };
    case GET_SESSION_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.result.data.isAuthenticated,
        username: action.result.data.username,
        errorMessage: null,
        loading: false
      };
    case GET_SESSION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        loading: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

// Public action creators and async actions

export function displayAuthError(message) {
  return {type: AUTH_ERROR_MESSAGE, payload: {message}};
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/session', {username, password})
    // todo: const routingState = getState().routing.state || {}; dispatch(pushPath(routingState.nextPathname));
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.delete('/api/session')
    // todo: redirect to login
  };
}

export function getSession() {
  return {
    types: [GET_SESSION, GET_SESSION_SUCCESS, GET_SESSION_FAIL],
    promise: (client) => client.get('/api/session')
    // todo: redirect to login
  };
}
