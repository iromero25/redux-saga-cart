import React from "react";
import CheckoutStatus from "./CheckoutStatus";
import { screen } from "@testing-library/react";
import { toggleCheckingOut } from "../actions";
import "@testing-library/jest-dom";

// the import order of these modules is importat for the mockApis to work
import { storeMock } from "../store/mockData";
import { mockAPIs } from "../testUtils/mockAPIs";
import { mockFetchPromise, renderWithRedux } from "../testUtils";
import { CreatedStore } from "../store";
import * as fetchers from "../api/fetchers";

// Important: I cannot provide a reference to the `mockAPIs`  function as second
// parameter of the mock e.g.: `jest.mock("../api/fetchers", mockAPIs)` since it
// won't work. I need to specify it as an arrow function like this:
jest.mock("../api/fetchers", () => mockAPIs());

describe("Checkout component", () => {
  let myStore: CreatedStore;
  beforeEach(() => {
    const { store } = renderWithRedux(<CheckoutStatus />, storeMock);
    myStore = store;
  });

  test("display quantity verification message", async () => {
    // using the store object from the store module to dispatch actions works as
    // expected (even if the store is created  by `renderWithRedux`). I  believe
    // this due to the fact that there's always only one store handled by Redux.
    myStore.dispatch(toggleCheckingOut(true));
    const { getByText } = screen;
    const initialCheckout = getByText("Verifying items are in stock...");
    expect(initialCheckout).toBeInTheDocument();
  });

  test("display card validation message", async () => {
    myStore.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const creditCardValidation = await findByText(/validating credit card/i);
    expect(creditCardValidation).toBeInTheDocument();
  });

  test("display finalizing purchase message", async () => {
    myStore.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const purchaseFinalization = await findByText(/finalizing purchase/i);
    expect(purchaseFinalization).toBeInTheDocument();
  });

  test("display checkout complete message", async () => {
    myStore.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const checkoutComplete = await findByText(/checkout is complete/i);
    expect(checkoutComplete).toBeInTheDocument();
  });

  test("display error message when there's not enough credit to buy items", async () => {
    // see how we can override a previously mocked API like this:
    jest
      .spyOn(fetchers, "executeUserPurchase")
      .mockImplementation(() => mockFetchPromise({ success: false }));
    myStore.dispatch(toggleCheckingOut(true));
    const { findByText } = screen;
    const errorMessage = await findByText(
      /funds on your credit card were insufficient/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
