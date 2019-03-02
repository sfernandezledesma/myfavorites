import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const TopBar = (props) => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Robots
          </Typography>
          <SearchIcon style={{ marginLeft: "20px" }} />
          <InputBase onChange={props.onSearchChange} placeholder="Search…" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;