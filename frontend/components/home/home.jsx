import React from 'react';
import { Link } from 'react-router';

const Home = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logout();
  };

  const header = (
    <header className='home-header'>
      <header className='home-header-left'>
        <h2>.:.:. citysounds</h2>
      </header>
      <header className='home-header-right'>
        <p>Search for collection, sound, or user</p>
      </header>
    </header>
  );

  let homeNavLeft;
  let homeNavRight;
  if (props.loggedIn) {
    homeNavLeft = <p>Hi { props.currentUser.username } | <Link to={`/users/${props.currentUser.id}`}>your profile</Link></p>;
    homeNavRight = <p><a onClick={ logout } href='/logout'>log out</a></p>;
  } else {
    homeNavLeft = <p>Share & play ambient city soundscapes.</p>;
    homeNavRight = <p><Link to='/signup'>sign up</Link> | <Link to='/login'>log in</Link></p>;
  }

  return (
    <div>
      { header }
      <nav className='home-nav'>
        <nav className='home-nav-left'>
          { homeNavLeft }
        </nav>
        <nav className='home-nav-right'>
          { homeNavRight }
        </nav>
      </nav>
    </div>
  );

};

export default Home;
