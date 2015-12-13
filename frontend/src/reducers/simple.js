const FETCH = 'simple/FETCH';
const FETCH_SUCCESS = 'simple/FETCH_SUCCESS';
const FETCH_FAIL = 'simple/FETCH_FAIL';

const initialState = {
  items: []
};

// Reducer

export default function simpleReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        items: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchSimple() {
  return  {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: client => client.get('/api/simple')
  };
}
