import * as types from '../actions/actionTypes';
import initialState from '../initialState';

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors; // since whatever is returned from our API will simply replace what was in our state from the dispatch payload, all we have to do is return the dispatch payload of authors here
    default:
      return state;
  }
}
