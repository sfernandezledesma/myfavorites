import React, { useEffect, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuLanguage from "./MenuLanguage";
import { Button } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";
import { LOGIN_STATUS_LOGGEDIN } from '../reducers/loginReducer';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';

const mapStateToProps = (state) => {
  return {
    loginState: state.loginReducer
  };
};
const mapDispatchToProps = { logout };

function TopBar({ children, location, loginState, logout }) {
  console.log("TopBar rendered");

  useEffect(() => {
    document.title = "MyFav" + (loggedIn() ? " | Welcome back!" : "");
  }, [loginState.status]);

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography color="inherit">
          {loggedIn() ? loginState.name : "MyFavorites"}
        </Typography>
        <MenuLanguage />
        {children}
        {renderNavButtons()}
      </Toolbar>
    </AppBar>
  );

  function onClickLogout() {
    logout();
  }

  function loggedIn() {
    return loginState.status === LOGIN_STATUS_LOGGEDIN;
  }

  function renderNavButtons() {
    const path = location.pathname;
    if (loggedIn()) {
      return (
        <Fragment>          
          {!path.includes("/search") ? <Link to="/search"><Button>Search</Button></Link> : null}
          {!path.includes("/watchlist") ? <Link to="/watchlist"><Button>Watchlist</Button></Link> : null}
          <Link to="/"><Button onClick={onClickLogout}>Logout</Button></Link>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {path !== "/signin" ? <Link to="/"><Button>Sign In</Button></Link> : null}
          {path !== "/register" ? <Link to="/register"><Button>Register</Button></Link> : null}
        </Fragment>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));