import React from 'react';
import HomeContainer from './home/home_container';
import NavBarContainer from './nav_bar_container';

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
    <div>
      { header }
      { props.children }
    </div>
  );
};

export default App;
