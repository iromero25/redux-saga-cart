import store from "../store";
import React from "react";
import { Provider } from "react-redux";
// import MainContainer from "../components/main";
import MainDisplay from "./main/MainDisplay";

export const App: React.FC = () => (
  <Provider store={store}>
    <MainDisplay />
    {/* <MainDisplay isCheckingOut={false} /> */}
  </Provider>
);
