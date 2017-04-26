import React from 'react';
import ExploreListItem from './explore_list_item';

const ExploreList = (props) => {
  const exploreListItems = Object.keys(props.collections).map(
    id => <ExploreListItem key={ id } collection={ props.collections[id] } />
  );
  return (
    <ul className='explore-list'>
      { exploreListItems }
    </ul>
  );
};

export default ExploreList;
