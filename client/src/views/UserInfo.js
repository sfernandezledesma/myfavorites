import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import Watchlist from '../components/Watchlist';
import { showError } from '../actions/errorActions';
import InputTopBar from '../components/TopBar/InputTopBar';

const mapDispatchToProps = { showError };
export default connect(null, mapDispatchToProps)(UserInfo);

function UserInfo(props) {
  const [userInfo, setUserInfo] = useState({ id: props.match.params.id, name: '', watchlist: [] });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`/api/user/${userInfo.id}`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(data.info);
      })
      .catch(err => showError("Could not get user info from server"));
  }, []);

  return (
    <Fragment>
      <InputTopBar onSubmit={onFilter} placeholder="Filter..." />
      <Typography variant="h5" align="center">{userInfo.name}'s Watchlist</Typography>
      <Watchlist watchlist={userInfo.watchlist} filter={filter} isMine={false} />
    </Fragment>
  );

  function onFilter(term) {
    setFilter(term.toLowerCase());
  }
}