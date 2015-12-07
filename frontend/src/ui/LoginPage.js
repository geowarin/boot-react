import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const ErrorPanel = ({message}) => (
  <p className="error-panel">
    {message}
  </p>
);

export class LoginPage extends Component {

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel message={errorMessage}/> : null;
    return (
      <div>
        <h2>Login page</h2>

        <p>
          Default login and password are 'user' and 'password'
        </p>

        {errorPanel}

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
    history.pushState(null, nextPath);
  }
}

export default connect(
  state => ({errorMessage: state.authentication.errorMessage}),
  {login}
)(LoginPage);
