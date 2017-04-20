import { connect } from 'react-redux';
import User from './user';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.params.userId],
    currentUser: state.session.currentUser,
    loggedIn: state.session.currentUser !== null
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