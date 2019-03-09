import React, { useContext, memo, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuLanguage from "./MenuLanguage";
import { AppContext } from './AppContext';

const TopBar = memo((props) => {
  console.log("TopBar rendered");
  const context = useContext(AppContext);

  useEffect(() => {
    document.title = "MyFav" + (context.loggedIn ? " | Welcome back!" : "");
  });

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="subtitle1" color="inherit">
          {context.loggedIn ? "Hi, " + context.username : "MyFavorites"}
        </Typography>
        <MenuLanguage />
        {props.children}
      </Toolbar>
    </AppBar>
  );
});

export default TopBar;