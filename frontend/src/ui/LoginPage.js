import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, TextInput, Label } from 'react-easy-form';
import { autobind } from 'core-decorators';

import {login} from 'reducers/authentication';

const getNextPathName = (location) => {
  if (location.state && location.state.nextPathname) {
    return location.state.nextPathname;
  }
  return '/';
};

const LabeledInput = (props) => (
  <div className="pure-control-group">
    <Label value={props.label} position="before">
      <TextInput {...props}/>
    </Label>
  </div>
);

export class LoginPage extends Component {

  render() {
    return (
      <div>
        <h2>Login page</h2>

        <p>
          Default login and password are 'user' and 'password'
        </p>

        <Form onSubmit={this.handleSubmit} className="pure-form pure-form-aligned">
          <LabeledInput label="Login" name="username"/>
          <LabeledInput label="Password" name="password" type="password"/>

          <div className="pure-controls">
            <button type="submit" className="pure-button pure-button-primary">Login</button>
          </div>
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
  null,
  dispatch => (bindActionCreators({login}, dispatch))
)(LoginPage);
