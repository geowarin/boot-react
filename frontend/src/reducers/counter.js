import { createReducer } from '../utils';

const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

const initialState = 0;

export default createReducer(initialState, {
  [COUNTER_INCREMENT] : (state) => {
    return state + 1;
  }
});
