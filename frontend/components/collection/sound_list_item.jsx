import React from 'react';
import { Link } from 'react-router';

const SoundListItem = (props) => {
  if (props.sound) {
    if (props.playing && props.sound.id === props.playingSoundId) {
      return (
        <li className='sound-list-item'>
          <button id='sound-list-item-play-button' className='sound-list-item-playing' onClick={ props.setPlayingSound(props.sound) } />
          <p className='sound-list-item-idx'>{ `${parseInt(props.idx) + 1}.` }</p>
          <p className='sound-list-item-title'>{ props.sound.title }</p>
        </li>
      );
    } else {
      return (
        <li className='sound-list-item'>
          <button id='sound-list-item-play-button' className='sound-list-item-paused' onClick={ props.setPlayingSound(props.sound) } />
          <p className='sound-list-item-idx'>{ `${parseInt(props.idx) + 1}.` }</p>
          <p className='sound-list-item-title'>{ props.sound.title }</p>
        </li>
      );
    }
  } else {
    return <li className='sound-list-item' />;
  }
};

export default SoundListItem;
