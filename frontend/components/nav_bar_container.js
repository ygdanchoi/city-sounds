import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../actions/session_actions';
import { receiveNavBarState } from '../actions/nav_bar_state_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    loggedIn: state.session.currentUser !== null,
    navBarState: state.navBarState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    receiveNavBarState: (navBarState) => dispatch(receiveNavBarState(navBarState))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
