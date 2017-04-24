import React from 'react';
import { Link } from 'react-router';
import UserSidebar from '../user_sidebar/user_sidebar';

class Collection extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId);
    this.props.fetchCollectionSounds(this.props.params.collectionId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.collectionId !== newProps.params.collectionId) {
      this.props.fetchCollection(newProps.params.collectionId);
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
            <p>{ this.props.collection.title }</p>
            <p>by { this.props.collection.user.username }</p>
            <p>{ this.props.collection.description }</p>
            <ul>
              { this.props.collection.soundIds.map(id => this.props.sounds[id].title ) }
            </ul>
          </section>
          <UserSidebar
            user={ this.props.collection.user }
            ownProfile={ this.props.currentUser && this.props.collection.user.id === this.props.currentUser.id }
            updateUser={ this.props.updateUser }
            updateUserAvatar={ this.props.updateUserAvatar } />
        </main>
      </div>
    );
  }
}

export default Collection;
