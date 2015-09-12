import axios from 'axios';

export const SESSION_INFO_FETCHED = 'SESSION_INFO_FETCHED';

export default function fetchResource() {
  return dispatch => {
    axios.get('/api/session/info')
      .then(res => dispatch({type: SESSION_INFO_FETCHED, payload: res.data}))
      .catch(err => console.error(err));
  };
}
