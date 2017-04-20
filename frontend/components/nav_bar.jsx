import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          <nav className='nav-bar-right'>
            <figure className='nav-bar-profile-pic'>
              <img src={ this.props.currentUser.profile_pic_url }></img>
            </figure>
            <p>{ this.props.currentUser.username }</p>
          </nav>
        </nav>
      </header>
    );
  }
}

export default NavBar;
