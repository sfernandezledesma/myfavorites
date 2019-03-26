import React, { Fragment, useState, useEffect } from 'react';
import { CardMedia, CardContent, CardActions, Typography, Button } from "@material-ui/core";
import { showError } from '../../actions/errorActions';
import { addToWatchlist, removeFromWatchlist } from '../../actions/watchlistActions';
import { connect } from 'react-redux';
import ItemDetails from './ItemDetails';

const mapStateToProps = state => {
  return { languageCode: state.languageReducer };
};
const mapDispatchToProps = { showError, addToWatchlist, removeFromWatchlist };

function Item({ languageCode, isOnWatchlist, basicInfo, showError, addToWatchlist, removeFromWatchlist }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [moreDetailsFetched, setMoreDetailsFetched] = useState(false);
  const [details, setDetails] = useState(basicInfo);
  console.log("Item rendered");

  useEffect(() => {
    if (moreDetailsFetched) {
      console.log("Item details re-fetched");
      fetchMoreDetails();
    }
  }, [languageCode]);

  if (!detailsOpen) {
    return (
      <Fragment>
        <CardMedia
          style={{ width: 200, height: 300, flex: 1 }}
          image={(details.poster_path || details.profile_path) ? "https://image.tmdb.org/t/p/w500" + (details.poster_path || details.profile_path) : "#"}
          title={details.name}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <CardContent style={{ flex: 9, overflow: "auto" }}>
            <Typography variant="subtitle1">
              {details.name || details.title}
            </Typography>
            <Typography>
              {details.media_type === "person" ? "PERSON" :
                (details.first_air_date || details.release_date || "").split("-")[0] + " | " + details.media_type.toUpperCase()}{details.origin_country ? " | " + details.origin_country.join(", ") : ""}
            </Typography>
            <Typography>
              {details.overview ? details.overview.slice(0, 70) + "..." : "No overview available."}
            </Typography>
          </CardContent>
          <CardActions style={{ flex: 1, display: "flex", flexDirection: "row-reverse", alignItems: "flex-end" }}>
            <Button size="small" onClick={onDetailsOpen}>More Info</Button>
            {
              isOnWatchlist ?
                <Button size="small" onClick={onRemove}>Remove From Watchlist</Button>
                : (details.media_type !== "person") ?
                  <Button size="small" onClick={onAdd}>Add To Watchlist</Button>
                  : null
            }
          </CardActions>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <CardContent style={{ flex: "auto" }}>
          <Typography variant="subtitle1">
            {details.name || details.title}
          </Typography>
          <ItemDetails details={details} />
        </CardContent>
        <CardActions style={{ flex: "auto", display: "flex", flexDirection: "row-reverse", alignItems: "flex-end" }}>
          <Button size="small" onClick={onDetailsClose}>Back</Button>
        </CardActions>
      </div>
    );
  }

  function fetchMoreDetails() {
    const { id, media_type } = details;
    return fetch(`/api/id/${languageCode}/${media_type}/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.id) {
          setDetails({ ...details, ...data });
          setMoreDetailsFetched(true);
        } else {
          showError(data.status_message);
        }
      })
      .catch(err => showError("Error connecting with API"));
  }

  async function onDetailsOpen() {
    if (moreDetailsFetched) {
      // No hace faltar hacer nada
    } else {
      await fetchMoreDetails();
    }
    setDetailsOpen(true);
  }

  function onDetailsClose() {
    setDetailsOpen(false);
  }

  function onAdd() {
    const name = details.name || details.title;
    const { id } = details;
    addToWatchlist({ name: name, id: id });
  }

  function onRemove() {
    removeFromWatchlist(details.id);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);