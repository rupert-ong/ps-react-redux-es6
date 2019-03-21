import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends Component {
  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
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
