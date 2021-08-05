import React from "react";
import OrderSummary from "./OrderSummary";
import { render } from "@testing-library/react";
import { createReduxWrapper, mockFetchPromise } from "../utils/";
import { formatCurrency } from "../utils/formatCurrency";
import { increaseItemQuantity } from "../actions";

// remember the storeMock needs to be imported before the store module
import { storeMock } from "../store/mockData";
import store from "../store";

// provides a set of custom jest matchers that you can use to extend jest
// i.e. `.toBeVisible`
import "@testing-library/jest-dom";

jest.mock("../store/initialStoreState", () => ({
  __esModule: true,
  default: storeMock,
}));

// check how we aare mocking these API calls to do really do nothing;
// we can do this because we are keeping the scope of this test limited
// to the OrderSummary test
jest.mock("../api/fetchers", () => {
  const mockFn = jest.fn().mockImplementation;
  return {
    increaseUserItem: mockFn(() => mockFetchPromise({})),
    fetchShipping: mockFn(() =>
      mockFetchPromise({
        total: 3.5,
      })
    ),
  };
});

const Wrapper = createReduxWrapper(store);

test("Order Summary is rendered subtotal, shipping, taxes and total figures", async () => {
  const { getByText, getByTitle, findByText } = render(
    <Wrapper>
      <OrderSummary />
    </Wrapper>
  );

  const initialQuantity = storeMock.cartItems[0].quantity;
  const price = storeMock.itemDetails[0].usd;
  const expectedShipping = storeMock.shippingCost;

  const checkFiguresExist = async (currentQuantity: number) => {
    let expectedSubtotal = price * currentQuantity;
    let expectedTax = (expectedSubtotal + expectedShipping) * storeMock.taxRate;
    let expectedTotal = expectedSubtotal + expectedShipping + expectedTax;

    const subtotalDom = await findByText(formatCurrency(expectedSubtotal));
    const shippingDom = await findByText(formatCurrency(expectedShipping));
    const taxDom = await findByText(formatCurrency(expectedTax));
    const totalDom = await findByText(formatCurrency(expectedTotal));

    expect(subtotalDom).toBeInTheDocument();
    expect(shippingDom).toBeInTheDocument();
    expect(taxDom).toBeInTheDocument();
    expect(totalDom).toBeInTheDocument();
  };

  await checkFiguresExist(initialQuantity);

  // the store needs to dispatch any actions we want to be processed
  // by redux otherwise the store is not affected

  // I decided to dispatch the action directly at the store so I can
  // keep this test scope limited to the OrderSummary component
  store.dispatch(increaseItemQuantity(storeMock.cartItems[0].id));

  // once the increase item action is dispatched, then can check that
  // the figures had been updated accordingly
  await checkFiguresExist(initialQuantity + 1);
});
