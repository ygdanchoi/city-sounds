import * as APIUtil from '../util/collection_api_util';

export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const RECEIVE_COLLECTION = 'RECEIVE_COLLECTION';

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

export const fetchCollections = () => (dispatch) => {
  return APIUtil.fetchCollections().then(
    response => dispatch(receiveCollections(response))
  );
};

export const fetchCollection = (id) => (dispatch) => {
  return APIUtil.fetchCollection(id).then(
    response => dispatch(receiveCollection(response))
  );
};
