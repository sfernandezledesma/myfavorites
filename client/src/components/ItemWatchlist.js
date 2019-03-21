import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { showError } from '../actions/errorActions';
import { addToWatchlist, removeFromWatchlist } from '../actions/watchlistActions';
import { ListItemIcon, ListItemText, Collapse, ListItem, List, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import DeleteIcon from '@material-ui/icons/Delete';

const mapDispatchToProps = { addToWatchlist, removeFromWatchlist, showError };

function ItemWatchlist({ id, name, addToWatchlist, removeFromWatchlist, showError }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState({});

  return (
    <Fragment>
      <ListItem button onClick={() => setDetailsOpen(!detailsOpen)}>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText inset primary={name} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => removeFromWatchlist(id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={detailsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button >
            <ListItemText inset primary="Details" />
          </ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
}

export default connect(null, mapDispatchToProps)(ItemWatchlist);