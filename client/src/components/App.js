import React, { Component, Fragment } from 'react';
import { AppContext } from "./AppContext";
import Search from './Search';
import ErrorDialog from './ErrorDialog';
import SignIn from './SignIn';
import TopBar from './TopBar';
import Register from './Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "firstTime",
      loggedIn: false,
      username: "",
      changeLanguage: this.changeLanguage,
      showError: this.showError,
      languageCode: "en",
      errorOpen: false,
      errorDescription: ""
    };
  }

  changeRoute = (newRoute) => {
    this.setState({route: newRoute}, () => console.log("Changed route to", newRoute));
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
          this.login(data.username);
        }
      });
  };

  login = (username) => {
    this.setState({loggedIn: true, route: "search", username: username});
  }

  handleRegister = (event) => {
    event.preventDefault();
    const body = { 
      username: event.target.username.value,
      email: event.target.email.value, 
      password: event.target.password.value };
    fetch("/register", {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.login(data.username);
        }
      });
  };

  renderMainComponent = () => {
    const { route } = this.state;
    switch (route) {
      case "firstTime": {
        fetch("/getmein")
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              this.setState({ route: "search", loggedIn: true, username: data.username });
            } else {
              this.setState({ route: "signin", });
            }
          });
        return null;
      }
      case "search": {
        return <Search />;
      }
      case "register": {
        return (
          <Fragment>
            <TopBar />
            <Register handleRegister={this.handleRegister} />
          </Fragment>
        );
      }
      case "signin":
      default: {
        return (
          <Fragment>
            <TopBar />
            <SignIn handleSignInSubmit={this.handleSignInSubmit} changeRoute={this.changeRoute} />
          </Fragment>
        );
      }
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
