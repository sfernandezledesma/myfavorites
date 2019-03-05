import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
//import Button from "@material-ui/core/Button";
import MenuLanguage from "../containers/MenuLanguage";


const TopBar = (props) => {
  const { onSearch, onType } = props;
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        
        <Typography variant="h6" color="inherit">
          MyFavorites
        </Typography>
        <MenuLanguage />
        <SearchIcon />
        <InputBase
          placeholder="Search…"
          onChange={onType}
          onKeyPress={(event) => { if (event.key === 'Enter') return onSearch(); }}
        />

        {/* <Button variant="contained" onClick={onSearch} >
          Go
          </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;