import React from 'react';
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import ItemWatchlist from './Item/ItemWatchlist';
import { createReactKeyFromMediaId, listIncludesMediaID } from '../utils';

const mapStateToProps = state => ({ myWatchlist: state.watchlistReducer });
export default connect(mapStateToProps)(Watchlist);

function Watchlist({ watchlist, filter, isMine, myWatchlist }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <List style={{ width: "100%", maxWidth: "640px" }}>
        {
          watchlist.filter((item) => item.name.toLowerCase().includes(filter)).map((item) => (
            <ItemWatchlist
              key={createReactKeyFromMediaId(item.id)}
              id={item.id}
              name={item.name}
              onMyWatchlist={isMine ? true : listIncludesMediaID(myWatchlist,item.id)}
            />
          ))
        }
      </List>
    </div>
  );
}