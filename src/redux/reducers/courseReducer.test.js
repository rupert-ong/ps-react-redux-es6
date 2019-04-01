import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('courseReducer Tests', () => {
  let initialState;
  let newCourse;

  beforeAll(() => {
    initialState = [
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' }
    ];
    newCourse = {
      id: 4,
      title: 'D'
    };
  });

  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const action = actions.createCourseSuccess(newCourse);
    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(4);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
    expect(newState[3].title).toEqual('D');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const course = { id: 2, title: 'New Title' };

    const action = actions.updateCourseSuccess(course);
    const newState = courseReducer(initialState, action);

    const updatedCourse = newState.find(a => a.id === course.id);
    const untouchedCourse = newState.find(a => a.id === 1);

    expect(updatedCourse.title).toEqual('New Title');
    expect(untouchedCourse.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });

  it('should delete a course when passed DELETE_COURSE_OPTIMISITC', () => {
    const course = { id: 2, name: 'B' };

    const action = actions.deleteCourseOptimistic(course);
    const newState = courseReducer(initialState, action);

    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('C');
    expect(newState.length).toEqual(2);
  });
});
