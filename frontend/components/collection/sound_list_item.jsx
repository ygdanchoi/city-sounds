import React from 'react';
import { Link } from 'react-router';

const SoundListItem = (props) => {
  if (props.sound) {
    let soundListItemPlayButton;
    if (props.playingSound && props.sound.id === props.playingSound.id) {
      if (props.playing) {
        soundListItemPlayButton = (
          <button id='sound-list-item-play-button' className='sound-list-item-playing' onClick={ props.setPlayingSound(props.sound, 'pause') } />
        );
      } else {
        soundListItemPlayButton = (
          <button id='sound-list-item-play-button' className='sound-list-item-paused' onClick={ props.setPlayingSound(props.sound, 'play') } />
        );
      }
    } else {
      soundListItemPlayButton = (
        <button id='sound-list-item-play-button' className='sound-list-item-paused' onClick={ props.setPlayingSound(props.sound, 'play') } />
      );
    }
    return (
      <li className='sound-list-item'>
        { soundListItemPlayButton }
        <p className='sound-list-item-idx'>{ `${parseInt(props.idx) + 1}.` }</p>
        <p className='sound-list-item-title'>{ props.sound.title }</p>
      </li>
    );
  } else {
    return <li className='sound-list-item' />;
  }
};

export default SoundListItem;
