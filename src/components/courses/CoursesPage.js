import React, { Component } from 'react';

export default class CoursesPage extends Component {
  state = {
    course: {
      title: '',
    },
  };

  handleChange = event => {
    const { course } = this.state; // reference to this.state works because arrow functions inherit the binding context of their enclosing scope; arrow functions don't have a 'this' binding, so the 'this' keyword inside references our component's class instance
    const newCourse = { ...course, title: event.target.value };
    this.setState({ course: newCourse });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { course } = this.state;
    alert(course.title);
  };

  render() {
    const { course } = this.state;
    // By attaching the onSubmit handler to the form, both the submit button and the enter key will submit the form, improving accessibility
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={course.title} />
        <input type="submit" value="Save" />
      </form>
    );
  }
}
