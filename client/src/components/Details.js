import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@material-ui/core";


class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        Title: "",
        Year: "",
        Genre: "",
        Plot: "",
        imdbRating: ""
      }
    };
  }

  fetchAllInfo = (imdbID) => {
    fetch(`/api/id/${imdbID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.Response === "True") {
          this.setState({ info: data });
        } else {
          this.setState({ errorMessage: data.Error });
        }
      });
  }

  render() {
    const { item, detailsOpen, onDetailsClose } = this.props;
    const { info } = this.state;
    return (
      <Dialog
        open={detailsOpen}
        onClose={onDetailsClose}
        onEnter={() => this.fetchAllInfo(item.imdbID)}
      >
        <DialogTitle>
          {info.Title}
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom variant="h6" component="h2">
            {info.Genre}
          </Typography>
          <Typography>
            {item.Year}
          </Typography>
          <Typography gutterBottom>
            {info.Plot}
          </Typography>
          <Typography>
            IMDb Rating: {info.imdbRating}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDetailsClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog >
    );
  }
};

export default Details;