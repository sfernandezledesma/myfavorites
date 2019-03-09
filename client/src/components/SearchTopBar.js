import React, { memo } from 'react';
import TopBar from "./TopBar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const SearchTopBar = memo((props) => {
  const { onSearch } = props;
  const onKeyPress = (event) => {
    if (event.key === 'Enter')
      return onSearch(event.target.value);
  };

  return (
    <TopBar>
      <SearchIcon />
      <InputBase
        placeholder="Search…"
        // onChange={onType}
        onKeyPress={onKeyPress}
      />
    </TopBar>
  );
});

export default SearchTopBar;