import React, { Fragment, useState, useEffect, useCallback } from 'react';
import ItemList from "../components/Item/ItemList";
import InputTopBar from '../components/TopBar/InputTopBar';
import { connect } from 'react-redux';
import { showError } from '../actions/errorActions';
import { logout } from '../actions/loginActions';
import { Typography } from '@material-ui/core';

const mapStateToProps = (state) => {
  return {
    languageCode: state.languageReducer
  };
};
const mapDispatchToProps = { showError, logout };

function Search({ languageCode, showError, logout, match, history }) {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = match.params;
  console.log("Search Component rendered");

  useEffect(() => {
    if (query)
      search(query);
  }, [query, languageCode]);

  return (
    <Fragment>
      <InputTopBar onSubmit={useCallback(onSearch, [])} />
      {searchResults.length === 0 ?
        <Typography variant="h5" align="center">Search Movies, TV Shows, and People</Typography>
        : null
      }
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
          showError(data.status_message);
          if (data.status_message.toLowerCase().includes("token")) {
            logout();
          }
        }
      })
      .catch(err => showError("Error connecting with API"));
  }

  function onSearch(searchTerm) {
    if (searchTerm) {
      history.push("/search/" + searchTerm);
    } else {
      console.log("asd");
      showError("Ignorar este error");
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);