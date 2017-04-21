import React from 'react';
import { Link } from 'react-router';
import NavBarDropdown from './nav_bar_dropdown';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    const navBarDropdown = $('#nav-bar-dropdown');
    if (navBarDropdown.hasClass('hidden')) {
      navBarDropdown.removeClass('hidden');
      navBarDropdown.addClass('opened');
    } else {
      navBarDropdown.addClass('hidden');
      navBarDropdown.removeClass('opened');
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <header className='nav-bar'>{null}</header>;
    }
    let avatar;
    if (this.props.currentUser.avatarUrl === '/avatars/original/missing.png') {
      avatar = <img />;
    } else {
      avatar = <img src={ this.props.currentUser.avatarUrl } />;
    }
    return (
      <header className='nav-bar'>
        <div className='nav-bar-stripe-top' />
        <nav className='nav-bar-main'>
          <nav className='nav-bar-left'>
            <figure className='nav-bar-logo'>
              <h3><Link to='/' style={{ textDecoration: 'none' }}>.:.:.</Link></h3>
            </figure>
          </nav>
          <nav className='nav-bar-right' onClick={ this.toggleDropdown }>
            <figure className='nav-bar-profile-pic'>
              { avatar }
            </figure>
            <p>{ this.props.currentUser.username } &#9662;</p>
            <NavBarDropdown
              currentUser={ this.props.currentUser }
              logout={ this.props.logout } />;
          </nav>
        </nav>
      </header>
    );
  }
}

export default NavBar;
