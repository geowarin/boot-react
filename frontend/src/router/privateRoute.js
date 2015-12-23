import React from 'react';
import { redirectToLoginWithMessage } from 'reducers/authentication';
import { ScaleLoader } from 'halogen';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  loading: state.authentication.loading,
  isAuthenticated: state.authentication.isAuthenticated
});
const mapDispatchToProps = {
  redirectToLoginWithMessage
};

const privateRoute = (Wrapped) => connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {

  componentDidMount() {
    this.redirectIfNotLogged(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfNotLogged(nextProps);
  }

  redirectIfNotLogged(props) {
    const {loading, isAuthenticated} = props;
    if (loading === false && !isAuthenticated) {
      this.props.redirectToLoginWithMessage('login.error.private');
    }
  }

  render() {
    const {loading, isAuthenticated} = this.props;
    if (loading || !isAuthenticated) {
      return (
        <div className="center">
          <ScaleLoader color="#000" size="24px"/>
        </div>
      );
    }

    return <Wrapped {...this.props} />;
  }
});

export default privateRoute;
