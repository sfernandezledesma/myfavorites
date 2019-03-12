import React, { useContext, memo, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuLanguage from "./MenuLanguage";
import { AppContext, AppDispatch } from '../contexts';
import { Button } from '@material-ui/core';

const TopBar = memo((props) => {
  console.log("TopBar rendered");
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);

  useEffect(() => {
    document.title = "MyFav" + (loggedIn() ? " | Welcome back!" : "");
  }, [context.loginStatus]);

  function onLogout() {
    dispatch({ type: "logout" });
  }

  function loggedIn() {
    return context.loginStatus === "loggedIn";
  }

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography color="inherit">
          {loggedIn() ? context.username : "MyFavorites"}
        </Typography>
        <MenuLanguage />
        {props.children}
        {loggedIn() ? <Button onClick={onLogout}>Logout</Button> : null}
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;