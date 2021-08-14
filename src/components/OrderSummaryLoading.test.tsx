import React from "react";
import OrderSummary from "./OrderSummary";
import { render, screen } from "@testing-library/react";
import { createReduxWrapper } from "../utils/";
import { user } from "../api/mockData";

import { mockAPIs } from "../testUtils";
import store from "../store";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";
import { setCurrentUser } from "../actions";

jest.mock("../api/fetchers", () => mockAPIs());

const Wrapper = createReduxWrapper(store);

beforeEach(() => {
  render(
    <Wrapper>
      <OrderSummary />
    </Wrapper>
  );
});

test("Order Summary is initially rendered with loading spinners", () => {
  const { getByText, getByTitle } = screen;
  const subtotalHeader = getByText("Subtotal");
  expect(subtotalHeader).toBeVisible();

  // get the spinner dom element by its tooltip
  const subtotalSpinner = getByTitle("calculating subtotal...");
  expect(subtotalSpinner).toBeVisible();
});

test("Checkout button is initially disabled", () => {
  const { getByText } = screen;
  const checkoutButton = getByText("Check Out");
  expect(checkoutButton).toBeDisabled();
});

// check out what I am doing here:
test("Checkout button remains disabled while fetching totals", async () => {
  const { getByText, getByTitle } = screen;

  // dispatch the setCurrentUser action with mock data, this is listened to
  // by the `fetchCartSaga` that will trigger all the logic to fetch the
  // items in a cart
  store.dispatch(setCurrentUser(user));

  // after that is dispatched, we immediately check what the "loading.." labels
  // be still present in the DOM as  the fetching takes  some time that's why I
  // use `getBy`: I don't want to wait for the DOM to be updated
  const subtotalSpinner = getByTitle("calculating subtotal...");
  expect(subtotalSpinner).toBeVisible();
  const checkoutButton = getByText("Check Out");
  expect(checkoutButton).toBeDisabled();
});

test("Checkout button finally gets enabled after the DOM finishes fetching", async () => {
  const { findByText } = screen;
  store.dispatch(setCurrentUser(user));
  // however, here I wait fot the DOM to be updated (hence using `findByText`)
  // to finally check that the Check out button is enabled
  const checkoutButton = await findByText("Check Out");
  expect(checkoutButton).not.toBeDisabled();
});
