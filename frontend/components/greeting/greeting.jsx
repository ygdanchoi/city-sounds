import React from 'react';
import { Link } from 'react-router';

const Greeting = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logout();
  };

  if (props.loggedIn) {
    return (
      <div>
        <div>
          Hi { props.currentUser.username } | <Link to={`/users/${props.currentUser.id}`}>your profile</Link>
        </div>
        <div>
          <Link to='/signup'>sign up</Link> | <Link onClick={ logout } to='/logout'>log out</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          Share & play ambient city soundscapes.
        </div>
        <div>
          <Link to='/signup'>sign up</Link> | <Link to='/login'>log in</Link>
        </div>
      </div>
    );
  }
};

export default Greeting;
