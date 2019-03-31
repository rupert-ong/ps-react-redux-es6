import * as authorActions from './authorActions';
import * as types from './actionTypes';
import { authors } from '../../../tools/mockData';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

describe('Author Actions Async Tests', () => {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  it('should create BEGIN_API_CALL and LOAD_AUTHORS_SUCCESS when loading authors', () => {
    fetchMock.mock('*', {
      body: authors,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_AUTHORS_SUCCESS, authors }
    ];

    const store = mockStore({ courses: [] });
    return store.dispatch(authorActions.loadAuthors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create BEGIN_API_CALL and CREATE_AUTHOR_SUCCESS when creating an author', () => {
    const author = {
      name: 'Rupert Ong',
      id: 1,
      slug: 'rupert-ong'
    };

    fetchMock.mock('*', {
      body: author,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.CREATE_AUTHOR_SUCCESS,
        author
      }
    ];

    const store = mockStore({ authors: [] });
    return store
      .dispatch(authorActions.saveAuthor({ name: 'Rupert Ong' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create BEGIN_API_CALL and UPDATE_AUTHOR_SUCCESS when updating an author', () => {
    const author = {
      name: 'Rupert Ong',
      id: 1,
      slug: 'rupert-ong'
    };

    const updatedAuthor = {
      name: 'Corey Haim',
      id: 1,
      slug: 'corey-haim'
    };

    fetchMock.mock('*', {
      body: updatedAuthor,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      {
        type: types.UPDATE_AUTHOR_SUCCESS,
        author: updatedAuthor
      }
    ];

    const store = mockStore({ authors: [{ ...author }] });
    return store.dispatch(authorActions.saveAuthor(updatedAuthor)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });
});
