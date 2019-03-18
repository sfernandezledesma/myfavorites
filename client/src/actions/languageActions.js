import { LANGUAGE_SET } from "../reducers";

export function setLanguageCode(languageCode) {
  return {type: LANGUAGE_SET, languageCode: languageCode};
}