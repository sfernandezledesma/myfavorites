import { createStore, combineReducers, applyMiddleware } from 'redux';
import { loginReducer, watchlistReducer, errorReducer, languageReducer } from './reducers';

const actionLogger = (store) => (next) => (action) => {
  console.log("Action:", action);
  next(action);
};

export const store = createStore(
  combineReducers({ loginReducer, watchlistReducer, errorReducer, languageReducer }),
  {},
  applyMiddleware(actionLogger)
);

store.subscribe(() => {
  console.log("State:", store.getState());
});