import React from 'react';
import './App.css';
import TopBar from "../components/TopBar";
import ItemList from "./ItemList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: ""
    };
  }

  onSearch = () => {
    fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=${this.state.searchField}`)
    .then(response => response.json())
    .then(data => console.log(data));
  }

  onType = (event) => {
    this.setState({searchField: event.target.value});
  }

  render() {
    return (
      <div>
        <TopBar onSearch={this.onSearch} onType={this.onType} />
        <ItemList />
      </div>
    );
  }
}

export default App;
