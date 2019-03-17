import React, { memo } from 'react';
import TopBar from "./TopBar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

function SearchTopBar({ onSearch }) {
  console.log("SearchTopBar rendered");
  return (
    <TopBar>
      <SearchIcon />
      <InputBase
        placeholder="Search…"
        // onChange={onType}
        onKeyPress={onKeyPress}
        fullWidth
      />
    </TopBar>
  );

  function onKeyPress(event) {
    if (event.key === 'Enter')
      return onSearch(event.target.value);
  }
};

export default memo(SearchTopBar);