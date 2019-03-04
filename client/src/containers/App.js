import React from 'react';
import './App.css';
import TopBar from "../components/TopBar";
import ItemList from "./ItemList";
import { Typography } from '@material-ui/core';
import Details from '../components/Details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      searchField: "",
      searchResults: [],
      detailsOpen: false,
      item: {}
    };
  }

  onSearch = () => {
    fetch(`/api/searchmovies/?search=${this.state.searchField}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.Response === "True") {
          this.setState({ searchResults: data.Search });
        } else {
          this.setState({ errorMessage: data.Error });
        }
      });
  }

  onType = (event) => {
    this.setState({ searchField: event.target.value });
  }

  onDetailsOpen = (item) => {
    this.setState({ detailsOpen: true, item: item });
  }

  onDetailsClose = () => {
    this.setState({ detailsOpen: false });
  }

  renderResults = () => {
    if (this.state.errorMessage) {
      return <Typography variant="h5" align="center">Error: {this.state.errorMessage}</Typography>;
    } else {
      return <ItemList items={this.state.searchResults} onDetailsOpen={this.onDetailsOpen} />;
    }
  }

  render() {
    return (
      <div>
        <TopBar onSearch={this.onSearch} onType={this.onType} />
        < Details item={this.state.item} detailsOpen={this.state.detailsOpen} onDetailsClose={this.onDetailsClose} />
        {this.renderResults()}
      </div>
    );
  }
}

export default App;
