import { RootState } from '../config/store';
import { push } from 'react-router-redux';

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

interface LoginResponse {
  data: {
    userName: string,
    token: string,
    authenticated: boolean
  };
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}

interface LoginAction {
  type: typeof LOGIN;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  result: LoginResponse;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  messageKey: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
  result: LoginResponse;
}

interface LogoutFailAction {
  type: typeof LOGOUT_FAIL;
}

interface GetSessionAction {
  type: typeof GET_SESSION;
}

interface GetSessionSuccessAction {
  type: typeof GET_SESSION_SUCCESS;
  result: LoginResponse;
}

interface GetSessionFailAction {
  type: typeof GET_SESSION_FAIL;
  error: string;
}

interface ErrorMessageAction {
  type: typeof ERROR_MESSAGE;
  message: string;
}

export type AuthenticationActions =
  LoginAction | LoginSuccessAction | LoginFailAction |
  LogoutAction | LogoutSuccessAction | LogoutFailAction |
  GetSessionAction | GetSessionSuccessAction | GetSessionFailAction |
  ErrorMessageAction;

export interface AuthenticationState {
  isAuthenticated: boolean;
  username: string | null;
  errorMessage: string | null;
  loading: boolean;
  debugError: string | null;
}

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  username: null,
  errorMessage: null,
  loading: true,
  debugError: null
};

export default function reducer(state = initialState, action: AuthenticationActions): AuthenticationState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: (action as LoginSuccessAction).result.data.authenticated,
        username: (action as LoginSuccessAction).result.data.userName,
        errorMessage: null,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        errorMessage: 'fail',
        loading: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: null
      };
    case GET_SESSION:
      return {
        ...state,
        loading: true
      };
    case GET_SESSION_SUCCESS:
      return {
        ...state,
        isAuthenticated: (action as GetSessionSuccessAction).result.data.authenticated || false,
        username: (action as GetSessionSuccessAction).result.data.userName,
        errorMessage: null,
        loading: false
      };
    case GET_SESSION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        debugError: 'get session failed',
        loading: false
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: (action as ErrorMessageAction).message
      };
    default:
      return state;
  }
}

// Public action creators and async actions

export function displayAuthError(message: string) {
  return { type: ERROR_MESSAGE, message };
}

export function login(username: string, password: string) {
  return({
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client: any) => client.post('/api/session', { username, password }),
    afterSuccess: (dispatch: any, getState: () => RootState, response: any) => {
      localStorage.setItem('auth-token', response.headers['x-auth-token']);
      dispatch(push(''));
    }
  });
}

export function logout() {
  return ({
    types: [LOGOUT, LOGOUT_SUCCESS, LOGIN_FAIL],
    promise: (client: any) => client.delete('/api/session'),
    afterSuccess: (dispatch: any, getState: () => RootState, response: any) => {
      dispatch(push('login'));
    }
  });
}

export function getSession() {
  return {
    types: [GET_SESSION, GET_SESSION_SUCCESS, GET_SESSION_FAIL],
    promise: (client: any) => client.get('/api/session')
  };
}

export function redirectToLoginWithMessage(messageKey: string) {
  return (dispatch: any, getState: () => RootState) => {
    const currentPath = '/';
    dispatch(displayAuthError(messageKey));
    dispatch(push({ pathname: '/login', state: { nextPathname: currentPath } }));
  };
}
