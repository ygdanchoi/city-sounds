import React from 'react';
import { Link } from 'react-router';
import ExploreContainer from './explore_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    window.onscroll = () => {
      const homeHeader = document.getElementById('home-header');
      if (document.body.scrollTop > 555 || document.documentElement.scrollTop > 555) {
        homeHeader.classList.add('off-screen');
      } else {
        homeHeader.classList.remove('off-screen');
      }
    };
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
      <header id='home-header' className='home-header'>
        <header className='home-header-main'>
          <header className='home-header-main-top'>
            <h2>.:.:. citysounds</h2>
            <p>Search... &#9906;</p>
          </header>
          <header className='home-header-main-bottom'>
            <nav className='home-nav-left'>
              { homeNavLeft }
            </nav>
            <nav className='home-nav-right'>
              { homeNavRight }
            </nav>
          </header>
        </header>
      </header>
    );

    return (
      <div>
        { homeHeader }
        <div className='home-header-placeholder'>
        </div>
        <figure className='home-figure'>
        </figure>
        <ExploreContainer />
      </div>
    );
  }
}

export default Home;
