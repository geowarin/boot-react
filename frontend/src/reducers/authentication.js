import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';

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
      return loginSuccess(state, action.payload);
    case LOGIN_FAILED:
      return logoutUser(state, action.payload);
    case LOGOUT:
      return logoutUser(state);
    default:
      return state;
  }
}

const loginSuccess = (state, data) => {
  localStorage.setItem('auth-token', data.token);
  return {
    ...state,
    isAuthenticated: data.isAuthenticated,
    token: data.token,
    username: data.username,
    errorMessage: null
  };
};

const logoutUser = (state, data = {}) => {
  localStorage.removeItem('auth-token');
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: null,
    errorMessage: data.message
  };
};

// Actions

export function login(username, password) {
  return dispatch => {
    return axios.post('/api/session', {username, password})
      .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data}))
      .catch(res => dispatch({type: LOGIN_FAILED, payload: res.data}))
  };
}

export function logout() {
  return dispatch => {
    return axios.delete('/api/session')
      .then(res => dispatch({type: LOGOUT, payload: res.data}))
      .catch(err => console.error(err));
  };
}
