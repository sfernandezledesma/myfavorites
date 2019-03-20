import { WATCHLIST_SET, WATCHLIST_ADD, WATCHLIST_REMOVE } from "../reducers/watchlistReducer";

export function setWatchlist(list) {
  return { type: WATCHLIST_SET, list: list};
}

export function addToWatchlist(item) {
  return { type: WATCHLIST_ADD, item: item};
}

export function removeFromWatchlist(id) {
  return { type: WATCHLIST_REMOVE, id: id};
}