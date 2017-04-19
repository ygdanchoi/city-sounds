import React from 'react';
import { Link } from 'react-router';
import ExploreList from './explore_list';

const Explore = (props) => {
  return (
    <main className='explore-main'>
      <aside className='explore-main-filter-bar'>
        <aside className='explore-main-filter-bar-heading'>
          <h3>Explore</h3>
        </aside>
        <aside className='explore-main-filter-bar-filters'>
          <p>filter by:</p>
          <ul>
            <li>length</li>
            <li>upload date</li>
          </ul>
        </aside>
      </aside>
      <aside className='explore-main-tag-bar'>
        <ul>
          <li>all</li>
          <li>beach</li>
          <li>rain</li>
        </ul>
      </aside>
      <section>
        <ExploreList />
      </section>
    </main>
  );
};

export default Explore;
