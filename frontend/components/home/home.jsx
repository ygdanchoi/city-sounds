import React from 'react';
import { Link, hashHistory } from 'react-router';
import ExploreContainer from './explore_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      searchQuery: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.onscroll = () => {
      const homeHeader = document.getElementById('home-header');
      if (document.body.scrollTop > 555 || document.documentElement.scrollTop > 555) {
        homeHeader.classList.add('off-screen');
      } else {
        homeHeader.classList.remove('off-screen');
      }
    };
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    hashHistory.push(`/search?${this.state.searchQuery}`);
  }

  render() {

    let homeNavLeft;
    let homeNavRight;
    if (this.props.loggedIn) {
      homeNavLeft = (
        <ul className='home-nav-left'>
          <li><p className='home-nav-greeting'>Hi { this.props.currentUser.username }</p></li>
          <div className='home-nav-divider' />
          <li><Link to={`/users/${this.props.currentUser.id}`}><p>your profile</p></Link></li>
        </ul>
      );
      homeNavRight = (
        <ul className='home-nav-right'>
          <li><p><a onClick={ this.logout } href='/logout'>log out</a></p></li>
        </ul>
      );
    } else {
      homeNavLeft = (
        <ul className='home-nav-left'>
          <li><p className='home-nav-slogan'>Share & play ambient city soundscapes.</p></li>
        </ul>
      );
      homeNavRight = (
        <ul className='home-nav-right'>
          <li><Link to='/signup'><p>sign up</p></Link></li>
          <div className='home-nav-divider' />
          <li><Link to='/login'><p>log in</p></Link></li>
        </ul>
      );
    }

    const homeHeader = (
      <header id='home-header' className='home-header'>
        <header className='home-header-main'>
          <header className='home-header-main-top'>
            <figure className='home-header-logo'>
              <h2><font color="#639aa9">.:.:.</font> citysounds</h2>
            </figure>
            <div className='home-header-search'>
              <form onSubmit={ this.handleSubmit }>
                <input type='text' value={ this.state.searchQuery } placeholder='Search for collection or sound' onChange={ this.handleChange } />
              </form>
            </div>
          </header>
          <header className='home-header-main-bottom'>
            { homeNavLeft }
            { homeNavRight }
          </header>
        </header>
      </header>
    );

    return (
      <div>
        { homeHeader }
        <div className='home-header-placeholder'>
        </div>
        <figure className='home-figure'>
        </figure>
        <div className='explore-heading'>
          <div className='explore-heading-main'>
            <h3>Discover</h3>
          </div>
        </div>
        <ExploreContainer />
      </div>
    );
  }
}

export default Home;
