import React from 'react';
import { mount } from 'enzyme';
import { authors, newAuthor } from '../../../tools/mockData';
import { ManageAuthorPage } from './ManageAuthorPage';

function render(args) {
  const defaultProps = {
    authors,
    currentAuthor: newAuthor,
    loading: false,
    actions: {},
    history: {}
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageAuthorPage {...props} />);
}

describe('ManageAuthorPage Tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });
  it('sets error when attempting to save an empty field', () => {
    wrapper.find('form').simulate('submit');
    const error = wrapper.find('.alert').first();
    expect(error.text()).toBe('Name is required');
  });

  afterEach(() => {
    wrapper = null;
  });
});
