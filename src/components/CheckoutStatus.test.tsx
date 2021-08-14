import React from "react";
import CheckoutStatus from "./CheckoutStatus";
import { render, screen } from "@testing-library/react";
import { createReduxWrapper } from "../utils";
import { toggleCheckingOut } from "../actions";
import "@testing-library/jest-dom";

// the import order of these modules is importat for the mockApis to work
import { storeMock } from "../store/mockData";
import { mockAPIs, mockFetchPromise } from "../testUtils";
import store from "../store";
import * as fetchers from "../api/fetchers";

// Important: I cannot provide a reference to the `mockAPIs`  function as second
// parameter of the mock e.g.: `jest.mock("../api/fetchers", mockAPIs)` since it
// won't work. I need to specify it as an arrow function like this:
jest.mock("../api/fetchers", () => mockAPIs());

jest.mock("../store/initialStoreState", () => ({
  __esModule: true,
  default: storeMock,
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
    // see how we can override a previously mocked API like this:
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
