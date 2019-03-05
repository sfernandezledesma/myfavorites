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
    const { id, media_type } = this.props.item;
    if (this.state.info.id === id) {
      this.setState({ detailsOpen: true });
    } else {
      fetch(`/api/id/${media_type}/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.vote_count) {
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
            image={item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "#"}
            title={item.name}
          />
          <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <CardContent style={{ flex: "auto" }}>
              <Typography gutterBottom variant="h6" component="h2">
                {item.name || item.title}
              </Typography>
              <Typography>
                {(item.first_air_date || item.release_date || "").split("-")[0]} | {item.media_type.toUpperCase()}{item.origin_country ? " | " + item.origin_country.join(", ") : ""}
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
              {info.name || info.title}
            </Typography>
            <Typography variant="subtitle1">
              {(info.first_air_date || info.release_date || "").split("-")[0]} | {item.media_type.toUpperCase() + (info.runtime ? " | " + info.runtime + " mins": "")}
            </Typography>
            <Typography>
              {info.genres.map(genre => genre.name).join(", ")}
            </Typography>
            <Typography>
              TMDb Rating: {info.vote_average} | Votes: {info.vote_count}
            </Typography>
            <Typography>
              {info.overview || ""}
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