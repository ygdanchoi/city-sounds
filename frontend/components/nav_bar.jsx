import React from 'react';
import { Link, hashHistory } from 'react-router';
import NavBarDropdown from './nav_bar_dropdown';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    if (!this.props.navBarState.pressed) {
      this.props.receiveNavBarState({
        pressed: true,
      });
    } else {
      this.props.receiveNavBarState({
        pressed: false,
      });
    }
    e.stopPropagation();
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
    const currentUserButtonInner = (caretSrc) => (
      <nav className='nav-bar-center' onClick={ this.toggleDropdown }>
        <figure className='current-user-avatar'>
          { avatar }
        </figure>
        <p className='current-user-username'>{ this.props.currentUser.username }</p>
        <img id='nav-bar-caret' className='current-user-caret' src={ caretSrc } />
        <NavBarDropdown
          currentUser={ this.props.currentUser }
          logout={ this.props.logout }
          navBarState={ this.props.navBarState } />
      </nav>
    );
    let currentUserBar;
    if (this.props.navBarState.pressed) {
      currentUserBar = (
        <li id='nav-bar-current-user' className='nav-bar-main-li nav-bar-main-li-selectable pressed'>
          { currentUserButtonInner(window.images.caretSelected) }
        </li>
      );
    } else {
      currentUserBar = (
        <li id='nav-bar-current-user' className='nav-bar-main-li nav-bar-main-li-selectable'>
          { currentUserButtonInner(window.images.caret) }
        </li>
      );
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
          { currentUserBar }
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
