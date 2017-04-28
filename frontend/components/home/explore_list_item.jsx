import React from 'react';
import { Link } from 'react-router';

const ExploreListItem = (props) => {
  if (props.collection) {
    let soundListItemPlayButton;
    let handleClick;
    if (props.playingCollectionId && props.collection.id === props.playingCollectionId) {
      if (props.playing) {
        soundListItemPlayButton = (
          <button id='sound-list-item-play-button' className='sound-list-item-playing' />
        );
        handleClick = props.setPlayingCollection(props.collection, 'pause');
      } else {
        soundListItemPlayButton = (
          <button id='sound-list-item-play-button' className='sound-list-item-paused' />
        );
        handleClick = props.setPlayingCollection(props.collection, 'play');
      }
    } else {
      soundListItemPlayButton = (
        <button id='sound-list-item-play-button' className='sound-list-item-paused' />
      );
      handleClick = props.setPlayingCollection(props.collection, 'play');
    }
    return (
      <li className='explore-list-item'>
        <a onClick={ handleClick }>
          <figure className='explore-list-item-artwork'>
            <img src={ props.collection.artworkUrl } />
            { soundListItemPlayButton }
          </figure>
          <p className='explore-list-item-title'>{ props.collection.title }</p>
        </a>
        <Link to={`/users/${props.collection.user.id}`}>
          <p className='explore-list-item-user'>{ props.collection.user.username }</p>
        </Link>
      </li>
    );
  } else {
    return <li className='explore-list-item' />;
  }
};

export default ExploreListItem;
