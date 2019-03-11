export function reducer(state, action) {
  switch (action.type) {
    case "changeRoute":
      return {
        ...state,
        route: action.route
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
        loggedIn: true,
        route: "search",
        username: action.username
      };
    default:
      return state;
  }
}