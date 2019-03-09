import React, { memo } from 'react';
import { Grid, Card } from "@material-ui/core";
import Item from "./Item";

const ItemList = memo(({ items }) => {
  return (
    <Grid container justify="center" spacing={16} style={{ width: "100%", margin: 0, padding: "1%" }}>
      {items.map((item, index) => (
        <Grid item key={item.id} sm={6} md={4} lg={4} style={{ flex: "auto" }}>
          <Card style={{ display: "flex" }}>
            <Item item={item} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default ItemList;