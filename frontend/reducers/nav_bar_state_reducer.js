import { RECEIVE_NAV_BAR_STATE } from '../actions/nav_bar_state_actions';
import merge from 'lodash/merge';

const _defaultState = {
  pressed: false,
};

const NavBarStateReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NAV_BAR_STATE:
      return merge({}, state, action.navBarState);
    default:
      return state;
  }
};

export default NavBarStateReducer;
