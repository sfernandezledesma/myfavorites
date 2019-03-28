export const initialLanguageCode = window.localStorage.getItem("languageCode") || "en";

export function includes(id) {
  for (let item of this.list) {
    if (item.id.media_tmdb_id === id.media_tmdb_id && item.id.media_type === id.media_type) {
      return true;
    }
  }
  return false;
}

export function createReactKeyFromMediaId(id) {
  return id.media_type + "_" + id.media_tmdb_id;
}