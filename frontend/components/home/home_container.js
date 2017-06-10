import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Home from './home';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    loggedIn: state.session.currentUser !== null,
    location: ownProps.location
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
