import React from 'react';
import { Link } from 'react-router';

const ExploreListItem = (props) => {
  return (
    <li className='explore-list-item'>
      <Link to={`/collections/${props.collection.id}`}>
        <figure className='explore-list-item-artwork'>
          <img src={ props.collection.artworkUrl } />
        </figure>
        <a>{ props.collection.title }</a>
      </Link>
      <Link to={`/users/${props.collection.user.id}`}>
        <a>{ props.collection.user.username }</a>
      </Link>
    </li>
  );
};

export default ExploreListItem;
