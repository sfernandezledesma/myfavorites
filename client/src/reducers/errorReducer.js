export const ERROR_SHOW = "ERROR_SHOW", ERROR_CLOSE = "ERROR_CLOSE";

export function errorReducer(state = { open: false, message: "" }, action) {
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
