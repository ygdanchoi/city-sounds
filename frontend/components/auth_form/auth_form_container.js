import { connect } from 'react-redux';
import { signup, login, logout } from '../../actions/session_actions';
import { receiveErrors } from '../../actions/error_actions';
import AuthForm from './auth_form';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.session.currentUser !== null,
    errors: state.errors,
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
    loginAnyone: (username, password) => dispatch(login({ user: { username, password } }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
