import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';

describe('createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    // 1. Arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    // 2. Act
    const action = courseActions.createCourseSuccess(course);

    // 3. Assert
    expect(action).toEqual(expectedAction);
  });
});
