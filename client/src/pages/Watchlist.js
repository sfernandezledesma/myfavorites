import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InputTopBar from '../components/InputTopBar';
import { List, ListItem, Typography } from '@material-ui/core';

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
      <List>
        {
          watchlist.filter((item) => item.name.toLowerCase().includes(filter)).map((item) => (
            <ItemWatchlist key={item.id} id={item.id} name={item.name} />
          ))
        }
      </List>
    </Fragment>
  );

  function onFilter(term) {
    setFilter(term.toLowerCase());
  }
}

export default connect(mapStateToProps)(Watchlist);