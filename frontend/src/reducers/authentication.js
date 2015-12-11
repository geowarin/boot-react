import axios from 'axios';
import { pushPath } from 'redux-simple-router';

const LOGGED = 'LOGGED';
const LOGOUT = 'LOGOUT';
const AUTH_ERROR_MESSAGE = 'AUTH_ERROR_MESSAGE';

const initialState = {
  isAuthenticated: false,
  username: null,
  errorMessage: null
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED:
      return loggedInReducer(state, action.payload);
    case LOGOUT:
      return loggedOutReducer(state);
    case AUTH_ERROR_MESSAGE:
      return displayErrorReducer(state, action.payload.message);
    default:
      return state;
  }
}

const loggedInReducer = (state, data) => {
  return {
    ...state,
    isAuthenticated: data.isAuthenticated,
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

const loggedOutReducer = (state) => {
  return {
    ...state,
    isAuthenticated: false,
    username: null
  };
};

// Action creators

function doLoginSuccess(data) {
  return {type: LOGGED, payload: data};
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
        const routingState = getState().routing.state || {};
        dispatch(pushPath(routingState.nextPathname));
      })
      .catch(err => {
        dispatch(displayAuthError(err.data.message));
      });
  };
}

export function recoverSession() {
  return (dispatch) => {
    axios.get('/api/session')
      .then(res => dispatch(doLoginSuccess(res.data)))
      .catch(() => {
        localStorage.removeItem('auth-token');
        dispatch(doLogout());
      })
  };
}

export function logout() {
  return dispatch => {
    axios.delete('/api/session')
      .then(() => {
        localStorage.removeItem('auth-token');
        dispatch(doLogout());
        dispatch(pushPath('login'));
      });
  };
}
