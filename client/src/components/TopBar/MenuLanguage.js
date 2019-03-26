import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import LanguageIcon from "@material-ui/icons/Language";
import { setLanguageCode } from '../../actions/languageActions';
import { connect } from 'react-redux';

const options = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Svenska", code: "sv" }
];

const mapStateToProps = state => {
  return { languageCode: state.languageReducer };
};
const mapDispatchToProps = { setLanguageCode };

function MenuLanguage({ languageCode, setLanguageCode }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log("MenuLanguage rendered");

  useEffect(() => {
    setSelectedIndex(indexOfLanguageCode(languageCode));
  }, []);

  return (
    <div>
      <Button onClick={handleClickButton}>
        <LanguageIcon /> {options[selectedIndex].code}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.code}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );

  function handleClickButton(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setAnchorEl(null);
      const languageCode = options[index].code;
      setLanguageCode(languageCode);
      window.localStorage.setItem("languageCode", languageCode);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuLanguage);

function indexOfLanguageCode(languageCode) {
  console.log("Index of language code calculated");
  for (let i = 0; i < options.length; i++) {
    if (options[i].code === languageCode) {
      return i;
    }
  }
  return 0;
}