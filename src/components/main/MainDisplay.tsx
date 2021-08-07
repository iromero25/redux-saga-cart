import React from "react";
import { connect } from "react-redux";
import { Store } from "../../store";
import CartManage from "../CartManage";
import CheckoutStatusView from "../CheckoutStatusView";

interface Props {
  isCheckingOut: boolean;
}

const mapStateToProps = (state: Store) => ({
  isCheckingOut: state.isCheckingOut,
});

const Connector = connect(mapStateToProps);

const MainDisplay: React.FC<Props> = ({ isCheckingOut }) => (
  <div>
    {isCheckingOut ? (
      <div>
        <CheckoutStatusView />
      </div>
    ) : (
      <div>
        <CartManage />
      </div>
    )}
  </div>
);

export default Connector(MainDisplay);
