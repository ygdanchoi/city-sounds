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
        <main className='explore-main'>
          <section>
            <ExploreList collections={ this.props.collections } />
          </section>
        </main>
      </div>
    );
  }
}

export default Explore;
