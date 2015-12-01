import axios from 'rest/axios';

const ON_FETCH = 'ON_FETCH';

const initialState = {
  items: []
};

// Reducer

export default function simpleReducer(state = initialState, action) {
  switch (action.type) {
    case ON_FETCH:
      return onSimpleFetch(state, action.payload);
    default:
      return state;
  }
}

const onSimpleFetch = (state, data) => {
  return {
    ...state,
    items: data
  };
};

// Actions

export function fetchSimple() {
  return dispatch => {
    return axios.get('/api/simple')
      .then(res => dispatch({type: ON_FETCH, payload: res.data}))
      .catch(err => console.error(err));
  };
}
