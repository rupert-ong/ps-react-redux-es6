import React from 'react';
import Header from './Header';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

// Can search for React Component using Shallow render
it('contains 3 NavLinks via shallow', () => {
  const numLinks = shallow(<Header />).find('NavLink').length;
  expect(numLinks).toEqual(3);
});

// Must search the final rendered HTML in Mounted render as DOM is generated
// Need React Routers' memoryRouter to pull in props passed into Header
it('contains 3 anchors via mount', () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find('a').length;
  expect(numAnchors).toEqual(3);
});
