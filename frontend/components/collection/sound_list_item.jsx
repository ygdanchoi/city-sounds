import React from 'react';
import { Link } from 'react-router';

const SoundListItem = (props) => {
  if (props.sound) {
    return (
      <li className='sound-list-item'>
        <p className='sound-list-item-title'>{ `${parseInt(props.idx) + 1}. ${props.sound.title}` }</p>
        <button onClick={ props.setPlayingSound(props.sound) }>play</button>
      </li>
    );
  } else {
    return <li className='sound-list-item' />;
  }
};

export default SoundListItem;
