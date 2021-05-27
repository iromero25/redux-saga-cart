import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  cartItemsReducer,
  currentUserReducer,
  itemDetailsReducer,
} from "./reducers";
import logger from "redux-logger";
import rootSaga from "./sagas";

const emptyInitialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  cartItems: cartItemsReducer,
  itemDetails: itemDetailsReducer,
});

const store = createStore(
  rootReducer,
  emptyInitialState,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export type Store = ReturnType<typeof rootReducer>;
export default store;
