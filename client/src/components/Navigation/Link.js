import React from 'react';
import { NavLink } from 'react-router-dom';

function Link(props) {
  return (
    <NavLink
      {...props}
      style={{ ...props.style, color: "inherit", marginRight:"5px" }}
      activeStyle={{ textDecoration: "underline" }}
    >
      {props.children}
    </NavLink>
  );
}

export default Link;