import React, { Fragment, useContext, useState, useEffect } from 'react';
import ItemList from "./ItemList";
import SearchTopBar from './SearchTopBar';
import { AppContext, AppDispatch } from '../contexts';

function Search(props) {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatch);
  const [searchResults, setSearchResults] = useState([]);
  const { query } = props.match.params;
  
  useEffect(() => {
    if (query)
      search(query);
  }, [query, context.languageCode]);

  function search(searchTerm) {
    fetch(`/api/search/${context.languageCode}/${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.page) {
          setSearchResults(data.results);
        } else {
          dispatch({ type: "showError", errorDescription: data.status_message });
          if (data.status_message.toLowerCase().includes("token")) {
            dispatch({type: "logout"});
          }
        }
      })
      .catch(err => dispatch({ type: "showError", errorDescription: "Error connecting with API" }));
  }

  function onSearch(searchTerm) {
    if (searchTerm) {
      props.history.push("/search/" + searchTerm);
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