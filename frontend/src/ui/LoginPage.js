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
          <input name="username" ref="username"/>
          <input name="password" ref="password"/>

          <input type="submit" value="Login" onClick={this.onSubmit}/>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    var username = findDOMNode(this.refs.username).value;
    var password = findDOMNode(this.refs.password).value;

    this.props.login(username, password);


    //auth.login(email, pass, (loggedIn) => {
    //  if (!loggedIn)
    //    return this.setState({ error: true });
    //
    //  var { location } = this.props;
    //
    //  if (location.state && location.state.nextPathname) {
    //    this.history.replaceState(null, location.state.nextPathname);
    //  } else {
    //    this.history.replaceState(null, '/about');
    //  }
    //});
  }
}

export default connect(
    state => ({ }),
    dispatch => (bindActionCreators({ login }, dispatch))
)(LoginPage);
