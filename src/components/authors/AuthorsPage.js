import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import Spinner from '../common/Spinner';
import AuthorList from './AuthorList';
import { toast } from 'react-toastify';

function AuthorsPage({ authors, courses, actions, loading, history }) {
  useEffect(() => {
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert('Loading authors failed ' + error));
    }
    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch(error => alert('Loading courses failed ' + error));
    }
  }, []);

  async function handleDeleteAuthor(author) {
    toast.success('Author deleted');
    try {
      await actions.deleteAuthor(author);
    } catch (error) {
      toast.error('Delete failed. ' + error, { autoClose: false });
    }
  }

  const authorTerm = authors.length === 1 ? 'Author' : 'Authors';
  const headerOutput = `${authors.length} ${authorTerm}`;

  return (
    <>
      <h2>{headerOutput}</h2>
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary"
        onClick={() => history.push('/author/')}
      >
        Add Author
      </button>
      {loading ? (
        <Spinner />
      ) : (
        <AuthorList authors={authors} onDeleteClick={handleDeleteAuthor} />
      )}
    </>
  );
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
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
                course => course.authorId === author.id
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
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
