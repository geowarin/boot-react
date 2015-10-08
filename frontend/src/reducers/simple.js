import { createReducer } from './createReducer';
import { ON_FETCH } from 'actions/fetchResource';

const initialState = {
  items: []
};

export default createReducer(initialState, {
  [ON_FETCH] : (state, data) => {
    return {
      ...state,
      items: data
    };
  }
});
