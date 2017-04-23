import React from 'react';
import { Link } from 'react-router';
import CollectionList from './collection_list';
import UserSidebar from './user_sidebar';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.params.userId);
  }

  componentWillReceiveProps(newProps) {
  }

  render() {
    if (this.props.user === undefined) {
      return(
        <div className='user-page'>
          <main className='user-main'>
            <p>loading...</p>
          </main>
        </div>
      );
    }
    return (
      <div className='user-page'>
        <main className='user-main'>
          <CollectionList />
          <UserSidebar
            user={ this.props.user }
            ownProfile={ this.props.currentUser && this.props.user.id === this.props.currentUser.id }
            updateUser={ this.props.updateUser }
            updateUserAvatar={ this.props.updateUserAvatar } />
        </main>
      </div>
    );
  }
}

export default User;
