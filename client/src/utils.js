export const initialLanguageCode = window.localStorage.getItem("languageCode") || "en";

export function equalsMediaID(id, otherID) {
  return id.media_type === otherID.media_type && id.media_tmdb_id === otherID.media_tmdb_id;
}

export function listIncludesMediaID(list, id) {
  for (let item of list) {
    if (equalsMediaID(item.id, id)) {
      return true;
    }
  }
  return false;
}

export function createReactKeyFromMediaId(id) {
  return id.media_type + "_" + id.media_tmdb_id;
}