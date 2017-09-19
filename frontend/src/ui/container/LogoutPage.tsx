import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { logout } from '../../reducers/authentication';
import { RootState } from '../../config/store';

import 'stylus/main.styl';

interface LogOutProps extends RouteComponentProps<{}> {
  logout: () => { type: string; promise: (client: any) => any; };
}

class LogoutPage extends React.Component<LogOutProps, {}> {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>Logging out.</div>
    );
  }
}

type DispatchProps = Pick<LogOutProps, 'logout'>;

const mapStateToProps = (state: RootState, ownProps: {}): {} => {
  return {
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LogoutPage);
