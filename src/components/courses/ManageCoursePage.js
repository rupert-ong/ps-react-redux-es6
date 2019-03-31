import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';

import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';

export function ManageCoursePage({
  courses,
  authors,
  loading,
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
    if (!props.course.hasOwnProperty('id')) history.push('/404');

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

  function isFormValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!authorId) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!isFormValid()) return;
    setSaving(true);

    try {
      await saveCourse(course);
      toast.success('Course saved');
      history.push('/courses');
    } catch (error) {
      setSaving(false);
      setErrors({ onSave: error.message });
    }
  }

  return (authors.length === 0 || courses.length === 0) && loading ? (
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
  loading: PropTypes.bool.isRequired,
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
    course: course ? course : {},
    courses: state.courses,
    authors: state.authors,
    loading: state.apiCallInProgress > 0
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
