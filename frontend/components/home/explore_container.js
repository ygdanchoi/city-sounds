import { connect } from 'react-redux';
import Explore from './explore';

import { fetchAllCollections } from '../../actions/collection_actions';
import { fetchCollectionSounds } from '../../actions/sound_actions';

const mapStateToProps = (state) => {
  return {
    collections: state.collections,
    sounds: state.sounds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCollections: () => dispatch(fetchAllCollections()),
    fetchCollectionSounds: (id) => dispatch(fetchCollectionSounds(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
