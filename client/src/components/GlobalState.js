import React, { useReducer, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, AppDispatch, AppWatchlist, AppWatchlistDispatch } from "../contexts";
import { globalReducer, watchlistReducer } from '../reducers';
import { includes } from "../utils";

export default function GlobalState(props) {
  const [state, dispatch] = useReducer(globalReducer, {
    loginStatus: "loggedOut",
    name: "",
    languageCode: window.localStorage.getItem("languageCode") || "en",
    errorOpen: false,
    errorDescription: ""
  });
  const [watchlist, watchlistDispatch] = useWatchlist();
  console.log("GlobalState rendered");

  return (
    <BrowserRouter>
      <AppDispatch.Provider value={dispatch}>
        <AppContext.Provider value={state}>
          <AppWatchlistDispatch.Provider value={watchlistDispatch}>
            <AppWatchlist.Provider value={watchlist}>
              {props.children}
            </AppWatchlist.Provider>
          </AppWatchlistDispatch.Provider>
        </AppContext.Provider>
      </AppDispatch.Provider>
    </BrowserRouter >
  );

  function useWatchlist() {
    const [watchlist, watchlistDispatch] = useReducer(watchlistReducer, {
      list: [],
      includes: includes
    });

    useEffect(() => { // Descarga la watchlist al logearse y la borra al salir
      if (state.loginStatus === "loggedIn") {
        fetch("/api/watchlist/get")
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log("Watchlist fetched:", data.watchlist);
              watchlistDispatch({ type: "setList", list: data.watchlist });
            }
          });
      } else if (state.loginStatus === "loggingOut") {
        console.log("Limpiando busqueda y watchlist de usuario...");
        watchlistDispatch({ type: "setList", list: [] });
      }
    }, [state.loginStatus]);

    return [watchlist, watchlistDispatch];
  }
}