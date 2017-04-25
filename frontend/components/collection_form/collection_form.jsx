import React from 'react';
import { Link, hashHistory } from 'react-router';
import SoundForm from './sound_form';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artworkFile: null,
      artworkUrl: '/avatars/original/missing.png',
      audioFiles: [],
      audioUrls: [],
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    const id = this.props.collectionId;
    if (id && this.props.collection === undefined) {
      this.props.fetchCollection(id).then(
        (response) => {
          this.setState({
            artworkUrl: response.collection.artworkUrl,
            title: response.collection.title,
            description: response.collection.description
          });
        }
      )
      this.props.fetchCollectionSounds(id).then(
        (response) => {
          this.setState({
            audioUrls: Object.keys(response.sounds).map(
              id => response.sounds[id].audioUrl
            ),
            audioFiles: Array(Object.keys(response.sounds).length)
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
        <SoundForm audioUrls={ this.state.audioUrls } audioFiles={ this.state.audioFiles } />
        <input placeholder='collection name' type='text' value= { this.state.title } />
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.state.description } />
      </div>
    );
  }
}

export default CollectionForm;
