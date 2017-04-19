import React from 'react';
import { Link } from 'react-router';

const Home = (props) => {
  const logout = (e) => {
    e.preventDefault();
    props.logout();
  };

  const homeHeader = (
    <header className='home-header'>
      <header className='home-header-left'>
        <h2>.:.:. citysounds</h2>
      </header>
      <header className='home-header-right'>
        <p>Search... &#9906;</p>
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
      { homeHeader }
      <nav className='home-nav'>
        <nav className='home-nav-left'>
          { homeNavLeft }
        </nav>
        <nav className='home-nav-right'>
          { homeNavRight }
        </nav>
      </nav>
      <figure className='home-figure'>
        <figure className='home-figure-photo' />
      </figure>
      <main className='home-main'>
        <aside className='home-main-filter-bar'>
          <aside className='home-main-filter-bar-heading'>
            <h3>Explore</h3>
          </aside>
          <aside className='home-main-filter-bar-filters'>
            <p>filter by:</p>
            <ul>
              <li>length</li>
              <li>upload date</li>
            </ul>
          </aside>
        </aside>
        <aside className='home-main-tag-bar'>
          <ul>
            <li>all</li>
            <li>beach</li>
            <li>rain</li>
          </ul>
        </aside>
      </main>
    </div>
  );

};

export default Home;
