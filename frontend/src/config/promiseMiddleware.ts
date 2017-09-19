import { RootState } from './store';
import axios from 'axios';

export default function promiseMiddleware({ dispatch, getState }: any) {
  return (next: any) => (action: any) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    const { promise, types, afterSuccess, ...rest } = action;
    if (!action.promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    const onFulfilled = (result: any) => {
      next({ ...rest, result, type: SUCCESS });
      if (afterSuccess) {
        afterSuccess(dispatch, getState, result);
      }
    };
    const onRejected = (error: any) => {
      next({ ...rest, error, type: FAILURE });
    };
    return promise(axios)
      .then(onFulfilled, onRejected)
      .catch((error: any) => {
        console.error('MIDDLEWARE ERROR:', error);
        onRejected(error);
      });
  };
}
