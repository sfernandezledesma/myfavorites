import React, { Fragment, useState, useContext, useEffect, memo } from 'react';
import { AppContext, AppDispatch } from "../contexts";
import { CardMedia, CardContent, CardActions, Typography, Button } from "@material-ui/core";

const Item = memo(function Item(props) {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState({});
  const { watchlistDispatch, isOnWatchlist, item } = props;
  console.log("Item rendered");

  useEffect(() => {
    if (details.id) {
      console.log("Item details re-fetched");
      fetchDetails();
    }
  }, [context.languageCode]);

  if (!detailsOpen) {
    return (
      <Fragment>
        <CardMedia
          style={{ width: 200, height: 300, flex: 1 }}
          image={(item.poster_path || item.profile_path) ? "https://image.tmdb.org/t/p/w500" + (item.poster_path || item.profile_path) : "#"}
          title={item.name}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <CardContent style={{ flex: 9, overflow: "auto" }}>
            <Typography variant="subtitle1">
              {item.name || item.title}
            </Typography>
            <Typography>
              {item.media_type === "person" ? "PERSON" :
                (item.first_air_date || item.release_date || "").split("-")[0] + " | " + item.media_type.toUpperCase()}{item.origin_country ? " | " + item.origin_country.join(", ") : ""}
            </Typography>
            <Typography>
              {item.overview ? item.overview.slice(0, 70) + "..." : "No overview available."}
            </Typography>
          </CardContent>
          <CardActions style={{ flex: 1, display: "flex", flexDirection: "row-reverse", alignItems: "flex-end" }}>
            <Button size="small" onClick={onDetailsOpen}>More Info</Button>
            {
              isOnWatchlist
                ? <Button size="small" onClick={onRemove}>Remove</Button>
                : <Button size="small" onClick={onAdd}>Add</Button>
            }
          </CardActions>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <CardContent style={{ flex: "auto" }}>
          {renderDetailsCardContent()}
        </CardContent>
        <CardActions style={{ flex: "auto", display: "flex", flexDirection: "row-reverse", alignItems: "flex-end" }}>
          <Button size="small" onClick={onDetailsClose}>Back</Button>
        </CardActions>
      </div>
    );
  }

  function fetchDetails() {
    const { id, media_type } = props.item;
    return fetch(`/api/id/${context.languageCode}/${media_type}/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.id) {
          setDetails(data);
        } else {
          context.showError(data.status_message);
        }
      })
      .catch(err => dispatch({ type: "showError", errorDescription: "Error connecting with API" }));
  }

  async function onDetailsOpen() {
    const { id } = props.item;
    if (details.id === id) {
      // No hace faltar hacer nada
    } else {
      await fetchDetails();
    }
    setDetailsOpen(true);
  }

  function onDetailsClose() {
    setDetailsOpen(false);
  }

  function renderDetailsCardContent() {
    const { item } = props;
    if (item.media_type === "person") {
      return (
        <Fragment>
          <Typography variant="subtitle1">
            {details.name || ""}
          </Typography>
          <Typography>
            {details.birthday ? "Birthday: " + details.birthday : ""}
          </Typography>
          <Typography>
            {details.known_for_department ? "Known for: " + details.known_for_department : ""}
          </Typography>
          <Typography gutterBottom>
            {details.place_of_birth ? "Place of birth: " + details.place_of_birth : ""}
          </Typography>
          <Typography align="justify">
            {details.biography || ""}
          </Typography>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Typography variant="subtitle1">
            {details.name || details.title}
          </Typography>
          <Typography>
            {(details.first_air_date || details.release_date || "").split("-")[0]}{" | " + item.media_type.toUpperCase() + (details.runtime ? " | " + details.runtime + " mins" : "")}
          </Typography>
          <Typography>
            {details.genres ? details.genres.map(genre => genre.name).join(", ") : ""}
          </Typography>
          <Typography gutterBottom>
            {details.vote_average ? "TMDb Rating: " + details.vote_average + " | Votes: " + details.vote_count : ""}
          </Typography>
          <Typography align="justify">
            {details.overview || details.biography || ""}
          </Typography>
        </Fragment>
      );
    }
  }

  function onAdd() {
    const name = props.item.name || props.item.title;
    const { id } = props.item;
    const newItem = { name: name, id: id };
    fetch("/api/watchlist/add", {
      method: "post",
      body: JSON.stringify(newItem),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          watchlistDispatch({type: "add", item: newItem});
        } else {
          dispatch({ type: "showError", errorDescription: data.status_message });
        }
      })
      .catch(err => dispatch({ type: "showError", errorDescription: err.toString() }));
  }

  function onRemove() {
    const { id } = props.item;
    const body = { id: id };
    fetch("/api/watchlist/remove", {
      method: "post",
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          watchlistDispatch({type: "remove", id: id});
        } else {
          dispatch({ type: "showError", errorDescription: data.status_message });
        }
      })
      .catch(err => dispatch({ type: "showError", errorDescription: err.toString() }));
  }
});

export default Item;