import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import initStore from 'config/store';
import RouterComponent from 'router/router';
import { setupAxiosInterceptors } from 'rest/axios';
import axios from 'axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import {createHistory} from 'history';
import isDev from 'isDev';
import DevTools from 'config/devtools';
import { logout, displayAuthError } from 'reducers/authentication';
import { replacePath } from 'redux-simple-router';

const devTools = isDev ? <DevTools /> : null;

const history = createHistory();
const store = initStore();
syncReduxAndRouter(history, store);
setupAxiosInterceptors(store.dispatch);

const actions = bindActionCreators({displayAuthError, replacePath, logout}, store.dispatch);
const requireAuth = (nextState) => {
  const state = store.getState();
  if (!state.authentication.isAuthenticated) {
    actions.displayAuthError('Please login before accessing this page');
    actions.replacePath('/login', {nextPathname: nextState.location.pathname});
  }
};

ReactDOM.render(
  <Provider store={store}>
    <div>
      {devTools}
      <RouterComponent history={history} requireAuth={requireAuth} onLogout={actions.logout}/>
    </div>
  </Provider>,
  document.getElementById('root')
);
