import { connect } from 'react-redux';
import Collection from './collection';

import { fetchUser, updateUser, updateUserAvatar } from '../../actions/user_actions';
import { fetchCollection } from '../../actions/collection_actions';
import { fetchCollectionSounds } from '../../actions/sound_actions';

const mapStateToProps = (state, ownProps) => {
  let user;
  if (Object.keys(state.users)[0]) {
    user = state.users[Object.keys(state.users)[0]];
  } else {
    user = {};
  }
  return {
    user: user,
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
