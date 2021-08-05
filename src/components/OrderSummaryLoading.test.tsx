import React from "react";
import OrderSummary from "./OrderSummary";
import { render } from "@testing-library/react";
import { createReduxWrapper } from "../utils/";
import store from "../store";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";

const Wrapper = createReduxWrapper(store);

test("Order Summary is initially rendered with loading spinners", () => {
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
