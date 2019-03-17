import React, { Fragment, useEffect, useCallback, useContext } from 'react';
import { AppContext, AppDispatch, AppError, AppErrorDispatch } from "../contexts";
import Search from './Search';
import ErrorDialog from './ErrorDialog';
import SignIn from './SignIn';
import Register from './Register';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './Navigation';

function App(props) {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const error = useContext(AppError);
  const errorDispatch = useContext(AppErrorDispatch);
  const { errorOpen, errorDescription } = error;
  console.log("App rendered");

  useFirstTimeTokenCheck();
  useOnLoggingOut();

  const onErrorClose = useCallback(() => {
    console.log("Closing Error Dialog...");
    errorDispatch({ type: "closeErrorDialog" });
  }, [errorDispatch]);

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
      <ErrorDialog
        errorOpen={errorOpen}
        errorDescription={errorDescription}
        onErrorClose={onErrorClose}
      />
    </Fragment>
  );

  function useFirstTimeTokenCheck() {
    useEffect(() => { // Esto solo se va a ejecutar una vez, en Mount y Unmount si hubiera cleanup
      console.log("Intentando entrar con token la primera vez...");
      fetch("/api/getmein")
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            dispatch({ type: "login", name: data.name });
          } else {
            dispatch({ type: "signin", signinOpen: true });
          }
        });
    }, []); // Para que se ejecute una vez, es necesario pasar el [] como segundo argumento
  }

  function useOnLoggingOut() {
    useEffect(() => { // Borra la cookie del token de autenticacion
      if (context.loginStatus === "loggingOut") {
        fetch("/api/logout")
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              console.log("Successfully logged out.");
              dispatch({ type: "loggedOut" });
            } else {
              errorDispatch({ type: "showError", errorDescription: "Could not clean authentication cookie. Refresh and try logging out again." });
            }
          })
          .catch(err => errorDispatch({ type: "showError", errorDescription: "Could not reach server. Refresh and try logging out again." }));
      }
    }, [context.loginStatus]);
  }

  function loggedIn() {
    return context.loginStatus === "loggedIn";
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
          dispatch({ type: "login", name: data.name });
        } else {
          errorDispatch({ type: "showError", errorDescription: data.status_message });
        }
      });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeat_pass.value) {
      errorDispatch({ type: "showError", errorDescription: "Passwords don't match." });
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
            dispatch({ type: "login", name: data.name });
          }
        });
    }
  };
}

export default App;
