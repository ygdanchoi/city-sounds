import { connect } from 'react-redux';
import Collection from './collection';

import { fetchUser, updateUser, updateUserAvatar } from '../../actions/user_actions';
import { fetchCollection, deleteCollection } from '../../actions/collection_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    collection: state.collections[ownProps.params.collectionId],
    sounds: state.sounds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUser: (user) => dispatch(updateUser(user)),
    updateUserAvatar: (id, formData) => dispatch(updateUserAvatar(id, formData)),
    fetchCollection: (id) => dispatch(fetchCollection(id)),
    deleteCollection: (id) => dispatch(deleteCollection(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
