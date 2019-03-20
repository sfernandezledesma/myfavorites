import { LANGUAGE_SET } from "../reducers/languageReducer";

export function setLanguageCode(languageCode) {
  return {type: LANGUAGE_SET, languageCode: languageCode};
}