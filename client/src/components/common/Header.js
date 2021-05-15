import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";

import "../css/Header.css";

import { useStateValue } from "../../store/provider";
import { actionTypes } from "../../store/reducer";

function Header() {
  const [state, dispatch] = useStateValue();

  // Reset token when clicked on logout
  const handleLogout = () => {
    dispatch({
      type: actionTypes.SET_TOKEN,
      token: null,
    });
  };

  return (
    <AppBar className="header" position="static">
      <Toolbar className="header__toolbar">
        <img
          alt="Anyfin"
          className="toolbar__image"
          src="https://anyfin.com/static/press/logo-blue-rgb.png"
        />
        <Button onClick={handleLogout} className="toolbar__logout">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
