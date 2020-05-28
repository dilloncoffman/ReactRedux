import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

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
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// Updates an existing course or saves a new course
export function saveCourse(course) {
  return function (dispatch) {
    return courseApi.saveCourse(course).then((savedCourse) => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    });
  };
}
