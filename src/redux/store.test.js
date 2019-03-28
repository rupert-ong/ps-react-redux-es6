import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

// Integration Test (Actions, Store, Reducers)
describe('Redux Store Integration Test', () => {
  let store;

  beforeEach(() => {
    const courses = [
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' }
    ];

    store = createStore(rootReducer, { ...initialState, courses });
  });

  it('should handle creating courses', () => {
    // setup
    const course = { title: 'Clean Code' };

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    const newStateCourses = store.getState().courses;
    const createdCourse = newStateCourses[3];

    expect(createdCourse).toEqual(course);
    expect(newStateCourses.length).toEqual(4);
  });

  it('should handle updating a course', () => {
    const course = { id: 2, title: 'Clean Code' };

    const action = courseActions.updateCourseSuccess(course);
    store.dispatch(action);

    const newStateCourses = store.getState().courses;
    const updatedCourse = newStateCourses.find(c => c.id === course.id);
    const untouchedCourse = newStateCourses.find(c => c.id === 1);

    expect(updatedCourse).toEqual(course);
    expect(untouchedCourse.title).toEqual('A');
    expect(newStateCourses.length).toEqual(3);
  });

  it('should handle deleting a course', () => {
    const course = { id: 2, title: 'B' };

    const action = courseActions.deleteCourseOptimistic(course);
    store.dispatch(action);

    const newStateCourses = store.getState().courses;
    const deletedCourse = newStateCourses.find(c => c.id === course.id);
    const untouchedCourse = newStateCourses.find(c => c.id === 1);

    expect(deletedCourse).toBeUndefined();
    expect(untouchedCourse.title).toEqual('A');
    expect(newStateCourses.length).toEqual(2);
  });

  afterEach(() => {
    store = null;
  });
});
