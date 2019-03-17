export const initialLanguageCode = window.localStorage.getItem("languageCode");

export function includes(id) {
  for (let item of this.list) {
    if (item.id === id) {
      return true;
    }
  }
  return false;
}
