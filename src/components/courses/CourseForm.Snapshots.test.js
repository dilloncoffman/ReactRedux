import React from 'react';
import renderer from 'react-test-renderer';
import CourseForm from './CourseForm';
import { courses, authors } from '../../../tools/mockData'; // centralizing mock API data is handy for both the mock API and our tests

// Assure label on save button is properly set when we set the save prop to true
it("sets submit button label 'Saving...' when saving prop is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()} // jest.fn() creates an empty mock function so we don't have to declare our own for our test
      onChange={jest.fn()}
      saving // existence of prop infers truth so don't have to explicitly type "true" here
    />
  );

  expect(tree).toMatchSnapshot();
});

// Assure label on save button is properly set when we set the save prop to false
it("sets submit button label 'Save' when saving prop is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()} // jest.fn() creates an empty mock function so we don't have to declare our own for our test
      onChange={jest.fn()}
      saving={false} // existence of prop infers truth so don't have to explicitly type "true" here
    />
  );

  expect(tree).toMatchSnapshot();
});
