import React, { Component } from 'react';
import { Link } from 'react-router';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import history from './history'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';
import { logout } from 'reducers/authentication';
import isDev from 'isDev';
import DevTools from 'config/devtools';

export default class RouterComponent extends Component {

  render() {
    const devTools = isDev ? <DevTools /> : null;

    return (
      <div>
        {devTools}
        <Router history={history}>
          <Route path="/" name="app" component={App}>
            <IndexRoute component={MyComponent}/>
            <Route path="private" component={PrivatePage} onEnter={this.requireAuth.bind(this)}/>
            <Route path="login" component={LoginPage}/>
            <Route path="logout" onEnter={this.onLogout.bind(this)}/>
            <Route path="other" component={MyComponent}/>
          </Route>
        </Router>
      </div>
    );
  }

  requireAuth(nextState, redirectTo) {
    const isAuthenticated = this.props.isAuthenticated;
    if (!isAuthenticated) {
      redirectTo({nextPathname: nextState.location.pathname}, '/login')
    }
  }

  onLogout() {
    this.props.logout().then(() => history.replaceState(null, '/login'))
  }
}

export default connect(
  state => ({isAuthenticated: state.authentication.isAuthenticated}),
  dispatch => (bindActionCreators({logout}, dispatch))
)(RouterComponent);
