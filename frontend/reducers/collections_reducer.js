import { RECEIVE_COLLECTIONS, RECEIVE_COLLECTION } from '../actions/collection_actions';
import merge from 'lodash/merge';

const CollectionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COLLECTIONS:
      return action.collections;
    case RECEIVE_COLLECTION:
      return {[action.collection.id]: action.collection};
    default:
      return state;
  }
};

export default CollectionsReducer;
