/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends Component {
  componentDidMount() {
    const { actions, courses, authors } = this.props;

    if (courses.length === 0) { // to avoid reloading if courses data was already loaded
      actions.loadCourses().catch((error) => {
        alert(`Loading courses failed: ${error}`);
      });
    }

    if (authors.length === 0) { // to avoid reloading if authors data was already loaded
      actions.loadAuthors().catch((error) => {
        alert(`Loading authors failed: ${error}`);
      });
    }
  }

  render() {
    const { courses } = this.props; // courses is available as a prop because we mapped the Redux store state for courses to this container component in mapStateToProps function below

    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, // we expect actions to be passed in and required because we wrap all of our courseActions below with a call to dispatch()
};

// *** BE SPECIFIC. REQUEST ONLY THE DATA YOUR COMPONENT NEEDS. Could cause unnecessary re-renders otherwise ***
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0 // need to ensure author data (since it is fetched asynchronously) is available before doing this mapping
        ? []
        : state.courses.map((course) => ({ // using arrow function implicit return to return a course with it's author's name attached to the course state itself that wasn't originally on the course object from the courseApi.js
          ...course,
          authorName: state.authors.find(
            (author) => author.id === course.authorId
          ).name,
        })), // map over each course to weave in the author's name that goes along with a specific course to the courses state
    authors: state.authors, // need to pass in as props as well to ...
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), // bindActionCreators will accept a function or an object so you can pass it all of your actions or you can just pass it one action in order to wrap it like we do for loadCourses and loadAuthors each, it returns each action function wrapped in a dispatch() function. This line will wrap all course actions.
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

// *** WHY we use connect(mapStateToProps, mapDispatchToProps)(OurContainerComponent): connect() returns a function that then calls our component ***
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectStateAndProps(CoursesPage)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // CAN OMIT mapDispatchToProps, OUR COMPONENT GETS A DISPATCH PROP INJECTED AUTOMATICALLY FROM connect() when we don't specify the 2nd arg THAT IT CAN CALL TO DISPATCH ACTIONS
