import axios from 'axios';
import { ON_FETCH } from 'constants';

export default function fetchResource() {

  return function (dispatch) {
    axios.get('/api/simple')
      .then(res => dispatch({type: ON_FETCH, payload: res.data}))
      .catch(err => console.error(err));
  };
}
