import React, { Fragment, useContext, useState, useEffect, memo, useCallback } from 'react';
import ItemList from "./ItemList";
import SearchTopBar from './SearchTopBar';
import { AppDispatch, AppLanguage, AppErrorDispatch } from '../contexts';

function Search(props) {
  const languageCode = useContext(AppLanguage);
  const dispatch = useContext(AppDispatch);
  const errorDispatch = useContext(AppErrorDispatch);
  const [searchResults, setSearchResults] = useState([]);
  const { query } = props.match.params;
  console.log("Search Component rendered");
  
  useEffect(() => {
    if (query)
      search(query);
  }, [query, languageCode]);

  return (
    <Fragment>
      <SearchTopBar onSearch={useCallback(onSearch, [])} />
      <ItemList items={searchResults} />
    </Fragment>
  );

  function search(searchTerm) {
    fetch(`/api/search/${languageCode}/${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.page) {
          setSearchResults(data.results);
        } else {
          errorDispatch({ type: "showError", errorDescription: data.status_message });
          if (data.status_message.toLowerCase().includes("token")) {
            dispatch({type: "logout"});
          }
        }
      })
      .catch(err => errorDispatch({ type: "showError", errorDescription: "Error connecting with API" }));
  }

  function onSearch(searchTerm) {
    if (searchTerm) {
      props.history.push("/search/" + searchTerm);
    } else {
      errorDispatch({type: "showError", errorDescription: "Ignorar este error"});
    }
  }
}

export default memo(Search);