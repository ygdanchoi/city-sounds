import React from 'react';
import { Link } from 'react-router';

const toHHMMSS = (seconds) => {
  let hh = Math.floor(seconds / 3600);
  let mm = Math.floor(seconds / 60) % 60;
  let ss = seconds % 60;
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
};

const SoundListItem = (props) => {
  if (props.sound) {
    return (
      <li className='sound-list-item'>
        <p className='sound-list-item-title'>{ `${parseInt(props.idx) + 1}. ${props.sound.title}` }</p>
        <audio controls>
          <source src={ props.sound.audioUrl } type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </li>
    );
  } else {
    return <li className='sound-list-item' />;
  }
};

export default SoundListItem;
