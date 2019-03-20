import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_STATUS_LOGGEDIN } from '../reducers/loginReducer';

function PrivateRoute({ path, render, component: Component, loginState, ...rest }) {
  const loggedIn = loginState.status === LOGIN_STATUS_LOGGEDIN;

  return <Route {...rest} path={path} render={(props) => {
    if (loggedIn) {
      if (Component) {
        return <Component {...props} />;
      } else {
        return render(props);
      }
    } else {
      return <Redirect to={{
        pathname: "/signin",
        state: { from: props.location }
      }} />;
    }
  }} />;
}

export default PrivateRoute;