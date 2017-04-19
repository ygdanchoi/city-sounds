import { connect } from 'react-redux';
import User from './user';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.params.userId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
