import React from 'react';
import { replacePath } from 'redux-simple-router';
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
      store.dispatch(replacePath('login', {nextPathname: state.routing.path}));
    }
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
