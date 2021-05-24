import store from "../store";
import React from "react";
import { Provider } from "react-redux";
// import MainContainer from "../components/main";
import MainDisplay from "./main/MainDisplay";
// import { getCurrentUserInfo } from "../actions";

export const App: React.FC = () => (
  <Provider store={store}>
    {/* <MainContainer /> */}
    <MainDisplay isCheckingOut={false} />
  </Provider>
);

// store.dispatch(getCurrentUserInfo("U10000"));
