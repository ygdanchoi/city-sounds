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
      <li>
        <p>{ props.idx + '. title: ' + (props.sound.title === '' ? 'Untitled Sound' : props.sound.title) }</p>
        <p>{ props.idx + '. duration: ' + props.sound.duration }</p>
        <p>{ props.idx + '. audioUrl: ' + props.sound.audioUrl }</p>
        <p>{ props.idx + '. audioFile: ' + (props.sound.audioFile ? props.sound.audioFile.name : null) }</p>
        <input type='text' placeholder='track name' value={ props.sound.title } onChange={ props.handleChange('title') }  />
        <label htmlFor={`duration-${props.idx}`}>duration</label>
        <input type='number' id={`duration-${props.idx}`} value={ props.sound.duration } onChange={ props.handleChange('duration') }  />
      </li>
    );
  } else {
    return <li />;
  }
};

export default SoundListItem;
