import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

class ExploreSoundPlayer extends React.Component {
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
  }

  componentWillReceiveProps(newProps) {
    if (this.audioPlayer) {
      if (newProps.playing) {
        this.audioPlayer.audioEl.play();
      } else {
        this.audioPlayer.audioEl.pause();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.audioPlayer) {
      if (this.props.playing) {
        this.audioPlayer.audioEl.play();
      } else {
        this.audioPlayer.audioEl.pause();
      }
      if (this.props.playingSound !== prevProps.playingSound) {
        this.audioPlayer.audioEl.currentTime = 0;
        if (this.props.playedYet) {
          this.audioPlayer.audioEl.play();
        } else {
          this.props.setPlayedYet();
        }
      }
    }
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
    this.props.playPauseAudio('pause')();
  }

  handleCanPlay() {
    this.setState({
      audioDuration: this.audioPlayer.audioEl.duration
    });
  }

  handleListen() {
    const timelineWidth = this.timeline.getBoundingClientRect().width;
    const playheadWidth = this.playhead.getBoundingClientRect().width;
    const playFraction = this.audioPlayer.audioEl.currentTime / this.state.audioDuration;
    this.playhead.style.marginLeft = (timelineWidth - playheadWidth) * playFraction + "px";
    this.setState({
      audioCurrentTime: this.audioPlayer.audioEl.currentTime
    });
  }

  handleClickTimeline(e) {
    const timelineLeft = this.timeline.getBoundingClientRect().left;
    const timelineWidth = this.timeline.getBoundingClientRect().width;
    const playheadWidth = this.playhead.getBoundingClientRect().width;
    const clickFraction = (e.clientX - timelineLeft) / timelineWidth;
    this.audioPlayer.audioEl.currentTime = this.state.audioDuration * clickFraction;
    this.setState({
      audioCurrentTime: this.state.audioDuration * clickFraction
    });
  }

  render() {
    if (this.props.sound === null) {
      return (
        <div id='collection-sound-player' className='collection-sound-player' />
      );
    }
    const audioPlayer = (
      <ReactAudioPlayer
        key={ this.props.sound.id }
        id='audio-player'
        src={ this.props.sound.audioUrl }
        onEnded={ this.handleAudioEnded }
        onCanPlay={ this.handleCanPlay }
        listenInterval={ 100 }
        onListen={ this.handleListen }
        ref={c => this.audioPlayer = c }
      />
    );
    let collectionPlayButton;
    if (this.props.playing) {
      collectionPlayButton = (
        <button id='collection-play-button' className='collection-playing' onClick={ this.props.playPauseAudio('pause') } ref={c => this.collectionPlayButton = c } />
      );
    } else {
      collectionPlayButton = (
        <button id='collection-play-button' className='collection-paused' onClick={ this.props.playPauseAudio('play') } ref={c => this.collectionPlayButton = c } />
      );
    }
    return (
      <div key={ this.props.sound.id }  id='collection-sound-player' className='collection-sound-player'>
        { audioPlayer }
        { collectionPlayButton }
        <div className='collection-sound-player-right'>
          <div className='collection-sound-player-details'>
            <p className='collection-sound-player-title'>{ this.props.sound.title }</p>
            <p className='collection-sound-player-time'>{ `${this.toHHMMSS(this.state.audioCurrentTime)} / ${this.toHHMMSS(this.state.audioDuration)}` }</p>
          </div>
          <div id='collection-timeline' className='collection-sound-player-timeline' onClick={ this.handleClickTimeline } ref={c => this.timeline = c } >
            <div id='collection-playhead' className='collection-sound-player-playhead' ref={c => this.playhead = c } />
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreSoundPlayer;
