import React from 'react';
import { Link } from 'react-router';

class NavBarDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='nav-bar-dropdown hidden'>
        <li>your profile</li>
        <li>log out</li>
      </ul>
    );
  }
}

export default NavBarDropdown;
