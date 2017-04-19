import React from 'react';

const ExploreListItem = (props) => {
  return (
    <li className='explore-list-item'>
      <figure className='explore-list-item-artwork' />
      <p>{ props.collection.title }</p>
      <p>user</p>
      <p>first tag</p>
    </li>
  );
};

export default ExploreListItem;
