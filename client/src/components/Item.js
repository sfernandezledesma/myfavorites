import React, { Fragment, useState, useContext, useEffect, memo } from 'react';
import { AppContext, AppDispatch } from "./Contexts";
import { CardMedia, CardContent, CardActions, Typography, Button } from "@material-ui/core";

const Item = memo(function Item(props) {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (info.id) {
      console.log("Item info re-fetched");
      fetchDetails();
    }
  }, [context.languageCode]);

  function fetchDetails() {
    const { id, media_type } = props.item;
    return fetch(`/api/id/${context.languageCode}/${media_type}/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.id) {
          setInfo(data);
        } else {
          context.showError(data.status_message);
        }
      })
      .catch(err => dispatch({type: "showError", errorDescription: "Error connecting with API"}));
  }

  async function onDetailsOpen() {
    const { id } = props.item;
    if (info.id === id) {
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
            {info.name || ""}
          </Typography>
          <Typography>
            {info.birthday ? "Birthday: " + info.birthday : ""}
          </Typography>
          <Typography>
            {info.known_for_department ? "Known for: " + info.known_for_department : ""}
          </Typography>
          <Typography gutterBottom>
            {info.place_of_birth ? "Place of birth: " + info.place_of_birth : ""}
          </Typography>
          <Typography align="justify">
            {info.biography || ""}
          </Typography>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Typography variant="subtitle1">
            {info.name || info.title}
          </Typography>
          <Typography>
            {(info.first_air_date || info.release_date || "").split("-")[0]}{" | " + item.media_type.toUpperCase() + (info.runtime ? " | " + info.runtime + " mins" : "")}
          </Typography>
          <Typography>
            {info.genres ? info.genres.map(genre => genre.name).join(", ") : ""}
          </Typography>
          <Typography gutterBottom>
            {info.vote_average ? "TMDb Rating: " + info.vote_average + " | Votes: " + info.vote_count : ""}
          </Typography>
          <Typography align="justify">
            {info.overview || info.biography || ""}
          </Typography>
        </Fragment>
      );
    }
  }

  function onAdd() {
    dispatch({type: "showError", errorDescription: "Jeje!"});
  }

  console.log("Item rendered");
  const { item } = props;
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
            <Button size="small" onClick={onDetailsOpen}>
              More Info
              </Button>
            <Button size="small" onClick={onAdd}>
              Add
              </Button>
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
});

export default Item;