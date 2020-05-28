/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';

class CoursesPage extends Component {
  // can use a class field instead of a constructor to declare state
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { actions, courses, authors } = this.props;

    if (courses.length === 0) {
      // to avoid reloading if courses data was already loaded
      actions.loadCourses().catch((error) => {
        alert(`Loading courses failed: ${error}`);
      });
    }

    if (authors.length === 0) {
      // to avoid reloading if authors data was already loaded
      actions.loadAuthors().catch((error) => {
        alert(`Loading authors failed: ${error}`);
      });
    }
  }

  handleDeleteCourse = async course => {
    const { actions } = this.props
    toast.success('Course deleted.');
    try {
      await actions.deleteCourse(course)
    } catch (error) {
      toast.error(`Delete failed.${error.message}`, { autoClose: false })
    };
  }

  render() {
    const { courses, loading } = this.props; // courses and loading are available as props because we mapped the Redux store state for courses and apiCallsInProgress to this container component in mapStateToProps function below
    const { redirectToAddCoursePage } = this.state;

    return (
      <>
        {redirectToAddCoursePage && <Redirect to="/course" />}

        <h2>Courses</h2>

        {loading ? (
          <Spinner />
        ) : (
            <>
              <button
                type="button"
                className="btn btn-primary add-course"
                style={{ marginBottom: 20 }}
                onClick={() => {
                  this.setState({ redirectToAddCoursePage: true });
                }}
              >
                Add Course
            </button>
              <CourseList onDeleteClick={this.handleDeleteCourse} courses={courses} />
            </>
          )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired, // we expect actions to be passed in and required because we wrap all of our courseActions below with a call to dispatch()
  loading: PropTypes.bool.isRequired,
};

// *** BE SPECIFIC. REQUEST ONLY THE DATA YOUR COMPONENT NEEDS. Could cause unnecessary re-renders otherwise ***
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0 // need to ensure author data (since it is fetched asynchronously) is available before doing this mapping
        ? []
        : state.courses.map((course) => ({
          // using arrow function implicit return to return a course with it's author's name attached to the course state itself that wasn't originally on the course object from the courseApi.js
          ...course,
          authorName: state.authors.find(
            (author) => author.id === course.authorId
          ).name,
        })), // map over each course to weave in the author's name that goes along with a specific course to the courses state
    authors: state.authors, // need to pass in as props as well to ...
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), // bindActionCreators will accept a function or an object so you can pass it all of your actions or you can just pass it one action in order to wrap it like we do for loadCourses and loadAuthors each, it returns each action function wrapped in a dispatch() function. This line will wrap all course actions.
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

// *** WHY we use connect(mapStateToProps, mapDispatchToProps)(OurContainerComponent): connect() returns a function that then calls our component ***
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectStateAndProps(CoursesPage)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // CAN OMIT mapDispatchToProps, OUR COMPONENT GETS A DISPATCH PROP INJECTED AUTOMATICALLY FROM connect() when we don't specify the 2nd arg THAT IT CAN CALL TO DISPATCH ACTIONS
