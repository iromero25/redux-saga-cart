import React from "react";
import CheckoutStatus from "./CheckoutStatus";
import { render, screen } from "@testing-library/react";
import { createReduxWrapper, mockFetchPromise } from "../utils";
import * as fetchers from "../api/fetchers";
import "@testing-library/jest-dom";

import { toggleCheckingOut } from "../actions";
import store from "../store";

jest.mock("../api/fetchers", () => ({
  validateUserCart: jest
    .fn()
    .mockImplementation(() => mockFetchPromise({ validated: true })),
  validateUserCreditCard: jest
    .fn()
    .mockImplementation(() => mockFetchPromise({ validated: true })),
  executeUserPurchase: jest
    .fn()
    .mockImplementation(() => mockFetchPromise({ success: true })),
}));

const Wrapper = createReduxWrapper(store);

describe("Checkout component", () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <CheckoutStatus />
      </Wrapper>
    );
  });

  test("display quantity verification message", async () => {
    store.dispatch(toggleCheckingOut(true));
    const { getByText } = screen;
    const initialCheckout = getByText("Verifying items are in stock...");
    expect(initialCheckout).toBeInTheDocument();
  });

  test("display card validation message", async () => {
    store.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const creditCardValidation = await findByText(/validating credit card/i);
    expect(creditCardValidation).toBeInTheDocument();
  });

  test("display finalizing purchase message", async () => {
    store.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const purchaseFinalization = await findByText(/finalizing purchase/i);
    expect(purchaseFinalization).toBeInTheDocument();
  });

  test("display checkout complete message", async () => {
    store.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const checkoutComplete = await findByText(/checkout is complete/i);
    expect(checkoutComplete).toBeInTheDocument();
  });

  test("display error message when there's not enough credit to buy items", async () => {
    jest
      .spyOn(fetchers, "executeUserPurchase")
      .mockImplementation(() => mockFetchPromise({ success: false }));
    store.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const errorMessage = await findByText(
      /funds on your credit card were insufficient/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
