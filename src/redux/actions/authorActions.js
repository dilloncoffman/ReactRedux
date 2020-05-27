import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';

// just returns the action to improve readability and could be used in other dispatches if we had multiple actions
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  // redux-thunk injects dispatch so we don't have to!
  return function (dispatch) {
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
