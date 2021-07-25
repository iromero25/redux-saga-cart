import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { toggleCheckingOut } from "../actions";
import { Store } from "../store";

const mapStateToProps = (state: Store) => ({
  canCheckOut: state.canCheckOut,
});

const mapDispatchToProps = {
  toggleCheckingOut,
};

const Connector = connect(mapStateToProps, mapDispatchToProps);
interface ReduxProps extends ConnectedProps<typeof Connector> {}

const CheckoutButton: React.FC<ReduxProps> = ({
  canCheckOut,
  toggleCheckingOut,
}) => (
  <div className="text-center checkout-button-container">
    <button
      className="btn btn-primary btn-lg"
      disabled={!canCheckOut}
      onClick={() => toggleCheckingOut(true)}
    >
      Check Out
    </button>
  </div>
);

export default Connector(CheckoutButton);
