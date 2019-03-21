import React from 'react';
import TopBar from "./TopBar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

function InputTopBar({ onSubmit, placeholder }) {
  console.log("SearchTopBar rendered");
  return (
    <TopBar>
      <SearchIcon />
      <InputBase
        placeholder={placeholder || "Search…"}
        onKeyPress={onKeyPress}
        fullWidth
      />
    </TopBar>
  );

  function onKeyPress(event) {
    if (event.key === 'Enter')
      return onSubmit(event.target.value);
  }
};

export default InputTopBar;