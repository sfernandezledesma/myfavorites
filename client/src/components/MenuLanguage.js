import React, { useContext, useState, memo } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import LanguageIcon from "@material-ui/icons/Language";
import { AppContext } from './AppContext';

const options = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Svenska", code: "sv" }
];

const MenuLanguage = memo((props) => {
  const context = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickButton = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setAnchorEl(null);
      context.changeLanguage(options[index].code);
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