import { connect } from 'react-redux';
import App from './app';
import { receiveNavBarState } from '../actions/nav_bar_state_actions';

const mapStateToProps = (state) => {
  return {
    navBarState: state.navBarState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveNavBarState: (navBarState) => dispatch(receiveNavBarState(navBarState))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
