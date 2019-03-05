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
          if (data.id) {
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

  renderDetailsCardContent = () => {
    const { item } = this.props;
    const { info } = this.state;
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

  render() {
    const { item } = this.props;
    if (!this.state.detailsOpen) {
      return (
        <Fragment>
          <CardMedia
            style={{ width: 200, height: 300, flex: "1" }}
            image={(item.poster_path || item.profile_path) ? "https://image.tmdb.org/t/p/w500" + (item.poster_path || item.profile_path) : "#"}
            title={item.name}
          />
          <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
            <CardContent style={{ flex: "auto" }}>
              <Typography gutterBottom variant="h6" component="h2">
                {item.name || item.title}
              </Typography>
              <Typography>
                { item.media_type === "person" ? "PERSON" :
                  (item.first_air_date || item.release_date || "").split("-")[0]+" | "+item.media_type.toUpperCase()}{item.origin_country ? " | " + item.origin_country.join(", ") : ""}
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
            {this.renderDetailsCardContent()}
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