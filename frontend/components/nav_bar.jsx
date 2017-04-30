import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBarDropdown from './nav_bar_dropdown';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    const navBarCurrentUser = document.getElementById('nav-bar-current-user');
    const navBarCaret = document.getElementById('nav-bar-caret');
    if (!this.props.navBarState.pressed) {
      navBarCurrentUser.classList.add('pressed');
      navBarCaret.src = window.images.caretSelected;
      this.props.receiveNavBarState({
        pressed: true,
        pressing: true,
      });
    } else {
      navBarCurrentUser.classList.remove('pressed');
      navBarCaret.src = window.images.caret;
      this.props.receiveNavBarState({
        pressed: false,
        pressing: false,
      });
    }
  }

  redirectToRoot() {
    hashHistory.push('/');
  }

  redirectToAddSounds() {
    hashHistory.push('/add-collection');
  }

  render() {
    if (!this.props.loggedIn) {
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
        </header>
      );
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
                <h3><font color="#639aa9">.:.:.</font></h3>
              </figure>
            </nav>
          </li>
          <li className='nav-bar-main-li nav-bar-main-li-empty'>
            <nav className='nav-bar-empty' />
          </li>
        </ul>
        <ul className='nav-bar-main-ul nav-bar-main-ul-center'>
          <li className='nav-bar-main-li nav-bar-main-li-selectable' onClick={ this.redirectToAddSounds }>
            <nav className='nav-bar-center'>
              <p className='nav-bar-add-sound'>add sound collection</p>
            </nav>
          </li>
          <li className='nav-bar-main-li nav-bar-main-li-empty'>
            <nav className='nav-bar-empty' />
          </li>
          <li id='nav-bar-current-user' className='nav-bar-main-li nav-bar-main-li-selectable'>
            <nav className='nav-bar-center' onClick={ this.toggleDropdown }>
              <figure className='current-user-avatar'>
                { avatar }
              </figure>
              <p className='current-user-username'>{ this.props.currentUser.username }</p>
              <img id='nav-bar-caret' className='current-user-caret' src={ window.images.caret } />
              <NavBarDropdown
                currentUser={ this.props.currentUser }
                logout={ this.props.logout }
                navBarState={ this.props.navBarState } />
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
