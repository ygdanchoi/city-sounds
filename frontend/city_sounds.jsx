import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import { fetchAllCollections, fetchUserCollections, fetchCollection } from './actions/collection_actions';
import { fetchAllSounds, fetchCollectionSounds, fetchSound } from './actions/sound_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);

  window.store = store;
  window.fetchAllCollections = fetchAllCollections;
  window.fetchUserCollections = fetchUserCollections;
  window.fetchCollection = fetchCollection;
  window.fetchAllSounds = fetchAllSounds;
  window.fetchCollectionSounds = fetchCollectionSounds;
  window.fetchSound = fetchSound;
});
