import { bindActionCreators } from "redux";
import { actionChannel } from "redux-saga/effects";
import {
  INITIAL_CHECKOUT_PHASE,
  SetCheckoutPhase,
  SET_CHECKOUT_PHASE,
} from "../actions";

export const checkoutPhaseReducer = (
  initialState: SetCheckoutPhase["payload"]["phase"] = INITIAL_CHECKOUT_PHASE,
  action: SetCheckoutPhase
) => (action.type === SET_CHECKOUT_PHASE ? action.payload.phase : initialState);
