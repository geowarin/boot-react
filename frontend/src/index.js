import React               from 'react';
import { Router }          from 'react-router';
import { history }         from 'react-router/lib/HashHistory';
import { Provider }        from 'react-redux';
import reducers            from './reducers';
import routes              from './routes';
import thunk               from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';
import { devTools, persistState } from 'redux-devtools';

const initialState = {
  simple: {items: []}
};

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools()
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducers, initialState);

React.render(
  <div>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
    <Provider store={store}>
      {() =>
        <Router children={routes} history={history}/>
      }
    </Provider>
  </div>,
  document.getElementById('root')
);
