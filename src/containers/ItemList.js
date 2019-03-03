import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: 16
    };
  }

  render() {
    const { spacing } = this.state;
    const { items } = this.props;
    return (
      <Grid container justify="center" spacing={spacing} style={{ width: "100%", padding: "1%" }}>
        {items.map((item, index) => (
          <Grid item key={index} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                style={{ height: "200px" }}
                image={item.Poster}
                title={item.Title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.Title}
                </Typography>
                <Typography>
                  {item.Year}
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