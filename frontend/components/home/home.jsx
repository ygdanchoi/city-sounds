import React from 'react';
import { Link } from 'react-router';

const Home = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logout();
  };

  if (props.loggedIn) {
    return (
      <nav className='home-nav'>
        <nav className='home-nav-left'>
          Hi { props.currentUser.username } | <Link to={`/users/${props.currentUser.id}`}>your profile</Link>
        </nav>
        <nav className='home-nav-right'>
          <a onClick={ logout } href='/logout'>log out</a>
        </nav>
      </nav>
    );
  } else {
    return (
      <nav className='home-nav'>
        <nav className='home-nav-left'>
          Share & play ambient city soundscapes.
        </nav>
        <nav className='home-nav-right'>
          <Link to='/signup'>sign up</Link> | <Link to='/login'>log in</Link>
        </nav>
      </nav>
    );
  }
};

export default Home;
