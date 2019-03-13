import React, { Fragment, useContext, useState, useEffect } from 'react';
import ItemList from "./ItemList";
import SearchTopBar from './SearchTopBar';
import { AppContext, AppDispatch, AppWatchlist, AppWatchlistDispatch } from '../contexts';

function Search(props) {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const watchlist = useContext(AppWatchlist);
  const watchlistDispatch = useContext(AppWatchlistDispatch);
  const [lastSearch, setLastSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("/watchlist/get")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log("Watchlist fetched:", data.watchlist);
        watchlistDispatch({type: "setList", list: data.watchlist});
      }
    });
  },[]);

  useEffect(() => {
    console.log("Watchlist:", watchlist);
  }, [watchlist]);

  useEffect(() => {
    if (lastSearch) {
      onSearch(lastSearch);
    }
  }, [context.languageCode]);

  function onSearch(searchTerm) {
    if (true) {
      fetch(`/api/search/${context.languageCode}/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.page) {
            setLastSearch(searchTerm);
            setSearchResults(data.results);
          } else {
            dispatch({ type: "showError", errorDescription: data.status_message});
          }
        })
        .catch(err => dispatch({ type: "showError", errorDescription: "Error connecting with API" }));
    }
  }

  console.log("Search Component rendered");
  return (
    <Fragment>
      <SearchTopBar onSearch={onSearch} />
      <ItemList items={searchResults} />
    </Fragment>
  );
}

export default Search;