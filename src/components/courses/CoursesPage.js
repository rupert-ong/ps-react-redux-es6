import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class CoursesPage extends Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    // Ensure to only request async data if it doesn't exist in the store
    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch(error => alert('Loading courses failed ' + error));
    }

    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert('Loading authors failed ' + error));
    }
  }

  handleDeleteCourse = async course => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error('Delete failed. ' + error, { autoClose: false });
    }
  };

  render() {
    const courseTerm = this.props.courses.length === 1 ? 'Course' : 'Courses';
    const headerOutput = `${this.props.courses.length} ${courseTerm}`;
    return (
      <>
        <h2>{headerOutput}</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
              onClick={() => this.props.history.push('/course/')}
            >
              Add Course
            </button>
            {this.props.courses.length > 0 ? (
              <CourseList
                courses={this.props.courses}
                onDeleteClick={this.handleDeleteCourse}
              />
            ) : (
              <p>No courses found. Please add a course.</p>
            )}
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    // Request only the store data you need to avoid needless re-renders
    // Enhance courses to add author name (courses contains normalized id info on author, not author name)
    courses:
      state.authors.length === 0 && state.loading
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

// bindActionCreators mapping of dispatch actions to mapDispatchToProps
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
