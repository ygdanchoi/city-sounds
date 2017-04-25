import * as APIUtil from '../util/session_api_util';
import { RECEIVE_ERRORS, receiveErrors } from '../actions/error_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
};

export const signup = (user) => (dispatch) => {
  return APIUtil.signup(user).then(
    response => dispatch(receiveCurrentUser(response)),
    response => dispatch(receiveErrors(response.responseJSON))
  );
};

export const login = (user) => (dispatch) => {
  return APIUtil.login(user).then(
    response => dispatch(receiveCurrentUser(response)),
    response => dispatch(receiveErrors(response.responseJSON))
  );
};

export const logout = () => (dispatch) => {
  return APIUtil.logout().then(
    response => dispatch(receiveCurrentUser(null))
  );
};
