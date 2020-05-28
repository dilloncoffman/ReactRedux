import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';

// Factory function to render component - common pattern that makes testing simpler
function render(args) {
  const defaultProps = {
    authors,
    courses,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I need to
    // test React Router related behavior.
    history: {},
    saveCourseDispatch: jest.fn(),
    loadAuthorsDispatch: jest.fn(),
    loadCoursesDispatch: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageCoursePage {...props} />); // renders component and its children in memory
}

it('sets error when attempting to save an empty title field', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const error = wrapper.find('.alert').first();
  expect(error.text()).toBe('Title is required');
});
