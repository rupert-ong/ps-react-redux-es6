import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends Component {
  state = {
    course: {
      title: ''
    }
  };

  handleChange = e => {
    const course = {
      ...this.state.course,
      title: e.target.value
    };
    this.setState({ course });
  };

  handleSubmit = e => {
    e.preventDefault();
    // ugly way to update state in redux
    this.props.dispatch(courseActions.createCourse(this.state.course.title));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
      </form>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    // Request only the store data you need to avoid needless re-renders
    courses: state.courses
  };
}

// Omitting mapDispatchToProps automatically injects a dispatch prop into the component
export default connect(mapStateToProps)(CoursesPage);
