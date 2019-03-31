import React from 'react';
import AuthorForm from './AuthorForm';
import { shallow } from 'enzyme';

function renderAuthorForm(args) {
  const defaultProps = {
    author: {},
    onChange: () => {},
    onSave: () => {},
    saving: false,
    errors: {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<AuthorForm {...props} />);
}

describe('AuthorForm', () => {
  let wrapper;

  describe('Add Author', () => {
    beforeEach(() => {
      wrapper = renderAuthorForm();
    });

    it('renders form and header', () => {
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('h2').text()).toBe('Add Author');
    });

    it('labels save button as "Save" when not saving', () => {
      expect(wrapper.find('button').text()).toBe('Save');
    });

    it('labels save button as "Saving..." when saving', () => {
      wrapper = renderAuthorForm({ saving: true });
      expect(wrapper.find('button').text()).toBe('Saving...');
    });
  });

  describe('Update Author', () => {
    beforeEach(() => {
      wrapper = renderAuthorForm({
        author: {
          id: 1,
          name: 'Rupert Ong'
        }
      });
    });

    it('renders header text correctly', () => {
      expect(wrapper.find('h2').text()).toBe('Edit Author');
    });

    it('fills in name input with current name', () => {
      expect(wrapper.find('TextInput').prop('value')).toEqual('Rupert Ong');
    });
  });

  afterEach(() => {
    wrapper = null;
  });
});
