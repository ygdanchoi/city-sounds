import React from 'react';
import { Link } from 'react-router';

class UserSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <aside>
        <img src={ this.props.user.avatarUrl } />
        <p>{ this.props.user.username }</p>
        <p>{ this.props.user.location }</p>
        <p>{ this.props.user.bio }</p>
      </aside>
    );
  }
}

export default UserSidebar;