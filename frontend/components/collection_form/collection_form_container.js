import { connect } from 'react-redux';
import CollectionForm from './collection_form';

import { fetchCollection, createCollection, updateCollection } from '../../actions/collection_actions';
import { fetchCollectionSounds } from '../../actions/sound_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    collection: state.collections[ownProps.location.query.id],
    collectionId: ownProps.location.query.id,
    sounds: state.sounds
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCollection: (id) => dispatch(fetchCollection(id)),
    fetchCollectionSounds: (collectionId) => dispatch(fetchCollectionSounds(collectionId)),
    createCollection: (collection) => dispatch(createCollection(collection)),
    updateCollection: (id, collection) => dispatch(updateCollection(id, collection)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionForm);
