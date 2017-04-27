import React from 'react';

class CollectionSoundPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioCurrentTime: 0,
      audioDuration: 0
    };
  }

  componentDidMount() {
    const soundAudio = document.getElementById('sound-audio');
    const collectionPlayButton = document.getElementById('collection-play-button');
    soundAudio.addEventListener('ended', () => {
      collectionPlayButton.classList.remove('collection-playing');
      collectionPlayButton.classList.add('collection-paused');
    });
    soundAudio.addEventListener('loadeddata', (() => {
      this.setState({
        audioDuration: soundAudio.duration
      });
    }).bind(this));
    setInterval((() => {
      this.setState({
        audioCurrentTime: soundAudio.currentTime
      });
    }).bind(this), 1000);
  }

  playAudio() {
    const soundAudio = document.getElementById('sound-audio');
    const collectionPlayButton = document.getElementById('collection-play-button');
    if (soundAudio.paused) {
      soundAudio.play();
      collectionPlayButton.classList.remove('collection-paused');
      collectionPlayButton.classList.add('collection-playing');
    } else {
      collectionPlayButton.classList.remove('collection-playing');
      collectionPlayButton.classList.add('collection-paused');
    }
  }

  render() {
    const soundAudio = (
      <audio id='sound-audio' key={ this.props.sound.id } >
        <source src={ this.props.sound.audioUrl } type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
    return (
      <div id='collection-sound-player' className='collection-sound-player'>
        { soundAudio }
        <button id='collection-play-button' className='collection-paused' onClick={ this.playAudio }></button>
        <div>
          <p>{ this.props.sound.title }</p>
          <p>{ this.state.audioCurrentTime }</p>
          <p>{ this.state.audioDuration }</p>
        </div>
      </div>
    );
  }
}

export default CollectionSoundPlayer;
