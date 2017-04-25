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
    this.handleAddSound = this.handleAddSound.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddArtwork = this.handleAddArtwork.bind(this);
    this.handleDeleteArtwork = this.handleDeleteArtwork.bind(this);
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

  handleClickSound(e) {
    e.preventDefault();
    const soundInput = document.getElementById('sound-input');
    soundInput.click();
  }

  handleAddSound(e) {
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
      duration: 0,
      audioUrl: null,
      audioFile: file,
    };
    this.setState({
      sounds: this.state.sounds.concat(sound)
    });
    e.currentTarget.value = '';
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleClickArtwork(e) {
    e.preventDefault();
    const artworkInput = document.getElementById('artwork-input');
    artworkInput.click();
  }

  handleAddArtwork(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (() => {
      this.setState({
        artworkFile: file,
        artworkUrl: fileReader.result
      });
    }).bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleDeleteArtwork(e) {
    e.preventDefault();
    this.setState({
      artworkFile: null,
      artworkUrl: '/avatars/original/missing.png',
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
    let artworkForm;
    const artworkMissing = this.state.artworkUrl === '/avatars/original/missing.png';
    if (artworkMissing) {
      artwork = <img style={ { width: '72px', height: '72px' } } />;
      artworkForm = (
        <div className='collection-form-artwork-missing'>
          <input id='artwork-input' type='file'
            onChange={ this.handleAddArtwork }
            style={ { display: 'none' } } />
          <a href='' onClick={ this.handleClickArtwork }>upload artwork</a>
        </div>
      );
    } else {
      artwork = <img style={ { width: '72px', height: '72px' } } src={ this.state.artworkUrl } />;
      artworkForm = (
        <div className='collection-form-avatar-container'>
          <img style={ { width: '210px', height: '210px' } } src={ this.state.artworkUrl } />
          <div className='collection-form-avatar-delete' >
            <a href='' onClick={ this.handleDeleteArtwork }>X</a>
          </div>
        </div>
      );
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
              onChange={ this.handleAddSound }
              style={ { display: 'none' } } />
            <a href='' onClick={ this.handleClickFile }>add sound</a>
          </div>
        <input placeholder='collection name' type='text' value= { this.state.title } onChange={ this.handleChange('title') } />
        { artworkForm }
        <label htmlFor='collection-form-description-input'>about this collection</label>
        <textarea id='collection-form-desciption-input' value= { this.state.description } onChange={ this.handleChange('description') } />
      </div>
    );
  }
}

export default CollectionForm;
