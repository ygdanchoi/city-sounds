import React from 'react';

const CollectionListItem = (props) => {
  return (
    <li className='collection-list-item'>
      <figure className='collection-list-item-artwork' >
        <img src={ props.collection.artworkUrl } />
      </figure>
      <p className='collection-list-item-title'>{ props.collection.title }</p>
    </li>
  );
};

export default CollectionListItem;
