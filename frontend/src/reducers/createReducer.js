import React from 'react';

export function createReducer (initialState, reducerMap) {
  return (state = initialState, action = null) => {
    const reducer = reducerMap[action.type];

    return reducer ? reducer(state, action.payload) : state;
  };
}
