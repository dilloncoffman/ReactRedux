import * as types from '../actions/actionTypes';
import initialState from '../initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  }
  // ESLint rule prevents using elseif's
  if (actionTypeEndsInSuccess(action.type)) {
    // if action type dispatched ends in success then decrement apiCallsInProgress Redux store state
    return state - 1;
  }

  return state;
}
