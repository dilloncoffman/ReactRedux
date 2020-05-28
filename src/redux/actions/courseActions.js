import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

// This function improves the readability of loadCourses() dispatch below
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  // redux-thunk injects dispatch so we don't have to!
  return function (dispatch) {
    dispatch(beginApiCall()); // dispatch to show loading spinner
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error)); // dispatch to decrement apiCallsInProgress Redux store state if error
        throw error;
      });
  };
}

// Updates an existing course or saves a new course
export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall()); // dispatch to show loading spinner
    return courseApi
      .saveCourse(course)
      .then((savedCourse) =>
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse))
      )
      .catch((error) => {
        dispatch(apiCallError(error)); // dispatch to decrement apiCallsInProgress Redux store state if error
        throw error;
      });
  };
}
