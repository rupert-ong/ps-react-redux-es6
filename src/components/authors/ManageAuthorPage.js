import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { saveAuthor, loadAuthors } from '../../redux/actions/authorActions';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

import { newAuthor } from '../../../tools/mockData';
import AuthorForm from './AuthorForm';
import Spinner from '../common/Spinner';

function ManageAuthorPage({
  currentAuthor,
  authors,
  loading,
  actions,
  history
}) {
  const [author, setAuthor] = useState({ ...currentAuthor });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch(error => alert(`Loading authors failed: ${error}`));
    } else {
      setAuthor(currentAuthor);
    }
  }, [currentAuthor]);

  function handleChange(e) {
    const { name, value } = e.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await actions.saveAuthor(author);
      toast.success('Author saved');
      history.push('/authors');
    } catch (error) {
      setSaving(false);
      setErrors({ onSave: error.message });
    }
  }

  return authors.length === 0 && loading ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
      errors={errors}
    />
  );
}

ManageAuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  currentAuthor: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export function getAuthorBySlug(authors, slug) {
  return authors.find(author => author.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  console.log(slug);
  const currentAuthor =
    slug && state.authors.length > 0
      ? getAuthorBySlug(state.authors, slug)
      : newAuthor;
  return {
    currentAuthor: currentAuthor ? currentAuthor : {},
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveAuthor: bindActionCreators(saveAuthor, dispatch),
      loadAuthors: bindActionCreators(loadAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);
