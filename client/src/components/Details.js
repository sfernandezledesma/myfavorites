import React, { Fragment } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";

const renderContents = (info) => {
  if (info.Title) {
    return (
      <Fragment>
        <DialogTitle>
          {info.Title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            {info.Year} | {info.Type.toUpperCase() + (info.Type === "movie" ? " | " + info.Runtime : "")} | {info.Country}
          </Typography>
          <Typography>
            {info.Genre}
          </Typography>
          <Typography>
            Directors: {info.Director}
          </Typography>
          <Typography>
            Writers: {info.Writer}
          </Typography>
          <Typography gutterBottom>
            Stars: {info.Actors}
          </Typography>
          <Typography paragraph variant="body1">
            {info.Plot}
          </Typography>
          <Typography>
            IMDb Rating: {info.imdbRating}
          </Typography>
        </DialogContent>
      </Fragment>
    );
  } else {
    return null;
  }
}

const Details = ({ info, detailsOpen, onDetailsClose }) => {
  return (
    <Dialog
      open={detailsOpen}
      onClose={onDetailsClose}
    >
      {renderContents(info)}
      <DialogActions>
        <Button onClick={onDetailsClose}>
          Close
          </Button>
      </DialogActions>
    </Dialog >
  );
};

export default Details;