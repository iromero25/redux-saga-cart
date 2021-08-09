import store from "../store";
import React from "react";
import { Provider } from "react-redux";
import MainDisplay from "./MainDisplay";

export const App: React.FC = () => (
  <Provider store={store}>
    <MainDisplay />
  </Provider>
);
