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
      playedYet: false,
      playing: false,
      playingSound: null,
    };
    this.playPauseAudio = this.playPauseAudio.bind(this);
    this.setPlayingSound = this.setPlayingSound.bind(this);
    this.setPlayedYet = this.setPlayedYet.bind(this);
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId);
    this.props.fetchCollectionSounds(this.props.params.collectionId).then(
      (response) => {
        const playingSound = response.sounds[Object.keys(response.sounds)[0]];
        if (playingSound) {
          this.setState({
            playingSound: playingSound
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
              playedYet: false,
              playingSound: playingSound
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

  playPauseAudio(action) {
    return (() => {
      if (action === 'pause') {
        this.setState({ playing: false });
      } else if (action === 'play') {
        this.setState({ playing: true });
      }
    }).bind(this);
  }

  setPlayingSound(sound, action) {
    return (() => {
      if (action === 'pause') {
        this.setState({
          playing: false,
          playingSound: sound
        });
      } else if (action === 'play') {
        this.setState({
          playing: true,
          playingSound: sound
        });
      }
    }).bind(this);
  }

  setPlayedYet() {
    this.setState({
      playedYet: true
    });
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
      (id, idx) => <SoundListItem key={ id } idx={ idx } sound={ this.props.sounds[id] } setPlayingSound={ this.setPlayingSound } playing={ this.state.playing } playingSound={ this.state.playingSound } />
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
              <CollectionSoundPlayer sound={ this.state.playingSound } playing={ this.state.playing } playPauseAudio={ this.playPauseAudio } playingSound={ this.state.playingSound } playedYet={ this.state.playedYet } setPlayedYet={ this.setPlayedYet } />
            </div>
            <h3 className='collection-info-sound-collection'>
              Digital Sound Collection
            </h3>
            <p className='collection-info-includes-unlimited-streaming'>
              Unlimited streaming via the free CitySounds app.
            </p>
            <p className='collection-info-donate-now'>
              <a></a>
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
