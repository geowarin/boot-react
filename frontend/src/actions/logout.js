import axios from 'axios';
export const LOGOUT = 'LOGOUT';

export default function fetchResource() {
  return dispatch => {
    axios.delete('/api/session')
      .then(res => dispatch({type: LOGOUT, payload: res.data}))
      .catch(err => console.error(err));
  };
}
