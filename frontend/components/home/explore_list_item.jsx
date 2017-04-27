import React from 'react';
import { Link } from 'react-router';

const ExploreListItem = (props) => {
  return (
    <li className='explore-list-item'>
      <Link to={`/collections/${props.collection.id}`}>
        <figure className='explore-list-item-artwork'>
          <img src={ props.collection.artworkUrl } />
        </figure>
        <p className='explore-list-item-title'>{ props.collection.title }</p>
      </Link>
      <Link to={`/users/${props.collection.user.id}`}>
        <p className='explore-list-item-user'>{ props.collection.user.username }</p>
      </Link>
    </li>
  );
};

export default ExploreListItem;
