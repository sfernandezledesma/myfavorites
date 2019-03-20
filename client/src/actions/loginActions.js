import { LOGIN_ACTION_LOGIN, LOGIN_ACTION_LOGOUT } from "../reducers/loginReducer";

export function login(name) {
  return { type: LOGIN_ACTION_LOGIN, name: name };
}

export function logout() {
  return { type: LOGIN_ACTION_LOGOUT };
}