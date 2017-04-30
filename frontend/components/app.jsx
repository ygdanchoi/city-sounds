import React from 'react';
import HomeContainer from './home/home_container';
import NavBarContainer from './nav_bar_container';
import { receiveNavBarState } from '../actions/nav_bar_state_actions';

const closeNavBarDropdown = (e) => {
  if (store.getState().navBarState.pressing) {
    store.dispatch(receiveNavBarState({
      pressing: false,
    }));
  } else {
    store.dispatch(receiveNavBarState({
      pressed: false,
    }));
  }
};

const App = (props) => {
  let header;
  if (props.location.pathname === '/') {
    header = <HomeContainer />;
  } else if (props.location.pathname === '/login' || props.location.pathname === '/signup') {
    header = null;
  } else {
    header = <NavBarContainer />;
  }
  return (
    <div onClick={ closeNavBarDropdown } >
      { header }
      { props.children }
    </div>
  );
};

export default App;
