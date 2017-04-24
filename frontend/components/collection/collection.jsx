import React from 'react';
import { Link } from 'react-router';
import UserSidebar from '../user_sidebar/user_sidebar';

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId).then(
      (response) => this.props.fetchUser(response.collection.userId)
    );
    this.props.fetchCollectionSounds(this.props.params.collectionId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.collectionId !== newProps.params.collectionId) {
      this.props.fetchCollection(newProps.params.collectionId).then(
        (response) => this.props.fetchUser(response.collection.userId)
      );
      this.props.fetchCollectionSounds(newProps.params.collectionId);
    }
  }

  render() {
    if (this.props.collection === undefined) {
      return(
        <div className='collection-page'>
          <main className='collection-main'>
            <p>loading...</p>
          </main>
        </div>
      );
    }
    return (
      <div className='collection-page'>
        <main className='collection-main'>
          <section className='collection-info-section'>
            <ul>
              <li>hi</li>
            </ul>
          </section>
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

export default Collection;
