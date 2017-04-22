import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBarDropdown from './nav_bar_dropdown';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    const navBarDropdown = document.getElementById('nav-bar-dropdown');
    const navBarCurrentUser = document.getElementById('nav-bar-current-user');
    if (navBarDropdown.classList.contains('hidden')) {
      navBarDropdown.classList.remove('hidden');
      navBarDropdown.classList.add('opened');
      navBarCurrentUser.classList.add('pressed');
    } else {
      navBarDropdown.classList.add('hidden');
      navBarDropdown.classList.remove('opened');
      navBarCurrentUser.classList.remove('pressed');
    }
  }

  redirectToRoot() {
    hashHistory.push('/');
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
        <ul className='nav-bar-main-ul'>
          <li className='nav-bar-main-li nav-bar-main-li-selectable' onClick={ this.redirectToRoot }>
            <nav className='nav-bar-left'>
              <figure className='nav-bar-logo'>
                <h3>.:.:.</h3>
              </figure>
            </nav>
          </li>
          <li className='nav-bar-main-li nav-bar-main-li-empty'>
            <nav className='nav-bar-empty' />
          </li>
        </ul>
        <ul className='nav-bar-main-ul nav-bar-main-ul-center'>
          <li className='nav-bar-main-li nav-bar-main-li-selectable'>
            <nav className='nav-bar-center'>
              <p>add sound</p>
            </nav>
          </li>
          <li className='nav-bar-main-li nav-bar-main-li-empty'>
            <nav className='nav-bar-empty' />
          </li>
          <li id='nav-bar-current-user' className='nav-bar-main-li nav-bar-main-li-selectable'>
            <nav className='nav-bar-center' onClick={ this.toggleDropdown }>
              <figure className='nav-bar-profile-pic'>
                { avatar }
              </figure>
              <p>{ this.props.currentUser.username } &#9662;</p>
              <NavBarDropdown
                currentUser={ this.props.currentUser }
                logout={ this.props.logout } />
            </nav>
          </li>
        </ul>
        <ul className='nav-bar-main-ul'>
          <li className='nav-bar-main-li nav-bar-main-li-empty'>
            <nav className='nav-bar-empty' />
          </li>
          <li className='nav-bar-main-li'>
            <nav className='nav-bar-left' />
          </li>
        </ul>
      </header>
    );
  }
}

export default NavBar;
