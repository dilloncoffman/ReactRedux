import * as types from '../actions/actionTypes';
import initialState from '../initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses; // since whatever is returned from our API will simply replace what was in our state, all we have to do is return the dispatch payload of courses here
    default:
      return state;
  }
}
