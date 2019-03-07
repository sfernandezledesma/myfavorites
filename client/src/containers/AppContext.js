import React from 'react';

export const AppContext = React.createContext({
  firstTime: true,
      loggedIn: false,
      username: "",
      languageCode: "en",
      errorOpen: false,
      errorDescription: ""
});