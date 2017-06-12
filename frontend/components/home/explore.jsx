import React from 'react';
import { Link, hashHistory } from 'react-router';
import ExploreList from './explore_list';
import ExploreSoundPlayer from './explore_sound_player';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.playPauseAudio = this.playPauseAudio.bind(this);
    this.setPlayingCollection = this.setPlayingCollection.bind(this);
    this.setPlayedYet = this.setPlayedYet.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllCollections(this.props.location.search).then(
      ((response) => {
        if (this.props.playbackState.playingCollection === null) {
          const playingCollection = response.collections[Object.keys(response.collections)[0]];
          const playingSound = playingCollection.sounds[Object.keys(playingCollection.sounds)[0]];
          this.props.receivePlaybackState({
            playingSound: playingSound,
            playingCollection: playingCollection,
          });
        }
      }).bind(this)
    );
    this.props.fetchAllTags();
  }

  playPauseAudio(action) {
    return (() => {
      if (action === 'pause') {
        this.props.receivePlaybackState({ playing: false });
      } else if (action === 'play') {
        this.props.receivePlaybackState({ playing: true });
      }
    }).bind(this);
  }

  setPlayingCollection(collection, action) {
    return (() => {
      if (action === 'pause') {
        this.props.receivePlaybackState({
          playing: false,
          playingSound: collection.sounds[Object.keys(collection.sounds)[0]],
          playingCollection: collection,
        });
      } else if (action === 'play') {
        this.props.receivePlaybackState({
          playing: true,
          playingSound: collection.sounds[Object.keys(collection.sounds)[0]],
          playingCollection: collection,
        });
      }
    }).bind(this);
  }

  setPlayedYet() {
    this.props.receivePlaybackState({
      playedYet: true
    });
  }

  redirectToCollection(id) {
    return (e) => {
      e.preventDefault();
      hashHistory.push(`collections/${id}`);
    };
  }

  handleClickTag(tag) {
    return (e) => {
      e.preventDefault();
      hashHistory.push(`/?tag=${tag}`);
      this.props.fetchAllCollections(`?tag=${tag}`);
    }
  }

  render() {
    let paramsArr = this.props.location.search.slice(1).split('&');
    let paramsObj = {};
    paramsArr.forEach(param => {
      const keyVal = param.split('=');
      paramsObj[keyVal[0]] = keyVal[1];
    });
    let tags = Object.keys(this.props.tags).map(
      id => {
        const name = this.props.tags[id].name;
        let tagClassName;
        if (paramsObj['tag'] === name) {
          tagClassName = 'tag-selected';
        } else {
          tagClassName = 'tag-unselected';
        }
        return (
          <li key={id}
            className={ tagClassName }
            onClick={ this.handleClickTag(name) }>
              { name }
          </li>
        );
      }
    );
    if (tags.length > 0) {
      let allTagClassName;
      if (paramsObj['tag'] === undefined || paramsObj['tag'] === 'all') {
        allTagClassName = 'tag-selected';
      } else {
        allTagClassName = 'tag-unselected';
      }
      const allTag = (
        <li key={0}
          className={ allTagClassName }
          onClick={ this.handleClickTag('all') }>
            all
        </li>
      );
      tags = [allTag, ...tags];
    }
    const sortOrders = [
      <li key={0} className='tag-selected'>by uploaded date</li>,
    ];
    const playingCollection = this.props.playbackState.playingCollection ? this.props.playbackState.playingCollection : {};
    const playingUser = this.props.playbackState.playingCollection ? this.props.playbackState.playingCollection.user : {};
    return (
      <div className='explore'>
        <div className='explore-filters-top'>
          <div className='explore-filters-top-inner'>
            <ul className='explore-filters-tags'>{ tags }</ul>
          </div>
        </div>
        <div className='explore-filters-bottom'>
          <div className='explore-filters-bottom-inner'>
            <ul className='explore-filters-tags'>{ sortOrders }</ul>
          </div>
        </div>
        <main className='explore-main'>
          <section className='explore-main-left'>
            <ExploreList
                collections={ this.props.collections }
                setPlayingCollection={ this.setPlayingCollection }
                playing={ this.props.playbackState.playing }
                playingCollection={ playingCollection } />
          </section>
          <aside className='explore-main-right'>
            <div className='explore-sound-player-container' >
              <figure className='explore-sound-player-artwork'>
                <img src={ playingCollection.artworkUrl } />
              </figure>
              <div className='collection-sound-player-container'>
                <ExploreSoundPlayer
                    sound={ this.props.playbackState.playingSound }
                    playing={ this.props.playbackState.playing }
                    playPauseAudio={ this.playPauseAudio }
                    playedYet={ this.props.playbackState.playedYet }
                    setPlayedYet={ this.setPlayedYet }
                    audioCurrentTime={ this.props.playbackState.audioCurrentTime }
                    audioDuration={ this.props.playbackState.audioDuration }
                    receivePlaybackState={ this.props.receivePlaybackState } />
              </div>
              <p className='explore-sound-player-collection'>
                from the collection <Link to={`/collections/${playingCollection.id}`}>{ playingCollection.title }</Link>
              </p>
              <p className='explore-sound-player-user'>
                by <Link to={`/users/${playingUser.id}`}>{ playingUser.username }</Link>
              </p>
              <p className='explore-sound-player-location'>
                { playingUser.location }
              </p>
              <button className='explore-sound-player-hear-more' onClick={ this.redirectToCollection(playingCollection.id) }>
                hear more from this collection
              </button>
            </div>
          </aside>
        </main>
      </div>
    );
  }
}

export default Explore;
