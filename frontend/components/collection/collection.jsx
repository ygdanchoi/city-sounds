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
      playingSoundTitle: '',
      playingSoundAudioPlayer: null
    };
    this.setPlayingSound = this.setPlayingSound.bind(this);
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId);
    this.props.fetchCollectionSounds(this.props.params.collectionId).then(
      (response) => {
        const playingSound = response.sounds[Object.keys(response.sounds)[0]];
        if (playingSound) {
          this.setState({
            playingSoundTitle: playingSound.title,
            playingSoundAudioPlayer: <CollectionSoundPlayer sound={ playingSound } />
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
              playingSoundTitle: playingSound.title,
              playingSoundAudioPlayer: <CollectionSoundPlayer sound={ playingSound } />
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

  setPlayingSound(sound) {
    return ((e) => {
      this.setState({
        playingSoundTitle: sound.title,
        playingSoundAudioPlayer: <CollectionSoundPlayer sound={ sound } />
      });
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
      (id, idx) => <SoundListItem key={ id } idx={ idx } sound={ this.props.sounds[id] } setPlayingSound={ this.setPlayingSound } />
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
              <p>{ this.state.playingSoundTitle }</p>
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
