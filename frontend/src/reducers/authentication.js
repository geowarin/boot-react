import { pushPath, replacePath } from 'redux-simple-router';

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/LOGOUT_FAIL';

const GET_SESSION = 'authentication/GET_SESSION';
const GET_SESSION_SUCCESS = 'authentication/GET_SESSION_SUCCESS';
const GET_SESSION_FAIL = 'authentication/GET_SESSION_FAIL';

const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const initialState = {
  isAuthenticated: false,
  username: null,
  errorMessage: null
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.result.data.isAuthenticated,
        username: action.result.data.username,
        errorMessage: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        errorMessage: action.error.data.message
      };
    case LOGOUT:
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        debugError: action.error
      };
    case GET_SESSION:
      return {
        ...state,
        loading: true
      };
    case GET_SESSION_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.result.data.isAuthenticated || false,
        username: action.result.data.username,
        errorMessage: null,
        loading: false
      };
    case GET_SESSION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        debugError: action.error,
        loading: false
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.message
      };
    default:
      return state;
  }
}

// Public action creators and async actions

export function displayAuthError(message) {
  return {type: ERROR_MESSAGE, message};
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/session', {username, password}),
    afterSuccess: (dispatch, getState) => {
      const routingState = getState().routing.state || {};
      dispatch(pushPath(routingState.nextPathname));
    }
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.delete('/api/session'),
    afterSuccess: (dispatch) => {
      dispatch(pushPath('login'));
    }
  };
}

export function getSession() {
  return {
    types: [GET_SESSION, GET_SESSION_SUCCESS, GET_SESSION_FAIL],
    promise: (client) => client.get('/api/session')
  };
}

export function pushToLoginWithMessage(message) {
  return dispatch => {
    dispatch(displayAuthError(message));
    dispatch(pushPath('/login'));
  }
}

export function redirectToLoginWithMessage(message) {
  return (dispatch, getState) => {
    const currentPath = getState().routing.path;
    dispatch(displayAuthError(message));
    dispatch(replacePath('/login', {nextPathname: currentPath}));
  }
}
