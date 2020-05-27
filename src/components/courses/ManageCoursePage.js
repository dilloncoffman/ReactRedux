/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses } from '../../redux/actions/courseAction';

const ManageCoursePage = ({ loadCoursesDispatch, loadAuthorsDispatch, courses, authors }) => {
  useEffect(() => {
    if (courses.length === 0) { // to avoid reloading if courses data was already loaded
      loadCoursesDispatch().catch((error) => {
        alert(`Loading courses failed: ${error}`);
      });
    }

    if (authors.length === 0) { // to avoid reloading if authors data was already loaded
      loadAuthorsDispatch().catch((error) => {
        alert(`Loading authors failed: ${error}`);
      });
    }
  }, []) // empty dependency array to run only once - when the component mounts

  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCoursesDispatch: PropTypes.func.isRequired,
  loadAuthorsDispatch: PropTypes.func.isRequired,
};

// *** BE SPECIFIC. REQUEST ONLY THE DATA YOUR COMPONENT NEEDS. Could cause unnecessary re-renders otherwise ***
function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

// if we declare mapDispatchToProps as an object instead, each property will automatically be bound to dispatch
const mapDispatchToProps = {
  // The bound action passed in on props "wins", function scope here takes precedence over module scope
  loadCoursesDispatch: loadCourses, // can do this syntax because actions destructured in top of file imports match the names of the props we want to provide 
  loadAuthorsDispatch: loadAuthors,
}

// *** WHY we use connect(mapStateToProps, mapDispatchToProps)(OurContainerComponent): connect() returns a function that then calls our component ***
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectStateAndProps(ManageCoursePage)
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); // CAN OMIT mapDispatchToProps, OUR COMPONENT GETS A DISPATCH PROP INJECTED AUTOMATICALLY FROM connect() when we don't specify the 2nd arg THAT IT CAN CALL TO DISPATCH ACTIONS
