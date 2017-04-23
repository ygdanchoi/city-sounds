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
        <li onClick={ this.handleProfile }><p>profile</p></li>
        <li onClick={ this.handleLogOut }><p>log out</p></li>
      </ul>
    );
  }
}

export default NavBarDropdown;
