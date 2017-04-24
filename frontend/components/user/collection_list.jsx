import React from 'react';
import { Link } from 'react-router';
import CollectionListItem from './collection_list_item';

const CollectionList = (props) => {
  const collectionListItems = Object.keys(props.collections).map(
    id => <CollectionListItem key={ id } collection={ props.collections[id] } />
  );
  return (
    <section className='collection-list-section'>
      <ul>
        { collectionListItems }
      </ul>
    </section>
  );
};

export default CollectionList;
