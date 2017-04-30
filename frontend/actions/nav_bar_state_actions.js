export const RECEIVE_NAV_BAR_STATE = 'RECEIVE_NAV_BAR_STATE';

export const receiveNavBarState = (navBarState) => {
  return {
    type: RECEIVE_NAV_BAR_STATE,
    navBarState: navBarState
  };
};
