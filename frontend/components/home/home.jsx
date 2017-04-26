import React from 'react';
import { Link } from 'react-router';
import ExploreContainer from './explore_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    let homeNavLeft;
    let homeNavRight;
    if (this.props.loggedIn) {
      homeNavLeft = <p>Hi { this.props.currentUser.username } | <Link to={`/users/${this.props.currentUser.id}`}>your profile</Link></p>;
      homeNavRight = <p><a onClick={ this.logout } href='/logout'>log out</a></p>;
    } else {
      homeNavLeft = <p>Share & play ambient city soundscapes.</p>;
      homeNavRight = <p><Link to='/signup'>sign up</Link> | <Link to='/login'>log in</Link></p>;
    }

    const homeHeader = (
      <header className='home-header'>
        <header className='home-header-top'>
          <h2>.:.:. citysounds</h2>
          <p>Search... &#9906;</p>
        </header>
        <header className='home-header-bottom'>
          <nav className='home-nav-left'>
            { homeNavLeft }
          </nav>
          <nav className='home-nav-right'>
            { homeNavRight }
          </nav>
        </header>
      </header>
    );

    return (
      <div>
        { homeHeader }
        <figure className='home-figure' />
        <ExploreContainer />
      </div>
    );
  }
}

export default Home;
