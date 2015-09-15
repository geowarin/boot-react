import { combineReducers } from 'redux';
import simple from './simple';
import authentication from './authentication';

export default combineReducers({
  simple,
  authentication
});
