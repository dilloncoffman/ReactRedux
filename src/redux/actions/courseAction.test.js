import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'; // mock fetch API calls
import configureMockStore from 'redux-mock-store'; // mock Redux store
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';

// Test an async action
//  1. Configure mock Redux store
const middleware = [thunk]; // array of middleware
const mockStore = configureMockStore(middleware);

//  2. Mock API calls
describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.restore(); // keeps tests atomic, initializes fetchMock for each test
  });

  describe('Load Courses Thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses', () => {
      // 3. Capture all fetch calls and responds with some mock data, mimics response our API would return but avoids making actual API call
      fetchMock.mock('*', {
        body: courses,
        headers: { 'content-type': 'application/json' },
      });

      // 4. Declare actions expected to be fired from the thunk
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      // 5. Create mock Redux store and initialize it to contain empty array of courses
      const store = mockStore({ courses: [] });
      // 6. Dispatch action that returns a promise
      return store.dispatch(courseActions.loadCourses()).then(() => {
        // 7. Call getActions() on the mock store that returns a list of actions that have occurred and assert them against expected actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

// Test for action creator
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
