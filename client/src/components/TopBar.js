import React, { useContext, useEffect, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuLanguage from "./MenuLanguage";
import { AppContext, AppDispatch } from '../contexts';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const TopBar = withRouter((props) => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  console.log("TopBar rendered");

  useEffect(() => {
    document.title = "MyFav" + (loggedIn() ? " | Welcome back!" : "");
  }, [context.loginStatus]);

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography color="inherit">
          {loggedIn() ? context.name : "MyFavorites"}
        </Typography>
        <MenuLanguage />
        {props.children}
        {renderNavButtons()}
      </Toolbar>
    </AppBar>
  );

  function onClickLogout() {
    dispatch({ type: "logout" });
  }

  function loggedIn() {
    return context.loginStatus === "loggedIn";
  }

  function renderNavButtons() {
    const path = props.location.pathname;
    if (loggedIn()) {
      return (
        <Fragment>
          <Link to="/"><Button onClick={onClickLogout}>Logout</Button></Link>
          {!path.includes("/search") ? <Link to="/search"><Button>Search</Button></Link> : null}
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
});

export default TopBar;