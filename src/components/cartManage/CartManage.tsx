import React, { useEffect } from "react";
import UserInfo from "../userInfo";
import { connect, ConnectedProps } from "react-redux";
import { getCurrentUser } from "../../actions";
import CartItemList from "../cartItems/cartItemList";
// import { OrderSummaryContainer } from '../OrderSummary'
// import { SupportAvailableContainer } from '../SupportAvailable'

const mapDispatchToProps = {
  getCurrentUser,
};

const connector = connect(null, mapDispatchToProps);

interface ReduxProps extends ConnectedProps<typeof connector> {}

const CartManageViewDisplay: React.FC<ReduxProps> = ({ getCurrentUser }) => {
  useEffect(() => {
    getCurrentUser("U10000");
  }, []);

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
            <CartItemList />
          </section>
        </section>
        {/* <OrderSummaryContainer /> */}
      </section>
      <section>{/* <SupportAvailableContainer /> */}</section>
    </div>
  );
};

export default connector(CartManageViewDisplay);
