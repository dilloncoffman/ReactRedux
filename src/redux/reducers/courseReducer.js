import * as types from '../actions/actionTypes';
import initialState from '../initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(
        (course) => (course.id === action.course.id ? action.course : course) // when you find the course with the id that was just changed, replace it in the array, this is important because map() does not mutate state, it returns a new array
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses; // since whatever is returned from our API will simply replace what was in our state, all we have to do is return the dispatch payload of courses here
    default:
      return state;
  }
}
