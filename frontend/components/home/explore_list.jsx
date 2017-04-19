import React from 'react';
import ExploreListItem from './explore_list_item';

const ExploreList = (props) => {
  return (
    <ul className='explore-list'>
      <ExploreListItem collection={ {id: 1, title: 'item 1'} } />
      <ExploreListItem collection={ {id: 2, title: 'item 2'} } />
      <ExploreListItem collection={ {id: 3, title: 'item 3'} } />
      <ExploreListItem collection={ {id: 4, title: 'item 4'} } />
      <ExploreListItem collection={ {id: 5, title: 'item 5'} } />
      <ExploreListItem collection={ {id: 6, title: 'item 6'} } />
    </ul>
  );
};

export default ExploreList;
