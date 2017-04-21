import { connect } from 'react-redux';
import User from './user';
import { fetchUser, updateUser, updateUserAvatar } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.params.userId],
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUser: (user) => dispatch(updateUser(user)),
    updateUserAvatar: (id, formData) => dispatch(updateUserAvatar(id, formData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
