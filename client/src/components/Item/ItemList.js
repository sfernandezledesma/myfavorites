import React from 'react';
import { Grid, Card } from "@material-ui/core";
import Item from "./Item";
import { connect } from 'react-redux';
import {createReactKeyFromMediaId} from '../../utils';

const mapStateToProps = state => {
  return {
    watchlist: state.watchlistReducer
  };
};

function ItemList({ items, watchlist }) {
  console.log("ItemList rendered");
  return (
    <Grid container justify="center" spacing={16} style={{ width: "100%", margin: 0, padding: "1%" }}>
      {items.map((item, index) => (
        <Grid item key={createReactKeyFromMediaId(item.id)} sm={6} md={4} lg={4} style={{ flex: "auto" }}>
          <Card style={{ display: "flex" }}>
            <Item 
            basicInfo={item}
            isOnWatchlist={watchlist.includes(item.id)}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default connect(mapStateToProps)(ItemList);