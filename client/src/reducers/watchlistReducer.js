import { includes, equalsMediaID } from "../utils";
export const
  WATCHLIST_SET = "WATCHLIST_SET",
  WATCHLIST_ADD = "WATCHLIST_ADD",
  WATCHLIST_REMOVE = "WATCHLIST_REMOVE";

export function watchlistReducer(state = [], action) {
  switch (action.type) {
    case WATCHLIST_SET: {
      return [...action.list];
    }
    case WATCHLIST_ADD: {
      return [...state, action.item];
    }
    case WATCHLIST_REMOVE: {
      return [...state.filter((item) => !equalsMediaID(item.id, action.id))];
    }
    default: {
      return state;
    }
  }
}
