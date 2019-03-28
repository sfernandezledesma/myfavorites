import React, { Fragment, useState, useEffect } from 'react';
import InputTopBar from '../components/TopBar/InputTopBar';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import { showError } from '../actions/errorActions';

export default connect(null, { showError })(Users);

function Users() {
  //const [filter, setFilter] = useState("");
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(users => setUsersList(users))
      .catch(err => showError(err.toString()));
  }, []);

  return (
    <Fragment>
      <InputTopBar onSubmit={onSearchUsers} placeholder="Search users..." />
      <Typography variant="h5" align="center">Users</Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List style={{ width: "100%", maxWidth: "480px" }}>
          {
            usersList.map(user => {
              return (
                <Link key={user.id} to={`/user/${user.name}`}>
                  <ListItem>
                    <ListItemIcon>
                      <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.name} />
                  </ListItem>
                </Link>
              );
            })
          }
        </List>
      </div>
    </Fragment>
  );

  function onSearchUsers(term) {
    return null;
  }
}