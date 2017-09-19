import * as React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-intl-redux';
import { bindActionCreators } from 'redux';
import { createBrowserHistory } from 'history';

import getInitializedStoreWithMiddleware from './config/store';
import { setupAxiosInterceptors } from './rest/axios';
import { redirectToLoginWithMessage, logout } from './reducers/authentication';
import { registerLocales } from './config/translation';
import App from './ui/container/App';
import privateRoute from './router/privateRoute';
import PrivatePage from './ui/container/PrivatePage';
import LoginPage from './ui/container/LoginPage';
import LogoutPage from './ui/container/LogoutPage';
import SimpleListComponent from './ui/container/SimpleListComponent';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const store = getInitializedStoreWithMiddleware([middleware]);
registerLocales(store);

const actions = bindActionCreators({ redirectToLoginWithMessage, logout }, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App>
        <Switch>
          <Route exact path="/" component={SimpleListComponent} />
          <Route path="/private" component={privateRoute(PrivatePage)} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
        </Switch></App>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
