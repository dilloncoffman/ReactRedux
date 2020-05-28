import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

it('should add course when passed CREATE_COURSE_SUCCESS', () => {
  // 1. Arrange
  const initialState = [
    // can omit properties not needed for the test to keep tests readable and relevant
    {
      title: 'A',
    },
    {
      title: 'B',
    },
  ];

  const newCourse = {
    title: 'C',
  };

  const action = actions.createCourseSuccess(newCourse);

  // 2. Act - reducer will return the new state
  const newState = courseReducer(initialState, action);

  // 3. Assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual('A');
  expect(newState[1].title).toEqual('B');
  expect(newState[2].title).toEqual('C');
});

it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
  // 1. Arrange
  const initialState = [
    // can omit properties not needed for the test to keep tests readable and relevant
    {
      id: 1,
      title: 'A',
    },
    {
      id: 2,
      title: 'B',
    },
    {
      id: 3,
      title: 'C',
    },
  ];

  const course = {
    id: 2, // reducer needs ID to filter out the existing course to update
    title: 'New Title',
  };

  const action = actions.updateCourseSuccess(course);

  // 2. Act - reducer will return the new state
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find((a) => a.id === course.id);
  const untouchedCourse = newState.find((a) => a.id === 1);

  // 3. Assert
  expect(updatedCourse.title).toEqual('New Title');
  expect(untouchedCourse.title).toEqual('A');
  expect(newState.length).toEqual(3);
});
