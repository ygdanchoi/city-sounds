import { connect } from 'react-redux';
import { signup, login, logout, receiveErrors } from '../../actions/session_actions';
import { fetchUser } from '../../actions/user_actions';
import AuthForm from './auth_form';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.session.currentUser !== null,
    errors: state.session.errors,
    formType: ownProps.location.pathname.slice(1)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formType = ownProps.location.pathname.slice(1);
  const guest = { user: { username: 'guest', password: 'password' } };
  let processForm;
  if (formType === 'login') {
    processForm = login;
  } else if (formType === 'signup') {
    processForm = signup;
  }
  return {
    logout: () => dispatch(logout()),
    processForm: (user) => dispatch(processForm(user)),
    clearErrors: () => dispatch(receiveErrors({})),
    loginGuest: () => dispatch(login(guest)),
    fetchUser: (id) => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
