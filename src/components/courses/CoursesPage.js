import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
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
    const { actions } = this.props; // now getting the createCourse action itself from props since we mapped dispatch for action to props of this component

    actions.createCourse(course); // now calling one of many actions available on the actions prop after mapDispatchToProps used bindActionCreators to wrap all actions for courses in a dispatch()
  };

  render() {
    const { course } = this.state;
    const { courses } = this.props; // courses is available as a prop because we mapped the Redux store state for courses to this container component in mapStateToProps function below

    // By attaching the onSubmit handler to the form, both the submit button and the enter key will submit the form, improving accessibility
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={course.title} />
        <input type="submit" value="Save" />
        {courses.map((courseInState) => (
          <div key={courseInState.title}>{courseInState.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, // we expect actions to be passed in and required because we wrap all of our courseActions below with a call to dispatch()
};

// *** BE SPECIFIC. REQUEST ONLY THE DATA YOUR COMPONENT NEEDS. Could cause unnecessary re-renders otherwise ***
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch), // bindActionCreators will accept a function or an object so you can pass it all of your actions or you can just pass it one action in order to wrap it, it returns each action function wrapped in a dispatch() function. This line will wrap all course actions.
  };
}

// *** WHY we use connect(mapStateToProps, mapDispatchToProps)(OurContainerComponent): connect() returns a function that then calls our component ***
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectStateAndProps(CoursesPage)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // CAN OMIT mapDispatchToProps, OUR COMPONENT GETS A DISPATCH PROP INJECTED AUTOMATICALLY FROM connect() when we don't specify the 2nd arg THAT IT CAN CALL TO DISPATCH ACTIONS
