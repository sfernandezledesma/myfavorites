import React, { Fragment, useReducer, useEffect, useCallback } from 'react';
import { AppContext, AppDispatch, AppWatchlist, AppWatchlistDispatch } from "../contexts";
import Search from './Search';
import ErrorDialog from './ErrorDialog';
import SignIn from './SignIn';
import TopBar from './TopBar';
import Register from './Register';
import { globalReducer } from '../reducers';
import { useWatchlist } from '../customHooks';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App(props) {
  const [state, dispatch] = useReducer(globalReducer, {
    loginStatus: "loggedOut",
    name: "",
    languageCode: "en",
    errorOpen: false,
    errorDescription: ""
  });
  const [watchlist, watchlistDispatch] = useWatchlist();

  useEffect(() => { // Esto solo se va a ejecutar una vez, en Mount y Unmount si hubiera cleanup
    const savedLangageCode = window.localStorage.getItem("languageCode");
    console.log("Saved language code", savedLangageCode);
    if (savedLangageCode) {
      dispatch({ type: "changeLanguage", languageCode: savedLangageCode });
    }
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

  useEffect(() => { // Borra la cookie del token de autenticacion
    if (state.loginStatus === "loggingOut") {
      fetch("/api/logout")
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log("Successfully logged out.");
            dispatch({ type: "loggedOut" });
          } else {
            dispatch({ type: "showError", errorDescription: "Could not clean authentication cookie. Refresh and try logging out again." });
          }
        })
        .catch(err => dispatch({ type: "showError", errorDescription: "Could not reach server. Refresh and try logging out again." }));
    }
  }, [state.loginStatus]);

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
          dispatch({ type: "showError", errorDescription: data.status_message });
        }
      });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeat_pass.value) {
      dispatch({ type: "showError", errorDescription: "Passwords don't match." });
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

  const onErrorClose = useCallback(() => {
    dispatch({ type: "closeErrorDialog" });
  }, [dispatch]);

  console.log("App rendered");
  const { errorOpen, errorDescription } = state;
  return (
    <AppDispatch.Provider value={dispatch}>
      <AppContext.Provider value={state}>
        <AppWatchlistDispatch.Provider value={watchlistDispatch}>
          <AppWatchlist.Provider value={watchlist}>
            <Router>
              <Fragment>
                <Route exact path="/" render={() => {
                  if (state.loginStatus !== "loggedIn") {
                    return (
                      <Fragment>
                        <TopBar />
                        <SignIn handleSignIn={handleSignIn} />
                      </Fragment>
                    );
                  } else {
                    return <Redirect to="/search" />;
                  }
                }} />
                <Route exact path="/register" render={() => {
                  return (
                    <Fragment>
                      <TopBar />
                      <Register handleRegister={handleRegister} />
                    </Fragment>
                  );
                }} />
                <Route exact path="/search/:query?" component={Search} />
              </Fragment>
            </Router>
            <ErrorDialog
              errorOpen={errorOpen}
              errorDescription={errorDescription}
              onErrorClose={onErrorClose}
            />
          </AppWatchlist.Provider>
        </AppWatchlistDispatch.Provider>
      </AppContext.Provider>
    </AppDispatch.Provider>
  );
}

export default App;
