import axios from 'axios';

export default function fetchResource() {

  return function (dispatch) {
    axios.get('/api/simple')
      .then(res => dispatch({type: 'ON_FETCH', payload: res.data}))
      .catch(err => console.error(err));
  };
}
