import React from 'react';
import { connect } from 'react-redux';
//import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import TopBar from "../components/TopBar";

import { setSearchField } from "../actions";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  };
};

class App extends React.Component {
  render() {
    const { searchField, onSearchChange } = this.props;
    return (
      <div>
        <TopBar onSearchChange={onSearchChange} />
        <Button variant="contained" color="primary">
          {searchField}
        </Button>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
