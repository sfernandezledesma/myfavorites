import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

function ItemDetails({ details }) {
  console.log("ItemDetails rendered");
  
  if (details.media_type === "person") {
    return (
      <Fragment>
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
        <Typography>
          {(details.first_air_date || details.release_date || "").split("-")[0]}{" | " + details.media_type.toUpperCase() + (details.runtime ? " | " + details.runtime + " mins" : "")}
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

export default ItemDetails;