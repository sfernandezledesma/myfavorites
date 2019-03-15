import React, { Fragment, useContext, useState, useEffect } from 'react';
import ItemList from "./ItemList";
import SearchTopBar from './SearchTopBar';
import { AppContext, AppDispatch, AppWatchlistDispatch } from '../contexts';

function Search(props) {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const watchlistDispatch = useContext(AppWatchlistDispatch);
  const [lastSearch, setLastSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (context.loginStatus === "loggedIn") {
      fetch("/api/watchlist/get")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("Watchlist fetched:", data.watchlist);
            watchlistDispatch({ type: "setList", list: data.watchlist });
          }
        });
    } else if (context.loginStatus === "loggedOut") {
      console.log("Limpiando busqueda y watchlist de usuario");
      setLastSearch("");
      setSearchResults([]);
      watchlistDispatch({ type: "setList", list: [] });
    }
  }, [context.loginStatus]);

  useEffect(() => {
    onSearch(props.match.params.query);
  }, [props.match.params.query]);

  useEffect(() => {
    if (lastSearch) {
      onSearch(lastSearch);
    }
  }, [context.languageCode]);

  function onSearch(searchTerm) {
    if (searchTerm) {
      fetch(`/api/search/${context.languageCode}/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.page) {
            const url = "/search/" + searchTerm;
            if (props.location.pathname !== url) { // Se buscó usando SearchTopBar, no por URL
              props.history.push(url);
            }
            setLastSearch(searchTerm);
            setSearchResults(data.results);
          } else {
            dispatch({ type: "showError", errorDescription: data.status_message });
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