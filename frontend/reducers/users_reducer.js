import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_UPDATED_USER } from '../actions/user_actions';
import merge from 'lodash/merge';

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      return {[action.user.id]: action.user};
    case RECEIVE_UPDATED_USER:
      return {[action.updatedUser.id]: action.updatedUser};
    default:
      return state;
  }
};

export default UsersReducer;
