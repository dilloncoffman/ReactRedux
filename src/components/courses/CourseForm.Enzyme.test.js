import React from 'react';
import { shallow } from 'enzyme'; // use shallow to render a single component (no actual DOM is created and no child components are rendered = faster than mount()) in isolation or mount to render component with children
import CourseForm from './CourseForm';

/* Place factory func at top of tests in order to call React components 
with some default values. This will keep our tests simple below and avoid repeating boilerplate code for each test.
- pattern not specific to Enzyme, could be used in React-Testing-Library as well */
// args param is to override the defaultProps if necessary
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => { },
    onChange: () => {  },
  };

  const props = { ...defaultProps, ...args }; // spread operator to blend defaultProps and args together
  return shallow(<CourseForm {...props} />); // render CourseForm component in isolation
}

it('renders a form and header', () => {
  // Get wrapper for component
  const wrapper = renderCourseForm();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it('labels save button as "Save" when not saving', () => {
  // Get wrapper for component
  const wrapper = renderCourseForm();
  expect(wrapper.find('button').text()).toBe('Save');
});

it('labels save button as "Saving" when saving', () => {
  // Get wrapper for component
  const wrapper = renderCourseForm({ saving: true }); // passes param to CourseForm using factory method and saves a lottt of boilerplate code
  expect(wrapper.find('button').text()).toBe('Saving...');
});
