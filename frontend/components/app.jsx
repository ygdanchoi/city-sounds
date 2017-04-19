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
      <h1>CitySounds</h1>
      { greetingContainer }
      { props.children }
    </div>
  );
};

export default App;
