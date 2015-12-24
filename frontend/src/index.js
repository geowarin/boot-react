import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import initStore from 'config/store';
import { setupAxiosInterceptors } from 'rest/axios';
import { syncReduxAndRouter } from 'redux-simple-router';
import { createHistory } from 'history';
import isDev from 'isdev';
import DevTools from 'config/devtools';
import { redirectToLoginWithMessage, logout } from 'reducers/authentication';
import { setLocale } from 'reducers/locale';

import { Router } from 'react-router';
import getRoutes from 'router/router';
import { registerLocales } from 'config/translation';

const devTools = isDev ? <DevTools /> : null;

const history = createHistory();
const store = initStore();
registerLocales(store);
syncReduxAndRouter(history, store);

const actions = bindActionCreators({redirectToLoginWithMessage, logout}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

ReactDOM.render(
  <Provider store={store}>
    <div>
      {devTools}
      <Router history={history} routes={getRoutes(actions.logout)}/>
    </div>
  </Provider>,
  document.getElementById('root')
);
