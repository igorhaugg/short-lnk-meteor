import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Switch, Route, withRouter, Redirect } from 'react-router';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return Meteor.userId() ? <Redirect to="/links" /> : <Login />;
        }}
      />
      <Route
        path="/signup"
        render={() => {
          return Meteor.userId() ? <Redirect to="/links" /> : <Signup />;
        }}
      />
      <Route
        path="/links"
        render={() => {
          return Meteor.userId() ? <Link /> : <Redirect to="/" />;
        }}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
