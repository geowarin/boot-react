import React from 'react';

// Utility to wrap stateless component and allow functional stateless components
// to be tested using reagent
export var StatelessWrapper = Wrapped => class extends React.Component {
  render() {
    return <Wrapped {...this.props} />;
  }
};
