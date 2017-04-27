import React from 'react';
import { Link } from 'react-router';
import ExploreList from './explore_list';

class Explore extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllCollections();
  }

  render() {
    return (
      <div className='explore'>
        <div className='explore-filters-top' />
        <div className='explore-filters-bottom' />
        <main className='explore-main'>
          <section className='explore-main-left'>
            <ExploreList collections={ this.props.collections } />
          </section>
          <aside className='explore-main-right'>
            <div className='explore-sound-player' />
          </aside>
        </main>
      </div>
    );
  }
}

export default Explore;
