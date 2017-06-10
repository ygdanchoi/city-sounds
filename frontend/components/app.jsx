import React from 'react';
import HomeContainer from './home/home_container';
import NavBarContainer from './nav_bar_container';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.closeNavBarDropdown = this.closeNavBarDropdown.bind(this);
  }

  closeNavBarDropdown(e) {
    this.props.receiveNavBarState({
      pressed: false,
    });
  }

  render() {
    let header;
    if (this.props.location.pathname === '/') {
      header = <HomeContainer location={this.props.location} />;
    } else if (this.props.location.pathname === '/login' || this.props.location.pathname === '/signup') {
      header = null;
    } else {
      header = <NavBarContainer />;
    }
    return (
      <div onClick={ this.closeNavBarDropdown } >
        { header }
        { this.props.children }
      </div>
    );
  }
}

export default App;
