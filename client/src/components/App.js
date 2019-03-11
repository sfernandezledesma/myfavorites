import React, { Fragment, useReducer } from 'react';
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
    loggedIn: false,
    username: "",
    languageCode: "en",
    errorOpen: false,
    errorDescription: ""
  });

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
