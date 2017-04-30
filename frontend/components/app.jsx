import React from 'react';
import HomeContainer from './home/home_container';
import NavBarContainer from './nav_bar_container';
import { receiveNavBarState } from '../actions/nav_bar_state_actions';

const closeNavBarDropdown = (e) => {
  const navBarDropdown = document.getElementById('nav-bar-dropdown');
  const navBarCurrentUser = document.getElementById('nav-bar-current-user');
  const navBarCaret = document.getElementById('nav-bar-caret');
  if (store.getState().navBarState.pressing) {
    navBarDropdown.classList.remove('opened');
    store.dispatch(receiveNavBarState({
      pressing: false,
    }));
  } else {
    navBarDropdown.classList.add('hidden');
    navBarCurrentUser.classList.remove('pressed');
    navBarCaret.src = window.images.caret;
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
