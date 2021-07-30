import { Action } from "redux";
import { actionCreator } from "../utils";

export const SET_CHECKOUT_PHASE = "SET_CHECKOUT_PHASE";

export const INITIAL_CHECKOUT_PHASE = `INITIAL_CHECKOUT_PHASE`;
export const QUANTITY_VERIFICATION_CHECKOUT_PHASE = `QUANTITY_VERIFICATION_CHECKOUT_PHASE`;
export const CREDIT_VALIDATION_CHECKOUT_PHASE = `CREDIT_VALIDATION_CHECKOUT_PHASE`;
export const PURCHASE_FINALIZATION_CHECKOUT_PHASE = `PURCHASE_FINALIZATION_CHECKOUT_PHASE`;
export const ERROR_CHECKOUT_PHASE = `ERROR_CHECKOUT_PHASE`;
export const SUCCESS_CHECKOUT_PHASE = `SUCCESS_CHECKOUT_PHASE`;

export interface SetCheckoutPhase extends Action<typeof SET_CHECKOUT_PHASE> {
  payload: {
    phase:
      | typeof INITIAL_CHECKOUT_PHASE
      | typeof QUANTITY_VERIFICATION_CHECKOUT_PHASE
      | typeof CREDIT_VALIDATION_CHECKOUT_PHASE
      | typeof PURCHASE_FINALIZATION_CHECKOUT_PHASE
      | typeof ERROR_CHECKOUT_PHASE
      | typeof SUCCESS_CHECKOUT_PHASE;
  };
}

export const setCheckoutPhase = actionCreator<SetCheckoutPhase>(
  SET_CHECKOUT_PHASE,
  "phase"
);
