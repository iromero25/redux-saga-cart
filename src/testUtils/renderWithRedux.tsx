import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { render } from "@testing-library/react";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas/rootSaga";
import { rootReducer, Store } from "../store";

// ToDo: explain this:
export const renderWithRedux = (
  Component: JSX.Element,
  initialStore?: Partial<Store>
) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialStore || {},
    applyMiddleware(sagaMiddleware)
  );
  // we need to run the saga for our store, otherwise the dispatched
  // actions won't be heard by the sagas!!
  sagaMiddleware.run(rootSaga);
  return { ...render(<Provider store={store}>{Component}</Provider>), store };
};
