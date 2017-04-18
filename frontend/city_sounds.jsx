import React from 'react';
import ReactDOM from 'react-dom';
// import Root from './components/root';
// import confgureStore from './store/store';
import { signup, login, logout } from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to CitySounds</h1>, root);

  window.signup = signup;
  window.login = login;
  window.logout = logout;
});
