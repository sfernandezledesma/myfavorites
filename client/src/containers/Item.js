import React, { Fragment } from 'react';
import { CardMedia, CardContent, CardActions, Typography, Button } from "@material-ui/core";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsOpen: false,
      info: {}
    };
  }

  onDetailsOpen = () => {
    const { imdbID } = this.props.item;
    if (this.state.info.imdbID === imdbID) {
      this.setState({ detailsOpen: true });
    } else {
      fetch(`/api/id/${imdbID}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (!data.Response) {
            //this.setState({ errorMessage: data });
          } else if (data.Response === "True") {
            this.setState({ info: data, detailsOpen: true/*, errorMessage: ""*/ });
          } else {
            //this.setState({ errorMessage: data.Error });
          }
        })
        .catch(err => this.setState({ errorMessage: err }));
    }
  }

  onDetailsClose = () => {
    this.setState({ detailsOpen: false });
  }

  render() {
    const { item } = this.props;
    const { info } = this.state;
    if (!this.state.detailsOpen) {
      return (
        <Fragment>
          <CardMedia
            style={{ width: 200, height: 300, flex: "1" }}
            image={item.Poster !== "N/A" ? item.Poster : "#"}
            title={item.Title}
          />
          <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <CardContent style={{ flex: "auto" }}>
              <Typography gutterBottom variant="h6" component="h2">
                {item.Title}
              </Typography>
              <Typography>
                {item.Year} | {item.Type.toUpperCase()}
              </Typography>
            </CardContent>
            <CardActions style={{ flex: "auto", display: "flex", flexDirection: "row-reverse", alignItems: "flex-end" }}>
              <Button size="small" onClick={this.onDetailsOpen}>
                More Info
              </Button>
            </CardActions>
          </div>
        </Fragment>
      );
    } else {
      return (
        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
          <CardContent style={{ flex: "auto" }}>
            <Typography variant="subtitle1">
              {info.Title}
            </Typography>
            <Typography variant="subtitle1">
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
            <Typography>
              IMDb Rating: {info.imdbRating}
            </Typography>
            <Typography>
              {info.Plot}
            </Typography>
          </CardContent>
          <CardActions style={{ flex: "auto", display: "flex", flexDirection: "row-reverse", alignItems: "flex-end" }}>
            <Button size="small" onClick={this.onDetailsClose}>Back</Button>
          </CardActions>
        </div>
      );
    }
  }
}

export default Item;