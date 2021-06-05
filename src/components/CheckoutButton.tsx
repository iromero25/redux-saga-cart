import React from "react";
// export const CheckoutButtonDisplay = ({ handleRequestCheckout, canCheckOut }) => (
const CheckoutButton: React.FC = () => (
  <div className="text-center checkout-button-container">
    <button
      className="btn btn-primary btn-lg"
      disabled={true}
      // disabled={!canCheckOut}
      // onClick={handleRequestCheckout}
    >
      Check Out
    </button>
  </div>
);

export default CheckoutButton;
