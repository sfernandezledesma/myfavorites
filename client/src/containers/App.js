import React from 'react';
import './App.css';
import TopBar from "../components/TopBar";
import ItemList from "./ItemList";
import { Typography } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      searchField: "",
      searchResults: []
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

  renderResults = () => {
    if (this.state.errorMessage) {
      return <Typography  variant="h5" align="center">Error: {this.state.errorMessage}</Typography>;
    } else {
      return <ItemList items={this.state.searchResults} />;
    }
  }

  render() {
    return (
      <div>
        <TopBar onSearch={this.onSearch} onType={this.onType} />
        {this.renderResults()}
      </div>
    );
  }
}

export default App;
