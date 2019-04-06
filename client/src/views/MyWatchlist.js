import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import InputTopBar from '../components/TopBar/InputTopBar';
import { Typography } from '@material-ui/core';
import Watchlist from '../components/Watchlist';

const mapStateToProps = state => {
  return { watchlist: state.watchlistReducer };
};

function MyWatchlist({ watchlist }) {
  const [filter, setFilter] = useState("");

  return (
    <Fragment>
      <InputTopBar onSubmit={onFilter} placeholder="Filter..." />
      <Typography variant="h5" align="center">Your Watchlist</Typography>
      <Watchlist watchlist={watchlist} filter={filter} isMine={true} />
    </Fragment>
  );

  function onFilter(term) {
    setFilter(term.toLowerCase());
  }
}

export default connect(mapStateToProps)(MyWatchlist);