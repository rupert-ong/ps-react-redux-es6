import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

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
    this.props.actions.createCourse(this.state.course);
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
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    // Request only the store data you need to avoid needless re-renders
    courses: state.courses
  };
}

// bindActionCreators mapping of dispatch actions to mapDispatchToProps
function mapDispatchToProps(dispatch) {
  return {
    // Automatically wrap all action creators in a dispatch call
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
