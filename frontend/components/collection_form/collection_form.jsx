import React from 'react';
import { Link, hashHistory } from 'react-router';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artworkFile: null,
      artworkUrl: '/avatars/original/missing.png',
      sounds: [],
      title: '',
      description: '',
    };
    this.handleAddAudio = this.handleAddAudio.bind(this);
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
          });
        }
      );
      this.props.fetchCollectionSounds(id).then(
        (response) => {
          this.setState({
            sounds: Object.keys(response.sounds).map(
              id => response.sounds[id]
            )
          });
        }
      );
    }
  }

  handleClickFile(e) {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  }

  handleAddAudio(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (() => {
      this.setState({
        avatarFile: file,
        avatarUrl: fileReader.result
      });
    }).bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
    const sound = {
      title: 'new sound',
      duration: 1,
      audioUrl: null,
      audioFile: file,
    };
    this.setState({
      sounds: this.state.sounds.concat(sound)
    });
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
    let soundKey = 0;
    const sounds = this.state.sounds.map(
      sound => (
        <li key={ ++soundKey }>
          <p>{ soundKey + '. title: ' + sound.title }</p>
          <p>{ soundKey + '. duration: ' + sound.duration }</p>
          <p>{ soundKey + '. audioUrl: ' + sound.audioUrl }</p>
          <p>{ soundKey + '. audioFile: ' + (sound.audioFile ? sound.audioFile.name : null) }</p>
        </li>
      )
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
            <input id='file-input' type='file'
              onChange={ this.handleAddAudio }
              style={ { display: 'none' } } />
            <a href='' onClick={ this.handleClickFile }>add sound</a>
          </div>
        <input placeholder='collection name' type='text' value= { this.state.title } />
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.state.description } />
      </div>
    );
  }
}

export default CollectionForm;
