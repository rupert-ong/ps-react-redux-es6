import authorReducer from './authorReducer';
import * as actions from '../actions/authorActions';

describe('authorReducer Tests', () => {
  let initialState;
  let newAuthor;

  beforeAll(() => {
    initialState = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' }
    ];
    newAuthor = {
      id: 4,
      name: 'D'
    };
  });

  it('should add an author when passed CREATE_AUTHOR_SUCESS', () => {
    const action = actions.createAuthorSuccess(newAuthor);
    const newState = authorReducer(initialState, action);

    expect(newState.length).toEqual(4);
    expect(newState[0].name).toEqual('A');
    expect(newState[1].name).toEqual('B');
    expect(newState[2].name).toEqual('C');
    expect(newState[3].name).toEqual('D');
  });

  it('should update an author when passed UPDATE_AUTHOR_SUCCESS', () => {
    const author = { id: 2, name: 'Updated Name' };

    const action = actions.updateAuthorSuccess(author);
    const newState = authorReducer(initialState, action);

    const updatedAuthor = newState.find(a => a.id == author.id);
    const untouchedAuthor = newState.find(a => a.id === 1);

    expect(untouchedAuthor.name).toEqual('A');
    expect(updatedAuthor.name).toEqual('Updated Name');
    expect(newState.length).toEqual(3);
  });

  it('should delete an author when passed DELETE_AUTHOR_OPTIMISTIC', () => {
    const author = { id: 2, name: 'B' };

    const action = actions.deleteAuthorOptimistic(author);
    const newState = authorReducer(initialState, action);

    expect(newState[0].name).toEqual('A');
    expect(newState[1].name).toEqual('C');
    expect(newState.length).toEqual(2);
  });
});
