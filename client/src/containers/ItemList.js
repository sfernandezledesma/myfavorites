import React from 'react';
import { Grid, Card } from "@material-ui/core";
import Item from "./Item";

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
      <Grid container justify="center" spacing={spacing} style={{ width: "100%", margin: 0, padding: "1%" }}>
        {items.map((item, index) => (
          <Grid item key={String(index) + item.imdbID} sm={6} md={4} lg={4} style={{ flex: "auto" }}>
            <Card style={{ display: "flex" }}>
              <Item item={item} />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default ItemList;