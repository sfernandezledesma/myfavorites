import React, { Fragment, useEffect, useContext } from 'react';
import { AppLogin, AppLoginDispatch, AppErrorDispatch } from "../context/contexts";
import Search from '../pages/Search';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './Navigation';
import ErrorDialog from './ErrorDialog';
import { ERROR_SHOW, LOGIN_ACTION_LOGIN, LOGIN_STATUS_LOGGEDIN, LOGIN_STATUS_LOGGEDOUT } from '../context/reducers';

function App(props) {
  const loginState = useContext(AppLogin);
  const loginDispatch = useContext(AppLoginDispatch);
  const errorDispatch = useContext(AppErrorDispatch);
  console.log("App rendered");

  useFirstTimeTokenCheck();
  useOnLoggingOut();

  return (
    <Fragment>
      <PrivateRoute exact path="/" render={() => <Redirect to="/search" />} />
      <PrivateRoute exact path="/search/:query?" component={Search} />
      <Route exact path="/signin" render={(props) => {
        if (loggedIn()) {
          const urlToGoNext = props.location.state ? props.location.state.from : "/search";
          return <Redirect to={urlToGoNext} />;
        } else {
          return <SignIn handleSignIn={handleSignIn} {...props} />;
        }
      }} />
      <Route exact path="/register" render={(props) => {
        return <Register handleRegister={handleRegister} {...props} />;
      }} />
      <ErrorDialog />
    </Fragment>
  );

  function useFirstTimeTokenCheck() {
    useEffect(() => { // Esto solo ejecuta una vez en Mount y el "return callback" en Unmount
      console.log("Intentando entrar con token la primera vez...");
      fetch("/api/getmein")
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            loginDispatch({ type: LOGIN_ACTION_LOGIN, name: data.name });
          }
        });
    }, []); // Para que se ejecute una vez, es necesario pasar el [] como segundo argumento
  }

  function useOnLoggingOut() {
    useEffect(() => { // Borra la cookie del token de autenticacion
      if (loginState.status === LOGIN_STATUS_LOGGEDOUT) {
        fetch("/api/logout")
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              console.log("Successfully logged out.");
            } else {
              errorDispatch({ type: ERROR_SHOW, errorDescription: "Could not clean authentication cookie. Refresh and try logging out again." });
            }
          })
          .catch(err => errorDispatch({ type: ERROR_SHOW, errorDescription: "Could not reach server. Refresh and try logging out again." }));
      }
    }, [loginState.status]);
  }

  function loggedIn() {
    return loginState.status === LOGIN_STATUS_LOGGEDIN;
  }

  function handleSignIn(event) {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value };
    fetch("/api/login", {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          loginDispatch({ type: LOGIN_ACTION_LOGIN, name: data.name });
        } else {
          errorDispatch({ type: ERROR_SHOW, errorDescription: data.status_message });
        }
      });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeat_pass.value) {
      errorDispatch({ type: ERROR_SHOW, errorDescription: "Passwords don't match." });
    } else {
      const body = {
        name: event.target.name.value,
        email: event.target.username.value,
        password: event.target.password.value
      };
      fetch("/api/register", {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            loginDispatch({ type: LOGIN_ACTION_LOGIN, name: data.name });
          }
        });
    }
  };
}

export default App;
