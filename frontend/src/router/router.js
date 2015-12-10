import React, { Component } from 'react';
import { Link, Router, Route, Redirect, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { replacePath } from 'redux-simple-router';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';
import { logout, displayAuthError } from 'reducers/authentication';

export default class RouterComponent extends Component {

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" name="app" component={App}>
          <IndexRoute component={MyComponent}/>
          <Route path="private" component={PrivatePage} onEnter={this.requireAuth}/>
          <Route path="login" component={LoginPage}/>
          <Route path="logout" onEnter={this.props.logout}/>
        </Route>
      </Router>
    );
  }

  @autobind
  requireAuth(nextState) {
    const {isAuthenticated, displayAuthError, replacePath} = this.props;
    if (!isAuthenticated) {
      displayAuthError('Please login before accessing this page');
      replacePath('/login', {nextPathname: nextState.location.pathname})
    }
  }
}

export default connect(
  state => ({isAuthenticated: state.authentication.isAuthenticated}),
  {logout, displayAuthError, replacePath}
)(RouterComponent);
