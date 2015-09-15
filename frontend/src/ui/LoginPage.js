import React, { Component, findDOMNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import login from 'actions/login';

export class LoginPage extends Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <h2>Login page</h2>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="username"/>
          <input type="password" ref="password"/>

          <input type="submit" value="Login" onClick={this.onSubmit}/>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    var username = findDOMNode(this.refs.username).value;
    var password = findDOMNode(this.refs.password).value;

    this.props.login(username, password)
      .then(this.onLogged.bind(this));
  }

  onLogged() {
    var { location, history } = this.props;

    let nextPath = '/';
    if (location.state && location.state.nextPathname) {
      nextPath = location.state.nextPathname;
    }
    history.replaceState(null, nextPath);
  }
}

export default connect(
    state => ({}),
    dispatch => (bindActionCreators({login}, dispatch))
)(LoginPage);
