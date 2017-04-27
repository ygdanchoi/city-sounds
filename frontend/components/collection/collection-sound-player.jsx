import React from 'react';

class CollectionSoundPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const soundAudio = document.getElementById('sound-audio');
    const collectionPlayButton = document.getElementById('collection-play-button');
    soundAudio.addEventListener('ended', () => {
      collectionPlayButton.classList.remove('collection-playing');
      collectionPlayButton.classList.add('collection-paused');
    });
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
    return (
      <div id='collection-sound-player' className='collection-sound-player'>
        <audio id='sound-audio' key={ this.props.sound.id }>
          <source src={ this.props.sound.audioUrl } type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button id='collection-play-button' className='collection-paused' onClick={ this.playAudio }></button>
        <div>
          <p>{ this.props.sound.title }</p>
        </div>
      </div>
    );
  }
}

export default CollectionSoundPlayer;
