import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  CREDIT_VALIDATION_CHECKOUT_PHASE,
  QUANTITY_VERIFICATION_CHECKOUT_PHASE,
  ERROR_CHECKOUT_PHASE,
  PURCHASE_FINALIZATION_CHECKOUT_PHASE,
  SUCCESS_CHECKOUT_PHASE,
  INITIAL_CHECKOUT_PHASE,
} from "../actions";
import store, { Store } from "../store";

const mapStateToProps = (state: Store) => ({
  phase: state.checkoutPhase,
});

const Connector = connect(mapStateToProps);

interface ReduxProps extends ConnectedProps<typeof Connector> {}

export const CheckoutStatus: React.FC<ReduxProps> = ({ phase }) => (
  <div className="text-center">
    <h1>Checking out</h1>
    <div>
      {
        {
          [INITIAL_CHECKOUT_PHASE]: (
            <section>
              <div className="loader xl" />
              <h2>Initial Checkout Phase...</h2>
            </section>
          ),
          [QUANTITY_VERIFICATION_CHECKOUT_PHASE]: (
            <section>
              <div className="loader xl" />
              <h2>Verifying items are in stock...</h2>
            </section>
          ),
          [CREDIT_VALIDATION_CHECKOUT_PHASE]: (
            <section>
              <div className="loader xl" />
              <h2>Validating credit card information...</h2>
            </section>
          ),
          [PURCHASE_FINALIZATION_CHECKOUT_PHASE]: (
            <section>
              <div className="loader xl" />
              <h2>Finalizing purchase...</h2>
            </section>
          ),
          [SUCCESS_CHECKOUT_PHASE]: (
            <section>
              <h1>Thank you</h1>
              <h2>Your checkout is complete.</h2>
            </section>
          ),
          [ERROR_CHECKOUT_PHASE]: (
            <section>
              <h2>An error occurred.</h2>
              <p>
                Funds on your credit card were insufficient, or an error occurred
                while communicating with the server.
              </p>
            </section>
          ),
        }[phase]
      }
    </div>
  </div>
);

export default Connector(CheckoutStatus);
