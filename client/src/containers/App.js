import React, { Fragment } from 'react';
import './App.css';
import TopBar from "../components/TopBar";
import ItemList from "./ItemList";
import { Typography } from '@material-ui/core';
//import Details from '../components/Details';

const mockResults = [{ "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "imdbID": "tt0076759", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode V - The Empire Strikes Back", "Year": "1980", "imdbID": "tt0080684", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VI - Return of the Jedi", "Year": "1983", "imdbID": "tt0086190", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VII - The Force Awakens", "Year": "2015", "imdbID": "tt2488496", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode I - The Phantom Menace", "Year": "1999", "imdbID": "tt0120915", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode III - Revenge of the Sith", "Year": "2005", "imdbID": "tt0121766", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode II - Attack of the Clones", "Year": "2002", "imdbID": "tt0121765", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg" }, { "Title": "Star Trek", "Year": "2009", "imdbID": "tt0796366", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5NDQ5OTE4Ml5BMl5BanBnXkFtZTcwOTE3NDIzMw@@._V1_SX300.jpg" }, { "Title": "Rogue One: A Star Wars Story", "Year": "2016", "imdbID": "tt3748528", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VIII - The Last Jedi", "Year": "2017", "imdbID": "tt2527336", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg" }];
//const mockResults = [{ "Title": "The Blue Umbrella", "Year": "2013", "imdbID": "tt2616880", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMTUxMDczNTI3OF5BMl5BanBnXkFtZTcwNjY3MTExOQ@@._V1_SX300.jpg" }, { "Title": "The Umbrella Coup", "Year": "1980", "imdbID": "tt0080565", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZTM0NGIzOTQtYjU0Ni00N2E0LTgzMGItNGIzZTFkZmVkYzY1XkEyXkFqcGdeQXVyNjI5NTk0MzE@._V1_SX300.jpg" }, { "Title": "The Blue Umbrella", "Year": "2005", "imdbID": "tt0457802", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZGJiZTRlM2UtN2IyOC00Yzk1LWE5ZTktYWM3ZWEwYWZiMWI0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg" }, { "Title": "Resident Evil: The Umbrella Chronicles", "Year": "2007", "imdbID": "tt1087900", "Type": "game", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZmRkNWE2Y2YtYmMwOS00ZjYwLTljYjYtYjkxZmUwNmYyNTBkXkEyXkFqcGdeQXVyNTk1ODMyNjA@._V1_SX300.jpg" }, { "Title": "The Umbrella Man", "Year": "2011", "imdbID": "tt2120843", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BNmY5MzFhNzAtNmJkMi00YWM0LTg5ZjEtNWY3NTM4ZDc3MmJkXkEyXkFqcGdeQXVyMjM3ODA2NDQ@._V1_SX300.jpg" }, { "Title": "Ten Ladies in One Umbrella", "Year": "1903", "imdbID": "tt0223884", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BY2Y5MzgwN2ItZTVkYS00OWFiLWI1NGItMjhmNDcwMmU3ZWY2XkEyXkFqcGdeQXVyNTI2NTY2MDI@._V1_SX300.jpg" }, { "Title": "The Umbrella Factory", "Year": "2013", "imdbID": "tt3062878", "Type": "movie", "Poster": "https://ia.media-imdb.com/images/M/MV5BMTQ0NTU4OTQ2OF5BMl5BanBnXkFtZTgwNzE5OTAwMDE@._V1_SX300.jpg" }, { "Title": "Rihanna Feat. Jay Z: Umbrella", "Year": "2007", "imdbID": "tt6667916", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZDdjMmI0NzYtNGI5Ny00YThhLTg4ZWEtOTVkNDM1ZWRkMTc4XkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_SX300.jpg" }, { "Title": "St. Peter's Umbrella", "Year": "1958", "imdbID": "tt0052263", "Type": "movie", "Poster": "N/A" }, { "Title": "An Umbrella for Two", "Year": "1999", "imdbID": "tt1641614", "Type": "movie", "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDI5YTA3NWQtZTE5YS00NzRjLTliNDMtZWQ4ZWU0ZmRiNzM1XkEyXkFqcGdeQXVyMTAyNTQ0MTk@._V1_SX300.jpg" }];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      searchField: "",
      searchResults: mockResults,
    };
  }

  onSearch = () => {
    fetch(`/api/searchmovies/${this.state.searchField}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.Response) {
          this.setState({ errorMessage: data });
        } else if (data.Response === "True") {
          this.setState({ searchResults: data.Search, errorMessage: "" });
        } else {
          this.setState({ errorMessage: data.Error });
        }
      })
      .catch(err => this.setState({ errorMessage: err }));
  }

  onType = (event) => {
    this.setState({ searchField: event.target.value });
  }

  renderResults = () => {
    const { searchResults } = this.state
    if (this.state.errorMessage) {
      return <Typography variant="h5" align="center">Error: {this.state.errorMessage}</Typography>;
    } else {
      return <ItemList items={searchResults} />;
    }
  }

  render() {
    return (
      <Fragment>
        <TopBar onSearch={this.onSearch} onType={this.onType} />
        {/* <Details info={this.state.info} detailsOpen={this.state.detailsOpen} onDetailsClose={this.onDetailsClose} /> */}
        {this.renderResults()}
      </Fragment>
    );
  }
}

export default App;
