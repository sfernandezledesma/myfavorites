import React from 'react';
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import ItemWatchlist from '../components/ItemWatchlist';

const mapStateToProps = state => {
  return {
    myWatchlist: state.watchlistReducer
  };
};

function Watchlist({ watchlist, filter, isMine, myWatchlist }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List style={{ width: "100%", maxWidth: "640px" }}>
        {
          watchlist.filter((item) => item.name.toLowerCase().includes(filter)).map((item) => (
            <ItemWatchlist
              key={item.id}
              id={item.id}
              name={item.name}
              onMyWatchlist={isMine ? true : myWatchlist.includes(item.id)}
            />
          ))
        }
      </List>
    </div>
  );
}

export default connect(mapStateToProps)(Watchlist);