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
      <main className='explore-main'>
        <div className='explore-heading'>
          <h3>Explore</h3>
        </div>
        <section>
          <ExploreList collections={ this.props.collections } />
        </section>
      </main>
    );
  }
}

export default Explore;
