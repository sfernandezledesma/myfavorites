import { WATCHLIST_SET, WATCHLIST_ADD, WATCHLIST_REMOVE } from "../reducers/watchlistReducer";
import { showError } from "./errorActions";

export function setWatchlistClient(list) { // Esto solo setea la watchlist en el cliente, no toca la DB
  return { type: WATCHLIST_SET, list: list };
}

export function addToWatchlist(item) {
  return dispatch => {
    fetch("/api/watchlist/add", {
      method: "post",
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          dispatch({ type: WATCHLIST_ADD, item: item });
        } else {
          dispatch(showError(data.status_message));
        }
      })
      .catch(err => dispatch(showError(err.toString())));
  };
}

export function removeFromWatchlist(id) {
  return dispatch => {
    const body = { id: id };
    fetch("/api/watchlist/remove", {
      method: "post",
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          dispatch({ type: WATCHLIST_REMOVE, id: id });
        } else {
          dispatch(showError(data.status_message));
        }
      })
      .catch(err => dispatch(showError(err.toString())));
  };
}