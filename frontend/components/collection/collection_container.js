import { connect } from 'react-redux';
import Collection from './collection';

import { fetchUser, updateUser, updateUserAvatar } from '../../actions/user_actions';
import { fetchCollection } from '../../actions/collection_actions';
import { fetchCollectionSounds } from '../../actions/sound_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users,
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
    fetchCollectionSounds: (collectionId) => dispatch(fetchCollectionSounds(collectionId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
