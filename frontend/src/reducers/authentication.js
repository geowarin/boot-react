import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGOUT = 'LOGOUT';

const initialState = {
  isAuthenticated: false,
  token: null,
  username: null
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return loginSuccess(state, action.payload, action.token);
    case LOGIN_FAILED:
      console.warn('Login failed');
      return logoutUser(state);
    case LOGOUT:
      console.log('Logout');
      return logoutUser(state);
    default:
      return state;
  }
}

const loginSuccess = (state, data, token) => {
  localStorage.setItem('auth-token', token);
  console.log('Login successful');
  return {
    ...state,
    isAuthenticated: data.isAuthenticated,
    token: data.token,
    username: data.username
  };
};

const logoutUser = (state) => {
  console.log('Logout');
  localStorage.removeItem('auth-token');
  return {
    ...state,
    isAuthenticated: false,
    token: null,
    username: null
  };
};

// Actions

export function login(username, password) {
  return dispatch => {
    return axios.post('/api/session', {
        username: username,
        password: password
      })
      .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data, token: res.headers['x-auth-token']}))
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
