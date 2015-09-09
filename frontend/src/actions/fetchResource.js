import axios from 'axios';

export const ON_FETCH = 'ON_FETCH';

export default function fetchResource() {
  return dispatch => {
    axios.get('/api/simple')
      .then(res => dispatch({type: ON_FETCH, payload: res.data}))
      .catch(err => console.error(err));
  };
}
