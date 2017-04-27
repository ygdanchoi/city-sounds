import React from 'react';
import { Link } from 'react-router';
import ExploreList from './explore_list';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingCollectionId: '',
      playingCollectionArtworkUrl: '',
      playingSoundTitle: '',
      playingSoundAudioPlayer: null,
      playingCollectionTitle: '',
      playingUserId: '',
      playingUserUsername: '',
      playingUserLocation: '',
    };
    this.setPlayingCollection = this.setPlayingCollection.bind(this);
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
              playingSoundTitle: playingSound.title,
              playingSoundAudioPlayer: (
                <audio key={ playingSound.id } controls>
                  <source src={ playingSound.audioUrl } type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )
            });
          }).bind(this)
        );
      }).bind(this)
    );
  }

  setPlayingCollection(collection) {
    return ((e) => {
      this.setState({
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
            playingSoundTitle: playingSound.title,
            playingSoundAudioPlayer: (
              <audio key={ playingSound.id } controls>
                <source src={ playingSound.audioUrl } type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )
          });
        }).bind(this)
      );
    }).bind(this);
  }

  render() {
    return (
      <div className='explore'>
        <div className='explore-filters-top' />
        <div className='explore-filters-bottom' />
        <main className='explore-main'>
          <section className='explore-main-left'>
            <ExploreList collections={ this.props.collections } setPlayingCollection={ this.setPlayingCollection } />
          </section>
          <aside className='explore-main-right'>
            <div className='explore-sound-player' >
              <img src={ this.state.playingCollectionArtworkUrl } />
              <p>{ this.state.playingSoundTitle }</p>
              { this.state.playingSoundAudioPlayer }
              <p>from the collection <Link to={`/collections/${this.state.playingCollectionId}`}>{ this.state.playingCollectionTitle }</Link></p>
              <p>by <Link to={`/users/${this.state.playingUserId}`}>{ this.state.playingUserUsername }</Link></p>
              <p>{ this.state.playingUserLocation }</p>
            </div>
          </aside>
        </main>
      </div>
    );
  }
}

export default Explore;
