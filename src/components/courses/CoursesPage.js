import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseAction';

class CoursesPage extends Component {
  render() {
    const { course } = this.state;
    const { courses } = this.props; // courses is available as a prop because we mapped the Redux store state for courses to this container component in mapStateToProps function below

    return (
      <>
        <h2>Courses</h2>

        {courses.map((courseInState) => (
          <div key={courseInState.title}>{courseInState.title}</div>
        ))}
      </>
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
