import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../store";
import { itemPriceSelector } from "../selectors";
import { formatCurrency } from "../utility/formatCurrency";
import { isEmpty } from "lodash";
import { FETCHED } from "../actions";
import CheckoutButton from "./CheckoutButton";

const mapStateToProps = (state: Store) => {
  const { cartItems, shippingCost, shippingFetchStatus, taxRate } = state;
  let subtotalFetched = !isEmpty(cartItems);
  const subtotal =
    cartItems?.reduce((total, item) => {
      const { id, quantity } = item;
      // `itemPriceSelector` will try to get the price from state.itemDetails and doesn't
      // guarantee us a price since we might be populating that part of the state at this
      // point of time. `subtotalFetched` will only be true when we get all prices.
      const price: number = itemPriceSelector(id)(state);
      if (price) {
        total += price * quantity;
      } else {
        subtotalFetched = false;
      }
      return total;
    }, 0) ?? 0;

  const shippingFetched = shippingFetchStatus === FETCHED && subtotalFetched;
  const taxRateFetched = taxRate !== 0;
  const totalTax = (subtotal + shippingCost) * taxRate;
  const totalTaxFetched = taxRateFetched && shippingFetched && subtotalFetched;
  const total = totalTaxFetched ? subtotal + shippingCost + totalTax : null;

  return {
    subtotalFetched,
    subtotal,
    shippingCost,
    shippingFetched,
    totalTax,
    totalTaxFetched,
    total,
  };
};
const connector = connect(mapStateToProps, {});

interface ReduxProps extends ConnectedProps<typeof connector> {}

const OrderSummary: React.FC<ReduxProps> = ({
  subtotal,
  subtotalFetched,
  shippingFetched,
  shippingCost,
  totalTax,
  totalTaxFetched,
  total,
}) => (
  <section className="col-6">
    <section>
      <CheckoutButton />
      <h4>Order Summary</h4>
      <table className="table">
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>
              {subtotalFetched ? (
                formatCurrency(subtotal)
              ) : (
                <div className="loader" />
              )}
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              {shippingFetched ? (
                formatCurrency(shippingCost)
              ) : (
                <div className="loader" />
              )}
            </td>
          </tr>
          <tr>
            <th>Tax</th>
            <td>
              {totalTaxFetched ? (
                formatCurrency(totalTax)
              ) : (
                <div className="loader" />
              )}
            </td>
          </tr>
          <tr className="total-tr">
            <th>Total</th>
            <td>{total ? formatCurrency(total) : <div className="loader" />}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
);

export default connector(OrderSummary);
