import React from "react";
import { Provider } from "react-redux";
import { CreatedStore } from "../store";

// export const ReduxWrapper: React.FC = ({ children }) => (
//   <Provider store={store}>{children}</Provider>
// );

// Note how this function returns a Redux Component that wraps any childen
// components by the Redux Provider. Thus function expects the store that
// is to be used by the wrapper as parameter.
export const createReduxWrapper =
  (store: CreatedStore): React.FC =>
  ({ children }) =>
    <Provider store={store}>{children}</Provider>;
