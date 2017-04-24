import React from 'react';
import { Link } from 'react-router';

const toHHMMSS = (seconds) => {
  let mm = Math.floor(seconds / 60).toString();
  let ss = (seconds % 60).toString();
  if (ss.length === 1) {
    ss = "0" + ss;
  }
  return `${mm}:${ss}`;
};

const SoundListItem = (props) => {
  if (props.sound) {
    return (
      <li className='sound-list-item'>
        <a href={ props.sound.audioUrl }>
          <p className='sound-list-item-title'>{ props.sound.title }</p>
        </a>
        <p>{ toHHMMSS(props.sound.duration) }</p>
      </li>
    );
  } else {
    return <li className='sound-list-item' />;
  }
};

export default SoundListItem;
