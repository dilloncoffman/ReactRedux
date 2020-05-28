import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CourseForm from './CourseForm';

// wire up clean up function to run after each one of our tests
afterEach(cleanup);

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
  return render(<CourseForm {...props} />); // render CourseForm component in isolation - this render() function returns an object with a number of different methods inside
}

it('should render Add Course header', () => {
  const { getByText } = renderCourseForm(); // using destructuring to get a hold of getByText function returned from render() of react-testing-library
  getByText('Add Course'); // has an assertion built in, don't have to call expect()
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
