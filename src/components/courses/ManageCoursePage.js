import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';

import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => alert(`Loading courses failed: ${error}`));
    } else {
      // Add props.course as useEffect dependency (last line) and update state course on change
      setCourse(props.course);
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => alert(`Loading authors failed: ${error}`));
    }
  }, [props.course]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    // Any component loaded via <Route> gets a history props from React Router
    saveCourse(course).then(() => history.push('/courses'));
  }

  return authors.length === 0 || course.length === 0 ? (
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
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// Selector (Selects data from Redux Store)
export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}

// Object mapping of mapDispatchToProps automatically wraps functions in Redux's dispatch()
const mapDispatchToProps = {
  loadCourses,
  saveCourse,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
