import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';

function render(args) {
  const defaultProps = {
    /* Redux inject props (state) */
    authors,
    courses,
    course: newCourse,
    /* Redux injected props (dispatch) */
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    /* React Router injected props (could of used MemoryRouter wrapper) */
    history: {},
    match: {},
    loading: false
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

it('sets error when attempting to save an empty title field', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const error = wrapper.find('.alert').first();
  expect(error.text()).toBe('Title is required');
});
