import React from 'react';
import { Link, hashHistory } from 'react-router';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artworkFile: null,
      artworkUrl: '/avatars/original/missing.png',
      soundIds: [],
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    const id = this.props.collectionId;
    if (id) {
      this.props.fetchCollection(id).then(
        (response) => {
          this.setState({
            artworkUrl: response.collection.artworkUrl,
            title: response.collection.title,
            description: response.collection.description,
            soundIds: response.collection.soundIds,
          });
        }
      );
      this.props.fetchCollectionSounds(id);
    }
  }

  render() {
    let tempHeader;
    if (this.props.collectionId) {
      tempHeader = `edit collection ${this.props.collectionId}`;
    } else {
      tempHeader = 'add collection';
    }
    let artwork;
    const artworkMissing = this.state.artworkUrl === '/avatars/original/missing.png';
    if (artworkMissing) {
      artwork = <img style={ { width: '72px', height: '72px' } } />;
    } else {
      artwork = <img style={ { width: '72px', height: '72px' } } src={ this.state.artworkUrl } />;
    }
    const sounds = this.state.soundIds.map(
      (id) => <li key={ id }><p>{ id }</p></li>
    );
    return (
      <div>
        <h1>{ tempHeader }</h1>
        { artwork }
        <p>{ this.state.title === '' ? 'Untitled Collection' : this.state.title }</p>
        <p>by { this.props.currentUser.username }</p>
          <div>
            <p>sounds</p>
            <ul>
              { sounds }
            </ul>
            <a>add sound</a>
          </div>
        <input placeholder='collection name' type='text' value= { this.state.title } />
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.state.description } />
      </div>
    );
  }
}

export default CollectionForm;
