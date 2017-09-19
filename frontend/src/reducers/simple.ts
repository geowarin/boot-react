import { RootState } from '../config/store';
import { RouterAction, LocationChangeAction, LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';

const FETCH = 'simple/FETCH';
const FETCH_SUCCESS = 'simple/FETCH_SUCCESS';
const FETCH_FAIL = 'simple/FETCH_FAIL';

export interface SimpleState {
  items: string[];
  wasSuccessfull: boolean;
}

export const initialState: SimpleState = {
  items: [],
  wasSuccessfull: true
};

interface FetchAction {
  type: typeof FETCH;
}

interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS;
  result: { data: string };
}

interface FetchFailAction {
  type: typeof FETCH_FAIL;
}

export type SimpleActions = FetchAction | FetchSuccessAction | FetchFailAction;

// Reducer
export default function reducer(state = initialState, action: SimpleActions): SimpleState {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        items: [...(action as FetchSuccessAction).result.data],
        wasSuccessfull: true
      };
    case FETCH_FAIL:
      return {
        ...state,
        items: [],
        wasSuccessfull: false
      };
    default:
      return state;
  }
}

// Actions
export function fetchSimple() {
  return  {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client: any) => client.get('/api/simple')
  };
}
