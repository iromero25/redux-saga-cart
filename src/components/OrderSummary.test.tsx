import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import OrderSummary from "./OrderSummary";
import store from "../store";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";

const Wrapper: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

test("Order Summary is rendered with a loading spinner", () => {
  const { getByText, getByTitle } = render(
    <Wrapper>
      <OrderSummary />  
    </Wrapper>
  );
  const subtotalHeader = getByText("Subtotal");
  expect(subtotalHeader).toBeVisible();

  // get the spinner dom element by its tooltip
  const subtotalSpinner = getByTitle("calculating subtotal...");
  expect(subtotalSpinner).toBeVisible();
});
