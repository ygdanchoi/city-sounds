import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import { fetchCollections, fetchCollection } from './actions/collection_actions';
import { fetchSounds, fetchSound } from './actions/sound_actions';

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
  window.fetchCollections = fetchCollections;
  window.fetchCollection = fetchCollection;
  window.fetchSounds = fetchSounds;
  window.fetchSound = fetchSound;
});
