import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      return {[action.user.id]: action.user};
    case RECEIVE_CURRENT_USER:
      return {[action.currentUser.id]: action.currentUser};
    default:
      return state;
  }
};

export default UsersReducer;
