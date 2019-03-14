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
    case "signin":
      return {
        ...state,
        signinOpen: action.signinOpen
      };
    case "changeRoute":
      return {
        ...state,
        route: action.route,
        signinOpen: false
      };
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
        signinOpen: false,
        loginStatus: "loggedIn",
        route: "search",
        name: action.name
      };
    case "logout":
      return {
        ...state,
        loginStatus: "loggingOut",
        route: "signin",
        name: ""
      };
    case "loggedOut":
      return {
        ...state,
        loginStatus: "loggedOut",
        signinOpen: true,
        name: ""
      };
    default:
      return state;
  }
}