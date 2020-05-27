import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as courseActions from '../../redux/actions/courseAction';

class CoursesPage extends Component {
  state = {
    course: {
      title: '',
    },
  };

  handleChange = (event) => {
    const { course } = this.state; // reference to this.state works because arrow functions inherit the binding context of their enclosing scope; arrow functions don't have a 'this' binding, so the 'this' keyword inside references our component's class instance
    const newCourse = { ...course, title: event.target.value };
    this.setState({ course: newCourse });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { course } = this.state;
    const { dispatch } = this.props;

    dispatch(courseActions.createCourse(course)); // dispatch createCourse action and passing it new course

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

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired, // clarified that we expect the dispatch() to be passed in to CoursesPage component because connect() automatically injects it as a prop IF we omit mapDispatchToProps from the 2nd arg of connect()
};

// *** BE SPECIFIC. REQUEST ONLY THE DATA YOUR COMPONENT NEEDS. Could cause unnecessary re-renders otherwise ***
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

// *** WHY we use connect(mapStateToProps, mapDispatchToProps)(OurContainerComponent): connect() returns a function that then calls our component ***
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectStateAndProps(CoursesPage)
export default connect(mapStateToProps)(CoursesPage); // CAN OMIT mapDispatchToProps, OUR COMPONENT GETS A DISPATCH PROP INJECTED AUTOMATICALLY FROM connect() when we don't specify the 2nd arg THAT IT CAN CALL TO DISPATCH ACTIONS
