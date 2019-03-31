import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { saveAuthor, loadAuthors } from '../../redux/actions/authorActions';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

import { newAuthor } from '../../../tools/mockData';
import AuthorForm from './AuthorForm';

function ManageAuthorPage({ currentAuthor, actions, history }) {
  const [author, setAuthor] = useState({ ...currentAuthor });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    actions
      .loadAuthors()
      .catch(error => alert(`Loading authors failed: ${error}`));
  }, []);

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

  return (
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
  currentAuthor: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {
    currentAuthor: newAuthor
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
