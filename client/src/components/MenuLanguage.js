import React from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import LanguageIcon from "@material-ui/icons/Language";
import { AppContext } from './AppContext';

const options = [
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Svenska", code: "sv" }
];

class MenuLanguage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedIndex: 0
    };
  }

  handleClickButton = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    if (index !== this.state.selectedIndex) {
      this.setState({ selectedIndex: index, anchorEl: null });
      this.context.changeLanguage(options[index].code);
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickButton}>
          <LanguageIcon /> {options[this.state.selectedIndex].code}
        </Button>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option.code}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default MenuLanguage;