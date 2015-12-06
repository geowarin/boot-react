import React from 'react';

// Allows functional stateless components to be tested using enzyme
// https://github.com/airbnb/enzyme/issues/45
export var StatelessWrapper = Wrapped => class extends React.Component {
  render() {
    return <Wrapped {...this.props} />;
  }
};
