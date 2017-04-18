import { connect } from 'react-redux';
import { signup, login, logout } from '../../actions/session_actions';
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
  let processForm;
  if (formType === 'login') {
    processForm = login;
  } else if (formType === 'signup') {
    processForm = signup;
  }
  return {
    logout: () => dispatch(logout()),
    processForm: (user) => dispatch(processForm(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
