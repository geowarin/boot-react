import * as React from 'react';

import { FormattedMessage, Messages } from 'react-intl';

interface LabeledInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

const LabeledInput: React.SFC<LabeledInputProps> = (props) => (
  <div className="pure-control-group">
    <label>
      {props.label}
    </label>
    <input {...props}/>
  </div>
);

interface ErrorPanelProps {
  messageKey: string;
  messages: Messages;
}

const ErrorPanel: React.SFC<ErrorPanelProps> = props => (
  <p className="error-panel">
    <FormattedMessage {...props.messages[props.messageKey]} />
  </p>
);

export interface LoginFormProps {
  errorMessage: string | null;
  login: (username: string, password: string) => void;
  messages: Messages;
}

interface LoginFormState {
  username: string;
  password: string;
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let inputName = e.currentTarget.name;
    this.setState({
      ...this.state,
      [inputName]: value
    });
  }

  render() {
    const { errorMessage, messages } = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage} messages={messages} /> : null;

    return (
      <div>
        {errorPanel}

        <h2><FormattedMessage {...messages['login.title']} /></h2>
        <p><FormattedMessage {...messages['login.hint']} /></p>

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

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  }
}
