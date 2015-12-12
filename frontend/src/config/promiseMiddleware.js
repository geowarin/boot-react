import axios from 'axios';

export default function promiseMiddleware({ dispatch, getState }) {
  return next => action => {

    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    const { promise, types, afterSuccess, ...rest } = action; // eslint-disable-line no-redeclare
    if (!action.promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});
    return promise(axios).then(
      (result) => {
        next({...rest, result, type: SUCCESS});
        if (afterSuccess) {
          afterSuccess(getState, dispatch);
        }
      },
      (error) => {
        next({...rest, error, type: FAILURE})
      }
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({...rest, error, type: FAILURE});
    });
  };
}
