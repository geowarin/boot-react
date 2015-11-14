import { combineReducers } from 'redux';
import simple from './simple';
import authentication from './authentication';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  routing: routeReducer,
  simple,
  authentication
});
