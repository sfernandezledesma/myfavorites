import React from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button } from "@material-ui/core";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: 16
    };
  }

  render() {
    const { spacing } = this.state;
    const { items, onDetailsOpen } = this.props;
    return (
      <Grid container justify="center" spacing={spacing} style={{ width: "100%", margin: 0, padding: "1%" }}>
        {items.map((item, index) => (
          <Grid item key={index} sm={6} md={4} lg={3}>
            <Card style={{ display: "flex" }}>
              <CardMedia
                style={{ width: 200, height: 300, flex: "1" }}
                image={item.Poster !== "N/A" ? item.Poster : "#"}
                title={item.Title}
              />
              <div style={{ flex: "1" }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.Title}
                  </Typography>
                  <Typography>
                  {item.Year} | {item.Type.toUpperCase()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => onDetailsOpen(item)} >
                    More Info
                </Button>
                </CardActions>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ItemList;