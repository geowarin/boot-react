import React, { Component } from 'react';
import { Link } from 'react-router';
import { Router, Route, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from 'ui/App';
import MyComponent from 'ui/Component';
import PrivatePage from 'ui/PrivatePage';
import LoginPage from 'ui/LoginPage';
import logout from 'actions/logout';

export default class RouterComponent extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        {() =>
          <Router history={createBrowserHistory()}>
            <Route name="app" component={App}>
              <Route component={MyComponent} path="/"/>
              <Route component={PrivatePage} path="/private" onEnter={this.requireAuth.bind(this)}/>
              <Route path="login" component={LoginPage}/>
              <Route path="logout" onEnter={this.props.logout}/>
            </Route>
          </Router>
        }
      </Provider>
    );
  }

  requireAuth(nextState, redirectTo) {
    const isLoggedIn = this.props.authentication.loggedIn;
    if (!isLoggedIn) {
      redirectTo('/login', {nextPathname: nextState.location.pathname})
    }
  }

}

export default connect(
    state => ({ authentication: state.authentication }),
    dispatch => (bindActionCreators({ logout }, dispatch))
)(RouterComponent);
