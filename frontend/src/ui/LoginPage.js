import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, TextInput, Label } from 'react-easy-form';

import { login } from 'reducers/authentication';

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

        <Form ref="form" initialData={{}} onSubmit={(formData) => this.handleSubmit(formData)} className="pure-form pure-form-aligned">
          <LabeledInput label="Login" name="username"/>
          <LabeledInput label="Password" name="password" type="password"/>

          <div className="pure-controls">
            <button type="submit" className="pure-button pure-button-primary">Login</button>
          </div>
        </Form>
      </div>
    );
  }

  handleSubmit(formData) {
    const { username, password } = formData;
    const { login } = this.props;
    login(username, password);
  }
}

export default connect(
  state => ({errorMessage: state.authentication.errorMessage}),
  {login}
)(LoginPage);
