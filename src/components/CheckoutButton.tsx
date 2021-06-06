import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Store } from "../store";

const mapStateToProps = (state: Store) => ({
  canCheckOut: state.canCheckOut,
});
const connector = connect(mapStateToProps, {});
interface ReduxProps extends ConnectedProps<typeof connector> {}

// export const CheckoutButtonDisplay = ({ handleRequestCheckout, canCheckOut }) => (
const CheckoutButton: React.FC<ReduxProps> = ({ canCheckOut }) => (
  <div className="text-center checkout-button-container">
    <button
      className="btn btn-primary btn-lg"
      disabled={!canCheckOut}
      // onClick={handleRequestCheckout}
    >
      Check Out
    </button>
  </div>
);

export default connector(CheckoutButton);
