import React, { Component, Fragment } from 'react';
import { AppContext } from "./AppContext";
import Search from './Search';
import ErrorDialog from '../components/ErrorDialog';
import SignIn from '../components/SignIn';
import TopBar from '../components/TopBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: true,
      loggedIn: false,
      username: "",
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

  handleSignInSubmit = (event) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value };
    fetch("/login", {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({ loggedIn: true, username: data.username });
        }
      });
  };

  renderMainComponent = () => {
    if (this.state.firstTime) {
      fetch("/getmein")
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.setState({ firstTime: false, loggedIn: true, username: data.username })
          } else {
            this.setState({ firstTime: false })
          }
        });
      return null;
    } else if (this.state.loggedIn) {
      return <Search />;
    } else {
      //return <Button style={{ textAlign: "center" }} onClick={this.login}>Log in</Button>;
      return (
        <Fragment>
          <TopBar />
          <SignIn handleSignInSubmit={this.handleSignInSubmit} />
        </Fragment>
      );
    }

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
