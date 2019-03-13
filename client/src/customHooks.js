import { useReducer } from 'react';
import { watchlistReducer } from './reducers';

export function useWatchlist() {
  const [watchlist, watchlistDispatch] = useReducer(watchlistReducer, {
    list: [],
    includes: includes
  });

  function includes(id) {
    for (let item of this.list) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  return [watchlist, watchlistDispatch];
}