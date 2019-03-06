import React from 'react';
import TopBar from "./TopBar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const SearchTopBar = (props) => {
  const { onSearch } = props;
  return (
    <TopBar>
      <SearchIcon />
      <InputBase
        placeholder="Search…"
        // onChange={onType}
        onKeyPress={(event) => { if (event.key === 'Enter') return onSearch(event.target.value); }}
      />
    </TopBar>
  );
};

export default SearchTopBar;