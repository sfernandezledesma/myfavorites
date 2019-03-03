import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from "@material-ui/core/Button";


const TopBar = (props) => {
  const { onSearch, onType } = props;
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            MyFavorites
          </Typography>
          <SearchIcon style={{ marginLeft: "20px" }} />
          <InputBase
            placeholder="Search…"
            onChange={onType}
            onKeyPress={(event) => { if (event.key === 'Enter') return onSearch(); }}
          />
          <Button variant="contained" onClick={onSearch} >
            Go
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;