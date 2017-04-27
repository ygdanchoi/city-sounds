import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

class CollectionSoundPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioCurrentTime: 0,
      audioDuration: 0
    };
    this.handleAudioEnded = this.handleAudioEnded.bind(this);
    this.handleCanPlay = this.handleCanPlay.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.handleClickTimeline = this.handleClickTimeline.bind(this);
  }

  componentDidMount() {
    const soundAudio = document.getElementById('sound-audio');
    const collectionPlayButton = document.getElementById('collection-play-button');
    soundAudio.pause();
    collectionPlayButton.classList.remove('collection-playing');
    collectionPlayButton.classList.add('collection-paused');
  }

  componentWillReceiveProps(newProps) {
    const soundAudio = document.getElementById('sound-audio');
    soundAudio.currentTime = 0;
    this.setState({
      audioCurrentTime: 0
    });
  }

  componentWillUnmount() {
  }

  toHHMMSS(seconds) {
    let hh = Math.floor(seconds / 3600);
    let mm = Math.floor(seconds / 60) % 60;
    let ss = Math.floor(seconds % 60);
    if (ss < 10) {
      ss = "0" + ss;
    }
    if (hh === 0) {
      return `${mm}:${ss}`;
    } else {
      if (mm < 10) {
        mm = "0" + mm;
      }
      return `${hh.toString()}:${mm.toString()}:${ss.toString()}`;
    }
  }

  handleAudioEnded() {
    const collectionPlayButton = document.getElementById('collection-play-button');
    collectionPlayButton.classList.remove('collection-playing');
    collectionPlayButton.classList.add('collection-paused');
  }

  handleCanPlay() {
    const soundAudio = document.getElementById('sound-audio');
    this.setState({
      audioDuration: soundAudio.duration
    });
  }

  handleListen() {
    const soundAudio = document.getElementById('sound-audio');
    const timeline = document.getElementById('collection-timeline');
    const playhead = document.getElementById('collection-playhead');
    const timelineWidth = timeline.getBoundingClientRect().width;
    const playheadWidth = playhead.getBoundingClientRect().width;
    const playFraction = soundAudio.currentTime / this.state.audioDuration;
    playhead.style.marginLeft = (timelineWidth - playheadWidth) * playFraction + "px";
    this.setState({
      audioCurrentTime: soundAudio.currentTime
    });
  }

  handleClickTimeline(e) {
    const soundAudio = document.getElementById('sound-audio');
    const timeline = document.getElementById('collection-timeline');
    const left = timeline.getBoundingClientRect().left;
    const width = timeline.getBoundingClientRect().width;
    const clickFraction = (e.clientX - left) / width;
    soundAudio.currentTime = soundAudio.duration * clickFraction;
  }

  render() {
    const soundAudio = (
      <ReactAudioPlayer
        id='sound-audio'
        src={ this.props.sound.audioUrl }
        onEnded={ this.handleAudioEnded }
        onCanPlay={ this.handleCanPlay }
        listenInterval={ 100 }
        onListen={ this.handleListen }
        autoPlay
      />
    );
    return (
      <div key={ this.props.sound.id }  id='collection-sound-player' className='collection-sound-player'>
        { soundAudio }
        <button id='collection-play-button' className='collection-playing' onClick={ this.props.playPauseAudio } ></button>
        <div className='collection-sound-player-right'>
          <div className='collection-sound-player-details'>
            <p className='collection-sound-player-title'>{ this.props.sound.title }</p>
            <p className='collection-sound-player-time'>{ `${this.toHHMMSS(this.state.audioCurrentTime)} / ${this.toHHMMSS(this.state.audioDuration)}` }</p>
          </div>
          <div id='collection-timeline' className='collection-sound-player-timeline'>
            <div id='collection-playhead' className='collection-sound-player-playhead' />
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionSoundPlayer;
