import React from 'react';
import { Link } from 'react-router';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user === undefined) {
      return(
        <main>
          <p>loading...</p>
        </main>
      );
    }
    return (
      <main>
        <img src={ this.props.user.profile_pic_url } />
        <p>{ this.props.user.username }</p>
        <p>{ this.props.user.location }</p>
        <p>{ this.props.user.bio }</p>
      </main>
    );
  }
}

export default User;
