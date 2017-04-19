import React from 'react';
import HomeContainer from './home/home_container';

const App = (props) => {
  let homeContainer = "";
  if (props.location.pathname === '/') {
    homeContainer = <HomeContainer />;
  } else {
    homeContainer = "";
  }
  return (
    <div>
      <header className='home-header'>
        <header className='home-header-left'>
          <h2>.:.:. citysounds</h2>
        </header>
        <header className='home-header-right'>
          <p>Search for collection, sound, or user</p>
        </header>
      </header>
      { homeContainer }
      { props.children }
    </div>
  );
};

export default App;
