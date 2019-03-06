import React, { Component } from 'react';
import { AppContext } from "./AppContext";
import Search from './Search';
import ErrorDialog from '../components/ErrorDialog';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeLanguage: this.changeLanguage,
      showError: this.showError,
      languageCode: "en",
      errorOpen: false,
      errorDescription: ""
    };
  }

  changeLanguage = (languageCode) => {
    this.setState({ languageCode: languageCode });
  };

  showError = (errorDescription) => {
    this.setState({ errorOpen: true, errorDescription: errorDescription });
  };

  onErrorClose = () => {
    this.setState({ errorOpen: false });
  }

  renderMainComponent = () => {
    return <Search />;
  };

  render() {
    const { errorOpen, errorDescription } = this.state;
    return (
      <AppContext.Provider value={this.state}>
        {this.renderMainComponent()}
        <ErrorDialog
          errorOpen={errorOpen}
          errorDescription={errorDescription}
          onErrorClose={this.onErrorClose}
        />
      </AppContext.Provider>
    );
  }
}

export default App;
