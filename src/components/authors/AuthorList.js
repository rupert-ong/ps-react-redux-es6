import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorList = ({ authors, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th width="150" />
        <th>Name</th>
        <th>Number of Courses</th>
        <th />
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
            <td>
              <Link to={'/author/' + author.slug}>{author.name}</Link>
            </td>
            <td>{author.numCourses}</td>
            <td>
              {author.numCourses === 0 && (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(author)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;
