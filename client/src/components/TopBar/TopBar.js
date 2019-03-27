import React, { useEffect, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuLanguage from "./MenuLanguage";
import { LOGIN_STATUS_LOGGEDIN } from '../../reducers/loginReducer';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions';
import Link from '../Navigation/Link';

const mapStateToProps = (state) => {
  return {
    loginState: state.loginReducer
  };
};
const mapDispatchToProps = { logout };

function TopBar({ children, loginState, logout }) {
  console.log("TopBar rendered");

  useEffect(() => {
    document.title = "MyFav" + (loggedIn() ? " | Welcome back!" : "");
  }, [loginState.status]);

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        {renderNavButtons()}
        {children}
        <MenuLanguage />
        <Typography color="inherit" style={{ marginRight: "5px" }}>
          {loggedIn() ? loginState.name : "MyFavorites"}
        </Typography>
        {loggedIn() ? <Link to="/signin" onClick={onClickLogout}>Logout</Link> : null}
      </Toolbar>
    </AppBar>
  );

  function onClickLogout() {
    logout();
  }

  function loggedIn() {
    return loginState.status === LOGIN_STATUS_LOGGEDIN;
  }

  function renderNavButtons() {
    if (loggedIn()) {
      return (
        <Fragment>
          <Link to="/mywatchlist">Watchlist</Link>
          <Link to="/search">Search</Link>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Link to="/signin">Sign In</Link>
          <Link to="/register">Register</Link>
        </Fragment>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);