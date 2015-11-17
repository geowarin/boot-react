import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, TextInput } from 'react-easy-form';
import { autobind } from 'core-decorators';

import {login} from 'reducers/authentication';

const getNextPathName = (location) => {
  if (location.state && location.state.nextPathname) {
    return location.state.nextPathname;
  }
  return '/';
};

export class LoginPage extends Component {

  render() {
    return (
      <div>
        <h2>Login page</h2>

        <Form onSubmit={this.handleSubmit}>
          <TextInput name="username"/>
          <TextInput name="password" type="password"/>

          <input type="submit" value="Login"/>
        </Form>
      </div>
    );
  }

  @autobind
  handleSubmit(formData) {
    const { username, password } = formData;
    const { login } = this.props;
    login(username, password)
      .then(this.onLogged);
  }

  @autobind
  onLogged() {
    const { location, history } = this.props;
    const nextPath = getNextPathName(location);
    history.replaceState(null, nextPath);
  }
}

export default connect(
  state => ({}),
  dispatch => (bindActionCreators({login}, dispatch))
)(LoginPage);
