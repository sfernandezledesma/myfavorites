import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { showError } from '../actions/errorActions';
import { addToWatchlist, removeFromWatchlist } from '../actions/watchlistActions';
import { ListItemIcon, ListItemText, Collapse, ListItem, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import DeleteIcon from '@material-ui/icons/Delete';
import { getMediaTypeFromId } from '../utils';
import ItemDetails from './ItemDetails';

const mapStateToProps = state => ({ languageCode: state.languageReducer });
const mapDispatchToProps = { addToWatchlist, removeFromWatchlist, showError };

function ItemWatchlist({ id, name, languageCode, addToWatchlist, removeFromWatchlist, showError }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [moreDetailsFetched, setMoreDetailsFetched] = useState(false);
  console.log("ItemWatchlist rendered");

  return (
    <Fragment>
      <ListItem button onClick={toggleDetails}>
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
      <Collapse in={detailsOpen} timeout="auto" style={{margin: "0px 10px"}}>
        {detailsOpen ? <ItemDetails details={details} /> : null}
      </Collapse>
    </Fragment>
  );

  async function toggleDetails() {
    if (!moreDetailsFetched) {
      await fetchMoreDetails();
    }
    setDetailsOpen(!detailsOpen);
  }

  function fetchMoreDetails() {
    const media_type = getMediaTypeFromId(id);
    return fetch(`/api/id/${languageCode}/${media_type}/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.id) {
          setDetails({ ...details, media_type: media_type, ...data });
          setMoreDetailsFetched(true);
        } else {
          showError(data.status_message);
        }
      })
      .catch(err => showError("Error connecting with API"));
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemWatchlist);