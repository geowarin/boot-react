import { createStore } from 'redux';
import reducer from 'reducers/index';

export default function mockStore(state) {
  return createStore(reducer, state);
};
