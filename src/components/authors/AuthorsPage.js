import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authorActions from '../../redux/actions/authorActions';
import Spinner from '../common/Spinner';
import AuthorList from './AuthorList';

function AuthorsPage({ authors, actions, loading }) {
  useEffect(() => {
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert('Loading authors failed ' + error);
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
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
