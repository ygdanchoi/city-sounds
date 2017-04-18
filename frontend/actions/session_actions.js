import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  };
};

export const signup = (user) => {
  return APIUtil.signup(user).then(
    response => dispatch(receiveCurrentUser(response)),
    errors => dispatch(receiveErrors(response))
  );
};

export const login = (user) => {
  return APIUtil.login(user).then(
    response => dispatch(receiveCurrentUser(response)),
    errors => dispatch(receiveErrors(response))
  );
};

export const logout = () => {
  return APIUtil.logout().then(
    response => dispatch(receiveCurrentUser(null))
  );
};
