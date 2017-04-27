import React from 'react';

const CollectionSoundPlayer = (props) => {
  return (
    <audio className='collection-sound-player' key={ props.sound.id } controls>
      <source src={ props.sound.audioUrl } type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default CollectionSoundPlayer;
