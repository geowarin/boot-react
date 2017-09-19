import * as React from 'react';
import { redirectToLoginWithMessage } from '../reducers/authentication';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../config/store';

interface PrivateRouterProps {
  redirectToLoginWithMessage: (message: string) => void;
  loading: boolean;
  isAuthenticated: boolean;
}

type StateProps = Pick<PrivateRouterProps, 'loading' | 'isAuthenticated'>;
type DispatchProps = Pick<PrivateRouterProps, 'redirectToLoginWithMessage'>;

const mapStateToProps = (state: RootState): StateProps => ({
  loading: state.authentication.loading,
  isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    redirectToLoginWithMessage: (message: string) => dispatch(redirectToLoginWithMessage(message))
  };
};

const privateRoute = (Wrapped: React.ComponentClass) => connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<PrivateRouterProps, {}> {

    componentDidMount() {
      this.redirectIfNotLogged(this.props);
    }

    componentWillReceiveProps(nextProps: PrivateRouterProps) {
      this.redirectIfNotLogged(nextProps);
    }

    redirectIfNotLogged(props: PrivateRouterProps) {
      const { loading, isAuthenticated } = props;
      if (loading === false && !isAuthenticated) {
        this.props.redirectToLoginWithMessage('login.error.private');
      }
    }

    render() {
      const { loading, isAuthenticated } = this.props;
      if (loading || !isAuthenticated) {
        return (
          <div className="center loader">
            <div>Loading...</div>
          </div>
        );
      }

      return <Wrapped {...this.props} />;
    }
  });

export default privateRoute;
