import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchResource from 'actions/fetchResource';

export const MyComponent = (props) => {
  var items = props.items;
  var list = items.map((item, index) => <li key={index}>{item}</li>);

  return (
    <div>
      <h2>Data:</h2>
      <ul>
        {list}
      </ul>
      <button onClick={props.fetchResource}>
        Fetch
      </button>
    </div>
  );
};

export default connect(
    state => ({items: state.simple.items}),
    dispatch => (bindActionCreators({ fetchResource }, dispatch))
)(MyComponent);
