import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

export default function AuthorForm({
  author,
  onChange,
  onSave,
  saving = false,
  errors = {}
}) {
  return (
    <form onSubmit={onSave}>
      <h2>{author.id ? 'Edit' : 'Add'} Author</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};
