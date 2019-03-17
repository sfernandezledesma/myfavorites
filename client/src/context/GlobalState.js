import React, { useReducer, useEffect, useState } from 'react';
import {
  AppLogin, AppLoginDispatch, AppWatchlist, AppWatchlistDispatch,
  AppLanguage, AppErrorDispatch, AppError, AppLanguageSet
} from "./contexts";
import {
  loginReducer, errorReducer, watchlistReducer,
  WATCHLIST_SET, LOGIN_STATUS_FIRST_TIME, LOGIN_STATUS_LOGGEDIN, LOGIN_STATUS_LOGGEDOUT
} from './reducers';
import { includes, initialLanguageCode } from "../utils";

export default function GlobalState(props) {
  const [loginState, loginDispatch] = useReducer(loginReducer, {
    status: LOGIN_STATUS_FIRST_TIME,
    name: ""
  });
  const [error, errorDispatch] = useReducer(errorReducer, {
    open: false,
    message: ""
  });
  const [watchlist, watchlistDispatch] = useWatchlist();
  const [languageCode, setLanguageCode] = useState(initialLanguageCode || "en");
  console.log("GlobalState rendered");

  return (

    <AppErrorDispatch.Provider value={errorDispatch}>
      <AppError.Provider value={error}>
        <AppLanguageSet.Provider value={setLanguageCode}>
          <AppLanguage.Provider value={languageCode}>
            <AppLoginDispatch.Provider value={loginDispatch}>
              <AppLogin.Provider value={loginState}>
                <AppWatchlistDispatch.Provider value={watchlistDispatch}>
                  <AppWatchlist.Provider value={watchlist}>
                    {props.children}
                  </AppWatchlist.Provider>
                </AppWatchlistDispatch.Provider>
              </AppLogin.Provider>
            </AppLoginDispatch.Provider>
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
      if (loginState.status === LOGIN_STATUS_LOGGEDIN) {
        fetch("/api/watchlist/get")
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              console.log("Watchlist fetched:", data.watchlist);
              watchlistDispatch({ type: WATCHLIST_SET, list: data.watchlist });
            }
          });
      } else if (loginState.status === LOGIN_STATUS_LOGGEDOUT) {
        console.log("Limpiando busqueda y watchlist de usuario...");
        watchlistDispatch({ type: WATCHLIST_SET, list: [] });
      }
    }, [loginState.status]);

    return [watchlist, watchlistDispatch];
  }
}