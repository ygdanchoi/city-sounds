import React from 'react';
import { Link } from 'react-router';
import NavBarDropdown from './nav_bar_dropdown';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    console.log('toggle');
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    let navBarDropdown;
    if (this.state.showDropdown) {
      navBarDropdown = <NavBarDropdown />;
    } else {
      navBarDropdown = null;
    }
    if (!this.props.loggedIn) {
      return <header className='nav-bar'>{null}</header>;
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
              <img src={ this.props.currentUser.avatarUrl }></img>
            </figure>
            <p>{ this.props.currentUser.username } &#9662;</p>
            { navBarDropdown }
          </nav>
        </nav>
      </header>
    );
  }
}

export default NavBar;
