export function watchlistReducer(state, action) {
  switch (action.type) {
    case "setList": {
      return { ...state, list: action.list };
    }
    case "add": {
      return { ...state, list: [...state.list, action.item] };
    }
    case "remove": {
      return { ...state, list: state.list.filter((value) => (value.id !== action.id)) };
    }
    default: {
      return state;
    }
  }
}

export function globalReducer(state, action) {
  switch (action.type) {
    case "changeLanguage":
      return {
        ...state,
        languageCode: action.languageCode
      };
    case "showError":
      return {
        ...state,
        errorOpen: true,
        errorDescription: action.errorDescription
      };
    case "closeErrorDialog":
      return {
        ...state,
        errorOpen: false
      };
    case "login":
      return {
        ...state,
        loginStatus: "loggedIn",
        name: action.name
      };
    case "logout":
      return {
        ...state,
        loginStatus: "loggingOut"
      };
    case "loggedOut":
      return {
        ...state,
        loginStatus: "loggedOut",
        name: ""
      };
    default:
      return state;
  }
}