import React from "react";
import { storeMock } from "../../store/mockData";
import store from "../../store";
import CartItemList from "./CartItemList";
import { fireEvent, render, screen } from "@testing-library/react";
import { mockFetchPromise, createReduxWrapper } from "../../utils";
import { itemShipping } from "../../api/mockData";
import * as fetchers from "../../api/fetchers";

import "@testing-library/jest-dom";

const Wrapper = createReduxWrapper(store);

// Even though I am importing the `CartItemList` component, I am really
// testing `CartItem`. Testing it this way is easier since CartItemList
// hooks up Redux and passes the state down to CartItem.

jest.mock("../../store/initialStoreState", () => ({
  __esModule: true,
  default: {
    ...storeMock,
    cartItems: [{ ...storeMock.cartItems[0], quantity: 1 }],
  },
}));

beforeEach(() => {
  jest
    .spyOn(fetchers, "fetchShipping")
    .mockImplementation(() => mockFetchPromise(itemShipping));

  jest
    .spyOn(fetchers, "decreaseUserItem")
    .mockImplementation(() => mockFetchPromise({}));

  render(
    <Wrapper>
      <CartItemList />
    </Wrapper>
  );
});

test("A cart item with a quantity of one is rendered", () => {
  const { getByText } = screen;
  const quantityText = getByText(`Quantity: 1`);
  expect(quantityText).toBeInTheDocument();
});

test("Decrease button (-) is disabled when its quantity reaches zero", () => {
  const { getByText } = screen;
  const minusButton = getByText("-");
  fireEvent.click(minusButton);
  const zeroQuantityText = getByText(`Quantity: 0`);
  expect(zeroQuantityText).toBeInTheDocument();
  expect(getByText("-")).toBeDisabled();
});
