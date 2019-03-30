import React from 'react';
import PropTypes from 'prop-types';

const AuthorList = ({ authors }) => (
  <table className="table">
    <thead>
      <tr>
        <th width="150" />
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => {
        return (
          <tr key={author.id}>
            <td>
              <a
                className="btn btn-light"
                href={'http://pluralsight.com/profile/author/' + author.slug}
              >
                View Profile
              </a>
            </td>
            <td>{author.name}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired
};

export default AuthorList;
