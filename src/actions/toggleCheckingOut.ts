import { Action } from "redux";
import { actionCreator } from "../utils";
export const TOGGLE_CHECKING_OUT = "TOGGLE_CHECKING_OUT";

export interface ToggleCheckOutAction extends Action {
  payload: { value: boolean };
}
export const toggleCheckingOut = actionCreator<ToggleCheckOutAction>(
  TOGGLE_CHECKING_OUT,
  "value"
);
