import React from 'react';
import GreetingContainer from './greeting/greeting_container';

const App = (props) => {
  let greetingContainer = "";
  if (props.location.pathname === '/') {
    greetingContainer = <GreetingContainer />;
  } else {
    greetingContainer = "";
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
      { greetingContainer }
      { props.children }
    </div>
  );
};

export default App;
