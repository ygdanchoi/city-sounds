import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let navBar;
    if (this.props.loggedIn) {
      navBar = <h2>.:.:. nav bar (logged in)</h2>;
    } else {
      navBar = null;
    }
    return (
      <header>
        { navBar }
      </header>
    );
  }
}

export default NavBar;
