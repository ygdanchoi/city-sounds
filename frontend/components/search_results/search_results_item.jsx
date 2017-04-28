import React from 'react';
import { Link } from 'react-router';

const SearchResultsItem = (props) => {
  if (props.collection) {
    return (
      <li>
        <img src={ props.collection.artworkUrl } />
        { props.collection.title }
        { props.collection.user.username }
      </li>
    );
  } else if (props.sound) {
    return (
      <li>
        <img src={ props.sound.artworkUrl } />
        { props.sound.title }
        { props.sound.user.username }
      </li>
    );
  } else {
    return <li />;
  }
};

export default SearchResultsItem;
