import React from 'react';
import { Link, hashHistory } from 'react-router';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.collection) {
      this.state = {
        artworkFile: null,
        artworkUrl: this.props.collection.artworkUrl,
        soundIds: this.props.collection.soundIds,
        title: this.props.collection.title,
        description: this.props.collection.description,
      };
    } else {
      this.state = {
        artworkFile: null,
        artworkUrl: '/avatars/original/missing.png',
        soundIds: [],
        title: '',
        description: '',
      };
    }
  }

  componentDidMount() {
    const id = this.props.collectionId;
    if (id && this.props.collection === undefined) {
      this.props.fetchCollection(id).then(
        (response) => {
          this.setState({
            artworkFile: null,
            artworkUrl: response.collection.artworkUrl,
            soundIds: response.collection.soundIds,
            title: response.collection.title,
            description: response.collection.description
          });
        }
      );
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
    return (
      <div>
        <h1>{ tempHeader }</h1>
        { artwork }
        <p>{ this.state.title === '' ? 'Untitled Collection' : this.state.title }</p>
        <p>by { this.props.currentUser.username }</p>
        <p>sounds</p>
        <p>{ this.state.soundIds.join(', ') }</p>
        <input placeholder='collection name' type='text' value= { this.state.title } />
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.state.description } />
      </div>
    );
  }
}

export default CollectionForm;
