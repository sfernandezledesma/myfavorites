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
      <Grid container justify="center" spacing={spacing} style={{ width: "100%", padding: "1%" }}>
        {items.map((item, index) => (
          <Grid item key={index} sm={12} md={6} lg={4}>
            <Card style={{ display: "flex" }}>
              <CardMedia
                style={{ width: 200, height: 300 }}
                image={item.Poster}
                title={item.Title}
              />
              <div>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.Title}
                  </Typography>
                  <Typography>
                    {item.Year}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => onDetailsOpen(item)} >
                    View
                </Button>
                  <Button size="small">
                    Edit
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