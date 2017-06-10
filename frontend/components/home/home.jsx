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
      const homeHeader = this.homeHeader;
      if (105 > this.exploreHeading.getBoundingClientRect().top || 105 > this.exploreHeading.getBoundingClientRect().top) {
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
      <header id='home-header' className='home-header' ref={c => this.homeHeader = c }>
        <header className='home-header-main'>
          <header className='home-header-main-top'>
            <figure className='home-header-logo'>
              <h2><font color="#639aa9">.:.:.</font> citysounds</h2>
            </figure>
            <div className='home-header-search'>
              <form onSubmit={ this.handleSubmit }>
                <input className='home-header-search-input' type='text' value={ this.state.searchQuery } placeholder='Search for collection or sound' onChange={ this.handleChange } />
                <input id='home-header-search-icon' type='submit' value='' />
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
        <div className='home-figure-container'>
          <figure className='home-figure'>
          </figure>
          <img src={ window.images.splash } className='home-splash' />
        </div>
        <div className='explore-heading' ref={c => this.exploreHeading = c }>
          <div className='explore-heading-main'>
            <h3>Explore</h3>
          </div>
        </div>
        <ExploreContainer location={this.props.location} />
      </div>
    );
  }
}

export default Home;
