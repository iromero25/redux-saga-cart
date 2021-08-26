import React from "react";
import OrderSummary from "./OrderSummary";
import { storeMock } from "../store/mockData";
import { screen } from "@testing-library/react";
import { formatCurrency } from "../utils/formatCurrency";
import { increaseItemQuantity } from "../actions";

// `mockAPIs` needs to be imported on its own before importing the whole `testUtils`
// module otherwise we get an error
import { mockAPIs } from "../testUtils/mockAPIs";
import { mockFetchPromise, renderWithRedux } from "../testUtils";

// remember the storeMock needs to be imported before the store module
import * as fetchers from "../api/fetchers";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";
import { CreatedStore } from "../store";

jest.mock("../api/fetchers", () => mockAPIs());
// jest.mock("../store/initialStoreState", () => ({
//   __esModule: true,
//   default: storeMock,
// }));

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

// To Do: understand how the reducer related to the decreaseItemQuantity action can
// access the current sttore!

let myStore: CreatedStore;
beforeEach(() => {
  // Important!! we need to have access to the store instantiated inside
  // `renderWithRedux` as we need to dispatch the actions to that store
  // so the tests work as expected
  const { store } = renderWithRedux(<OrderSummary />, storeMock);
  myStore = store;
});

test("Show initial figures and updates them as quantity is incremented", async () => {
  await checkFiguresExist(price, expectedShipping, quantity);

  // the store needs to dispatch any actions we want to be processed
  // by redux otherwise the store is not affected

  // I decided to dispatch the action directly at the store so I can
  // keep this test scope limited to the OrderSummary component
  myStore.dispatch(increaseItemQuantity(cartItem.id));

  // once the increase item action is dispatched, we can check that
  // the figures had been updated accordingly. See how we increment
  // the quantity variable before passing it:
  await checkFiguresExist(price, expectedShipping, ++quantity);
});

// mind this test and read the comments!
test("Figures not changed when item is incremented over its current stock qty", async () => {
  global.alert = jest.fn();

  // fail the increaseUserItem API request!!
  const failingStatus = 500;
  jest
    .spyOn(fetchers, "increaseUserItem")
    .mockImplementation(() => mockFetchPromise({}, failingStatus));

  // the `quantity` variable reflects the correct item quantity we should
  // test as its value is updated by the previous test.
  await checkFiguresExist(price, expectedShipping, quantity);
  displayItemQuantity(myStore);

  // check that the figures remain the same (for the same quantity) as
  // the increase iten quantity is expected to fail

  // Bear in mind: what really happens is that the item's quantity is increased and
  // the dom momentarily updates to reflect the figures for the increased quantity,
  // but we can see this because of an alert in the UI. The moment the user  clicks
  // 'ok' on the alert, the item's quantity is decreased effectively being reverted
  // to it original quantity. Testing that temporary increase is tough as the alert
  // function is mocked to do nothing and thus AWAIT'ing for the whole op to finish
  // ends of in the figures at the DOM reverted, which is what I ultimately want.
  myStore.dispatch(increaseItemQuantity(cartItem.id));
  await checkFiguresExist(price, expectedShipping, quantity);
  expect(alert).toHaveBeenCalled();
  displayItemQuantity(myStore);
});

const displayItemQuantity = (store: CreatedStore) => {
  const { cartItems } = store.getState();
  console.log(
    `current quantity of item ${cartItems[0].id} in the store is ${cartItems[0].quantity}`
  );
};
