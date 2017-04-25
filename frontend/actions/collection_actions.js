import * as APIUtil from '../util/collection_api_util';

export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';
export const RECEIVE_COLLECTION_WITH_SOUNDS = 'RECEIVE_COLLECTION_WITH_SOUNDS';

export const receiveCollections = (collections) => {
  return {
    type: RECEIVE_COLLECTIONS,
    collections: collections
  };
};

export const receiveCollection = (collection) => {
  return {
    type: RECEIVE_COLLECTION,
    collection: collection
  };
};

export const receiveCollectionWithSounds = (collection) => {
  return {
    type: RECEIVE_COLLECTION_WITH_SOUNDS,
    collection: collection
  };
};

export const fetchAllCollections = () => (dispatch) => {
  return APIUtil.fetchAllCollections().then(
    response => dispatch(receiveCollections(response))
  );
};

export const fetchUserCollections = (userId) => (dispatch) => {
  return APIUtil.fetchUserCollections(userId).then(
    response => dispatch(receiveCollections(response))
  );
};

export const fetchCollection = (id) => (dispatch) => {
  return APIUtil.fetchCollection(id).then(
    response => dispatch(receiveCollection(response))
  );
};

export const createCollection = (collection) => (dispatch) => {
  return APIUtil.createCollection(collection).then(
    response => dispatch(receiveCollectionWithSounds(response))
  );
};
