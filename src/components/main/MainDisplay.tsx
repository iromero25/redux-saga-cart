import React from "react";
import CartManageViewDisplay from "../cartManage/CartManage";
// import { CheckoutStatusViewContainer } from "../CheckoutStatusView";

interface Props {
  isCheckingOut: boolean;
}

const MainDisplay: React.FC<Props> = ({ isCheckingOut }) => (
  <div>
    <CartManageViewDisplay />
    {/* {isCheckingOut ? (
      <div>
        <CheckoutStatusViewContainer />
      </div>
    ) : (
      <div>
        <CartManageViewContainer />
      </div>
    )} */}
  </div>
);

export default MainDisplay;
