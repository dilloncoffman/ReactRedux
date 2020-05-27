import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
export function loadCourses() {
  // redux-thunk injects dispatch so we don't have to!
  return function (dispatch) {
    return courseApi.getCourses
      .then((courses) => {
        dispatch({ type: types.LOAD_COURSES_SUCCESS, courses });
      })
      .catch((error) => {
        throw error;
      });
  };
}
