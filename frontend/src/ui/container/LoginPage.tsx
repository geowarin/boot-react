import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '../../reducers/authentication';
import { RootState } from '../../config/store';
import LoginForm, { LoginFormProps } from '../component/LoginForm';

type StateProps = Pick<LoginFormProps, 'errorMessage' | 'messages'>;
type DispatchProps = Pick<LoginFormProps, 'login'>;

const mapStateToProps = (state: RootState, ownProps: StateProps): StateProps => {
  return {
    errorMessage: state.authentication.errorMessage,
    messages: state.intl.messages
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    login: (key, val) => {
      dispatch(login(key, val));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
