import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  canCheckOutReducer,
  cartItemsReducer,
  currentUserReducer,
  itemDetailsReducer,
  itemQuantityFetchStatusReducer,
  shippingCostReducer,
  shippingFetchStatusReducer,
  taxRateReducer,
} from "../reducers";
import logger from "redux-logger";
import rootSaga from "../sagas/rootSaga";
import initialStoreState from "./initialStoreState";

const sagaMiddleware = createSagaMiddleware();
const middlewares =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  cartItems: cartItemsReducer,
  itemDetails: itemDetailsReducer,
  itemQuantityFetchStatus: itemQuantityFetchStatusReducer,
  shippingFetchStatus: shippingFetchStatusReducer,
  shippingCost: shippingCostReducer,
  taxRate: taxRateReducer,
  canCheckOut: canCheckOutReducer,
});

const store = createStore(
  rootReducer,
  initialStoreState,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export type CreatedStore = typeof store;
export type Store = ReturnType<typeof rootReducer>;
export default store;