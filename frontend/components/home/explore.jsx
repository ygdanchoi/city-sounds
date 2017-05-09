import React from 'react';
import { Link, hashHistory } from 'react-router';
import ExploreList from './explore_list';
import ExploreSoundPlayer from './explore_sound_player';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playedYet: false,
      playing: false,
      playingCollectionId: '',
      playingCollectionArtworkUrl: '',
      playingSound: null,
      playingCollectionTitle: '',
      playingUserId: '',
      playingUserUsername: '',
      playingUserLocation: '',
    };
    this.playPauseAudio = this.playPauseAudio.bind(this);
    this.setPlayingCollection = this.setPlayingCollection.bind(this);
    this.setPlayedYet = this.setPlayedYet.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllCollections().then(
      ((response) => {
        const playingCollection = response.collections[Object.keys(response.collections)[0]];
        this.setState({
          playingCollectionId: playingCollection.id,
          playingCollectionArtworkUrl: playingCollection.artworkUrl,
          playingCollectionTitle: playingCollection.title,
          playingUserId: playingCollection.user.id,
          playingUserUsername: playingCollection.user.username,
          playingUserLocation: playingCollection.user.location
        });
        this.props.fetchCollectionSounds(playingCollection.id).then(
          ((response) => {
            const playingSound = response.sounds[Object.keys(response.sounds)[0]];
            this.setState({
              playingSound: playingSound
            });
          }).bind(this)
        );
      }).bind(this)
    );
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

  setPlayingCollection(collection, action) {
    return (() => {
      if (action === 'pause') {
        this.setState({
          playing: false,
          playingCollectionId: collection.id,
          playingCollectionArtworkUrl: collection.artworkUrl,
          playingCollectionTitle: collection.title,
          playingUserId: collection.user.id,
          playingUserUsername: collection.user.username,
          playingUserLocation: collection.user.location
        });
        this.props.fetchCollectionSounds(collection.id).then(
          ((response) => {
            const playingSound = response.sounds[Object.keys(response.sounds)[0]];
            this.setState({
              playingSound: playingSound
            });
          }).bind(this)
        );
      } else if (action === 'play') {
        this.setState({
          playing: true,
          playingCollectionId: collection.id,
          playingCollectionArtworkUrl: collection.artworkUrl,
          playingCollectionTitle: collection.title,
          playingUserId: collection.user.id,
          playingUserUsername: collection.user.username,
          playingUserLocation: collection.user.location
        });
        this.props.fetchCollectionSounds(collection.id).then(
          ((response) => {
            const playingSound = response.sounds[Object.keys(response.sounds)[0]];
            this.setState({
              playingSound: playingSound
            });
          }).bind(this)
        );
      }
    }).bind(this);
  }

  setPlayedYet() {
    this.setState({
      playedYet: true
    });
  }

  redirectToCollection(id) {
    return (e) => {
      e.preventDefault();
      hashHistory.push(`collections/${id}`);
    };
  }

  render() {
    return (
      <div className='explore'>
        <div className='explore-filters-top' />
        <div className='explore-filters-bottom' />
        <main className='explore-main'>
          <section className='explore-main-left'>
            <ExploreList collections={ this.props.collections } setPlayingCollection={ this.setPlayingCollection } playing={ this.state.playing } playingCollectionId={ this.state.playingCollectionId } />
          </section>
          <aside className='explore-main-right'>
            <div className='explore-sound-player-container' >
              <figure className='explore-sound-player-artwork'>
                <img src={ this.state.playingCollectionArtworkUrl } />
              </figure>
              <div className='collection-sound-player-container'>
                <ExploreSoundPlayer
                    sound={ this.state.playingSound }
                    playing={ this.state.playing }
                    playPauseAudio={ this.playPauseAudio }
                    playedYet={ this.state.playedYet }
                    setPlayedYet={ this.setPlayedYet } />
              </div>
              <p className='explore-sound-player-collection'>from the collection <Link to={`/collections/${this.state.playingCollectionId}`}>{ this.state.playingCollectionTitle }</Link></p>
              <p className='explore-sound-player-user'>by <Link to={`/users/${this.state.playingUserId}`}>{ this.state.playingUserUsername }</Link></p>
              <p className='explore-sound-player-location'>{ this.state.playingUserLocation }</p>
              <button className='explore-sound-player-hear-more' onClick={ this.redirectToCollection(this.state.playingCollectionId) }>hear more from this collection</button>
            </div>
          </aside>
        </main>
      </div>
    );
  }
}

export default Explore;
