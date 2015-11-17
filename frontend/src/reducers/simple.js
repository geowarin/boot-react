import { ON_FETCH } from 'actions/fetchResource';

const initialState = {
  items: []
};

const onSimpleFetch = (state, data) => {
  return {
    ...state,
    items: data
  };
};

export default function simpleReducer(state = initialState, action) {
  switch (action.type) {
    case ON_FETCH:
      return onSimpleFetch(state, action.payload);
    default:
      return state;
  }
}
