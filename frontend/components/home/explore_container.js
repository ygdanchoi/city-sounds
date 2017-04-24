import { connect } from 'react-redux';
import Explore from './explore';

import { fetchAllCollections } from '../../actions/collection_actions';

const mapStateToProps = (state) => {
  return {
    collections: state.collections
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCollections: () => dispatch(fetchAllCollections()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
