import { ERROR_CLOSE, ERROR_SHOW } from "../reducers/errorReducer";

export function showError(message) {
  return { type: ERROR_SHOW, message: message };
}

export function closeError() {
  return { type: ERROR_CLOSE };
}