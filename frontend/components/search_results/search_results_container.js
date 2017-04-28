import { connect } from 'react-redux';
import SearchResults from './search_results';

import { searchCollections } from '../../actions/collection_actions';
import { searchSounds } from '../../actions/sound_actions';

const mapStateToProps = (state) => {
  return {
    collections: state.collections,
    sounds: state.sounds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCollections: (query) => dispatch(searchCollections(query)),
    searchSounds: (query) => dispatch(searchSounds(query)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
