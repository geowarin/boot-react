import { createReducer } from '../utils';

const ON_FETCH = 'ON_FETCH';

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
