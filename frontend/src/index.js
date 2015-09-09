import React from 'react';
import { Router, Route, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { Provider } from 'react-redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import { devTools, persistState } from 'redux-devtools';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';

import { LOGOUT } from 'actions/logout'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools()
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducers);

React.render(
  <div>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
    <Provider store={store}>
      {() =>
        <Router history={createBrowserHistory()}>
          <Route name="app" component={App}>
            <Route component={MyComponent} path="/"/>
            <Route component={PrivatePage} path="/private" onEnter={requireAuth}/>
            <Route path="login" component={LoginPage}/>
            <Route path="logout" onEnter={logout}/>
          </Route>
        </Router>
      }
    </Provider>
  </div>,
  document.getElementById('root')
);


function requireAuth(nextState, redirectTo) {
  const state = store.getState();
  const isLoggedIn = state.authentication.loggedIn;
  if (!isLoggedIn) {
    redirectTo('/login', {nextPathname: nextState.location.pathname})
  }
}

function logout(nextState, redirectTo) {
  store.dispatch({type: LOGOUT});
  redirectTo('/login')
}
