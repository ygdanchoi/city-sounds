import React from 'react';
import { Link, hashHistory } from 'react-router';

class NavBarDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleProfile(e) {
    e.preventDefault();
    this.redirectToUserProfile();
  }

  redirectToUserProfile() {
    hashHistory.push(`/users/${this.props.currentUser.id}`);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout();
    this.redirectToRoot();
  }

  redirectToRoot() {
    hashHistory.push(`/`);
  }

  render() {
    return (
      <ul className='nav-bar-dropdown hidden' id='nav-bar-dropdown'>
        <li><p><Link onClick={ this.handleProfile }>your profile</Link></p></li>
        <li><p><Link onClick={ this.handleLogOut }>log out</Link></p></li>
      </ul>
    );
  }
}

export default NavBarDropdown;
