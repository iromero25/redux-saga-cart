import React from "react";
import OrderSummary from "./OrderSummary";
import { render, screen } from "@testing-library/react";
import { createReduxWrapper } from "../utils/";
import { mockAPIs, mockFetchPromise } from "../testUtils";
import { formatCurrency } from "../utils/formatCurrency";
import { increaseItemQuantity } from "../actions";
import * as fetchers from "../api/fetchers";

// remember the storeMock needs to be imported before the store module
import { storeMock } from "../store/mockData";
import store from "../store";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";

jest.mock("../api/fetchers", () => mockAPIs());

jest.mock("../store/initialStoreState", () => ({
  __esModule: true,
  default: storeMock,
}));

const Wrapper = createReduxWrapper(store);

const checkFiguresExist = async (
  price: number,
  shipping: number,
  currentQuantity: number
) => {
  const expectedSubtotal = price * currentQuantity;
  const expectedTax = (expectedSubtotal + shipping) * storeMock.taxRate;
  const expectedTotal = expectedSubtotal + shipping + expectedTax;

  const { findByText } = screen;

  const subtotalDom = await findByText(formatCurrency(expectedSubtotal));
  const shippingDom = await findByText(formatCurrency(shipping));
  const taxDom = await findByText(formatCurrency(expectedTax));
  const totalDom = await findByText(formatCurrency(expectedTotal));

  expect(subtotalDom).toBeInTheDocument();
  expect(shippingDom).toBeInTheDocument();
  expect(taxDom).toBeInTheDocument();
  expect(totalDom).toBeInTheDocument();
};

const cartItem = storeMock.cartItems[0];
const price = storeMock.itemDetails[0].usd;
const expectedShipping = storeMock.shippingCost;

let quantity = cartItem.quantity;

beforeEach(() => {
  // we need to render the component for each test suite so they work as expected
  // however, we need to thibk of the DOM as one through all tests; if the DOM is
  // modified in one of them, then the changes persist to the next one
  render(
    <Wrapper>
      <OrderSummary />
    </Wrapper>
  );
});

test("Show initial figures and updates them as quantity is incremented", async () => {
  await checkFiguresExist(price, expectedShipping, quantity);

  // the store needs to dispatch any actions we want to be processed
  // by redux otherwise the store is not affected

  // I decided to dispatch the action directly at the store so I can
  // keep this test scope limited to the OrderSummary component
  store.dispatch(increaseItemQuantity(cartItem.id));

  // once the increase item action is dispatched, we can check that
  // the figures had been updated accordingly. See how we increment
  // the quantity variable before passing it:
  await checkFiguresExist(price, expectedShipping, ++quantity);
});

test("Figures not changed when item is incremented over its current stock qty", async () => {
  // fail the increaseUserItem API request!!
  global.alert = jest.fn();
  const failingStatus = 500;
  jest
    .spyOn(fetchers, "increaseUserItem")
    .mockImplementation(() => mockFetchPromise({}, failingStatus));

  // the `quantity` variable reflects the correct item quantity we should
  // test as its value is updated by the previous test.
  await checkFiguresExist(price, expectedShipping, quantity);
  store.dispatch(increaseItemQuantity(cartItem.id));

  // check that the figures remain the same (for the same quantity) as
  // the increase iten quantity is expected to fail
  await checkFiguresExist(price, expectedShipping, quantity);
});
