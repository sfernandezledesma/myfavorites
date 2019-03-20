import { createStore, combineReducers, applyMiddleware } from 'redux';
import { loginReducer } from './reducers/loginReducer';
import { watchlistReducer } from './reducers/watchlistReducer';
import { errorReducer } from './reducers/errorReducer';
import { languageReducer } from './reducers/languageReducer';

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