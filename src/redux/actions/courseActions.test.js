import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';

// Unit testing action creators is too redundant (useless)
describe('createCourseSuccess', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    // setup
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    const action = courseActions.createCourseSuccess(course);
    expect(action).toEqual(expectedAction);
  });
});
