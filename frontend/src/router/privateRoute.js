import React from 'react';
import { redirectToLoginWithMessage } from 'reducers/authentication';
import { ScaleLoader } from 'halogen';

const privateRoute = (Wrapped, store) => class extends React.Component {

  componentDidMount() {
    this.redirectIfNotLogged();
    this.unsubscribeStore = store.subscribe(this.redirectIfNotLogged.bind(this));
  }

  redirectIfNotLogged() {
    const state = store.getState();
    const authentication = state.authentication;
    if (!this.redirected && authentication.loading === false && !authentication.isAuthenticated) {
      this.redirected = true;
      store.dispatch(redirectToLoginWithMessage('Please login to access this page'));
    }
    this.setState({authentication});
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  render() {
    const authentication = store.getState().authentication;
    if (authentication.loading || !authentication.isAuthenticated) {
      return (
        <div className="center">
          <ScaleLoader color="#000" size="24px"/>
        </div>
      );
    }

    return <Wrapped {...this.props} />;
  }
};

export default privateRoute;
