import { connect } from 'react-redux';
import Explore from './explore';

import { fetchAllCollections } from '../../actions/collection_actions';
import { fetchAllTags } from '../../actions/tag_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    collections: state.collections,
    sounds: state.sounds,
    tags: state.tags,
    location: ownProps.location
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCollections: (params) => dispatch(fetchAllCollections(params)),
    fetchAllTags: () => dispatch(fetchAllTags()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
