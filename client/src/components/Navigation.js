import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../contexts';

export function PrivateRoute({ path, render, component: Component, ...rest }) {
  const context = useContext(AppContext);
  const loggedIn = context.loginStatus === "loggedIn";

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