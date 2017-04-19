import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Home from './home';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    loggedIn: state.session.currentUser !== null
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
