import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import Spinner from '../common/Spinner';
import AuthorList from './AuthorList';

function AuthorsPage({ authors, courses, actions, loading }) {
  useEffect(() => {
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert('Loading authors failed ' + error);
      });
    }
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert('Loading courses failed ' + error);
      });
    }
  }, []);

  return (
    <>
      <h2>Authors</h2>
      {loading ? <Spinner /> : <AuthorList authors={authors} />}
    </>
  );
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors:
      state.courses.length === 0
        ? state.authors
        : state.authors.map(author => {
            return {
              ...author,
              numCourses: state.courses.filter(
                course => course.authorId == author.id
              ).length
            };
          }),
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
