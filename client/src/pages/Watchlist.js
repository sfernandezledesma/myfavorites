import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import InputTopBar from '../components/InputTopBar';
import { List, Typography } from '@material-ui/core';
import ItemWatchlist from '../components/ItemWatchlist';

const mapStateToProps = state => {
  return { watchlist: state.watchlistReducer.list };
};

function Watchlist({ watchlist }) {
  const [filter, setFilter] = useState("");

  return (
    <Fragment>
      <InputTopBar onSubmit={onFilter} placeholder="Filter..." />
      <Typography variant="h5" align="center">Your Watchlist</Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List style={{ width: "100%", maxWidth: "640px" }}>
          {
            watchlist.filter((item) => item.name.toLowerCase().includes(filter)).map((item) => (
              <ItemWatchlist key={item.id} id={item.id} name={item.name} />
            ))
          }
        </List>
      </div>
    </Fragment>
  );

  function onFilter(term) {
    setFilter(term.toLowerCase());
  }
}

export default connect(mapStateToProps)(Watchlist);