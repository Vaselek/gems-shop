import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import usersReducer from "./reducers/usersReducer";
import {loadState, saveState} from "./localStorage";
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from '../axios-api';
import categoriesReducer from "./reducers/categoriesReducer";
import gemsReducer from "./reducers/gemsReducer";
import metalsReducer from "./reducers/metalsReducer";
import stonesReducer from "./reducers/stonesReducer";
import coatingsReducer from "./reducers/coatingsReducer";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  users: usersReducer,
  categories: categoriesReducer,
  gems: gemsReducer,
  metals: metalsReducer,
  coatings: coatingsReducer,
  stones: stonesReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

const user = {
  id: 1,
  email: 'admin@email.ru',
  username: 'Admin1',
  password: '$2b$10$NS5E4a0OLl.R1RALbXMztOiVh6rLZs5Uj3vC8RJVnK7sZljh2MJ4u',
  role: 'admin',
  token: 'mazjYGJSi_NtGvhA3HtmF',
  createdAt: '2020-01-13T08:40:04.348Z',
  updatedAt: '2020-01-14T11:05:17.033Z'
};

store.subscribe(() => {
  saveState({
    users: {
      // user: store.getState().users.user
      user: user
    }
  });
});

axios.interceptors.request.use(config => {
  try{
    config.headers['Authorization'] = "Bearer " + store.getState().users.user.token;
  } catch (e) {
    //
  }
  return config;
});

export default store;