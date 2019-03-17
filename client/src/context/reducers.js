export const
  WATCHLIST_SET = "WATCHLIST_SET",
  WATCHLIST_ADD = "WATCHLIST_ADD",
  WATCHLIST_REMOVE = "WATCHLIST_REMOVE",
  ERROR_SHOW = "ERROR_SHOW",
  ERROR_CLOSE = "ERROR_CLOSE",
  LOGIN_ACTION_LOGIN = "LOGIN_ACTION_LOGIN",
  LOGIN_ACTION_LOGOUT = "LOGIN_ACTION_LOGOUT",
  LOGIN_STATUS_FIRST_TIME = "LOGIN_STATUS_FIRST_TIME",
  LOGIN_STATUS_LOGGEDIN = "LOGIN_STATUS_LOGGEDIN",
  LOGIN_STATUS_LOGGEDOUT = "LOGIN_STATUS_LOGGEDOUT";

export function watchlistReducer(state, action) {
  switch (action.type) {
    case WATCHLIST_SET: {
      return { ...state, list: action.list };
    }
    case WATCHLIST_ADD: {
      return { ...state, list: [...state.list, action.item] };
    }
    case WATCHLIST_REMOVE: {
      return { ...state, list: state.list.filter((value) => (value.id !== action.id)) };
    }
    default: {
      return state;
    }
  }
}

export function errorReducer(state, action) {
  switch (action.type) {
    case ERROR_SHOW:
      return {
        ...state,
        open: true,
        message: action.message
      };
    case ERROR_CLOSE:
      return {
        ...state,
        open: false
      };
    default: {
      return state;
    }
  }
}

export function loginReducer(state, action) {
  switch (action.type) {
    case LOGIN_ACTION_LOGIN:
      return {
        ...state,
        status: LOGIN_STATUS_LOGGEDIN,
        name: action.name
      };
    case LOGIN_ACTION_LOGOUT:
      return {
        ...state,
        status: LOGIN_STATUS_LOGGEDOUT
      };
    default: {
      return state;
    }
  }
}