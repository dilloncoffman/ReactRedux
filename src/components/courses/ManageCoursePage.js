/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify'
import { loadAuthors } from '../../redux/actions/authorActions';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';

export const ManageCoursePage = ({
  loadCoursesDispatch,
  saveCourseDispatch,
  loadAuthorsDispatch,
  courses,
  authors,
  history, // any component loaded via <Route> gets history passed in on props from React Router
  ...props // assign any props I haven't destructured above to a variable called props
}) => {
  // *** LOCAL STATE ***
  // eslint-disable-next-line react/destructuring-assignment
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      // to avoid reloading if courses data was already loaded
      loadCoursesDispatch().catch((error) => {
        alert(`Loading courses failed: ${error}`);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      // to avoid reloading if authors data was already loaded
      loadAuthorsDispatch().catch((error) => {
        alert(`Loading authors failed: ${error}`);
      });
    }

    // eslint-disable-next-line react/destructuring-assignment
  }, [props.course]); // empty dependency array to run only once - when the component mounts

  const handleChange = (event) => {
    const { name, value } = event.target; // this destructure avoids the event getting garbage collected so that it's available within the nested setCourse callback, allows us to retain a local reference to the event
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value, // events return numbers as strings so need to parse authorId to an int
    }));
  };

  function formIsValid() {
    const { title, authorId, category } = course;
    const formErrors = {};

    if (!title) formErrors.title = 'Title is required';
    if (!authorId) formErrors.author = 'Author is required'
    if (!category) formErrors.category = 'Category is required'

    setErrors(formErrors);
    // Form is valid IF the errors object still has no properties
    return Object.keys(formErrors).length === 0;
  }

  const handleSave = (event) => {
    event.preventDefault();

    if (!formIsValid()) return;

    setSaving(true);

    saveCourseDispatch(course).then(() => {
      // show success toast and redirect to /courses page
      toast.success('Course saved.');
      history.push('/courses');
    }).catch(error => {
      setSaving(false); // this way the user can try submitting the form again after an error occurs
      setErrors({ onSave: error.message })
    })
  };

  return (
    <>
      {authors.length === 0 || courses.length === 0 ? (
        <Spinner />
      ) : (
          <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
          />
        )}
    </>
  );
};

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loadCoursesDispatch: PropTypes.func.isRequired,
  saveCourseDispatch: PropTypes.func.isRequired,
  loadAuthorsDispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// A selector function that selects data from the Redux store
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

// *** BE SPECIFIC. REQUEST ONLY THE DATA YOUR COMPONENT NEEDS. Could cause unnecessary re-renders otherwise ***
function mapStateToProps(state, ownProps) {
  const { slug } = ownProps.match.params;
  const course =
    slug && state.courses.length > 0 // Length check is to check if async call to getCourses has finished and there are actually courses in Redux store state
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course, // short hand course: course
    courses: state.courses,
    authors: state.authors,
  };
}

// if we declare mapDispatchToProps as an object instead, each property will automatically be bound to dispatch
const mapDispatchToProps = {
  // The bound action passed in on props "wins", function scope here takes precedence over module scope
  loadCoursesDispatch: loadCourses, // can do this syntax because actions destructured in top of file imports match the names of the props we want to provide
  saveCourseDispatch: saveCourse,
  loadAuthorsDispatch: loadAuthors,
};

// *** WHY we use connect(mapStateToProps, mapDispatchToProps)(OurContainerComponent): connect() returns a function that then calls our component ***
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectStateAndProps(ManageCoursePage)
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); // CAN OMIT mapDispatchToProps, OUR COMPONENT GETS A DISPATCH PROP INJECTED AUTOMATICALLY FROM connect() when we don't specify the 2nd arg THAT IT CAN CALL TO DISPATCH ACTIONS
