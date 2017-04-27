import React from 'react';
import { Link, hashHistory } from 'react-router';
import SoundListItem from './sound_list_item';
import UserSidebarContainer from '../user_sidebar/user_sidebar_container';
import CollectionSoundPlayer from './collection-sound-player';

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.redirectToCurrentUser = this.redirectToCurrentUser.bind(this);
    this.redirectToEditCollection = this.redirectToEditCollection.bind(this);
    this.state = {
      playing: false,
      playingSoundId: null,
      playingSoundTitle: '',
      playingSoundAudioPlayer: null
    };
    this.playPauseAudio = this.playPauseAudio.bind(this);
    this.setPlayingSound = this.setPlayingSound.bind(this);
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId);
    this.props.fetchCollectionSounds(this.props.params.collectionId).then(
      (response) => {
        const playingSound = response.sounds[Object.keys(response.sounds)[0]];
        if (playingSound) {
          this.setState({
            playingSoundId: playingSound.id,
            playingSoundTitle: playingSound.title,
            playingSoundAudioPlayer: <CollectionSoundPlayer sound={ playingSound } playing={ this.state.playing } playPauseAudio={ this.playPauseAudio } />
          });
        }
      }
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.collectionId !== newProps.params.collectionId) {
      this.props.fetchCollection(newProps.params.collectionId);
      this.props.fetchCollectionSounds(newProps.params.collectionId).then(
        (response) => {
          const playingSound = response.sounds[Object.keys(response.sounds)[0]];
          if (playingSound) {
            this.setState({
              playingSoundId: playingSound.id,
              playingSoundTitle: playingSound.title,
              playingSoundAudioPlayer: <CollectionSoundPlayer sound={ playingSound } playing={ this.state.playing } playPauseAudio={ this.playPauseAudio } />
            });
          }
        }
      );
    }
  }

  handleEdit(e) {
    e.preventDefault();
    this.redirectToEditCollection();
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteCollection(this.props.params.collectionId).then(
      () => this.redirectToCurrentUser()
    );
  }

  redirectToEditCollection() {
    hashHistory.push(`/edit-collection?id=${this.props.collection.id}`);
  }

  redirectToCurrentUser() {
    hashHistory.push(`users/${this.props.currentUser.id}`);
  }

  playPauseAudio() {
    const soundAudio = document.getElementById('sound-audio');
    const collectionPlayButton = document.getElementById('collection-play-button');
    if (soundAudio.paused) {
      soundAudio.play();
      collectionPlayButton.classList.remove('collection-paused');
      collectionPlayButton.classList.add('collection-playing');
      this.setState({
        playing: true,
      });
    } else {
      soundAudio.pause();
      collectionPlayButton.classList.remove('collection-playing');
      collectionPlayButton.classList.add('collection-paused');
      this.setState({
        playing: false,
      });
    }
  }

  setPlayingSound(sound) {
    return ((e) => {
      if (sound.id !== this.state.playingSoundId) {
        this.setState({
          playing: true,
          playingSoundId: sound.id,
          playingSoundTitle: sound.title,
          playingSoundAudioPlayer: <CollectionSoundPlayer sound={ sound } />
        });
      } else if (this.state.playing) {
        this.setState({
          playing: false,
        });
      } else {
        this.setState({
          playing: true,
        });
      }
    }).bind(this);
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
    const soundListItems = this.props.collection.soundIds.map(
      (id, idx) => <SoundListItem key={ id } idx={ idx } sound={ this.props.sounds[id] } setPlayingSound={ this.setPlayingSound } playing={ this.state.playing } playingSoundId={ this.state.playingSoundId } />
    );
    let editDelete = null;
    if (this.props.collection.id && this.props.currentUser && this.props.collection.user.id === this.props.currentUser.id) {
      editDelete = (
        <div className='collection-edit-delete'>
          <button onClick={ this.handleEdit } className='collection-edit'>
            <a>Edit</a>
          </button>
          <button onClick={ this.handleDelete } className='collection-delete'>
            <a>Delete</a>
          </button>
        </div>
      );
    }
    return (
      <div className='collection-page'>
        <main className='collection-main'>
          <section className='collection-info-section'>
            <h2 className='collection-info-title'>
              { this.props.collection.title }
            </h2>
            <h3 className='collection-info-user'>
              by <Link to={`/users/${this.props.collection.user.id}`}>
                { this.props.collection.user.username }
              </Link>
            </h3>
            { editDelete }
            <div className='collection-sound-player-container'>
              { this.state.playingSoundAudioPlayer }
            </div>
            <h3 className='collection-info-sound-collection'>
              Digital Sound Collection
            </h3>
            <p className='collection-info-includes-unlimited-streaming'>
              Unlimited streaming via the free CitySounds app.
            </p>
            <p className='collection-info-donate-now'>
              <a>Donate Now</a>
            </p>
            <ul className='collection-sounds-list'>
              { soundListItems }
            </ul>
            <p>{ this.props.collection.description }</p>
          </section>
          <section className='collection-artwork-section'>
            <img className='collection-artwork' src={ this.props.collection.artworkUrl } />
          </section>
          <UserSidebarContainer userId={ this.props.collection.user.id } />
        </main>
      </div>
    );
  }
}

export default Collection;
