import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ErrorDialog from './ErrorDialog';
import { LOGIN_STATUS_LOGGEDIN, LOGIN_STATUS_LOGGEDOUT } from '../reducers/loginReducer';
import { login } from '../actions/loginActions';
import { showError } from '../actions/errorActions';
import { setWatchlist } from '../actions/watchlistActions';
import Search from '../pages/Search';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import Watchlist from '../pages/Watchlist';

const mapStateToProps = (state) => {
  return {
    loginState: state.loginReducer
  };
};
const mapDispatchToProps = { login, showError, setWatchlist };

function App({ loginState, login, showError, setWatchlist }) {
  console.log("App rendered");

  useFirstTimeTokenCheck();
  useWatchlist();
  useOnLoggingOut();

  return (
    <Fragment>
      <PrivateRoute exact path="/" render={() => <Redirect to="/watchlist" />} loginState={loginState} />
      <PrivateRoute exact path="/search/:query?" component={Search} loginState={loginState} />
      <PrivateRoute exact path="/watchlist" component={Watchlist} loginState={loginState} />
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
            login(data.name);
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
              showError("Could not clean authentication cookie. Refresh and try logging out again.");
            }
          })
          .catch(err => showError("Could not reach server. Refresh and try logging out again."));
      }
    }, [loginState.status]);
  }

  function useWatchlist() {
    useEffect(() => { // Descarga la watchlist al logearse y la borra al salir
      if (loginState.status === LOGIN_STATUS_LOGGEDIN) {
        fetch("/api/watchlist/get")
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log("Watchlist fetched:", data.watchlist);
              setWatchlist(data.watchlist);
            }
          });
      } else if (loginState.status === LOGIN_STATUS_LOGGEDOUT) {
        console.log("Limpiando busqueda y watchlist de usuario...");
        setWatchlist([]);
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
          login(data.name);
        } else {
          showError(data.status_message);
        }
      });
  }

  function handleRegister(event) {
    event.preventDefault();
    if (event.target.password.value !== event.target.repeat_pass.value) {
      showError("Passwords don't match.");
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
            login(data.name);
          }
        });
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
