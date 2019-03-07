import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuLanguage from "../containers/MenuLanguage";
import { AppContext } from '../containers/AppContext';


const TopBar = (props) => {
  console.log("TopBar rendered");
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="subtitle1" color="inherit">
          <AppContext.Consumer>
            {context => "Hi, " + context.username || "MyFavorites"}
          </AppContext.Consumer>
        </Typography>
        <MenuLanguage />
        {props.children}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;