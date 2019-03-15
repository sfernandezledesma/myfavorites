import React, { useContext, useState, memo, useEffect } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import LanguageIcon from "@material-ui/icons/Language";
import { AppDispatch, AppContext } from '../contexts';

const options = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Svenska", code: "sv" }
];

function indexOfLanguageCode(languageCode) {
  console.log("Index of language code calculated");
  for (let i = 0; i < options.length; i++) {
    if (options[i].code === languageCode) {
      return i;
    }
  }
  return 0;
}

const MenuLanguage = memo((props) => {
  const dispatch = useContext(AppDispatch);
  const context = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(indexOfLanguageCode(context.languageCode));
  }, []);

  const handleClickButton = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setAnchorEl(null);
      const languageCode = options[index].code;
      dispatch({ type: "changeLanguage", languageCode: languageCode });
      window.localStorage.setItem("languageCode", languageCode);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("MenuLanguage rendered");

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
});

export default MenuLanguage;