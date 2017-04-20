import { connect } from 'react-redux';
import User from './user';
import { updateUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.params.userId],
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
