import { initialLanguageCode } from "../utils";
export const LANGUAGE_SET = "LANGUAGE_SET";

export function languageReducer(state = initialLanguageCode, action) {
  switch (action.type) {
    case LANGUAGE_SET: {
      return action.languageCode;
    }
    default: {
      return state;
    }
  }
}
