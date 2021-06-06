import { Action } from "redux";
import { makeActionCreator } from "../utility";
export const SET_CAN_CHECK_OUT = "SET_CAN_CHECK_OUT";

export interface SetCanCheckOutAction extends Action<typeof SET_CAN_CHECK_OUT> {
  payload: { value: boolean };
}
export const setCanCheckOut = makeActionCreator<SetCanCheckOutAction>(
  SET_CAN_CHECK_OUT,
  "value"
);
