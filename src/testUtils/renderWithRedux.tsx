import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { render } from "@testing-library/react";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas/rootSaga";
import { rootReducer, Store } from "../store";

// This returns a component that wraps any children components (passed through
// their JSX syntax)  whith the  Provider  component while instiating its  own
// store with  an initial  state if passed. This allows  us to easily  specify
// the iniital state of the store  for our tests. The store reference  is also
// returned as part of this method so the tests suites can trigger any actions
// on it and the tests can work as expected.
export const renderWithRedux = (
  Component: JSX.Element,
  initialState?: Partial<Store>
) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState || {},
    applyMiddleware(sagaMiddleware)
  );
  // we need to run the saga for our store, otherwise the dispatched
  // actions won't be heard by the sagas!!
  sagaMiddleware.run(rootSaga);
  return { ...render(<Provider store={store}>{Component}</Provider>), store };
};
