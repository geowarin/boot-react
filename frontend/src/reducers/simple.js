import { createReducer } from './createReducer';
import { ON_FETCH } from 'constants';

const initialState = {
  items: []
};

export default createReducer(initialState, {
  [ON_FETCH] : (state, data) => {
    console.log('on fetch', data);
    return {
      ...state,
      items: data
    };
  }
});
