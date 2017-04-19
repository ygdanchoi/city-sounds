import React from 'react';
import HomeContainer from './home/home_container';

const App = (props) => {
  let homeContainer;
  if (props.location.pathname === '/') {
    homeContainer = <HomeContainer />;
  } else {
    homeContainer = "";
  }
  return (
    <div>
      { homeContainer }
      { props.children }
    </div>
  );
};

export default App;
