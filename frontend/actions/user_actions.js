import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users: users
  };
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user: user
  };
};

export const fetchUsers = () => (dispatch) => {
  return APIUtil.fetchUsers().then(
    response => dispatch(receiveUsers(response))
  );
};

export const fetchUser = (id) => (dispatch) => {
  return APIUtil.fetchUser(id).then(
    response => dispatch(receiveUser(response))
  );
};

export const updateUser = (user) => (dispatch) => {
  return APIUtil.updateUser(user).then(
    response => dispatch(receiveUser(response))
  );
};
