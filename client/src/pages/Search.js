import React, { Fragment, useContext, useState, useEffect, memo, useCallback } from 'react';
import ItemList from "../components/ItemList";
import SearchTopBar from '../components/SearchTopBar';
import { AppLoginDispatch, AppLanguage, AppErrorDispatch } from '../context/contexts';
import { ERROR_SHOW, LOGIN_ACTION_LOGOUT } from '../context/reducers';

function Search(props) {
  const languageCode = useContext(AppLanguage);
  const loginDispatch = useContext(AppLoginDispatch);
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
          errorDispatch({ type: ERROR_SHOW, message: data.status_message });
          if (data.status_message.toLowerCase().includes("token")) {
            loginDispatch({type: LOGIN_ACTION_LOGOUT});
          }
        }
      })
      .catch(err => errorDispatch({ type: ERROR_SHOW, message: "Error connecting with API" }));
  }

  function onSearch(searchTerm) {
    if (searchTerm) {
      props.history.push("/search/" + searchTerm);
    } else {
      errorDispatch({type: ERROR_SHOW, message: "Ignorar este error"});
    }
  }
}

export default memo(Search);