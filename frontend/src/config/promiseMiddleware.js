import axios from 'axios';

export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    const { promise, types, afterSuccess, ...rest } = action;
    if (!action.promise) {
      return next(action);
    }

    const defaultSuccess = (dispatch, getState, result) => result;
    const onSuccess = afterSuccess || defaultSuccess;
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});

    const onFulfilled = result => {
      next({...rest, result, type: SUCCESS});
      return result;
    };
    const onRejected = (error) => {
      next({...rest, error, type: FAILURE});
      return error;
    };
    return promise(axios)
      .then(onFulfilled, onRejected)
      .then(result => onSuccess(dispatch, getState, result))
      .catch(error => console.error('MIDDLEWARE ERROR:', error));
  };
}
