import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './initialState';
import * as courseActions from './actions/courseActions';

it('Should handle creating courses', function () {
  // 1. Arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    // omit other properties on course to keep test clean
    title: 'Clean Code',
  };

  // 2. Act
  const action = courseActions.createCourseSuccess(course); // get the appropriate action for creating a course
  store.dispatch(action); // dispatch CREATE_COURSE_SUCCESS action

  // 3. Assert
  const createdCourse = store.getState().courses[0]; // get new course from store
  expect(createdCourse).toEqual(course);
});
