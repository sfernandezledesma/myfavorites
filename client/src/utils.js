export const initialLanguageCode = window.localStorage.getItem("languageCode");

export function includes(id) {
  for (let item of this.list) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
}

export function getMediaTypeFromId(id) {
  const prefix = id[0];
  switch(prefix) {
    case "m":
      return "movie";
    case "t":
      return "tv";
    case "p":
      return "person";
    default:
      return "unknown";
  }
}