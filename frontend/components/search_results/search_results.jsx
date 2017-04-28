import React from 'react';
import { Link, hashHistory } from 'react-router';
import SearchResultsItem from './search_results_item';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: this.props.location.search.slice(1)
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchQuery: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    hashHistory.push(`/search?${this.state.searchQuery}`);
  }

  componentDidMount() {
    this.props.searchCollections(this.state.searchQuery);
    this.props.searchSounds(this.state.searchQuery);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location != newProps.location) {
      this.props.searchCollections(this.state.searchQuery);
      this.props.searchSounds(this.state.searchQuery);
    }
  }

  render() {
    let collections;
    let sounds;
    if (this.props.collections) {
      collections = Object.keys(this.props.collections).map(
        id => <SearchResultsItem key={id} collection={ this.props.collections[id] } />
      );
    }
    if (this.props.sounds) {
      sounds = Object.keys(this.props.sounds).map(
        id => <SearchResultsItem key={-id} sound={ this.props.sounds[id] } />
      );
    }
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type='text' value={ this.state.searchQuery } onChange={ this.handleChange } />
          <input type='submit' value='Search' />
        </form>
        search results!
        <ul>
          { collections }
          { sounds }
        </ul>
      </div>
    );
  }
}

export default SearchResults;
