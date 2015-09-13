import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export default function login(username, password, onLogged) {

  return (dispatch) => {
    axios.post('/api/session', {
        username: username,
        password: password
    })
      .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data}))
      .then(() => onLogged())
      .catch(res => dispatch({type: LOGIN_FAILED, payload: res.data}))
  };
}
