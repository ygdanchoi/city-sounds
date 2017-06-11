import React from 'react';
import { Link } from 'react-router';

const ExploreListItem = (props) => {
  if (props.collection) {
    let soundListItemPlayButton;
    let handleClick;
    if (props.playingCollection && props.collection.id === props.playingCollection.id) {
      if (props.playing) {
        soundListItemPlayButton = (
          <button id='explore-list-item-play-button' className='explore-list-item-playing' />
        );
        handleClick = props.setPlayingCollection(props.collection, 'pause');
      } else {
        soundListItemPlayButton = (
          <button id='explore-list-item-play-button' className='explore-list-item-paused' />
        );
        handleClick = props.setPlayingCollection(props.collection, 'play');
      }
    } else {
      soundListItemPlayButton = (
        <button id='explore-list-item-play-button' className='explore-list-item-paused' />
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
