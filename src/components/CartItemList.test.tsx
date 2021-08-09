import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CartItemList from "./CartItemList";
// remember we need to import the action from the  file where it is being  declared
// (and not from the `index.ts` file) if we want to spy/mock the function correctly
import * as increaseItemAction from "../actions/increaseItemQuantity";
import * as decreaseItemAction from "../actions/decreaseItemQuantity";
import "@testing-library/jest-dom";

// order does matter here: it  seems the  `storeMock` that is used to  mock  the
// `initialStoreState` needs to be imported before the ES module defining `store`
// since the store depends on whatever is defined in `initialStoreState`
import { storeMock } from "../store/mockData";
import store from "../store";
import { mockFetchPromise, createReduxWrapper } from "../utils";
import { cart, itemShipping } from "../api/mockData";

// This is the way to mock an ES module that is exported as default: we need
// to specify the `__esModule` attribute to true otherwise it won't work.

// By mocking the `initialStoreState` module we can be sure the store is initialised
// with the mocked data. This is a  better route than trying to  pass a  state to  a
// function that initializes the store, as that didn't work as expected.
jest.mock("../store/initialStoreState", () => ({
  __esModule: true,
  default: storeMock,
}));

jest.mock("../api/fetchers", () => {
  const mockFn = jest.fn().mockImplementation;
  const failStatus = 500;
  return {
    // the default behaviour of this function is to fail, it will only
    // succeed the first time that it is invoked:
    increaseUserItem: jest
      .fn(() => mockFetchPromise(storeMock.cartItems, failStatus)) // we send a fail status
      .mockImplementationOnce(() => mockFetchPromise(cart.items)),
    decreaseUserItem: mockFn(() => mockFetchPromise(cart.items)),
    fetchShipping: mockFn(() => mockFetchPromise(itemShipping)),
  };
});

describe("Test Cart Item List", () => {
  const ReduxWrapper = createReduxWrapper(store);

  beforeEach(() => {
    render(
      <ReduxWrapper>
        <CartItemList />
      </ReduxWrapper>
    );
  });

  const decreaseItemQtySpy = jest.spyOn(decreaseItemAction, "decreaseItemQuantity");

  test("A cart item with a quantity is rendered", () => {
    const { getByText } = screen;
    const quantityText = getByText(`Quantity: ${storeMock.cartItems[0].quantity}`);
    expect(quantityText).toBeInTheDocument();
  });

  // this test is interesting:
  test("Increment button is disabled after it's been clicked", async () => {
    const increaseItemQtySpy = jest.spyOn(
      increaseItemAction,
      "increaseItemQuantity"
    );
    const { getByText } = screen;
    const plusButton = getByText("+");
    expect(plusButton).toBeInTheDocument();

    // as the store is initialised with items, the plusButton should be enabled
    // at loading
    expect(plusButton).toBeEnabled();
    fireEvent.click(plusButton);
    expect(increaseItemQtySpy).toHaveBeenCalled();
    // immediately  after the '+' button is clicked, the button should be disabled,
    // note how I do not use `await  queryByText` since I DO NOT  want to wait  for
    // the dom to be updated as part of the sagas being triggered: I use `getByText`
    // to immediatly check that the element in the dom be disabled
    expect(getByText("+")).toBeDisabled();
  });

  test("Decrement button is disabled after it's been clicked", () => {
    const { getByText } = screen;
    const minusButton = getByText("-");
    expect(minusButton).toBeInTheDocument();
    fireEvent.click(minusButton);
    expect(decreaseItemQtySpy).toHaveBeenCalled();
    expect(getByText("-")).toBeDisabled();
  });

  // this is one way to test that incrementing the quantity of an item over its
  // actual existency in stock throws an error and reverts back to its original
  // quantity. The other way is to test the totals displayed at the DOM.
  test("DecreaseItemQty is triggered when increasing an item's quantity fails", async () => {
    // This test tries to increment an item's quantity. This time, the mocked
    // request fails and thus an alert is executed; we then have to mock it:
    global.alert = jest.fn();
    const { getByText } = screen;
    const plusButton = getByText("+");

    // IMPORTANT: need to wait for the DOM to  be completely updated after clicking
    // the '+' button as we want to  check  that  the spy/method had been triggered
    // after the request fails. Remember that as opposed to clicking the '-' button
    // where the spy is triggered right away, here we click  the  '+' button, fails
    // and as a consequence, the decrease function is triggered, so we want to wait
    // for all to be finished
    await fireEvent.click(plusButton);
    expect(decreaseItemQtySpy).toHaveBeenCalled();
  });
});
