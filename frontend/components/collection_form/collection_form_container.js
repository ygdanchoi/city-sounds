import { connect } from 'react-redux';
import CollectionForm from './collection_form';

import { fetchCollection, createCollection, updateCollection } from '../../actions/collection_actions';
import { deleteSound } from '../../actions/sound_actions';
import { receiveErrors } from '../../actions/error_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    collection: state.collections[ownProps.location.query.id],
    collectionId: ownProps.location.query.id,
    sounds: state.sounds,
    errors: state.errors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let submitCollection;
  let submitText;
  if (ownProps.location.pathname === '/add-collection') {
    submitCollection = (_, collection) => dispatch(createCollection(collection));
    submitText = 'Publish';
  } else if (ownProps.location.pathname === '/edit-collection') {
    submitCollection = (id, collection) => dispatch(updateCollection(id, collection));
    submitText = 'Update';
  }
  return {
    fetchCollection: (id) => dispatch(fetchCollection(id)),
    submitCollection: submitCollection,
    submitText: submitText,
    clearErrors: () => dispatch(receiveErrors({})),
    deleteSound: (id) => dispatch(deleteSound(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionForm);
