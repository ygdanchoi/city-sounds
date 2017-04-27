import React from 'react';
import { Link, hashHistory } from 'react-router';
import SoundListItem from './sound_list_item';
import CollectionFormCollectionSubForm from './collection_form_collection_sub_form';
import CollectionFormSoundSubForm from './collection_form_sound_sub_form';

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
    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteSound = this.handleDeleteSound.bind(this);
    this.handleAddArtwork = this.handleAddArtwork.bind(this);
    this.handleDeleteArtwork = this.handleDeleteArtwork.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickCollectionTab = this.handleClickCollectionTab.bind(this);
    this.handleClickSoundTab = this.handleClickSoundTab.bind(this);
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
      )
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

  componentWillReceiveProps(newProps) {
    this.handleClickCollectionTab();
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
        description: 0,
        audioFile: file,
        audioUrl: fileReader.result,
      };
      this.setState({
        sounds: this.state.sounds.concat(sound),
        currentForm: (
          <CollectionFormSoundSubForm
            title={ '' }
            description={ 0 }
            idx={ this.state.sounds.length }
            handleChange={ this.handleChangeSound(this.state.sounds.length) } />
        )
      });
    }).bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
    e.currentTarget.value = '';
  }

    handleChange(field) {
      return (e) => {
        if (field === 'title') {
          this.setState({
            title: e.currentTarget.value,
            currentForm: (
              <CollectionFormCollectionSubForm
                title={ e.currentTarget.value }
                description={ this.state.description }
                handleChange={ this.handleChange }
                errors={ this.props.errors }
                artworkUrl={ this.state.artworkUrl }
                handleAddArtwork={ this.handleAddArtwork }
                handleClickArtwork={ this.handleClickArtwork }
                handleDeleteArtwork={ this.handleDeleteArtwork } />
            )
          });
        } else if (field === 'description') {
            this.setState({
            description: e.currentTarget.value,
            currentForm: (
              <CollectionFormCollectionSubForm
                title={ this.state.title }
                description={ e.currentTarget.value }
                handleChange={ this.handleChange }
                errors={ this.props.errors }
                artworkUrl={ this.state.artworkUrl }
                handleAddArtwork={ this.handleAddArtwork }
                handleClickArtwork={ this.handleClickArtwork }
                handleDeleteArtwork={ this.handleDeleteArtwork } />
            )
          });
        }
      }
  }

  handleChangeSound(idx) {
    return (field, formProps) => {
      return (e) => {
        const sounds = this.state.sounds.slice();
        sounds[idx][field] = e.currentTarget.value;
        if (field === 'title') {
          this.setState({
            sounds: sounds,
            currentForm: (
              <CollectionFormSoundSubForm
                title={ e.currentTarget.value }
                description={ formProps.description }
                idx={ formProps.idx }
                handleChange={ formProps.handleChange } />
            )
          });
        } else if (field === 'description') {
          this.setState({
            sounds: sounds,
            currentForm: (
              <CollectionFormSoundSubForm
                title={ formProps.title }
                description={ e.currentTarget.value }
                idx={ formProps.idx }
                handleChange={ formProps.handleChange } />
            )
          });
        }
      };
    };
  }

  handleDeleteSound(idx) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      const sounds = this.state.sounds;
      this.setState({
        sounds: sounds.slice(0, idx).concat(sounds.slice(idx + 1)),
        soundsToDelete: this.state.soundsToDelete.concat(sounds[idx])
      });
      this.handleClickCollectionTab();
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
        artworkUrl: fileReader.result,
        currentForm: (
          <CollectionFormCollectionSubForm
            title={ this.state.title }
            description={ this.state.description }
            handleChange={ this.handleChange }
            errors={ this.props.errors }
            artworkUrl={ fileReader.result }
            handleAddArtwork={ this.handleAddArtwork }
            handleClickArtwork={ this.handleClickArtwork }
            handleDeleteArtwork={ this.handleDeleteArtwork } />
        )
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
      currentForm: (
        <CollectionFormCollectionSubForm
          title={ this.state.title }
          description={ this.state.description }
          handleChange={ this.handleChange }
          errors={ this.props.errors }
          artworkUrl={ '/avatars/original/missing.png' }
          handleAddArtwork={ this.handleAddArtwork }
          handleClickArtwork={ this.handleClickArtwork }
          handleDeleteArtwork={ this.handleDeleteArtwork } />
      )
    });
  }

  handleSubmit(e) {
    let id = null;
    e.preventDefault();
    let formData = new FormData();
    if (this.props.submitText === 'Update') {
      id = this.props.collectionId;
      formData.append('collection[id]', id);
    }
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
    this.props.submitCollection(id, formData).then(
      (response) => this.redirectToCollection(response.collection.id)
    );
  }

  redirectToCollection(id) {
    hashHistory.push(`collections/${id}`);
  }

  handleClickCollectionTab() {
    const collectionTab = document.getElementById('collection-form-collection-tab');
    collectionTab.classList.add('tab-clicked');
    const soundTabs = document.getElementsByClassName('collection-form-sound-tab');
    for (let i = 0; i < soundTabs.length; i++) {
      soundTabs[i].classList.remove('tab-clicked');
    }
    this.setState({
      currentForm: (
        <CollectionFormCollectionSubForm
          title={ this.state.title }
          description={ this.state.description }
          handleChange={ this.handleChange }
          errors={ this.props.errors }
          handleAddArtwork={ this.handleAddArtwork }
          handleClickArtwork={ this.handleClickArtwork }
          artworkUrl={ this.state.artworkUrl }
          handleDeleteArtwork={ this.handleDeleteArtwork } />
      )
    });
  }

  handleClickSoundTab(collectionFormSoundSubForm) {
    return (e) => {
      const collectionTab = document.getElementById('collection-form-collection-tab');
      collectionTab.classList.remove('tab-clicked');
      const soundTabs = document.getElementsByClassName('collection-form-sound-tab');
      for (let i = 0; i < soundTabs.length; i++) {
        soundTabs[i].classList.remove('tab-clicked');
      }
      e.currentTarget.classList.add('tab-clicked');
      this.setState({
        currentForm: collectionFormSoundSubForm
      });
    }
  }

  render() {
    const id = this.props.collectionId;
    let artworkThumb;
    let artworkForm;
    const artworkMissing = this.state.artworkUrl === '/avatars/original/missing.png';
    if (artworkMissing) {
      artworkThumb = (
        <figure className='collection-form-artwork-thumb'>
          <img />
        </figure>
      );
      artworkForm = (
        <div className='collection-form-artwork-missing'>
          <input id='artwork-input' type='file'
            onChange={ this.handleAddArtwork }
            style={ { display: 'none' } } />
          <a href='' onClick={ this.handleClickArtwork }>upload artwork</a>
        </div>
      );
    } else {
      artworkThumb = (
        <figure className='collection-form-artwork-thumb'>
          <img src={ this.state.artworkUrl } />
        </figure>
      );
      artworkForm = (
        <div className='collection-form-artwork-container'>
          <img src={ this.state.artworkUrl } />
          <div className='collection-form-artwork-delete' >
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
          handleDeleteSound={ this.handleDeleteSound(idx) }
          handleClickSoundTab={ this.handleClickSoundTab } />
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
            <div id='collection-form-collection-tab' className='collection-form-collection-tab' onClick={ this.handleClickCollectionTab }>
              <div className='collection-form-collection-tab-inner'>
                { artworkThumb }
                <div className='collection-form-collection-tab-text'>
                  <p className='collection-form-collection-tab-text-title'>{ this.state.title === '' ? 'Untitled Collection' : this.state.title }</p>
                  <p className='collection-form-collection-tab-text-user'>by <strong>{ this.props.currentUser.username }</strong></p>
                </div>
              </div>
            </div>
            <h3 className='collection-form-sounds-heading'>sounds</h3>
            <div className='collection-form-sounds'>
              <ul className='collection-form-sound-list'>
                { sounds }
              </ul>
              <input id='sound-input' type='file'
                onChange={ this.handleAddSound }
                style={ { display: 'none' } } />
              <div className='collection-form-add-sound-container'>
                <a className='collection-form-add-sound' href='' onClick={ this.handleClickSound }>add sound</a>
                <p className='collection-form-add-sound-requirements'>50MB max per sound, .mp3, .mp4, .mpg, or mpeg</p>
              </div>
              { soundsErrors }
            </div>
            <div className='collection-form-submit-container'>
              <button className='collection-form-submit' onClick={ this.handleSubmit }>{ this.props.submitText }</button>
            </div>
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
