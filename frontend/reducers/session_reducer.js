import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from '../actions/session_actions';
import { RECEIVE_UPDATED_USER } from '../actions/user_actions';
import merge from 'lodash/merge';

const _nullUser = Object.freeze({
  currentUser: null,
});

const SessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = { currentUser: action.currentUser };
      return merge({}, _nullUser, currentUser);
    case RECEIVE_UPDATED_USER:
      const updatedUser = { currentUser: action.updatedUser };
      return merge({}, _nullUser, updatedUser);
    default:
      return state;
  }
};

export default SessionReducer;
