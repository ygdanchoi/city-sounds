import React from 'react';
import { Link } from 'react-router';

const CollectionListItem = (props) => {
  return (
    <li className='collection-list-item'>
      <Link to={ `/collections/${props.collection.id}` }>
        <figure className='collection-list-item-artwork' >
          <img src={ props.collection.artworkUrl } />
        </figure>
        <p className='collection-list-item-title'>{ props.collection.title }</p>
      </Link>
    </li>
  );
};

export default CollectionListItem;
