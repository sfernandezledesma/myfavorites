import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppLogin } from '../context/contexts';
import { LOGIN_STATUS_LOGGEDIN } from '../context/reducers';

export function PrivateRoute({ path, render, component: Component, ...rest }) {
  const loginState = useContext(AppLogin);
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