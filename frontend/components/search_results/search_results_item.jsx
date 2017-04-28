import React from 'react';
import { Link } from 'react-router';

const SearchResultsItem = (props) => {
  if (props.collection) {
    return (
      <li className='search-results-item'>
        <div className='search-results-item-main'>
          <Link to={`collections/${props.collection.id}`}>
            <figure className='search-results-item-artwork'>
              <img src={ props.collection.artworkUrl } />
            </figure>
          </Link>
          <div className='search-results-item-details'>
            <p className='search-results-item-category'>SOUND COLLECTION</p>
            <Link to={`collections/${props.collection.id}`} className='search-results-item-title'>{ props.collection.title }</Link>
            <p className='search-results-item-user'>by { props.collection.user.username }</p>
          </div>
        </div>
      </li>
    );
  } else if (props.sound) {
    return (
      <li className='search-results-item'>
        <div className='search-results-item-main'>
          <Link to={`collections/${props.sound.collectionId}`}>
            <figure className='search-results-item-artwork'>
              <img src={ props.sound.artworkUrl } />
            </figure>
          </Link>
          <div className='search-results-item-details'>
            <p className='search-results-item-category'>SOUND</p>
            <Link to={`collections/${props.sound.collectionId}`} className='search-results-item-title'>{ props.sound.title }</Link>
            <p className='search-results-item-user'>by { props.sound.user.username }</p>
          </div>
        </div>
      </li>
    );
  } else {
    return <li />;
  }
};

export default SearchResultsItem;
