import React from 'react';
import { Link, hashHistory } from 'react-router';
import SoundListItem from './sound_list_item';
import CollectionFormCollectionSubForm from './collection_form_collection_sub_form';

class CollectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artworkFile: null,
      artworkUrl: '/avatars/original/missing.png',
      sounds: [],
      soundsToDelete: [],
      title: '',
      description: '',
      currentForm: null,
    };
    this.handleAddSound = this.handleAddSound.bind(this);
    this.handleChangeSound = this.handleChangeSound.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleDeleteSound = this.handleDeleteSound.bind(this);
    this.handleAddArtwork = this.handleAddArtwork.bind(this);
    this.handleDeleteArtwork = this.handleDeleteArtwork.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClickCollectionTab = this.handleClickCollectionTab.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
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
      const sound = {
        title: '',
        duration: 0,
        audioFile: file,
        audioUrl: fileReader.result,
      };
      this.setState({
        sounds: this.state.sounds.concat(sound)
      });
    }).bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
    e.currentTarget.value = '';
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.currentTarget.value,
      currentForm: (
        <CollectionFormCollectionSubForm
          title={ e.currentTarget.value }
          description={ this.state.description }
          handleChangeTitle={ this.handleChangeTitle }
          handleChangeDescription={ this.handleChangeDescription }
          errors={ this.props.errors }
          artworkUrl={ this.state.artworkUrl }
          handleAddArtwork={ this.handleAddArtwork }
          handleClickArtwork={ this.handleClickArtwork }
          artworkUrl={ this.state.artworkUrl }
          handleDeleteArtwork={ this.handleDeleteArtwork } />
        )
    });
  }

  handleChangeDescription(e) {
    this.setState({
      description: e.currentTarget.value,
      currentForm: (
        <CollectionFormCollectionSubForm
          title={ this.state.title }
          description={ e.currentTarget.value }
          handleChangeTitle={ this.handleChangeTitle }
          handleChangeDescription={ this.handleChangeDescription }
          errors={ this.props.errors }
          artworkUrl={ this.state.artworkUrl }
          handleAddArtwork={ this.handleAddArtwork }
          handleClickArtwork={ this.handleClickArtwork }
          artworkUrl={ this.state.artworkUrl }
          handleDeleteArtwork={ this.handleDeleteArtwork } />
        )
    });
  }

  handleChangeSound(idx) {
    return (field) => {
      return (e) => {
        const sounds = this.state.sounds.slice();
        sounds[idx][field] = e.currentTarget.value;
        this.setState({
          sounds: sounds
        });
      };
    };
  }

  handleDeleteSound(idx) {
    return (e) => {
      e.preventDefault();
      const sounds = this.state.sounds;
      this.setState({
        sounds: sounds.slice(0, idx).concat(sounds.slice(idx + 1)),
        soundsToDelete: this.state.soundsToDelete.concat(sounds[idx])
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

  handleCreate(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('collection[artwork]', this.state.artworkFile);
    formData.append('collection[sounds]', JSON.stringify(this.state.sounds));
    for (let i = 0; i < this.state.sounds.length; i++) {
      formData.append(`collection[audio${i}]`, this.state.sounds[i].audioFile);
    }
    formData.append('collection[title]', this.state.title);
    formData.append('collection[description]', this.state.description);
    formData.append('collection[user_id]', this.props.currentUser.id);
    this.props.createCollection(formData).then(
      (response) => this.redirectToCollection(response.collection.id)
    );
  }

  handleUpdate(e) {
    const id = this.props.collectionId;
    e.preventDefault();
    let formData = new FormData();
    formData.append('collection[id]', id);
    formData.append('collection[artwork]', this.state.artworkFile);
    formData.append('collection[sounds]', JSON.stringify(this.state.sounds));
    for (let i = 0; i < this.state.sounds.length; i++) {
      formData.append(`collection[audio${i}]`, this.state.sounds[i].audioFile);
    }
    formData.append('collection[title]', this.state.title);
    formData.append('collection[description]', this.state.description);
    formData.append('collection[user_id]', this.props.currentUser.id);
    this.state.soundsToDelete.forEach((sound) => {
      this.props.deleteSound(sound.id);
    });
    this.props.updateCollection(id, formData).then(
      () => this.redirectToCollection(id)
    );
  }

  redirectToCollection(id) {
    hashHistory.push(`collections/${id}`);
  }

  handleClickCollectionTab() {
    this.setState({
      currentForm: (
        <CollectionFormCollectionSubForm
          title={ this.state.title }
          description={ this.state.description }
          handleChangeTitle={ this.handleChangeTitle }
          handleChangeDescription={ this.handleChangeDescription }
          errors={ this.props.errors }
          artworkUrl={ this.state.artworkUrl }
          handleAddArtwork={ this.handleAddArtwork }
          handleClickArtwork={ this.handleClickArtwork }
          artworkUrl={ this.state.artworkUrl }
          handleDeleteArtwork={ this.handleDeleteArtwork } />
      )
    });
  }

  render() {
    const id = this.props.collectionId;
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
    const sounds = this.state.sounds.map(
      (sound, idx) => (
        <SoundListItem
          key={ idx }
          sound={ sound }
          idx={ idx }
          handleChange={ this.handleChangeSound(idx) }
          handleDeleteSound={ this.handleDeleteSound(idx) } />
      )
    );

    let titleErrors = [];
    let soundsErrors = [];
    if (this.props.errors.title) {
      titleErrors = 'Title ' + this.props.errors.title.join(', ');
    }
    if (this.props.errors.sounds) {
      soundsErrors = this.props.errors.sounds.join(', ');
    }

    return (
      <div className='collection-form'>
        <main className='collection-form-main'>
          <section className='collection-form-main-left'>
            <div className='collection-form-collection-tab' onClick={ this.handleClickCollectionTab }>
              { artwork }
              <p>{ this.state.title === '' ? 'Untitled Collection' : this.state.title }</p>
              <p>by { this.props.currentUser.username }</p>
            </div>
            <div>
              <p>sounds</p>
              <ul>
                { sounds }
              </ul>
              <input id='sound-input' type='file'
                onChange={ this.handleAddSound }
                style={ { display: 'none' } } />
              <a href='' onClick={ this.handleClickSound }>add sound</a>
              { soundsErrors }
            </div>
            <button onClick={ this.handleCreate }>handleCreate</button>
            <button onClick={ this.handleUpdate }>handleUpdate</button>
          </section>
          <section className='collection-form-main-right'>
            { this.state.currentForm }
          </section>
        </main>
      </div>
    );
  }
}

export default CollectionForm;
