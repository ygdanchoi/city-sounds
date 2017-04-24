import React from 'react';
import { Link } from 'react-router';

const CollectionList = (props) => {
  const collections = Object.keys(props.collections).map(
    id => props.collections[id].title
  );
  return (
    <section className='collection-list-section'>
      <p>uploaded collections</p>
      { collections }
    </section>
  );
};

export default CollectionList;
