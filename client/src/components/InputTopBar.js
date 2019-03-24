import React from 'react';
import TopBar from "./TopBar";
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, InputAdornment } from '@material-ui/core';

function InputTopBar({ onSubmit, placeholder }) {
  console.log("SearchTopBar rendered");
  return (
    <TopBar>
      <InputBase
        placeholder={placeholder || "Search…"}
        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        onKeyPress={onKeyPress}
        fullWidth
      >
      </InputBase>
    </TopBar>
  );

  function onKeyPress(event) {
    if (event.key === 'Enter')
      return onSubmit(event.target.value);
  }
};

export default InputTopBar;