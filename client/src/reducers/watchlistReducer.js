import { includes } from "../utils";
export const
  WATCHLIST_SET = "WATCHLIST_SET",
  WATCHLIST_ADD = "WATCHLIST_ADD",
  WATCHLIST_REMOVE = "WATCHLIST_REMOVE";

export function watchlistReducer(state = { list: [], includes: includes }, action) {
  switch (action.type) {
    case WATCHLIST_SET: {
      return { ...state, list: action.list };
    }
    case WATCHLIST_ADD: {
      return { ...state, list: [...state.list, action.item] };
    }
    case WATCHLIST_REMOVE: {
      return { ...state, list: state.list.filter((value) => (value.id !== action.id)) };
    }
    default: {
      return state;
    }
  }
}
