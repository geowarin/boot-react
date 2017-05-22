import React, { Component } from 'react';
import Translate from 'react-translate-component';

const LabeledInput = (props) => (
  <div className="pure-control-group">
    <label>
      {props.label}
    </label>
    <input {...props}/>
  </div>
);

const ErrorPanel = ({messageKey}) => (
  <p className="error-panel">
    <Translate content={messageKey} />
  </p>
);

export default class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  };

  handleInputChange = (e) => {
    let value = e.target.value;
    let inputName = e.target.name;
    this.setState({[inputName]: value});
  };

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <div>
        <Translate component="h2" content="login.title" />

        <Translate component="p" content="login.hint" />

        {errorPanel}

        <form onSubmit={this.handleSubmit} className="pure-form pure-form-aligned">
          <LabeledInput onChange={this.handleInputChange} label="Login" name="username"/>
          <LabeledInput onChange={this.handleInputChange} label="Password" name="password" type="password"/>

          <div className="pure-controls">
            <button type="submit" className="pure-button pure-button-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  }
}
