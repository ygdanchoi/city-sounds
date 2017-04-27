import React from 'react';

const ExploreSoundPlayer = (props) => {
  return (
    <audio id='explore-sound-player' className='explore-sound-player' key={ props.sound.id } controls>
      <source src={ props.sound.audioUrl } type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default ExploreSoundPlayer;
