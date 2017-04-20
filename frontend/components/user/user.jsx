import React from 'react';
import { Link } from 'react-router';
import CollectionList from './collection_list';
import UserSidebar from './user_sidebar';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user === undefined) {
      return(
        <main className='user-main'>
          <p>loading...</p>
        </main>
      );
    }
    return (
      <main className='user-main'>
        <CollectionList />
        <UserSidebar
          user={ this.props.user }
          currentUserId={ currentUser.id } />
      </main>
    );
  }
}

export default User;
