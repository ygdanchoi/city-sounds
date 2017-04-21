import React from 'react';
import HomeContainer from './home/home_container';
import NavBarContainer from './nav_bar_container';

const closeNavBarDropdown = (e) => {
  const navBarDropdown = document.getElementById('nav-bar-dropdown');
  if (navBarDropdown.classList.contains('opened')) {
    navBarDropdown.classList.remove('opened');
  } else {
    navBarDropdown.classList.add('hidden');
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
