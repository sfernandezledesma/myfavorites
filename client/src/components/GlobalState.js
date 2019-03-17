import React, { useReducer, useEffect, useState } from 'react';

import {
  AppContext, AppDispatch, AppWatchlist, AppWatchlistDispatch,
  AppLanguage, AppErrorDispatch, AppError, AppLanguageSet
} from "../contexts";
import { globalReducer, errorReducer, watchlistReducer } from '../reducers';
import { includes, initialLanguageCode } from "../utils";

export default function GlobalState(props) {
  const [state, dispatch] = useReducer(globalReducer, {
    loginStatus: "loggedOut",
    name: ""
  });
  const [error, errorDispatch] = useReducer(errorReducer, {
    errorOpen: false,
    errorDescription: ""
  });
  const [watchlist, watchlistDispatch] = useWatchlist();
  const [languageCode, setLanguageCode] = useState(initialLanguageCode || "en");
  console.log("GlobalState rendered");

  return (
    
      <AppErrorDispatch.Provider value={errorDispatch}>
        <AppError.Provider value={error}>
          <AppLanguageSet.Provider value={setLanguageCode}>
            <AppLanguage.Provider value={languageCode}>
              <AppDispatch.Provider value={dispatch}>
                <AppContext.Provider value={state}>
                  <AppWatchlistDispatch.Provider value={watchlistDispatch}>
                    <AppWatchlist.Provider value={watchlist}>
                      {props.children}
                    </AppWatchlist.Provider>
                  </AppWatchlistDispatch.Provider>
                </AppContext.Provider>
              </AppDispatch.Provider>
            </AppLanguage.Provider>
          </AppLanguageSet.Provider>
        </AppError.Provider>
      </AppErrorDispatch.Provider>
    
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