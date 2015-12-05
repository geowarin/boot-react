import React, { Component } from 'react';
import { Link, Router, Route, Redirect, IndexRoute } from 'react-router';
import history from 'router/history'
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';
import { logout } from 'reducers/authentication';

export default class RouterComponent extends Component {

  render() {
    return (
      <Router history={history}>
        <Route path="/" name="app" component={App}>
          <IndexRoute component={MyComponent}/>
          <Route path="private" component={PrivatePage} onEnter={this.requireAuth}/>
          <Route path="login" component={LoginPage}/>
          <Route path="logout" onEnter={this.onLogout}/>
        </Route>
      </Router>
    );
  }

  @autobind
  requireAuth(nextState, redirectTo) {
    const isAuthenticated = this.props.isAuthenticated;
    if (!isAuthenticated) {
      redirectTo({nextPathname: nextState.location.pathname}, '/login')
    }
  }

  @autobind
  onLogout() {
    this.props.logout().then(() => history.replaceState(null, '/login'))
  }
}

export default connect(
  state => ({isAuthenticated: state.authentication.isAuthenticated}),
  {logout}
)(RouterComponent);
