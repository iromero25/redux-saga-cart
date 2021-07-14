import React from "react";
import UserInfo from "../userInfo";
import CartItemList from "../cartItems/CartItemList";
import OrderSummary from "../OrderSummary";
// import { SupportAvailableContainer } from '../SupportAvailable'

const CartManageViewDisplay: React.FC = () => {
  return (
    <div>
      <section className="row">
        <section className="col-6">
          <section className="">
            <h1 title="The cart continues...">SagaCart</h1>
          </section>
        </section>
      </section>
      <section className="row">
        <section className="col-6">
          <UserInfo />
          <section className="cart-items">
            <h3>Your Cart</h3>
            <CartItemList loadingMessage={"Please wait..."} />
          </section>
        </section>
        <OrderSummary />
      </section>
      <section>{/* <SupportAvailableContainer /> */}</section>
    </div>
  );
};

export default CartManageViewDisplay;
