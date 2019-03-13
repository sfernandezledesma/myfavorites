import React, { memo, useContext } from 'react';
import { Grid, Card } from "@material-ui/core";
import { AppWatchlist, AppWatchlistDispatch } from "../contexts";
import Item from "./Item";

const ItemList = memo(({ items }) => {
  const watchlist = useContext(AppWatchlist);
  const watchlistDispatch = useContext(AppWatchlistDispatch);
  console.log("ItemList rendered");
  return (
    <Grid container justify="center" spacing={16} style={{ width: "100%", margin: 0, padding: "1%" }}>
      {items.map((item, index) => (
        <Grid item key={item.id} sm={6} md={4} lg={4} style={{ flex: "auto" }}>
          <Card style={{ display: "flex" }}>
            <Item 
            item={item}
            watchlistDispatch={watchlistDispatch}
            isOnWatchlist={watchlist.includes(item.id)}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
});

export default ItemList;