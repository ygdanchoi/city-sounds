import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import AuthFormContainer from './auth_form/auth_form_container';
import UserContainer from './user/user_container';
import CollectionContainer from './collection/collection_container';

const Root = (props) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    if (props.store.getState().session.currentUser) {
      replace('/');
    }
  };

  return (
    <Provider store={ props.store }>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
          <Route path='login'
            component={ AuthFormContainer } onEnter={ _redirectIfLoggedIn } />
          <Route path='signup'
            component={ AuthFormContainer } onEnter={ _redirectIfLoggedIn } />
          <Route path='users/:userId'
            component={ UserContainer } />
          <Route path='collections/:collectionId'
            component={ CollectionContainer } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
