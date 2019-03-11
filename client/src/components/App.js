import React, { Fragment, useReducer, useEffect } from 'react';
import { AppContext, AppDispatch } from "./AppContext";
import Search from './Search';
import ErrorDialog from './ErrorDialog';
import SignIn from './SignIn';
import TopBar from './TopBar';
import Register from './Register';
import { reducer } from '../reducer';

function App(props) {
  const [state, dispatch] = useReducer(reducer, {
    route: "firstTime",
    loginStatus: "loggedOut",
    username: "",
    languageCode: "en",
    errorOpen: false,
    errorDescription: ""
  });

  useEffect(() => {
    if (state.loginStatus === "loggingOut") {
      fetch("/logout")
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Successfully logged out.");
          dispatch({type: "loggedOut"});
        } else {
          dispatch({type: "showError", errorDescription: "Could not clean authentication cookie. Refresh and try logging out again."});
        }
      })
      .catch(err => dispatch({type: "showError", errorDescription: "Could not reach server. Refresh and try logging out again."}));
    }
  }, [state.loginStatus]);

  function onErrorClose() {
    dispatch({ type: "closeErrorDialog" });
  }

  function handleSignInSubmit(event) {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value };
    fetch("/login", {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          dispatch({ type: "login", username: data.username });
        }
      });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeat_pass.value) {
      dispatch({type:"showError", errorDescription: "Passwords don't match."});
    } else {
      const body = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value
      };
      fetch("/register", {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            dispatch({ type: "login", username: data.username });
          }
        });
    }
  };

  function renderMainComponent() {
    const { route } = state;
    switch (route) {
      case "firstTime": {
        fetch("/getmein")
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              dispatch({ type: "login", username: data.username });
            } else {
              dispatch({ type: "changeRoute", route: "signin" });
            }
          });
        return null;
      }
      case "search": {
        return <Search />;
      }
      case "register": {
        return (
          <Fragment>
            <TopBar />
            <Register handleRegister={handleRegister} />
          </Fragment>
        );
      }
      case "signin":
      default: {
        return (
          <Fragment>
            <TopBar />
            <SignIn handleSignInSubmit={handleSignInSubmit} />
          </Fragment>
        );
      }
    }
  };

  const { errorOpen, errorDescription } = state;
  return (
    <AppDispatch.Provider value={dispatch}>
      <AppContext.Provider value={state}>
        {renderMainComponent()}
        <ErrorDialog
          errorOpen={errorOpen}
          errorDescription={errorDescription}
          onErrorClose={onErrorClose}
        />
      </AppContext.Provider>
    </AppDispatch.Provider>
  );
}

export default App;
