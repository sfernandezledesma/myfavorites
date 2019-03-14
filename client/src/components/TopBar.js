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

  function onClickLogout() {
    dispatch({ type: "logout" });
  }

  function onClickSignIn() {
    dispatch({type: "signin", signinOpen: true});
  }

  function loggedIn() {
    return context.loginStatus === "loggedIn";
  }

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography color="inherit">
          {loggedIn() ? context.name : "MyFavorites"}
        </Typography>
        <MenuLanguage />
        {props.children}
        {loggedIn() 
          ? <Button onClick={onClickLogout}>Logout</Button> 
          : <Button onClick={onClickSignIn}>Sign In</Button> }
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;