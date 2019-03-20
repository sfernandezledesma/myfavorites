export const
  LOGIN_ACTION_LOGIN = "LOGIN_ACTION_LOGIN",
  LOGIN_ACTION_LOGOUT = "LOGIN_ACTION_LOGOUT",
  LOGIN_STATUS_FIRST_TIME = "LOGIN_STATUS_FIRST_TIME",
  LOGIN_STATUS_LOGGEDIN = "LOGIN_STATUS_LOGGEDIN",
  LOGIN_STATUS_LOGGEDOUT = "LOGIN_STATUS_LOGGEDOUT";

export function loginReducer(state = { status: LOGIN_STATUS_FIRST_TIME, name: "" }, action) {
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
        status: LOGIN_STATUS_LOGGEDOUT,
        name: ""
      };
    default: {
      return state;
    }
  }
}