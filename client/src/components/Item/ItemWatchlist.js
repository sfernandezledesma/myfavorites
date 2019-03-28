import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { showError } from '../../actions/errorActions';
import { addToWatchlist, removeFromWatchlist } from '../../actions/watchlistActions';
import { ListItemIcon, ListItemText, Collapse, ListItem, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ItemDetails from './ItemDetails';

const mapStateToProps = state => ({ languageCode: state.languageReducer });
const mapDispatchToProps = { addToWatchlist, removeFromWatchlist, showError };

function ItemWatchlist({ id, name, onMyWatchlist, languageCode, addToWatchlist, removeFromWatchlist, showError }) {
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
          {
            onMyWatchlist ?
              <IconButton aria-label="Delete" onClick={removeFromMyWatchlist}>
                <DeleteIcon />
              </IconButton>
              :
              <IconButton aria-label="Add" onClick={addToMyWatchlist}>
                <AddIcon />
              </IconButton>
          }
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={detailsOpen} timeout="auto" style={{ margin: "0px 10px" }}>
        {detailsOpen ?
          <Fragment>
            <ItemDetails details={details} />
            {
              onMyWatchlist ?
                <Button size="small" onClick={removeFromMyWatchlist}>Remove From Watchlist</Button>
                : <Button size="small" onClick={addToMyWatchlist}>Add To Watchlist</Button>
            }
          </Fragment>
          : null}
      </Collapse>
    </Fragment>
  );

  function addToMyWatchlist() {
    addToWatchlist({ id: id, name: name });
  }

  function removeFromMyWatchlist() {
    removeFromWatchlist(id);
  }

  async function toggleDetails() {
    if (!moreDetailsFetched) {
      await fetchMoreDetails();
    }
    setDetailsOpen(!detailsOpen);
  }

  function fetchMoreDetails() {
    return fetch(`/api/id/${languageCode}/${id.media_type}/${id.media_tmdb_id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.id) {
          setDetails({ ...details, media_type: id.media_type, ...data });
          setMoreDetailsFetched(true);
        } else {
          showError(data.status_message);
        }
      })
      .catch(err => showError("Error connecting with API"));
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemWatchlist);