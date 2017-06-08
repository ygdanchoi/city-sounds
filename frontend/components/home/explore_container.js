import { connect } from 'react-redux';
import Explore from './explore';

import { fetchAllCollections } from '../../actions/collection_actions';
import { fetchCollectionSounds } from '../../actions/sound_actions';
import { fetchAllTags } from '../../actions/tag_actions';

const mapStateToProps = (state) => {
  return {
    collections: state.collections,
    sounds: state.sounds,
    tags: state.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCollections: () => dispatch(fetchAllCollections()),
    fetchCollectionSounds: (id) => dispatch(fetchCollectionSounds(id)),
    fetchAllTags: () => dispatch(fetchAllTags()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
