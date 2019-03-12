import { useState } from 'react';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState({
    list: [],
    setList: setList,
    add: add,
    remove: remove,
    includes: includes
  });

  function setList(newList) {
    setWatchlist({ ...this, list: newList });
  }

  function add({ id, name }) {
    setWatchlist({ ...this, list: [...this.list, { id: id, name: name }] });
  }

  function remove(id) {
    setWatchlist({ ...this, list: this.list.filter((value) => (value.id !== id)) });
  }

  function includes(id) {
    for (let item of this.list) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  return watchlist;
}