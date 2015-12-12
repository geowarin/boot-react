import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import initStore from 'config/store';
import { setupAxiosInterceptors } from 'rest/axios';
import axios from 'axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import {createHistory} from 'history';
import isDev from 'isDev';
import DevTools from 'config/devtools';
import { logout, displayAuthError } from 'reducers/authentication';
import { replacePath, pushPath } from 'redux-simple-router';

import { Router } from 'react-router';
import getRoutes from 'router/router';

const devTools = isDev ? <DevTools /> : null;

const history = createHistory();
const store = initStore();
syncReduxAndRouter(history, store);

const actions = bindActionCreators({displayAuthError, replacePath, pushPath, logout}, store.dispatch);
setupAxiosInterceptors(actions);

ReactDOM.render(
  <Provider store={store}>
    <div>
      {devTools}
      <Router history={history} routes={getRoutes(actions.logout)}/>
    </div>
  </Provider>,
  document.getElementById('root')
);
