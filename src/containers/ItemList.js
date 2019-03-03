import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: 16
    };
  }

  render() {
    const { spacing } = this.state;
    return (
      <Grid container justify="center" spacing={spacing} style={{ width: "100%", padding: "1%" }}>
        {cards.map(card => (
          <Grid item key={card} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                style={{ height: "100px" }}
                image="https://www.google.com/logos/doodles/2019/desi-arnazs-102nd-birthday-5686409284288512-s.png" // eslint-disable-line max-len
                title="Image title"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Heading
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  View
                </Button>
                <Button size="small">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ItemList;